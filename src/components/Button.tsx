import SpinLoadingSVG from '@assets/icons/spin-loading.svg'

type props = { 
    children: React.ReactNode,
    className?: string,
    loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, disabled = false, loading = false, ...props }: props) => {
  return (
    <button 
      disabled={disabled}
      className={`
        rounded-sm border-0 brand-bg brand-hover 
        py-3 md:py-4 w-full relative 
        text-center text-lg md:text-2xl fw-700 oposite-text  
        cursor-pointer disabled:cursor-default disabled:opacity-60
        transition-opacity duration-300
        ${className}`} 
      { ...props }
    >
        { children }

        { loading && (
            <img src={SpinLoadingSVG} alt="carregando..." className='animate-spin absolute top-1/2 right-6 -translate-y-1/2'/> 
          )
        }
    </button>
  )
}

export default Button
