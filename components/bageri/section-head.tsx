import { tinaField } from 'tinacms/dist/react';

/**
 * Der wiederkehrende Abschnittskopf: Augenbraue, Ueberschrift und optionaler
 * Nachsatz. Die Ueberschriften der Seite bestehen aus zwei Teilen - einem
 * normalen und einem in Schreibschrift ("Allt kommer ur *samma hus*").
 * Deshalb sind das im CMS zwei Felder statt Markup im Text.
 */
export function SectionHead({
  data,
  className = 'sec-head rise',
  style,
}: {
  data: any;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {data.eyebrow && (
        <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>
          {data.eyebrow}
        </p>
      )}
      <h2>
        {data.heading && <span data-tina-field={tinaField(data, 'heading')}>{data.heading} </span>}
        {data.headingScript && (
          <em className="script" data-tina-field={tinaField(data, 'headingScript')}>
            {data.headingScript}
          </em>
        )}
      </h2>
      {data.intro && (
        <p style={{ color: 'var(--ink-soft)' }} data-tina-field={tinaField(data, 'intro')}>
          {data.intro}
        </p>
      )}
    </div>
  );
}

/** Felder, die jeder Abschnittskopf im CMS bekommt. */
export const sectionHeadFields = [
  { type: 'string' as const, name: 'eyebrow', label: 'Augenbraue' },
  { type: 'string' as const, name: 'heading', label: 'Überschrift' },
  { type: 'string' as const, name: 'headingScript', label: 'Überschrift (Schreibschrift)' },
  { type: 'string' as const, name: 'intro', label: 'Nachsatz' },
];
