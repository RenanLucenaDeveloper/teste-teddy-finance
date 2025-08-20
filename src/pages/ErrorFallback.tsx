import errorSVG from '@assets/icons/error.svg'

const ErrorFallback = () => {
  return (
    <div className='flex align-center justify-center my-15 gap-5 fade-in'>
      <img src={ errorSVG } alt="Error svg"/>
      <p className='fw-600 text-lg leading-none mt-5'>Ocorreu um erro ao carregar, tente novamente mais tarde</p>
    </div>
  )
}

export default ErrorFallback
