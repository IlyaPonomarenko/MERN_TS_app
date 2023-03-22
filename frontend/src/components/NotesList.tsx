import { useEffect, useState } from 'react'
import { Note as NoteModel } from '../models/note'
import Note from './Note'

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/notes', {
          method: 'GET',
        })
        const notes = await responce.json()
        setNotes(notes)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return <div>
    {notes.map((note)=>(
        <Note note={note} key={note._id}/>
    ))}
    </div>
}

export default NotesList
