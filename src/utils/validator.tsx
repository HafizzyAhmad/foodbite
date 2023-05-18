import { IValidator } from '../types/utils/validator';

class Validator implements IValidator {
  /**
   * use this method to validate all number string provided in postcode textinput
   * @param     postcode    string      input insert by user
   * @returns boolean
   */
  public postcode(postcode: string): boolean {
    const isValid = /^[0-9]{5}/g.test(postcode);
    return isValid;
  }

  /**
   * use this method to validate all character provided in any textinput
   * @param     char        string      input insert by user
   * @returns boolean
   */
  public allChar(char: string): boolean {
    const isValid = /^[a-zA-Z]+/g.test(char);
    return isValid;
  }

  /**
   * use this method to validate all string provided in mobile number textinput
   * @param     phone       string      input insert by user
   * @returns boolean
   */
  public mobilePhone(phone: string): boolean {
    const isValid = /^[01]{2}[0-9]{8,9}/g.test(phone);
    return isValid;
  }

  public emailAddress(email: string): boolean {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    return isValid;
  }
}

export default new Validator();
