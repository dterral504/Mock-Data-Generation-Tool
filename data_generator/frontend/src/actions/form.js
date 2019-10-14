// import axios from 'axios';
import { ADD_FIELD } from './types';
import { EXPORT_CONFIG } from './types';

// GET LEADS
export const addField = () => {
    return {
        type: ADD_FIELD
    }
};

export const exportConfig = () => {
  return {
      type: EXPORT_CONFIG
  }
};
