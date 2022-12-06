import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { LanguageIcon, ChevronDownTrimmedIcon, ChevronUpTrimmedIcon } from '@contentful/f36-icons';

export const LanguageSelectorDesktop = ({ locale, locales, localeName, displayName, router }) => {
  return (
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
  );
};
