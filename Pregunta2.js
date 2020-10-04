const cryptico = require("cryptico");
const readline = require("readline-sync");

const passPhrase = "NothingIsEverComplete";
let bits = 1024;

const privateKey = cryptico.generateRSAKey(passPhrase, bits);
const publickKey = cryptico.publicKeyString(privateKey);

let cifrar_asim = (texto_plano, clave_publica) => {
  const encrypted_text = cryptico.encrypt(texto_plano, clave_publica);
  return encrypted_text["cipher"];
};

let descifrar_asim = (texto_cifrado, clave_privada) => {
  const decrypted_text = cryptico.decrypt(texto_cifrado, clave_privada);
  return decrypted_text["plaintext"];
};

const text = readline.question(
  "Ingrese una frase para cifrar asimetricamente\n\n"
);

console.log("\n\n############# Frase - Texto Plano #############");
console.log(text);
let cifrado = cifrar_asim(text, publickKey);
console.log("\n############# Frase - Cifrada #############");
console.log(cifrado);
let decifrado = descifrar_asim(cifrado, privateKey);
console.log("\n############# Frase - Descifrada #############");
console.log(decifrado);
console.log("\n");
