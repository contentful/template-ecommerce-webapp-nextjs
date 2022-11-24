import { Flex, Select } from '@contentful/f36-components';
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
    <Flex justifyContent="space-between" alignItems="center">
      <LanguageIcon variant="secondary" />
      <Select
        style={{ border: 'none', boxShadow: 'none' }}
        defaultValue={locale}
        onChange={event => {
          router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
            locale: String(event.target.value),
          });
        }}>
        {locales?.map(availableLocale => (
          <Select.Option
            key={availableLocale}
            value={availableLocale}
            hidden={availableLocale === locale}>
            {displayName(availableLocale).of(localeName(availableLocale))}
          </Select.Option>
        ))}
      </Select>
    </Flex>
  ) : null;
};
