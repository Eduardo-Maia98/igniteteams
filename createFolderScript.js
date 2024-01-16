const fs = require('fs');
const path = require('path');

const folderName = process.argv[2];

if (!folderName) {
  console.error('Por favor, forneça um nome de pasta válido.');
  process.exit(1);
}

const folderPath = path.join(__dirname, folderName);

// Verifica se a pasta já existe
if (fs.existsSync(folderPath)) {
  console.error(`A pasta "${folderName}" já existe.`);
  process.exit(1);
}

// Cria a pasta
fs.mkdirSync(folderPath);

// Cria o arquivo index.tsx dentro da pasta
const indexPath = path.join(folderPath, 'index.tsx');
const indexContent = `import * as S from "./styles";\n\n` +
  `type Props = {\n  propss: any\n}\n\n` +
  `export function ${folderName}({ propss }: Props) {\n` +
  `  return (\n` +
  `    <S.Container  >\n\n` +
  `    </S.Container>\n\n` +
  `  )\n}\n`;

fs.writeFileSync(indexPath, indexContent);

// Cria o arquivo styles.ts dentro da pasta
const stylesPath = path.join(folderPath, 'styles.ts');
const stylesContent = `import styled from 'styled-components/native'\n\n` +
  `export const Container = styled.View\`\n` +
  `    flex: 1;\n\`;\n`;

fs.writeFileSync(stylesPath, stylesContent);

console.log(`Pasta "${folderName}" criada com sucesso!`);
