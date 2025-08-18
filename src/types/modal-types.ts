import { type ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: (changed?: boolean) => void;
};