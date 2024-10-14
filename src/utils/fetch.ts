import { message } from 'antd';
import axios from 'axios';
import { RequestType } from './constants';


axios.interceptors.response.use(
  res => {
    return Promise.resolve(res.data);
  },
  err => Promise.reject(err),
);

const BASE_URL = process.env.API_URL;


const getRequestUrl = (url: string, params: object): string => {
  if (Object.keys(params)?.length > 0) {
    return `${url}?${Object.entries(params)
      .map((item) => item.join('='))
      .join('&')}`;
  }
  return url;
};
function fetchPromise<T extends any>(
  url: string,
  config?: any,
  isHandleErr = false,
): Promise<T> {
  return new Promise((resolve, reject) => {

    axios(url, config)
      .then((response) => {
        if (response.code !== 0 && !isHandleErr) {
          typeof window != 'undefined' && message.error(response.message);
          reject(response);
        }
        resolve(response.data);
      })
  }) as Promise<T>;
}

const customFetch = <K>(
  url: string,
  method: RequestType.GET | RequestType.POST | RequestType.REQUEST = RequestType.POST,
  isHandleErr = false,
) => {
  const newUrl = url.startsWith('http') ? url : `${BASE_URL}/${url}`;
  let baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer //TODO`,
    },
  };
  const requests = {
    get: function (params: any = {}) {
      const finalConfig = {
        ...baseConfig,
        method: 'GET',
      };
      return fetchPromise<K>(getRequestUrl(newUrl, params), finalConfig, isHandleErr);
    },
    post: function (data: any = {}, config: { headers?: {} | undefined; }) {
      const { headers = {} } = config;
      const finalConfig = {
        ...baseConfig,
        headers: {
          ...baseConfig.headers,
          ...headers,
        },
        body: JSON.stringify(data),
        method: 'POST',
      };
      return fetchPromise<K>(newUrl, finalConfig, isHandleErr);
    },
    request: function (params: any = {}, config: any = {},) {
      const finalConfig = {
        ...config,
      };
      finalConfig['headers'] = {
        Authorization: `bearer //TODO`,
        ...(config['headers'] || {}),
      };
      return fetchPromise(getRequestUrl(newUrl, params), finalConfig, undefined) as Promise<K>
    },
  };

  type GetMethod = {
    type: 'get';
    fn: typeof requests.get;
  };
  type PostMethod = {
    type: 'post';
    fn: typeof requests.post;
  };
  type RequestMethod = {
    type: 'request';
    fn: typeof requests.request;
  };
  type ResultFnType = typeof method extends RequestType.GET
    ? GetMethod
    : typeof method extends RequestType.POST
    ? PostMethod
    : RequestMethod;
  return requests[method] as GetTypeByKey<ResultFnType, 'fn'>;
};
export default customFetch;
