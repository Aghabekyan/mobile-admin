export function validatorErrorMessage(massageKey: string): IValidatorErrorMessage {
  return {
    [massageKey]: {
      valid: false,
    },
  };
}
