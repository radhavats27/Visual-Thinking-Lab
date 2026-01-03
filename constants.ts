
import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Objects',
    category: 'Object Recognition',
    difficulty: 'Easy',
    masterPrompt: 'A delicious bowl of steaming ramen noodles with a soft-boiled egg, green onions, and bamboo shoots on a dark wooden table.',
    focus: 'What is it? What is visible?',
    learningGoal: 'Naming objects, basic colors, and simple descriptions.',
    tips: ['Name what you see.', 'Mention colors.']
  },
  {
    id: 2,
    title: 'Multiple Objects',
    category: 'Listing & Grouping',
    difficulty: 'Medium',
    masterPrompt: 'A clean home office desk with a silver laptop, a yellow notebook, a black pen, and a white coffee cup in bright daylight.',
    focus: 'Counting and relationships.',
    learningGoal: 'Listing multiple items and describing their positions.',
    tips: ['How many objects?', 'Describe their position.']
  },
  {
    id: 3,
    title: 'Scenes',
    category: 'Environment',
    difficulty: 'Medium-Hard',
    masterPrompt: 'A bright classroom with wooden desks, a large green chalkboard at the front, and sunlight streaming through large windows.',
    focus: 'Setting and context.',
    learningGoal: 'Distinguishing background vs foreground.',
    tips: ['What is the place?', 'What is happening?']
  },
  {
    id: 4,
    title: 'Style & Mood',
    category: 'Artistic Direction',
    difficulty: 'Hard',
    masterPrompt: 'A vibrant 3D cartoon illustration of a friendly round robot waving in a futuristic garden with purple trees.',
    focus: 'Art style and feeling.',
    learningGoal: 'Recognizing styles (illustration, photo, painting) and moods.',
    tips: ['Is it a photo or illustration?', 'What mood does it show?']
  },
  {
    id: 5,
    title: 'Precision',
    category: 'Expert Detail',
    difficulty: 'Expert',
    masterPrompt: 'A cinematic wide-angle shot of a rainy neon-lit Tokyo street at night, glowing reflections on the pavement, and steam from a ramen stall.',
    focus: 'Camera, lighting, and fine details.',
    learningGoal: 'Advanced observation and technical terminology.',
    tips: ['Mention lighting.', 'Mention camera angle.']
  }
];

export const STORAGE_KEY = 'say_what_you_see_progress';
