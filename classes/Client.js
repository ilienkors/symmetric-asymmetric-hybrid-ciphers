import { writeFileSync } from 'fs';

import { getRandomPrimeNumber, getCoprimeIntegersNumber, getD, stringToCharcodesArray, encryptMessage, decryptMessage } from "../utils.js"
import SymmetricFileCypher from './SymmetricFileCypher.js';

class Client {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    const { openKey, privateKey } = this.rsaGen();
    this.openKey = openKey;
    this.privateKey = privateKey;
    this.dataPackage;
    this.clients = {};
  }

  rsaGen() {
    const p = getRandomPrimeNumber();
    const q = getRandomPrimeNumber();
    const n = p * q;
    const fiN = (p - 1) * (q - 1);
    const e = getCoprimeIntegersNumber(fiN);
    const d = getD(e, fiN);

    return {
      openKey: { e, n },
      privateKey: { d, n },
    }
  }

  addClients(...clients) {
    clients.forEach(client => {
      this.clients[client.name] = client.openKey
    })
    return this;
  }

  send(dataPackage) {
    this.dataPackage = dataPackage;
    return this;
  }

  to(client) {
    client.dataPackage = this.dataPackage;
    return client;
  }

  getDecryptedMessage() {
    const decryptedMessage = decryptMessage(this.dataPackage.message, this.privateKey.d, this.privateKey.n);
    return {
      from: this.dataPackage.from.name,
      to: this.dataPackage.to.name,
      message: decryptedMessage.map(char => String.fromCharCode(Number(char))).join('')
    };
  }

  saveNewFile() {
    let password = decryptMessage(this.dataPackage.password, this.privateKey.d, this.privateKey.n);
    password = password.map(char => String.fromCharCode(Number(char))).join('')
    const decryptedFile = SymmetricFileCypher.decrypt(this.dataPackage.file, password);
    writeFileSync(this.path + "/saved.docx", decryptedFile);
  }
}

export default Client
