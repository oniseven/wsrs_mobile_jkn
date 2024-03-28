import express from 'express'

import AsyncHandler from '../middlewares/AsyncHandler'
import { JWTValidation } from '../middlewares/JWTValidation';

import CreateAntrean from '../controllers/antrean/CreateController';
import StatusAntrean from '../controllers/antrean/StatusController';
import SisaAntrean from '../controllers/antrean/SisaController';
import BatalAntrean from '../controllers/antrean/BatalController';
import CheckInAntrean from '../controllers/antrean/CheckInController';

const routes = express.Router();

// @desc    Route untuk membuat atau reservasi kunjungan antrean pasien ke poli
// @route   POST /antrean
routes.post('', JWTValidation, AsyncHandler(CreateAntrean))

// @desc    Route untuk melihat status antrean pasien yang telah terdaftar
// @route   POST /antrean/status
routes.post('/status', JWTValidation, AsyncHandler(StatusAntrean))

// @desc    Route untuk melihat sisa antrian pasien
// @route   POST /antrean/sisa
routes.post('/sisa', JWTValidation, AsyncHandler(SisaAntrean))

// @desc    Route untuk melakukan pembatalan terhadap reservasi kunjungan antrean pasien
// @route   POST /antrean/batal
routes.post('/batal', JWTValidation, AsyncHandler(BatalAntrean))

// @desc    Route untuk melakukan check in, sebagai penanda bahwa pasien telah siap atau berada di rumah sakit
// @route   POST /antrean/checkin
routes.post('/checkin', JWTValidation, AsyncHandler(CheckInAntrean))

export default routes