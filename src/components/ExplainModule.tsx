import { useMemo, useState } from 'react';
import { explainInput } from '../utils/explain';

// Модуль Explain: объясняет, что пользователь вставил.
const ExplainModule = () => {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) {
      return null;
    }
    return explainInput(input);
  }, [input]);

  return (
    <div className="space-y-4">
      <label className="block text-sm text-white/70" htmlFor="explain-input">
        Вставьте ссылку, текст или описание транзакции
      </label>
      <textarea
        id="explain-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="w-full min-h-[140px] bg-black border border-white/40 p-3"
        placeholder="Например: https://example.com или 0x123..."
      />

      {result && (
        <div className="border border-white/30 p-4 space-y-3">
          <p>
            <span className="text-white/60">Тип ввода:</span> {result.typeLabel}
          </p>
          <p>
            <span className="text-white/60">Уровень риска:</span> {result.risk}
          </p>
          <p className="text-white/80">{result.explanation}</p>
          <div>
            <p className="text-white/60 mb-2">Что делать прямо сейчас:</p>
            <ul className="list-disc list-inside space-y-1">
              {result.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplainModule;
