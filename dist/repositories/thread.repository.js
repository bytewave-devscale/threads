"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThread = createThread;
exports.getOneThread = getOneThread;
exports.getAllThread = getAllThread;
exports.updateThread = updateThread;
exports.deleteThread = deleteThread;
const mongoose_1 = require("mongoose");
const threadSchema = new mongoose_1.Schema({
    authorId: String,
    title: String,
    content: String,
});
const Thread = (0, mongoose_1.model)("Thread", threadSchema);
function createThread(threadData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newThread = yield new Thread(threadData).save();
        return newThread;
    });
}
function getOneThread(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const thread = yield Thread.findById(threadId);
        return thread;
    });
}
function getAllThread() {
    return __awaiter(this, void 0, void 0, function* () {
        const allThread = yield Thread.find();
        return allThread;
    });
}
function updateThread(threadId, threadData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedThread = yield Thread.findOneAndUpdate({ _id: threadId, authorId: threadData.authData.userId }, threadData, {
            new: true,
        });
        return updatedThread;
    });
}
function deleteThread(threadId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedThread = yield Thread.findOneAndDelete({ _id: threadId, authorId: userId });
        return deletedThread;
    });
}
