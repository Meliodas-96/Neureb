import { HotspotData, LayerMetadata, CameraPresetConfig, AnatomicalLayerId } from '@/types/brain';

// Centralized anatomical origin offset for the entire 3D scene (eliminates magic numbers)
export const MODEL_ORIGIN_OFFSET = [0, -0.175, -0.081] as const;

export const HOTSPOT_LAYER_MAP: Record<string, AnatomicalLayerId> = {
  mca_bifurcation: 'Artery_Cerebral_Media',
  aca_acom: 'Artery_Cerebral_Anterior',
  basilar_apex: 'Artery_Vertebrobasilar',
  optic_chiasm: 'Cranial_Nerves',
  pons_brainstem: 'Brainstem',
  cerebellum_hemisphere: 'Cerebellum',
  temporal_lobe: 'Cerebrum',
  superficial_veins: 'Veins_Cerebral_Superficial',
};

export const ANATOMICAL_LAYERS: LayerMetadata[] = [
  {
    id: 'Artery_Cerebral_Media',
    name: 'Arteria Cerebral Media (ACM / MCA)',
    latinName: 'Arteria cerebri media',
    category: 'arteries',
    color: '#dc2626',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    description: 'Rama terminal de la carótida interna que irriga la mayor parte de la superficie lateral hemisférica.',
  },
  {
    id: 'Artery_Cerebral_Anterior',
    name: 'Arteria Cerebral Anterior (ACA)',
    latinName: 'Arteria cerebri anterior',
    category: 'arteries',
    color: '#ef4444',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    description: 'Irriga la cara medial de los lóbulos frontal y parietal, y el cuerpo calloso.',
  },
  {
    id: 'Artery_Vertebrobasilar',
    name: 'Tronco Basilar y Vertebrales',
    latinName: 'Arteria basilaris et vertebralis',
    category: 'arteries',
    color: '#b91c1c',
    badgeColor: 'bg-red-700/20 text-red-300 border-red-700/30',
    description: 'Circulación posterior que nutre el tronco del encéfalo, cerebelo y lóbulos occipitales.',
  },
  {
    id: 'Veins_Cerebral_Superficial',
    name: 'Venas Corticales Superficiales',
    latinName: 'Venae superficiales cerebri',
    category: 'veins',
    color: '#1d4ed8',
    badgeColor: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    description: 'Sistema venoso superficial (incluyendo Trolard y Labbé) que drena hacia los senos sagital y transverso.',
  },
  {
    id: 'Cranial_Nerves',
    name: 'Pares Craneales y Quiasma',
    latinName: 'Nervi craniales / Chiasma opticum',
    category: 'nerves',
    color: '#fffbeb',
    badgeColor: 'bg-amber-100/20 text-amber-200 border-amber-200/30',
    description: 'Nervios periféricos emergentes del encéfalo y encrucijada visual quiasmática.',
  },
  {
    id: 'Cerebrum',
    name: 'Corteza Cerebral (Telencéfalo)',
    latinName: 'Cortex cerebri / Cerebrum',
    category: 'parenchyma',
    color: '#d9a296',
    badgeColor: 'bg-rose-300/20 text-rose-200 border-rose-300/30',
    description: 'Hemisferios cerebrales con circunvoluciones y surcos que albergan funciones cognitivas y motoras.',
  },
  {
    id: 'Cerebellum',
    name: 'Cerebelo',
    latinName: 'Cerebellum',
    category: 'parenchyma',
    color: '#a86858',
    badgeColor: 'bg-amber-700/20 text-amber-300 border-amber-700/30',
    description: 'Estructura en fosa posterior encargada de la modulación motora, postura y aprendizaje motor.',
  },
  {
    id: 'Brainstem',
    name: 'Tronco Encefálico (Tallo)',
    latinName: 'Truncus encephalicus',
    category: 'parenchyma',
    color: '#ecd8c3',
    badgeColor: 'bg-orange-100/20 text-orange-200 border-orange-200/30',
    description: 'Mesencéfalo, protuberancia anular (pons) y bulbo raquídeo; control cardiovascular y respiratorio.',
  },
];

