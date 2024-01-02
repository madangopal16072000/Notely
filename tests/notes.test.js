const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index.js");
require("dotenv").config();

//connecting database
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

describe("GET /api/v1/notes/user", () => {
  it("should return all notes for a particular user", async () => {
    const res = await request(app)
      .get("/api/v1/notes/user")
      .set(
        "Cookie",
        "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzMjNhOTU1NDNlMThlNzlkNDhmMDUiLCJuYW1lIjoibWFkYW4iLCJlbWFpbCI6Im1hZGFuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDFUMjA6NDE6MTMuNjk3WiIsIm1vZGlmaWVkQXQiOiIyMDI0LTAxLTAxVDIxOjEyOjM4LjEyNloiLCJfX3YiOjAsImlhdCI6MTcwNDE4MDExNiwiZXhwIjoxNzA0MjY2NTE2fQ.b1HB1tkQiTCF6S99reKh18RwjwICRvVgWsA6wBL_bvc; Path=/; HttpOnly; Expires=Tue, 02 Jan 2024 08:21:56 GMT;"
      );
    expect(res.statusCode).toBe(200);
    expect(res.body.notes.length).toBeGreaterThan(0);
    expect(res.body.status).toBe("success");
  });
});

describe("GET /api/v1/notes/:noteId", () => {
  it("should return a note", async () => {
    const noteId = "6593befb58cd16d0eefc00af";
    const res = await request(app)
      .get(`/api/v1/notes/${noteId}`)
      .set(
        "Cookie",
        "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzMjNhOTU1NDNlMThlNzlkNDhmMDUiLCJuYW1lIjoibWFkYW4iLCJlbWFpbCI6Im1hZGFuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDFUMjA6NDE6MTMuNjk3WiIsIm1vZGlmaWVkQXQiOiIyMDI0LTAxLTAxVDIxOjEyOjM4LjEyNloiLCJfX3YiOjAsImlhdCI6MTcwNDE4MDExNiwiZXhwIjoxNzA0MjY2NTE2fQ.b1HB1tkQiTCF6S99reKh18RwjwICRvVgWsA6wBL_bvc; Path=/; HttpOnly; Expires=Tue, 02 Jan 2024 08:21:56 GMT;"
      );

    expect(res.statusCode).toBe(200);
    expect(res.body.note._id).toBe(noteId);
    expect(res.body.status).toBe("success");
  });
});

describe("POST /api/v1/notes/create", () => {
  it("should create a note", async () => {
    const cookieValue =
      "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzMjNhOTU1NDNlMThlNzlkNDhmMDUiLCJuYW1lIjoibWFkYW4iLCJlbWFpbCI6Im1hZGFuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDFUMjA6NDE6MTMuNjk3WiIsIm1vZGlmaWVkQXQiOiIyMDI0LTAxLTAxVDIxOjEyOjM4LjEyNloiLCJfX3YiOjAsImlhdCI6MTcwNDE4MDExNiwiZXhwIjoxNzA0MjY2NTE2fQ.b1HB1tkQiTCF6S99reKh18RwjwICRvVgWsA6wBL_bvc; Path=/; HttpOnly; Expires=Tue, 02 Jan 2024 08:21:56 GMT;";
    const res = await request(app)
      .post("/api/v1/notes/create")
      .set("Cookie", cookieValue)
      .send({
        title: "Black Panther",
        content: "Hero of Wakanda",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.note).toEqual(expect.any(Object));
    expect(res.body.status).toBe("success");
  });
});

describe("PATCH /api/v1/notes/notedId", () => {
  it("should update a note", async () => {
    const cookieValue =
      "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzMjNhOTU1NDNlMThlNzlkNDhmMDUiLCJuYW1lIjoibWFkYW4iLCJlbWFpbCI6Im1hZGFuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDFUMjA6NDE6MTMuNjk3WiIsIm1vZGlmaWVkQXQiOiIyMDI0LTAxLTAxVDIxOjEyOjM4LjEyNloiLCJfX3YiOjAsImlhdCI6MTcwNDE4MDExNiwiZXhwIjoxNzA0MjY2NTE2fQ.b1HB1tkQiTCF6S99reKh18RwjwICRvVgWsA6wBL_bvc; Path=/; HttpOnly; Expires=Tue, 02 Jan 2024 08:21:56 GMT;";
    const noteId = "6593befb58cd16d0eefc00af";
    const res = await request(app)
      .patch(`/api/v1/notes/${noteId}`)
      .set("Cookie", cookieValue)
      .send({
        title: "Saktimaan: Indian Superhero",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.note._id).toBe(noteId);
    expect(res.body.status).toBe("success");
  });
});

describe("DELETE /api/v1/notes/noteId", () => {
  it("should delete a note", async () => {
    const cookieValue =
      "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzMjNhOTU1NDNlMThlNzlkNDhmMDUiLCJuYW1lIjoibWFkYW4iLCJlbWFpbCI6Im1hZGFuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDFUMjA6NDE6MTMuNjk3WiIsIm1vZGlmaWVkQXQiOiIyMDI0LTAxLTAxVDIxOjEyOjM4LjEyNloiLCJfX3YiOjAsImlhdCI6MTcwNDE4MDExNiwiZXhwIjoxNzA0MjY2NTE2fQ.b1HB1tkQiTCF6S99reKh18RwjwICRvVgWsA6wBL_bvc; Path=/; HttpOnly; Expires=Tue, 02 Jan 2024 08:21:56 GMT;";
    const noteId = "6593befb58cd16d0eefc00af";
    const res = await request(app)
      .delete(`/api/v1/notes/${noteId}`)
      .set("Cookie", cookieValue);

    expect(res.statusCode).toBe(200);
    expect(res.body.note._id).toBe(noteId);
    expect(res.body.status).toBe("success");
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
