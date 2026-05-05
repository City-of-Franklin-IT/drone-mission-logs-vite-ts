function FormError({ error }: { error: string | undefined }) {
  if(!error) return null

  return (
    <div className="font-[Jura] uppercase font-extrabold text-xs text-warning bg-warning-content px-1 text-center w-fit ml-auto">{error}</div>
  )
}

export default FormError