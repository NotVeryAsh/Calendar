import "./globals.css";
import { Montserrat } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/app/theme";
config.autoAddCss = false

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: "Calendar",
  description: "Your favorite productivity tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={montserrat.className + " flex flex-col antialiased /*bg-gray-100*/ bg-gradient-to-r from-cyan-100 to-sky-200 text-zinc-700 px-4"}
      >
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
