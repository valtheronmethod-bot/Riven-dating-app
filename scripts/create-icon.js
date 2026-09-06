const fs = require('fs');
const zlib = require('zlib');

const width = 1024;
const height = 1024;

// PNG signature
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(buf) {
  let crc = 0xffffffff;
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeB = Buffer.from(type);
  const combined = Buffer.concat([typeB, data]);
  const crcVal = crc32(combined);
  const crcB = Buffer.alloc(4);
  crcB.writeUInt32BE(crcVal);
  return Buffer.concat([len, typeB, data, crcB]);
}

// IHDR chunk
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 2;  // RGB color type
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

// Raw image: filter byte + RGB per row, dark background #0D0D0F
const rowSize = 1 + width * 3;
const raw = Buffer.alloc(height * rowSize, 0);
for (let y = 0; y < height; y++) {
  const base = y * rowSize;
  raw[base] = 0; // filter none
  for (let x = 0; x < width; x++) {
    raw[base + 1 + x * 3] = 0x0D;
    raw[base + 2 + x * 3] = 0x0D;
    raw[base + 3 + x * 3] = 0x0F;
  }
}

const compressed = zlib.deflateSync(raw, { level: 1 });
const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
fs.writeFileSync('assets/images/icon-1024.png', png);
console.log('Created assets/images/icon-1024.png, bytes:', png.length);
