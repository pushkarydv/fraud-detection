import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Running : fraud-detection/process-results-file.js');

const main = async () => {
  const testResultsPath = join(__dirname, '/src/data/test-results.json');
  const testResults = JSON.parse(readFileSync(testResultsPath, 'utf8'));
  console.log(`[INFO] ${testResults.length} test examples`);

  const results = testResults.map((result) => ({
    appId: result.currentAppId,
    topScore: result.results[0].score,
    topAppId: result.results[0].id,
  }));

  const sum = results.reduce((acc, result) => acc + result.topScore, 0);
  const average = sum / results.length;
  console.log(`[INFO] Average Prediciton: ${average}`);

  const topScores = results.filter((result) => result.topScore > 0.9);
  const topScoresCount = topScores.length;
  console.log(
    `[INFO] Fraud Score > 90: ${topScoresCount} out of ${results.length}`
  );
};
main();
