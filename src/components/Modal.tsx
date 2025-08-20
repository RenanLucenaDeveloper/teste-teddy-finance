import type { ModalProps } from "../types/modal-types";
import { useRef } from "react";
import closeSVG from "@assets/icons/close.svg"

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

	if (!isOpen) return null;
  return (
    <div
		  className="fixed inset-0 z-999 flex items-center justify-center bg-black/50"
		  onClick={handleClickOutside}
		>
      <div
        className="relative w-full max-w-md p-5 app-bg rounded-sm"
        ref={modalRef}
      >
				<div className="flex justify-between items-center">
        	<h2 className="text-base fw-700 m-0">{title}</h2>

					<button 
					  title="Fechar modal" 
						className="transparent-btn"
						onClick={() => onClose()}>
						<img src={ closeSVG } alt="Fechar"/>
					</button>
				</div>

        {children}
      </div>
    </div>
  );
}