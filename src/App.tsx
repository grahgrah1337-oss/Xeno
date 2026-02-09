import Landing from './components/Landing';
import Section from './components/Section';
import ExplainModule from './components/ExplainModule';
import SimulatorModule from './components/SimulatorModule';
import ScammerDetector from './components/ScammerDetector';
import MicroLessons from './components/MicroLessons';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-white/60">MVP · Educational only</p>
            <h1 className="text-2xl font-semibold">Xeno — Crypto Assistant</h1>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-white/70">
            <a href="#landing" className="hover:text-white">
              Landing
            </a>
            <a href="#explain" className="hover:text-white">
              Explain
            </a>
            <a href="#simulator" className="hover:text-white">
              Simulator
            </a>
            <a href="#detector" className="hover:text-white">
              Scammer Detector
            </a>
            <a href="#lessons" className="hover:text-white">
              Micro-lessons
            </a>
          </nav>
        </header>

        <div id="landing">
          <Landing />
        </div>

        <Section
          id="explain"
          title="Explain"
          subtitle="Объясняем ссылки, тексты и транзакции простыми словами"
        >
          <ExplainModule />
        </Section>

        <Section
          id="simulator"
          title="Paper-trade Simulator"
          subtitle="Учебная торговля без реальных денег"
        >
          <SimulatorModule />
        </Section>

        <Section
          id="detector"
          title="Offline Scammer Detector"
          subtitle="Проверка ссылок и текстов на мошеннические признаки"
        >
          <ScammerDetector />
        </Section>

        <Section
          id="lessons"
          title="Micro-lessons"
          subtitle="Короткие уроки с квизом и прогрессом"
        >
          <MicroLessons />
        </Section>

        <footer className="border border-white/20 p-6 text-sm text-white/70">
          <p>
            Xeno не даёт инвестиционных советов. Только образовательная
            информация.
          </p>
          <p>Мы не подключаем кошельки и не запрашиваем seed-фразы.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
