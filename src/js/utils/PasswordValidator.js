import PasswordValidator from 'password-validator';
import InvalidPasswordError from '@/js/errors/InvalidPasswordError';

const PASSWORD_LENGTH_MESSAGE = "Password should be between 8-30 characters";
const PASSWORD_UPPERCASE_MESSAGE = "Password should contains atleast 1 uppercase english letter";
const PASSWORD_LOWERCASE_MESSAGE = "Password should contains atleast 1 lowercase english letter";
const PASSWORD_DIGITS_MESSAGE = "Password should contains atleast 1 digit";
const PASSWORD_SYMBOLS_MESSAGE = "Password should contains atleast 1 special symbol";

const validator = new PasswordValidator();

export function validatePassword(password) {
  validator
  .is().min(8, PASSWORD_LENGTH_MESSAGE)
  .is().max(30, PASSWORD_LENGTH_MESSAGE)
  .has().uppercase(1, PASSWORD_UPPERCASE_MESSAGE)
  .has().lowercase(1, PASSWORD_LOWERCASE_MESSAGE)
  .has().digits(1, PASSWORD_DIGITS_MESSAGE)
  .has().symbols(1, PASSWORD_SYMBOLS_MESSAGE)
  .has().not().spaces();

  let message;
  message = validator.validate(password, { details: true })?.message;

  if (!message) {
    const ABCD_SEQUENCE = "abcdefghijklmnopqrstuvwxyz";
    const QWERTY_SEQUENCE = "qwertyuiop";
    const ILLEGAL_DIGITS_SEQUENCE = "1234567890";
    const ILLEGAL_LEADING_ZERO_DIGITS_SEQUENCE = "0123456789";

    try {
      validateForIllegalSequence(password, ABCD_SEQUENCE, "ABCD...");
      validateForIllegalSequence(password, QWERTY_SEQUENCE, "QWERTY...");
      validateForIllegalSequence(password, ILLEGAL_DIGITS_SEQUENCE);
      validateForIllegalSequence(password, ILLEGAL_LEADING_ZERO_DIGITS_SEQUENCE);
    } catch(error) {
      if (error instanceof InvalidPasswordError) {
        message = error.message;
      }
    }
  }

  return message;
}

function validateForIllegalSequence(password, sequence, message = sequence) {
  for (let i = sequence.length - 1; i > 3; i--) {
    const substring = sequence.substring(0, i);
    if (password.toLowerCase().includes(substring)) {
      throw new InvalidPasswordError(formatPasswordSequenceMessage(message));
    }
  }
}

function formatPasswordSequenceMessage(sequenceStr) {
  return `Password should not contains more than 3 ${sequenceStr} sequence characters`;
}