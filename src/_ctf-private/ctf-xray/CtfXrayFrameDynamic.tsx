import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { CtfXrayFrameProps } from '@src/_ctf-private/ctf-xray/CtfXrayFrame';

const DynamicXrayFrame = dynamic(
  () => import('./CtfXrayFrame').then(module => module.CtfXrayFrame),
  {
    ssr: false,
  },
);
export const CtfXrayFrameDynamic = (props: CtfXrayFrameProps) => {
  return (
    <Box as="span" position="relative" zIndex="1">
      {props.children}
      <DynamicXrayFrame {...props} />
    </Box>
  );
};
