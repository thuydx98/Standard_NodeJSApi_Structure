import express from 'express'
import {userRouter} from './user.router'

export const router = express.Router();

router.use('/users', userRouter);