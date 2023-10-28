
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
import Topbar from '@/components/Navbar/Topbar'
import TopHeader from '@/components/TopHeader/TopHeader'
import GotoTop from '@/components/GotoTop/GotoTop'
import { StoreProvider } from '@/redux/StoreProvider'
import { AuthContextProvider } from '@/context/authContext'
// import { StoreProvider } from '@/redux/storeProvider'
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daily Mail | Home',
  description: 'The best blog app!',
}
{/* <Provider store={store}> */ }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthContextProvider>
            <TopHeader />
            <Topbar />
            {children}
            <GotoTop />
            <Footer />
          </AuthContextProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
{/* </Provider> */ }
