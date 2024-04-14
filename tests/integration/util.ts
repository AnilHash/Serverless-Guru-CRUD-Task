const TPromise = require("promise");
const agent = require("superagent-promise")(require("superagent"), TPromise);
const _ = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

const makeHttpRequest = async (path, method, options) => {
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

export const invoke_createNote = async (path, options) => {
  //Make an HTTP call
  const response = await makeHttpRequest(path, "POST", options);
  return response;
};

export const invoke_getAllNotes = (path, options) => {
  //Make an HTTP call
  const response = makeHttpRequest(path, "GET", options);
  return response;
};

export const invoke_updateNote = (path, options) => {
  //Make an HTTP call
  const response = makeHttpRequest(path, "PUT", options);
  return response;
};
export const invoke_getNote = (path, options) => {
  //Make an HTTP call
  const response = makeHttpRequest(path, "GET", options);
  return response;
};
export const invoke_deleteNote = (path, options) => {
  //Make an HTTP call
  const response = makeHttpRequest(path, "DELETE", options);
  return response;
};
