import request from '../utils/request';
import { buildUrl } from '../utils/urlHelper';
import { BASE_API_URL } from './ApiEndpoints';

export const OPTIONS = {};
export const HEADERS = {};

export async function get(endpointUrl, queryParams = {}, options = OPTIONS, headers = HEADERS) {
  return request(buildUrl(BASE_API_URL, endpointUrl, queryParams), options, headers, 'GET');
}

export async function post(endpointUrl, body = {}, queryParams = {}, options = OPTIONS, headers = HEADERS) {
  return request(buildUrl(BASE_API_URL, endpointUrl, queryParams), options, headers, 'POST', body);
}
