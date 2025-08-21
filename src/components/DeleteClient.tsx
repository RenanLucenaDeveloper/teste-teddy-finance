import Button from "./Button";
import type { DeleteClientProps } from "../types/delete-client-props";
import { useState } from "react";
import { authorizedHeader } from "../utils/authorized-header";


const API_URL = import.meta.env.VITE_API_URL;

const DeleteClient = ({ handleCloseModal, userId, userName }: DeleteClientProps) => {
  const [isSubmitting, setSubmitting] = useState(false)

	async function deleteUser() {
    try {
      setSubmitting(true)
      fetch(
        `${API_URL}/users/${ userId }`,
        { 
          method: 'DELETE',
          headers: authorizedHeader(),
        }
      )
    }
    catch(error) {
      console.log(error)
    }
    finally {
      setSubmitting(false)
      handleCloseModal(true)
    }
  };

  return (
    <div className="fade-in">
      <p className="text-base py-4">
        Você está prestes a excluir o cliente: <span className="fw-700">{ userName }</span>
      </p>

      <Button 
        className="md:py-2 text-sm md:text-sm" 
        disabled={ isSubmitting } loading={ isSubmitting } 
        onClick={() => deleteUser()} 
      >
        Excluir cliente
      </Button>
    </div>
  );
}

export default DeleteClient
