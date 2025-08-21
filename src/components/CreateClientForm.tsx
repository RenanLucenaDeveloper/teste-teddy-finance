import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Button from "./Button";
import type { CreateClientProps } from "../types/create-client-props";
import { useState } from "react";
import { authorizedHeader } from "../utils/authorized-header";

const API_URL = import.meta.env.VITE_API_URL;

const numberZod = z
    .number("Informe um valor válido")
		.refine((val) => !isNaN(val), "Informe um valor válido")
    .min(0.01, "O valor deve ser maior que zero")

const schema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .max(50, "O valor máximo é 50 caracteres"),
  salary: numberZod,
  companyValuation: numberZod
});
type FormData = z.infer<typeof schema>;


const CreateClientForm = ({ handleCloseModal }: CreateClientProps) => {
  const [isSubmitting, setSubmitting] = useState(false)

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

	async function createUser(data: FormData) {
    try {
      setSubmitting(true)
      fetch( `${API_URL}/users`, { 
        method: 'POST',
        headers: authorizedHeader(),
        body: JSON.stringify(data)
      })
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
    <form onSubmit={handleSubmit(createUser)} className="fade-in flex flex-col gap-1">
      {/* Name */}
      <Input 
        id="name" 
        placeholder="Digite o nome:"
        className="mt-3"
        maxLength={ 50 }
        {...register('name')}
      />
      { errors && (
        <span className="danger-text text-sm block">
          { errors.name?.message }
        </span>
      )}

      {/* Salary */}
      <Input 
        id="salary" 
        type="number"
        placeholder="Digite o salário:"
        {...register('salary', { valueAsNumber: true })}
      />
      { errors && (
        <span className="danger-text text-sm block">
          { errors.salary?.message }
        </span>
      )}

      {/* CompanyValuation */}
      <Input 
        id="companyValuation" 
        type="number"
        placeholder="Digite o valor da empresa:"
        {...register('companyValuation', { valueAsNumber: true })}
      />
      { errors && (
        <span className="danger-text text-sm block">
          { errors.companyValuation?.message }
        </span>
      )}

      <Button 
        type='submit' 
        className="mt-2 md:py-3 text-sm md:text-sm" 
        disabled={ !isValid || isSubmitting }
        loading={ isSubmitting }  
      >
          Criar cliente
      </Button>
    </form>
  );
}

export default CreateClientForm
