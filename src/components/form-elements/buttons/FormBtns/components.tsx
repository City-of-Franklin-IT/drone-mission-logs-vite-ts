import { useFormContext } from "react-hook-form"
import { useDisableBtn } from './hooks'

type BtnSizeType = 
  | 'btn-sm'
  | 'btn-md'
  | 'btn-lg'

export const CancelBtn = ({ onClick, size }: { onClick: React.MouseEventHandler<HTMLButtonElement>, size: BtnSizeType }) => {

  return (
    <button 
      type="button" 
      onClick={onClick}
      className={`flex-1 btn btn-error uppercase shadow-xl ${ size }`}>
        Cancel
    </button>
  )
}

export const ResetBtn = ({ size }: { size: BtnSizeType }) => {
  const { reset } = useFormContext()

  return (
    <button 
      type="button" 
      onClick={() => reset()}
      className={`flex-1 btn btn-warning btn-lg uppercase shadow-xl ${ size }`}>
        Reset
    </button>
  )
}

export const SaveBtn = ({ size }: { size: BtnSizeType }) => {
  const disabled = useDisableBtn()

  return (
    <button 
      type="submit"
      className={`flex-1 btn btn-success btn-lg uppercase shadow-xl ${ size }`}
      disabled={disabled}>
        Save
    </button>
  )
}