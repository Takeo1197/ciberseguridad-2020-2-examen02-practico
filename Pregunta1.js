const crypto = require("crypto");
const readline = require("readline-sync");

const algorithm = "aes-256-cbc";
const IV_LENGHT = 16;

// This is the keyword
const KEY = "Hola esta es una clave variable";

let cifrar = (text, key) => {
  // Get 256 bit string from the word using md5 hash
  let hash = crypto.createHash("md5").update(key).digest("hex");
  // Generate Initialization Vector
  let iv = crypto.randomBytes(IV_LENGHT);
  // Create Cipher Object with defined algorithm, key and initialization vector
  let cipher = crypto.createCipheriv(algorithm, hash, iv);
  // Encrypt the given text
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

let descifrar = (text, key) => {
  // Get 256 bit string from the word using md5 hash
  let hash = crypto.createHash("md5").update(key).digest("hex");
  let vectorAndText = text.split(":");
  let iv = Buffer.from(vectorAndText.shift(), "hex");
  let decipher = crypto.createDecipheriv(algorithm, hash, iv);
  let encryptedText = vectorAndText.join(":");
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

const phrase = readline.question(
  "Ingrese una frase para cifrar simetricamente\n\n"
);

console.log("\n\n############# Frase - Texto Plano #############");
console.log(phrase);
let frase_cifrada = cifrar(phrase, KEY);
console.log("\n############# Frase - Cifrada #############");
console.log(frase_cifrada);
let frase_descifrada = descifrar(frase_cifrada, KEY);
console.log("\n############# Frase - Descifrada #############");
console.log(frase_descifrada);
console.log("\n");
