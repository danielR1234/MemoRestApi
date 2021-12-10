import { body } from 'express-validator'

export const validateMemo = () => {
  return [
    body('text', 'Text is to short').exists().isLength({ min: 5 }),
    body('title', 'title is to short').exists().isLength({ min: 5 }),
    body('author', 'That is not your real name :D')
      .exists()
      .isLength({ min: 2 }),
  ]
}
