const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");

const uploadQuestion = require("../../../controllers/questions/uploadQuestion");
const Question = require("../../../models/question");

function createMockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
}

describe("uploadQuestion controller", () => {

  let originalCreate;

  beforeEach(() => {
    originalCreate = Question.create;
  });

  afterEach(() => {
    Question.create = originalCreate;
  });

  it("should return 400 when required field missing", async () => {

    const req = {
      body: {
        qNo: 1,
        // title missing
        difficulty: "Easy",
        description: "desc",
        colors: ["red"],
        imageUrl: "img.png",
      },
    };

    const res = createMockRes();

    await uploadQuestion(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.error, "All fields are required.");

  });

  it("should return 201 when question uploaded successfully", async () => {

    const req = {
      body: {
        qNo: 1,
        title: "Flexbox Card",
        difficulty: "Easy",
        description: "desc",
        colors: ["red"],
        imageUrl: "img.png",
      },
    };

    const res = createMockRes();

    let capturedPayload = null;

    Question.create = async (payload) => {
      capturedPayload = payload;
      return {
        save: async () => {}
      };
    };

    await uploadQuestion(req, res);

    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(
      res.body.message,
      "Question uploaded successfully."
    );

    assert.deepStrictEqual(capturedPayload, req.body);

  });

  it("should return 500 when DB create throws error", async () => {

    const req = {
      body: {
        qNo: 1,
        title: "Flexbox Card",
        difficulty: "Easy",
        description: "desc",
        colors: ["red"],
        imageUrl: "img.png",
      },
    };

    const res = createMockRes();

    Question.create = async () => {
      throw new Error("DB Down");
    };

    await uploadQuestion(req, res);

    assert.strictEqual(res.statusCode, 500);
    assert.strictEqual(
      res.body.error,
      "Server error. Try again later."
    );

  });

});