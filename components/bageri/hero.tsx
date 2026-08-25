import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';

export function Hero({ data }: { data: any }) {
  return (
    <section className="hero">
      {data.image && (
        <img
          src={data.image}
          alt={data.imageAlt ?? ''}
          width={1400}
          height={1400}
          data-tina-field={tinaField(data, 'image')}
        />
      )}
      <div className="wrap">
        <div className="hero-inner">
          <h1 className="visually-hidden">{data.title}</h1>
          {data.eyebrow && (
            <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>
              {data.eyebrow}
            </p>
          )}
          {data.where && (
            <p className="where" data-tina-field={tinaField(data, 'where')}>
              {data.where}
            </p>
          )}
          {data.status && (
            <p className="status" data-tina-field={tinaField(data, 'status')}>
              {data.status}
            </p>
          )}
          {data.buttonLabel && (
            <a className="btn btn--light" href={data.buttonHref ?? '#'} data-tina-field={tinaField(data, 'buttonLabel')}>
              {data.buttonLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Titelbild',
  fields: [
    { type: 'image', name: 'image', label: 'Bild' },
    { type: 'string', name: 'imageAlt', label: 'Bildbeschreibung' },
    { type: 'string', name: 'title', label: 'Seitentitel (nur für Screenreader)' },
    { type: 'string', name: 'eyebrow', label: 'Augenbraue' },
    { type: 'string', name: 'where', label: 'Ort' },
    { type: 'string', name: 'status', label: 'Hinweis' },
    { type: 'string', name: 'buttonLabel', label: 'Button' },
    { type: 'string', name: 'buttonHref', label: 'Button-Ziel' },
  ],
};
