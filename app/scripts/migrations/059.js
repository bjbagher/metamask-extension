import { cloneDeep } from 'lodash';

const version = 59;

/**
 * Initialize attributes related to recovery seed phrase reminder
 */
export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    const state = versionedData.data;
    const newState = transformState(state);
    versionedData.data = newState;
    return versionedData;
  },
};

function transformState(state) {
  if (state.AppStateController) {
    state.AppStateController.recoveryPhraseReminderHasBeenShown = false;
    state.AppStateController.recoveryPhraseReminderLastShown = 0;
    state.AppStateController.shouldShowRecoveryPhraseReminder = false;
  } else {
    state.AppStateController = {
      recoveryPhraseReminderHasBeenShown: false,
      recoveryPhraseReminderLastShown: 0,
      shouldShowRecoveryPhraseReminder: false,
    };
  }
  return state;
}
