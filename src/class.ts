import HIRAGANA from "./hiragana.json";
import KATAKANA from "./katakana.json";
import LESSON_1 from "./lesson1/lesion";
import LESSON_2 from "./lesson2/lesson";
import LESSON_3 from "./lesson3/lesson";
import LESSON_4 from "./lesson4/lesson";
import LESSON_5 from "./lesson5/lesson";
import LESSON_6 from "./lesson6/lesson";
import LESSON_7 from "./lesson7/lesson";

export const LESSON_JP = {
  ALPHABET: {
    HIRAGANA_ABC: {
      key: "hiragana",
      title: "Hiragana",
      source: HIRAGANA,
    },
    KATAKANA_ABC: {
      key: "katakana",
      title: "Katakana",
      source: KATAKANA,
    },
  },
  LESSON: {
    LESSION_ONE: {
      key: "lesson1",
      title: "Lesson 1",
      source: LESSON_1,
    },
    LESSION_TWO: {
      key: "lesson2",
      title: "Lesson 2",
      source: LESSON_2,
    },
    LESSION_THREE: {
      key: "lesson3",
      title: "Lesson 3",
      source: LESSON_3,
    },
    LESSION_FOUR: {
      key: "lesson4",
      title: "Lesson 4",
      source: LESSON_4,
    },
    LESSION_FIVE: {
      key: "lesson5",
      title: "Lesson 5",
      source: LESSON_5,
    },
    LESSION_SIX: {
      key: "lesson6",
      title: "Lesson 6",
      source: LESSON_6,
    },
    LESSION_SEVEN: {
      key: "lesson7",
      title: "Lesson 7",
      source: LESSON_7,
    },
  },
};

export default LESSON_JP;
