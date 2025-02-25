import { getFraudApps } from './src/scripts/mongo-db-scripts.js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

console.log('Running : fraud-detection/index.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
  try {
    console.log('[INFO] Fetching fraud apps which have description inside them...');
    const apps = await getFraudApps();

    if (!apps || apps.length === 0) {
      console.log('[WARNING] No fraud apps found. Exiting.');
      return;
    }

    console.log(`[INFO] ${apps.length} fraud apps`);

    const trainData = apps.slice(0, Math.floor(apps.length * 0.8));
    const testData = apps.slice(Math.floor(apps.length * 0.8));

    console.log(
      `[INFO] Split data: \n${trainData.length} training examples \n${testData.length} test examples`
    );

    writeFileSync(join(__dirname, 'train-data.json'), JSON.stringify(trainData));
    writeFileSync(join(__dirname, 'test-data.json'), JSON.stringify(testData));

    console.log('[INFO] Data written to file');

  } catch (error) {
    console.error('[ERROR] function:', error);
  }
};

main()