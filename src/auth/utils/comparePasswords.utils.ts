import * as bcrypt from 'bcryptjs';

export async function comparePasswords(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
