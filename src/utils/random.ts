const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function randomStr(len: number): string {
  let str = "";

  for (let i = 0; i < len; i += 1) {
    str += s[Math.floor(Math.random() * s.length)];
  }

  return str;
}
