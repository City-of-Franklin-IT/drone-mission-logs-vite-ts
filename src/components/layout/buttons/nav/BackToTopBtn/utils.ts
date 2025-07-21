export const handleClick = (topRef: React.RefObject<HTMLDivElement>): void => { // Handle button click
  if(topRef.current) {
    topRef.current.scrollIntoView({ behavior: 'smooth' })
  }
}