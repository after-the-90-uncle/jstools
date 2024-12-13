const RSAHelper = {
  /** 生成公钥和私钥 */
  async generateKeys() {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: 'SHA-256' },
      },
      true,
      ['encrypt', 'decrypt'],
    );
    return keyPair;
  },
  /** 导出pem格式 */
  async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey(
      key.type === 'public' ? 'spki' : 'pkcs8',
      key,
    );

    const exportedAsString = this.arrayBufferToStr(exported);
    return window.btoa(exportedAsString);
  },
  /** 导入 */
  async importKey(pem: string, type: 'private' | 'public'): Promise<CryptoKey> {
    let format: 'spki' | 'pkcs8' = 'pkcs8';
    let keyUsage: 'encrypt' | 'decrypt' = 'encrypt';
    if (type === 'private') {
      format = 'pkcs8';
      keyUsage = 'decrypt';
    } else if (type == 'public') {
      format = 'spki';
      keyUsage = 'encrypt';
    }
    const binaryDer = this.str2ArrayBuffer(window.atob(pem));
    return window.crypto.subtle.importKey(
      format,
      binaryDer,
      { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
      true,
      [keyUsage],
    );
  },
  /** 加密 */
  async encryptData(publicKey: CryptoKey, data: string): Promise<string> {
    const encoded = new TextEncoder().encode(data);
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encoded,
    );
    return window.btoa(this.arrayBufferToStr(encrypted));
  },
  /** 解密 */
  async decryptData(privateKey: CryptoKey, data: string): Promise<string> {
    const ab = this.str2ArrayBuffer(window.atob(data));
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      ab,
    );

    return window.btoa(this.arrayBufferToStr(decrypted));
  },
  arrayBufferToStr(buf: ArrayBuffer): string {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
  },
  str2ArrayBuffer(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  },
  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    return this.str2ArrayBuffer(binaryString)
  },
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    return window.btoa(this.arrayBufferToStr(buffer));
  },
  stringToHex(str: string) {
    let hexString = '';
    for (let i = 0; i < str.length; i++) {
      hexString += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hexString;
  },
};

export default RSAHelper;
