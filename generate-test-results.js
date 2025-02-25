import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { generateEmbeedings } from './src/functions/vector-embeedings.js';
import { getQueryResults } from './src/functions/vector-database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Running : fraud-detection/vectorize.js');

const main = async () => {
  const testDataPath = join(__dirname, '/src/data/test-data.json');
  const testData = JSON.parse(readFileSync(testDataPath, 'utf8'));
  console.log(`[INFO] ${testData.length} test examples`);

  const testResults = [];

  const batchSize = 50;
  for (let i = 0; i < testData.length; i += batchSize) {
    const batch = testData.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (data, index) => {
        try {
          const vectors = await generateEmbeedings(data.description);
          const results = await getQueryResults(vectors);

          testResults.push({
            currentAppId: data.appId,
            results,
          });
        } catch (error) {
          console.error(`[ERROR] Failed to vectorize ${data.appId}:`, error);
        }
      })
    );

    console.log(`[INFO] Processed batch ${i / batchSize + 1}`);
  }

  writeFileSync(
    join(__dirname, '/src/data/test-results.json'),
    JSON.stringify(testResults)
  );
};

main();
