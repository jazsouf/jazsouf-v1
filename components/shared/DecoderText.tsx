'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import ClientOnly from './ClientOnly'

const getRandomChar = () => {
  const randomCode = Math.floor(Math.random() * 26) + 65 // ASCII codes for A-Z
  return String.fromCharCode(randomCode)
}

const DecodeChar = ({ char }) => {
  const [currentChar, setCurrentChar] = useState(getRandomChar())

  useEffect(() => {
    const end = char.charCodeAt(0)
    let current = currentChar.charCodeAt(0)
    const increment = () => {
      if (current > 90) {
        // Reset to 'A' after 'Z'
        current = 65
      }
      setCurrentChar(String.fromCharCode(current))
      if (current === end) {
        clearInterval(timer)
      }
      current++
    }

    const timer = setInterval(increment, 10)

    return () => clearInterval(timer)
  }, [char, currentChar])

  return <motion.span>{currentChar}</motion.span>
}

const DecoderText = ({ text }) => {
  const isAlpha = (char: string) => /^[A-Z]$/.test(char)

  return (
    <ClientOnly>
      <div>
        {Array.from(text).map((char: string, index) => {
          if (!isAlpha(char)) {
            return <span key={index}>{char}</span>
          }
          return <DecodeChar key={index} char={char} />
        })}
      </div>
    </ClientOnly>
  )
}

export default DecoderText
