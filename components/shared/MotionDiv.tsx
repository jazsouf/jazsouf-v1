'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import ClientOnly from './ClientOnly'

const MotionDiv = ({
  classname,
  content
}: {
  classname: string
  content: any
}) => {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [])
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  }
  return (
    <motion.div
      key={key}
      initial={'hidden'}
      animate="visible"
      variants={fadeInUp}
      className={classname}
    >
      {content}
    </motion.div>
  )
}

export default MotionDiv