export const HOTSPOTS_DATA: HotspotData[] = [
  {
    id: 'mca_bifurcation',
    title: 'Arteria Cerebral Media (ACM - M1/M2)',
    latinTitle: 'Arteria cerebri media (Segmentum M1/M2)',
    system: 'Arterial',
    targetLayer: 'Artery_Cerebral_Media',
    categoryColor: '#dc2626',
    position: [-0.22, 0.24, 0.02],
    cameraOffset: [-0.95, 0.35, 0.65],
    summary: 'Bifurcación insular en la cisura de Silvio que da origen a las ramas operculares y corticales.',
    anatomy: 'La arteria cerebral media emerge de la carótida interna y discurre horizontalmente (segmento M1) hacia el surco lateral o de Silvio. Se divide en troncos superior e inferior (segmento M2) sobre la ínsula.',
    function: 'Irriga la corteza motora y somatosensorial primaria correspondiente a cara y extremidad superior, el área motora del lenguaje (Broca) en el hemisferio dominante y la corteza auditiva.',
    clinicalSignificance: 'Territorio vascular más frecuentemente afectado en accidentes cerebrovasculares isquémicos (ictus isquémico por tromboembolismo). Su oclusión proximal produce hemiplejía contralateral faciobraquial y afasia global o de Broca.',
    surgicalNotes: 'Zona crítica para clipaje de aneurismas saculares en la bifurcación de la cisura de Silvio mediante abordaje pterional.'
  },
  {
    id: 'aca_acom',
    title: 'Complejo Cerebral Anterior (ACA - A1/A2)',
    latinTitle: 'Arteria cerebri anterior & ACom',
    system: 'Arterial',
    targetLayer: 'Artery_Cerebral_Anterior',
    categoryColor: '#ef4444',
    position: [0.0, 0.32, -0.16],
    cameraOffset: [0.0, 0.65, -1.05],
    summary: 'Eje vascular frontal medial y comunicante anterior en la cisura interhemisférica.',
    anatomy: 'El segmento A1 viaja medialmente sobre el quiasma óptico hacia la cisura interhemisférica, donde se anastomosa con la arteria contralateral a través de la arteria comunicante anterior (ACom), continuando como segmento A2 pericalloso.',
    function: 'Nutre la cara medial de los lóbulos frontales y parietales, la porción motora y sensitiva de las extremidades inferiores y el tercio anterior del cuerpo calloso.',
    clinicalSignificance: 'La arteria comunicante anterior es la localización más común de aneurismas intracraneales (~30-35%). Su rotura causa hemorragia subaracnoidea (HSA) masiva con riesgo de vasoespasmo.',
    surgicalNotes: 'Abordaje subfrontal o pterional interhemisférico con preservación estricta de las ramas perforantes hipotalámicas y arteria recurrente de Heubner.'
  },
  {
    id: 'basilar_apex',
    title: 'Tronco Basilar y Confluencia Vertebral',
    latinTitle: 'Arteria basilaris',
    system: 'Arterial',
    targetLayer: 'Artery_Vertebrobasilar',
    categoryColor: '#b91c1c',
    position: [0.0, -0.12, 0.26],
    cameraOffset: [0.0, -0.65, 1.05],
    summary: 'Tronco principal de la circulación vertebrobasilar situado en el surco basilar de la protuberancia.',
    anatomy: 'Formada por la unión de las dos arterias vertebrales a nivel del surco bulbopontino. Asciende por la cara ventral del puente y culmina bifurcándose en las dos arterias cerebrales posteriores (PCA).',
    function: 'Suministra flujo arterial vital a todo el tronco encefálico (núcleos de pares craneales, formación reticular), al laberinto auditivo y a las arterias cerebelosas (AICA, SCA).',
    clinicalSignificance: 'La trombosis aguda de la arteria basilar es un evento neurológico catastrófico de altísima mortalidad o secuela en síndrome de enclaustramiento (Locked-in syndrome).',
    surgicalNotes: 'Abordajes de fosa posterior y ángulo pontocerebeloso; manipulación extremadamente delicada debido a las múltiples ramas perforantes pontinas.'
  },
  {
    id: 'optic_chiasm',
    title: 'Quiasma Óptico y Pares Craneales Anteriores',
    latinTitle: 'Chiasma opticum (Nervus opticus - CN II)',
    system: 'Tronco y Pares',
    targetLayer: 'Cranial_Nerves',
    categoryColor: '#fffbeb',
    position: [0.0, 0.08, -0.12],
    cameraOffset: [0.0, 0.45, -1.05],
    summary: 'Cruce parcial de las fibras nerviosas retinianas nasales en la base del hipotálamo.',
    anatomy: 'Estructura oblonga cuadrilátera situada sobre la tienda de la hipófisis y el diafragma selar. Recibe ambos nervios ópticos (CN II) y emite las cintillas ópticas hacia los cuerpos geniculados laterales.',
    function: 'Permite la visión binocular y la formación del campo visual periférico al decusar las fibras provenientes de las hemirretinas nasales.',
    clinicalSignificance: 'Compresión extrínseca típica por adenomas hipofisarios (macroadenomas) o craneofaringiomas, produciendo hemianopsia bitemporal progresiva característica.',
    surgicalNotes: 'Corredor anatómico clave en abordajes endoscópicos transesfenoidales endonasales a la región selar y paraselar.'
  },
  {
    id: 'pons_brainstem',
    title: 'Protuberancia Anular (Pons de Varolio)',
    latinTitle: 'Pons (Truncus encephalicus)',
    system: 'Tronco y Pares',
    targetLayer: 'Brainstem',
    categoryColor: '#ecd8c3',
    position: [0.0, -0.06, 0.16],
    cameraOffset: [0.75, -0.15, 0.95],
    summary: 'Prominencia media ventral del tronco del encéfalo, puente de conexión entre corteza y cerebelo.',
    anatomy: 'Limitada rostralmente por el surco pontomesencefálico y caudalmente por el surco bulbopontino. Su cara ventral convexa presenta estrías transversas y la emergencia del nervio trigémino (CN V).',
    function: 'Contiene los núcleos de los pares craneales V, VI, VII y VIII; centros moduladores respiratorios (neumotáxico y apnéustico) y las vías corticoespinales descendentes.',
    clinicalSignificance: 'Las hemorragias pontinas hipertensivas cursan con coma repentino, pupilas puntiformes y tetraplejía. En desmielinización por corrección rápida de hiponatremia ocurre mielinólisis central pontina.',
    surgicalNotes: 'Zona quirúrgica de alta elocuencia; las lesiones intrínsecas requieren mapeo neurofisiológico intraoperatorio riguroso.'
  },
  {
    id: 'cerebellum_hemisphere',
    title: 'Hemisferio Cerebeloso y Vermis',
    latinTitle: 'Cerebellum (Hemispherium cerebelli)',
    system: 'Corteza y Parénquima',
    targetLayer: 'Cerebellum',
    categoryColor: '#a86858',
    position: [0.22, -0.10, 0.32],
    cameraOffset: [0.95, -0.05, 0.95],
    summary: 'Masa encefálica en fosa posterior constituida por corteza de tres capas y núcleos profundos.',
    anatomy: 'Dividido en dos hemisferios unidos centralmente por el vermis. Se conecta al tronco mediante tres pares de pedúnculos cerebelosos (superior, medio e inferior).',
    function: 'Control metrométrico y coordinación del movimiento voluntario (sinergia), mantenimiento del equilibrio y tono postural.',
    clinicalSignificance: 'Síndromes cerebelosos hemisféricos cursan con dismetría, disdiadococinesia, ataxia ipsilateral y temblor intencional. Malformación de Chiari I por descenso tonsilar por debajo del foramen magnum.',
    surgicalNotes: 'Vía de abordaje suboccipital retrosigmoideo para tumores del ángulo pontocerebeloso (schwannomas vestibulares).'
  },
  {
    id: 'temporal_lobe',
    title: 'Lóbulo Temporal y Giro Parahipocampal',
    latinTitle: 'Lobus temporalis',
    system: 'Corteza y Parénquima',
    targetLayer: 'Cerebrum',
    categoryColor: '#d9a296',
    position: [-0.30, 0.16, 0.05],
    cameraOffset: [-1.15, 0.35, 0.45],
    summary: 'Porción inferolateral del hemisferio cerebral que descansa sobre la fosa craneal media.',
    anatomy: 'Presenta tres giros o circunvoluciones externas (superior T1, media T2 e inferior T3) y estructuras mesiales profundas (hipocampo, uncus y amígdala).',
    function: 'Consolidación de memoria episódica, audición primaria (área de Heschl), comprensión del lenguaje receptivo (Wernicke) y procesamiento emocional.',
    clinicalSignificance: 'Foco más frecuente de epilepsia refractaria del adulto (esclerosis mesial temporal). Gliomas de bajo y alto grado con riesgo de afasia sensorial.',
    surgicalNotes: 'Lobectomía temporal anteromedial y amigdalohipocampectomía selectiva guiada por neuronavegación 3D.'
  },
  {
    id: 'superficial_veins',
    title: 'Venas Corticales y Drenaje Anastomótico',
    latinTitle: 'Venae superficiales (Trolard & Labbé)',
    system: 'Venoso',
    targetLayer: 'Veins_Cerebral_Superficial',
    categoryColor: '#1d4ed8',
    position: [-0.20, 0.36, 0.08],
    cameraOffset: [-0.85, 0.95, 0.65],
    summary: 'Red venosa cortical tributaria de los grandes colectores durales cerebrales.',
    anatomy: 'Comprende la vena anastomótica superior de Trolard (que drena hacia el seno sagital superior) y la vena anastomótica inferior de Labbé (que drena hacia el seno transverso).',
    function: 'Drenaje desoxigenado de la corteza y sustancia blanca subcortical hacia la circulación yugular interna.',
    clinicalSignificance: 'La trombosis de senos venosos durales o de venas corticales causa hipertensión intracraneal, cefalea refractaria e infartos hemorrágicos venosos.',
    surgicalNotes: 'Durante las craneotomías frontoparietales y temporales, la preservación de las venas puente y de Labbé es mandataria para evitar infarto venoso hemorrágico masivo e hinchazón cerebral intraoperatoria.'
  }
];

