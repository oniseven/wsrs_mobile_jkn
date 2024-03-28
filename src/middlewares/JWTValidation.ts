import { NextFunction, Request, Response } from "express"

import { TokenExpiredError, verify } from "jsonwebtoken"
import { IJwtPayload } from "../types/IJwtPayload"
import { UnauthorizeException } from "../exceptions/UnauthorizeException"

const SECRET = process.env.JWT_SECRET

export const JWTValidation = async (req: Request, res: Response, next: NextFunction) => {  
  try {
    const token = req.header('x-token')
    const username = req.header('x-username')

    if(!token || !username) throw new UnauthorizeException("Missing or Invalid Credential!")

    const payload = verify(token, String(SECRET)) as IJwtPayload

    if(username !== payload.username) throw new UnauthorizeException("Your credential is not match!")

    req.payload = payload

    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).noData(false, 'Credential is expired!')
    } else {
      next(error)
    }
  }
}