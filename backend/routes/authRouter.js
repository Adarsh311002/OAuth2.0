import express, { Router } from 'express'
import { googleLogin } from '../controllers/authController.js';

const router = Router();

router.get('/test', (req,res) => {
    res.send('Test Route')
})

router.get('/google', googleLogin)

export default router;