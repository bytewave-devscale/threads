"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const zod_1 = require("zod");
const threadRepository = __importStar(require("../repositories/thread.repository"));
const threadSchema = zod_1.z.object({
    authorId: zod_1.z.string(),
    title: zod_1.z.string().min(3),
    content: zod_1.z.string().min(3),
});
const threadUpdateSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3).optional(),
    content: zod_1.z.string().min(3).optional(),
})
    .strip();
function createThread(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // replace the author id from json with userId from auth
        data.authorId = data.authData.userId;
        // validate input using zod
        threadSchema.parse(data);
        const newThread = yield threadRepository.createThread(data);
        return newThread;
    });
}
function getOneThread(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const thread = yield threadRepository.getOneThread(threadId);
        if (!thread)
            throw new Error("thread not found");
        return thread;
    });
}
function getAllThread() {
    return __awaiter(this, void 0, void 0, function* () {
        const allThread = yield threadRepository.getAllThread();
        return allThread;
    });
}
function updateThread(threadId, threadData) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate input
        threadUpdateSchema.parse(threadData);
        const updatedThread = yield threadRepository.updateThread(threadId, threadData);
        if (!updatedThread)
            throw new Error("your thread not found");
        return updatedThread;
    });
}
function deleteThread(threadId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedThread = yield threadRepository.deleteThread(threadId, userId);
        if (!deletedThread)
            throw new Error("your thread not found");
        return deletedThread;
    });
}
