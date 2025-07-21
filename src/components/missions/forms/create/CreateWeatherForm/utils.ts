// Types
import * as AppTypes from '@/context/App/types'

export const visibilityTypeMap = new Map<AppTypes.VisibilityType, { value: string, label: string }>([
  ['clear', { value: 'clear', label: 'Clear Visibility - blue skies with no visible clouds' }],
  ['partly cloudy', { value: 'partly cloudy', label: 'Partly Cloudy - mix of clouds and clear sky' }],
  ['mostly cloudy', { value: 'mostly cloudy', label: 'Mostly Cloudy - clouds with some clear patches' }],
  ['overcast', { value: 'overcast', label: 'Overcast - complete cloud coverage' }]
])