export interface IValidator {
  postcode: (postcode: string) => boolean;
  allChar: (char: string) => boolean;
  mobilePhone: (phone: string) => boolean;
  emailAddress: (email: string) => boolean;
}
