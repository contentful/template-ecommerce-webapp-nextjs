import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  SwitchProps,
  useTheme,
  InputProps,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactNode } from 'react';

import ContentfulIcon from '@icons/contentful.svg';
import {
  ContentfulParams,
  guestSpaceOptionalParameters,
  guestSpaceRequiredParameters,
  useContentfulEditorialStore,
} from '@src/_ctf-private';

const ParamToggle = ({
  label,
  id,
  helpText,
  ...rest
}: SwitchProps & {
  label: ReactNode;
  helpText: ReactNode;
}) => {
  return (
    <FormControl width="100%" mb={6} as={Flex}>
      <Box pr={6} flex="1">
        <FormLabel htmlFor={id} mb="0" mr="auto">
          {label}
        </FormLabel>
        <FormHelperText>{helpText}</FormHelperText>
      </Box>
      <Switch id={id} size="lg" {...rest} />
    </FormControl>
  );
};

const ParamInput = ({
  label,
  ...props
}: InputProps & {
  label: ReactNode;
}) => {
  return (
    <FormControl width="100%" mb={4}>
      <FormLabel htmlFor={props.id} mb="0">
        {label}
      </FormLabel>
      <Input id={props.id} {...props} />
    </FormControl>
  );
};

export const CtfToolbox = () => {
  const { f36 } = useTheme();
  const router = useRouter();

  const handlePreviewMode = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [ContentfulParams.preview]: e.target.checked,
      },
    });
  };

  const handleXrayMode = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [ContentfulParams.xray]: e.target.checked,
      },
    });
  };

  const handleReset = async () => {
    // Pass the reset parameter, which clears the persisted store
    await router.replace({
      pathname: router.pathname,
      query: {
        [ContentfulParams.reset]: true,
      },
    });
    // Remove the reset parameter, since we no longer need it
    await router.replace({
      pathname: router.pathname,
    });
    // Reload the page to fetch serverside data
    router.reload();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = [...data.entries()].reduce(
      (acc, [key, val]) => {
        if (val.length > 0) {
          acc[key] = String(val);
        } else {
          delete acc[key];
        }

        return acc;
      },
      { ...router.query },
    );

    await router.replace({
      pathname: router.pathname,
      query: {
        ...dataObj,
      },
    });
    router.reload();
  };

  return (
    <Menu gutter={30}>
      <MenuButton
        as={Button}
        variant="unstyled"
        position="fixed"
        bottom={f36.spacing2Xl}
        right={f36.spacing2Xl}
        borderRadius="50%"
        height={14}
        width={14}
        backgroundColor={f36.gray800}
        boxShadow="0 2px 6px rgba(0,0,0,0.29)">
        <Flex width="100%" height="100%" alignItems="center" justifyContent="center">
          <Box
            as={ContentfulIcon}
            width={f36.spacingXl}
            height={f36.spacingXl}
            transform="translateX(-1px)"
          />
        </Flex>
      </MenuButton>
      <MenuList
        backgroundColor="white"
        borderRadius="0"
        p={0}
        outline="0px"
        border="none"
        boxShadow="0 2px 30px rgba(0,0,0,0.29)"
        maxWidth="500px"
        maxHeight="70vh"
        overflow="auto">
        <Flex backgroundColor={f36.gray800} py={{ base: 6, lg: 8 }} px={{ base: 4, lg: 6 }}>
          <Box
            as={ContentfulIcon}
            width={f36.spacingXl}
            height={f36.spacingXl}
            transform="translateX(-1px)"
          />
          <Heading as="h2" variant="h3" color="white" ml={3}>
            Editorial Toolbox
          </Heading>
        </Flex>
        <Box py={{ base: 4 }} px={{ base: 4, lg: 6 }}>
          <Heading as="h3" variant="h3">
            General settings
          </Heading>
          <Box as="hr" my={4} />

          <ParamToggle
            id="preview-mode"
            label="Preview mode"
            helpText="View draft entries, assets and unpublished content changes."
            defaultChecked={router.query[ContentfulParams.preview] === 'true'}
            onChange={handlePreviewMode}
          />

          <ParamToggle
            id="xray-mode"
            label="X-ray mode"
            helpText="Highlight components making up a page and provide a deep link to the entry editor."
            defaultChecked={router.query[ContentfulParams.xray] === 'true'}
            onChange={handleXrayMode}
          />

          {process.env.NODE_ENV === 'development' && (
            <>
              <Box mb={6}>
                <Heading as="h3" variant="h3">
                  Guest space parameters
                </Heading>
                <Box as="hr" my={4} />

                <form onSubmit={handleSubmit}>
                  {[...guestSpaceRequiredParameters, ...guestSpaceOptionalParameters].map(param => {
                    const queryParam = useContentfulEditorialStore.getState()[param];

                    return (
                      <ParamInput
                        label={param}
                        name={param}
                        defaultValue={queryParam}
                        key={param}
                      />
                    );
                  })}
                  <Button type="submit">Submit</Button>
                </form>
              </Box>
              <Box>
                <Heading as="h3" variant="h3">
                  Reset
                </Heading>
                <Box as="hr" my={4} />

                <FormControl width="100%" mb={6} as={Flex}>
                  <Box pr={6} flex="1">
                    <FormLabel htmlFor="reset" mb="0" mr="auto">
                      Reset editorial settings
                    </FormLabel>
                    <FormHelperText>
                      Reset the guest space functionality, x-ray and preview-mode
                    </FormHelperText>
                  </Box>
                  <Button onClick={handleReset}>Reset</Button>
                </FormControl>
              </Box>
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};
