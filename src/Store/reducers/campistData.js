import { addReducer } from 'reactn';
import { CAMPIST_DATA } from './storeNames';

export const basalDosage = {
  dosage: '',
  time: ''
};

export const store = {
  [CAMPIST_DATA]: {
    name: '',
    lastname: '',
    yearsOld: '',
    weight: '',
    team: '',
    drugs: '',
    allergies: '',
    basalDosage: [{ ...basalDosage }]
  }
};

addReducer('initCampistData', state => {
  return {
    ...state,
    [CAMPIST_DATA]: { ...store[CAMPIST_DATA] }
  };
});

addReducer('campistDataSetValue', (state, key, value) => {
  const newState = { ...state };
  newState[CAMPIST_DATA][key] = value;
  return newState;
});

addReducer('campistDataBasalDosageAdd', stage => {
  const newState = { ...stage };
  newState[CAMPIST_DATA].basalDosage.push({ ...basalDosage });
  return newState;
});

addReducer('campistDataBasalDosageRemove', (stage, idx) => {
  const newState = { ...stage };
  newState[CAMPIST_DATA].basalDosage.splice(idx, 1);
  return newState;
});

addReducer('campistDataBasalDosageEdit', (stage, idx, key, value) => {
  const newState = { ...stage };
  newState[CAMPIST_DATA].basalDosage[idx][key] = value;
  return newState;
});