export const config = {
  API_PORT: 8000,
  BASE_URL: "http://192.168.0.176",

  get API_HOST() {
    return this.BASE_URL + ":" + this.API_PORT;
  },
};
