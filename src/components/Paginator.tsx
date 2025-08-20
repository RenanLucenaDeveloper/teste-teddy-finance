import { generateArrayFromNumber } from "../utils/generate-array-from-number.util";
import type { PaginatorProps } from "../types/paginator-props";
import paginatorButtonClasses from "../utils/paginator-button-classes.util"


const Paginator = ({ totalPages, actualPage, setActualPage } : PaginatorProps) => {
  const buttonsArray = generateArrayFromNumber(totalPages)
  

  if(totalPages > 1) return (
    <div className="flex items-center justify-center gap-2">
      { buttonsArray.map((page) => (
        <button 
          className={`
						rounded-sm border-0 px-3 py-2 
						transition-opacity duration-300
						text-center text-sm fw-700  
						cursor-pointer
            ${actualPage === page ? 
							paginatorButtonClasses.active : 
							paginatorButtonClasses.inactive
						}  
          `}
          key={page} 
          onClick={() => setActualPage(page)}
        >
          { page }
        </button>
      ))}
    </div>
  )

  return <></>
}

export default Paginator