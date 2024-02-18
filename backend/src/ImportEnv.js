"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
function importEnv() {
    const envPath = path_1.default.resolve(__dirname, "./../", ".env");
    dotenv_1.default.config({ path: envPath });
}
exports.default = importEnv;
