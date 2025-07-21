import { Link } from 'react-router'

function BackToHomeBtn() {

  return (
    <Link
      to={'/missions'}
      className="text-neutral-content font-[play] font-semibold uppercase text-center py-2 px-3 m-auto w-fit border-2 border-neutral-content rounded hover:text-neutral hover:border-neutral">
        Back To Home
    </Link>
  )
}

export default BackToHomeBtn