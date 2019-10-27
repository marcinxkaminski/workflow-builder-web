import ApiEndpoints from './ApiEndpoints';

describe('API ENDPOINTS', () => {
  it('has base api url', async () => {
    expect(Object.keys(ApiEndpoints).includes('BASE_API_URL'));
    expect(ApiEndpoints.BASE_API_URL).toEqual('https://u.com');
  });

  it('has workflow elements\' endpoint', async () => {
    expect(Object.keys(ApiEndpoints).includes('WORKFLOW_ELEMENTS'));
    expect(ApiEndpoints.WORKFLOW_ELEMENTS).toEqual('/workflow-elements');
  });

  it('has workflow endpoint', async () => {
    expect(Object.keys(ApiEndpoints).includes('WORKFLOW'));
    expect(ApiEndpoints.WORKFLOW).toEqual('/workflow');
  });
});
