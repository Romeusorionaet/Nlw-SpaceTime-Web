'use client'

import { useState, useEffect } from 'react'

export function useHandleScroll() {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const element = document.getElementById('hero')

      if (element && scrollY >= element.offsetTop) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isFixed
}
