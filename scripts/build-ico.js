import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

function buildIco(sizes) {
  const images = sizes.map(size => {
    const pngPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    const buffer = fs.readFileSync(pngPath);
    return { width: size, height: size, buffer };
  });

  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  const entries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel (32-bit ARGB)
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data

    entries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...buffers]);
  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`Created 32-bit transparent favicon.ico with ${count} sizes (${sizes.join(', ')} px). Total size: ${icoBuffer.length} bytes.`);
}

buildIco([16, 32, 48]);
