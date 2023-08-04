import { extendTheme } from '@chakra-ui/react'

import Colors from './components/Colors'

export const theme = extendTheme({
  colors: {
    ...Colors,
  },
})