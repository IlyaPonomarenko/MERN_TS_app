import { Note } from '../models/note'
import { User } from '../models/user'

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const responce = await fetch(input, init)
  if (responce.ok) {
    return responce
  } else {
    const errorBody = await responce.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}
export const getLoggedInUser = async (): Promise<User> => {
  const responce = await fetchData('/api/users', { method: 'GET' })
  return responce.json()
}
export interface SignUpCred {
  username: string
  email: string
  password: string
}

export const signUp = async (credentials: SignUpCred): Promise<User> => {
  const responce = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  return responce.json()
}

export interface LogInCred {
  username: string
  password: string
}

export const logIn = async (credentials: LogInCred): Promise<User> => {
  const responce = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  return responce.json()
}

export const logOut = async () => {
  await fetchData('/api/users/logout', { method: 'POST' })
}

export const getAllNotes = async (): Promise<Note[]> => {
  const responce = await fetchData('/api/notes', { method: 'GET' })
  return responce.json()
}

export interface NoteInput {
  title: string
  text?: string
}
export const createNote = async (note: NoteInput): Promise<Note> => {
  const responce = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  return responce.json()
}
export const updateNote = async (noteId: string, note: NoteInput): Promise<Note> => {
  const responce = await fetchData(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
  return responce.json()
}
export const deleteNote = async (noteId: string) => {
  await fetchData(`/api/notes/${noteId}`, { method: 'DELETE' })
}
