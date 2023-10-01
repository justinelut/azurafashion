import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header';
import './globals.css'
import { Inter } from 'next/font/google'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "animate.css";
import "nprogress/nprogress.css";
import { PocketProvider } from '@/app/provider';
import { ThemeProvider } from "@/app/ThemeProvider"
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {


  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <PocketProvider>
          <Header />
          {children}
          <Footer />
        </PocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
