// Components
import * as Components from './components'

type FormBtnsProps = { onCancelBtnClick: React.MouseEventHandler<HTMLButtonElement>, size: 'btn-sm' | 'btn-md' | 'btn-lg' }

function FormBtns(props: FormBtnsProps) {

  return (
    <div className="flex gap-6 h-[44px] mt-6">
      <Components.CancelBtn 
        onClick={props.onCancelBtnClick}
        size={props.size} />
      <Components.ResetBtn size={props.size} />
      <Components.SaveBtn size={props.size} />
    </div>
  )
}

export default FormBtns