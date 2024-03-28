import { CustomException } from "./CustomException";

export class UnauthorizeException extends CustomException {
  constructor(message: string = "Unauthorize User!"){
    super(message, 401)
  }
}