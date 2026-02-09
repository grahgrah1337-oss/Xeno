import { useEffect, useState } from 'react';

// Простой хук для хранения состояния в LocalStorage.
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return initialValue;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
