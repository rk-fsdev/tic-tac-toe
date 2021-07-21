import * as React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Board from './components/Board';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid height="100vh" p={3} gridTemplateRows="auto 1fr">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Board />
      </Grid>
    </Box>
  </ChakraProvider>
);
