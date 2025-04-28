
export interface Exercise {
  id: string;
  name: string;
  reps: string;
  image: string;
  isPopular?: boolean;
  equipment?: 'weights' | 'bodyweight' | 'machine';
  tips?: string;
  steps: {
    step: number;
    emoji: string;
    description: string;
  }[];
  muscleGroups: string;
}

export interface Day {
  id: string;
  name: string;
  focus: string;
  progress: number;
  exercises: Exercise[];
}

export interface Level {
  id: string;
  title: string;
  emoji: string;
  description: string;
  days: Day[];
}

// Helper function to generate exercise IDs
const exerciseId = (() => {
  let id = 0;
  return () => `ex${++id}`;
})();

// Define exercises with proper structure
const exercises: { [key: string]: Exercise } = {
  // Common Basic Exercises
  pressBanca: {
    id: exerciseId(),
    name: 'Press de banca',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,bench-press',
    isPopular: true,
    equipment: 'weights',
    tips: 'Mantén los omóplatos juntos y los pies apoyados en el suelo',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Acuéstate en el banco horizontal.' },
      { step: 2, emoji: '2️⃣', description: 'Agarra la barra con las manos a la anchura de los hombros.' },
      { step: 3, emoji: '3️⃣', description: 'Baja la barra hasta tocar ligeramente el pecho.' },
      { step: 4, emoji: '4️⃣', description: 'Empuja hacia arriba hasta que los brazos estén extendidos.' },
    ],
    muscleGroups: 'Pecho, Tríceps, Hombros',
  },
  pressInclinado: {
    id: exerciseId(),
    name: 'Press inclinado',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,incline-press',
    isPopular: false,
    equipment: 'weights',
    tips: 'Ángulo de inclinación ideal: 30-45 grados',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Acuéstate en banco inclinado a 45°.' },
      { step: 2, emoji: '2️⃣', description: 'Agarra las mancuernas a los lados.' },
      { step: 3, emoji: '3️⃣', description: 'Empuja hacia arriba hasta extender los brazos.' },
      { step: 4, emoji: '4️⃣', description: 'Baja lentamente controlando el peso.' },
    ],
    muscleGroups: 'Pecho superior, Hombros',
  },
  sentadillas: {
    id: exerciseId(),
    name: 'Sentadillas',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,squat',
    isPopular: true,
    equipment: 'weights',
    tips: 'Mantén la espalda recta y las rodillas alineadas con los pies',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Coloca la barra sobre los trapecios.' },
      { step: 2, emoji: '2️⃣', description: 'Pies a la anchura de los hombros, puntas ligeramente hacia afuera.' },
      { step: 3, emoji: '3️⃣', description: 'Flexiona rodillas y caderas como si te sentaras en una silla.' },
      { step: 4, emoji: '4️⃣', description: 'Baja hasta que los muslos estén paralelos al suelo.' },
      { step: 5, emoji: '5️⃣', description: 'Empuja a través de los talones para subir.' },
    ],
    muscleGroups: 'Cuádriceps, Glúteos, Isquiotibiales, Core',
  },
  fondos: {
    id: exerciseId(),
    name: 'Fondos',
    reps: '3x8',
    image: 'https://source.unsplash.com/random/200x200/?gym,dips',
    equipment: 'bodyweight',
    tips: 'No bajes demasiado para proteger tus hombros',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Sujétate en las barras paralelas.' },
      { step: 2, emoji: '2️⃣', description: 'Brazos extendidos, cuerpo recto.' },
      { step: 3, emoji: '3️⃣', description: 'Flexiona los codos para bajar el cuerpo.' },
      { step: 4, emoji: '4️⃣', description: 'Empuja hacia arriba hasta la posición inicial.' },
    ],
    muscleGroups: 'Pecho, Tríceps, Hombros',
  },
  plancha: {
    id: exerciseId(),
    name: 'Plancha abdominal',
    reps: '3x20s',
    image: 'https://source.unsplash.com/random/200x200/?gym,plank',
    equipment: 'bodyweight',
    tips: 'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Apóyate sobre los antebrazos y puntas de los pies.' },
      { step: 2, emoji: '2️⃣', description: 'Mantén el cuerpo en línea recta.' },
      { step: 3, emoji: '3️⃣', description: 'Activa el core y mantén la posición.' },
      { step: 4, emoji: '4️⃣', description: 'Respira normalmente durante todo el ejercicio.' },
    ],
    muscleGroups: 'Core, Abdominales, Espalda baja',
  },
  jalonPecho: {
    id: exerciseId(),
    name: 'Jalón al pecho',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,lat-pulldown',
    isPopular: false,
    equipment: 'machine',
    tips: 'Mantén el pecho alto y tira con los codos hacia el suelo',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Siéntate en la máquina con los muslos bajo los soportes.' },
      { step: 2, emoji: '2️⃣', description: 'Agarra la barra más ancha que tus hombros.' },
      { step: 3, emoji: '3️⃣', description: 'Tira de la barra hacia el pecho, llevando los codos hacia atrás.' },
      { step: 4, emoji: '4️⃣', description: 'Vuelve lentamente a la posición inicial.' },
    ],
    muscleGroups: 'Espalda, Bíceps, Antebrazos',
  },
  // Additional exercises
  pesoMuertoRumano: {
    id: exerciseId(),
    name: 'Peso muerto rumano',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,romanian-deadlift',
    isPopular: true,
    equipment: 'weights',
    tips: 'Mantén las rodillas ligeramente flexionadas y la espalda recta',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'De pie, sujeta la barra frente a ti.' },
      { step: 2, emoji: '2️⃣', description: 'Con rodillas ligeramente flexionadas, inclina el torso hacia adelante.' },
      { step: 3, emoji: '3️⃣', description: 'Baja la barra hasta la mitad de las espinillas, sintiendo estiramiento en isquiotibiales.' },
      { step: 4, emoji: '4️⃣', description: 'Vuelve a la posición inicial empujando las caderas hacia adelante.' },
    ],
    muscleGroups: 'Isquiotibiales, Glúteos, Espalda baja',
  },
  remoMancuernas: {
    id: exerciseId(),
    name: 'Remo con mancuernas',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,dumbbell-row',
    equipment: 'weights',
    tips: 'Mantén el torso paralelo al suelo y tira del codo hacia el techo',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Apoya la rodilla y mano izquierda en un banco.' },
      { step: 2, emoji: '2️⃣', description: 'Sujeta una mancuerna con la mano derecha.' },
      { step: 3, emoji: '3️⃣', description: 'Mantén la espalda recta y tira de la mancuerna hacia la cadera.' },
      { step: 4, emoji: '4️⃣', description: 'Baja controladamente y repite.' },
    ],
    muscleGroups: 'Espalda, Bíceps, Hombros',
  },
  curlBiceps: {
    id: exerciseId(),
    name: 'Curl de bíceps',
    reps: '3x12',
    image: 'https://source.unsplash.com/random/200x200/?gym,bicep-curl',
    equipment: 'weights',
    tips: 'Mantén los codos pegados al cuerpo durante todo el movimiento',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'De pie con una mancuerna en cada mano.' },
      { step: 2, emoji: '2️⃣', description: 'Codos junto al cuerpo, palmas hacia adelante.' },
      { step: 3, emoji: '3️⃣', description: 'Flexiona los codos levantando las mancuernas hacia los hombros.' },
      { step: 4, emoji: '4️⃣', description: 'Baja controladamente hasta la posición inicial.' },
    ],
    muscleGroups: 'Bíceps, Antebrazos',
  },
  // More exercises could be added as needed...
  prensaPiernas: {
    id: exerciseId(),
    name: 'Prensa de piernas',
    reps: '3x12',
    image: 'https://source.unsplash.com/random/200x200/?gym,leg-press',
    isPopular: false,
    equipment: 'machine',
    tips: 'No bloquees completamente las rodillas en la posición extendida',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Siéntate en la máquina con la espalda contra el respaldo.' },
      { step: 2, emoji: '2️⃣', description: 'Coloca los pies en la plataforma a la anchura de caderas.' },
      { step: 3, emoji: '3️⃣', description: 'Empuja hasta extender las piernas (sin bloquear rodillas).' },
      { step: 4, emoji: '4️⃣', description: 'Flexiona las piernas controladamente para volver.' },
    ],
    muscleGroups: 'Cuádriceps, Glúteos, Isquiotibiales',
  },
  hipThrust: {
    id: exerciseId(),
    name: 'Hip thrust',
    reps: '3x10',
    image: 'https://source.unsplash.com/random/200x200/?gym,hip-thrust',
    isPopular: true,
    equipment: 'weights',
    tips: 'Empuja a través de los talones y aprieta los glúteos en la parte superior',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Siéntate en el suelo con los omóplatos apoyados en un banco.' },
      { step: 2, emoji: '2️⃣', description: 'Coloca una barra con peso sobre las caderas.' },
      { step: 3, emoji: '3️⃣', description: 'Levanta las caderas hasta que el torso quede paralelo al suelo.' },
      { step: 4, emoji: '4️⃣', description: 'Baja controladamente a la posición inicial.' },
    ],
    muscleGroups: 'Glúteos, Isquiotibiales',
  },
  gemelsMaquina: {
    id: exerciseId(),
    name: 'Gemelos en máquina',
    reps: '3x15',
    image: 'https://source.unsplash.com/random/200x200/?gym,calf-raise',
    equipment: 'machine',
    tips: 'Haz una pausa en la posición contraída para maximizar los resultados',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Coloca los hombros bajo los cojines de la máquina.' },
      { step: 2, emoji: '2️⃣', description: 'Apoya la parte delantera de los pies en la plataforma.' },
      { step: 3, emoji: '3️⃣', description: 'Eleva los talones lo más alto posible.' },
      { step: 4, emoji: '4️⃣', description: 'Baja controladamente hasta sentir estiramiento en los gemelos.' },
    ],
    muscleGroups: 'Gemelos, Sóleo',
  },
  russianTwists: {
    id: exerciseId(),
    name: 'Russian twists',
    reps: '3x12/lado',
    image: 'https://source.unsplash.com/random/200x200/?gym,russian-twist',
    equipment: 'bodyweight',
    tips: 'Mantén la espalda recta y gira desde la cintura, no los hombros',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Siéntate en el suelo con las rodillas flexionadas.' },
      { step: 2, emoji: '2️⃣', description: 'Inclina el torso hacia atrás para formar un ángulo de 45°.' },
      { step: 3, emoji: '3️⃣', description: 'Gira el torso de un lado a otro, tocando el suelo con las manos.' },
      { step: 4, emoji: '4️⃣', description: 'Mantén los pies elevados para mayor intensidad.' },
    ],
    muscleGroups: 'Abdominales oblicuos, Core',
  },
};

