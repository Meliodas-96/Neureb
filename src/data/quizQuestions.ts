import { QuizQuestion } from '@/types/brain';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Paciente de 54 años acude a urgencias por cefalea súbita, ptosis palpebral derecha y pupila derecha midriática arreactiva a la luz con ojo desviado "hacia abajo y afuera". ¿Qué estructura anatómica está comprimida?',
    clinicalVignette: 'Parálisis del III par con afectación pupilar por compresión aneurismática (PCom) o hernia uncal transtentorial.',
    targetHotspotId: 'cn_iii_oculomotor',
    hint: 'Busca el par craneal que emerge en la fosa interpeduncular de la cara ventral del mesencéfalo.',
    explanation: 'El nervio oculomotor (CN III) emerge en la fosa interpeduncular del mesencéfalo. Sus fibras parasimpáticas pupiloconstrictoras discurren en la periferia del nervio, siendo muy vulnerables a compresión extrínseca.'
  },
  {
    id: 'quiz-2',
    category: 'Áreas de Brodmann',
    type: 'clinical',
    question: 'Un paciente tras sufrir un ictus presenta habla vacilante, no fluida y con gran esfuerzo articulatorio, pero comprende perfectamente las instrucciones verbales y escritas. ¿Qué área de la corteza está afectada?',
    clinicalVignette: 'Afasia motora o de Broca con comprensión preservada pero expresión gravemente deteriorada.',
    targetHotspotId: 'brodmann_44_45_broca',
    hint: 'Localizada en la circunvolución frontal inferior (pars opercularis y triangularis) del hemisferio dominante.',
    explanation: 'El área de Broca (áreas 44 y 45 de Brodmann) en el giro frontal inferior del hemisferio dominante coordina la motilidad fonoarticulatoria y la gramática del lenguaje expresivo.'
  },
  {
    id: 'quiz-3',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Mujer de 32 años presenta pérdida auditiva neurosensorial progresiva en oído izquierdo y acúfenos de un año de evolución, junto con inestabilidad de la marcha. ¿Qué nervio craneal presenta la neoplasia benigna más habitual en el ángulo pontocerebeloso?',
    clinicalVignette: 'Schwannoma vestibular (neurinoma del acústico) que afecta a la rama vestibular del VIII par craneal.',
    targetHotspotId: 'cn_viii_vestibulocochlear',
    hint: 'Emerge en el ángulo pontocerebeloso, lateral al nervio facial, e ingresa al conducto auditivo interno.',
    explanation: 'El nervio vestibulococlear (CN VIII) emerge en la porción lateral del ángulo pontocerebeloso. El schwannoma vestibular se origina en las células de Schwann de la división vestibular superior o inferior.'
  },
  {
    id: 'quiz-4',
    category: 'Lóbulos y Giros',
    type: 'clinical',
    question: 'Paciente que tras un traumatismo encéfalocraneal severo sobrevive pero desarrolla un cambio drástico de personalidad, desinhibición social, agresividad y apatía marcada con pérdida de las funciones ejecutivas. ¿Qué lóbulo cerebral está lesionado?',
    clinicalVignette: 'Síndrome disejecutivo frontal orbitofrontal y dorsolateral (análogo al caso histórico de Phineas Gage).',
    targetHotspotId: 'frontal_lobe_pfc',
    hint: 'Constituye el polo anterior de los hemisferios cerebrales.',
    explanation: 'La corteza prefrontal del lóbulo frontal es el sustrato neural de las funciones ejecutivas, la toma de decisiones, la metacognición y el control inhibitorio social y emocional.'
  },
  {
    id: 'quiz-5',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Paciente refiere paroxismos de dolor punzante e intensísimo, como descargas eléctricas, desencadenados al masticar, lavarse los dientes o tocarse la mejilla derecha. ¿Qué nervio craneal está implicado?',
    clinicalVignette: 'Neuralgia típica del trigémino en territorio de las ramas maxilar (V2) o mandibular (V3).',
    targetHotspotId: 'cn_v_trigeminal',
    hint: 'Emerge con dos raíces en la cara anterolateral de la protuberancia (puente de Varolio).',
    explanation: 'El nervio trigémino (CN V) es el gran nervio sensitivo facial. La compresión neurovascular en su zona de entrada radicular en el puente causa neuralgia del trigémino.'
  },
  {
    id: 'quiz-6',
    category: 'Áreas de Brodmann',
    type: 'clinical',
    question: 'Paciente que habla con ritmo y prosodia normales pero utilizando palabras inventadas (neologismos) y oraciones sin coherencia semántica, incapaz de entender lo que se le dice ni de reconocer su propio error. ¿Qué área está lesionada?',
    clinicalVignette: 'Afasia receptiva o de Wernicke con jergafasia, anosognosia y comprensión nula.',
    targetHotspotId: 'brodmann_22_wernicke',
    hint: 'Ubicada en el tercio posterior de la circunvolución temporal superior (T1).',
    explanation: 'El área de Wernicke (área 22 de Brodmann) en la porción posterior del giro temporal superior decodifica y asigna significado fonológico a las palabras.'
  },
  {
    id: 'quiz-7',
    category: 'Tronco Encefálico',
    type: 'clinical',
    question: 'En un infarto bulbar lateral (síndrome de Wallenberg) por oclusión de la arteria cerebelosa posteroinferior (PICA), ¿en qué subdivisión del tronco encefálico se localiza la lesión?',
    clinicalVignette: 'Afectación del núcleo ambiguo, núcleo espinal del trigémino, tracto espinotalámico y fibras simpáticas descendentes.',
    targetHotspotId: 'medulla_oblongata',
    hint: 'Es la porción más caudal del tronco, anterior al cerebelo e inmediatamente superior al foramen magnum.',
    explanation: 'La médula oblongada o bulbo raquídeo contiene los núcleos vestibulares, el núcleo ambiguo (pares IX, X) y las vías sensitivas ascendentes y motoras piramidales.'
  },
  {
    id: 'quiz-8',
    category: 'Surcos y Cisuras',
    type: 'anatomical',
    question: '¿Qué gran surco o cisura separa de forma anatómica y funcional el lóbulo frontal del lóbulo parietal, demarcando el giro precentral del poscentral?',
    targetHotspotId: 'central_sulcus_rolando',
    hint: 'Conocido históricamente como cisura de Rolando.',
    explanation: 'El surco central (de Rolando) es el límite anatómico crítico entre la corteza motora primaria (M1) anterior y la corteza somatosensorial primaria (S1) posterior.'
  },
  {
    id: 'quiz-9',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Al explorar la orofaringe de un paciente con un ictus de tronco, se observa ausencia del reflejo nauseoso y elevación asimétrica del velo del paladar con desviación de la úvula hacia el lado sano. ¿Qué par craneal motor visceral está lesionado?',
    clinicalVignette: 'Parálisis del nervio vago con afectación del músculo elevador del velo del paladar y constrictores faríngeos.',
    targetHotspotId: 'cn_x_vagus',
    hint: 'Emerge en el surco retroolivar del bulbo entre los pares IX y XI.',
    explanation: 'El nervio vago (CN X) provee inervación motora branchial a la musculatura del velo del paladar, faringe y laringe a través del núcleo ambiguo.'
  },
  {
    id: 'quiz-10',
    category: 'Lóbulos y Giros',
    type: 'clinical',
    question: 'Paciente que tras una hemorragia occipital bilateral preserva la agudeza visual pero es incapaz de reconocer rostros humanos conocidos (prosopagnosia) o presenta hemianopsia homónima congruente. ¿Qué lóbulo alberga la corteza visual?',
    clinicalVignette: 'Pérdida de integración visual y procesamiento en la corteza estriada pericalcarina.',
    targetHotspotId: 'occipital_lobe',
    hint: 'Polo posterior del cerebro situado sobre el tentorio cerebeloso.',
    explanation: 'El lóbulo occipital y en particular el área 17 (corteza visual primaria V1 en los bordes de la cisura calcarina) y áreas asociativas 18-19 procesan toda la información retinotópica.'
  },
  {
    id: 'quiz-11',
    category: 'Pares Craneales',
    type: 'anatomical',
    question: '¿Cuál es el único nervio craneal cuyas fibras motoras emergen por la cara dorsal (posterior) del tronco encefálico antes de cruzar hacia la cara anterior?',
    targetHotspotId: 'cn_iv_trochlear',
    hint: 'Inerva el músculo oblicuo superior del ojo.',
    explanation: 'El nervio troclear o patético (CN IV) es el único con emergencia dorsal en el mesencéfalo caudal y tiene el recorrido intracraneal más largo de todos los pares craneales.'
  },
  {
    id: 'quiz-12',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Paciente con imposibilidad completa para fruncir el ceño, cerrar el ojo derecho y desviar la comisura labial derecha hacia arriba, junto con hiperacusia y pérdida del gusto en dos tercios anteriores de la lengua. ¿Qué nervio está afectado?',
    clinicalVignette: 'Parálisis facial periférica (parálisis de Bell) ipsilateral completa.',
    targetHotspotId: 'cn_vii_facial',
    hint: 'Emerge en la fosita supraolivar del ángulo pontocerebeloso e ingresa al conducto auditivo interno.',
    explanation: 'El nervio facial (CN VII) inerva todos los músculos de la mímica facial (tanto tercio superior como inferior en lesiones periféricas) y conduce el gusto anterior vía cuerda del tímpano.'
  },
  {
    id: 'quiz-13',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'En un paciente con debilidad e imposibilidad para abducir el ojo izquierdo (estrabismo convergente y diplopía horizontal al mirar a la izquierda) debido a hipertensión intracraneal, ¿qué nervio craneal está sufriendo tracción?',
    clinicalVignette: 'El VI par es el falso signo localizador de hipertensión endocraneal más común debido a su paso por el canal de Dorello.',
    targetHotspotId: 'cn_vi_abducens',
    hint: 'Emerge en el surco bulbopontino, superior a las pirámides bulbares.',
    explanation: 'El nervio abducens (CN VI) inerva el músculo recto lateral. Su ángulo agudo sobre el vértice del peñasco temporal lo hace vulnerable al desplazamiento hacia abajo del tronco encefálico.'
  },
  {
    id: 'quiz-14',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Al pedirle a un paciente que saque la lengua, esta se desvía de forma evidente hacia el lado izquierdo, observándose fasciculaciones y atrofia en la hemilengua izquierda. ¿Qué nervio craneal está lesionado?',
    clinicalVignette: 'Parálisis periférica de motoneurona inferior del hipogloso con acción predominante del músculo geniogloso sano contralateral.',
    targetHotspotId: 'cn_xii_hypoglossal',
    hint: 'Emerge como raicillas en el surco preolivar del bulbo raquídeo.',
    explanation: 'El nervio hipogloso (CN XII) inerva la musculatura lingual. El músculo geniogloso empuja la lengua hacia afuera; al fallar el izquierdo, el músculo contralateral sano empuja la lengua hacia el lado lesionado.'
  },
  {
    id: 'quiz-15',
    category: 'Áreas de Brodmann',
    type: 'anatomical',
    question: '¿En qué circunvolución y área de Brodmann se localiza la corteza motora primaria (M1), encargada del control motor voluntario contralateral fraccionado?',
    targetHotspotId: 'brodmann_4_motor',
    hint: 'Giro precentral, inmediatamente anterior al surco central.',
    explanation: 'El área 4 de Brodmann en el giro precentral contiene las células piramidales gigantes de Betz cuyos axones componen el tracto corticoespinal (piramidal).'
  },
  {
    id: 'quiz-16',
    category: 'Áreas de Brodmann',
    type: 'clinical',
    question: 'Paciente que tras una lesión isquémica parietal presenta asterognosia (incapacidad para reconocer una llave o moneda en la mano mediante el tacto) y pérdida de discriminación de dos puntos. ¿Qué área somatosensorial primaria está afectada?',
    clinicalVignette: 'Afectación del giro poscentral y representación táctil epicrítica contralateral.',
    targetHotspotId: 'brodmann_312_sensory',
    hint: 'Áreas 3, 1 y 2 de Brodmann en el giro poscentral.',
    explanation: 'La corteza somatosensorial primaria (S1, áreas 3, 1 y 2) recibe aferencias talámicas del lemnisco medial y tracto espinotalámico para la percepción táctil discriminativa y propioceptiva consciente.'
  },
  {
    id: 'quiz-17',
    category: 'Surcos y Cisuras',
    type: 'anatomical',
    question: '¿Qué profunda fisura lateral separa el lóbulo temporal inferiormente de los lóbulos frontal y parietal superiormente, sirviendo como vía de acceso microquirúrgica pterional?',
    targetHotspotId: 'sylvian_fissure_lateral',
    hint: 'Conocida como cisura de Silvio o surco lateral.',
    explanation: 'La cisura lateral o de Silvio alberga las ramas operculares y corticales de la arteria cerebral media y oculta en su profundidad a la ínsula de Reil.'
  },
  {
    id: 'quiz-18',
    category: 'Lóbulos y Giros',
    type: 'clinical',
    question: 'Corteza profunda oculta en el fondo de la cisura de Silvio implicada en la percepción del dolor visceral, la empatía, el procesamiento gustativo y las respuestas cardiovasculares autonómicas. ¿De qué lóbulo se trata?',
    clinicalVignette: 'Corteza insular anterior y posterior recubierta por los opérculos frontal, parietal y temporal.',
    targetHotspotId: 'insula_lobe',
    hint: 'Conocido como el quinto lóbulo cerebral o ínsula de Reil.',
    explanation: 'El lóbulo de la ínsula procesa señales interoceptivas somatoviscerales, el dolor, el procesamiento de adicciones y el gusto primario.'
  },
  {
    id: 'quiz-19',
    category: 'Tronco Encefálico',
    type: 'clinical',
    question: 'Estructura rostral del tronco encefálico donde se localizan los núcleos de la sustancia negra y los pedúnculos cerebrales. Su degeneración dopaminérgica es la causa de la Enfermedad de Parkinson. ¿Qué estructura es?',
    clinicalVignette: 'Mesencéfalo o cerebro medio con la vía nigroestriatal dopaminérgica.',
    targetHotspotId: 'mesencephalon_midbrain',
    hint: 'Situado entre el diencéfalo superiormente y la protuberancia inferiormente.',
    explanation: 'El mesencéfalo contiene la sustancia negra pars compacta (productora de dopamina hacia el cuerpo estriado), el núcleo rojo y los pedúnculos cerebrales motores.'
  },
  {
    id: 'quiz-20',
    category: 'Pares Craneales',
    type: 'clinical',
    question: 'Paciente con atrofia e incapacidad para encoger el hombro derecho contra resistencia y debilidad en la rotación de la cabeza hacia la izquierda tras una biopsia de ganglio linfático cervical posterior. ¿Qué par craneal se lesionó?',
    clinicalVignette: 'Lesión del nervio accesorio o espinal con paresia de los músculos trapecio y esternocleidomastoideo.',
    targetHotspotId: 'cn_xi_accessory',
    hint: 'Sus raíces espinales cervicales C1-C5 ascienden por el foramen magnum antes de salir por el agujero yugular.',
    explanation: 'El nervio accesorio (CN XI) inerva motrizmente al esternocleidomastoideo y al trapecio; su trayecto en el triángulo cervical posterior lo hace especialmente vulnerable a lesiones yatrogénicas quirúrgicas.'
  }
];
