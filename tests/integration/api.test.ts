import {
  invoke_createNote,
  invoke_deleteNote,
  invoke_getAllNotes,
  invoke_getNote,
  invoke_updateNote,
} from "./util";

let TEST_NOTE_ID;

describe("When we invoke /notes endpoints", () => {
  it("Should create new note", async () => {
    const body = {
      title: "test Note 1",
      body: "test note here",
    };
    const res = await invoke_createNote(`notes`, { body });

    expect(res.statusCode).toBe(201);
    expect(res.body).not.toBeNull();
  });

  it("Should get all notes", async () => {
    const res = await invoke_getAllNotes(`notes`, {});
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

    const res = await invoke_updateNote(`notes/${TEST_NOTE_ID}`, { body });

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });

  it("Should get a note", async () => {
    const res = await invoke_getNote(`notes/${TEST_NOTE_ID}`, {});

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });
  it("Should delete a note", async () => {
    const res = await invoke_deleteNote(`notes/${TEST_NOTE_ID}`, {});

    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });
});
