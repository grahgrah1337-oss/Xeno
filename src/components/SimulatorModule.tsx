import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DEFAULT_STATE,
  PRICES,
  TradePair,
  TradeSide,
  executeTrade,
} from '../utils/simulator';

// Модуль учебной торговли: всё локально, без реальных сделок.
const SimulatorModule = () => {
  const [state, setState] = useLocalStorage('xeno-simulator', DEFAULT_STATE);
  const [pair, setPair] = useState<TradePair>('USDT/BTC');
  const [side, setSide] = useState<TradeSide>('buy');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const price = useMemo(() => PRICES[pair], [pair]);

  const handleTrade = () => {
    const numericAmount = Number(amount);
    const result = executeTrade(state, pair, side, numericAmount);
    if (result.error) {
      setError(result.error);
      return;
    }
    setError(null);
    setState(result.nextState);
    setAmount('');
  };

  const baseAsset = pair.split('/')[1];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-white/30 p-4">
          <p className="text-white/60 text-sm">Баланс USDT</p>
          <p className="text-xl font-semibold">{state.balanceUSDT.toFixed(2)}</p>
        </div>
        <div className="border border-white/30 p-4">
          <p className="text-white/60 text-sm">BTC</p>
          <p className="text-xl font-semibold">{state.holdings.BTC.toFixed(6)}</p>
        </div>
        <div className="border border-white/30 p-4">
          <p className="text-white/60 text-sm">ETH</p>
          <p className="text-xl font-semibold">{state.holdings.ETH.toFixed(6)}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-white/70">Пара</label>
            <select
              value={pair}
              onChange={(event) => setPair(event.target.value as TradePair)}
              className="w-full bg-black border border-white/40 p-2"
            >
              <option value="USDT/BTC">USDT/BTC</option>
              <option value="USDT/ETH">USDT/ETH</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-white/70">Тип сделки</label>
            <select
              value={side}
              onChange={(event) => setSide(event.target.value as TradeSide)}
              className="w-full bg-black border border-white/40 p-2"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-white/70">
              Сумма ({side === 'buy' ? 'USDT' : baseAsset})
            </label>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full bg-black border border-white/40 p-2"
              placeholder="Например: 100"
            />
          </div>
          <button
            type="button"
            onClick={handleTrade}
            className="w-full border border-white/60 px-4 py-2 hover:border-white"
          >
            Выполнить сделку
          </button>
          {error && <p className="text-white/70">{error}</p>}
        </div>
        <div className="border border-white/30 p-4 space-y-2">
          <p className="text-white/60 text-sm">Текущая цена (mock)</p>
          <p className="text-xl font-semibold">{price.toLocaleString()} USDT</p>
          <p className="text-white/60 text-sm">
            Комиссия: 0.1% | Проскальзывание: 0.2%
          </p>
          <p className="text-white/70">
            Это учебная торговля. Реальные сделки не совершаются.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Журнал операций</h3>
        {state.trades.length === 0 ? (
          <p className="text-white/60">Пока нет операций.</p>
        ) : (
          <div className="space-y-3">
            {state.trades.map((trade) => (
              <div
                key={trade.id}
                className="border border-white/20 p-3 text-sm"
              >
                <p>
                  {trade.side.toUpperCase()} {trade.pair} · {trade.amountBase.toFixed(6)}{' '}
                  {trade.pair.split('/')[1]}
                </p>
                <p className="text-white/60">
                  Цена: {trade.price.toFixed(2)} | Комиссия: {trade.fee.toFixed(2)}
                </p>
                <p className="text-white/60">{new Date(trade.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulatorModule;
