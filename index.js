import Client from "./classes/Client.js";
import DataPackage from "./classes/DataPackage.js";

const fedor = new Client("Fedor", "./folders/fedor", "toor");
const ivan = new Client("Ivan", "./folders/ivan", "toor1");
const ulyana = new Client("Ulyana", "./folders/ulyana", "toor2");

fedor.addClients(ivan, ulyana);
ivan.addClients(fedor, ulyana);
ulyana.addClients(fedor, ivan);

const fedorsDataPackage = new DataPackage(
  fedor,
  ulyana,
  "Hello Ulyana from Fedor!",
  fedor.path + "/lab1.docx",
  fedor.password
);
fedor.send(fedorsDataPackage).to(ivan).to(ulyana);
console.log("------------------------------");
console.log("Sended from Fedor to Ulyana through Ivan");
console.log('Ivan see:', ivan.getDecryptedMessage());
console.log('Ulyana see:', ulyana.getDecryptedMessage());
ulyana.saveNewFile();
ivan.saveNewFile();

const ivansDataPackage = new DataPackage(ivan, fedor, "Hello Fedor from Ivan");
ivan.send(ivansDataPackage).to(ulyana).to(fedor);
console.log("------------------------------");
console.log("Sended from Ivan to Fedor through Ulyana");
console.log('Ulyana see:', ulyana.getDecryptedMessage());
console.log('Fedor see:', fedor.getDecryptedMessage())

