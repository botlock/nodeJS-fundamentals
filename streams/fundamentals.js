//Netflix e spotify

// Importação de clientes via CSV (Excel)

//1gb - 1.000.000 de linhas

//POST /upload import.csv

//internet de 10mb/s -- vai demorar 100 segundos pra ela subir esse arquivo para depois o node começar a fazer a inserção no banco de dados

//nos primeiros 10mb/s => 200linhas

// conceito de Strems = eu consigo aos poucos ir lendo o arquivo que esta sendo enviado e ja ir mandando para o servidor e consigo precessar as informações que esta sendo contidas ali dentro

//Readable Streams / Writable Strems

import { Readable, Writable, Transform} from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStrem extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStrem());
