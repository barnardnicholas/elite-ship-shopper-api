import axios from 'axios';
import { EDDBStation, EDDBSystem } from '../types/eddb';
import { EDSMSystem, EDSMSystemWithID } from '../types/edsm';
import { Coords, Itinerary, Station, System } from '../types/internal';

import { fetchLivePopulatedSystems, fetchLiveOutfittingStations } from './fetches';

interface FetchShoppingListBody {
  modules: number[];
  range: number;
  startCoords: Coords;
  liveFetch: boolean;
}

const fetchShoppingList = async (body: FetchShoppingListBody) => {
  const { modules = [], range = 20, startCoords = { x: 0, y: 0, z: 0 }, liveFetch = false } = body;
  const { x, y, z } = startCoords;

  // try {
  const populatedSystems = liveFetch ? await fetchLivePopulatedSystems() : [];
  const { data: sphereSystems } = await axios.get<EDSMSystem[]>(
    `https://www.edsm.net/api-v1/sphere-systems?x=${x}&y=${y}&z=${z}&radius=${range}`,
  );
  const outfittingStations = liveFetch ? await fetchLiveOutfittingStations() : [];

  const filteredOutfittingStations = outfittingStations.filter(
    ({ selling_modules }: EDDBStation) => !!selling_modules.length,
  );

  console.log(`Fetched ${sphereSystems.length} systems from EDSM`);

  const sortedSystems: EDSMSystem[] = sphereSystems.sort((a, b) => {
    return a.distance - b.distance;
  }); // Sort by distance

  const sortedSystemsWithIDs: (EDSMSystemWithID | null)[] = sortedSystems
    .map((system: EDSMSystem) => {
      const systemInfo = populatedSystems.find(
        (pSystem: EDDBSystem) =>
          pSystem.name.toLowerCase().trim() === system.name.toLowerCase().trim(),
      );
      if (!systemInfo) return null;
      else {
        const { id } = systemInfo;
        return { ...system, id } as EDSMSystemWithID;
      }
    })
    .filter((system) => !!system); // Add IDs from EDDB

  console.log(`Matched ${sortedSystemsWithIDs.length} populated systems`);

  const systemsWithStations: System[] = (sortedSystemsWithIDs as EDSMSystemWithID[]).map(
    (system: EDSMSystemWithID) => {
      const eligibleStations: Station[] = filteredOutfittingStations
        .filter((station: EDDBStation) => station.system_id === system.id)
        .map(({ id, name, distance_to_star, selling_modules }: EDDBStation) => ({
          id,
          name,
          distance_to_star,
          modules: selling_modules,
        }));
      return {
        ...system,
        stations: eligibleStations.sort(
          (a: Station, b: Station) => a.distance_to_star - b.distance_to_star,
        ),
      };
    },
  );
  console.log(`Compiled stations lists`);

  const shoppingListRef: number[] = [...modules];
  const itinerary: Itinerary = {};

  console.log('Compiling shopping list...');

  while (shoppingListRef.length) {
    const thisItem = shoppingListRef.shift() as number;
    let addedThisItem = false;

    systemsWithStations.forEach((system: System) => {
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
          } else if (
            !itinerary[system.id].stations.some((iStation) => iStation.id === station.id)
          ) {
            // System is in itinerary but station isn't
            addedThisItem = true;
            itinerary[system.id].stations.push({
              id: station.id,
              name: station.name,
              distance_to_star: station.distance_to_star,
              modules: [thisItem],
            });
          } else {
            // System and station are present
            addedThisItem = true;
            const thisIStation = itinerary[system.id].stations.find(
              (iStation) => iStation.id === station.id,
            );
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
};

export default fetchShoppingList;
