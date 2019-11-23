import { BASE_API_URL } from './apiEndpoints';
import request from '../utils/request';
import { buildUrl } from '../utils/urlHelper';

export const OPTIONS = {};
export const HEADERS = {};

export async function get(endpointUrl, queryParams = null, options = OPTIONS, headers = HEADERS) {
  return request(buildUrl(BASE_API_URL, endpointUrl, queryParams), options, headers, 'GET');
}

export async function put(
  endpointUrl, body = {}, queryParams = null, options = OPTIONS, headers = HEADERS,
) {
  return request(buildUrl(BASE_API_URL, endpointUrl, queryParams), options, headers, 'PUT', body);
}

export async function post(
  endpointUrl, body = {}, queryParams = null, options = OPTIONS, headers = HEADERS,
) {
  return request(buildUrl(BASE_API_URL, endpointUrl, queryParams), options, headers, 'POST', body);
}
