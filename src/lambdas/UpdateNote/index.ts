import dbClient from "../../table/NotesTable";
import send from "../../helpers/send";
import { UpdateCommand, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;

  console.log("[INFO] event object for update note api", event);

  const id = event.pathParameters?.id;
  const data = JSON.parse(event.body as string);

  try {
    const params: UpdateCommand = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression: "set #title = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(id)",
    });

    const res: UpdateCommandOutput = await dbClient.send(params);

    console.log("[INFO] Note updated", res);

    return send(
      200,
      JSON.stringify({
        data: res,
        message: `Note with id: ${id} has been updated successfully`,
      })
    );
  } catch (error) {
    console.log("[ERROR] Error occured while updating note", error);
    throw error;
  }
};
