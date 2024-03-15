export class InvalidCommandException {
  message: string;
  status: number;
  className: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.className = "InvalidCommandException";
    this.message = message;
  }
}
