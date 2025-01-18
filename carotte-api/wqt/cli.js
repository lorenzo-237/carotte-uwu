/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function generateInterfaceForTable(tableName) {
  const columns = await prisma.$queryRaw`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name=${tableName}`;
  const interfaceCode = generateInterfaceCode(tableName, columns);
  const interfaceFileName = `${tableName}.interface.ts`;
  fs.writeFileSync(interfaceFileName, interfaceCode);
  console.log(`Interface generated for table: ${tableName}`);
}

function generateInterfaceCode(tableName, columns) {
  let interfaceCode = `// ${tableName}.interface.ts
export interface ${tableName} {
`;
  for (const column of columns) {
    const columnName = column['column_name'];
    const columnType = mapColumnTypeToTypeScript(column['data_type']);
    interfaceCode += `  ${columnName}${column['is_nullable'] === 'YES' ? '?' : ''}: ${columnType};\n`;
  }
  interfaceCode += '}\n';
  return interfaceCode;
}

function mapColumnTypeToTypeScript(columnType) {
  // Map database column types to TypeScript types as needed.
  // You can expand this mapping as necessary for your use case.
  if (columnType.includes('integer')) {
    return 'number';
  } else if (columnType.includes('varchar') || columnType.includes('text')) {
    return 'string';
  } else if (columnType.includes('datetime') || columnType.includes('timestamp')) {
    return 'Date';
  } else if (columnType.includes('boolean')) {
    return 'boolean';
  } else {
    return 'any';
  }
}

const tableName = process.argv[2]; // Read the table name from command-line argument
if (!tableName) {
  console.error('Please provide a table name as a command-line argument.');
  process.exit(1);
}

generateInterfaceForTable(tableName).then(() => {
  console.log('Interface generation complete.');
  process.exit(0);
});
