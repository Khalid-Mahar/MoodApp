import { questions } from "./Questions";

const QuestionPicker = (count = 10) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random()); // Shuffle questions
  return shuffled.slice(0, count); // Pick first `count` questions
};

export default QuestionPicker;
