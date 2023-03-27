import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import UserModel from '../data_models/user'
import bcrypt from 'bcrypt'

interface SingUpBody {
  username?: string
  email?: string
  password?: string
}
export const signUp: RequestHandler<unknown, unknown, SingUpBody, unknown> = async (
  req,
  res,
  next
) => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing')
    }
    const existingUserName = await UserModel.findOne({ username: username }).exec()
    if (existingUserName) {
      throw createHttpError(409, 'Username already taken')
    }
    const existingEmail = await UserModel.findOne({ email: email }).exec()
    if (existingEmail) {
      throw createHttpError(409, 'Email already taken')
    }

    //Hashing password and creating an entry
    const passwordHashed = await bcrypt.hash(passwordRaw, 10)
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    })
    
    //Storing session data
    req.session.userdId = newUser._id
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}
