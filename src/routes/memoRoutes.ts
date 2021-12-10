import {
  createMemo,
  deleteMemo,
  getMemo,
  updateMemo,
} from '../controllers/memo.controller'
import express from 'express'
import { validateMemo } from '../services/validation'

const router = express.Router()

router.route('/').post(validateMemo(), createMemo)
router.route('/:id').get(getMemo)
router.route('/:id').delete(deleteMemo)
router.route('/:id').put(validateMemo(), updateMemo)

export default router
