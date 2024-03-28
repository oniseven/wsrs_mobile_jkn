import { CustomException } from "./CustomException";

export class CreatedException extends CustomException {
  constructor(message: string){
    super(message, 201)
  }
}