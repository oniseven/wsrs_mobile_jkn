import express from 'express'

import AsyncHandler from '../middlewares/AsyncHandler'
import { JWTValidation } from '../middlewares/JWTValidation';

import AmbilAntreanFarmasi from '../controllers/farmasi/AmbilAntreanController';
import StatusAntreanFarmasi from '../controllers/farmasi/StatusAntreanController';

const routes = express.Router();

// @desc    Route untuk membuat atau reservasi kunjungan antrean pasien ke poli
// @route   POST /farmasi
routes.post('', JWTValidation, AsyncHandler(AmbilAntreanFarmasi))

// @desc    Route untuk melihat status antrean pasien yang telah terdaftar
// @route   POST /farmasi/status
routes.post('/status', JWTValidation, AsyncHandler(StatusAntreanFarmasi))

export default routes