import { QuizQuestion, HotspotData } from '@/types/brain';
import { HOTSPOTS_DATA } from './hotspots';
import { QUIZ_QUESTIONS as BASE_CURATED_QUESTIONS } from './quizQuestions';

// ======================================================================
// EXPANDED HIGH-YIELD CURATED CLINICAL & ANATOMICAL QUESTIONS (USMLE / MIR)
// ======================================================================
export const ADDITIONAL_CURATED_QUESTIONS: QuizQuestion[] = [
  // 1. Circulación Posterior: PCA
  {
    id: 'quiz-curated-pca',
    category: 'Vascular Arterial',
    type: 'clinical',
    question: 'Paciente de 68 años con hipertensión arterial acude por pérdida súbita de visión en el hemicampo visual izquierdo. La campimetría por confrontación revela hemianopsia homónima izquierda con preservación macular. ¿Qué arteria cerebral está ocluida?',
    clinicalVignette: 'Ictus isquémico en territorio de la arteria cerebral posterior (PCA) que irriga la corteza calcarina occipital con anastomosis colateral de la ACM sobre el polo macular.',
    targetHotspotId: 'pca_posterior_cerebral',
    hint: 'Nace de la bifurcación del tronco basilar y rodea los pedúnculos cerebrales hacia el lóbulo occipital.',
    explanation: 'La arteria cerebral posterior (PCA) nutre la corteza visual primaria (área 17 de Brodmann). Su oclusión causa hemianopsia homónima contralateral; la mácula suele respetarse gracias a la doble irrigación por ramas terminales de la ACM.'
  },

  // 2. Carótida Interna Supraclinoidea
  {
    id: 'quiz-curated-ica',
    category: 'Vascular Arterial',
    type: 'clinical',
    question: 'Varón de 62 años presenta episodios transitorios de ceguera monocular en el ojo derecho de 5 minutos de duración (amaurosis fugaz), como "un telón oscuro que baja", seguidos de paresia braquial izquierda transitoria. ¿Qué vaso principal sufre estenosis crítica?',
    clinicalVignette: 'Ateroembolismo carotídeo hacia la arteria oftálmica y ramas de la ACM.',
    targetHotspotId: 'ica_supraclinoid',
    hint: 'Segmento terminal de la gran arteria nutricia anterior que da origen a la arteria oftálmica y comunicante posterior.',
    explanation: 'El segmento supraclinoideo de la arteria carótida interna (ACI) da origen a la arteria oftálmica antes de bifurcarse en ACM y ACA. Los microémbolos desprendidos impactan en la arteria central de la retina causando amaurosis fugaz.'
  },

  // 3. Trombosis de Seno Sagital Superior
  {
    id: 'quiz-curated-sss',
    category: 'Sistema Venoso',
    type: 'clinical',
    question: 'Mujer joven en tratamiento con anticonceptivos orales acude por cefalea holocraneal progresiva refractaria, papiledema bilateral y crisis epilépticas focales de las extremidades inferiores. ¿Qué gran seno venoso dural está trombosado?',
    clinicalVignette: 'Trombosis venosa cerebral con signo del delta vacío en la confluencia de la hoz del cerebro.',
    targetHotspotId: 'superior_sagittal_sinus',
    hint: 'Discurre por la línea media dorsal en el borde adherido de la hoz del cerebro.',
    explanation: 'El seno sagital superior (SSS) drena la mayor parte de las venas corticales de la convexidad hemisférica. Su trombosis genera hipertensión intracraneal grave y congestión venosa parasagital bilateral.'
  },

  // 4. Seno Transverso y Sigmoideo
  {
    id: 'quiz-curated-transverse',
    category: 'Sistema Venoso',
    type: 'clinical',
    question: 'Niño con antecedente de mastoiditis aguda purulenta desarrolla fiebre en agujas, dolor retroauricular y signos de hipertensión endocraneal. La RM venosa muestra ausencia de flujo en la fosa posterior. ¿Qué seno venoso está comprometido por contigüidad?',
    clinicalVignette: 'Tromboflebitis séptica del seno lateral/sigmoideo secundaria a infección del oído medio y celdas mastoideas.',
    targetHotspotId: 'transverse_sigmoid_sinus',
    hint: 'Discurre horizontalmente en la tienda del cerebelo y se incurva en forma de "S" hacia el foramen yugular.',
    explanation: 'El seno sigmoideo está en íntimo contacto anatómico con la pared posterior de las celdillas mastoideas del hueso temporal, siendo susceptible a trombosis por propagación de otitis/mastoiditis.'
  },

  // 5. Tálamo y Síndrome Talámico
  {
    id: 'quiz-curated-thalamus',
    category: 'Estructuras Profundas',
    type: 'clinical',
    question: 'Tres meses después de un ictus lacunar en la arteria talamogeniculada, un paciente acude por dolor lacerante intratable y alodinia extrema en todo el hemicuerpo contralateral ante el menor roce de la ropa. ¿Qué estructura diencefálica fue lesionada?',
    clinicalVignette: 'Síndrome de dolor central talámico (síndrome de Déjerine-Roussy) por desaferentación de los núcleos VPL/VPM.',
    targetHotspotId: 'thalamus_diencephalon',
    hint: 'Gran estación de relevo sináptico ovoide para todas las modalidades sensoriales (excepto el olfato), medial a la cápsula interna.',
    explanation: 'El tálamo es el núcleo de relevo de las vías espinotalámicas y del lemnisco medial hacia la corteza. Las lesiones isquémicas del núcleo ventral posterolateral (VPL) provocan hemihipoestesia seguida de dolor neuropático central intenso.'
  },

  // 6. Hipocampo y Memoria
  {
    id: 'quiz-curated-hippocampus',
    category: 'Estructuras Profundas',
    type: 'clinical',
    question: 'Paciente que tras una parada cardiorrespiratoria con anoxia cerebral prolongada preserva sus recuerdos infantiles y habilidades motoras, pero es incapaz de consolidar cualquier recuerdo nuevo (amnesia anterógrada total). ¿Qué estructura límbica temporal es la más vulnerable a la isquemia?',
    clinicalVignette: 'Pérdida neuronal selectiva en el sector CA1 (sector de Sommer) del asta de Ammón.',
    targetHotspotId: 'hippocampus_archicortex',
    hint: 'Estructura en forma de caballito de mar en la cara medial del lóbulo temporal, elemento central del circuito de Papez.',
    explanation: 'El hipocampo es esencial para la consolidación de la memoria episódica explícita de corto a largo plazo. Sus neuronas piramidales CA1 poseen alta densidad de receptores NMDA, haciéndolas hipersensibles a la excitotoxicidad por anoxia.'
  },

  // 7. Cuerpo Calloso y Desconexión
  {
    id: 'quiz-curated-callosum',
    category: 'Estructuras Profundas',
    type: 'clinical',
    question: 'Tras una resección quirúrgica del esplenio y tronco de la gran comisura interhemisférica para tratar una epilepsia intratable, el paciente presenta alexia sin agrafia y síndrome de la mano ajena. ¿Qué tracto de fibras blancas se seccionó?',
    clinicalVignette: 'Síndrome de desconexión callosa que impide la transferencia de información entre ambos hemisferios cerebrales.',
    targetHotspotId: 'corpus_callosum_commissure',
    hint: 'El puente comisural de sustancia blanca más voluminoso del encéfalo, arqueado sobre los ventrículos laterales.',
    explanation: 'El cuerpo calloso conecta regiones homólogas de ambos hemisferios. Su sección interrumpe la comunicación interhemisférica, provocando que la información visual del hemisferio derecho no pueda acceder a las áreas del lenguaje en el izquierdo.'
  },

  // 8. Ganglios Basales y Movimiento
  {
    id: 'quiz-curated-striatum',
    category: 'Estructuras Profundas',
    type: 'clinical',
    question: 'Varón de 42 años presenta movimientos involuntarios coreicos rápidos y espasmódicos en extremidades y cara, acompañados de deterioro cognitivo y labilidad afectiva. La neuroimagen revela atrofia marcada de la cabeza del núcleo caudado. ¿Qué complejo nuclear está afectado?',
    clinicalVignette: 'Enfermedad de Huntington con degeneración de neuronas espinosas medianas GABAérgicas de la vía indirecta.',
    targetHotspotId: 'basal_ganglia_striatum',
    hint: 'Conjunto subcortical que incluye el caudado, putamen y globo pálido, reguladores del inicio y freno motor.',
    explanation: 'El cuerpo estriado (caudado y putamen) recibe aferencias de la corteza y modula los patrones motores a través del tálamo. La pérdida de control inhibitorio de la vía indirecta desinhibe al tálamo, originando los movimientos coreiformes.'
  },

  // 9. Sistema Ventricular e Hidrocefalia
  {
    id: 'quiz-curated-ventricles',
    category: 'Estructuras Profundas',
    type: 'clinical',
    question: 'Paciente de 74 años consulta por la tríada clásica de Hakim-Adams: ataxia y apraxia de la marcha ("pies pegados al suelo"), demencia subcortical progresiva e incontinencia urinaria de urgencia. La RM muestra ventriculomegalia desproporcionada. ¿Qué sistema está dilatado?',
    clinicalVignette: 'Hidrocefalia de presión normal (HPN) comunicante tratable mediante derivación ventriculoperitoneal.',
    targetHotspotId: 'ventricular_system_lcr',
    hint: 'Conjunto de cavidades cerebrales (ventrículos laterales, 3º y 4º) donde se sintetiza y circula el líquido cefalorraquídeo.',
    explanation: 'El sistema ventricular aloja los plexos coroideos productores de LCR. En la hidrocefalia a presión normal, el defecto en la reabsorción aracnoidea distiende los ventrículos, traccionando las fibras sacras del tracto corticoespinal (marcha y control vesical).'
  },

  // 10. Nervio Olfatorio (I)
  {
    id: 'quiz-curated-cn-i',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Varón que tras un impacto frontal con el volante en accidente de tráfico presenta pérdida completa del sentido del olfato y pérdida de sabor en los alimentos (anosmia y ageusia aparente). ¿Qué par craneal sufrió avulsión a su paso por la lámina cribosa?',
    clinicalVignette: 'Cizallamiento traumático de los filetes del nervio olfatorio en la base de la fosa craneal anterior.',
    targetHotspotId: 'cn_i_olfactory',
    hint: 'Primer par craneal, cuyas cintillas reposan sobre la cara basal del lóbulo frontal.',
    explanation: 'El nervio olfatorio (CN I) atraviesa los orificios de la lámina cribosa del etmoides. En traumatismos craneoencefálicos por desaceleración rápida, estos delicados axones son seccionados contra el hueso.'
  },

  // 11. Quiasma Óptico (II)
  {
    id: 'quiz-curated-chiasm',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Mujer de 38 años presenta amenorrea-galactorrea y nota que tropieza con frecuencia lateralmente. La campimetría demuestra una hemianopsia bitemporal típica. ¿Qué estructura nerviosa está sufriendo compresión por un adenoma hipofisario?',
    clinicalVignette: 'Compresión extrínseca inferior de las fibras nasales decusantes de ambas retinas en la silla turca.',
    targetHotspotId: 'optic_chiasm',
    hint: 'Encrucijada anatómica en forma de "X" situada sobre la tienda de la hipófisis.',
    explanation: 'En el quiasma óptico decusan exclusivamente los axones provenientes de las hemirretinas nasales (que captan los campos visuales temporales). Una masa selar que crece hacia arriba comprime el centro del quiasma provocando hemianopsia bitemporal.'
  },

  // 12. Nervio Glosofaríngeo (IX)
  {
    id: 'quiz-curated-cn-ix',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Varón de 50 años experimenta accesos súbitos de dolor punzante intolerable en la base de la lengua, la fosa amigdalina y el conducto auditivo externo, desencadenados al tragar alimentos fríos. ¿Qué par craneal es el mediador de este cuadro álgico?',
    clinicalVignette: 'Neuralgia esencial del glosofaríngeo, a menudo asociada a bradicardia o síncope vagal por contigüidad reflexógena.',
    targetHotspotId: 'cn_ix_glossopharyngeal',
    hint: 'Emerge en el surco retroolivar del bulbo raquídeo inmediatamente por encima del nervio vago.',
    explanation: 'El nervio glosofaríngeo (CN IX) recoge la sensibilidad somatosensorial y gustativa del tercio posterior de la lengua, amígdala y faringe. La compresión neurovascular en el foramen yugular genera neuralgia del IX par.'
  },

  // 13. Hemisferio Cerebeloso
  {
    id: 'quiz-curated-cerebellum',
    category: 'Tronco y Cerebelo',
    type: 'clinical',
    question: 'Paciente que tras una hemorragia en fosa posterior presenta dismetría dedo-nariz ipsilateral, disdiadococinesia en la mano derecha, temblor de acción intencional y marcha en tándem desviada hacia la derecha. ¿Qué estructura anatómica modula esta coordinación?',
    clinicalVignette: 'Síndrome cerebeloso hemisférico ipsilateral (los signos cerebelosos no se cruzan a nivel espinal periférico).',
    targetHotspotId: 'cerebellum_hemisphere',
    hint: 'Estructura laminada en la fosa posterior, dorsal al tronco encefálico y bajo la tienda del tentorio.',
    explanation: 'Los hemisferios cerebelosos modulan la motricidad fina, metría y sinergia de las extremidades ipsilaterales mediante el circuito cortico-ponto-cerebelo-dentato-rubro-talámico.'
  },

  // 14. Lóbulo Parietal y Síndrome de Gerstmann
  {
    id: 'quiz-curated-parietal',
    category: 'Lóbulos y Giros',
    type: 'clinical',
    question: 'Paciente con infarto en el giro angular del hemisferio dominante presenta una constelación semiológica de agrafia pura, acalculia, agnosia digital y desorientación derecha-izquierda (Síndrome de Gerstmann). ¿En qué lóbulo cerebral radica la lesión?',
    clinicalVignette: 'Pérdida de la capacidad de procesamiento simbólico y representación somatotópica de los dedos.',
    targetHotspotId: 'parietal_lobe',
    hint: 'Situado entre el surco central por delante y la línea parietooccipital por detrás.',
    explanation: 'El lóbulo parietal inferior (giros supramarginal y angular, áreas 39-40) del hemisferio izquierdo integra funciones simbólicas multimodales, cálculo matemático abstracto y orientación corporal.'
  },

  // 15. Lóbulo Temporal y Crisis Uncinadas
  {
    id: 'quiz-curated-temporal',
    category: 'Lóbulos y Giros',
    type: 'clinical',
    question: 'Paciente refiere episodios breves y recurrentes consistentes en la percepción de un olor fétido intenso inexistente (cacosmia/aura olfatoria) seguido de masticación involuntaria y desconexión breve del entorno. ¿Qué lóbulo cerebral alberga este foco epiléptico?',
    clinicalVignette: 'Crisis epiléptica focal con alteración de la consciencia en el uncus del hipocampo (crisis uncinada).',
    targetHotspotId: 'temporal_lobe',
    hint: 'Lóbulo lateral inferior ubicado por debajo de la cisura lateral de Silvio.',
    explanation: 'El lóbulo temporal aloja estructuras mediales críticas como el uncus y la amígdala. Las crisis epilépticas mesiotemporales suelen iniciar con auras olfatorias o epigástricas ascendentes ("déjà vu").'
  },

  // 16. Corteza Auditiva Primaria (Heschl)
  {
    id: 'quiz-curated-auditory',
    category: 'Áreas de Brodmann',
    type: 'anatomical',
    question: '¿Qué circunvolución transversal situada en la cara superior del lóbulo temporal (áreas 41 y 42 de Brodmann) recibe la proyección tonotópica de las radiaciones acústicas del cuerpo geniculado medial?',
    targetHotspotId: 'brodmann_41_42_auditory',
    hint: 'Giro transversal de Heschl en el plano temporal dentro de la profundidad del surco lateral.',
    explanation: 'Las áreas 41 y 42 de Brodmann (circunvoluciones transversas de Heschl) forman la corteza auditiva primaria (A1), organizada de forma tonotópica desde frecuencias bajas a altas.'
  },

  // 17. Corteza Visual Primaria (V1)
  {
    id: 'quiz-curated-visual-v1',
    category: 'Áreas de Brodmann',
    type: 'anatomical',
    question: '¿Qué área citoarquitectónica de Brodmann (área estriada con la línea de Gennari) se distribuye a lo largo de los labios superior e inferior de la cisura calcarina?',
    targetHotspotId: 'brodmann_17_visual',
    hint: 'Área 17 de Brodmann en el polo occipital medial.',
    explanation: 'El área 17 de Brodmann (V1) es la corteza estriada receptora de las fibras retinotípicas directas provenientes del cuerpo geniculado lateral a través de las radiaciones ópticas.'
  },

  // 18. Surco Calcarino
  {
    id: 'quiz-curated-calcarine',
    category: 'Surcos y Cisuras',
    type: 'anatomical',
    question: '¿Qué surco profundo de la cara medial del lóbulo occipital divide el cuneus (superior) del giro lingual (inferior)?',
    targetHotspotId: 'calcarine_sulcus',
    hint: 'Surco calcarino, eje central de la fisura de la visión.',
    explanation: 'El surco calcarino es el hito anatómico de referencia en la cara medial del lóbulo occipital; a su alrededor se organiza la corteza visual primaria.'
  },

  // 19. Cisura Interhemisférica
  {
    id: 'quiz-curated-interhemispheric',
    category: 'Surcos y Cisuras',
    type: 'anatomical',
    question: '¿Qué fisura anatómica longitudinal sagital profunda separa por completo ambos hemisferios telencefálicos y aloja a la hoz del cerebro y a las arterias pericallosas?',
    targetHotspotId: 'interhemispheric_fissure',
    hint: 'Fisura longitudinal cerebral que discurre de anterior a posterior en la línea media.',
    explanation: 'La cisura interhemisférica aloja el pliegue dural de la hoz del cerebro, el seno sagital superior en su techo y las ramas pericallosas de la arteria cerebral anterior sobre el cuerpo calloso.'
  },

  // 20. Protuberancia y Parálisis de Mirada Conjugada
  {
    id: 'quiz-curated-pons',
    category: 'Tronco y Cerebelo',
    type: 'clinical',
    question: 'Paciente que tras un ictus de tronco presenta incapacidad para mover ambos ojos hacia la derecha (parálisis de la mirada conjugada horizontal ipsilateral) y parálisis facial derecha completa. ¿En qué segmento del tronco se localiza la lesión del PPRF y colículo facial?',
    clinicalVignette: 'Infarto pontino tegmental paramediano que compromete la formación reticular pontina paramediana (PPRF) y el bucle interno del facial.',
    targetHotspotId: 'pons_brainstem',
    hint: 'Estructura prominente abultada con fibras transversas que conecta el mesencéfalo con el bulbo.',
    explanation: 'La protuberancia (puente de Varolio) contiene el centro de la mirada horizontal (PPRF), el núcleo del VI par y la rodilla interna del nervio facial que rodea al abducens en el suelo del IV ventrículo.'
  }
];

