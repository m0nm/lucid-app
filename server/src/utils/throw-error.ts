export default function throwError(statusCode: number, message: string) {
  throw { success: false, statusCode, message };
}
