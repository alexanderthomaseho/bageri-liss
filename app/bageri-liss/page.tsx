import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import ClientPage from './client-page';

export const revalidate = 300;

/**
 * Die Bageri-Seite rendert bewusst ohne den Rahmen des Starters: keine
 * globale Kopf- oder Fusszeile, kein Section-Container. Kopfleiste und
 * Fusszeile sind eigene Bloecke, damit die Seite so aussieht wie die Vorlage.
 */
async function getPage() {
  try {
    return await client.queries.bageriQuery({ relativePath: 'index.mdx' });
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPage();
  return {
    title: data?.data.bageri.title ?? 'Bageri Liss',
    description: data?.data.bageri.description ?? undefined,
  };
}

export default async function BageriPage() {
  const data = await getPage();
  if (!data) notFound();

  return <ClientPage {...data} />;
}
