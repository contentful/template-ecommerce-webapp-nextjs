import NextImage, { ImageProps as NextImageProps } from 'next/image';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

interface ImageProps extends ImageFieldsFragment {
  imageProps?: Omit<NextImageProps, 'src' | 'alt'>;
}

export const CtfImage = ({ url, width, height, title, imageProps }: ImageProps) => {
  if (!url || !width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set('w', '10');

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={title || ''}
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...imageProps}
    />
  );
};