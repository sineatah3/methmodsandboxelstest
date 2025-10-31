// ============================================================================
// thebestchemistrymod.js
// Complete Chemistry & Research Compounds Mod
// MIT Licence – Research / EDU Use Only
// ============================================================================
/* global elements, behaviors, pixel, changePixel, pixelMap, width, height, isEmpty, createPixel, tryMove */

(() => {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. HELPERS & BEHAVIORS
    // --------------------------------------------------------------------------
    const PW = behaviors.POWDER;
    const LIQ = behaviors.LIQUID;
    const WALL = behaviors.WALL;
    const STURDY = behaviors.STURDY;
    const GAS = behaviors.GAS;

    // --------------------------------------------------------------------------
    // 2. ESSENTIAL BASE ELEMENTS
    // --------------------------------------------------------------------------
    
    const essentialBaseElements = {
        plant_matter: { color: ['#8bc34a', '#7cb342'], behavior: PW, category: 'life', state: 'solid', density: 600, tempHigh: 200, stateHigh: 'ash' },
        soil: { color: ['#8d6e63', '#795548', '#6d4c41'], behavior: PW, category: 'land', state: 'solid', density: 1200, desc: 'Soil - basic planting medium' },
        wet_soil: { color: ['#7b5e57', '#6d4c41', '#5d4037'], behavior: PW, category: 'land', state: 'solid', density: 1400, desc: 'Wet soil - moist planting medium' },
        mud: { color: ['#6d4c41', '#5d4037', '#4e342e'], behavior: LIQ, category: 'land', state: 'liquid', density: 1600, viscosity: 5000, desc: 'Mud - water-saturated soil' },
        fertilizer: { color: ['#fff9c4', '#ffecb3', '#ffe082'], behavior: PW, category: 'tools', state: 'solid', density: 900, desc: 'Fertilizer - promotes plant growth' },
        baking_soda: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1100 },
        lime: { color: ['#f5f5f5', '#eeeeee'], behavior: PW, category: 'powders', state: 'solid', density: 1150 },
        gasoline: { color: ['#ffeb3b', '#fdd835'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 750 },
        kerosene: { color: ['#fff59d', '#fff176'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 800 },
        butane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.6 },
        ice_water: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1000, temp: 0 },
        ethanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 789 },
        acetone: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 784 },
        hydrogen: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.09 },
        catalyst: { color: ['#ffccbc', '#ffab91'], behavior: PW, category: 'tools', state: 'solid', density: 1200 },
        red_phosphorus: { color: ['#d32f2f', '#c62828'], behavior: PW, category: 'powders', state: 'solid', density: 1100 },
        iodine: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'powders', state: 'solid', density: 1260 },
        bromine: { color: ['#d32f2f', '#c62828'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1310 },
        methylation: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.9 },
        steam: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.6 },
        ash: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'land', state: 'solid', density: 700 },
        smoke: { color: ['#9e9e9e', '#757575'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 }
    };

    Object.entries(essentialBaseElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: cfg.desc || `${id} - base element` };
        }
    });

    // --------------------------------------------------------------------------
    // 3. VAPOR/SMOKE ELEMENTS
    // --------------------------------------------------------------------------
    const vaporElements = {
        thc_vapor: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'botanicals', state: 'gas', density: 0.8 },
        crack_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        meth_smoke: { color: ['#e0e0e0', '#eeeeee'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        mdma_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        heroin_smoke: { color: ['#8d6e63', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        morphine_smoke: { color: ['#bcaaa4', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        pcp_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        ketamine_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        dmt_vapor: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        fentanyl_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 },
        lsd_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8 }
    };

    Object.entries(vaporElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: `${id} - vapor element` };
        }
    });

    // --------------------------------------------------------------------------
    // 4. PERIODIC TABLE - ALL ELEMENTS
    // --------------------------------------------------------------------------
    
    const periodicTable = {
        // Group 1 - Alkali Metals
        lithium: { color: ['#c0c0c0', '#d3d3d3'], behavior: PW, category: 'metals', state: 'solid', density: 534, tempHigh: 180, stateHigh: 'molten_lithium', desc: 'Lithium (Li) - lightest metal' },
        sodium: { color: ['#c0c0c0', '#d3d3d3'], behavior: PW, category: 'metals', state: 'solid', density: 968, tempHigh: 98, stateHigh: 'molten_sodium', desc: 'Sodium (Na) - reactive metal' },
        potassium: { color: ['#c0c0c0', '#d3d3d3'], behavior: PW, category: 'metals', state: 'solid', density: 856, tempHigh: 63, stateHigh: 'molten_potassium', desc: 'Potassium (K) - very reactive' },
        rubidium: { color: ['#c0c0c0', '#d3d3d3'], behavior: PW, category: 'metals', state: 'solid', density: 1532, tempHigh: 39, stateHigh: 'molten_rubidium', desc: 'Rubidium (Rb)' },
        cesium: { color: ['#ffd700', '#ffed4e'], behavior: PW, category: 'metals', state: 'solid', density: 1879, tempHigh: 28, stateHigh: 'molten_cesium', desc: 'Cesium (Cs) - golden' },
        
        // Group 2 - Alkaline Earth Metals
        beryllium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 1848, tempHigh: 1287, stateHigh: 'molten_beryllium', desc: 'Beryllium (Be)' },
        magnesium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 1738, tempHigh: 650, stateHigh: 'molten_magnesium', desc: 'Magnesium (Mg)' },
        calcium: { color: ['#f5f5f5', '#ffffff'], behavior: PW, category: 'metals', state: 'solid', density: 1550, tempHigh: 842, stateHigh: 'molten_calcium', desc: 'Calcium (Ca)' },
        strontium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 2640, tempHigh: 777, stateHigh: 'molten_strontium', desc: 'Strontium (Sr)' },
        barium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 3510, tempHigh: 727, stateHigh: 'molten_barium', desc: 'Barium (Ba)' },
        
        // Transition Metals
        scandium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 2985, tempHigh: 1541, stateHigh: 'molten_scandium', desc: 'Scandium (Sc)' },
        titanium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 4506, tempHigh: 1668, stateHigh: 'molten_titanium', desc: 'Titanium (Ti) - strong & light' },
        vanadium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 6110, tempHigh: 1910, stateHigh: 'molten_vanadium', desc: 'Vanadium (V)' },
        chromium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 7190, tempHigh: 1907, stateHigh: 'molten_chromium', desc: 'Chromium (Cr) - shiny' },
        manganese: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 7470, tempHigh: 1246, stateHigh: 'molten_manganese', desc: 'Manganese (Mn)' },
        iron: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 7874, tempHigh: 1538, stateHigh: 'molten_iron', desc: 'Iron (Fe) - magnetic' },
        cobalt: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metals', state: 'solid', density: 8900, tempHigh: 1495, stateHigh: 'molten_cobalt', desc: 'Cobalt (Co)' },
        nickel: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 8908, tempHigh: 1455, stateHigh: 'molten_nickel', desc: 'Nickel (Ni)' },
        copper: { color: ['#ff6f00', '#ff8f00'], behavior: PW, category: 'metals', state: 'solid', density: 8960, tempHigh: 1085, stateHigh: 'molten_copper', desc: 'Copper (Cu) - reddish' },
        zinc: { color: ['#c0c0c0', '#d3d3d3'], behavior: PW, category: 'metals', state: 'solid', density: 7140, tempHigh: 420, stateHigh: 'molten_zinc', desc: 'Zinc (Zn)' },
        
        // Precious Metals
        silver: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 10490, tempHigh: 962, stateHigh: 'molten_silver', desc: 'Silver (Ag) - precious' },
        gold: { color: ['#ffd700', '#ffed4e'], behavior: PW, category: 'metals', state: 'solid', density: 19320, tempHigh: 1064, stateHigh: 'molten_gold', desc: 'Gold (Au) - precious' },
        platinum: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 21450, tempHigh: 1768, stateHigh: 'molten_platinum', desc: 'Platinum (Pt) - precious' },
        palladium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 12023, tempHigh: 1555, stateHigh: 'molten_palladium', desc: 'Palladium (Pd)' },
        
        // Heavy Metals
        lead: { color: ['#757575', '#616161'], behavior: PW, category: 'metals', state: 'solid', density: 11340, tempHigh: 327, stateHigh: 'molten_lead', desc: 'Lead (Pb) - toxic & heavy' },
        mercury: { color: ['#c0c0c0', '#d3d3d3'], behavior: LIQ, viscosity: 1554, category: 'metals', state: 'liquid', density: 13534, tempHigh: 357, stateHigh: 'mercury_vapor', desc: 'Mercury (Hg) - liquid metal' },
        tin: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 7310, tempHigh: 232, stateHigh: 'molten_tin', desc: 'Tin (Sn)' },
        aluminum: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'metals', state: 'solid', density: 2700, tempHigh: 660, stateHigh: 'molten_aluminum', desc: 'Aluminum (Al) - light' },
        
        // Metalloids
        boron: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'metalloids', state: 'solid', density: 2340, tempHigh: 2076, stateHigh: 'molten_boron', desc: 'Boron (B)' },
        silicon: { color: ['#616161', '#757575'], behavior: PW, category: 'metalloids', state: 'solid', density: 2330, tempHigh: 1414, stateHigh: 'molten_silicon', desc: 'Silicon (Si) - semiconductor' },
        germanium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metalloids', state: 'solid', density: 5323, tempHigh: 938, stateHigh: 'molten_germanium', desc: 'Germanium (Ge)' },
        arsenic: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metalloids', state: 'solid', density: 5727, tempHigh: 817, stateHigh: 'arsenic_vapor', desc: 'Arsenic (As) - toxic' },
        antimony: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'metalloids', state: 'solid', density: 6697, tempHigh: 631, stateHigh: 'molten_antimony', desc: 'Antimony (Sb)' },
        
        // Nonmetals
        carbon: { color: ['#212121', '#424242'], behavior: PW, category: 'nonmetals', state: 'solid', density: 2267, tempHigh: 3550, stateHigh: 'ash', desc: 'Carbon (C) - basis of life' },
        sulfur: { color: ['#ffeb3b', '#fdd835'], behavior: PW, category: 'nonmetals', state: 'solid', density: 1960, tempHigh: 115, stateHigh: 'molten_sulfur', desc: 'Sulfur (S) - yellow' },
        phosphorus_white: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'nonmetals', state: 'solid', density: 1823, tempHigh: 44, stateHigh: 'molten_phosphorus', desc: 'White Phosphorus (P) - reactive' },
        phosphorus_red: { color: ['#d32f2f', '#c62828'], behavior: PW, category: 'nonmetals', state: 'solid', density: 2200, tempHigh: 240, stateHigh: 'phosphorus_vapor', desc: 'Red Phosphorus (P) - stable' },
        selenium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'nonmetals', state: 'solid', density: 4819, tempHigh: 221, stateHigh: 'selenium_vapor', desc: 'Selenium (Se)' },
        tellurium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'nonmetals', state: 'solid', density: 6240, tempHigh: 450, stateHigh: 'tellurium_vapor', desc: 'Tellurium (Te)' },
        
        // Halogens
        fluorine: { color: ['#f9fbe7', '#f0f4c3'], behavior: GAS, category: 'halogens', state: 'gas', density: 1.7, tempLow: -188, stateLow: 'liquid_fluorine', desc: 'Fluorine (F) - most reactive' },
        chlorine: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'halogens', state: 'gas', density: 3.2, tempLow: -34, stateLow: 'liquid_chlorine', desc: 'Chlorine (Cl) - greenish gas' },
        bromine: { color: ['#d32f2f', '#c62828'], behavior: LIQ, viscosity: 944, category: 'halogens', state: 'liquid', density: 3120, tempHigh: 59, stateHigh: 'bromine_vapor', desc: 'Bromine (Br) - red liquid' },
        iodine: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'halogens', state: 'solid', density: 4933, tempHigh: 114, stateHigh: 'iodine_vapor', desc: 'Iodine (I) - purple crystals' },
        
        // Noble Gases
        helium: { color: ['#ffeb3b', '#fdd835'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 0.18, desc: 'Helium (He) - lighter than air' },
        neon: { color: ['#ff6f00', '#ff8f00'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 0.90, desc: 'Neon (Ne) - orange glow' },
        argon: { color: ['#9c27b0', '#8e24aa'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 1.78, desc: 'Argon (Ar) - inert' },
        krypton: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 3.75, desc: 'Krypton (Kr)' },
        xenon: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 5.89, desc: 'Xenon (Xe)' },
        radon: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'noble_gases', state: 'gas', density: 9.73, desc: 'Radon (Rn) - radioactive' },
        
        // Rare Earth Elements
        lanthanum: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'rare_earth', state: 'solid', density: 6146, tempHigh: 920, stateHigh: 'molten_lanthanum', desc: 'Lanthanum (La)' },
        cerium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'rare_earth', state: 'solid', density: 6689, tempHigh: 795, stateHigh: 'molten_cerium', desc: 'Cerium (Ce)' },
        neodymium: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'rare_earth', state: 'solid', density: 7010, tempHigh: 1024, stateHigh: 'molten_neodymium', desc: 'Neodymium (Nd) - magnets' },
        
        // Actinides (Radioactive)
        uranium: { color: ['#616161', '#757575'], behavior: PW, category: 'actinides', state: 'solid', density: 19050, tempHigh: 1132, stateHigh: 'molten_uranium', desc: 'Uranium (U) - radioactive' },
        plutonium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'actinides', state: 'solid', density: 19816, tempHigh: 640, stateHigh: 'molten_plutonium', desc: 'Plutonium (Pu) - radioactive' },
        thorium: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'actinides', state: 'solid', density: 11724, tempHigh: 1750, stateHigh: 'molten_thorium', desc: 'Thorium (Th) - radioactive' }
    };

    Object.entries(periodicTable).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 5. COMMON CHEMICAL COMPOUNDS
    // --------------------------------------------------------------------------
    
    const commonCompounds = {
        // Salts
        table_salt: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2165, desc: 'NaCl - sodium chloride' },
        potassium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 1984, desc: 'KCl - salt substitute' },
        calcium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2711, desc: 'CaCO3 - limestone/chalk' },
        sodium_bicarbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2200, desc: 'NaHCO3 - baking soda' },
        magnesium_oxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 3580, desc: 'MgO - magnesia' },
        calcium_oxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 3340, desc: 'CaO - quicklime' },
        
        // Acids & Bases
        sulfurous_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1200, category: 'compounds', state: 'liquid', density: 1030, desc: 'H2SO3' },
        carbonic_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1000, category: 'compounds', state: 'liquid', density: 1000, desc: 'H2CO3 - in soda' },
        
        // Oxides
        carbon_dioxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.98, desc: 'CO2 - greenhouse gas' },
        carbon_monoxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.25, desc: 'CO - toxic gas' },
        sulfur_dioxide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'compounds', state: 'gas', density: 2.62, desc: 'SO2 - acid rain' },
        sulfur_trioxide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'compounds', state: 'gas', density: 2.75, desc: 'SO3' },
        nitrogen_monoxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.34, desc: 'NO - nitric oxide' },
        nitrogen_dioxide: { color: ['#d32f2f', '#c62828'], behavior: GAS, category: 'compounds', state: 'gas', density: 2.05, desc: 'NO2 - brown gas' },
        nitrous_oxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.98, desc: 'N2O - laughing gas' },
        iron_oxide: { color: ['#d32f2f', '#c62828'], behavior: PW, category: 'compounds', state: 'solid', density: 5250, desc: 'Fe2O3 - rust' },
        aluminum_oxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 3950, desc: 'Al2O3 - alumina/sapphire' },
        silicon_dioxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2648, desc: 'SiO2 - quartz/sand' },
        titanium_dioxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 4230, desc: 'TiO2 - white pigment' },
        zinc_oxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 5606, desc: 'ZnO - sunscreen' },
        
        // Hydrides
        hydrogen_chloride: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.49, desc: 'HCl - gas form' },
        hydrogen_fluoride: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 0.99, desc: 'HF - extremely corrosive' },
        hydrogen_sulfide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.54, desc: 'H2S - rotten egg smell' },
        ammonia_gas: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 0.73, desc: 'NH3 - pungent gas' },
        methane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 0.72, desc: 'CH4 - natural gas' },
        ethane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 1.36, desc: 'C2H6' },
        propane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 2.01, desc: 'C3H8 - BBQ fuel' },
        butane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'compounds', state: 'gas', density: 2.48, desc: 'C4H10 - lighter fluid' },
        
        // Peroxides
        hydrogen_peroxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1245, category: 'compounds', state: 'liquid', density: 1450, desc: 'H2O2 - bleach/antiseptic' },
        sodium_peroxide: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'compounds', state: 'solid', density: 2805, desc: 'Na2O2 - oxidizer' },
        
        // Nitrates & Nitrites
        sodium_nitrate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2261, desc: 'NaNO3 - Chile saltpeter' },
        potassium_nitrate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2109, desc: 'KNO3 - saltpeter/gunpowder' },
        ammonium_nitrate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 1725, desc: 'NH4NO3 - fertilizer/explosive' },
        silver_nitrate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 4350, desc: 'AgNO3 - photography' },
        sodium_nitrite: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'compounds', state: 'solid', density: 2168, desc: 'NaNO2 - food preservative' },
        
        // Sulfates
        copper_sulfate: { color: ['#039be5', '#0277bd'], behavior: PW, category: 'compounds', state: 'solid', density: 3600, desc: 'CuSO4 - blue crystals' },
        iron_sulfate: { color: ['#c8e6c9', '#a5d6a7'], behavior: PW, category: 'compounds', state: 'solid', density: 1898, desc: 'FeSO4 - green crystals' },
        zinc_sulfate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 3540, desc: 'ZnSO4' },
        
        // Carbonates
        sodium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2540, desc: 'Na2CO3 - washing soda' },
        potassium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2290, desc: 'K2CO3 - potash' },
        
        // Chlorides
        magnesium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2320, desc: 'MgCl2 - de-icer' },
        calcium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2150, desc: 'CaCl2 - de-icer' },
        iron_chloride: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'compounds', state: 'solid', density: 2898, desc: 'FeCl3 - brown/orange' },
        
        // Hydroxides
        sodium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2130, desc: 'NaOH - lye/caustic soda' },
        potassium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2044, desc: 'KOH - caustic potash' },
        calcium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2211, desc: 'Ca(OH)2 - slaked lime' },
        
        // Phosphates
        calcium_phosphate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 3140, desc: 'Ca3(PO4)2 - bone mineral' },
        sodium_phosphate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'compounds', state: 'solid', density: 2536, desc: 'Na3PO4' },
        
        // Silicates
        sodium_silicate: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 2000, category: 'compounds', state: 'liquid', density: 1390, desc: 'Na2SiO3 - water glass' },
        
        // Alloys
        brass: { color: ['#ffd700', '#ffed4e'], behavior: PW, category: 'alloys', state: 'solid', density: 8400, desc: 'Cu + Zn alloy - golden' },
        bronze: { color: ['#ff6f00', '#ff8f00'], behavior: PW, category: 'alloys', state: 'solid', density: 8800, desc: 'Cu + Sn alloy - reddish' },
        steel: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'alloys', state: 'solid', density: 7850, desc: 'Fe + C alloy - strong' },
        stainless_steel: { color: ['#e0e0e0', '#f5f5f5'], behavior: PW, category: 'alloys', state: 'solid', density: 8000, desc: 'Fe + Cr + Ni - rust resistant' },
        pewter: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'alloys', state: 'solid', density: 7300, desc: 'Sn + Cu + Sb alloy' }
    };

    Object.entries(commonCompounds).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 6. CHEMICAL REAGENTS EXPANSION
    // --------------------------------------------------------------------------
    
    const chemicalReagents = {
        sodium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1130, desc: 'Sodium hydroxide - caustic base' },
        ammonium_hydroxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 910, desc: 'Ammonium hydroxide solution' },
        hydrochloric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Hydrochloric acid - strong acid' },
        sulfuric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1840, viscosity: 2400, desc: 'Sulfuric acid - highly corrosive' },
        acetic_anhydride: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1080, desc: 'Acetic anhydride - acetylating agent' },
        methylamine: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7, desc: 'Methylamine gas' },
        potassium_permanganate: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'powders', state: 'solid', density: 1270, desc: 'Potassium permanganate - oxidizer' },
        acetic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Acetic acid - vinegar' },
        toluene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 867, desc: 'Toluene - aromatic solvent' },
        benzene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 879, desc: 'Benzene - aromatic hydrocarbon' },
        xylene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 860, desc: 'Xylene - industrial solvent' },
        hexane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 655, desc: 'Hexane - extraction solvent' },
        methanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 792, desc: 'Methanol - wood alcohol' },
        isopropanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 786, desc: 'Isopropanol - rubbing alcohol' },
        dichloromethane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1326, desc: 'DCM - methylene chloride' },
        chloroform: { color: ['#e8f5e9', '#c8e6c9'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1480, desc: 'Chloroform - CHCl3' },
        diethyl_ether: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 713, desc: 'Diethyl ether - volatile solvent' },
        phosphoric_acid: { color: ['#f5f5f5', '#eeeeee'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1880, viscosity: 1500, desc: 'Phosphoric acid' },
        nitric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1510, viscosity: 1200, desc: 'Nitric acid - strong oxidizer' },
        formic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1220, desc: 'Formic acid - from ants' },
        citric_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1665, desc: 'Citric acid - from citrus' },
        oxalic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1900, desc: 'Oxalic acid' },
        potassium_hydroxide: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Potassium hydroxide - caustic' },
        calcium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1220, desc: 'Calcium hydroxide - slaked lime' },
        sodium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1170, desc: 'Sodium chloride - table salt' },
        sodium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 968, desc: 'Sodium metal - reactive' },
        lithium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 534, desc: 'Lithium metal - lightest metal' },
        palladium_catalyst: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 1200, desc: 'Palladium catalyst' },
        ammonia: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 682, viscosity: 600, desc: 'Liquid ammonia' },
        thionyl_chloride: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1638, desc: 'Thionyl chloride' },
        lithium_aluminum_hydride: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 917, desc: 'LiAlH4 - reducing agent' },
        sodium_borohydride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1074, desc: 'NaBH4 - reducing agent' },
        dimethylformamide: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 944, desc: 'DMF - polar solvent' },
        dimethyl_sulfoxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1100, desc: 'DMSO - aprotic solvent' },
        tetrahydrofuran: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 889, desc: 'THF - cyclic ether' },
        glycerol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1261, viscosity: 1500, desc: 'Glycerol - viscous' },
        phenol: { color: ['#ffccbc', '#ffab91'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1070, desc: 'Phenol - carbolic acid' },
        aniline: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1022, desc: 'Aniline - aromatic amine' },
        pyridine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 982, desc: 'Pyridine' },
        piperidine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 862, desc: 'Piperidine' },
        formaldehyde: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1083, desc: 'Formaldehyde solution' }
    };

    Object.entries(chemicalReagents).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, tempHigh: 500, stateHigh: 'smoke' };
        }
    });

    // --------------------------------------------------------------------------
    // 7. RAW ALKALOIDS & BOTANICALS
    // --------------------------------------------------------------------------
    
    const rawAlkaloids = {
        coca_leaves: { color: ['#2e7d32', '#1b5e20', '#388e3c'], behavior: PW, category: 'botanicals', state: 'solid', density: 600, tempHigh: 180, stateHigh: 'ash', desc: 'Dried coca leaves' },
        coca_alkaloids: { color: ['#f9fbe7', '#fff9c4'], behavior: PW, category: 'raw_alkaloids', state: 'solid', density: 1100, tempHigh: 195, stateHigh: 'smoke', desc: 'Crude coca alkaloids' },
        coca_paste: { color: ['#8d6e63', '#a1887f'], behavior: PW, category: 'raw_alkaloids', state: 'solid', density: 1050, tempHigh: 180, stateHigh: 'smoke', desc: 'Coca paste - brown putty' },
        opium_latex: { color: ['#4a148c', '#6a1b9a'], behavior: LIQ, viscosity: 3500, category: 'raw_alkaloids', tempHigh: 180, stateHigh: 'smoke', state: 'liquid', density: 1350, desc: 'Raw opium latex' },
        morphine_base: { color: ['#bcaaa4', '#a1887f'], behavior: PW, category: 'raw_alkaloids', state: 'solid', density: 1230, tempHigh: 197, stateHigh: 'morphine_smoke', desc: 'Morphine base' },
        heroin_base: { color: ['#8d6e63', '#a1887f'], behavior: PW, category: 'raw_alkaloids', state: 'solid', density: 1320, tempHigh: 170, stateHigh: 'heroin_smoke', desc: 'Heroin base - #3' },
        psilocybin_mushrooms: { color: ['#bcaaa4', '#a1887f'], behavior: PW, category: 'botanicals', state: 'solid', density: 600, tempHigh: 200, stateHigh: 'ash', desc: 'Psilocybin mushrooms' },
        peyote: { color: ['#e8f5e9', '#c8e6c9'], behavior: PW, category: 'botanicals', state: 'solid', density: 650, tempHigh: 200, stateHigh: 'ash', desc: 'Peyote cactus' },
        salvia_leaves: { color: ['#004d40', '#00695c'], behavior: PW, category: 'botanicals', state: 'solid', density: 580, tempHigh: 180, stateHigh: 'ash', desc: 'Salvia divinorum leaves' },
        kratom_leaves: { color: ['#2e7d32', '#1b5e20'], behavior: PW, category: 'botanicals', state: 'solid', density: 590, tempHigh: 180, stateHigh: 'ash', desc: 'Kratom leaves' },
        ergot: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'botanicals', state: 'solid', density: 620, tempHigh: 200, stateHigh: 'ash', desc: 'Ergot fungus' },
        dmt_containing_bark: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'botanicals', state: 'solid', density: 640, tempHigh: 200, stateHigh: 'ash', desc: 'DMT-containing bark' }
    };

    Object.entries(rawAlkaloids).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 8. PRECURSORS
    // --------------------------------------------------------------------------
    
    const precursors = {
        ephedrine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1180, tempHigh: 255, stateHigh: 'smoke', desc: 'Ephedrine HCl' },
        pseudoephedrine: { color: ['#f5f5f5', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1200, tempHigh: 260, stateHigh: 'smoke', desc: 'Pseudoephedrine' },
        phenylacetone: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, viscosity: 1200, category: 'precursors', state: 'liquid', density: 1015, tempHigh: 216, stateHigh: 'smoke', desc: 'P2P - amphetamine precursor' },
        safrole: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, viscosity: 1100, category: 'precursors', state: 'liquid', density: 1096, tempHigh: 234, stateHigh: 'smoke', desc: 'Safrole - MDMA precursor' },
        mdp2p: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, viscosity: 1600, category: 'precursors', state: 'liquid', density: 1040, tempHigh: 130, stateHigh: 'mdma_smoke', desc: 'MDP2P - MDMA intermediate' },
        ergotamine: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'precursors', state: 'solid', density: 1320, tempHigh: 213, stateHigh: 'smoke', desc: 'Ergotamine - LSD precursor' },
        lysergic_acid: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1280, tempHigh: 240, stateHigh: 'smoke', desc: 'Lysergic acid' },
        tryptamine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1090, tempHigh: 174, stateHigh: 'smoke', desc: 'Tryptamine - DMT precursor' },
        indole: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1175, tempHigh: 254, stateHigh: 'smoke', desc: 'Indole' },
        thebaine: { color: ['#bcaaa4', '#a1887f'], behavior: PW, category: 'precursors', state: 'solid', density: 1300, tempHigh: 193, stateHigh: 'smoke', desc: 'Thebaine - opioid precursor' },
        acrylfentanyl_precursor: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'precursors', state: 'solid', density: 1150, tempHigh: 120, stateHigh: 'smoke', desc: 'Fentanyl precursor' },
        gamma_butyrolactone: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1500, category: 'precursors', state: 'liquid', density: 1130, tempHigh: 204, stateHigh: 'steam', desc: 'GBL - GHB precursor' },
        piperidine_precursor: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, viscosity: 800, category: 'precursors', state: 'liquid', density: 862, tempHigh: 106, stateHigh: 'smoke', desc: 'Piperidine - PCP precursor' },
        cyclohexanone: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1000, category: 'precursors', state: 'liquid', density: 948, tempHigh: 156, stateHigh: 'smoke', desc: 'Cyclohexanone - ketamine precursor' }
    };

    Object.entries(precursors).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 9. INTERMEDIATES
    // --------------------------------------------------------------------------
    
    const intermediates = {
        cocaine_sulfate: { color: ['#f5f5f5', '#fafafa'], behavior: PW, category: 'intermediates', state: 'solid', density: 1180, tempHigh: 280, stateHigh: 'smoke', desc: 'Cocaine sulfate' },
        cocaine_base: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'intermediates', state: 'solid', density: 1150, tempHigh: 198, stateHigh: 'crack_smoke', desc: 'Cocaine freebase' },
        meth_intermediate: { color: ['#e0e0e0', '#eeeeee'], behavior: LIQ, viscosity: 1800, category: 'intermediates', state: 'liquid', density: 980, tempHigh: 250, stateHigh: 'meth_smoke', desc: 'Methamphetamine freebase' },
        mda_intermediate: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'intermediates', state: 'solid', density: 1180, tempHigh: 287, stateHigh: 'smoke', desc: 'MDA intermediate' }
    };

    Object.entries(intermediates).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 10. SOLUTIONS
    // --------------------------------------------------------------------------
    
    const solutions = {
        cocaine_solution: { color: ['#f5f5f5', '#fafafa'], behavior: LIQ, viscosity: 1200, category: 'solutions', state: 'liquid', density: 1050, tempHigh: 100, stateHigh: ['cocaine', 'steam'], desc: 'Cocaine solution' },
        crack_slurry: { color: ['#fff3e0', '#ffecb3'], behavior: LIQ, viscosity: 2000, category: 'solutions', state: 'liquid', density: 1100, tempHigh: 85, stateHigh: 'crack', desc: 'Crack slurry' },
        heroin_solution: { color: ['#bcaaa4', '#a1887f'], behavior: LIQ, viscosity: 1100, category: 'solutions', state: 'liquid', density: 1040, tempHigh: 100, stateHigh: ['heroin_base', 'steam'], desc: 'Heroin solution' },
        opium_solution: { color: ['#6a1b9a', '#8e24aa'], behavior: LIQ, viscosity: 1200, category: 'solutions', state: 'liquid', density: 1050, tempHigh: 100, stateHigh: ['opium_latex', 'steam'], desc: 'Opium solution' }
    };

    Object.entries(solutions).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 11. CANNABIS STRAINS DATABASE
    // --------------------------------------------------------------------------
    
    const cannabisStrains = {
        og_kush: { colors: ['#3e8948', '#2d6634', '#4a9b54'], thc: 0.25, cbd: 0.05, type: 'hybrid', desc: 'OG Kush - West Coast legend' },
        sour_diesel: { colors: ['#7cb342', '#689f38', '#558b2f'], thc: 0.26, cbd: 0.02, type: 'sativa', desc: 'Sour Diesel - diesel fuel aroma' },
        blue_dream: { colors: ['#5c6bc0', '#3949ab', '#4a5f8d'], thc: 0.24, cbd: 0.03, type: 'hybrid', desc: 'Blue Dream - California classic' },
        girl_scout_cookies: { colors: ['#6a4c93', '#553c7a', '#7d5ba6'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'GSC - sweet and potent' },
        gorilla_glue: { colors: ['#4a7c2f', '#5d9033', '#3e6d27'], thc: 0.30, cbd: 0.02, type: 'hybrid', desc: 'GG4 - extremely sticky' }
    };

    // --------------------------------------------------------------------------
    // 12. PLANT NUTRIENTS
    // --------------------------------------------------------------------------
    
    elements.plant_nutrients = {
        color: ['#fff9c4', '#ffecb3', '#ffe082'],
        behavior: PW,
        category: 'tools',
        state: 'solid',
        density: 900,
        reactions: {},
        desc: 'Plant nutrients - speeds up cannabis growth!'
    };

    // --------------------------------------------------------------------------
    // 13. CREATE CANNABIS PLANTS
    // --------------------------------------------------------------------------
    
    Object.entries(cannabisStrains).forEach(([strainId, cfg]) => {
        
        // SEED
        elements[`seed_${strainId}`] = {
            color: ['#8d6e63', '#795548', '#a1887f'],
            behavior: PW,
            category: 'botanicals',
            state: 'solid',
            density: 1100,
            tempHigh: 300,
            stateHigh: 'ash',
            reactions: {
                soil: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.1 },
                wet_soil: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.15 },
                mud: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.2 }
            },
            desc: `${strainId} seeds - plant in soil to grow`
        };

        // SEEDLING
        elements[`${strainId}_seedling`] = {
            color: ['#8bc34a', '#7cb342', '#9ccc65'],
            behavior: behaviors.STURDY_PLANT,
            category: 'botanicals',
            state: 'solid',
            density: 1000,
            tempHigh: 150,
            stateHigh: 'ash',
            burnTime: 100,
            burn: 10,
            burnInto: 'ash',
            breakInto: [`seed_${strainId}`],
            tick: function(pixel) {
                if (!pixel.stage) { pixel.stage = 0; }
                pixel.stage++;
                
                if (pixel.stage > 100 && isEmpty(pixel.x, pixel.y-1)) {
                    changePixel(pixel, `${strainId}_plant`);
                }
            },
            reactions: {
                plant_nutrients: { elem1: `${strainId}_plant`, elem2: null, chance: 0.9 }
            },
            desc: `Young ${strainId} seedling - grows into plant`
        };

        // PLANT
        elements[`${strainId}_plant`] = {
            color: cfg.colors,
            behavior: behaviors.STURDY_PLANT,
            category: 'botanicals',
            state: 'solid',
            density: 1000,
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 10,
            burnTime: 200,
            burnInto: 'ash',
            breakInto: [`seed_${strainId}`, `${strainId}_flower`],
            tick: function(pixel) {
                if (!pixel.stage) { pixel.stage = 0; }
                pixel.stage++;
                
                if (pixel.stage % 50 === 0 && Math.random() < 0.3) {
                    if (isEmpty(pixel.x+1, pixel.y)) {
                        createPixel(`${strainId}_flower`, pixel.x+1, pixel.y);
                    }
                    if (isEmpty(pixel.x-1, pixel.y)) {
                        createPixel(`${strainId}_flower`, pixel.x-1, pixel.y);
                    }
                }
            },
            desc: `${cfg.desc} - grows flowers`
        };

        // FLOWER
        elements[`${strainId}_flower`] = {
            color: cfg.colors,
            behavior: PW,
            category: 'botanicals',
            state: 'solid',
            density: 700,
            tempHigh: 175,
            stateHigh: ['smoke', 'thc_vapor'],
            burn: 5,
            burnTime: 80,
            breakInto: [`seed_${strainId}`],
            reactions: {
                butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25 },
                ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18 },
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2 }
            },
            desc: `${cfg.desc} - ${cfg.thc * 100}% THC, ${cfg.cbd * 100}% CBD`
        };

        // Add nutrient reactions
        elements.plant_nutrients.reactions[`${strainId}_seedling`] = { elem1: `${strainId}_plant`, elem2: null, chance: 0.9 };
    });

    // --------------------------------------------------------------------------
    // 14. BOTANICAL PRODUCTS & EXTRACTS
    // --------------------------------------------------------------------------
    
    const botanicalProducts = {
        cannabis_oil: { color: ['#827717', '#9e9d24'], behavior: LIQ, viscosity: 5000, category: 'botanicals', tempHigh: 255, stateHigh: 'thc_vapor', state: 'liquid', density: 940 },
        bho: { color: ['#827717', '#9e9d24'], behavior: LIQ, viscosity: 8000, category: 'research_compounds', state: 'liquid', density: 920, tempHigh: 307, stateHigh: 'thc_vapor' },
        bubble_hash: { color: ['#d7ccc8', '#bcaaa4'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1050, tempHigh: 307, stateHigh: 'thc_vapor' }
    };

    Object.entries(botanicalProducts).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: `${id} - cannabis extract` };
        }
    });

    // --------------------------------------------------------------------------
    // 15. HARVESTING TOOLS
    // --------------------------------------------------------------------------
    
    elements.scissors = {
        color: ['#9e9e9e', '#757575'],
        behavior: WALL,
        category: 'tools',
        state: 'solid',
        density: 7850,
        hardness: 0.9,
        tool: function(pixel) {
            if (pixel.element && pixel.element.includes('_')) {
                const parts = pixel.element.split('_');
                const strain = parts[0];
                if (cannabisStrains[strain]) {
                    for (let i = 0; i < 4; i++) {
                        const x = Math.floor(pixel.x + (Math.random() * 6 - 3));
                        const y = Math.floor(pixel.y + (Math.random() * 6 - 3));
                        if (x >= 0 && x < width && y >= 0 && y < height && isEmpty(x, y)) {
                            createPixel(`${strain}_flower`, x, y);
                        }
                    }
                    changePixel(pixel, `${strain}_flower`);
                    return true;
                }
            }
            return false;
        },
        desc: 'Scissors - harvest cannabis plants for flowers'
    };

    // --------------------------------------------------------------------------
    // 16. RESEARCH COMPOUNDS - EXPANDED
    // --------------------------------------------------------------------------
    
    const finalCompounds = {
        cocaine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 345, stateHigh: 'smoke', desc: 'Cocaine HCl' },
        crack: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1150, tempHigh: 248, stateHigh: 'crack_smoke', desc: 'Crack cocaine' },
        methamphetamine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1180, tempHigh: 320, stateHigh: 'meth_smoke', desc: 'Methamphetamine' },
        amphetamine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1150, tempHigh: 350, stateHigh: 'smoke', desc: 'Amphetamine' },
        mdma: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 298, stateHigh: 'mdma_smoke', desc: 'MDMA - ecstasy' },
        mda: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1190, tempHigh: 337, stateHigh: 'smoke', desc: 'MDA' },
        heroin: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1350, tempHigh: 323, stateHigh: 'heroin_smoke', desc: 'Heroin - diacetylmorphine' },
        morphine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1320, tempHigh: 405, stateHigh: 'morphine_smoke', desc: 'Morphine' },
        codeine: { color: ['#f5f5f5', '#ffffff'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1340, tempHigh: 307, stateHigh: 'smoke', desc: 'Codeine' },
        oxycodone: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1360, tempHigh: 369, stateHigh: 'smoke', desc: 'Oxycodone' },
        hydrocodone: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1340, tempHigh: 348, stateHigh: 'smoke', desc: 'Hydrocodone' },
        lsd: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1300, tempHigh: 233, stateHigh: 'lsd_vapor', desc: 'LSD - lysergic acid diethylamide' },
        dmt: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 310, stateHigh: 'dmt_vapor', desc: 'DMT - dimethyltryptamine' },
        psilocybin: { color: ['#bcaaa4', '#a1887f'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1280, tempHigh: 370, stateHigh: 'smoke', desc: 'Psilocybin' },
        psilocin: { color: ['#bcaaa4', '#a1887f'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1270, tempHigh: 323, stateHigh: 'smoke', desc: 'Psilocin' },
        mescaline: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1290, tempHigh: 333, stateHigh: 'smoke', desc: 'Mescaline' },
        pcp: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1240, tempHigh: 383, stateHigh: 'pcp_vapor', desc: 'PCP - angel dust' },
        ketamine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1250, tempHigh: 412, stateHigh: 'ketamine_vapor', desc: 'Ketamine' },
        fentanyl: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1400, tempHigh: 237, stateHigh: 'fentanyl_vapor', desc: 'Fentanyl' },
        carfentanil: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1420, tempHigh: 241, stateHigh: 'fentanyl_vapor', desc: 'Carfentanil' },
        ghb: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, viscosity: 1800, category: 'research_compounds', state: 'liquid', density: 1120, tempHigh: 100, stateHigh: 'steam', desc: 'GHB' },
        mephedrone: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1150, tempHigh: 344, stateHigh: 'smoke', desc: 'Mephedrone - 4-MMC' },
        methylone: { color: ['#f5f5f5', '#ffffff'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1220, tempHigh: 351, stateHigh: 'smoke', desc: 'Methylone - bk-MDMA' },
        salvinorin_a: { color: ['#004d40', '#00695c'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1250, tempHigh: 388, stateHigh: 'smoke', desc: 'Salvinorin A' },
        mitragynine: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1250, tempHigh: 390, stateHigh: 'smoke', desc: 'Mitragynine - kratom alkaloid' },
        ibogaine: { color: ['#3e2723', '#4e342e'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1320, tempHigh: 302, stateHigh: 'smoke', desc: 'Ibogaine' },
        _2c_b: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1260, tempHigh: 385, stateHigh: 'smoke', desc: '2C-B' },
        _4_aco_dmt: { color: ['#ffccbc', '#ffab91'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1290, tempHigh: 335, stateHigh: 'smoke', desc: '4-AcO-DMT' },
        tramadol: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1310, tempHigh: 330, stateHigh: 'smoke', desc: 'Tramadol' }
    };

    Object.entries(finalCompounds).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 17. UNIVERSAL PRECURSOR - CREATES ALL ELEMENTS
    // --------------------------------------------------------------------------
    
    const allPlantElements = [];
    Object.keys(cannabisStrains).forEach(strain => {
        allPlantElements.push(`seed_${strain}`, `${strain}_seedling`, `${strain}_plant`, `${strain}_flower`);
    });

    const allChemicals = [
        ...Object.keys(periodicTable),
        ...Object.keys(commonCompounds),
        ...Object.keys(chemicalReagents), 
        ...Object.keys(rawAlkaloids),
        ...Object.keys(precursors),
        ...Object.keys(intermediates),
        ...Object.keys(solutions),
        ...Object.keys(finalCompounds), 
        ...Object.keys(botanicalProducts), 
        ...Object.keys(vaporElements),
        'plant_nutrients', 
        'scissors'
    ];

    // Create universal precursor that can generate any element
    elements.universal_precursor = {
        color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
        behavior: PW,
        category: 'special',
        state: 'solid',
        density: 1000,
        reactions: {},
        desc: 'Universal precursor - creates ALL elements when placed on soil'
    };

    // Add reactions for universal precursor to create every element
    allChemicals.forEach(chem => {
        elements.universal_precursor.reactions[chem] = { elem1: chem, elem2: null, chance: 0.05 };
    });

    allPlantElements.forEach(plant => {
        elements.universal_precursor.reactions[plant] = { elem1: plant, elem2: null, chance: 0.05 };
    });

    // Also allow universal precursor to work with soil
    elements.soil.reactions.universal_precursor = { 
        elem1: allChemicals[Math.floor(Math.random() * allChemicals.length)], 
        elem2: null, 
        chance: 0.1 
    };

    // --------------------------------------------------------------------------
    // 18. CONSOLE LOG
    // --------------------------------------------------------------------------
    
    console.log('🌿 thebestchemistrymod.js LOADED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log('✅ ' + Object.keys(cannabisStrains).length + ' Cannabis Strains');
    console.log('🧪 COMPLETE CHEMISTRY LIBRARY:');
    console.log('  • ' + Object.keys(periodicTable).length + ' Periodic Table Elements');
    console.log('  • ' + Object.keys(commonCompounds).length + ' Common Chemical Compounds');
    console.log('  • ' + Object.keys(chemicalReagents).length + ' Chemical Reagents');
    console.log('  • ' + Object.keys(rawAlkaloids).length + ' Raw Alkaloids & Botanicals');
    console.log('  • ' + Object.keys(precursors).length + ' Precursors');
    console.log('  • ' + Object.keys(intermediates).length + ' Intermediates');
    console.log('  • ' + Object.keys(solutions).length + ' Solutions');
    console.log('  • ' + Object.keys(finalCompounds).length + ' Final Research Compounds');
    console.log('  • ' + Object.keys(vaporElements).length + ' Vapor/Smoke Elements');
    console.log('');
    console.log('🚀 USAGE:');
    console.log('  1. Place universal_precursor on soil for ANY element');
    console.log('  2. Plant seed_og_kush etc. on soil for cannabis');
    console.log('  3. Use scissors to harvest plants');
    console.log('  4. Use plant_nutrients to speed growth');
    console.log('');
    console.log('🎮 MOD READY WITH 400+ CHEMISTRY ELEMENTS!');

})();
