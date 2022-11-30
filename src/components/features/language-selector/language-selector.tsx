import { Flex, Select } from '@chakra-ui/react';
import { LanguageIcon } from '@contentful/f36-icons';
import { useRouter } from 'next/router';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  const { locale, locales } = useRouter();
  const router = useRouter();

  return locales && locales.length > 1 ? (
    <Flex justifyContent="center" alignItems="center">
      <LanguageIcon width="18px" height="18px" variant="secondary" />
      <Select
        variant="unstyled"
        size="md"
        pl={1.5}
        defaultValue={locale}
        onChange={event => {
          router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
            locale: String(event.target.value),
          });
        }}>
        {locales?.map(availableLocale => (
          <option key={availableLocale} value={availableLocale} hidden={availableLocale === locale}>
            {displayName(availableLocale).of(localeName(availableLocale))}
          </option>
        ))}
      </Select>
    </Flex>
  ) : null;
};
