import simpleRestProvider from "@refinedev/simple-rest";
import { API_URL } from "./../config";

export const dataProvider = simpleRestProvider(API_URL);
