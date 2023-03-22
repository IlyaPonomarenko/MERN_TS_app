import Card from 'react-bootstrap/Card'
import "../styles/note.css"
import { Note as NoteModel } from '../models/note'

interface NoteProps {
  note: NoteModel
}

const Note = ({ note }: NoteProps) => {
  return (
    <>
      <Card className='noteCard'>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>

          <Card.Text className='cardText'>{note.text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Note
