const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");

const getCode = require("../../../controllers/questions/getCode");
const User = require("../../../models/User");
const Ques = require("../../../models/question");

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

describe("getCode controller", () => {

  let originalUserFind;
  let originalQuesFind;

  beforeEach(() => {
    originalUserFind = User.findOne;
    originalQuesFind = Ques.findOne;
  });

  afterEach(() => {
    User.findOne = originalUserFind;
    Ques.findOne = originalQuesFind;
  });

  it("should return 400 when uid or qn_id missing", async () => {

    const req = { body: {} };
    const res = createMockRes();

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.error, "Question Not Found");

  });

  it("should return 404 when user not found", async () => {

    const req = { body: { uid: 1, qn_id: 1 } };
    const res = createMockRes();

    User.findOne = async () => null;

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "User not found");

  });

  it("should return 404 when question not found", async () => {

    const req = { body: { uid: 1, qn_id: 1 } };
    const res = createMockRes();

    User.findOne = async () => ({ solvedQuestions: [] });
    Ques.findOne = async () => null;

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "Question not found");

  });

  it("should return 200 with solution when user has solved question", async () => {

    const req = { body: { uid: 1, qn_id: 1 } };
    const res = createMockRes();

    User.findOne = async () => ({
      solvedQuestions: [
        {
          question: 1,
          html_sol: "this is html",
          css_sol: "this is css",
        },
      ],
    });

    Ques.findOne = async () => ({ _id: 1 });

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.html_sol, "this is html");
    assert.strictEqual(res.body.css_sol, "this is css");

  });

});