export const CAMERA_PRESETS: CameraPresetConfig[] = [
  {
    id: 'anterior',
    label: 'Anterior (Frontal)',
    position: [0, 0.15, -1.8],
    target: [0, 0.05, 0],
    description: 'Vista frontal del encéfalo, quiasma óptico y ramas anteriores'
  },
  {
    id: 'posterior',
    label: 'Posterior (Occipital)',
    position: [0, 0.15, 1.8],
    target: [0, 0.05, 0],
    description: 'Vista posterior occipital y cerebelosa'
  },
  {
    id: 'left',
    label: 'Lateral Izquierda',
    position: [-1.8, 0.15, 0],
    target: [0, 0.05, 0],
    description: 'Hemisferio cerebral izquierdo y cisura de Silvio'
  },
  {
    id: 'right',
    label: 'Lateral Derecha',
    position: [1.8, 0.15, 0],
    target: [0, 0.05, 0],
    description: 'Hemisferio cerebral derecho y red vascular'
  },
  {
    id: 'superior',
    label: 'Superior (Vértice)',
    position: [0, 2.0, 0.05],
    target: [0, 0.05, 0],
    description: 'Vista cenital de ambos hemisferios y cisura longitudinal'
  },
  {
    id: 'base',
    label: 'Base / Ventral',
    position: [0, -1.8, 0.05],
    target: [0, 0.05, 0],
    description: 'Vista inferior del polígono arterial, tronco del encéfalo y pares craneales'
  },
  {
    id: 'isometric',
    label: 'Perspectiva 3D',
    position: [-1.2, 1.0, -1.3],
    target: [0, 0.05, 0],
    description: 'Perspectiva tridimensional anatómica general'
  }
];
