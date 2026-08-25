import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { SectionHead, sectionHeadFields } from './section-head';

export function Gallery({ data }: { data: any }) {
  return (
    <section id={data.anchor ?? 'butiken'}>
      <div className="wrap">
        <SectionHead data={data} />

        <div className="gallery rise">
          {(data.images ?? []).map((entry: any, i: number) => (
            <img
              key={`${entry?.image}-${i}`}
              src={entry?.image}
              alt={entry?.alt ?? ''}
              width={660}
              height={entry?.square ? 660 : 495}
              loading="lazy"
              data-tina-field={tinaField(entry, 'image')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const galleryBlockSchema: Template = {
  name: 'gallery',
  label: 'Galerie',
  fields: [
    { type: 'string', name: 'anchor', label: 'Anker' },
    ...sectionHeadFields,
    {
      type: 'object',
      list: true,
      name: 'images',
      label: 'Bilder',
      ui: { itemProps: (item) => ({ label: item?.alt }) },
      fields: [
        { type: 'image', name: 'image', label: 'Bild' },
        { type: 'string', name: 'alt', label: 'Bildbeschreibung' },
        { type: 'boolean', name: 'square', label: 'Quadratisch' },
      ],
    },
  ],
};
