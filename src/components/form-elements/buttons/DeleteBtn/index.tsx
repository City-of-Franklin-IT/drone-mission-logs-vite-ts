import icon from '@/assets/icons/recycle/recycle.svg'
import styles from './DeleteBtn.module.css'

type DeleteBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean, children: React.ReactNode }

function DeleteBtn(props: DeleteBtnProps) {

  return (
    <button 
      type="button"
      className={styles.btn}
      disabled={props.disabled}
      onClick={props.onClick}>
        <div className="flex items-center gap-2">
          {props.children}
          <img src={icon} alt="recycle icon" className="w-4" />
        </div>
    </button>
  )
}

export default DeleteBtn