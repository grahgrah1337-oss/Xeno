export type TradeSide = 'buy' | 'sell';
export type TradePair = 'USDT/BTC' | 'USDT/ETH';

export type SimulatorState = {
  balanceUSDT: number;
  holdings: {
    BTC: number;
    ETH: number;
  };
  trades: TradeLog[];
};

export type TradeLog = {
  id: string;
  pair: TradePair;
  side: TradeSide;
  price: number;
  amountBase: number;
  amountUSDT: number;
  fee: number;
  createdAt: string;
};

export const DEFAULT_STATE: SimulatorState = {
  balanceUSDT: 1000,
  holdings: {
    BTC: 0,
    ETH: 0,
  },
  trades: [],
};

export const PRICES: Record<TradePair, number> = {
  'USDT/BTC': 60000,
  'USDT/ETH': 3000,
};

const FEE_RATE = 0.001;
const SLIPPAGE_RATE = 0.002;

export type TradeResult = {
  nextState: SimulatorState;
  error?: string;
};

export const executeTrade = (
  state: SimulatorState,
  pair: TradePair,
  side: TradeSide,
  amount: number,
): TradeResult => {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { nextState: state, error: 'Введите корректную сумму.' };
  }

  const [_, base] = pair.split('/') as ['USDT', 'BTC' | 'ETH'];
  const price = PRICES[pair];
  const slippage = side === 'buy' ? 1 + SLIPPAGE_RATE : 1 - SLIPPAGE_RATE;
  const effectivePrice = price * slippage;

  if (side === 'buy') {
    const costUSDT = amount;
    const fee = costUSDT * FEE_RATE;
    const totalCost = costUSDT + fee;

    if (state.balanceUSDT < totalCost) {
      return { nextState: state, error: 'Недостаточно USDT.' };
    }

    const amountBase = costUSDT / effectivePrice;
    const nextState: SimulatorState = {
      ...state,
      balanceUSDT: state.balanceUSDT - totalCost,
      holdings: {
        ...state.holdings,
        [base]: state.holdings[base] + amountBase,
      },
      trades: [
        {
          id: crypto.randomUUID(),
          pair,
          side,
          price: effectivePrice,
          amountBase,
          amountUSDT: costUSDT,
          fee,
          createdAt: new Date().toISOString(),
        },
        ...state.trades,
      ],
    };

    return { nextState };
  }

  const amountBase = amount;
  if (state.holdings[base] < amountBase) {
    return { nextState: state, error: `Недостаточно ${base}.` };
  }

  const grossUSDT = amountBase * effectivePrice;
  const fee = grossUSDT * FEE_RATE;
  const netUSDT = grossUSDT - fee;

  const nextState: SimulatorState = {
    ...state,
    balanceUSDT: state.balanceUSDT + netUSDT,
    holdings: {
      ...state.holdings,
      [base]: state.holdings[base] - amountBase,
    },
    trades: [
      {
        id: crypto.randomUUID(),
        pair,
        side,
        price: effectivePrice,
        amountBase,
        amountUSDT: netUSDT,
        fee,
        createdAt: new Date().toISOString(),
      },
      ...state.trades,
    ],
  };

  return { nextState };
};
