import dbClient from "../../table/NotesTable";
import send from "../../helpers/send";
import { DeleteCommand, DeleteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  ctx.callbackWaitsForEmptyEventLoop = false;

  console.log("[INFO] Event Object for delete note api", event);

  const id = event.pathParameters?.id;

  try {
    const params: DeleteCommand = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
      ConditionExpression: "attribute_exists(id)",
    });

    const res: DeleteCommandOutput = await dbClient.send(params);

    console.log("[INFO] Note deleted successfully: ", res);

    return send(
      200,
      JSON.stringify({
        message: `Note with id: ${id} has been deleted successfully`,
      })
    );
  } catch (error) {
    console.log("[ERROR] Error while deleting note: ", error);
    throw error;
  }
};
