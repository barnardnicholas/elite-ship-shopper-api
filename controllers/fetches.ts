import axios from 'axios';
import { EDDBModule, EDDBStation, EDDBSystem } from '../types/eddb';
// const fs = require('fs');
// const path = require('path')
// const dataPath = path.join(process.cwd(), '/data');

export const fetchLiveModules = async () => {
  const { data } = await axios.get<EDDBModule[]>('https://eddb.io/archive/v6/modules.json');
  return data;
};
// export const fetchCachedModules = async () => {
//   const modulesRaw = fs.readFileSync(`${dataPath}/modules.json`);
//   return JSON.parse(modulesRaw);
// }
export const fetchLivePopulatedSystems = async () => {
  console.log({ axios });
  const { data } = await axios.get<EDDBSystem[]>(
    'https://eddb.io/archive/v6/systems_populated.json',
  );
  return data;
};
// export const fetchCachedPopulatedSystems = () => {
//   const populatedSystemsRaw = fs.readFileSync(`${dataPath}/populatedSystems.json`);
//   return JSON.parse(populatedSystemsRaw); // array of objects
// }
export const fetchLiveOutfittingStations = async () => {
  const { data } = await axios.get<EDDBStation[]>('https://eddb.io/archive/v6/stations.json');
  return data.filter((station: EDDBStation) => !!station.has_outfitting);
};
// export const fetchCachedOutfittingStations = () => {
//   const outfittingStations = fs.readFileSync(`${dataPath}/outfittingStations.json`);
//   return JSON.parse(outfittingStations); // array of objects
// }
