import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  async get(
    url: string,
    headers?: Record<string, string>,
    params?: any,
  ): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(url, {
        headers,
        params,
      });

      return response.data;
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  }

  async post(url: string, data: any, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(url, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to make POST request');
    }
  }

  async put(url: string, data: any, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.put(url, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to make PUT request');
    }
  }

  async delete(url: string, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.delete(url, {
        headers,
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to make DELETE request');
    }
  }
}
