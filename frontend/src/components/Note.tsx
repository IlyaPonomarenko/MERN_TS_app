import Card from 'react-bootstrap/Card'
import '../styles/note.css'
import { Note as NoteModel } from '../models/note'
import { formatDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'

interface NoteProps {
  note: NoteModel
  onNoteClicked: (note: NoteModel) => void
  onDelete: (note: NoteModel) => void
}

const Note = ({ note, onNoteClicked, onDelete }: NoteProps) => {
  let createdUpdatedText: string
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`
  } else {
    createdUpdatedText = `Created: ${formatDate(note.createdAt)}`
  }
  return (
    <>
      <Card className="noteCard" onClick={() => onNoteClicked(note)}>
        <Card.Body className="cardBody">
          <Card.Title className="flexCenter">
            {note.title}
            <MdDelete
              className="text-muted ms-auto"
              onClick={(e) => {
                onDelete(note)
                e.stopPropagation()
              }}
            />
          </Card.Title>

          <Card.Text className="cardText">{note.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card>
    </>
  )
}

export default Note
