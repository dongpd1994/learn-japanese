import HIRAGANA from './hiragana.json';
import KATAKANA from './katakana.json';
import LESSON_1 from './lesson1/lesion';
import LESSON_2 from './lesson2/lesson';
import LESSON_3 from './lesson3/lesson';

export const LESSON_JP = {
  ALPHABET: {
    HIRAGANA_ABC: {
      key: "hiragana",
      title: "Hiragana",
      source: HIRAGANA
    },
    KATAKANA_ABC: {
      key: "katakana",
      title: "Katakana",
      source: KATAKANA
    }
  },
  LESSON: {
    LESSION_ONE: {
      key: "lesson1",
      title: "Lesson 1",
      source: LESSON_1
    },
    LESSION_TWO: {
      key: "lesson2",
      title: "Lesson 2",
      source: LESSON_2
    },
    LESSION_THREE: {
      key: "lesson3",
      title: "Lesson 3",
      source: LESSON_3
    }
  }
}

export default LESSON_JP;