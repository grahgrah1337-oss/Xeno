import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

// Универсальная секция страницы: заголовок + контент.
const Section = ({ id, title, subtitle, children }: SectionProps) => {
  return (
    <section id={id} className="border border-white/20 p-6 md:p-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

export default Section;
