import { setFlightTimes, setLastName, motionProps, iconMap } from '../utils'

describe('setFlightTimes', () => {
  it('should return formatted takeoff and landing times and duration', () => {
    const flight = {
      parentId: 'p1',
      takeOffDateTime: '2025-07-28T12:00:00.000',
      landingDateTime: '2025-07-28T12:01:00.000',
      createdBy: 'user',
      createdAt: '2025-07-28T12:00:00.000',
      updatedBy: 'user',
      updatedAt: '2025-07-28T12:00:00.000',
      uuid: 'abc'
    }

    const { takeoffTime, landingTime, duration } = setFlightTimes(flight)

    expect(takeoffTime).toMatch(/^\d{2}:\d{2}$/)
    expect(landingTime).toMatch(/^\d{2}:\d{2}$/)
    expect(duration).toMatch(/^\d+ mins\.$/)
  })

  it('should calculate duration in minutes using Math.ceil', () => {
    const flight = {
      parentId: 'p1',
      takeOffDateTime: '2025-07-28T10:00:00.000',
      landingDateTime: '2025-07-28T10:05:30.000',
      createdBy: 'user',
      createdAt: '2025-07-28T10:00:00.000',
      updatedBy: 'user',
      updatedAt: '2025-07-28T10:00:00.000',
      uuid: 'abc'
    }

    const { duration } = setFlightTimes(flight)

    // 5 min 30 sec -> Math.ceil(5.5) = 6
    expect(duration).toBe('6 mins.')
  })

  it('should pad hours and minutes to two digits', () => {
    const flight = {
      parentId: 'p1',
      takeOffDateTime: '2025-07-28T09:05:00.000',
      landingDateTime: '2025-07-28T09:06:00.000',
      createdBy: 'user',
      createdAt: '2025-07-28T09:05:00.000',
      updatedBy: 'user',
      updatedAt: '2025-07-28T09:05:00.000',
      uuid: 'abc'
    }

    const { takeoffTime } = setFlightTimes(flight)

    expect(takeoffTime).toMatch(/^\d{2}:\d{2}$/)
  })
})

describe('setLastName', () => {
  it('should return last name from firstName.lastName email format', () => {
    const result = setLastName('john.doe@example.com')
    expect(result).toBe('doe')
  })

  it('should return name after first initial from firstInitiallastName email format', () => {
    const result = setLastName('jdoe@example.com')
    expect(result).toBe('doe')
  })

  it('should handle single-word username with no dot', () => {
    const result = setLastName('jsmith@example.com')
    expect(result).toBe('smith')
  })
})

describe('motionProps', () => {
  it('should export slideInLeft with initial x: -100', () => {
    expect((motionProps.slideInLeft.initial as { x: number }).x).toBe(-100)
  })

  it('should export slideInRight with initial x: 100', () => {
    expect((motionProps.slideInRight.initial as { x: number }).x).toBe(100)
  })

  it('should export fadeInOut with initial opacity: 0', () => {
    expect((motionProps.fadeInOut.initial as { opacity: number }).opacity).toBe(0)
  })
})

describe('iconMap', () => {
  it('should contain expected icon keys', () => {
    const expectedKeys = ['wind', 'temperature', 'clouds', 'pilot', 'takeoff', 'landing', 'time', 'not passed', 'passed', 'drone', 'registration', 'battery', 'tfr', 'upArrow', 'downArrow', 'pdf']

    for (const key of expectedKeys) {
      expect(iconMap.has(key)).toBe(true)
    }
  })

  it('should be a Map instance', () => {
    expect(iconMap).toBeInstanceOf(Map)
  })
})
