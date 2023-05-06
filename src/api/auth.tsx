import HTTP from '../libs/http';
import { IAuthLoginRequest } from '../types/stores/app';

class AuthAPI extends HTTP {
  /**
   * use this method to retrieve user info
   * @
   */
  async login(data: IAuthLoginRequest) {
    // console.log('DATA: ', data);

    const url = '/v1/user/login';
    const res = await this.post(url, data);
    return res;
  }
}

export default AuthAPI;
