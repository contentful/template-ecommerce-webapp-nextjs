import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
  MenuOptionGroup,
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
import { LanguageIcon, ChevronDownTrimmedIcon, ChevronUpTrimmedIcon } from '@contentful/f36-icons';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  const { locale, locales } = useRouter();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLSelectElement | null>(null);

  return locales && locales.length > 1 ? (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        display={{ base: 'none', md: 'flex', lg: 'flex' }}>
        <LanguageIcon width="18px" height="18px" variant="secondary" />
        <Menu gutter={0}>
          {({ isOpen }) => (
            <>
              <MenuButton
                pr={1}
                pl={1}
                textTransform="uppercase"
                background="transparent"
                _hover={{ bg: 'transparent' }}
                _expanded={{ bg: 'transparent' }}
                _focus={{ bg: 'transparent' }}
                isActive={isOpen}
                as={Button}
                rightIcon={
                  isOpen ? (
                    <ChevronUpTrimmedIcon variant="secondary" />
                  ) : (
                    <ChevronDownTrimmedIcon variant="secondary" />
                  )
                }>
                {localeName(locale)}
              </MenuButton>
              <MenuList minW={24} p={0}>
                <MenuOptionGroup
                  defaultValue={locale}
                  onChange={value => {
                    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
                      locale: String(value),
                    });
                  }}>
                  {locales?.map(availableLocale =>
                    availableLocale === locale ? null : (
                      <MenuItemOption
                        minW={24}
                        textAlign="center"
                        _focus={{ boxShadow: 'outline' }}
                        _hover={{ bg: 'transparent', boxShadow: 'none' }}
                        icon={null}
                        key={availableLocale}
                        value={availableLocale}>
                        {displayName(availableLocale).of(localeName(availableLocale))}
                      </MenuItemOption>
                    ),
                  )}
                </MenuOptionGroup>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
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
    </>
  ) : null;
};
