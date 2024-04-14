import dbClient from "../../table/NotesTable";
import send from "../../helpers/send";
import { ScanCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  console.log("[INFO] Event object for get all notes API", event);
  try {
    const params: ScanCommand = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const result: ScanCommandOutput = await dbClient.send(params);

    console.log("[INFO] All notes are here", result);
    return send(
      200,
      JSON.stringify({
        data: result,
      })
    );
  } catch (error) {
    console.log("[ERROR] Error while scanning note table", error);
    throw error;
  }
};
