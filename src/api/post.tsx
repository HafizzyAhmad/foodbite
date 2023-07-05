import HTTP from '../libs/http';
import { IPost, IPostByCoordinateRequest } from '../types/stores/donate';

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

  async getPostByCoordinate(data: IPostByCoordinateRequest): Promise<IPost[]> {
    const { centerLat, centerLong, distance } = data;
    const url = `/v1/food/donations/lat=${centerLat}&long=${centerLong}&distance=${distance}`;
    const res = await this.get(url);
    return res;
  }

  async getPostById(id: string): Promise<IPost> {
    const url = `/v1/food/donation/${id}`;
    const res = await this.get(url);
    return res;
  }
}

export default PostAPI;
