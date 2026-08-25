import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { SectionHead, sectionHeadFields } from './section-head';

export function Hours({ data }: { data: any }) {
  return (
    <section id={data.anchor ?? 'oppettider'} className="band-2">
      <div className="wrap">
        <div className="hours-grid">
          <SectionHead data={data} />

          <div className="rise">
            <div className="hours">
              {(data.rows ?? []).map((row: any, i: number) => (
                <div key={`${row?.day}-${i}`} className={`row${row?.closed ? ' shut' : ''}`}>
                  <span className="day" data-tina-field={tinaField(row, 'day')}>
                    {row?.day}
                  </span>
                  <span className="time" data-tina-field={tinaField(row, 'time')}>
                    {row?.time}
                  </span>
                </div>
              ))}
            </div>
            {data.note && (
              <p className="note" data-tina-field={tinaField(data, 'note')}>
                {data.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const hoursBlockSchema: Template = {
  name: 'hours',
  label: 'Öffnungszeiten',
  fields: [
    { type: 'string', name: 'anchor', label: 'Anker' },
    ...sectionHeadFields,
    {
      type: 'object',
      list: true,
      name: 'rows',
      label: 'Zeiten',
      ui: { itemProps: (item) => ({ label: item?.day }) },
      fields: [
        { type: 'string', name: 'day', label: 'Tage' },
        { type: 'string', name: 'time', label: 'Zeit' },
        { type: 'boolean', name: 'closed', label: 'Geschlossen' },
      ],
    },
    { type: 'string', name: 'note', label: 'Hinweis', ui: { component: 'textarea' } },
  ],
};
