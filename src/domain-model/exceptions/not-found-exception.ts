export class NotFoundException {
  message: string;
  status: number;
  className: string;

  constructor(message: string) {
    this.message = message;
    this.status = 404;
    this.className = "NotFoundException";
  }
}
