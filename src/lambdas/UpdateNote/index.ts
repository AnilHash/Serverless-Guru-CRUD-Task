import dbClient from "../../table/NotesTable";
import send from "../../helpers/send";
import { UpdateCommand, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";

const TABLE_NAME = process.env.NOTES_TABLE;

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  ctx: Context
) => {
  // Configure Lambda to not wait for the event loop to be empty
  ctx.callbackWaitsForEmptyEventLoop = false;

  console.log("[INFO] event object for update note api", event);

  // Extract the note ID from the request path parameters
  const id = event.pathParameters?.id;

  // Parse the JSON data from the request body
  const data = JSON.parse(event.body as string);

  try {
    // Create parameters for updating an item in the DynamoDB table
    const params: UpdateCommand = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression: "set #title = :title, #body = :body", // Define the update expression
      ExpressionAttributeNames: {
        "#title": "title", // Define the expression attribute name for the title
        "#body": "body", // Define the expression attribute name for the body
      },
      ExpressionAttributeValues: {
        ":title": data.title, // Set the title value
        ":body": data.body, // Set the body value
      },
      ConditionExpression: "attribute_exists(id)", // Ensure the ID attribute exists before updating
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
    console.log("[ERROR] Error occurred while updating note", error);
    throw error;
  }
};
