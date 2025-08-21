import negativeSVG from "@assets/icons/negative.svg";
import { currency } from "../utils/currency-from-number.util";
import { useSelectedClientsStore } from "../store/selectedClientsStore";


const edit = () => {
  const { selectedClients, remove, clearAll } = useSelectedClientsStore()

  return (
    <section className="max-w-7xl mx-auto px-8 pb-8 md:px-14 pt-7 box-content fade-in">
      <h2 className="fw-700 text-[22px] mb-3">
        Clientes selecionados:
      </h2>
      
      { selectedClients.length > 0 && <>
        <div className="mt-2">
          <ul className="
            grid grid-cols-1 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            gap-5 fade-in">
            { selectedClients.map((client) => (
              <li className="bg-white rounded-sm p-4 card-shadow">
                <p className="text-base text-center fw-700">
                  { client.name.slice(0, 20) } { client.name.length <= 20 ? '' : '...' }
                </p>

                <p className="text-sm fw-400 mt-2 text-center">
                  Salário: { currency.format(client.salary) }
                </p>

                <p className="text-sm fw-400 mt-2 text-center">
                  Empresa: { currency.format(client.companyValuation) }
                </p>

                <div className="flex justify-end align-center w-full mt-4">
                  <button className="transparent-btn p-2"
                    onClick={() => remove(client)}
                    title="Remover cliente"
                  >
                    <img src={ negativeSVG } alt="Remover"/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      
        <button onClick={() => clearAll()}
          className="
            py-3 my-5 w-full
            rounded-sm bg-transparent
            brand-border border-2 border-solid
            text-center text-sm/4 fw-700 brand-text
            cursor-pointer"
        >
          Limpar clientes selecionados
        </button>
      </>} 

      { !selectedClients.length && (
        <p className='fw-400 text-lg text-center w-full my-20 fade-in'>Selecione clientes e eles aparecerão aqui</p>
      )}
    </section>
  );
}

export default edit
