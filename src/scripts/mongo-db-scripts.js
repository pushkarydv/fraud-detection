import dbConnect, { disconnectDb } from '../functions/mongnodb.js';
import { GplayAppVariablesModel } from '../models/app-variables.model.js';
import { GplayAppModel } from '../models/app.model.js';

export const getFraudApps = async (mode = 'google') => {
  if (mode !== 'google') {
    console.log('[ERROR] Invalid mode');

    return [];
  }

  await dbConnect();
  try {
    const variablesRespose = await GplayAppVariablesModel.find({
      appType: 'fraud',
    }).select('appId -_id');

    const appIds = variablesRespose.map((app) => app.appId);

    const appDescriptions = await GplayAppModel.find({
      appId: { $in: appIds },
      description: { $exists: true, $ne: '' },
    }).select('appId description -_id');

    const filteredApps = appDescriptions.filter(
      (app) => app.description && app.description.trim() !== ''
    );

    return filteredApps || [];
  } catch (err) {
    console.log('[ERROR]', err);
    return [];
  } finally {
    await disconnectDb();
  }
};
