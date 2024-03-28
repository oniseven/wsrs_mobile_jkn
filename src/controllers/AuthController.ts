import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { User } from '../models/User'
import { authSchema } from '../validations/authSchema'
import { ClientException } from '../exceptions/ClientException'
import { UnauthorizeException } from '../exceptions/UnauthorizeException'

import { IJwtPayload } from '../types/IJwtPayload'

const LOGIN_ERROR_MESSAGE = 'Username Password tidak sesuai!'
const SECRET = process.env.JWT_SECRET
const EXPIRED = process.env.JWT_EXPIRED

const AuthController = async (req: Request, res: Response): Promise<Express.Response> => {
  const body = req.body
  const headers = req.headers

  const username = body.username || headers['x-username']
  const password = body.password || headers['x-password']

  // validate user input
  const { error, value: valid } = authSchema.validate({ username, password })
  if(error)
    throw new ClientException(error.details[0].message)

  // get user by username and check if user is exist or not
  const user = await User.findOne({
    where: {
      username: valid.username
    }
  })
  if(!user) throw new ClientException(LOGIN_ERROR_MESSAGE)

  // compare the user input password
  const isMatch = bcrypt.compare(valid.password, user.pwd)
  if(!isMatch) throw new ClientException(LOGIN_ERROR_MESSAGE)

  // check if user is active or not
  if(!user.is_active)
    throw new UnauthorizeException('User belum memiliki hak akses untuk fitur ini, silahkan menghubungi pihak rumah sakit')

  // create jwt payload
  const payload: IJwtPayload = {
    id: user.id,
    name: user.name,
    username: user.username,
    insurance_id: user.insurance_id
  }

  // create jwt token
  const token = jwt.sign(payload, String(SECRET), {
    expiresIn: EXPIRED
  })

  return res.withData({token})
}

export default AuthController
