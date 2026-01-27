// Components
import * as Components from './components'

type FormBtnsProps = { onCancelBtnClick: React.MouseEventHandler<HTMLButtonElement>, size: 'btn-sm' | 'btn-md' | 'btn-lg' }

function FormBtns(props: FormBtnsProps) {

  return (
    <div className="flex flex-col gap-4 mt-10 w-full md:flex-row md:gap-6">
      <Components.CancelBtn 
        onClick={props.onCancelBtnClick}
        size={props.size} />
      <Components.ResetBtn size={props.size} />
      <Components.SaveBtn size={props.size} />
    </div>
  )
}

export default FormBtns