import { atom } from 'jotai'
import { Todo } from './models/todo'

export const userAtom = atom<any>({})
export const todosAtom = atom<Todo[]>([])
export const loginModalAtom = atom(false)
export const registerModalAtom = atom(false)
export const showDropdownListModal = atom(false)
