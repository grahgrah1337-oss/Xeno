import templates from '../data/ExplainTemplates.json';

export type ExplainType = 'url' | 'text' | 'transaction';

export type ExplainResult = {
  type: ExplainType;
  typeLabel: string;
  risk: 'low' | 'medium' | 'high';
  explanation: string;
  steps: string[];
};

const URL_REGEX = /^https?:\/\//i;
const TX_REGEX = /(0x[a-f0-9]{40,64})|(txid)|(transaction)/i;

const RISK_KEYWORDS = {
  high: ['seed', 'private key', '100%', 'double', 'airdrop', 'urgent'],
  medium: ['bonus', 'support', 'verify', 'claim'],
};

export const detectExplainType = (input: string): ExplainType => {
  const trimmed = input.trim();
  if (URL_REGEX.test(trimmed)) {
    return 'url';
  }
  if (TX_REGEX.test(trimmed)) {
    return 'transaction';
  }
  return 'text';
};

const computeRisk = (input: string): ExplainResult['risk'] => {
  const lower = input.toLowerCase();
  if (RISK_KEYWORDS.high.some((word) => lower.includes(word))) {
    return 'high';
  }
  if (RISK_KEYWORDS.medium.some((word) => lower.includes(word))) {
    return 'medium';
  }
  return 'low';
};

export const explainInput = (input: string): ExplainResult => {
  const type = detectExplainType(input);
  const template = templates[type];
  return {
    type,
    typeLabel: template.label,
    risk: computeRisk(input),
    explanation: template.simple,
    steps: template.steps,
  };
};
