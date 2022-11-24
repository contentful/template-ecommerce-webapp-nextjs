import { useTranslation } from 'next-i18next';

export const QuantitySelector = () => {
  const { t } = useTranslation();

  return (
    <>
      <p>{t('product.quantity')}</p>
      <div>
        <input type="number" />
        <button>{t('product.addToCart')}</button>
      </div>
    </>
  );
};
