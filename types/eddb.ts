export interface EDDBModule {
  id: number;
  group_id: number;
  class: number;
  rating: 'I';
  price: null;
  weapon_mode: string | null;
  missile_type: number | null;
  name: null;
  belongs_to: null;
  ed_id: number;
  ed_symbol: 'SideWinder_Armour_Grade1';
  game_context_id: null;
  ship: 'Sidewinder Mk. I';
  power?: number;
  group: {
    id: number;
    category_id: number;
    name: 'Lightweight Alloy';
    category: 'Bulkhead';
  };
}

export interface EDDBState {
  id: number;
  name: string;
}

export interface EDDBMinorFaction {
  happiness_id: number;
  minor_faction_id: number;
  influence: number;
  active_states: any[];
  pending_states: any[];
  recovering_states: any[];
}

export interface EDDBSystem {
  id: number;
  edsm_id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  population: number;
  is_populated: boolean;
  government_id: number;
  government: string;
  allegiance_id: number;
  allegiance: string;
  states: EDDBState[];
  security_id: number;
  security: string;
  primary_economy_id: number;
  primary_economy: string;
  power: string;
  power_state: string;
  power_state_id: number;
  needs_permit: boolean;
  updated_at: number;
  minor_factions_updated_at: number;
  simbad_ref: string;
  controlling_minor_faction_id: number;
  controlling_minor_faction: string;
  reserve_type_id: number;
  reserve_type: string;
  minor_faction_presences: EDDBMinorFaction[];
  ed_system_address: number;
}

export interface EDDBStation {
  id: number;
  name: string;
  system_id: number;
  updated_at: number;
  max_landing_pad_size: string;
  distance_to_star: number;
  government_id: number;
  government: string;
  allegiance_id: number;
  allegiance: string;
  states: EDDBState[];
  type_id: number;
  type: string;
  has_blackmarket: boolean;
  has_market: boolean;
  has_refuel: boolean;
  has_repair: boolean;
  has_rearm: boolean;
  has_outfitting: boolean;
  has_shipyard: boolean;
  has_docking: boolean;
  has_commodities: boolean;
  has_material_trader: boolean;
  has_technology_broker: boolean;
  has_carrier_vendor: boolean;
  has_carrier_administration: boolean;
  has_interstellar_factors: boolean;
  has_universal_cartographics: boolean;
  import_commodities: string[];
  export_commodities: string[];
  prohibited_commodities: string[];
  economies: string[];
  shipyard_updated_at: number;
  outfitting_updated_at: number;
  market_updated_at: number;
  is_planetary: boolean;
  selling_ships: string[];
  selling_modules: number[];
  settlement_size_id: null;
  settlement_size: null;
  settlement_security_id: null;
  settlement_security: null;
  body_id: number;
  controlling_minor_faction_id: number;
  ed_market_id: number;
}
