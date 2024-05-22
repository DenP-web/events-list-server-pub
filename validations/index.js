import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect mail format").isEmail(),
  body("fullName", "This field can't be empty.").isLength({ min: 3 }),
  body("dateOfBirth", "This field can't be empty.").isLength({ min: 3 }),
  body("hearAbout", "Choose one of the following options").isLength({ min: 3 }),
];
