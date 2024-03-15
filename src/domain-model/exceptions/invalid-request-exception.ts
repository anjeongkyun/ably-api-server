export class InvalidRequestException {
  message: string;
  status: number;
  className: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
    this.className = "InvalidRequestException";
  }
}
