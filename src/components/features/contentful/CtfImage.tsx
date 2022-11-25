import { motion } from 'framer-motion';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

interface ImageProps extends ImageFieldsFragment {
  imageProps?: Omit<NextImageProps, 'src' | 'alt'>;
}

export const CtfImage = ({ url, width, height, title, imageProps }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!url || !width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set('w', '10');

  return (
    <motion.div
      animate={{
        opacity: loaded ? 1 : 0,
      }}>
      <NextImage
        src={url}
        width={width}
        height={height}
        alt={title || ''}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        placeholder="blur"
        blurDataURL={blurURL.toString()}
        {...imageProps}
      />
    </motion.div>
  );
};
