const { describe, it, beforeEach, afterEach, mock } = require("node:test");
const assert = require("node:assert");

const question = require("../../../models/question");
const getQuestion = require("../../../controllers/questions/getQuestion");

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
describe("GetQuestion", () => {
  let qnSchema = null;
  let res = null;
  beforeEach(() => {
    res = mockData();
    qnSchema = question.find;
  });
  afterEach(() => {
    question.find = qnSchema;
  });
  it("return 200 status when executed", async () => {
    const fakeData = [{ qNo: 1 }];

    question.find = () => ({
      lean: async () => fakeData,
    });

    const res = mockData();

    await getQuestion({}, res);

    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, fakeData);
  });


  it("return 500 status when executed", async () => {
    question.find = () => ({
      lean: async () => {
        throw new Error("DB down");
      },
    });
    await getQuestion({}, res);
    assert.strictEqual(res.statusCode, 500);
    assert.strictEqual(res.body.error, "Failed to fetch questions.");
  });
});
