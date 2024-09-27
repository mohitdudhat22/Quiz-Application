import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [QuestionSchema],
});
QuizSchema.plugin(mongooseAggregatePaginate);  //added aggreation plugin

export default mongoose.model('Quiz', QuizSchema);