// Combine all curated questions into a solid master repository
export const ALL_CURATED_QUESTIONS: QuizQuestion[] = [
  ...BASE_CURATED_QUESTIONS,
  ...ADDITIONAL_CURATED_QUESTIONS,
];

// ======================================================================
// DYNAMIC PROCEDURAL GENERATOR (ALWAYS UP-TO-DATE WITH `HOTSPOTS_DATA`)
// ======================================================================
/**
 * Automatically inspects the live `HOTSPOTS_DATA` array and generates
 * fresh, high-quality anatomical & clinical quiz questions for any hotspot.
 * This guarantees that if a developer or medical expert updates or adds
 * hotspots to Neureb 3D, the quiz questions are immediately and seamlessly updated!
 */
export function generateProceduralQuestionsFromHotspots(hotspots: HotspotData[]): QuizQuestion[] {
  const generated: QuizQuestion[] = [];

  hotspots.forEach((hotspot) => {
    // 1. Procedural Clinical / Pathological Question
    if (hotspot.clinicalSignificance && hotspot.clinicalSignificance.length > 30) {
      generated.push({
        id: `dyn-clin-${hotspot.id}`,
        category: hotspot.system || 'Clínica & Patología',
        type: 'clinical',
        question: `En la correlación clínico-quirúrgica: "${hotspot.clinicalSignificance}". ¿Qué estructura anatómica del atlas 3D es el sustrato de este proceso?`,
        clinicalVignette: `Estructura: ${hotspot.title} (${hotspot.latinTitle})`,
        targetHotspotId: hotspot.id,
        hint: hotspot.anatomy ? hotspot.anatomy.slice(0, 140) + '...' : `Busca en el sistema ${hotspot.system}.`,
        explanation: `${hotspot.title}: ${hotspot.summary} Función primordial: ${hotspot.function}`
      });
    }

    // 2. Procedural Physiological / Functional Question
    if (hotspot.function && hotspot.function.length > 30) {
      generated.push({
        id: `dyn-func-${hotspot.id}`,
        category: hotspot.system || 'Fisiología',
        type: 'anatomical',
        question: `¿Qué estructura neuroanatómica es la responsable principal de: "${hotspot.function}"?`,
        targetHotspotId: hotspot.id,
        hint: `Descrita en Terminologia Anatomica como "${hotspot.latinTitle}".`,
        explanation: `${hotspot.title} (${hotspot.latinTitle}). ${hotspot.anatomy}`
      });
    }

    // 3. Procedural Surgical Question (when available)
    if (hotspot.surgicalNotes && hotspot.surgicalNotes.length > 30) {
      generated.push({
        id: `dyn-surg-${hotspot.id}`,
        category: 'Neurocirugía',
        type: 'clinical',
        question: `En neurocirugía y microdisección anatómica: "${hotspot.surgicalNotes}". ¿Qué diana quirúrgica corresponde a esta vía de abordaje?`,
        clinicalVignette: `Abordaje quirúrgico hacia ${hotspot.title}.`,
        targetHotspotId: hotspot.id,
        hint: `Ubicada en el compartimento: ${hotspot.system}.`,
        explanation: `Diana quirúrgica: ${hotspot.title}. Consideraciones: ${hotspot.surgicalNotes}`
      });
    }
  });

  return generated;
}

