import ConfigTypes from '../types/ConfigTypes.mjs';

const defaultConfig = {
  [ConfigTypes.LIKE_TYPES]: {
    LIKE: {
      name: 'like',
    },
    DISLIKE: {
      name: 'dislike',
    },
  },
};

// TODO: Get the app specific config
const getConfig = (key) => defaultConfig[key] || {};

export default getConfig;
