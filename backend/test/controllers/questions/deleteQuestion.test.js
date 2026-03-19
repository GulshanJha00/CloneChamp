const { test, describe, mock, it, afterEach } = require("node:test");
const deleteQuestion = require("../../../controllers/questions/deleteQuestion");
const QuestionSchema = require("../../../models/question");
const assert = require("node:assert");

function mockData(){
    return{
        statusCode: null,
        body: null,
        status(code){
            this.statusCode = code
            return this
        },
        json(msg){
            this.body = msg
            return this
        }
    }
}
let OrgFunc;
describe("Delete Questions", () => {
     afterEach(()=>{
     QuestionSchema.findOneAndDelete = OrgFunc;
  });
    it("should return 200 when question deleted", async () => {
        OrgFunc = QuestionSchema.findOneAndDelete
        const req = {
            params: {id:1}
        }
        const res = mockData();
        let queryNum = null

        QuestionSchema.findOneAndDelete = async (query)=>{
            queryNum = query
            return {qNo:req.params.id}
        }
        await deleteQuestion(req,res);
        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(queryNum,{qNo:1})
        assert.strictEqual(res.body.message, "Question deleted successfully.")

    });
    it("should return 404 when question not found",async () =>{
        OrgFunc = QuestionSchema.findOneAndDelete
        const req = {
            params: {id:1}
        }
        const res = mockData()
        QuestionSchema.findOneAndDelete = async () =>{
            return null
        }
        await deleteQuestion(req,res);
        assert.strictEqual(res.statusCode, 404)
        assert.strictEqual(res.body.message, "Question not found.")

    })

    it("should return 500 when thrown error",async () =>{
        OrgFunc = QuestionSchema.findOneAndDelete
        const req = {
            params: {id:1}
        }
        const res = mockData()
        QuestionSchema.findOneAndDelete = async () =>{
            throw new Error("DB is down")
        }
        await deleteQuestion(req,res);
        assert.strictEqual(res.statusCode, 500)
        assert.strictEqual(res.body.message, "Server error while deleting question.")
    })
});
