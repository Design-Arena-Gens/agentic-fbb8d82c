'use client';

import { useState, useEffect } from 'react';
import { FootballLM } from './lib/footballLM';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';

const footballLM = new FootballLM();

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    if (started && questions.length === 0) {
      const generatedQuestions = footballLM.generateQuiz(10);
      setQuestions(generatedQuestions);
    }
  }, [started, questions.length]);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setHearts(5);
    setTotalXP(0);
    setShowResult(false);
    const generatedQuestions = footballLM.generateQuiz(10);
    setQuestions(generatedQuestions);
  };

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    const isCorrect = questions[currentQuestion].correctAnswer === answerIndex;

    if (isCorrect) {
      const xpGained = 10 + (streak * 2);
      setScore(score + 1);
      setStreak(streak + 1);
      setTotalXP(totalXP + xpGained);
    } else {
      setStreak(0);
      setHearts(hearts - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length && hearts > 0) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuestions([]);
    setShowResult(false);
    setHearts(5);
    setTotalXP(0);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="text-7xl mb-4">⚽</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Football Quiz
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Learn football match details the fun way!
            </p>
            <p className="text-sm text-gray-500">
              Powered by a mini language model trained on 2026 football data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-800">Interactive Quizzes</h3>
              <p className="text-sm text-gray-600">Test your football knowledge</p>
            </div>
            <div className="card">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-bold text-gray-800">Streak System</h3>
              <p className="text-sm text-gray-600">Build streaks for bonus XP</p>
            </div>
            <div className="card">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-bold text-gray-800">XP & Hearts</h3>
              <p className="text-sm text-gray-600">Earn points and track lives</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="btn-primary text-xl px-12 py-4"
          >
            START LEARNING
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <ResultCard
        score={score}
        total={questions.length}
        totalXP={totalXP}
        onRestart={handleRestart}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleRestart}
              className="text-gray-600 hover:text-gray-800 font-bold"
            >
              ✕
            </button>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`text-2xl ${i < hearts ? 'opacity-100' : 'opacity-20'}`}
                >
                  ❤️
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-orange-500">{streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-yellow-500">{totalXP} XP</span>
            </div>
          </div>
        </div>

        <ProgressBar current={currentQuestion + 1} total={questions.length} />

        <QuestionCard
          question={questions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          answered={answered}
          onAnswer={handleAnswer}
        />

        {answered && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNext}
              className="btn-primary text-xl px-12"
            >
              {currentQuestion + 1 < questions.length && hearts > 0 ? 'CONTINUE' : 'SEE RESULTS'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
