/* global expect, describe, jest, fetch */
import request from './request';

describe('REQUEST', () => {
  fetch = jest.fn(async () => ({ ok: true, json: () => '', text: '' }));

  it('calls fetch method with all params', async () => {
    const mockUrl = 'mock-url';
    const mockOptions = { some: 'mock' };
    const mockHeaders = { some: 'mock' };
    const mockMethod = 'POST';
    const mockBody = { some: 'mock' };

    await request(mockUrl, mockOptions, mockHeaders, mockMethod, mockBody);
    expect(fetch).toBeCalledWith(mockUrl, {
      mode: 'cors',
      ...mockOptions,
      headers: { 'Content-Type': 'application/json', ...mockHeaders },
      method: mockMethod,
      body: JSON.stringify(mockBody),
    });
  });

  it('calls fetch method with default params', async () => {
    const mockUrl = 'mock-url';

    await request(mockUrl);
    expect(fetch).toBeCalledWith(mockUrl, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: null,
    });
  });

  it('calls fetch method without body when request method is GET or HEAD', async () => {
    const mockUrl = 'mock-url';
    const mockMethod1 = 'GET';
    const mockMethod2 = 'HEAD';
    const mockBody = { some: 'mock' };

    await request(mockUrl, null, null, mockMethod1, mockBody);
    expect(fetch).toBeCalledWith(mockUrl, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: mockMethod1,
      body: null,
    });

    await request(mockUrl, null, null, mockMethod2, mockBody);
    expect(fetch).toBeCalledWith(mockUrl, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: mockMethod2,
      body: null,
    });
  });

  it('returns json on success', async () => {
    const mockedResponse = 'mocked-response';
    fetch = jest.fn(async () => ({ ok: true, json: () => mockedResponse, text: '' }));
    const mockUrl = 'mock-url';

    const res = await request(mockUrl);
    expect(res).toEqual(mockedResponse);
  });

  it('returns text on error', async () => {
    const mockedResponse = 'mocked-response';
    fetch = jest.fn(async () => ({ ok: false, json: () => '', text: () => mockedResponse }));
    const mockUrl = 'mock-url';

    const res = await request(mockUrl);
    expect(res).toEqual(mockedResponse);
  });
});
