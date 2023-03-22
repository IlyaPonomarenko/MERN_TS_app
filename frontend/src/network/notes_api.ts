import { Note } from '../models/note'

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
