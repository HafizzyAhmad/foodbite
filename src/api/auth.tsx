import HTTP from '../libs/http';
import { IAuthLoginRequest, IUserUpdateProfile } from '../types/stores/app';

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

  /**
   * use this method to update user info
   */
  async updateProfile(data: IUserUpdateProfile, id: string) {
    const url = `/v1/user/profile/${id}`;
    const res = await this.put(url, data);
    return res;
  }

  /**
   * use this method to register user info
   * @
   */
  async register(data: IAuthLoginRequest) {
    const url = '/v1/user/register';
    const res = await this.post(url, data);
    return res;
  }
}

export default AuthAPI;
