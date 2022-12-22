import * as authController from '../controllers/authController.js'
import express from 'express'

const router = express.Router();

router.post('/signup', authController.signup);

export default router;