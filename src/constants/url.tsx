export default {
  isProduction: false,

  get base() {
    const prefix = this.isProduction
      ? 'http://localhost:8080'
      : 'robin.foodbite.com.my';
    return prefix;
  },

  get API() {
    return this.base + '/api';
  },

  get termsAndConditions() {
    return this.base + '/docs/public/terms-of-use';
  },

  get privacyNotice() {
    return this.base + '/docs/public/privacy';
  },
};
