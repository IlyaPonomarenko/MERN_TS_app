import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import * as notes_api from '../network/notes_api'
import CreateNote from './CreateNote'
import Note from './Note'

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showModal, setShowModal] = useState(false)

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

  return (
    <Container>
      <Button onClick={() => setShowModal(true)}>Add a note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
      {showModal && (
        <CreateNote
          onDismiss={() => setShowModal(false)}
          onNoteSaved={() => {
            //setNotes({...notes}) - Expoleds for some reason
            setShowModal(false)
          }}
        />
      )}
    </Container>
  )
}

export default NotesList
