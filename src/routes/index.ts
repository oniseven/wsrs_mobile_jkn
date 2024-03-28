import express, {Request, Response} from 'express'

import AsyncHandler from '../middlewares/AsyncHandler';
import AuthController from '../controllers/AuthController';
import RouterAntrean from './antrean.route'
import RouterOperasi from './operasi.route'
import RouterFarmasi from './farmasi.route'

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Well its up and running!')
})

routes.get('/auth', AsyncHandler(AuthController))

// @desc    Router Antrean
// @route   POST /antrean
routes.use('/antrean', RouterAntrean)

// @desc    Router Operasi
// @route   POST /operasi
routes.use('/operasi', RouterOperasi)

// @desc    Router Farmasi
// @route   POST /farmasi
routes.use('/farmasi', RouterFarmasi)

export default routes