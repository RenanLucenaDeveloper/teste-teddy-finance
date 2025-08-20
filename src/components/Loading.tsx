import LoadingSVG from '@assets/icons/loading-component.svg'

const Loading = () => {
  return (
    <div className='flex align-center justify-center my-15 gap-5 fade-in'>
      <img src={ LoadingSVG } alt="Loading svg" className="animate-spin"/>
      <p className='fw-600 text-lg leading-none mt-5'>Carregando...</p>
    </div>
  )
}

export default Loading
