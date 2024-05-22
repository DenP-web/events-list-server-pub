import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req); // Переввірка на валідність по registerValidation

  if (!errors.isEmpty()) {
    const errObj = errors.array().reduce((acc, err) => {
      acc[err.path] = err.msg 
      return acc
    }, {})
    return res.status(400).json(errObj);
  }
  next()
};
