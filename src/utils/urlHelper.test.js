/* global expect, describe */
import { buildUrl } from './urlHelper';

describe('URL HELPER', () => {
  it('builds valid url', async () => {
    const mockBaseUrl = 'mock-url';
    const endpointUrl = '/mock-endpoint';

    expect(buildUrl(mockBaseUrl, endpointUrl)).toEqual(`${mockBaseUrl}${endpointUrl}/`);
  });

  it('builds valid url with query params', async () => {
    const mockBaseUrl = 'mock-url';
    const endpointUrl = '/mock-endpoint';
    const mockParams = { some: 'mock' };

    expect(buildUrl(mockBaseUrl, endpointUrl, mockParams)).toEqual(`${mockBaseUrl}${endpointUrl}?some=mock`);
  });
});
