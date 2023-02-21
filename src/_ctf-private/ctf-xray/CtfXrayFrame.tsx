import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useContentfulEditorialStore } from '@src/_ctf-private';
import { Sys } from '@src/lib/__generated/sdk';
import typewriter from 'analytics';

export interface CtfXrayFrameProps {
  children: ReactNode;
  entry: {
    __typename: string;
    sys: Pick<Sys, 'id' | 'spaceId'>;
    internalName?: string | null | undefined;
  };
}
export const CtfXrayFrame = ({ entry }: CtfXrayFrameProps) => {
  const { xray, domain } = useContentfulEditorialStore();
  const contentfulUrl = `https://app.${domain}/spaces/${entry.sys.spaceId}/entries/${entry.sys.id}`;

  const handleOnClick = e => {
    e.stopPropagation();

    typewriter.contentModelInteracted({
      entryTypeName: entry.__typename || '',
      entryInternalName: entry.internalName || '',
      entryLink: contentfulUrl,
    });

    window.open(contentfulUrl, '_blank', 'noopener noreferrer');
  };

  return xray ? (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      pointerEvents="none"
      zIndex="1"
      borderStyle="dashed"
      borderColor="gray.600"
      borderTopWidth="1px"
      borderBottomWidth="1px">
      <Box
        onClick={handleOnClick}
        cursor="pointer"
        display="inline-block"
        position="absolute"
        top="0"
        left="0"
        backgroundColor="gray.300"
        pointerEvents="all"
        maxWidth="100%"
        px={2}
        py={1}>
        <Text
          color="black"
          size="small"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap">
          <strong>{entry.__typename}</strong>
          {entry.internalName && <span> | {entry.internalName}</span>}
        </Text>
      </Box>
    </Box>
  ) : null;
};
