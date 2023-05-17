import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * Augmented Next.js Link component with query params persistence.
 */
export const LinkWithPersistedQuery = ({ href, ...props }: React.ComponentProps<typeof Link>) => {
  const router = useRouter();

  const pathname = typeof href === 'object' ? href.pathname : href;

  const query = typeof href === 'object' && typeof href.query === 'object' ? href.query : {};

  return (
    <Link
      {...props}
      href={{
        pathname,
        query: {
          ...router.query,
          ...query,
        },
      }}
    />
  );
};
