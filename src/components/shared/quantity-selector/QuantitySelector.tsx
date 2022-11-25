import { Input } from '@chakra-ui/input';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ShoppingCartIcon } from '@contentful/f36-icons';
import { useTranslation } from 'next-i18next';

export const QuantitySelector = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text variant="small" fontWeight="600" letterSpacing="0.1rem" textTransform="uppercase">
        {t('product.quantity')}
      </Text>
      <Flex flexDirection="row" mt={2}>
        <Input width={16} textAlign="center" type="number" defaultValue="1" />
        <Button ml={2} variant="primary" rightIcon={<Box as={ShoppingCartIcon} variant="white" />}>
          {t('product.addToCart')}
        </Button>
      </Flex>
    </>
  );
};
