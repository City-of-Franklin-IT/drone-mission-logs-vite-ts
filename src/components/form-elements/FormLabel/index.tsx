// Components
import RequiredIcon from "@/components/form-elements/RequiredIcon"
import FormError from "@/components/form-elements/FormError"

type FormLabelProps = { 
  name: string
  required?: boolean
  error?: string
  children: React.ReactNode 
}

function FormLabel(props: FormLabelProps) {

  return (
    <label data-testid="form-label" htmlFor={props.name} className="label text-neutral-content font-[Play] justify-between">
      <div className="flex items-center gap-1">
        {props.children}
        <RequiredIcon required={props.required} />
      </div>
      <FormError error={props.error} />
    </label>
  )
}

export default FormLabel