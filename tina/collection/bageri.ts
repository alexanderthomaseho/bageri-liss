import type { Collection } from 'tinacms';
import { topbarBlockSchema } from '@/components/bageri/topbar';
import { heroBlockSchema } from '@/components/bageri/hero';
import { welcomeBlockSchema } from '@/components/bageri/welcome';
import { productsBlockSchema } from '@/components/bageri/products';
import { galleryBlockSchema } from '@/components/bageri/gallery';
import { hoursBlockSchema } from '@/components/bageri/hours';
import { findBlockSchema } from '@/components/bageri/find';
import { footerBlockSchema } from '@/components/bageri/footer';

/**
 * Die Bageri-Liss-Seite. Eigene Sammlung statt der Starter-Seiten, weil sie
 * ihr eigenes Layout mitbringt - eigene Kopfleiste, eigene Fusszeile, eigene
 * Schriften - und ohne den Rahmen des Starters gerendert wird.
 */
const Bageri: Collection = {
  label: 'Bageri Liss',
  name: 'bageri',
  path: 'content/bageri',
  format: 'mdx',
  ui: {
    router: () => '/bageri-liss',
    allowedActions: { create: false, delete: false },
  },
  fields: [
    { type: 'string', name: 'title', label: 'Seitentitel', required: true },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Abschnitte',
      ui: { visualSelector: true },
      templates: [
        topbarBlockSchema,
        heroBlockSchema,
        welcomeBlockSchema,
        productsBlockSchema,
        galleryBlockSchema,
        hoursBlockSchema,
        findBlockSchema,
        footerBlockSchema,
      ],
    },
  ],
};

export default Bageri;