// ======================================================================
// QUIZ ENGINE CORE FUNCTIONS (SHUFFLE, CATEGORY FILTERS, PROGRESSION)
// ======================================================================

/**
 * Modern Fisher-Yates array shuffling algorithm for true uniform randomness.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export type QuizCategoryFilter =
  | 'all'
  | 'Pares Craneales'
  | 'Vascular'
  | 'Áreas de Brodmann'
  | 'Tronco y Cerebelo'
  | 'Lóbulos y Giros'
  | 'Estructuras Profundas'
  | 'Casos Clínicos';

/**
 * Retrieves the comprehensive, fully updated question pool.
 * It synthesizes all curated questions + live procedurally generated questions
 * from `HOTSPOTS_DATA`, eliminating duplicates and ensuring 100% test coverage.
 */
export function getLiveUpdatedQuestionPool(
  category: QuizCategoryFilter = 'all',
  includeProcedural: boolean = true
): QuizQuestion[] {
  // 1. Gather curated questions
  let pool = [...ALL_CURATED_QUESTIONS];

  // 2. Gather live procedural questions if requested
  if (includeProcedural) {
    const procedural = generateProceduralQuestionsFromHotspots(HOTSPOTS_DATA);
    // Deduplicate so we don't duplicate identical target hotspots in the same batch
    const curatedTargetIds = new Set(pool.map((q) => q.targetHotspotId));
    const novelProcedural = procedural.filter((p) => !curatedTargetIds.has(p.targetHotspotId));
    pool = [...pool, ...novelProcedural];
  }

  // 3. Filter by category
  if (category !== 'all') {
    pool = pool.filter((q) => {
      if (category === 'Pares Craneales') {
        return q.category.includes('Pares') || q.targetHotspotId.startsWith('cn_');
      }
      if (category === 'Vascular') {
        return (
          q.category.includes('Vascular') ||
          q.category.includes('Arterial') ||
          q.category.includes('Venoso') ||
          q.targetHotspotId.includes('mca') ||
          q.targetHotspotId.includes('aca') ||
          q.targetHotspotId.includes('basilar') ||
          q.targetHotspotId.includes('pca') ||
          q.targetHotspotId.includes('ica') ||
          q.targetHotspotId.includes('sinus') ||
          q.targetHotspotId.includes('vein')
        );
      }
      if (category === 'Áreas de Brodmann') {
        return q.category.includes('Brodmann') || q.targetHotspotId.startsWith('brodmann_');
      }
      if (category === 'Tronco y Cerebelo') {
        return (
          q.category.includes('Tronco') ||
          q.category.includes('Cerebelo') ||
          q.targetHotspotId.includes('mesencephalon') ||
          q.targetHotspotId.includes('pons') ||
          q.targetHotspotId.includes('medulla') ||
          q.targetHotspotId.includes('cerebellum')
        );
      }
      if (category === 'Lóbulos y Giros') {
        return (
          q.category.includes('Lóbulos') ||
          q.category.includes('Surcos') ||
          q.targetHotspotId.includes('lobe') ||
          q.targetHotspotId.includes('sulcus') ||
          q.targetHotspotId.includes('fissure')
        );
      }
      if (category === 'Estructuras Profundas') {
        return (
          q.category.includes('Profundas') ||
          q.targetHotspotId.includes('thalamus') ||
          q.targetHotspotId.includes('ventricular') ||
          q.targetHotspotId.includes('callosum') ||
          q.targetHotspotId.includes('hippocampus') ||
          q.targetHotspotId.includes('striatum')
        );
      }
      if (category === 'Casos Clínicos') {
        return q.type === 'clinical' || !!q.clinicalVignette;
      }
      return q.category === category;
    });
  }

  return pool;
}

