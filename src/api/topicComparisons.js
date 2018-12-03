import * as apiData from "../mock";

export function get() {
  return Promise.resolve({ data: { ...apiData } });
}
