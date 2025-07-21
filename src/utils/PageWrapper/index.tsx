import { motion } from 'motion/react'
import { pageVariants } from './utils'

function PageWrapper({ children }: { children: React.ReactNode }) {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{
        type: 'decay',
        ease: 'anticipate',
        duration: .25
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
