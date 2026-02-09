import rules from '../data/ScamRules.json';

export type ScamResult = {
  score: number;
  issues: string[];
  recommendations: string[];
};

const normalize = (input: string) => input.toLowerCase().trim();

export const detectScam = (input: string): ScamResult => {
  const text = normalize(input);
  const issues: string[] = [];
  let score = 0;

  rules.suspiciousDomains.forEach((domain) => {
    if (text.includes(domain)) {
      issues.push(`Подозрительный домен: ${domain}`);
      score += 25;
    }
  });

  rules.scamPhrases.forEach((phrase) => {
    if (text.includes(phrase)) {
      issues.push(`Подозрительная фраза: "${phrase}"`);
      score += 20;
    }
  });

  rules.typosquatting.forEach((typo) => {
    if (text.includes(typo)) {
      issues.push(`Похоже на typosquatting: ${typo}`);
      score += 30;
    }
  });

  const cappedScore = Math.min(score, 100);
  const recommendations = [
    'Не переходите по ссылкам из сообщений.',
    'Проверяйте домены вручную.',
    'Никому не отправляйте seed-фразу или приватный ключ.',
  ];

  if (issues.length === 0) {
    return {
      score: 0,
      issues: ['Подозрительные признаки не найдены.'],
      recommendations: ['Оставайтесь внимательны и проверяйте источники.'],
    };
  }

  return {
    score: cappedScore,
    issues,
    recommendations,
  };
};
