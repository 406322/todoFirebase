import { atom } from 'jotai'
import { Todo } from './models/todo'

export const userAtom = atom<any>({})
export const todosAtom = atom<Todo[]>([])
export const showLoginModalAtom = atom(false)
export const showRegisterModalAtom = atom(false)
export const showDropdownListModal = atom(false)
export const showResetPasswordAtom = atom(false)

export const loadingAtom = atom(true)