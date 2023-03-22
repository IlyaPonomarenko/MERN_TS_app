import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
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
  }, [notes])

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default NotesList
