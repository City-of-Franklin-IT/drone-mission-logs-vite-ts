import styles from '@/components/form-elements/Forms.module.css'

// Types
import { Path } from 'react-hook-form'
import * as AppTypes from '@/context/App/types'

// Components
import RequiredIcon from '../RequiredIcon'

type FormLabelProps = { name: Path<AppTypes.MissionCreateInterface> | Path<AppTypes.PersonnelRosterCreateInterface> | Path<AppTypes.VehicleRosterCreateInterface> | Path<AppTypes.BatteryRosterCreateInterface>, required?: boolean, children: React.ReactNode }

function FormLabel(props: FormLabelProps) {
  
  return (
    <label data-testid="form-label" htmlFor={props.name} className={styles.label}>{props.children}{props.required && <RequiredIcon />}</label>
  )
}

export default FormLabel