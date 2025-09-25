import simpleRestProvider from "@refinedev/simple-rest";

const API_URL = "http://localhost:5001/api";

export const dataProvider = simpleRestProvider(API_URL);
