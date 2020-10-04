const crypto = require("crypto");
const readline = require("readline-sync");

// This is the hash algorithm to use
const hash_type = "sha256";

let resumen = (texto_plano) => {
  let hash = crypto.createHash(hash_type).update(texto_plano).digest("hex");
  return hash;
};

const phrase = readline.question("Ingrese una frase para obtener su hash\n\n");

console.log("\n\n############# Frase - Texto Plano #############");
console.log(phrase);
let phrase_hash = resumen(phrase);
console.log("\n############# Frase - Hash #############");
console.log(phrase_hash);
console.log("\n");
