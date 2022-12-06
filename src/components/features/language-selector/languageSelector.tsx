import { useRouter } from 'next/router';

import { LanguageSelectorDesktop } from './langaugeSelectorDesktop';
import { LanguageSelectorMobile } from './langaugeSelectorMobile';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  const { locale, locales } = useRouter();
  const router = useRouter();

  return locales && locales.length > 1 ? (
    <>
      <LanguageSelectorDesktop
        locale={locale}
        locales={locales}
        displayName={displayName}
        localeName={localeName}
        router={router}
      />
      <LanguageSelectorMobile
        locale={locale}
        locales={locales}
        displayName={displayName}
        localeName={localeName}
        router={router}
      />
    </>
  ) : null;
};
