import * as RequestStatuses from './RequestStatuses';

describe('REQUEST STATUSES', () => {
  it('has PENDING status', async () => {
    expect(RequestStatuses.PENDING).toBe('PENDING');
  });

  it('has SUCCESS status', async () => {
    expect(RequestStatuses.SUCCESS).toBe('SUCCESS');
  });

  it('has ERROR status', async () => {
    expect(RequestStatuses.ERROR).toBe('ERROR');
  });
});
