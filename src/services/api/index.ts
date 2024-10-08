import { ApisauceInstance, create } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./config";
import { PostsApi } from "../posts";
import { UsersApi } from "../users";

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }
}

const baseApi = new Api();
baseApi.setup();
const api = {
  api: baseApi,
  posts: new PostsApi(baseApi),
  users: new UsersApi(baseApi),
};

// const responseMonitor = async (response: any) => {
//   // we force to the user to login await if token is expired
//   if (response.status === 401) {
//     if (api.api.auth0Logout) {
//       toast.error(t('toast.tokenExpired'));
//       useRootStore.getState().removeToken();
//       api.api.auth0Logout({
//         logoutParams: { returnTo: window.location.origin }
//       });
//     }
//   }
// };

// api.api.apisauce.addMonitor(responseMonitor);

export default api;
