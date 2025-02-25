import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { generateEmbeedings } from './src/functions/vector-embeedings.js';
import { addVectors } from './src/functions/vector-database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Running : fraud-detection/vectorize.js');

try {
  const trainDataPath = join(__dirname, '/src/data/train-data.json');
  const trainData = JSON.parse(readFileSync(trainDataPath, 'utf8'));
  console.log(`[INFO] ${trainData.length} training examples`);

  const batchSize = 50;
  const processBatch = async (batch) => {
    await Promise.all(
      batch.map(async (data, index) => {
        try {
          const vectors = await generateEmbeedings(data.description);
          await addVectors(data.appId, vectors);
        } catch (error) {
          console.error(`[ERROR] Failed to vectorize ${data.appId}:`, error);
        }
      })
    );
  };

  for (let i = 0; i < trainData.length; i += batchSize) {
    const batch = trainData.slice(i, i + batchSize);
    await processBatch(batch);
    console.log(`[INFO] Processed batch ${i / batchSize + 1}`);
  }
} catch (error) {
  console.error('[ERROR] Failed to load data:', error);
}
