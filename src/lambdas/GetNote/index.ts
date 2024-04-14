import dbClient from "../../table/NotesTable";
import send from "../../helpers/send";
import { GetCommand, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  // Configure Lambda to not wait for the event loop to be empty
  ctx.callbackWaitsForEmptyEventLoop = false;

  console.log("[INFO] event object for get note api", event);

  const id = event.pathParameters?.id;

  try {
    // Create parameters for retrieving an item from the DynamoDB table
    const params: GetCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    });

    const res: GetCommandOutput = await dbClient.send(params);

    console.log("[INFO] Got the note", res);

    return send(
      200,
      JSON.stringify({
        data: res.Item,
      })
    );
  } catch (error) {
    console.log("[ERROR] Error while getting a note", error);
    throw error;
  }
};
