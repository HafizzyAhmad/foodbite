import HTTP from '../libs/http';
import { IPost } from '../types/stores/donate';

class PostAPI extends HTTP {
  /**
   * use this method to retrieve user info
   * @
   */
  async postForm(data: IPost) {
    // console.log('DATA: ', data);

    const url = '/v1/food/donate';
    const res = await this.post(url, data);
    return res;
  }
}

export default PostAPI;
