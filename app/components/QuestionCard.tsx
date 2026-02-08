interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  selectedAnswer: number | null;
  answered: boolean;
  onAnswer: (index: number) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  answered,
  onAnswer
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <div className="card mt-8">
      <div className="mb-4">
        <span className={`text-sm font-bold ${getDifficultyColor(question.difficulty)}`}>
          {getDifficultyEmoji(question.difficulty)} {question.difficulty.toUpperCase()}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;

          let bgColor = 'bg-white border-2 border-gray-200 hover:border-gray-300';
          let textColor = 'text-gray-800';

          if (answered) {
            if (isCorrect) {
              bgColor = 'bg-green-100 border-2 border-green-500';
              textColor = 'text-green-800';
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-100 border-2 border-red-500';
              textColor = 'text-red-800';
            } else {
              bgColor = 'bg-gray-50 border-2 border-gray-200';
            }
          } else if (isSelected) {
            bgColor = 'bg-blue-50 border-2 border-blue-500';
          }

          return (
            <button
              key={index}
              onClick={() => !answered && onAnswer(index)}
              disabled={answered}
              className={`w-full p-4 rounded-xl ${bgColor} ${textColor} text-left font-medium transition-all duration-200 ${
                !answered ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {answered && isCorrect && <span className="text-2xl">✓</span>}
                {answered && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`mt-6 p-4 rounded-xl ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">
              {selectedAnswer === question.correctAnswer ? '🎉' : '💡'}
            </span>
            <div>
              <h3 className={`font-bold text-lg mb-1 ${
                selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite!'}
              </h3>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
