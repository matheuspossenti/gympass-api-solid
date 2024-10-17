export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validate until 20 minutes after its creation',
    )
  }
}
