const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");

const playwright = require("playwright");
const { PNG } = require("pngjs");
let pixelmatch = require("pixelmatch").default || require("pixelmatch");
let sharp = require("sharp");

const Question = require("../../../models/question");
const User = require("../../../models/User");
const getSolution = require("../../../controllers/questions/getSolution");

function mockRes() {
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
    }
  };
}

describe("getSolution controller", () => {

  let req;
  let res;

  let originalUserFind;
  let originalQFind;
  let originalLaunch;
  let originalPNGRead;
  let originalPixel;
  let originalSharp;
  let originalFetch;

  beforeEach(() => {

    res = mockRes();

    req = {
      body: {
        uid: "u1",
        title: "Flexbox Card",
        finalCode: "<div/>",
        target: "http://fake",
        htmlCode: "newHtml",
        cssCode: "newCss"
      }
    };

    originalUserFind = User.findOne;
    originalQFind = Question.findOne;
    originalLaunch = playwright.chromium.launch;
    originalPNGRead = PNG.sync.read;
    originalPixel = pixelmatch;
    originalSharp = sharp;
    originalFetch = global.fetch;

    // ---------- SUCCESS ENV MOCKS ----------

    global.fetch = async () => ({
      ok: true,
      arrayBuffer: async () => Buffer.from("target")
    });

    sharp = () => ({
      resize() { return this; },
      png() { return this; },
      toBuffer: async () => Buffer.from("resized")
    });

    PNG.sync.read = () => ({
      width: 10,
      height: 10,
      data: Buffer.alloc(100)
    });

    playwright.chromium.launch = async () => ({
      newPage: async () => ({
        setContent: async () => {},
        screenshot: async () => Buffer.from("shot")
      }),
      close: async () => {}
    });

  });

  afterEach(() => {
    User.findOne = originalUserFind;
    Question.findOne = originalQFind;
    playwright.chromium.launch = originalLaunch;
    PNG.sync.read = originalPNGRead;
    pixelmatch = originalPixel;
    sharp = originalSharp;
    global.fetch = originalFetch;
  });

  // ---------- VALIDATION ----------

  it("should return 400 when fields missing", async () => {

    req.body.finalCode = null;

    await getSolution(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.error, "Missing required fields");

  });

  // ---------- USER 404 ----------

  it("should return 404 when user not found", async () => {

    User.findOne = async () => null;

    await getSolution(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "User not found");

  });

  // ---------- QUESTION 404 ----------

  it("should return 404 when question not found", async () => {

    User.findOne = async () => ({
      solvedQuestions: [],
      save: async () => {}
    });

    Question.findOne = async () => null;

    await getSolution(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.error, "Question not found");

  });

  // ---------- EXISTING ENTRY HIGH % ----------

  it("should update existing entry and mark solved true when % >= 85", async () => {

    pixelmatch = () => 0; // 100%

    const fakeUser = {
      solvedQuestions: [
        {
          question: "q1",
          html_sol: "old",
          css_sol: "old",
          solved: false
        }
      ],
      saveCalled: false,
      save: async function () {
        this.saveCalled = true;
      }
    };

    User.findOne = async () => fakeUser;
    Question.findOne = async () => ({ _id: "q1" });

    await getSolution(req, res);

    assert.strictEqual(fakeUser.solvedQuestions[0].html_sol, "newHtml");
    assert.strictEqual(fakeUser.solvedQuestions[0].css_sol, "newCss");
    assert.strictEqual(fakeUser.solvedQuestions[0].solved, true);
    assert.strictEqual(fakeUser.saveCalled, true);
    assert.strictEqual(res.statusCode, 200);

  });

  // ---------- EXISTING ENTRY LOW % ----------

  it("should update existing entry but not force solved when % < 85", async () => {

    pixelmatch = () => 90; // low %

    const fakeUser = {
      solvedQuestions: [
        {
          question: "q1",
          html_sol: "old",
          css_sol: "old",
          solved: false
        }
      ],
      save: async () => {}
    };

    User.findOne = async () => fakeUser;
    Question.findOne = async () => ({ _id: "q1" });

    await getSolution(req, res);

    assert.strictEqual(fakeUser.solvedQuestions[0].html_sol, "newHtml");
    assert.strictEqual(fakeUser.solvedQuestions[0].solved, false);
    assert.strictEqual(res.statusCode, 200);

  });

  // ---------- NEW ENTRY HIGH % ----------

  it("should push new entry with solved true when % >= 85", async () => {

    pixelmatch = () => 0;

    const fakeUser = {
      solvedQuestions: [],
      save: async () => {}
    };

    User.findOne = async () => fakeUser;
    Question.findOne = async () => ({ _id: "q2" });

    await getSolution(req, res);

    assert.strictEqual(fakeUser.solvedQuestions.length, 1);
    assert.strictEqual(fakeUser.solvedQuestions[0].solved, true);
    assert.strictEqual(res.statusCode, 200);

  });

  // ---------- NEW ENTRY LOW % ----------

  it("should push new entry with solved false when % < 85", async () => {

    pixelmatch = () => 90;

    const fakeUser = {
      solvedQuestions: [],
      save: async () => {}
    };

    User.findOne = async () => fakeUser;
    Question.findOne = async () => ({ _id: "q3" });

    await getSolution(req, res);

    assert.strictEqual(fakeUser.solvedQuestions[0].solved, false);
    assert.strictEqual(res.statusCode, 200);

  });

  // ---------- FETCH FAIL → 500 ----------

  it("should return 500 when fetch fails", async () => {

    global.fetch = async () => ({ ok: false });

    User.findOne = async () => ({
      solvedQuestions: [],
      save: async () => {}
    });

    Question.findOne = async () => ({ _id: "q4" });

    await getSolution(req, res);

    assert.strictEqual(res.statusCode, 500);

  });

});