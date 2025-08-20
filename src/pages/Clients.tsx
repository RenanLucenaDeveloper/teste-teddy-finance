import { useState } from "react";
import Modal from "../components/Modal";
import { itemsPerPageOptions } from "../utils/items-per-page-options.util";
import { useFetch } from "../hooks/useFetch";
import ErrorPage from "./ErrorPage";
import Loading from "../components/Loading";
import type { getUsersDto } from "../dtos/get-users-dto";
import Paginator from "../components/Paginator";
import { useUpdateEffect } from "../hooks/useUpdateEffect";
import { authorizedHeader } from "../utils/authorized-header";
import { queryParams } from "../utils/query-params.util";

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

  return (
    <section className="max-w-7xl mx-auto px-8 md:px-14 pt-7 box-content">
      <div className="
        flex flex-col align-start justify-start
        md:flex-row md:align-center md:justify-between
        w-full gap-2
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
          <ul>
            { data.clients.map((client) => (
              <li key={ client.id }>
                { client.name } | { client.id }
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
