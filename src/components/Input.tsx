import inputSizes from "../utils/input-sizes.util"

type props = { 
    id: string,
    inputSize?: 'lg' | 'sm',
    className?: string,
    placeholder?: string,
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ id, inputSize = 'sm', className, placeholder, type = 'text', readOnly = false, ...props }: props) => {
  return (
    <>
        <label className="sr-only" htmlFor={ id }>
          { placeholder }
        </label>
        <input 
            className={ `
                w-full primary-text
                rounded-sm border-2 focus:border-current
                ${ inputSize ? inputSizes[inputSize] : '' }
                ${ className }
            ` } 
            type={ type } autoComplete="on"
            id={ id } name={ id } readOnly={ readOnly }
            placeholder={ placeholder }
            { ...props }/>
    </>
  )
}

export default Input
