import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type LessonProgress = {
  completed: boolean;
  badge: string | null;
};

// Один мини-урок + простой квиз.
const MicroLessons = () => {
  const [progress, setProgress] = useLocalStorage<LessonProgress>(
    'xeno-lessons',
    {
      completed: false,
      badge: null,
    },
  );
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const checkAnswer = () => {
    if (answer === 'offline') {
      setProgress({ completed: true, badge: 'Seed Guardian' });
      setFeedback('Верно! Вы получили бейдж Seed Guardian.');
    } else {
      setFeedback('Пока неверно. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Как безопасно хранить seed-фразу</h3>
        <p className="text-white/70">
          Seed-фраза — это ключ ко всему кошельку. Никому её не передавайте и не
          храните в заметках онлайн. Лучший вариант — офлайн-запись на бумаге
          или металлическом носителе.
        </p>
      </div>

      <div className="border border-white/30 p-4 space-y-4">
        <p className="text-white/60">Мини-квиз:</p>
        <p>Где безопаснее всего хранить seed-фразу?</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="lesson"
              value="cloud"
              checked={answer === 'cloud'}
              onChange={(event) => setAnswer(event.target.value)}
            />
            В облачных заметках
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="lesson"
              value="offline"
              checked={answer === 'offline'}
              onChange={(event) => setAnswer(event.target.value)}
            />
            Офлайн — на бумаге или металле
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="lesson"
              value="chat"
              checked={answer === 'chat'}
              onChange={(event) => setAnswer(event.target.value)}
            />
            В мессенджере
          </label>
        </div>
        <button
          type="button"
          onClick={checkAnswer}
          className="border border-white/60 px-4 py-2 hover:border-white"
        >
          Проверить
        </button>
        {feedback && <p className="text-white/70">{feedback}</p>}
      </div>

      <div className="border border-white/30 p-4">
        <p className="text-white/60 text-sm">Прогресс</p>
        <p>
          {progress.completed
            ? `Урок завершён. Бейдж: ${progress.badge}`
            : 'Урок ещё не завершён.'}
        </p>
      </div>
    </div>
  );
};

export default MicroLessons;
