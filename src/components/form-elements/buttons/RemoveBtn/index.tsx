function RemoveBtn({ onClick, visible }: { onClick: React.MouseEventHandler<HTMLButtonElement>, visible: boolean }) {
  if(!visible) return

  return (
    <button
      type="button"
      className="badge badge-sm badge-error font-[play] uppercase ml-auto rounded-sm shadow-xl hover:cursor-pointer"
      onClick={onClick}>
        Remove
    </button>
  )
}

export default RemoveBtn