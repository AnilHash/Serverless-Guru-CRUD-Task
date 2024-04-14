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
  // Configure Lambda to not wait for the event loop to be empty
  ctx.callbackWaitsForEmptyEventLoop = false;

  console.log("[INFO] Event Object for create note API", event);

  // Parse the JSON data from the request body
  const data = JSON.parse(event.body as string);

  try {
    // Create parameters for putting an item into the DynamoDB table
    const params: PutCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(), // Generate a unique ID for the note
        title: data.title,
        body: data.body,
      },
      ReturnValues: "ALL_OLD", // Return old attribute values if they exist
      ConditionExpression: "attribute_not_exists(id)", // Ensure the ID attribute doesn't already exist
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
