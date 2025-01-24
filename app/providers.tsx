'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Noto_Sans_Thai } from 'next/font/google'

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '700'],
  subsets: ['thai', 'latin'],
})

const theme = createTheme({
  typography: {
    fontFamily: notoSansThai.style.fontFamily,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 'medium',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans Thai';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Noto Sans Thai');
        }
      `,
    },
  },
})

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
