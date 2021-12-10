import { Request, Response } from 'express'
import { DeepPartial, getConnection } from 'typeorm'
import { CustomRequest } from '../MyContext'
import { Memo } from './../entity/Memo'
import { body, validationResult } from 'express-validator'

const createMemo = async (
  req: CustomRequest<DeepPartial<Memo>>,
  res: Response
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
    const memo = await Memo.create(req.body).save()
    res.status(200).json(memo)
  } catch (err) {
    res.status(404).json(err.message)
  }
}

const getMemo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    const memo = await Memo.findOne(id)
    if (memo) {
      res.status(200).json(memo)
    } else {
      res.status(404).json({ message: 'Memo does not exist' })
    }
  } catch (err) {
    res.status(404).json(err.message)
  }
}

const deleteMemo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const memo = await Memo.findOne(id)
    if (memo) {
      await Memo.delete({ id: id })
      res.status(200).json({ message: 'deleted' })
    } else {
      res.status(404).json({ message: 'Memo does not exist' })
    }
  } catch (err) {
    res.status(404).json(err.message)
  }
}

const updateMemo = async (
  req: CustomRequest<DeepPartial<Memo>>,
  res: Response
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }

    const { text, title, author } = req.body
    const id = parseInt(req.params.id)
    const memo = await Memo.findOne(id)
    if (memo) {
      const updateMemo = await await getConnection()
        .createQueryBuilder()
        .update(Memo)
        .set({ text, title, author })
        .where('id = :id', { id: id })
        .returning('*')
        .execute()

      res.status(200).json(updateMemo.raw[0])
    } else {
      res.status(404).json({ message: 'Post does not exist' })
    }
  } catch (err) {
    res.status(404).json(err.message)
  }
}

export { createMemo, deleteMemo, getMemo, updateMemo }
