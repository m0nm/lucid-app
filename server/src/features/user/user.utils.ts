import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(parseInt(process.env.HASH_SALT as string));
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

export async function comparePassword(
  reqPassword: string,
  hashPassword: string
): Promise<boolean> {
  return bcrypt.compare(reqPassword, hashPassword).catch((e) => false);
}
