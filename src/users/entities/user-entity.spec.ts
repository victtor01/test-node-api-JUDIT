import { User } from './user.entity';

describe('user entity test', () => {
  it('construct corretly User', () => {
    const user = new User(
      {
        name: 'example',
        email: 'example@gmail.com',
        password: '',
      },
      'UUID',
    );

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('UUID');
  });
});
