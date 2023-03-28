import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import * as notes_api from '../network/notes_api'
import CreateOrEditNote from './CreateOrEditNote'
import LogIn from './LogIn'
import Note from './Note'
import SignUp from './SignUp'

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [notesLoadingError, setShowNotesLoadingError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await notes_api.getAllNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
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
  const notesGrid = (
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map((note) => (
        <Col key={note._id}>
          <Note onDelete={deleteNote} note={note} onNoteClicked={(note) => setNoteToEdit(note)} />
        </Col>
      ))}
    </Row>
  )
  return (
    <Container>
      <Button className="mb-4" onClick={() => setShowModal(true)}>
        Add a note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {notesLoadingError && <p>Something went wrong. Refresh the page</p>}
      {!notesLoading && !notesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>No notes yet </p>}</>
      )}
      {showModal && (
        <CreateOrEditNote
          onDismiss={() => setShowModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowModal(false)
          }}
        />
      )}
      {noteToEdit && (
        <CreateOrEditNote
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              //Checks is the id of the updated Note is the same as existing Note
              //Puts an updated version in if true
              //Otherwise leaves the note untouched
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id ? updatedNote : existingNote
              )
            )
            setNoteToEdit(null)
          }}
        />
      )}
      {false && <SignUp onDismiss={()=>{}} onSignUpSuccess={()=>{}}></SignUp>}
      {false && <LogIn onDismiss={()=>{}} onLogInSuccess={()=>{}}></LogIn>}
    </Container>
  )
}

export default NotesList
