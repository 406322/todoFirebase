import { atom } from 'jotai'

// Create your atoms and derivatives
export const userAtom = atom<any>({})
export const todosAtom = atom([])
export const loginModalAtom = atom(false)
export const registerModalAtom = atom(false)