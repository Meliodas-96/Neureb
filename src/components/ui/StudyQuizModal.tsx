'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA } from '@/data/hotspots';
import {
  createRandomizedQuizSession,
  getFailedQuestionsForReview,
  saveQuizAttempt,
  loadQuizStats,
  QuizCategoryFilter,
  QuizUserStats,
  getLiveUpdatedQuestionPool,
} from '@/data/quizEngine';
import { QuizQuestion } from '@/types/brain';
import {
  GraduationCap,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Compass,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Shuffle,
  Trophy,
  Filter,
  Flame,
} from 'lucide-react';

const GUIDED_TOUR_STOPS = [
  'frontal_lobe_pfc',
  'central_sulcus_rolando',
  'brodmann_4_motor',
  'brodmann_312_sensory',
  'sylvian_fissure_lateral',
  'brodmann_44_45_broca',
  'temporal_lobe',
  'brodmann_22_wernicke',
  'occipital_lobe',
  'brodmann_17_visual',
  'mca_bifurcation',
  'optic_chiasm',
  'cn_iii_oculomotor',
  'cn_v_trigeminal',
  'pons_brainstem',
  'cn_vii_facial',
  'cn_viii_vestibulocochlear',
  'medulla_oblongata',
  'cn_xii_hypoglossal',
  'basilar_apex',
  'cerebellum_hemisphere',
];

const CATEGORIES: { id: QuizCategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todas las áreas' },
  { id: 'Casos Clínicos', label: '🩺 Casos Clínicos' },
  { id: 'Pares Craneales', label: '🧠 Pares Craneales' },
  { id: 'Vascular', label: '🩸 Vascular (ACM/ACA/Senos)' },
  { id: 'Áreas de Brodmann', label: '🔬 Brodmann' },
  { id: 'Tronco y Cerebelo', label: '⚡ Tronco & Cerebelo' },
  { id: 'Estructuras Profundas', label: '🧩 Profundas (Tálamo/Hipocampo)' },
  { id: 'Lóbulos y Giros', label: '🌐 Lóbulos & Surcos' },
];

