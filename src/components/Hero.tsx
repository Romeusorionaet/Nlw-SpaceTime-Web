'use client'

import { useHandleScroll } from '@/hooks/useHandleScroll'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Image from 'next/image'

export function Hero() {
  const isFixed = useHandleScroll()

  return (
    <div id="hero" className="space-y-5 max-Mobile:-mt-[5rem] max-Mobile:mr-4">
      <Image
        src={nlwLogo}
        alt="Nlw Spacetime"
        className="right-4 top-4 max-Mobile:ml-[60%] max-MiniMobile:absolute max-MiniMobile:w-32"
      />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50 max-Mobile:text-2xl max-MiniMobile:mt-[4rem] max-MiniMobile:text-base">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed max-Mobile:text-sm max-MiniMobile:text-xs">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        href="/memories/new"
        className={`inline-block rounded-full bg-green-500 px-5 py-3 text-center font-alt text-sm uppercase leading-none text-black hover:bg-green-600 ${
          isFixed ? 'fixed left-4 right-0 top-0 max-w-[14rem]' : ''
        }`}
      >
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  )
}
