interface ResultCardProps {
  score: number;
  total: number;
  totalXP: number;
  onRestart: () => void;
}

export default function ResultCard({ score, total, totalXP, onRestart }: ResultCardProps) {
  const percentage = (score / total) * 100;

  const getMessage = () => {
    if (percentage === 100) return { emoji: '🏆', title: 'Perfect!', subtitle: 'You are a football expert!' };
    if (percentage >= 80) return { emoji: '🌟', title: 'Excellent!', subtitle: 'Outstanding performance!' };
    if (percentage >= 60) return { emoji: '👏', title: 'Great Job!', subtitle: 'Keep up the good work!' };
    if (percentage >= 40) return { emoji: '👍', title: 'Good Effort!', subtitle: 'You are learning!' };
    return { emoji: '💪', title: 'Keep Trying!', subtitle: 'Practice makes perfect!' };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card text-center">
          <div className="text-8xl mb-6">{message.emoji}</div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {message.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {message.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {score}/{total}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {totalXP} XP
              </div>
              <div className="text-sm text-gray-600">Experience Gained</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {Math.round(percentage)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="btn-primary w-full text-xl"
            >
              TRY AGAIN
            </button>

            <div className="text-sm text-gray-500 mt-4">
              <p>💡 Keep practicing to improve your football knowledge!</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Powered by Football Language Model</p>
          <p className="mt-1">Data from Premier League, Champions League, and more (2026)</p>
        </div>
      </div>
    </div>
  );
}
