// Icons
import windIcon from '@/assets/icons/wind/wind.svg'
import temperatureIcon from '@/assets/icons/temperature/temperature.svg'
import cloudsIcon from '@/assets/icons/clouds/clouds.svg'
import pilotIcon from '@/assets/icons/pilot/pilot.svg'
import takeoffIcon from '@/assets/icons/takeoff/takeoff.svg'
import landingIcon from '@/assets/icons/landing/landing.svg'
import timeIcon from '@/assets/icons/time/time.svg'
import uncheckedIcon from '@/assets/icons/check/unchecked.svg'
import checkedIcon from '@/assets/icons/check/checked.svg'
import droneIcon from '@/assets/icons/drone/drone.svg'
import registrationIcon from '@/assets/icons/registration/registration.svg'
import batteryIcon from '@/assets/icons/battery/battery.svg'
import tfrIcon from '@/assets/icons/tfr/tfr.svg'
import upArrowIcon from '@/assets/icons/arrows/up-arrow.svg'
import downArrowIcon from '@/assets/icons/arrows/down-arrow.svg'

// Types
import { MotionProps } from 'motion/react'
import * as AppTypes from '@/context/App/types'

export const setFlightTimes = (flight: AppTypes.FlightInterface) => {
  const takeoffDate = new Date(flight.takeOffDateTime)
  const landingDate = new Date(flight.landingDateTime)
  
  const duration = `${ Math.ceil((landingDate.getTime() - takeoffDate.getTime()) / (1000 * 60)) } mins.`

  const formatLocalTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${ hours }:${ minutes }`
  }

  return { 
    takeoffTime: formatLocalTime(takeoffDate),
    landingTime: formatLocalTime(landingDate),
    duration 
  }
}

export const iconMap = new Map<string, string>([
  ['wind', windIcon],
  ['temperature', temperatureIcon],
  ['clouds', cloudsIcon],
  ['pilot', pilotIcon],
  ['takeoff', takeoffIcon],
  ['landing', landingIcon],
  ['time', timeIcon],
  ['not passed', uncheckedIcon],
  ['passed', checkedIcon],
  ['drone', droneIcon],
  ['registration', registrationIcon],
  ['battery', batteryIcon],
  ['tfr', tfrIcon],
  ['upArrow', upArrowIcon],
  ['downArrow', downArrowIcon]
])

const slideInLeft: MotionProps = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const slideInRight: MotionProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const fadeInOut: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: {
    duration: 0.25,
    ease: 'easeOut'
    } 
  },
  transition: {
    duration: 0.25,
    ease: 'easeIn'
  }
}

export const motionProps = {
  slideInLeft,
  slideInRight,
  fadeInOut
}