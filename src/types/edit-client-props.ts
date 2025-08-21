import type { User } from "./user-type"

export type EditClientProps = {
    handleCloseModal: (changed?: boolean | undefined) => void,
    user: User
}