const TPromise = require("promise");
const agent = require("superagent-promise")(require("superagent"), TPromise);
const _ = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

export const makeHttpRequest = async (path, method, options) => {
  const root = process.env.TEST_ROOT_URL;
  const url = `${root}${path}`;
  const httpReq = agent(method, url);

  const body = _.get(options, "body");
  console.log(`invoking HTTP ${method} - ${url}`);
  try {
    if (body) {
      httpReq.send(body);
    }
    const res = await httpReq;
    return {
      statusCode: res.status,
      body: res.body,
    };
  } catch (error) {
    return {
      statusCode: error.status,
      body: null,
    };
  }
};
