'use client';
import { useTina } from 'tinacms/dist/react';
import { BageriBlocks } from '@/components/bageri';
import ErrorBoundary from '@/components/error-boundary';

export default function ClientPage(props: {
  data: any;
  variables: { relativePath: string };
  query: string;
}) {
  const { data } = useTina({ ...props });
  return (
    <ErrorBoundary>
      <BageriBlocks blocks={data?.bageri?.blocks ?? []} />
    </ErrorBoundary>
  );
}
