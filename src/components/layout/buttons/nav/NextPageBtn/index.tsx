import icon from '@/assets/icons/next/next.svg'

type NextPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function NextPageBtn(props: NextPageBtnProps) {

  return (
    <button 
      data-testid="next-page-btn"
      type="button"
      onClick={props.onClick}
      className="btn btn-neutral btn-square hover:cursor-pointer"
      disabled={props.disabled}>
        <img src={icon} className="w-4 lg:w-6" />
    </button>
  )
}

export default NextPageBtn