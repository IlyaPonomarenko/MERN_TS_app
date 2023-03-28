import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { LogInCred } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Button, Form, Modal } from 'react-bootstrap'
import InputField from './InputField'
import '../styles/button.css'

interface LoginProps {
  onDismiss: () => void
  onLogInSuccess: (user: User) => void
}

const LogIn = ({ onDismiss, onLogInSuccess }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInCred>()

  const onSubmit = async (credentials: LogInCred) => {
    try {
      const user = await NotesApi.logIn(credentials)
      onLogInSuccess(user)
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="username"
            label="Username here:"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <InputField
            name="password"
            label="Password here:"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting} className="width">
            LogIn
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogIn
