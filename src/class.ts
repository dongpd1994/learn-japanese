import HIRAGANA from './hiragana.json';
import KATAKANA from './katakana.json';
import LESSON_1 from './lesson1/lesion';
import LESSON_2 from './lesson2/lesson';

export const LESSON_JP = {
  HIRAGANA_ABC: {
    key: "hiragana",
    title: "Hiragana",
    source: HIRAGANA
  },
  KATAKANA_ABC: {
    key: "katakana",
    title: "Katakana",
    source: KATAKANA
  },
  LESSION_ONE: {
    key: "lesson1",
    title: "Lesson 1",
    source: LESSON_1
  },
  LESSION_TWO: {
    key: "lesson2",
    title: "Lesson 2",
    source: LESSON_2
  }
}

export default LESSON_JP;