/** ArrayBuffer 转 string */
export function arrayBufferToStr(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}
/** string 转ArrayBuffer */
export function str2ArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
/** base64 转ArrayBuffer */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  return str2ArrayBuffer(binaryString)
}
/** ArrayBuffer 转 base64 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return window.btoa(arrayBufferToStr(buffer));
}
/** string 转16 进制 */
export function stringToHex(str: string) {
  let hexString = '';
  for (let i = 0; i < str.length; i++) {
    hexString += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hexString;
}
/** 16进制 转 string*/
export function hexToString(hex:string) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }
  return str;
}