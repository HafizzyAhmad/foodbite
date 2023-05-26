import { IFormatter } from '../types/utils/formatter';

class Formatter implements IFormatter {
  /**
   * use this method to validate all number string provided in postcode textinput
   * @param     postcode    string      input insert by user
   * @returns boolean
   */
  public dateTime(datetime: string): string {
    const date = new Date(datetime); // The date you want to format

    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      date,
    );
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, '0');
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    const formattedDateTime = `${day} ${month} ${year}, ${hour}:${minute} ${amPm}`;

    return formattedDateTime;
  }
}

export default new Formatter();
