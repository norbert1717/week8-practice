 //import * as fs from 'node:fs'; // fs néven lefuttatja a dolgokat, *: bármilyen fájl lehet, node futtatja a javascript kódot, vannak extra featuerok is: readFileSync művelet -> fájlok beolvasása és adatok kinyerése
const fs = require('node:fs'); // same import different syntax
// enoent hiba: az adott helyen az adott file nem található

/* try { 
  const data = fs.readFileSync('file.json', 'utf8');
  console.log(data);
  const jsonData = JSON.parse(data);
  console.log(jsonData.key);
} catch (err) {
    console.error('Error reading the file:', err);
}  */// ennél a kódnál fut a kód és utána fut le a többi

 fs.readFile('file.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    console.log(data);

    try {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
    } catch (parseErr) {
        console.err("Error at parsing the data", parseErr);
    }
  }); // ennél a kódnál elkezdi futtatni a kódot, de közben futtatja a többi kófot is és akár később is befejezhetu