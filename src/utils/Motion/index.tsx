import { motion } from 'motion/react'
import { motionProps } from '@/components/missions/tables/MissionsTable/utils'

type AnimationType = keyof typeof motionProps

interface MotionComponentProps {
  animation: AnimationType
  children: React.ReactNode
}

function Motion({ animation, children }: MotionComponentProps) {
  return (
    <motion.div {...motionProps[animation]}>
      {children}
    </motion.div>
  )
}

export default Motion
