import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as notes_api from '../network/notes_api'
interface CreateNoteProps {
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}
const CreateNote = ({ onDismiss, onNoteSaved }: CreateNoteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>()
  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponce = await notes_api.createNote(input)
      onNoteSaved(noteResponce)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title} //If the title error is undefiend = false, if contains error = true
              {...register('title', { required: 'Required field' })}
            />
            <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" {...register('text')} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNote
