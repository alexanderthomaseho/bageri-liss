import type { Template } from 'tinacms';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField } from 'tinacms/dist/react';

/**
 * `.prose` verteilt seine direkten Kinder per Flex-Gap. Deshalb steht hier
 * kein Wrapper um den Fliesstext - die Absaetze muessen selbst Flex-Kinder
 * sein, sonst fallen die Abstaende zusammen. Die Ueberschrift traegt aus dem
 * gleichen Grund ihren Inline-Stil aus der Quelle statt der .sec-head-Klasse:
 * das Kursiv der Schreibschrift ist hier gewollt, im .sec-head nicht.
 */
export function Welcome({ data }: { data: any }) {
  return (
    <section id={data.anchor ?? 'valkommen'}>
      <div className="wrap">
        <div className="welcome-grid">
          <div className="prose rise">
            {data.eyebrow && (
              <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>
                {data.eyebrow}
              </p>
            )}
            <h2 style={{ fontSize: 'clamp(var(--s-3), 6vw, var(--s-4))', color: 'var(--brown)' }}>
              {data.heading && <span data-tina-field={tinaField(data, 'heading')}>{data.heading} </span>}
              {data.headingScript && (
                <em className="script" data-tina-field={tinaField(data, 'headingScript')}>
                  {data.headingScript}
                </em>
              )}
            </h2>
            {data.lead && (
              <p className="lead" data-tina-field={tinaField(data, 'lead')}>
                {data.lead}
              </p>
            )}
            <TinaMarkdown content={data.body} />
            {data.quote && (
              <blockquote className="pull" data-tina-field={tinaField(data, 'quote')}>
                {data.quote}
                {data.quoteSource && <cite>{data.quoteSource}</cite>}
              </blockquote>
            )}
          </div>

          <figure className="rise">
            {data.image && (
              <img
                src={data.image}
                alt={data.imageAlt ?? ''}
                width={660}
                height={495}
                loading="lazy"
                data-tina-field={tinaField(data, 'image')}
              />
            )}
            {data.caption && (
              <figcaption data-tina-field={tinaField(data, 'caption')}>{data.caption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}

export const welcomeBlockSchema: Template = {
  name: 'welcome',
  label: 'Willkommen',
  fields: [
    { type: 'string', name: 'anchor', label: 'Anker' },
    { type: 'string', name: 'eyebrow', label: 'Augenbraue' },
    { type: 'string', name: 'heading', label: 'Überschrift' },
    { type: 'string', name: 'headingScript', label: 'Überschrift (Schreibschrift)' },
    { type: 'string', name: 'lead', label: 'Einleitung', ui: { component: 'textarea' } },
    { type: 'rich-text', name: 'body', label: 'Fließtext' },
    { type: 'string', name: 'quote', label: 'Zitat', ui: { component: 'textarea' } },
    { type: 'string', name: 'quoteSource', label: 'Zitat-Quelle' },
    { type: 'image', name: 'image', label: 'Bild' },
    { type: 'string', name: 'imageAlt', label: 'Bildbeschreibung' },
    { type: 'string', name: 'caption', label: 'Bildunterschrift' },
  ],
};
