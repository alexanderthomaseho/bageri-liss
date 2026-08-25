import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';

export function Footer({ data }: { data: any }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="fcol">
            <p className="script" data-tina-field={tinaField(data, 'brand')}>
              {data.brand}
            </p>
            {data.tagline && (
              <p className="fine" data-tina-field={tinaField(data, 'tagline')}>
                {data.tagline}
              </p>
            )}
          </div>

          {(data.columns ?? []).map((column: any, i: number) => (
            <div key={`${column?.eyebrow}-${i}`} className="fcol">
              <p className="eyebrow" data-tina-field={tinaField(column, 'eyebrow')}>
                {column?.eyebrow}
              </p>
              {(column?.lines ?? []).map((line: any, j: number) => (
                <p
                  key={`${line?.text}-${j}`}
                  className={line?.muted ? 'fine' : undefined}
                  data-tina-field={tinaField(line, 'text')}
                >
                  {line?.href ? (
                    <a
                      href={line.href}
                      target={line.href.startsWith('http') ? '_blank' : undefined}
                      rel={line.href.startsWith('http') ? 'noopener' : undefined}
                    >
                      {line?.text}
                    </a>
                  ) : (
                    line?.text
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
        {data.copyright && (
          <p className="foot-rule" data-tina-field={tinaField(data, 'copyright')}>
            {data.copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

export const footerBlockSchema: Template = {
  name: 'footer',
  label: 'Fußzeile',
  fields: [
    { type: 'string', name: 'brand', label: 'Name' },
    { type: 'string', name: 'tagline', label: 'Untertitel' },
    {
      type: 'object',
      list: true,
      name: 'columns',
      label: 'Spalten',
      ui: { itemProps: (item) => ({ label: item?.eyebrow }) },
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Überschrift' },
        {
          type: 'object',
          list: true,
          name: 'lines',
          label: 'Zeilen',
          ui: { itemProps: (item) => ({ label: item?.text }) },
          fields: [
            { type: 'string', name: 'text', label: 'Text' },
            { type: 'string', name: 'href', label: 'Link (optional)' },
            { type: 'boolean', name: 'muted', label: 'Gedämpft' },
          ],
        },
      ],
    },
    { type: 'string', name: 'copyright', label: 'Copyright' },
  ],
};
