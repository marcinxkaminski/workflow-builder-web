import request from '../utils/request';
import BASE_API_URL from './ApiEndpoints';

const OPTIONS = {};
const HEADERS = {};

export async function get(endpointUrl, params = {}) {
  return request(`${BASE_API_URL}${endpointUrl}?${new URLSearchParams(params).toString()}`, OPTIONS, HEADERS, 'GET');
}

export async function post(endpointUrl, body = {}) {
  return request(`${BASE_API_URL}${endpointUrl}`, OPTIONS, HEADERS, 'POST', body);
}
