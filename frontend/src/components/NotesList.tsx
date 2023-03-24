import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import * as notes_api from '../network/notes_api'
import CreateOrEditNote from './CreateOrEditNote'
import Note from './Note'

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [setNotesLoadingError, setShowNotesLoadingError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await notes_api.getAllNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  const deleteNote = async (note: NoteModel) => {
    try {
      await notes_api.deleteNote(note._id)
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Container>
      <Button className="mb-4" onClick={() => setShowModal(true)}>
        Add a note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note onDelete={deleteNote} note={note} onNoteClicked={(note) => setNoteToEdit(note)} />
          </Col>
        ))}
      </Row>
      {showModal && (
        <CreateOrEditNote
          onDismiss={() => setShowModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowModal(false)
          }}
        />
      )}
      {noteToEdit && 
        <CreateOrEditNote
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              //Checks is the id of the updated Note is the same as existing Note
              //Puts an updated version in if true
              //Otherwise leaves the note untouched
              notes.map((existingNote) => existingNote._id === updatedNote._id ? updatedNote : existingNote))
            setNoteToEdit(null)
          }}
        />
      }
    </Container>
  )
}

export default NotesList
