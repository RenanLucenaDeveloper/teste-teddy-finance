import type { User } from "../types/user-type"

export type getUsersDto = {
    clients: User[],
    totalPages: number,
    currentPage: number
}