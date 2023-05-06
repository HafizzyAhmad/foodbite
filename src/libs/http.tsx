import axios, { AxiosError, AxiosInstance } from 'axios';
import URL from '../constants/url';
import store from '../utils/store';
import { ReducerActionType } from '../types/stores/app';

class HTTP {
  token: string;
  instance: AxiosInstance = axios.create({
    baseURL: URL.API,
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
  });

  constructor(token: string) {
    this.token = token;

    // important! assign bearer token here
    // this.instance.defaults.headers.common.Authorization = `Bearer 123`; // uncomment here to test scenario 401
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    // important! assign receptor response handler here
    this.instance.interceptors.response.use(
      this.responseSuccessInterceptorHandler,
      this.responseErrorInterceptorHandler,
    );
  }

  /**
   * just a simple method to handle success response
   * @param     response        any         return received from API request
   * @returns any
   */
  handleSuccessResponse(response: any): any {
    return response.data;
  }

  /**
   * just a simple method to return error
   * @param     error           any         return received from catch block
   * @returns Promise<any>
   */
  handleFailResponse(error: any): Promise<any> {
    return Promise.reject(error);
  }

  /**
   * this method will intercept every success response
   * @param     response        any         response based on API
   * @returns any
   */
  responseSuccessInterceptorHandler(response: any): any {
    return response;
  }

  /**
   * this method will handle error response based on status
   * @param     error           AxiosError  error response from API
   * @returns Promise<void> | void
   */
  async responseErrorInterceptorHandler(error: AxiosError): Promise<void> {
    if (error.message.includes('401')) {
      return store.dispatch({ type: ReducerActionType.LOGOUT });
    }

    if (error.message.includes('404')) {
      return alert('Opps, maybe the server getting not enough sleep');
    }

    if (error.message.includes('Network Error')) {
      return alert('Seems you have not connect to the internet');
    }

    return Promise.reject(error);
  }

  /**
   * use this method to perform GET request
   * @param     endpoint        string      endpoint set up the backend team
   * @param     params          any         params based on the api specs // TODO implement generics
   * @returns Promise<any>
   */
  async get(endpoint: string, params?: any) {
    try {
      const response = await this.instance.request({
        method: 'GET',
        url: endpoint,
        params,
      });
      return this.handleSuccessResponse(response);
    } catch (error) {
      return this.handleFailResponse(error);
    }
  }

  /**
   * use this method to perform POST request
   * @param     endpoint      string      endpoint set up the backend team
   * @param     data          any         params based on the api specs // TODO implement generics
   * @returns Promise<any>
   */
  async post(endpoint: string, data: any) {
    try {
      const response = await this.instance.request({
        method: 'POST',
        url: endpoint,
        data,
      });
      return this.handleSuccessResponse(response);
    } catch (error) {
      return this.handleFailResponse(error);
    }
  }
}

export default HTTP;
