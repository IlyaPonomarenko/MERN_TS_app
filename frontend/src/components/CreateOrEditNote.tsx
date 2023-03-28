import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import InputField from './InputField'

interface AddEditNoteDialogProps {
  noteToEdit?: Note
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const CreateOrEditNote = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  })

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
      } else {
        noteResponse = await NotesApi.createNote(input)
      }
      onNoteSaved(noteResponse)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit note' : 'Add note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />
          <InputField
            name="text"
            label="Text "
            as="textarea"
            placeholder="Text"
            rows={5}
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateOrEditNote
