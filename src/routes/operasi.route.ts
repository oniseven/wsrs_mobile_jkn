import express from 'express'

import AsyncHandler from '../middlewares/AsyncHandler'
import { JWTValidation } from '../middlewares/JWTValidation';

import OperasiPeserta from '../controllers/operasi/PesertaController';
import OperasiRumahSakit from '../controllers/operasi/RumahSakitController';

const routes = express.Router();

// @desc    Route untuk menampilkan list jadwal operasi di rumah sakit
// @route   POST /rs
routes.post('/rs', JWTValidation, AsyncHandler(OperasiRumahSakit))

// @desc    Route untuk menampilkan list jadwal operasi pasien / peserta mobile jkn
// @route   POST /peserta
routes.post('/peserta', JWTValidation, AsyncHandler(OperasiPeserta))

export default routes