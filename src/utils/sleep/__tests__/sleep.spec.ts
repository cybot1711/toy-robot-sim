import { sleep } from '../sleep';

jest.mock('../sleep');
describe('utils:sleep', function () {
  beforeEach(() => {
    jest.useFakeTimers();
    (sleep as jest.Mock).mockImplementation(() => Promise.resolve('success'));
  });

  afterEach(jest.resetAllMocks);

  it('should wait for the allotted amount of seconds', async () => {
    await sleep(3000);

    expect(sleep).toHaveBeenCalledWith(3000);
  });
});
