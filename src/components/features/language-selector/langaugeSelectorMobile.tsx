import {
  Text,
  Box,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { LanguageIcon } from '@contentful/f36-icons';
import { useRef } from 'react';

export const LanguageSelectorMobile = ({ locale, locales, displayName, localeName, router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLSelectElement | null>(null);

  return (
    <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
      <LanguageIcon width="18px" height="18px" variant="secondary" onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" initialFocusRef={firstField}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={20}>Regional Settings</DrawerHeader>

          <DrawerBody>
            <Text fontSize="md" fontWeight={600}>
              Language
            </Text>
            <Select
              size="md"
              mt={2}
              ref={firstField}
              defaultValue={locale}
              onChange={event => {
                router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
                  locale: String(event.target.value),
                });
                onClose();
              }}>
              {locales?.map(availableLocale => (
                <option key={availableLocale} value={availableLocale}>
                  {displayName(availableLocale).of(localeName(availableLocale))}
                </option>
              ))}
            </Select>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
