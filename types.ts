
export enum GameState {
  LANDING = 'LANDING',
  LEVEL_SELECTOR = 'LEVEL_SELECTOR',
  GAMEPLAY = 'GAMEPLAY',
  REFLECTION = 'REFLECTION'
}

export interface Level {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Medium-Hard' | 'Hard' | 'Expert';
  masterPrompt: string;
  tips: string[];
  focus: string;
  learningGoal: string;
}

export interface GameProgress {
  unlockedLevel: number;
  completedLevels: number[];
  scores: Record<number, number>;
}
