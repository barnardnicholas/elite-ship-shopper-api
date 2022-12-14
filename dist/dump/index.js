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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const search_1 = __importDefault(require("../controllers/search"));
exports.test = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send(`The body is equal to '${JSON.stringify(request.body)}'`);
});
// http://localhost:5001/elite-ship-shopper/us-central1/test
// http://elite-ship-shopper.web.app/elite-ship-shopper/us-central1/test
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from Firebase!');
});
exports.search = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Bad request');
    }
    const { modules = [], range = 20, startCoords = { x: 0, y: 0, z: 0 }, liveFetch = false, } = request.body;
    (0, search_1.default)({ modules, range, startCoords, liveFetch })
        .then((responseData) => {
        response.status(200).send(responseData);
    })
        .catch((error) => {
        console.log(error);
        response.status(500).send(error);
    });
});
// http://localhost:5001/elite-ship-shopper/us-central1/search
// http://elite-ship-shopper.web.app/elite-ship-shopper/us-central1/search