/**
 * Creates a randomized, fresh test session.
 * @param count Number of questions (e.g. 5, 10, 20 or all). Pass -1 for all.
 * @param category Category filter.
 */
export function createRandomizedQuizSession(
  count: number = 10,
  category: QuizCategoryFilter = 'all'
): QuizQuestion[] {
  const pool = getLiveUpdatedQuestionPool(category, true);
  const shuffled = shuffleArray(pool);

  if (count <= 0 || count >= shuffled.length) {
    return shuffled;
  }
  return shuffled.slice(0, count);
}

// ======================================================================
// LOCALSTORAGE PROGRESS & STATISTICS PERSISTENCE
// ======================================================================
const STORAGE_KEY_QUIZ_STATS = 'neureb_quiz_stats_v1';
const STORAGE_KEY_FAILED_QUESTIONS = 'neureb_quiz_failed_ids_v1';

export interface QuizUserStats {
  totalAnswered: number;
  totalCorrect: number;
  streak: number;
  lastUpdated: string;
}

export function loadQuizStats(): QuizUserStats {
  if (typeof window === 'undefined') {
    return { totalAnswered: 0, totalCorrect: 0, streak: 0, lastUpdated: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZ_STATS);
    if (!raw) {
      return { totalAnswered: 0, totalCorrect: 0, streak: 0, lastUpdated: new Date().toISOString() };
    }
    return JSON.parse(raw);
  } catch {
    return { totalAnswered: 0, totalCorrect: 0, streak: 0, lastUpdated: new Date().toISOString() };
  }
}

