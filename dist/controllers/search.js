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
const axios_1 = __importDefault(require("axios"));
const fetches_1 = require("./fetches");
const fetchShoppingList = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { modules = [], range = 20, startCoords = { x: 0, y: 0, z: 0 }, liveFetch = false } = body;
    const { x, y, z } = startCoords;
    // try {
    const populatedSystems = liveFetch ? yield (0, fetches_1.fetchLivePopulatedSystems)() : [];
    const { data: sphereSystems } = yield axios_1.default.get(`https://www.edsm.net/api-v1/sphere-systems?x=${x}&y=${y}&z=${z}&radius=${range}`);
    const outfittingStations = liveFetch ? yield (0, fetches_1.fetchLiveOutfittingStations)() : [];
    const filteredOutfittingStations = outfittingStations.filter(({ selling_modules }) => !!selling_modules.length);
    console.log(`Fetched ${sphereSystems.length} systems from EDSM`);
    const sortedSystems = sphereSystems.sort((a, b) => {
        return a.distance - b.distance;
    }); // Sort by distance
    const sortedSystemsWithIDs = sortedSystems
        .map((system) => {
        const systemInfo = populatedSystems.find((pSystem) => pSystem.name.toLowerCase().trim() === system.name.toLowerCase().trim());
        if (!systemInfo)
            return null;
        else {
            const { id } = systemInfo;
            return Object.assign(Object.assign({}, system), { id });
        }
    })
        .filter((system) => !!system); // Add IDs from EDDB
    console.log(`Matched ${sortedSystemsWithIDs.length} populated systems`);
    const systemsWithStations = sortedSystemsWithIDs.map((system) => {
        const eligibleStations = filteredOutfittingStations
            .filter((station) => station.system_id === system.id)
            .map(({ id, name, distance_to_star, selling_modules }) => ({
            id,
            name,
            distance_to_star,
            modules: selling_modules,
        }));
        return Object.assign(Object.assign({}, system), { stations: eligibleStations.sort((a, b) => a.distance_to_star - b.distance_to_star) });
    });
    console.log(`Compiled stations lists`);
    const shoppingListRef = [...modules];
    const itinerary = {};
    console.log('Compiling shopping list...');
    while (shoppingListRef.length) {
        const thisItem = shoppingListRef.shift();
        let addedThisItem = false;
        systemsWithStations.forEach((system) => {
            system.stations.forEach((station) => {
                if (station.modules.includes(thisItem) && !addedThisItem) {
                    // Add to itinerary
                    if (!itinerary.hasOwnProperty(system.id)) {
                        // System isn't in itinerary yet
                        addedThisItem = true;
                        itinerary[system.id] = {
                            id: system.id,
                            name: system.name,
                            distance: system.distance,
                            stations: [
                                {
                                    id: station.id,
                                    name: station.name,
                                    distance_to_star: station.distance_to_star,
                                    modules: [thisItem],
                                },
                            ],
                        };
                    }
                    else if (!itinerary[system.id].stations.some((iStation) => iStation.id === station.id)) {
                        // System is in itinerary but station isn't
                        addedThisItem = true;
                        itinerary[system.id].stations.push({
                            id: station.id,
                            name: station.name,
                            distance_to_star: station.distance_to_star,
                            modules: [thisItem],
                        });
                    }
                    else {
                        // System and station are present
                        addedThisItem = true;
                        const thisIStation = itinerary[system.id].stations.find((iStation) => iStation.id === station.id);
                        if (!!thisIStation && !thisIStation.modules.includes(thisItem))
                            thisIStation.modules.push(thisItem);
                    }
                }
            });
        });
    }
    console.log(`Compiled ${Object.keys(itinerary).length} systems`);
    return itinerary;
    // } catch (e) {
    //   console.warn(e);
    //   return {};
    // }
});
exports.default = fetchShoppingList;
