import {Response, Request, NextFunction} from 'express'
import { CustomException } from '../exceptions/CustomException'
import { IResponseMetadata } from '../types/IResponseMetadata'

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err)

  let response: IResponseMetadata = {
    metadata: {
      code: 500,
      message: "Server error, please try again later"
    }
  }

  if(!(err instanceof CustomException))
    return res.status(500).json(response)

  response.metadata.code = err.status
  response.metadata.message = err.message
  if(err.additionalInfo) response.info = err.additionalInfo

  return res.status(err.status).json(response)
}