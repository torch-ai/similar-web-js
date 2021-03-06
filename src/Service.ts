import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { IServiceOptions, SimilarWebError } from "./Service.types";
import { Utilities } from "./components/utilities/Utilities";
import { TotalTraffic } from "./components/totalTraffic/TotalTraffic";
import { IMeta } from "./components/Component.types";
import { SalesSolution } from "./components/salesSolution/SalesSolution";
import { DesktopOther } from "./components/desktopOther/DesktopOther";
import { DesktopKeywordAnalysis } from "./components/desktopKeywordAnalysis/DesktopKeywordAnalysis";
import { DesktopWebTrafficSources } from "./components/desktopWebTrafficSources/DesktopWebTrafficSources";
import { MobileWebTrafficSources } from "./components/mobileWebTrafficSources/MobileWebTrafficSources";

export default class Service {
  protected static PRODUCTION_SERVER = "https://api.similarweb.com/";
  public static DEFAULT_TIMEOUT = 10000;

  protected client: AxiosInstance;
  protected options: IServiceOptions = {
    apiKey: "",
    onInvalidCredentials: () => {},
  };

  public desktopKeywordAnalysis: DesktopKeywordAnalysis;
  public desktopOther: DesktopOther;
  public desktopWebTrafficSources: DesktopWebTrafficSources;
  public mobileWebTrafficSources: MobileWebTrafficSources;
  public salesSolution: SalesSolution;
  public totalTraffic: TotalTraffic;
  public utilities: Utilities;

  public static formatDate(date: Date, granularity: "date" | "month" = "date") {
    const formattedDate = date.toISOString().split("T").shift();
    if (granularity === "date") {
      return formattedDate;
    }

    const [year, month] = formattedDate.split("-");
    return `${year}-${month}`;
  }

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

    this.desktopKeywordAnalysis = new DesktopKeywordAnalysis(this.client);
    this.desktopOther = new DesktopOther(this.client);
    this.desktopWebTrafficSources = new DesktopWebTrafficSources(this.client);
    this.mobileWebTrafficSources = new MobileWebTrafficSources(this.client);
    this.salesSolution = new SalesSolution(this.client);
    this.totalTraffic = new TotalTraffic(this.client);
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
  protected onResponseSuccess(
    response: AxiosResponse
  ): Promise<AxiosResponse<IMeta<any>>> {
    // Return a promise as some requests may need to retry auth
    return new Promise((resolve, reject) => {
      if (response.data.meta?.error_code) {
        return reject(this.getSimilarWebError(response.data.meta));
      }

      resolve(response);
    });
  }

  /**
   * Provides failure response handling
   */
  protected onResponseError(error: AxiosError<IMeta<any>>) {
    // Return a promise as some requests may need to retry auth
    return new Promise((resolve, reject) => {
      if (error.response && error.response.status === 401) {
        this.options.onInvalidCredentials();
      }

      if (error.response?.data?.meta?.error_code) {
        return reject(this.getSimilarWebError(error.response.data.meta));
      }

      reject(error);
    });
  }

  protected getSimilarWebError(meta: IMeta<any>["meta"]) {
    const { status, error_code, error_message } = meta;
    return new SimilarWebError(
      `${status} ${error_code} - ${error_message}`,
      error_code
    );
  }
}
