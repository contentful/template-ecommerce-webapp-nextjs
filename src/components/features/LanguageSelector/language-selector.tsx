import { Flex, Select } from '@contentful/f36-components';
import { LanguageIcon } from '@contentful/f36-icons';

export const LanguageSelector = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <LanguageIcon variant="secondary" />
      <Select style={{ border: 'none', boxShadow: 'none', paddingLeft: '0.5rem' }}>
        <Select.Option value="English">EN</Select.Option>
        <Select.Option value="Deutsch">DE</Select.Option>
      </Select>
    </Flex>
  );
};
