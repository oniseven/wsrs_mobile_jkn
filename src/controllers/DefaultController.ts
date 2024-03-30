import {Request, Response} from 'express'
import { User } from '../models/User'

const DefaultController = async (req: Request, res: Response): Promise<Express.Response> => {
  const user = await User.findOne({
    where: {
      id: 1
    }
  })

  if(!user) return res.noData(404, 'No User Found')

  return res.withData(user)
}

export default DefaultController