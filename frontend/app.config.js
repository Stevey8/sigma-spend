// frontend/app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'SigmaSpend',
    slug: 'SigmaSpend',
    extra: {
      API_PORT: process.env.PORT || '5000', // load from ../.env
    },
  },
};
