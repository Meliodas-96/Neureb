'use client';

import React, { useState, useEffect } from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { HOTSPOTS_DATA } from '@/data/hotspots';
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
  ChevronLeft
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

export function StudyQuizModal() {
  const isQuizOpen = useBrainStore((state) => state.isQuizOpen);
  const setIsQuizOpen = useBrainStore((state) => state.setIsQuizOpen);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);

  const [activeTab, setActiveTab] = useState<'quiz' | 'tour'>('quiz');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answersStatus, setAnswersStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState({ correct: 0, attempts: 0 });

  // Tour state
  const [currentTourIndex, setCurrentTourIndex] = useState(0);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const targetHotspot = HOTSPOTS_DATA.find((h) => h.id === question.targetHotspotId);

  // Tour stop
  const tourStopId = GUIDED_TOUR_STOPS[currentTourIndex];
  const tourHotspot = HOTSPOTS_DATA.find((h) => h.id === tourStopId);

  // Monitor user clicks in 3D during Quiz mode
  useEffect(() => {
    if (!isQuizOpen || activeTab !== 'quiz' || !selectedHotspotId) return;

    if (selectedHotspotId === question.targetHotspotId) {
      setAnswersStatus('correct');
      setScore((prev) => ({
        correct: prev.correct + 1,
        attempts: prev.attempts + 1,
      }));
    } else {
      setAnswersStatus('wrong');
    }
  }, [selectedHotspotId, isQuizOpen, activeTab, question.targetHotspotId]);

  // When changing tour stop, fly to it
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
    setCurrentQuestionIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowHint(false);
    setAnswersStatus('idle');
    setScore({ correct: 0, attempts: 0 });
    selectHotspot(null);
  };

  if (!isQuizOpen) return null;

  return (
    <aside
      className="fixed right-3 top-16 bottom-20 z-50 w-[420px] max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/90 bg-slate-950/98 backdrop-blur-2xl shadow-2xl glass-panel overflow-hidden pointer-events-auto transition-all animate-in fade-in slide-in-from-right duration-200"
      role="dialog"
      aria-label="Modo Estudio y Quiz Neuroanatómico"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Academia Neuroanatómica
            </h2>
            <p className="text-[10px] text-slate-400">
              Auto-evaluación médica & Recorridos 3D
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsQuizOpen(false);
            selectHotspot(null);
          }}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition"
          aria-label="Cerrar modo estudio"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
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
          <span>Quiz Clínico ({currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length})</span>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === 'quiz' ? (
          <>
            {/* Score & Category Bar */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                {question.category}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-medium">
                  Aciertos: {score.correct}
                </span>
                <button
                  onClick={restartQuiz}
                  className="p-1 text-slate-400 hover:text-slate-200 transition"
                  title="Reiniciar cuestionario"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Question Box */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Caso / Pregunta #{currentQuestionIndex + 1}
              </span>
              <p className="text-xs text-slate-100 font-medium leading-relaxed">
                {question.question}
              </p>
              {question.clinicalVignette && (
                <div className="pt-2 border-t border-slate-800/60 text-[11px] text-cyan-300/90 italic">
                  💡 {question.clinicalVignette}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-2.5 rounded-lg border border-dashed border-cyan-500/30 bg-cyan-950/20 text-[11px] text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Gira el cerebro 3D y <strong>haz clic en el punto anatómico</strong> correspondiente.</span>
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
                <div className="mt-1.5 p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                  {question.hint}
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
                  {question.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition flex items-center justify-center gap-2"
                >
                  <span>Siguiente Pregunta</span>
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
                    onClick={() => selectHotspot(question.targetHotspotId)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium hover:bg-slate-700 transition"
                  >
                    Mostrar {targetHotspot?.title}
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
