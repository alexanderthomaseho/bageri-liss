import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { SectionHead, sectionHeadFields } from './section-head';

/** Die Wabe auf der Honig-Karte - im Original ein Inline-SVG statt eines Fotos. */
function HoneycombPanel() {
  return (
    <div className="panel">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M24 5 L39 13.5 L39 30.5 L24 39 L9 30.5 L9 13.5 Z" />
        <path d="M24 14 L31.5 18.2 L31.5 26.8 L24 31 L16.5 26.8 L16.5 18.2 Z" opacity=".5" />
        <path d="M13 43 q11 -4 22 0" opacity=".6" />
      </svg>
    </div>
  );
}

export function Products({ data }: { data: any }) {
  return (
    <section id={data.anchor ?? 'sortiment'} className="band-2">
      <div className="wrap">
        <SectionHead data={data} />

        <div className="cards">
          {(data.cards ?? []).map((card: any, i: number) => (
            <article key={`${card?.title}-${i}`} className={`card${card?.honeycomb ? ' card--bees' : ''} rise`}>
              {card?.honeycomb ? (
                <HoneycombPanel />
              ) : (
                card?.image && (
                  <img
                    src={card.image}
                    alt={card.imageAlt ?? ''}
                    width={760}
                    height={570}
                    loading="lazy"
                    data-tina-field={tinaField(card, 'image')}
                  />
                )
              )}
              <div className="card-body">
                {card?.tag && (
                  <p className="tag" data-tina-field={tinaField(card, 'tag')}>
                    {card.tag}
                  </p>
                )}
                <h3 data-tina-field={tinaField(card, 'title')}>{card?.title}</h3>
                <p data-tina-field={tinaField(card, 'text')}>{card?.text}</p>
                <ul>
                  {(card?.items ?? []).map((item: any, j: number) => (
                    <li key={`${item?.name}-${j}`} data-tina-field={tinaField(item, 'name')}>
                      <span>{item?.name}</span>
                      <span className="kr">{item?.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const productsBlockSchema: Template = {
  name: 'products',
  label: 'Sortiment',
  fields: [
    { type: 'string', name: 'anchor', label: 'Anker' },
    ...sectionHeadFields,
    {
      type: 'object',
      list: true,
      name: 'cards',
      label: 'Karten',
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { type: 'image', name: 'image', label: 'Bild' },
        { type: 'string', name: 'imageAlt', label: 'Bildbeschreibung' },
        {
          type: 'boolean',
          name: 'honeycomb',
          label: 'Wabe statt Bild',
          description: 'Zeigt die gezeichnete Wabe - für die Honigkarte.',
        },
        { type: 'string', name: 'tag', label: 'Etikett' },
        { type: 'string', name: 'title', label: 'Titel' },
        { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
        {
          type: 'object',
          list: true,
          name: 'items',
          label: 'Preisliste',
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            { type: 'string', name: 'name', label: 'Bezeichnung' },
            { type: 'string', name: 'price', label: 'Preis' },
          ],
        },
      ],
    },
  ],
};
