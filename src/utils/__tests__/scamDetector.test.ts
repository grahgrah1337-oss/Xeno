import { describe, expect, it } from 'vitest';
import { detectScam } from '../scamDetector';

describe('detectScam', () => {
  it('returns issues for suspicious phrase', () => {
    const result = detectScam('free airdrop on secure-wallet');
    expect(result.score).toBeGreaterThan(0);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('returns safe result when no issues', () => {
    const result = detectScam('hello world');
    expect(result.score).toBe(0);
  });
});
