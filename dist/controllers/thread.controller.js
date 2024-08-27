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
exports.handleCreateThread = handleCreateThread;
exports.handleGetOneThread = handleGetOneThread;
exports.handleGetAllThread = handleGetAllThread;
exports.handleUpdateThread = handleUpdateThread;
exports.handleDeleteThread = handleDeleteThread;
const threadService = __importStar(require("../services/thread.service"));
const zod_1 = require("zod");
function handleCreateThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newThread = yield threadService.createThread(req.body);
            res.status(201).json({
                message: "thread created succesfully",
                thread: newThread,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({
                    message: "create thread failed",
                    error: error.issues[0].message,
                });
            }
            else {
                res.status(500).json({
                    message: "update thread failed",
                    error,
                });
            }
        }
    });
}
function handleGetOneThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const threadId = req.params.threadId;
        try {
            const thread = yield threadService.getOneThread(threadId);
            res.status(200).json({ thread });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    });
}
function handleGetAllThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allThread = yield threadService.getAllThread();
            return res.status(200).json({ threads: allThread });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    });
}
function handleUpdateThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const threadId = req.params.threadId;
        try {
            const updatedThread = yield threadService.updateThread(threadId, req.body);
            res.status(201).json({ thread: updatedThread });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({
                    message: "update thread failed",
                    error: error.issues[0].message,
                });
            }
            else if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: "update thread failed", error: error.message });
            }
        }
    });
}
function handleDeleteThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const threadId = req.params.threadId;
        const userId = req.body.authData.userId;
        try {
            const deletedThread = yield threadService.deleteThread(threadId, userId);
            res
                .status(201)
                .json({ message: "thread deleted successfully", thread: deletedThread });
        }
        catch (error) {
            if (error instanceof Error) {
                res
                    .status(400)
                    .json({ message: "delete thread failed", error: error.message });
            }
        }
    });
}
