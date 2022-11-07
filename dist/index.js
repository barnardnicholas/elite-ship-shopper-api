"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const search_1 = __importDefault(require("./controllers/search"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/search', (request, response) => {
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
