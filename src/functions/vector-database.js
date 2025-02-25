import { Index } from '@upstash/vector';
import dotenv from "dotenv";

dotenv.config();

const addVectors = async (id, vectors_array) => {
  try {
    const index = new Index({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_TOKEN,
    });

    await index.upsert({
      id,
      vector: vectors_array,
    });
  } catch (e) {
    console.error(`[ERROR] ${JSON.stringify(e, null, 2)}`);
  }
};

const getQueryResults = async (vectors_array) => {
  try {
    const index = new Index({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_TOKEN,
    });

    const results = await index.query({
      vector: vectors_array,
      topK: 5,
    });

    return results;
  } catch (e) {
    console.error(`[ERROR] ${JSON.stringify(e, null, 2)}`);
    return [];
  }
};

export { addVectors, getQueryResults };
