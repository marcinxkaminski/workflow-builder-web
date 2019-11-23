/* global expect, describe */
import * as Icons from './MaterialIcons';

describe('MATERIAL ICONS', () => {
  it('has DOWNLOAD icon', async () => {
    expect(Icons.DOWNLOAD).toBe('cloud_download');
  });

  it('has ARROW_LEFT icon', async () => {
    expect(Icons.ARROW_LEFT).toBe('keyboard_arrow_left');
  });

  it('has ARROW_RIGHT icon', async () => {
    expect(Icons.ARROW_RIGHT).toBe('keyboard_arrow_right');
  });

  it('has DELETE icon', async () => {
    expect(Icons.DELETE).toBe('clear');
  });

  it('has ADD icon', async () => {
    expect(Icons.ADD).toBe('add');
  });
});
