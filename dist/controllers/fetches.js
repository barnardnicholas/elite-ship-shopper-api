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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLiveOutfittingStations = exports.fetchLivePopulatedSystems = exports.fetchLiveModules = void 0;
const axios_1 = __importDefault(require("axios"));
// const fs = require('fs');
// const path = require('path')
// const dataPath = path.join(process.cwd(), '/data');
const fetchLiveModules = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get('https://eddb.io/archive/v6/modules.json');
    return data;
});
exports.fetchLiveModules = fetchLiveModules;
// export const fetchCachedModules = async () => {
//   const modulesRaw = fs.readFileSync(`${dataPath}/modules.json`);
//   return JSON.parse(modulesRaw);
// }
const fetchLivePopulatedSystems = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ axios: axios_1.default });
    const { data } = yield axios_1.default.get('https://eddb.io/archive/v6/systems_populated.json');
    return data;
});
exports.fetchLivePopulatedSystems = fetchLivePopulatedSystems;
// export const fetchCachedPopulatedSystems = () => {
//   const populatedSystemsRaw = fs.readFileSync(`${dataPath}/populatedSystems.json`);
//   return JSON.parse(populatedSystemsRaw); // array of objects
// }
const fetchLiveOutfittingStations = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get('https://eddb.io/archive/v6/stations.json');
    return data.filter((station) => !!station.has_outfitting);
});
exports.fetchLiveOutfittingStations = fetchLiveOutfittingStations;
// export const fetchCachedOutfittingStations = () => {
//   const outfittingStations = fs.readFileSync(`${dataPath}/outfittingStations.json`);
//   return JSON.parse(outfittingStations); // array of objects
// }
