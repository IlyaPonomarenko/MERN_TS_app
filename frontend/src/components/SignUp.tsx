import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { SignUpCred } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Button, Form, Modal } from 'react-bootstrap'
import InputField from './InputField'
import "../styles/button.css"

interface SignUpProps {
  onDismiss: () => void
  onSignUpSuccess: (user: User) => void
}

const SignUp = ({ onDismiss, onSignUpSuccess }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCred>()

  const onSubmit = async (credentials: SignUpCred) => {
    try {
      const newUser = await NotesApi.signUp(credentials)
      onSignUpSuccess(newUser)
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Sign Up</Modal.Title>
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
            name="email"
            label="Email here:"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
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
          <Button type="submit" disabled={isSubmitting} className="width">Register</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUp
