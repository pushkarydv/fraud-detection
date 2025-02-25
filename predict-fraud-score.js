import gplay from 'google-play-scraper';
import { generateEmbeedings } from './src/functions/vector-embeedings.js';
import { getQueryResults } from './src/functions/vector-database.js';

const main = async () => {
  const appData = await gplay.app({
    appId: 'com.tara567newwebapp',
    lang: 'en',
    country: 'us',
  });

  if (!appData) {
    console.log('[ERROR] App not found');
    return;
  }

  console.log(`[INFO] App: ${appData.title}`);

  const { description } = appData;

  const vectors = await generateEmbeedings(description);
  const results = await getQueryResults(vectors);

  console.log(results);
};

main();