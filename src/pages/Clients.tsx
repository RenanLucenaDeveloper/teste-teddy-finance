import { useState } from "react";
import Modal from "../components/Modal";
import { itemsPerPageOptions } from "../utils/items-per-page-options.util";
import type { User } from "../types/user-type";
import plusSVG from "@assets/icons/plus.svg";
import editPNG from "@assets/icons/edit.png";
import deletePNG from "@assets/icons/delete.png";
import { currency } from "../utils/currency-from-number.util";
import Loading from "../components/Loading";
import Paginator from "../components/Paginator";
import type { getUsersDto } from "../dtos/get-users-dto";
import { useFetch } from "../hooks/useFetch";
import { useUpdateEffect } from "../hooks/useUpdateEffect";
import { authorizedHeader } from "../utils/authorized-header";
import { queryParams } from "../utils/query-params.util";
import ErrorPage from "./ErrorFallback";

const API_URL = import.meta.env.VITE_API_URL;

const Clients = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState('16');
  const [ModalOpen, setModalOpen] = useState(false);

  const { data, loading, error, refetch } = useFetch<getUsersDto>(
    `${ API_URL }/users${ queryParams({ page, limit: +itemsPerPage }) }`,
    {
      method: "GET",
      headers: authorizedHeader(),
    }
  );

  useUpdateEffect(() => {
    refetch({
      url: `${ API_URL }/users${ queryParams({ page, limit: +itemsPerPage }) }`
    });
  }, [page, itemsPerPage]);

  function handleCloseModal(changed?: boolean) {
    setModalOpen(false);
    if (changed) {
      
    }
  };

  function selectClient(client: User) {
    console.log(client)
  }

  return (
    <section className="max-w-7xl mx-auto px-8 md:px-14 pt-7 box-content fade-in">
      <div className="
        flex flex-col align-start justify-start
        md:flex-row md:align-center md:justify-between
        w-full gap-2 mb-5
      ">
          <p className="text-lg">
            <span className="fw-700">16</span> clientes encontrados:
          </p>
          
          <div className="flex align-center gap-2">
            <p className="text-lg">Clientes por página: </p>

            <select 
              onChange={(e) => setitemsPerPage(e.target.value)}
              value={ itemsPerPage } 
              name="itemsPerPage" id="itemsPerPage" className="rounded-sm px-3"
            >
              { itemsPerPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
      </div>

      <div className="mt-2">
        { error && <ErrorPage/> }
        { loading && <Loading/> }

        { data && <>
          <ul className="
            grid grid-cols-1 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            gap-5 fade-in">
            { data.clients.map((client) => (
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

                <div className="flex justify-between align-center w-full mt-4">
                  <button className="transparent-btn"
                    onClick={() => selectClient(client)}
                    title="Selecionar cliente"
                  >
                    <img src={ plusSVG } alt="Selecionar"/>
                  </button>

                  <button className="transparent-btn"
                    onClick={() => selectClient(client)}
                    title="Editar cliente"
                  >
                    <img src={ editPNG } alt="Editar"/>
                  </button>

                  <button className="transparent-btn"
                    onClick={() => selectClient(client)}
                    title="Excluir cliente"
                  >
                    <img src={ deletePNG } alt="Excluir"/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>}
      </div>

      <button onClick={() => setModalOpen(true)}
        className="
          py-3 my-5 w-full
          rounded-sm bg-transparent
          brand-border border-2 border-solid
          text-center text-sm/4 fw-700 brand-text
          cursor-pointer"
      >
        Criar cliente
      </button>

      { data && (
        <Paginator 
          actualPage={page} 
          setActualPage={setPage} 
          totalPages={data.totalPages}
        />
      )}

      <Modal isOpen={ModalOpen} title="Modal test" onClose={handleCloseModal}>
        <input type="text" className="w-full p-2 mb-4"/>
				
				<button onClick={() => handleCloseModal(true)} className="px-4 py-2">
					Salvar
				</button>
      </Modal>
    </section>
  );
}

export default Clients
