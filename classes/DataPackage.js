import { readFileSync } from 'fs';

import { stringToCharcodesArray, encryptMessage } from "../utils.js";
import SymmetricFileCypher from './SymmetricFileCypher.js';

class Package {
  constructor(from, to, message, filePath = null, password = "") {
    this.from = from;
    this.to = to;
    this.message = encryptMessage(stringToCharcodesArray(message), to.openKey.e, to.openKey.n);
    if (filePath) {
      const plain = readFileSync(filePath);
      this.file = SymmetricFileCypher.encrypt(plain, password);
    }
    this.password = encryptMessage(stringToCharcodesArray(password), to.openKey.e, to.openKey.n);
  }
}

export default Package;
