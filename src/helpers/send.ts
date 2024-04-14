const send = (statusCode: number, body: string) => {
  return {
    statusCode,
    body,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "*",
    },
  };
};

export default send;
