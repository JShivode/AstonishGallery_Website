// src/utils/load-json.ts
import * as fs from 'fs';
import * as path from 'path';

export function loadJsonData(fileName: string): any {
  // Adjust the '../../data' path based on your project structure
  const filePath = path.join(__dirname, '../../../data', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}
