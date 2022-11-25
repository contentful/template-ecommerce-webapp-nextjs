import { getCurrency } from 'locale-currency';
import { useRouter } from 'next/router';

interface FormatCurrencyProps {
  value: number;
  locale?: string;
  style?: string;
  currency?: string;
}

export const formatCurrencyFunc = ({
  value,
  locale,
  style = 'currency',
  currency,
}: FormatCurrencyProps) => {
  if (!locale) return null;

  const currencyFromLocale = getCurrency(locale);

  return new Intl.NumberFormat(locale, { style, currency: currency || currencyFromLocale }).format(
    value,
  );
};

export const FormatCurrency = (props: FormatCurrencyProps) => {
  const { locale: localeFromRouter } = useRouter();

  if (!localeFromRouter) return null;

  return <>{formatCurrencyFunc({ ...props, locale: localeFromRouter })}</>;
};
