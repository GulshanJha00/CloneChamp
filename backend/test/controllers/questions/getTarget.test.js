const { describe, it, beforeEach, afterEach, mock } = require("node:test");
const assert = require("node:assert");
const question = require("../../../models/question");
const getTarget = require("../../../controllers/questions/getTarget");

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

describe('GetTarget', () => {
    let orgFunc
    let req
    let res
    beforeEach(()=>{
        req = {
            body: {
                title: "This is title"
            }
        }
        orgFunc = question.find
        res = mockData();
    })
    afterEach(()=>{
        question.find = orgFunc
    })
  it("Return 200 when getTarget gets Success",async()=>{
    const fake = [{ title: "fake" }];
    question.find = async () =>{
        return fake
    }
    await getTarget(req,res)
    assert.strictEqual(res.statusCode,200)
    assert.deepStrictEqual(res.body, fake);
  })

  it("Return 500 when faced Error",async()=>{
    question.find = async () =>{
        throw new Error("DB down");

    }
    await getTarget(req,res)
    assert.strictEqual(res.statusCode,500)
     assert.strictEqual(res.body.error,"Failed to fetch questions.");
  })
})
