import { PPipe } from './p.pipe';

describe('PPipe', () => {
  it('create an instance', () => {
    const pipe = new PPipe();
    expect(pipe).toBeTruthy();
  });
});
