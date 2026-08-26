import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const distDirectory = resolve(process.cwd(), 'dist');
const indexPath = join(distDirectory, 'index.html');
if (!existsSync(indexPath)) {
  throw new Error('Pages asset smoke: dist/index.html이 없습니다. 먼저 프로덕션 빌드를 실행하세요.');
}

const html = readFileSync(indexPath, 'utf8');
const references = [...html.matchAll(/<(?:script|link|img)\b[^>]*?\b(?:src|href)=(['"])(.*?)\1/gi)]
  .map((match) => match[2]);
if (references.length === 0) throw new Error('Pages asset smoke: index.html에 정적 자산 참조가 없습니다.');
for (const reference of references) {
  if (!reference.startsWith('./')) {
    throw new Error(`Pages asset smoke: 자산 참조가 상대 경로가 아닙니다: ${reference}`);
  }
}

const expectedSymbols = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
];
for (const symbolId of expectedSymbols) {
  const assetPath = join(distDirectory, 'symbols', `${symbolId}.svg`);
  if (!existsSync(assetPath)) throw new Error(`Pages asset smoke: 심볼 SVG가 없습니다: ${assetPath}`);
  const nestedUrl = new URL(`./symbols/${symbolId}.svg`, 'https://example.test/laundry-symbol-rescue-team/');
  if (nestedUrl.pathname !== `/laundry-symbol-rescue-team/symbols/${symbolId}.svg`) {
    throw new Error(`Pages asset smoke: 하위 경로 심볼 URL이 잘못되었습니다: ${nestedUrl.pathname}`);
  }
}

const assetDirectory = join(distDirectory, 'assets');
const bundledScripts = readdirSync(assetDirectory)
  .filter((fileName) => fileName.endsWith('.js'))
  .map((fileName) => readFileSync(join(assetDirectory, fileName), 'utf8'));
if (!bundledScripts.some((bundle) => /(?:["'`])\.\/(?:["'`])/.test(bundle))) {
  throw new Error('Pages asset smoke: 심볼 URL에 사용할 상대 BASE_URL이 bundle에 없습니다.');
}

process.stdout.write(`Pages asset smoke passed: ${references.length} relative HTML references, ${expectedSymbols.length} symbol SVGs.\n`);
