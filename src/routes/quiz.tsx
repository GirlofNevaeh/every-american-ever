import { createFileRoute } from "@tanstack/react-router";
import { ClassQuiz } from "@/components/class-quiz";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({ meta: [{ title: "Quiz · Every American Ever" }] }),
});

function QuizPage() {
  return <ClassQuiz />;
}
