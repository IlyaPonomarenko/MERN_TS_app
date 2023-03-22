import Card from 'react-bootstrap/Card'
import '../styles/note.css'
import { Note as NoteModel } from '../models/note'
import { formatDate } from '../utils/formatDate'

interface NoteProps {
  note: NoteModel
}

const Note = ({ note }: NoteProps) => {
  let createdUpdatedText: string
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`
  } else {
    createdUpdatedText = `Created: ${formatDate(note.createdAt)}`
  }
  return (
    <>
      <Card className="noteCard">
        <Card.Body className="cardBody">
          <Card.Title>{note.title}</Card.Title>

          <Card.Text className="cardText">{note.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card>
    </>
  )
}

export default Note
