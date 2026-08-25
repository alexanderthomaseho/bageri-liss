import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';

export function Topbar({ data }: { data: any }) {
  return (
    <header className="topbar">
      <div className="wrap">
        <span className="script" data-tina-field={tinaField(data, 'brand')}>
          {data.brand}
        </span>
        <nav>
          {(data.links ?? []).map((link: any, i: number) => (
            <a key={`${link?.href}-${i}`} href={link?.href ?? '#'} data-tina-field={tinaField(link, 'label')}>
              {link?.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export const topbarBlockSchema: Template = {
  name: 'topbar',
  label: 'Kopfleiste',
  fields: [
    { type: 'string', name: 'brand', label: 'Name' },
    {
      type: 'object',
      list: true,
      name: 'links',
      label: 'Navigation',
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: 'string', name: 'label', label: 'Text' },
        { type: 'string', name: 'href', label: 'Ziel' },
      ],
    },
  ],
};