// Define the complete workout routines
export const workoutLevels: Level[] = [
  {
    id: 'beginner',
    title: 'Principiante',
    emoji: '🌱',
    description: '3 días/semana',
    days: [
      {
        id: 'beginner-day1',
        name: 'Día 1',
        focus: 'Full Body - Empuje',
        progress: 0,
        exercises: [
          { ...exercises.pressBanca, reps: '3x10' },
          { ...exercises.sentadillas, reps: '3x10' },
          { ...exercises.fondos, reps: '3x8' },
          { ...exercises.plancha, reps: '3x20s' },
        ]
      },
      {
        id: 'beginner-day2',
        name: 'Día 2',
        focus: 'Full Body - Jalón',
        progress: 0,
        exercises: [
          { ...exercises.jalonPecho, reps: '3x10' },
          { ...exercises.pesoMuertoRumano, reps: '3x10' },
          { ...exercises.remoMancuernas, reps: '3x10' },
          { ...exercises.curlBiceps, reps: '3x12' },
        ]
      },
      {
        id: 'beginner-day3',
        name: 'Día 3',
        focus: 'Pierna + Core',
        progress: 0,
        exercises: [
          { ...exercises.prensaPiernas, reps: '3x12' },
          { ...exercises.hipThrust, reps: '3x10' },
          { ...exercises.gemelsMaquina, reps: '3x15' },
          { ...exercises.russianTwists, reps: '3x12/lado' },
        ]
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermedio',
    emoji: '💪',
    description: '5 días/semana',
    days: [
      {
        id: 'intermediate-day1',
        name: 'Día 1',
        focus: 'Pecho/Tríceps',
        progress: 0,
        exercises: [
          { ...exercises.pressBanca, reps: '4x8' },
          { ...exercises.pressInclinado, reps: '3x10' },
          { ...exercises.fondos, reps: '3x8', name: 'Fondos lastrados' },
          { ...exercises.curlBiceps, reps: '4x12', name: 'Extensiones de tríceps' },
        ]
      },
      {
        id: 'intermediate-day2',
        name: 'Día 2',
        focus: 'Espalda/Bíceps',
        progress: 0,
        exercises: [
          { ...exercises.jalonPecho, reps: '4x8', name: 'Dominadas (o jalón al pecho)' },
          { ...exercises.remoMancuernas, reps: '4x8', name: 'Remo con barra' },
          { ...exercises.jalonPecho, reps: '3x12', name: 'Face pulls' },
          { ...exercises.curlBiceps, reps: '4x10', name: 'Curl martillo' },
        ]
      },
      {
        id: 'intermediate-day3',
        name: 'Día 3',
        focus: 'Piernas',
        progress: 0,
        exercises: [
          { ...exercises.sentadillas, reps: '4x8' },
          { ...exercises.pesoMuertoRumano, reps: '4x8' },
          { ...exercises.sentadillas, reps: '3x10/pierna', name: 'Zancadas' },
          { ...exercises.gemelsMaquina, reps: '4x15', name: 'Gemelos' },
        ]
      },
      {
        id: 'intermediate-day4',
        name: 'Día 4',
        focus: 'Hombros/Core',
        progress: 0,
        exercises: [
          { ...exercises.pressBanca, reps: '4x8', name: 'Press militar' },
          { ...exercises.curlBiceps, reps: '4x12', name: 'Elevaciones laterales' },
          { ...exercises.russianTwists, reps: '3x15', name: 'Encogimientos' },
          { ...exercises.plancha, reps: '3x30s' },
        ]
      },
      {
        id: 'intermediate-day5',
        name: 'Día 5',
        focus: 'Opcional - Full Body',
        progress: 0,
        exercises: [
          { ...exercises.pesoMuertoRumano, reps: '3x8', name: 'Peso muerto sumo' },
          { ...exercises.pressBanca, reps: '3x8', name: 'Press militar' },
          { ...exercises.sentadillas, reps: '3x8/pierna', name: 'Búlgaras' },
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Avanzado',
    emoji: '🚀',
    description: 'Retos extremos',
    days: [
      {
        id: 'advanced-day1',
        name: 'Día 1',
        focus: 'Pecho/Tríceps - Pesado',
        progress: 0,
        exercises: [
          { ...exercises.pressBanca, reps: '5x5 (85% RM)' },
          { ...exercises.pressInclinado, reps: '4x6' },
          { ...exercises.fondos, reps: '4x6', name: 'Fondos + lastre' },
          { ...exercises.pressBanca, reps: '4x12', name: 'Cruces en polea' },
        ]
      },
      {
        id: 'advanced-day2',
        name: 'Día 2',
        focus: 'Espalda - Fuerza',
        progress: 0,
        exercises: [
          { ...exercises.pesoMuertoRumano, reps: '5x3', name: 'Peso muerto' },
          { ...exercises.jalonPecho, reps: '5x5', name: 'Dominadas lastradas' },
          { ...exercises.remoMancuernas, reps: '4x6', name: 'Remo T' },
          { ...exercises.jalonPecho, reps: '4x10', name: 'Jalón trasnuca' },
        ]
      },
      {
        id: 'advanced-day3',
        name: 'Día 3',
        focus: 'Piernas - Explosivo',
        progress: 0,
        exercises: [
          { ...exercises.sentadillas, reps: '5x5', name: 'Sentadillas traseras' },
          { ...exercises.prensaPiernas, reps: '4x8', name: 'Hack squat' },
          { ...exercises.hipThrust, reps: '4x10', name: 'Curl femoral' },
          { ...exercises.gemelsMaquina, reps: '5x20', name: 'Gemelos' },
        ]
      },
      {
        id: 'advanced-day4',
        name: 'Día 4',
        focus: 'Hombros/Trapecio',
        progress: 0,
        exercises: [
          { ...exercises.pressBanca, reps: '4x8', name: 'Press Arnold' },
          { ...exercises.curlBiceps, reps: '5x12', name: 'Elevaciones laterales (superserie)' },
          { ...exercises.curlBiceps, reps: '5x15', name: 'Encogimientos con disco' },
        ]
      },
      {
        id: 'advanced-day5',
        name: 'Día 5',
        focus: 'Volumen',
        progress: 0,
        exercises: [
          { ...exercises.pesoMuertoRumano, reps: '4x5', name: 'Peso muerto sumo' },
          { ...exercises.pressBanca, reps: '3x6', name: 'Press militar' },
          { ...exercises.sentadillas, reps: '3x8/pierna', name: 'Zancadas con barra' },
          { ...exercises.plancha, reps: '3x12', name: 'Ab wheel' },
        ]
      }
    ]
  }
];

export default workoutLevels;
