import { ApiResponse } from "apisauce";
import { GetPostsProps } from "@/hooks/queries/posts/useGetPaginatedPosts";
import { Api } from "./api";

export class PostsApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getPosts({
    limit = 10,
    skip = 0,
    select = "",
    sortBy = "",
    order = "asc",
  }: GetPostsProps): Promise<any | undefined> {
    let query = `?limit=${limit}&skip=${skip}&order=${order}`;

    if (select) {
      query += `&select=${select}`;
    }

    if (sortBy) {
      query += `&sortBy=${sortBy}`;
    }

    const response: ApiResponse<any> = await this.api.apisauce.get(
      `posts${query}`
    );

    if (!response.ok) {
      throw response.originalError;
    }

    return response.data || [];
  }

  async getPostById(postId: string | number): Promise<any | undefined> {
    const response: ApiResponse<any> = await this.api.apisauce.get(
      `posts/${postId}`
    );

    if (!response.ok) {
      throw response.originalError;
    }

    return response.data;
  }

  async getPostCommentsById(postId: string | number): Promise<any | undefined> {
    const response: ApiResponse<any> = await this.api.apisauce.get(
      `posts/${postId}/comments`
    );

    if (!response.ok) {
      throw response.originalError;
    }

    return response.data;
  }
}
