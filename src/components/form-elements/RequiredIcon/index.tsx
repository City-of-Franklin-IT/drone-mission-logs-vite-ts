function RequiredIcon({ required }: { required?: boolean }) {
  if(!required) return null

  return (
    <span className="text-error text-xs font-bold">*</span>
  )
}

export default RequiredIcon