import send from "../../src/helpers/send";

describe("Unit test cases for send function", () => {
  it("Returns value successfully", () => {
    const testString = "This is a test";
    const res = send(200, testString);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(testString);
  });
});
