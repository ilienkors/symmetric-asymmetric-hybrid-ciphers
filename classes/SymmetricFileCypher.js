import crypto from 'crypto';

class SymmetricFileCypher {
  static algorithm = 'aes-256-ctr';

  static encrypt(buffer, key) {
    key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(SymmetricFileCypher.algorithm, key, iv);
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
  };

  static decrypt(encrypted, key) {
    key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    const iv = encrypted.slice(0, 16);
    encrypted = encrypted.slice(16);
    const decipher = crypto.createDecipheriv(SymmetricFileCypher.algorithm, key, iv);
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
  };
}

export default SymmetricFileCypher;
