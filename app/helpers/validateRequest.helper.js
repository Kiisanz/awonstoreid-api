import validate from "../utils/Validation.util.js";
import { ValidationError } from "./Erorrs.Helper.js";

function validateRequest(fields, body, minLength, enums) {
  const validationErrors = validate(fields, body, minLength, enums);
  if (validationErrors.length > 0) {
    throw new ValidationError("Validation failed", validationErrors);
  }
}

export default validateRequest;
