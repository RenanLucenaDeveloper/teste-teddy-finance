import { useState } from "react";
import Modal from "../components/Modal";


const Clients = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2"]);

  const handleClose = (changed?: boolean) => {
    setOpen(false);
    if (changed) {
      setItems((prev) => [...prev, `Novo item ${prev.length + 1}`]);
    }
  };

  return (
    <div className="p-6">
      <button onClick={() => setOpen(true)} className="px-4 py-2">
        Abrir Modal
      </button>

      <ul className="mt-4">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <Modal isOpen={open} title="Modal test" onClose={handleClose}>
        <input type="text" className="w-full p-2 mb-4"/>

				<button onClick={() => handleClose()} className="px-4 py-2">
					Cancelar
				</button>
				
				<button onClick={() => handleClose(true)} className="px-4 py-2">
					Salvar
				</button>
      </Modal>
    </div>
  );
}

export default Clients
