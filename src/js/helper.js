import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    if (!response.ok) throw new Error(`Issue in recieving data.`);
    const { data } = await response.json();

    return data;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};
