import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { IServiceOptions } from "./Service.types";
import { Utilities } from "./components/utilities/Utilities";

export default class Service {
  protected static PRODUCTION_SERVER = "https://api.similarweb.com/";

  protected static DEFAULT_TIMEOUT = 10000;

  protected client: AxiosInstance;
  protected options: IServiceOptions = {
    apiKey: "",
    onInvalidCredentials: () => {},
  };

  public utilities: Utilities;

  public static getServiceUrl() {
    return Service.PRODUCTION_SERVER;
  }

  constructor(options: Partial<IServiceOptions>) {
    this.setOptions(options);
  }

  protected setEnvironment() {
    this.client = axios.create({
      baseURL: Service.getServiceUrl(),
      timeout: Service.DEFAULT_TIMEOUT,
    });

    // Bind to incoming requests
    this.client.interceptors.request.use(this.onRequest.bind(this));
    // Bind to responses
    this.client.interceptors.response.use(
      this.onResponseSuccess.bind(this),
      this.onResponseError.bind(this)
    );

    this.utilities = new Utilities(this.client);
    return this;
  }

  setOptions(options: Partial<IServiceOptions>) {
    this.options = { ...this.options, ...options };
    this.setEnvironment();
    return this;
  }

  /**
   * Modifies the original request adding authorization if required.
   */
  protected onRequest(
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    // Return a promise as some requests may need to try auth
    return new Promise((resolve, reject) => {
      const { apiKey } = this.options;
      originalRequest.params = originalRequest.params || {};
      originalRequest.params.api_key = apiKey;
      resolve(originalRequest);
    });
  }

  /**
   * Provides success response handling
   */
  protected onResponseSuccess(response: AxiosResponse): Promise<AxiosResponse> {
    // Return a promise as some requests may need to retry auth
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  }

  /**
   * Provides failure response handling
   */
  protected onResponseError(error: AxiosError) {
    // Return a promise as some requests may need to retry auth
    return new Promise((resolve, reject) => {
      if (error.response && error.response.status === 401) {
        this.options.onInvalidCredentials();
      }

      // if (error.response?.data.error) {
      //   reject(new Error(error.message));
      // }

      reject(error);
    });
  }
}
