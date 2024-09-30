import { ApiResponse } from "apisauce";
import { Api } from "./api";

export class UsersApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getUserById(userId: string | number): Promise<any | undefined> {
    const response: ApiResponse<any> = await this.api.apisauce.get(
      `users/${userId}`
    );

    if (!response.ok) {
      throw response.originalError;
    }

    return response.data;
  }
}
