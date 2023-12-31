import '../styles/globals.css'
import { ReactNode } from 'react'

import { cookies } from 'next/headers'

import { Copyright } from '../components/Copyright'
import { Hero } from '../components/Hero'
import { SignIn } from '../components/SignIn'
import { Profile } from '../components/Profile'
import '../styles/scrollbar.css'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construida com React, Next.js, Tailwindcss e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieIsAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} flex-col items-center bg-gray-900 font-sans text-gray-100 max-Mobile:flex`}
      >
        <main className="grid min-h-screen grid-cols-2 max-Mobile:grid-cols-1">
          {/* left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 max-Mobile:h-[30rem] max-Mobile:px-8 max-Mobile:py-8">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {cookieIsAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          {/* right */}
          <div className="scrollbar flex max-h-screen flex-col overflow-y-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
