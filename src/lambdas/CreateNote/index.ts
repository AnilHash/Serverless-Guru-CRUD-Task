import dbClient from "../../table/NotesTable";
import { v4 as uuidv4 } from "uuid";
import send from "../../helpers/send";
import { PutCommand, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  console.log("[INFO] Event Object for create note API", event);
  const data = JSON.parse(event.body as string);

  try {
    const params: PutCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        title: data.title,
        body: data.body,
      },
      ReturnValues: "ALL_OLD",
      ConditionExpression: "attribute_not_exists(id)",
    });

    const res: PutCommandOutput = await dbClient.send(params);

    console.log("[INFO] Note created successfully: ", res);

    return send(
      201,
      JSON.stringify({
        data: res.Attributes,
        message: "new Note has been created successfully",
      })
    );
  } catch (error) {
    console.log("[ERROR] Error while creating note: ", error);
    throw error;
  }
};