export function saveQuizAttempt(questionId: string, isCorrect: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const stats = loadQuizStats();
    stats.totalAnswered += 1;
    if (isCorrect) {
      stats.totalCorrect += 1;
      stats.streak += 1;
    } else {
      stats.streak = 0;
    }
    stats.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_QUIZ_STATS, JSON.stringify(stats));

    // Track failed questions for intelligent review
    const failedIdsRaw = localStorage.getItem(STORAGE_KEY_FAILED_QUESTIONS);
    const failedSet = new Set<string>(failedIdsRaw ? JSON.parse(failedIdsRaw) : []);
    if (isCorrect) {
      failedSet.delete(questionId);
    } else {
      failedSet.add(questionId);
    }
    localStorage.setItem(STORAGE_KEY_FAILED_QUESTIONS, JSON.stringify(Array.from(failedSet)));
  } catch (err) {
    console.error('Error saving quiz progress', err);
  }
}

export function getFailedQuestionsForReview(): QuizQuestion[] {
  if (typeof window === 'undefined') return [];
  try {
    const failedIdsRaw = localStorage.getItem(STORAGE_KEY_FAILED_QUESTIONS);
    if (!failedIdsRaw) return [];
    const failedIds: string[] = JSON.parse(failedIdsRaw);
    if (failedIds.length === 0) return [];

    const allQuestions = getLiveUpdatedQuestionPool('all', true);
    return allQuestions.filter((q) => failedIds.includes(q.id));
  } catch {
    return [];
  }
}
