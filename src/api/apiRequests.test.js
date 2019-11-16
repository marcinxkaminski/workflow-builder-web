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

  it('invokes properly request method for GET with default params', async () => {
    const httpMethod = 'GET';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';

    await apiRequests.get(mockEndpointUrl);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, null);
    expect(request).toHaveBeenCalledWith('', apiRequests.OPTIONS, apiRequests.HEADERS, httpMethod);
  });

  it('invokes properly request method for GET without default params', async () => {
    const httpMethod = 'GET';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';
    const mockQueryParams = { a: 'a' };
    const mockedOptions = { b: 'b' };
    const mockedHeaders = { c: 'c' };

    await apiRequests.get(mockEndpointUrl, mockQueryParams, mockedOptions, mockedHeaders);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, mockQueryParams);
    expect(request).toHaveBeenCalledWith('', mockedOptions, mockedHeaders, httpMethod);
  });

  it('invokes properly request method for PUT with default params', async () => {
    const httpMethod = 'PUT';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';

    await apiRequests.put(mockEndpointUrl);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, null);
    expect(request).toHaveBeenCalledWith('', apiRequests.OPTIONS, apiRequests.HEADERS, httpMethod, {});
  });

  it('invokes properly request method for PUT without default params', async () => {
    const httpMethod = 'PUT';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';
    const mockQueryParams = { a: 'a' };
    const mockedOptions = { b: 'b' };
    const mockedHeaders = { c: 'c' };
    const mockBody = { d: 'd' };

    await apiRequests.put(mockEndpointUrl, mockBody, mockQueryParams, mockedOptions, mockedHeaders);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, mockQueryParams);
    expect(request).toHaveBeenCalledWith('', mockedOptions, mockedHeaders, httpMethod, mockBody);
  });

  it('invokes properly request method for POST with default params', async () => {
    const httpMethod = 'POST';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';

    await apiRequests.post(mockEndpointUrl);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, null);
    expect(request).toHaveBeenCalledWith('', apiRequests.OPTIONS, apiRequests.HEADERS, httpMethod, {});
  });

  it('invokes properly request method for POST without default params', async () => {
    const httpMethod = 'POST';
    const mockEndpointUrl = '/test';
    const mockBaseUrl = 'http://test.com';
    const mockQueryParams = { a: 'a' };
    const mockedOptions = { b: 'b' };
    const mockedHeaders = { c: 'c' };
    const mockBody = { d: 'd' };

    await apiRequests.post(mockEndpointUrl, mockBody, mockQueryParams, mockedOptions, mockedHeaders);
    expect(buildUrl).toHaveBeenCalledWith(mockBaseUrl, mockEndpointUrl, mockQueryParams);
    expect(request).toHaveBeenCalledWith('', mockedOptions, mockedHeaders, httpMethod, mockBody);
  });
});
