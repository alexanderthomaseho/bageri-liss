import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { SectionHead, sectionHeadFields } from './section-head';

export function Find({ data }: { data: any }) {
  return (
    <section id={data.anchor ?? 'hitta'}>
      <div className="wrap">
        <div className="find-grid">
          <div className="rise">
            <SectionHead data={data} className="sec-head" style={{ marginBottom: '2rem' }} />

            <div className="details">
              {(data.details ?? []).map((detail: any, i: number) => (
                <div key={`${detail?.label}-${i}`} className="detail">
                  <span className="k" data-tina-field={tinaField(detail, 'label')}>
                    {detail?.label}
                  </span>
                  <span className="v" data-tina-field={tinaField(detail, 'value')}>
                    {detail?.href ? <a href={detail.href}>{detail?.value}</a> : detail?.value}
                  </span>
                </div>
              ))}
              {data.mapLabel && (
                <div>
                  <a
                    className="btn btn--dark"
                    href={data.mapHref ?? '#'}
                    target="_blank"
                    rel="noopener"
                    data-tina-field={tinaField(data, 'mapLabel')}
                  >
                    {data.mapLabel}
                  </a>
                </div>
              )}
            </div>
          </div>

          <dl className="route rise">
            {(data.route ?? []).map((entry: any, i: number) => (
              <div key={`${entry?.term}-${i}`}>
                <dt data-tina-field={tinaField(entry, 'term')}>{entry?.term}</dt>
                <dd data-tina-field={tinaField(entry, 'description')}>{entry?.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export const findBlockSchema: Template = {
  name: 'find',
  label: 'Anfahrt',
  fields: [
    { type: 'string', name: 'anchor', label: 'Anker' },
    ...sectionHeadFields,
    {
      type: 'object',
      list: true,
      name: 'details',
      label: 'Kontaktangaben',
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: 'string', name: 'label', label: 'Bezeichnung' },
        { type: 'string', name: 'value', label: 'Angabe' },
        { type: 'string', name: 'href', label: 'Link (optional)' },
      ],
    },
    { type: 'string', name: 'mapLabel', label: 'Karten-Button' },
    { type: 'string', name: 'mapHref', label: 'Karten-Ziel' },
    {
      type: 'object',
      list: true,
      name: 'route',
      label: 'Anfahrtswege',
      ui: { itemProps: (item) => ({ label: item?.term }) },
      fields: [
        { type: 'string', name: 'term', label: 'Von wo' },
        { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
      ],
    },
  ],
};
