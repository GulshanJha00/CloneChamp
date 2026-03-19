const { test, describe, mock, it, afterEach } = require("node:test");
const assert = require("node:assert");
const getCode = require("../../../controllers/questions/getCode");
const User = require("../../../models/User");
const question = require("../../../models/question");

function mockData() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(msg) {
      this.body = msg;
      return this;
    },
  };
}


describe("getCode", () => {
  let orgFunc;
  afterEach(() => {
    User.findOne = orgFunc;
  });
  it("Checks for uid and qn_id", async () => {
    const req = {
      body: {},
    };
    const res = mockData();
    await getCode(req, res);
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.error, "Question Not Found");
  });
  it("should return 404 when user not found", async () => {
    const req = { body: { uid: 1, qn_id: 1 } };
    const res = mockData();

    const orgUser = User.findOne;

    User.findOne = async () => null;

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "User not found");

    User.findOne = orgUser;
  });
  it("should return 404 when question not found", async () => {
    const req = { body: { uid: 1, qn_id: 1 } };
    const res = mockData();

    const orgUser = User.findOne;
    const orgQ = question.findOne;

    User.findOne = async () => ({ solvedQuestions: [] });

    question.findOne = async () => null;

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "Question not found");

    User.findOne = orgUser;
    question.findOne = orgQ;
  });

  it("should return 200 when completed", async () => {
    const req = { body: { uid: 1, qn_id: 1 } };
    const res = mockData();

    orgFunc = User.findOne;
    const orgQ = question.findOne;

    User.findOne = async () => ({ solvedQuestions: [
       {
         question: 1,
         html_sol: "this is html",
         css_sol: "this is css"
      }
    ] });

    question.findOne = async () => {
      return { _id: 1 };
    };

    await getCode(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.html_sol, "this is html");
    assert.strictEqual(res.body.css_sol, "this is css");

    question.findOne = orgQ;
  });
});
