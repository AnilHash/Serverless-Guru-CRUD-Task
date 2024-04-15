import { makeHttpRequest } from "./util";

let TEST_NOTE_ID;

describe("When we invoke /notes endpoints", () => {
  it("Should create new note", async () => {
    const body = {
      title: "test Note 1",
      body: "test note here",
    };
    const res = await makeHttpRequest(`notes`, "POST", { body });

    expect(res.statusCode).toBe(201);
    expect(res.body).not.toBeNull();
  });

  it("Should get all notes", async () => {
    const res = await makeHttpRequest(`notes`, "GET", {});
    const testNote = res.body.data.Items.find((ele) =>
      ele.title.includes("test")
    );
    TEST_NOTE_ID = testNote.id;
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });

  it("Should update a note", async () => {
    const body = {
      title: "test Note 1 edited",
      body: "test note here edited",
    };

    const res = await makeHttpRequest(`notes/${TEST_NOTE_ID}`, "PUT", {
      body,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });

  it("Should get a note", async () => {
    const res = await makeHttpRequest(`notes/${TEST_NOTE_ID}`, "GET", {});

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });
  it("Should delete a note", async () => {
    const res = await makeHttpRequest(`notes/${TEST_NOTE_ID}`, "DELETE", {});

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });
});
