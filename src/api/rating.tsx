import HTTP from '../libs/http';
import {
  IPostRating,
  IRecommendedRating,
  ISubmitRating,
} from '../types/stores/rating';

class RatingAPI extends HTTP {
  /**
   * use this method to retrieve user info
   * @
   */
  async getRatingById(param: string) {
    // console.log('DATA: ', data);
    const url = `/v1/rating/ratings/userId=${param}`;
    const res = await this.get(url);
    return res;
  }

  async getRatingByPost(param: string) {
    const url = `/v1/rating/ratingsByPost/userId=${param}`;
    const res: IPostRating = await this.get(url);
    return res;
  }

  async submitRating(data: ISubmitRating) {
    const url = '/v1/rating/create';
    const res: ISubmitRating = await this.post(url, data);
    return res;
  }

  async getRecommendedRating() {
    const url = '/v1/rating/recommendedUserByRating';
    const res: IRecommendedRating = await this.get(url);
    return res;
  }
}

export default RatingAPI;
