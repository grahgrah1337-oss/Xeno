import { useMemo, useState } from 'react';
import { detectScam } from '../utils/scamDetector';

// Модуль Offline Scammer Detector.
const ScammerDetector = () => {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) {
      return null;
    }
    return detectScam(input);
  }, [input]);

  return (
    <div className="space-y-4">
      <label className="block text-sm text-white/70" htmlFor="scam-input">
        Вставьте ссылку или текст для проверки
      </label>
      <textarea
        id="scam-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="w-full min-h-[140px] bg-black border border-white/40 p-3"
        placeholder="Например: free airdrop на secure-wallet.example"
      />

      {result && (
        <div className="border border-white/30 p-4 space-y-3">
          <p>
            <span className="text-white/60">Score:</span> {result.score}/100
          </p>
          <div>
            <p className="text-white/60 mb-2">Проблемы:</p>
            <ul className="list-disc list-inside space-y-1">
              {result.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/60 mb-2">Рекомендации:</p>
            <ul className="list-disc list-inside space-y-1">
              {result.recommendations.map((rec) => (
                <li key={rec}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScammerDetector;