export function StudyQuizModal() {
  const isQuizOpen = useBrainStore((state) => state.isQuizOpen);
  const setIsQuizOpen = useBrainStore((state) => state.setIsQuizOpen);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);

  const [activeTab, setActiveTab] = useState<'quiz' | 'tour'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategoryFilter>('all');
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(10);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answersStatus, setAnswersStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState({ correct: 0, attempts: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [userStats, setUserStats] = useState<QuizUserStats>({
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastUpdated: '',
  });

  // Tour state
  const [currentTourIndex, setCurrentTourIndex] = useState(0);

  // Initialize randomized quiz session
  const startNewRandomSession = useCallback(
    (count: number = questionCountLimit, cat: QuizCategoryFilter = selectedCategory) => {
      const session = createRandomizedQuizSession(count, cat);
      setActiveQuestions(session);
      setCurrentQuestionIndex(0);
      setShowHint(false);
      setAnswersStatus('idle');
      setScore({ correct: 0, attempts: 0 });
      setIsFinished(false);
      setIsReviewMode(false);
      selectHotspot(null);
    },
    [questionCountLimit, selectedCategory, selectHotspot]
  );

  // Start failed questions review session
  const startReviewFailedSession = useCallback(() => {
    const failed = getFailedQuestionsForReview();
    if (failed.length === 0) return;
    setActiveQuestions(failed);
    setCurrentQuestionIndex(0);
    setShowHint(false);
    setAnswersStatus('idle');
    setScore({ correct: 0, attempts: 0 });
    setIsFinished(false);
    setIsReviewMode(true);
    selectHotspot(null);
  }, [selectHotspot]);

  // Load initial questions and user stats on open
  useEffect(() => {
    if (isQuizOpen) {
      startNewRandomSession(questionCountLimit, selectedCategory);
      setUserStats(loadQuizStats());
    }
  }, [isQuizOpen, startNewRandomSession, questionCountLimit, selectedCategory]);

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const targetHotspot = currentQuestion
    ? HOTSPOTS_DATA.find((h) => h.id === currentQuestion.targetHotspotId)
    : null;

  // Tour stop
  const tourStopId = GUIDED_TOUR_STOPS[currentTourIndex];
  const tourHotspot = HOTSPOTS_DATA.find((h) => h.id === tourStopId);

  // Monitor user clicks in 3D during Quiz mode
  useEffect(() => {
    if (!isQuizOpen || activeTab !== 'quiz' || !selectedHotspotId || !currentQuestion || answersStatus !== 'idle') {
      return;
    }

    if (selectedHotspotId === currentQuestion.targetHotspotId) {
      setAnswersStatus('correct');
      setScore((prev) => ({
        correct: prev.correct + 1,
        attempts: prev.attempts + 1,
      }));
      saveQuizAttempt(currentQuestion.id, true);
      setUserStats(loadQuizStats());
    } else {
      setAnswersStatus('wrong');
      setScore((prev) => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
      saveQuizAttempt(currentQuestion.id, false);
      setUserStats(loadQuizStats());
    }
  }, [selectedHotspotId, isQuizOpen, activeTab, currentQuestion, answersStatus]);

  // Tour navigation
  const goToTourStop = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, GUIDED_TOUR_STOPS.length - 1));
    setCurrentTourIndex(nextIndex);
    const hotspotId = GUIDED_TOUR_STOPS[nextIndex];
    selectHotspot(hotspotId);
  };

  const nextQuestion = () => {
    setShowHint(false);
    setAnswersStatus('idle');
    selectHotspot(null);

    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const failedAvailableCount = useMemo(() => {
    return getFailedQuestionsForReview().length;
  }, [answersStatus, isFinished]);

  const totalPoolCount = useMemo(() => {
    return getLiveUpdatedQuestionPool('all', true).length;
  }, []);

  if (!isQuizOpen) return null;

  return (
    <aside
      className={`fixed inset-x-2 bottom-2 md:inset-x-auto md:right-3 md:top-16 md:bottom-20 z-50 md:w-[440px] md:max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/90 bg-slate-950/98 backdrop-blur-2xl shadow-2xl glass-panel overflow-hidden pointer-events-auto transition-all animate-in slide-in-from-bottom md:slide-in-from-right duration-200 ${
        isMobileExpanded ? 'max-h-[88dvh]' : 'max-h-[46dvh] md:max-h-none'
      }`}
      role="dialog"
      aria-label="Modo Estudio y Quiz Neuroanatómico"
    >
      {/* Mobile drag / resize handle */}
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="w-full py-1.5 flex justify-center items-center md:hidden bg-slate-900/60 border-b border-slate-800/40"
        aria-label={isMobileExpanded ? 'Reducir panel' : 'Expandir panel'}
      >
        <div className="w-10 h-1 bg-slate-600 rounded-full" />
      </button>

      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-3.5 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Academia Neuroanatómica
              </h2>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-mono font-medium">
                EN VIVO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <span>Tests aleatorios actualizados</span>
              {userStats.streak > 1 && (
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Racha: {userStats.streak}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Quick Shuffle New Test Button */}
          {activeTab === 'quiz' && (
            <button
              onClick={() => startNewRandomSession(questionCountLimit, selectedCategory)}
              className="p-1.5 text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950/50 rounded-lg transition border border-cyan-500/30 flex items-center gap-1 text-[10px] font-semibold"
              title="Generar nueva batería de preguntas aleatorias"
              aria-label="Barajar nuevo test"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Barajar</span>
            </button>
          )}

          {/* Mobile expand / collapse toggle */}
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg transition md:hidden"
            aria-label={isMobileExpanded ? 'Contraer' : 'Expandir'}
          >
            {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setIsQuizOpen(false);
              selectHotspot(null);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            aria-label="Cerrar modo estudio"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Tabs */}
      <div className="flex border-b border-slate-800/80 bg-slate-950/60 p-1 gap-1 text-xs">
        <button
          onClick={() => {
            setActiveTab('quiz');
            selectHotspot(null);
          }}
          className={`flex-1 py-1.5 px-3 rounded-xl font-medium transition flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>
            Quiz Dinámico ({activeQuestions.length > 0 ? `${currentQuestionIndex + 1}/${activeQuestions.length}` : '0'})
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tour');
            goToTourStop(currentTourIndex);
          }}
          className={`flex-1 py-1.5 px-3 rounded-xl font-medium transition flex items-center justify-center gap-1.5 ${
            activeTab === 'tour'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Tour Guiado ({currentTourIndex + 1}/{GUIDED_TOUR_STOPS.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 sm:space-y-3.5 text-xs">
        {activeTab === 'quiz' ? (
          <>
            {/* Category Filter Chips Bar (Scrollable horizontally) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <Filter className="w-3 h-3 text-cyan-400" />
                  <span>Área temática:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {totalPoolCount} preguntas sincronizadas
                </span>
              </div>

              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
                {CATEGORIES.map((cat) => {
                  const isCatActive = selectedCategory === cat.id && !isReviewMode;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        startNewRandomSession(questionCountLimit, cat.id);
                      }}
                      className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-medium transition shrink-0 border ${
                        isCatActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Length selector & Review mode button */}
              <div className="flex items-center justify-between pt-1 text-[10px]">
                <div className="flex items-center gap-1 text-slate-400">
                  <span>Preguntas:</span>
                  {[5, 10, 20].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setQuestionCountLimit(num);
                        startNewRandomSession(num, selectedCategory);
                      }}
                      className={`px-1.5 py-0.5 rounded font-mono ${
                        questionCountLimit === num && !isReviewMode
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setQuestionCountLimit(-1);
                      startNewRandomSession(-1, selectedCategory);
                    }}
                    className={`px-1.5 py-0.5 rounded font-mono ${
                      questionCountLimit === -1 && !isReviewMode
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Todas
                  </button>
                </div>

                {failedAvailableCount > 0 && (
                  <button
                    onClick={startReviewFailedSession}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition flex items-center gap-1 border ${
                      isReviewMode
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                        : 'bg-amber-950/40 text-amber-400 border-amber-500/30 hover:bg-amber-900/40'
                    }`}
                  >
                    <span>Repasar fallos ({failedAvailableCount})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Test Finished Summary Screen */}
            {isFinished ? (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    ¡Cuestionario Completado!
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Has acertado{' '}
                    <strong className="text-emerald-400 font-mono font-bold">
                      {score.correct}
                    </strong>{' '}
                    de{' '}
                    <strong className="text-slate-100 font-mono font-bold">
                      {activeQuestions.length}
                    </strong>{' '}
                    preguntas (
                    {Math.round((score.correct / Math.max(1, activeQuestions.length)) * 100)}% de éxito).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => startNewRandomSession(questionCountLimit, selectedCategory)}
                    className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500 transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950/40"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Nuevo Test Aleatorio</span>
                  </button>

                  {failedAvailableCount > 0 && (
                    <button
                      onClick={startReviewFailedSession}
                      className="py-2 px-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-medium hover:bg-amber-900/60 transition"
                    >
                      Repasar {failedAvailableCount} Fallos
                    </button>
                  )}
                </div>
              </div>
            ) : activeQuestions.length === 0 ? (
              <div className="p-6 text-center text-slate-400 space-y-2">
                <p>No se encontraron preguntas en esta categoría.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    startNewRandomSession(questionCountLimit, 'all');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs"
                >
                  Ver todas las preguntas
                </button>
              </div>
            ) : currentQuestion ? (
              <>
                {/* Score & Progress Header */}
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                      {currentQuestion.category}
                    </span>
                    {isReviewMode && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono">
                        REPASO
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono font-medium">
                      Aciertos: {score.correct}/{currentQuestionIndex + (answersStatus !== 'idle' ? 1 : 0)}
                    </span>
                    <button
                      onClick={() => startNewRandomSession(questionCountLimit, selectedCategory)}
                      className="p-1 text-slate-400 hover:text-slate-200 transition"
                      title="Reiniciar y barajar test"
                      aria-label="Reiniciar y barajar test"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Question Box */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="uppercase font-bold tracking-wider">
                      Pregunta #{currentQuestionIndex + 1} de {activeQuestions.length}
                    </span>
                    <span className="font-mono text-cyan-400">
                      ID: {currentQuestion.id.slice(0, 14)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-100 font-medium leading-relaxed">
                    {currentQuestion.question}
                  </p>
                  {currentQuestion.clinicalVignette && (
                    <div className="pt-2 border-t border-slate-800/60 text-[11px] text-cyan-300/90 italic">
                      💡 {currentQuestion.clinicalVignette}
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="p-2.5 rounded-lg border border-dashed border-cyan-500/30 bg-cyan-950/20 text-[11px] text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>
                    Gira el cerebro 3D y <strong>toca el punto anatómico</strong> correspondiente.
                  </span>
                </div>

                {/* Hint Toggle */}
                <div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Ocultar pista anatómica' : '¿Necesitas una pista?'}</span>
                  </button>
                  {showHint && (
                    <div className="mt-1.5 p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200 animate-in fade-in">
                      {currentQuestion.hint}
                    </div>
                  )}
                </div>

                {/* Answer Feedback Alert */}
                {answersStatus === 'correct' && (
                  <div className="p-3.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>¡CORRECTO!</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition flex items-center justify-center gap-2"
                    >
                      <span>
                        {currentQuestionIndex + 1 < activeQuestions.length
                          ? 'Siguiente Pregunta'
                          : 'Ver Resultados Finales'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {answersStatus === 'wrong' && (
                  <div className="p-3.5 rounded-xl border border-rose-500/50 bg-rose-950/40 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-rose-400 font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>Estructura incorrecta</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Has seleccionado otro punto anatómico. Inténtalo de nuevo o pulsa en revelar:
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => selectHotspot(currentQuestion.targetHotspotId)}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium hover:bg-slate-700 transition truncate"
                      >
                        Mostrar {targetHotspot?.title || 'Estructura'}
                      </button>
                      <button
                        onClick={nextQuestion}
                        className="py-1.5 px-3 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                      >
                        Saltar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </>
        ) : (
          /* TOUR MODE */
          tourHotspot && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-[11px] text-cyan-200 flex items-center justify-between">
                <span>Parada {currentTourIndex + 1} de {GUIDED_TOUR_STOPS.length}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                  {tourHotspot.system}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  {tourHotspot.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono italic">
                  {tourHotspot.latinTitle}
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                <p><strong>Resumen:</strong> {tourHotspot.summary}</p>
                <p><strong>Anatomía:</strong> {tourHotspot.anatomy}</p>
                <p><strong>Función:</strong> {tourHotspot.function}</p>
                <p><strong>Clínica:</strong> {tourHotspot.clinicalSignificance}</p>
              </div>

              {/* Tour Navigation Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => goToTourStop(currentTourIndex - 1)}
                  disabled={currentTourIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-800 transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={() => goToTourStop(currentTourIndex + 1)}
                  disabled={currentTourIndex === GUIDED_TOUR_STOPS.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 text-slate-950 font-bold disabled:opacity-40 disabled:pointer-events-none hover:bg-cyan-500 transition flex items-center gap-1"
                >
                  <span>Siguiente Hito</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </aside>
  );
}
