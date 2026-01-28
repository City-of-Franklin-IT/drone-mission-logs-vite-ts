function FormError({ error }: { error: string | undefined }) {
  if(!error) return null

  return (
      <div className="font-[jura] uppercase font-extrabold text-lg text-warning bg-warning-content p-1 text-center w-fit ml-auto">{error}</div>
  )
}

export default FormError