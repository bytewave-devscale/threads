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
exports.authMiddleware = authMiddleware;
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.body.tokens;
            const authResponse = yield fetch(`${process.env.API_URI}/api/v1/auth/authorize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken, refreshToken }),
            });
            const authData = yield authResponse.json();
            if (authData.error) {
                return res.status(401).json({ error: authData.error });
            }
            req.body.authData = authData;
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ error: "authorization failed" });
            }
        }
    });
}
