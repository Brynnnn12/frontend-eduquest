import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetQuizzesQuery,
  useSubmitAnswersMutation,
  useGetHintMutation,
  useGetSolutionMutation,
} from "../../api/quizApiSlice";
import { useGetMissionByIdQuery } from "../../api/missionApiSlice";
import {
  QuizHeader,
  QuestionCard,
  HintSolutionSection,
  QuizResults,
  LoadingState,
  ErrorState,
} from "./components";

const QuizPage = () => {
  const { quizId } = useParams(); // This is actually missionId
  const navigate = useNavigate();

  const {
    data: quizzes,
    isLoading: quizzesLoading,
    error: quizzesError,
  } = useGetQuizzesQuery({ mission_id: quizId, randomize: true });

  const {
    data: mission,
    isLoading: missionLoading,
    error: missionError,
  } = useGetMissionByIdQuery(quizId);

  const [submitAnswers] = useSubmitAnswersMutation();
  const [getHint] = useGetHintMutation();
  const [getSolution] = useGetSolutionMutation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [answers, setAnswers] = useState([]);
  const [hint, setHint] = useState(null);
  const [solution, setSolution] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Sample quiz data - in real app, this would come from API
  const quizData = useMemo(
    () => ({
      id: quizId,
      title: mission?.title || "Kuis EduQuest",
      description:
        mission?.description || "Uji pengetahuanmu dengan quiz interaktif!",
      subject: mission?.subject || "Materi Pembelajaran",
      questions: quizzes || [],
    }),
    [quizId, mission, quizzes]
  );

  // Debug: Log quiz data only when it changes
  useEffect(() => {
    if (quizData.questions.length > 0) {
      console.log("Quiz Data loaded:", quizData);
      console.log("Mission data:", mission);
      console.log("First question structure:", quizData.questions[0]);
    }
  }, [quizData, mission]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestionData = quizData.questions[currentQuestion];
    const selectedOptionText = currentQuestionData.options[selectedAnswer];

    // Compare selected option text with the correct answer text from API
    const isCorrect = selectedOptionText === currentQuestionData.answer;

    console.log("Selected answer:", selectedAnswer);
    console.log("Selected option text:", selectedOptionText);
    console.log("Correct answer from API:", currentQuestionData.answer);
    console.log("Is correct:", isCorrect);

    // Calculate points per question based on mission points
    const totalQuestions = quizData.questions.length;
    const missionPoints = mission?.points || 100; // Default to 100 if not specified
    const pointsPerQuestion = Math.round(missionPoints / totalQuestions);

    console.log("Mission points:", missionPoints);
    console.log("Total questions:", totalQuestions);
    console.log("Points per question:", pointsPerQuestion);

    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestionData.id,
        selectedAnswer,
        selectedAnswerText: selectedOptionText,
        isCorrect,
        correctAnswer: currentQuestionData.answer,
      },
    ];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + pointsPerQuestion);
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setHint(null);
      setSolution(null);
      setShowHint(false);
      setShowSolution(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = useCallback(async () => {
    // Calculate points for the final question and add to answers if not already added
    const currentQuestionData = quizData.questions[currentQuestion];
    const selectedOptionText = currentQuestionData?.options[selectedAnswer];
    const isCorrect = selectedOptionText === currentQuestionData?.answer;

    const totalQuestions = quizData.questions.length;
    const missionPoints = mission?.points || 100;
    const pointsPerQuestion = Math.round(missionPoints / totalQuestions);

    const finalScore = score + (isCorrect ? pointsPerQuestion : 0);
    setScore(finalScore);

    // Add final answer to answers array if not already added
    const existingAnswer = answers.find(
      (a) => a.questionId === currentQuestionData?.id
    );

    let finalAnswers = answers;
    if (!existingAnswer && selectedAnswer !== null) {
      finalAnswers = [
        ...answers,
        {
          questionId: currentQuestionData.id,
          selectedAnswer,
          selectedAnswerText: selectedOptionText,
          isCorrect,
          correctAnswer: currentQuestionData.answer,
        },
      ];
      setAnswers(finalAnswers);
    }

    // Submit answers to backend
    try {
      const submissionData = {
        mission_id: quizId,
        // Remove score - let backend calculate it for security
        answers: finalAnswers.map((answer) => ({
          quiz_id: answer.questionId, // Backend expects quiz_id, not question_id
          user_answer: String.fromCharCode(
            65 + answer.selectedAnswer
          ).toLowerCase(), // Convert index to letter (0='a', 1='b', etc.)
        })),
      };

      console.log("Submitting data:", submissionData);
      await submitAnswers(submissionData).unwrap();
      console.log("Answers submitted successfully");
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }

    setShowResult(true);
  }, [
    score,
    selectedAnswer,
    currentQuestion,
    answers,
    quizData.questions,
    quizId,
    mission,
    submitAnswers,
  ]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResult, handleFinishQuiz]);

  const getScoreMessage = () => {
    const percentage = (score / 100) * 100;
    if (percentage >= 80)
      return { message: "Luar Biasa! 🎉", color: "text-green-600" };
    if (percentage >= 60)
      return { message: "Bagus! 👍", color: "text-blue-600" };
    if (percentage >= 40)
      return { message: "Cukup Baik 💪", color: "text-yellow-600" };
    return { message: "Terus Belajar! 📚", color: "text-red-600" };
  };

  const handleGetHint = async () => {
    try {
      // Try with question ID first, then fallback to mission ID with question index
      let result;
      try {
        result = await getHint({ quizId: currentQ.id }).unwrap();
      } catch {
        console.log("Trying hint with mission ID and question index");
        result = await getHint({
          quizId: quizId,
          questionIndex: currentQuestion,
        }).unwrap();
      }
      setHint(result?.hint || result?.data?.hint || "Hint tidak tersedia");
      setShowHint(true);
    } catch (error) {
      console.error("Failed to get hint:", error);
      // Fallback: show a generic hint or message
      setHint("Coba ingat konsep dasar dari materi yang dipelajari.");
      setShowHint(true);
    }
  };

  const handleGetSolution = async () => {
    try {
      // Try with question ID first, then fallback to mission ID with question index
      let result;
      try {
        result = await getSolution({ quizId: currentQ.id }).unwrap();
      } catch {
        console.log("Trying solution with mission ID and question index");
        result = await getSolution({
          quizId: quizId,
          questionIndex: currentQuestion,
        }).unwrap();
      }
      setSolution(
        result?.solution || result?.data?.solution || "Solusi tidak tersedia"
      );
      setShowSolution(true);
    } catch (error) {
      console.error("Failed to get solution:", error);
      // Fallback: show a generic solution or message
      setSolution(
        "Pelajari kembali materi dan coba pahami konsepnya dengan baik."
      );
      setShowSolution(true);
    }
  };

  if (quizzesLoading || missionLoading) {
    return <LoadingState message="Memuat quiz..." />;
  }

  if (quizzesError || missionError || !quizData.questions.length) {
    return (
      <ErrorState
        title="Quiz Tidak Tersedia"
        message="Quiz untuk misi ini belum tersedia atau terjadi kesalahan."
        onBack={() => navigate("/dashboard")}
      />
    );
  }

  if (showResult) {
    const scoreMessage = getScoreMessage();
    const correctAnswers = answers.filter((a) => a.isCorrect).length;

    return (
      <QuizResults
        score={score}
        totalQuestions={quizData.questions.length}
        correctAnswers={correctAnswers}
        scoreMessage={scoreMessage}
        questions={quizData.questions}
        answers={answers}
        onBackToDashboard={() => navigate("/dashboard")}
        onTryAgain={() => window.location.reload()}
      />
    );
  }

  const currentQ = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <QuizHeader
          title={quizData.title}
          description={quizData.description}
          subject={quizData.subject}
          timeLeft={timeLeft}
          onBack={() => navigate("/dashboard")}
          formatTime={formatTime}
        />

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Pertanyaan {currentQuestion + 1} dari {quizData.questions.length}
            </span>
            <span>Poin: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <QuestionCard
          currentQuestion={currentQuestion}
          question={currentQ.question}
          options={currentQ.options}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          isLastQuestion={currentQuestion === quizData.questions.length - 1}
        />

        <HintSolutionSection
          hint={hint}
          solution={solution}
          showHint={showHint}
          showSolution={showSolution}
          onGetHint={handleGetHint}
          onGetSolution={handleGetSolution}
        />
      </div>
    </div>
  );
};

export default QuizPage;
