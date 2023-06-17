import HTTP from '../libs/http';
import { IPostRating } from '../types/stores/rating';

class RatingAPI extends HTTP {
  /**
   * use this method to retrieve user info
   * @
   */
  async getRatingById(param: string) {
    // console.log('DATA: ', data);
    const url = `v1/rating/ratings/userId=${param}`;
    const res = await this.get(url);
    return res;
  }

  async getRatingByPost(param: string) {
    const url = `v1/rating/ratingsByPost/userId=${param}`;
    const res: IPostRating = await this.get(url);
    return res;
  }
}

export default RatingAPI;
