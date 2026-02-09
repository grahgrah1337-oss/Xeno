// Главный экран (Landing) с быстрыми CTA.
const Landing = () => {
  return (
    <section className="border border-white/20 p-6 md:p-10">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Xeno — Crypto Assistant
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold">
            Простое и безопасное обучение криптовалютам
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Проект создан для новичков: объясняет ссылки и транзакции,
            тренирует навыки торговли и помогает распознавать мошенничество. Без
            подключения кошельков и без запроса секретных данных.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#explain"
            className="border border-white/60 px-4 py-2 text-center hover:border-white"
          >
            Try Explain
          </a>
          <a
            href="#simulator"
            className="border border-white/60 px-4 py-2 text-center hover:border-white"
          >
            Try Simulator
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
