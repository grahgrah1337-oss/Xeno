import { describe, expect, it } from 'vitest';
import { detectExplainType, explainInput } from '../explain';

describe('detectExplainType', () => {
  it('detects URLs', () => {
    expect(detectExplainType('https://example.com')).toBe('url');
  });

  it('detects transactions', () => {
    expect(detectExplainType('txid: 0x1234567890abcdef')).toBe('transaction');
  });

  it('defaults to text', () => {
    expect(detectExplainType('Hello world')).toBe('text');
  });
});

describe('explainInput', () => {
  it('returns risk high for dangerous keywords', () => {
    const result = explainInput('Please share your seed');
    expect(result.risk).toBe('high');
  });
});
