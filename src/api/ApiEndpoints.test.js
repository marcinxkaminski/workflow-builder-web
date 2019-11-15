/* global expect, describe */

import * as ApiEndpoints from './ApiEndpoints';

describe('API ENDPOINTS', () => {
  it('has base api url', async () => {
    expect(ApiEndpoints.BASE_API_URL).toEqual('http://localhost:8000/api/workflow-builder');
  });

  it('has workflow elements\' endpoint', async () => {
    expect(ApiEndpoints.WORKFLOW_ELEMENTS).toEqual('/elements');
  });

  it('has workflow endpoint', async () => {
    expect(ApiEndpoints.WORKFLOW_FILES).toEqual('/files');
  });
});
