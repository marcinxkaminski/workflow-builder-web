import * as apiRequests from './apiRequests';

describe('API REQUESTS', () => {
  it('has options', async () => {
    expect(Object.keys(apiRequests.OPTIONS)).toEqual({});
  });

  it('has headers', async () => {
    expect(Object.keys(apiRequests.HEADERS)).toEqual({});
  });

  it('has workflow endpoint', async () => {
    expect(Object.keys(ApiEndpoints).includes('WORKFLOW'));
    expect(ApiEndpoints.WORKFLOW).toEqual('/workflow');
  });
});
