import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

// Minimal CSV parser for two-column rows (handles quoted fields).
function parseCsvLine(line) {
	const cells = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (ch === '"') {
			if (inQuotes && line[i + 1] === '"') {
				current += '"';
				i++;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}
		if (ch === ',' && !inQuotes) {
			cells.push(current);
			current = '';
			continue;
		}
		current += ch;
	}
	cells.push(current);
	return cells;
}

const root = fileURLToPath(new URL('..', import.meta.url));
const csvPath = `${root}/static/cat.csv`;
const jsonPath = `${root}/static/cat.json`;

const mapping = {};
const rl = createInterface({ input: createReadStream(csvPath, 'utf8'), crlfDelay: Infinity });

for await (const line of rl) {
	if (!line.trim()) continue;
	const [de, es] = parseCsvLine(line);
	if (!de || es == null) continue;
	if (mapping[de] && mapping[de] !== es) {
		throw new Error(`Clave duplicada con distinto valor: ${de}`);
	}
	mapping[de] = es;
}

await writeFile(jsonPath, `${JSON.stringify(mapping, null, 2)}\n`, 'utf8');
console.log(`Escrito ${jsonPath} (${Object.keys(mapping).length} categorías)`);
