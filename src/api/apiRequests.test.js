/* global expect, describe, jest */

import * as apiRequests from './apiRequests';
import request from '../utils/request';
import { buildUrl } from '../utils/urlHelper';
// eslint-disable-next-line no-unused-vars
import { BASE_API_URL } from './ApiEndpoints';

jest.mock('../utils/request');
jest.mock('../utils/urlHelper', () => ({ buildUrl: jest.fn().mockImplementation(() => '') }));
jest.mock('./ApiEndpoints', () => ({ BASE_API_URL: 'http://test.com' }));

describe('API REQUESTS', () => {
  beforeEach(() => {
    request.mockClear();
    buildUrl.mockClear();
  });

  it('has proper options', async () => {
    expect(apiRequests.OPTIONS).toEqual({});
  });

  it('has proper headers', async () => {
    expect(apiRequests.HEADERS).toEqual({});
  });

  it('invokes properly request method for GET', async () => {
    const httpMethod = 'GET';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';
    const mockQueryParams = { a: 'a' };
    const mockedOptions = { b: 'b' };
    const mockedHeaders = { c: 'c' };

    apiRequests.get(mockEndpointUrl, mockQueryParams, mockedOptions, mockedHeaders);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, mockQueryParams);
    expect(request).toHaveBeenCalledWith('', mockedOptions, mockedHeaders, httpMethod);
  });

  it('invokes properly request method for POST', async () => {
    const httpMethod = 'POST';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';
    const mockQueryParams = { a: 'a' };
    const mockedOptions = { b: 'b' };
    const mockedHeaders = { c: 'c' };
    const mockBody = { d: 'd' };

    apiRequests.post(mockEndpointUrl, mockBody, mockQueryParams, mockedOptions, mockedHeaders);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, mockQueryParams);
    expect(request).toHaveBeenCalledWith('', mockedOptions, mockedHeaders, httpMethod, mockBody);
  });
});
