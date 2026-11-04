'use client';

import { Section, SectionHead, Card, CardGrid, Timeline, StatGrid, PillRow, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import { DaySchedule } from '@/components/persona/DaySchedule';
import type { Block } from '@/lib/icp';
import s from './persona.module.css';

function Table({ columns, rows, highlight }: { columns: string[]; rows: string[][]; highlight?: number }) {
  const cols = columns.length;
  const gtc = cols === 2 ? '1fr 1fr' : '1.5fr 1fr 1fr';
  return (
    <div className={s.tWrap}>
      <div className={`${s.tRow} ${s.tHead}`} style={{ gridTemplateColumns: gtc }}>
        {columns.map((c) => <span key={c} className={s.tHeadCell}>{c}</span>)}
      </div>
      {rows.map((row, i) => (
        <Reveal key={i} y={10} className={s.tRow} style={{ gridTemplateColumns: gtc }}>
          {row.map((cell, j) => (
            <span key={j} className={`${s.tCell} ${j === 0 ? s.tCell0 : ''} ${j === highlight ? s.tCellHi : ''}`}>{cell}</span>
          ))}
        </Reveal>
      ))}
    </div>
  );
}

// `outline` names an unheaded timeline for screen readers, so its step
// titles (h3) never follow the page's h1 directly.
export function Blocks({ items, outline = 'Step by step' }: { items: Block[]; outline?: string }) {
  return (
    <>
      {items.map((b, i) => {
        switch (b.type) {
          case 'prose':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading) && <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} />}
                <div className={s.prose}>
                  {b.paras.map((p, j) => <Reveal key={j} y={14}><p>{p}</p></Reveal>)}
                </div>
              </Section>
            );
          case 'callout':
            return <Section key={i}><Reveal y={18}><div className={s.callout}>{b.text}</div></Reveal></Section>;
          case 'cards':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading) && <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} lead={b.lead} />}
                <CardGrid cols={b.cols ?? 3}>
                  {b.items.map((c) => <Card key={c.title} kicker={c.kicker} title={c.title} body={c.body} href={c.href} cta={c.cta} />)}
                </CardGrid>
              </Section>
            );
          case 'timeline':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading)
                  ? <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} lead={b.lead} />
                  : <h2 className="sr-only">{outline}</h2>}
                <Timeline items={b.items} />
              </Section>
            );
          case 'table':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading) && <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} lead={b.lead} />}
                <Table columns={b.columns} rows={b.rows} highlight={b.highlight} />
              </Section>
            );
          case 'stats':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading) && <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} />}
                <StatGrid stats={b.items} />
              </Section>
            );
          case 'pills':
            return (
              <Section key={i}>
                <div style={{ display: 'flex', justifyContent: 'center' }}><PillRow items={b.items} /></div>
              </Section>
            );
          case 'tool':
            return (
              <Section key={i}>
                {(b.eyebrow || b.heading) && <SectionHead eyebrow={b.eyebrow} title={b.heading ?? ''} lead={b.lead} center />}
                {b.tool === 'roi' ? <ROICalculator /> : <DaySchedule />}
              </Section>
            );
          case 'cta':
            return <CTABand key={i} title={b.title} sub={b.sub} primary={b.primary} primaryHref={b.primaryHref} />;
          default:
            return null;
        }
      })}
    </>
  );
}
