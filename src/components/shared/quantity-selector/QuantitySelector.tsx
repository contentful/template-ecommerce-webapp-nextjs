import { Input } from '@chakra-ui/input';
import { Box, Button, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { ShoppingCartIcon } from '@contentful/f36-icons';
import { useTranslation } from 'next-i18next';

export const QuantitySelector = () => {
  const { t } = useTranslation();

  return (
    <FormControl>
      <Text
        as={FormLabel}
        variant="small"
        fontWeight="600"
        letterSpacing="0.1rem"
        textTransform="uppercase">
        {t('product.quantity')}
      </Text>
      <Flex flexDirection="row" mt={2}>
        <Input width={16} min={0} textAlign="center" type="number" defaultValue="1" />
        <Button
          ml={2}
          variant="primary"
          rightIcon={
            <Box as={ShoppingCartIcon} width="18px" height="18px" fill="white" variant="white" />
          }>
          {t('product.addToCart')}
        </Button>
      </Flex>
    </FormControl>
  );
};
