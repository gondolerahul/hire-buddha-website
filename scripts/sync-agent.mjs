// Copies the built fluid-buddha SDK bundle into public/. Run after building
// ../fluid-buddha/fluid-buddha-sdk (npm run build there). The source map is
// deliberately not copied, and its reference is stripped, so production does
// not publish the SDK's unminified source.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, '../fluid-buddha/fluid-buddha-sdk/dist/fluid-buddha.global.js');
const dest = resolve(root, 'public/fluid-buddha.global.js');

const code = readFileSync(src, 'utf8').replace(/\n\/\/# sourceMappingURL=.*\s*$/, '\n');
writeFileSync(dest, code);
console.log(`Copied ${src} -> ${dest}`);
