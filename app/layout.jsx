import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar, Footer } from '@/components'
import { StateContext } from '@/context/StateContext'
import { Toaster } from 'react-hot-toast'

//const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  title: 'Vsx Gallery',
  description: 'All Your Gadgets In One Place',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      
      <body>
        <StateContext>
        <header>
        <Navbar />
        </header>
        <main className='main-container'>
          <Toaster />
        {children}
        </main>
        <footer>
        <Footer />
        </footer>
        </StateContext>
      </body>
    </html>
  )
}
