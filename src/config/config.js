export const config = {
  API_PORT: 8000,
  BASE_URL: "http://localhost",

  get API_HOST() {
    return this.BASE_URL + ":" + this.API_PORT;
  },
};
