// ============================================================================
// CHEMRESEARCH_V3_MASSIVE_PLANTS_COMPLETE.JS
// Maximum Chemistry Elements + Massive Cannabis Plants - COMPLETE
// MIT Licence – Research / EDU Use Only – No Real-World Instructions
// VERSION 3.3 - All research compounds + 200+ elements + 60+ strains + Massive growth
// ============================================================================
/* global elements, behaviors, pixel, settings, changePixel */

(() => {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. HELPERS & BEHAVIORS
    // --------------------------------------------------------------------------
    const PW = behaviors.POWDER;
    const LIQ = behaviors.LIQUID;
    const WALL = behaviors.WALL;
    const STURDY = behaviors.STURDY_PLANT;
    const GAS = behaviors.GAS;
    const SUPPORT = behaviors.SUPPORT;

    // --------------------------------------------------------------------------
    // 2. ESSENTIAL BASE ELEMENTS
    // --------------------------------------------------------------------------
    
    const essentialBaseElements = {
        plant_matter: {
            color: ['#8bc34a', '#7cb342'],
            behavior: PW,
            category: 'life',
            state: 'solid',
            density: 600,
            tempHigh: 200,
            stateHigh: 'ash'
        },
        soil: {
            color: ['#8d6e63', '#795548', '#6d4c41'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 1200,
            desc: 'Soil - basic planting medium'
        },
        wet_soil: {
            color: ['#7b5e57', '#6d4c41', '#5d4037'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 1400,
            desc: 'Wet soil - moist planting medium'
        },
        mud: {
            color: ['#6d4c41', '#5d4037', '#4e342e'],
            behavior: LIQ,
            category: 'land',
            state: 'liquid',
            density: 1600,
            viscosity: 5000,
            desc: 'Mud - water-saturated soil'
        },
        fertilizer: {
            color: ['#fff9c4', '#ffecb3', '#ffe082'],
            behavior: PW,
            category: 'tools',
            state: 'solid',
            density: 900,
            desc: 'Fertilizer - promotes plant growth'
        },
        baking_soda: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1100
        },
        lime: {
            color: ['#f5f5f5', '#eeeeee'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1150
        },
        gasoline: {
            color: ['#ffeb3b', '#fdd835'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 750
        },
        kerosene: {
            color: ['#fff59d', '#fff176'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 800
        },
        butane: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.6
        },
        ice_water: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1000,
            temp: 0
        },
        ethanol: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 789
        },
        acetone: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 784
        },
        hydrogen: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.09
        },
        catalyst: {
            color: ['#ffccbc', '#ffab91'],
            behavior: PW,
            category: 'tools',
            state: 'solid',
            density: 1200
        },
        red_phosphorus: {
            color: ['#d32f2f', '#c62828'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1100
        },
        iodine: {
            color: ['#6a1b9a', '#7b1fa2'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1260
        },
        bromine: {
            color: ['#d32f2f', '#c62828'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1310
        },
        methylation: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.9
        },
        steam: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.6
        },
        ash: {
            color: ['#9e9e9e', '#757575'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 700
        },
        smoke: {
            color: ['#9e9e9e', '#757575'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8
        }
    };

    Object.entries(essentialBaseElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                temp: cfg.temp,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                desc: cfg.desc || `${id} - base game element`
            };
        }
    });

    // --------------------------------------------------------------------------
    // 3. VAPOR/SMOKE ELEMENTS - EXPANDED
    // --------------------------------------------------------------------------
    const vaporElements = {
        mephedrone_smoke: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Mephedrone vapor' },
        methylone_smoke: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Methylone vapor' },
        synthetic_cannabinoid_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Synthetic cannabinoid vapor' },
        salvinorin_vapor: { color: ['#004d40', '#00695c'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Salvinorin A vapor' },
        nicotine_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Nicotine vapor' },
        crack_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Crack cocaine vapor' },
        meth_smoke: { color: ['#e0e0e0', '#eeeeee'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Methamphetamine vapor' },
        mdma_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'MDMA vapor' },
        heroin_smoke: { color: ['#8d6e63', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Heroin vapor' },
        morphine_smoke: { color: ['#bcaaa4', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Morphine vapor' },
        thc_vapor: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'botanicals', temp: 180, tempLow: 150, stateLow: 'cannabis_oil', state: 'gas', density: 0.8, desc: 'Vaporized THC' },
        nitrogen_dioxide: { color: ['#d32f2f', '#c62828'], behavior: GAS, category: 'gases', state: 'gas', density: 1.4, tempLow: 21, stateLow: 'dinitrogen_tetroxide', desc: 'Nitrogen dioxide' },
        ammonia_gas: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7, desc: 'Ammonia gas' },
        pcp_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'PCP vapor' },
        ketamine_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Ketamine vapor' },
        dmt_vapor: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'DMT vapor' },
        fentanyl_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Fentanyl vapor' },
        lsd_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'LSD vapor' }
    };

    Object.entries(vaporElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                temp: cfg.temp,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 4. MASSIVE CHEMICAL REAGENTS EXPANSION
    // --------------------------------------------------------------------------
    const chemicalReagents = {
        sodium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1130, desc: 'Sodium hydroxide - caustic base' },
        ammonium_hydroxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 910, desc: 'Ammonium hydroxide' },
        hydrochloric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Hydrochloric acid' },
        sulfuric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1840, viscosity: 2400, desc: 'Sulfuric acid' },
        acetic_anhydride: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1080, desc: 'Acetic anhydride' },
        methylamine: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7, desc: 'Methylamine' },
        potassium_permanganate: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'powders', state: 'solid', density: 1270, desc: 'Potassium permanganate' },
        sodium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Sodium carbonate' },
        potassium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1140, desc: 'Potassium carbonate' },
        acetic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Acetic acid' },
        fatty_acid: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 900, desc: 'Fatty acid' },
        nitrogen: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Nitrogen gas' },
        dinitrogen_tetroxide: { color: ['#d32f2f', '#c62828'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1440, desc: 'Dinitrogen tetroxide' },
        tea: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1005, tempHigh: 100, stateHigh: 'steam', desc: 'Tea' },
        cocoa: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'powders', state: 'solid', density: 1450, tempHigh: 200, stateHigh: 'ash', desc: 'Cocoa powder' },
        chocolate: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1320, viscosity: 3000, tempHigh: 350, stateHigh: 'burnt_chocolate', desc: 'Chocolate' },
        fat: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 900, viscosity: 2500, tempHigh: 205, stateHigh: 'smoke', desc: 'Fat' },
        oil: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 920, viscosity: 800, tempHigh: 300, stateHigh: 'smoke', desc: 'Plant oil' },
        burnt_chocolate: { color: ['#5d4037', '#4e342e'], behavior: PW, category: 'land', state: 'solid', density: 800, desc: 'Burnt chocolate residue' },
        toluene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 867, desc: 'Toluene - aromatic solvent' },
        benzene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 879, desc: 'Benzene - aromatic hydrocarbon' },
        xylene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 860, desc: 'Xylene - industrial solvent' },
        hexane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 655, desc: 'Hexane - extraction solvent' },
        methanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 792, desc: 'Methanol - wood alcohol' },
        isopropanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 786, desc: 'Isopropanol - rubbing alcohol' },
        dichloromethane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1326, desc: 'Dichloromethane - DCM' },
        chloroform: { color: ['#e8f5e9', '#c8e6c9'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1480, desc: 'Chloroform' },
        diethyl_ether: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 713, desc: 'Diethyl ether' },
        phosphoric_acid: { color: ['#f5f5f5', '#eeeeee'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1880, viscosity: 1500, desc: 'Phosphoric acid' },
        nitric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1510, viscosity: 1200, desc: 'Nitric acid' },
        formic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1220, desc: 'Formic acid' },
        citric_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1665, desc: 'Citric acid' },
        oxalic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1900, desc: 'Oxalic acid' },
        potassium_hydroxide: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Potassium hydroxide' },
        calcium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1220, desc: 'Calcium hydroxide - slaked lime' },
        sodium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1170, desc: 'Sodium chloride - table salt' },
        potassium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1210, desc: 'Potassium nitrate' },
        sodium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1270, desc: 'Sodium nitrate' },
        ammonium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1725, desc: 'Ammonium nitrate' },
        calcium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1150, desc: 'Calcium chloride' },
        magnesium_sulfate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Magnesium sulfate - Epsom salt' },
        formaldehyde: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1083, desc: 'Formaldehyde solution' },
        phenol: { color: ['#ffccbc', '#ffab91'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1070, desc: 'Phenol - carbolic acid' },
        aniline: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1022, desc: 'Aniline - aromatic amine' },
        pyridine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 982, desc: 'Pyridine' },
        piperidine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 862, desc: 'Piperidine' },
        lithium_aluminum_hydride: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 917, desc: 'LiAlH4 - reducing agent' },
        sodium_borohydride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1074, desc: 'NaBH4 - reducing agent' },
        chlorine_gas: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'gases', state: 'gas', density: 0.9, desc: 'Chlorine gas' },
        carbon_dioxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 1.5, desc: 'Carbon dioxide' },
        carbon_monoxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 1.0, desc: 'Carbon monoxide' },
        sulfur_dioxide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 2.2, desc: 'Sulfur dioxide' },
        hydrogen_sulfide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 1.2, desc: 'Hydrogen sulfide' },
        propane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 1.5, desc: 'Propane gas' },
        ethylene: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.9, desc: 'Ethylene gas' },
        glycerol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1261, viscosity: 1500, desc: 'Glycerol' },
        ethylene_glycol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1113, desc: 'Ethylene glycol' },
        propylene_glycol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1036, desc: 'Propylene glycol' },
        dimethylformamide: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 944, desc: 'DMF - polar solvent' },
        dimethyl_sulfoxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1100, desc: 'DMSO - aprotic solvent' },
        tetrahydrofuran: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 889, desc: 'THF - cyclic ether' },
        ammonia: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 682, viscosity: 600, desc: 'Liquid ammonia' },
        thionyl_chloride: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1638, desc: 'Thionyl chloride' },
        phosphorus_pentoxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 2390, desc: 'P2O5 - desiccant' },
        sodium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 968, desc: 'Sodium metal' },
        lithium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 534, desc: 'Lithium metal' },
        palladium_catalyst: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 1200, desc: 'Palladium on carbon' },
        platinum_catalyst: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 1200, desc: 'Platinum catalyst' }
    };

    Object.entries(chemicalReagents).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh ? cfg.tempHigh + 100 : undefined,
                stateHigh: cfg.stateHigh,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                burn: 0,
                burnTime: 0,
                conduct: 0.03,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 5. MASSIVE CANNABIS GROWTH SYSTEM
    // --------------------------------------------------------------------------
    
    // Tall growth behaviors for massive plants
    const largeCannabisBehavior = [
        "XX|CR:plant_nutrients%0.002 AND M2|XX",
        "CR:plant_nutrients%0.002 AND M2|XX|CR:plant_nutrients%0.002 AND M2",
        "XX|M1|XX"
    ];

    const giantCannabisBehavior = [
        "XX|CR:plant_nutrients%0.003 AND M2|XX",
        "CR:plant_nutrients%0.003 AND M2|XX|CR:plant_nutrients%0.003 AND M2", 
        "XX|M1 AND CR:plant_nutrients%0.001|XX"
    ];

    const cannabisStrains = {
        og_kush: {
            colors: ['#3e8948', '#2d6634', '#4a9b54', '#1f4d28', '#358843'],
            thc: 0.25,
            cbd: 0.05,
            type: 'hybrid',
            growthRate: 0.0038,
            maxHeight: 10,
            behavior: giantCannabisBehavior,
            desc: 'OG Kush - legendary West Coast strain'
        },
        sour_diesel: {
            colors: ['#7cb342', '#689f38', '#558b2f', '#8bc34a', '#4caf50'],
            thc: 0.26,
            cbd: 0.02,
            type: 'sativa',
            growthRate: 0.0042,
            maxHeight: 14,
            behavior: giantCannabisBehavior,
            desc: 'Sour Diesel - energizing diesel aroma'
        },
        blue_dream: {
            colors: ['#5c6bc0', '#3949ab', '#4a5f8d', '#3f51b5', '#303f9f'],
            thc: 0.24,
            cbd: 0.03,
            type: 'hybrid',
            growthRate: 0.0035,
            maxHeight: 9,
            behavior: largeCannabisBehavior,
            desc: 'Blue Dream - balanced California classic'
        },
        girl_scout_cookies: {
            colors: ['#6a4c93', '#553c7a', '#7d5ba6', '#8e24aa', '#6a1b9a'],
            thc: 0.28,
            cbd: 0.02,
            type: 'hybrid',
            growthRate: 0.0032,
            maxHeight: 7,
            behavior: largeCannabisBehavior,
            desc: 'Girl Scout Cookies (GSC) - sweet and potent'
        },
        gorilla_glue: {
            colors: ['#4a7c2f', '#5d9033', '#3e6d27', '#689f38', '#558b2f'],
            thc: 0.30,
            cbd: 0.02,
            type: 'hybrid',
            growthRate: 0.0036,
            maxHeight: 8,
            behavior: largeCannabisBehavior,
            desc: 'Gorilla Glue #4 - extremely sticky and potent'
        },
        northern_lights: {
            colors: ['#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#4caf50'],
            thc: 0.22,
            cbd: 0.04,
            type: 'indica',
            growthRate: 0.0031,
            maxHeight: 8,
            behavior: largeCannabisBehavior,
            desc: 'Northern Lights - relaxing, purple hues'
        },
        granddaddy_purple: {
            colors: ['#6a1b9a', '#7b1fa2', '#8e24aa', '#9c27b0', '#ab47bc'],
            thc: 0.23,
            cbd: 0.03,
            type: 'indica',
            growthRate: 0.0028,
            maxHeight: 7,
            behavior: largeCannabisBehavior,
            desc: 'Granddaddy Purple - deep purple, grape aroma'
        },
        white_widow: {
            colors: ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a'],
            thc: 0.25,
            cbd: 0.02,
            type: 'hybrid',
            growthRate: 0.0039,
            maxHeight: 11,
            behavior: giantCannabisBehavior,
            desc: 'White Widow - Dutch classic, white crystals'
        },
        jack_herer: {
            colors: ['#7cb342', '#8bc34a', '#9ccc65', '#aed581', '#c5e1a5'],
            thc: 0.24,
            cbd: 0.03,
            type: 'sativa',
            growthRate: 0.0043,
            maxHeight: 13,
            behavior: giantCannabisBehavior,
            desc: 'Jack Herer - uplifting, named after activist'
        },
        green_crack: {
            colors: ['#7cb342', '#8bc34a', '#689f38', '#9ccc65', '#aed581'],
            thc: 0.24,
            cbd: 0.02,
            type: 'sativa',
            growthRate: 0.0045,
            maxHeight: 15,
            behavior: giantCannabisBehavior,
            desc: 'Green Crack - energizing, focus-enhancing'
        },
        durban_poison: {
            colors: ['#7cb342', '#8bc34a', '#9ccc65', '#aed581', '#c5e1a5'],
            thc: 0.24,
            cbd: 0.02,
            type: 'sativa',
            growthRate: 0.0048,
            maxHeight: 16,
            behavior: giantCannabisBehavior,
            desc: 'Durban Poison - African landrace, pure sativa'
        },
        ak_47: {
            colors: ['#558b2f', '#33691e', '#689f38', '#7cb342', '#8bc34a'],
            thc: 0.23,
            cbd: 0.03,
            type: 'hybrid',
            growthRate: 0.0037,
            maxHeight: 9,
            behavior: largeCannabisBehavior,
            desc: 'AK-47 - one-hit wonder'
        },
        gelato: {
            colors: ['#7b5ba6', '#9575cd', '#6a4c93', '#8e24aa', '#7b1fa2'],
            thc: 0.27,
            cbd: 0.02,
            type: 'hybrid',
            growthRate: 0.0034,
            maxHeight: 7,
            behavior: largeCannabisBehavior,
            desc: 'Gelato - dessert strain, sweet flavors'
        },
        wedding_cake: {
            colors: ['#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#8e24aa'],
            thc: 0.27,
            cbd: 0.02,
            type: 'indica',
            growthRate: 0.0030,
            maxHeight: 6,
            behavior: largeCannabisBehavior,
            desc: 'Wedding Cake - sweet, vanilla frosting aroma'
        },
        zkittlez: {
            colors: ['#8e44ad', '#9b59b6', '#7d3c98', '#6a1b9a', '#4a148c'],
            thc: 0.23,
            cbd: 0.03,
            type: 'indica',
            growthRate: 0.0029,
            maxHeight: 6,
            behavior: largeCannabisBehavior,
            desc: 'Zkittlez - fruity rainbow flavors'
        },
        runtz: {
            colors: ['#ab47bc', '#ba68c8', '#9c27b0', '#8e24aa', '#7b1fa2'],
            thc: 0.29,
            cbd: 0.02,
            type: 'hybrid',
            growthRate: 0.0033,
            maxHeight: 7,
            behavior: largeCannabisBehavior,
            desc: 'Runtz - candy-like, Instagram famous'
        },
        mac: {
            colors: ['#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c'],
            thc: 0.26,
            cbd: 0.03,
            type: 'hybrid',
            growthRate: 0.0036,
            maxHeight: 8,
            behavior: largeCannabisBehavior,
            desc: 'MAC (Miracle Alien Cookies) - unique terpenes'
        },
        purple_punch: {
            colors: ['#8e24aa', '#9c27b0', '#ab47bc', '#ba68c8', '#ce93d8'],
            thc: 0.25,
            cbd: 0.02,
            type: 'indica',
            growthRate: 0.0027,
            maxHeight: 6,
            behavior: largeCannabisBehavior,
            desc: 'Purple Punch - sedating berry dessert'
        },
        bubba_kush: {
            colors: ['#1b5e20', '#2e7d32', '#1c4d23', '#388e3c', '#43a047'],
            thc: 0.22,
            cbd: 0.04,
            type: 'indica',
            growthRate: 0.0025,
            maxHeight: 6,
            behavior: largeCannabisBehavior,
            desc: 'Bubba Kush - heavy sedation, coffee notes'
        },
        afghani: {
            colors: ['#33691e', '#558b2f', '#2e5d1f', '#689f38', '#7cb342'],
            thc: 0.20,
            cbd: 0.05,
            type: 'indica',
            growthRate: 0.0024,
            maxHeight: 5,
            behavior: largeCannabisBehavior,
            desc: 'Afghani - ancient landrace, pure indica'
        },
        blueberry: {
            colors: ['#3949ab', '#5c6bc0', '#3f51b5', '#303f9f', '#283593'],
            thc: 0.21,
            cbd: 0.03,
            type: 'indica',
            growthRate: 0.0026,
            maxHeight: 6,
            behavior: largeCannabisBehavior,
            desc: 'Blueberry - sweet berry flavor, relaxing'
        },
        trainwreck: {
            colors: ['#689f38', '#7cb342', '#558b2f', '#8bc34a', '#9ccc65'],
            thc: 0.25,
            cbd: 0.02,
            type: 'sativa',
            growthRate: 0.0040,
            maxHeight: 12,
            behavior: giantCannabisBehavior,
            desc: 'Trainwreck - fast-hitting, pine aroma'
        },
        super_lemon_haze: {
            colors: ['#cddc39', '#d4e157', '#c0ca33', '#afb42b', '#9e9d24'],
            thc: 0.25,
            cbd: 0.02,
            type: 'sativa',
            growthRate: 0.0041,
            maxHeight: 13,
            behavior: giantCannabisBehavior,
            desc: 'Super Lemon Haze - citrus burst, creative'
        },
        maui_wowie: {
            colors: ['#8bc34a', '#9ccc65', '#aed581', '#7cb342', '#689f38'],
            thc: 0.22,
            cbd: 0.03,
            type: 'sativa',
            growthRate: 0.0039,
            maxHeight: 11,
            behavior: giantCannabisBehavior,
            desc: 'Maui Wowie - Hawaiian, tropical flavors'
        },
        charlottes_web: {
            colors: ['#7cb342', '#8bc34a', '#689f38', '#9ccc65', '#aed581'],
            thc: 0.03,
            cbd: 0.17,
            type: 'sativa',
            growthRate: 0.0035,
            maxHeight: 10,
            behavior: largeCannabisBehavior,
            desc: "Charlotte's Web - high CBD, medical use"
        },
        harlequin: {
            colors: ['#689f38', '#7cb342', '#558b2f', '#8bc34a', '#9ccc65'],
            thc: 0.08,
            cbd: 0.15,
            type: 'sativa',
            growthRate: 0.0034,
            maxHeight: 9,
            behavior: largeCannabisBehavior,
            desc: 'Harlequin - balanced CBD:THC, clear-headed'
        },
        acdc: {
            colors: ['#558b2f', '#689f38', '#7cb342', '#8bc34a', '#9ccc65'],
            thc: 0.01,
            cbd: 0.20,
            type: 'sativa',
            growthRate: 0.0033,
            maxHeight: 9,
            behavior: largeCannabisBehavior,
            desc: 'AC/DC - very high CBD, minimal psychoactivity'
        },
        cannatonic: {
            colors: ['#7cb342', '#8bc34a', '#9ccc65', '#aed581', '#c5e1a5'],
            thc: 0.06,
            cbd: 0.12,
            type: 'hybrid',
            growthRate: 0.0032,
            maxHeight: 8,
            behavior: largeCannabisBehavior,
            desc: 'Cannatonic - balanced, therapeutic'
        }
    };

    // Create MASSIVE cannabis strain growth system
    Object.entries(cannabisStrains).forEach(([strainId, cfg]) => {
        
        // SEEDLING STAGE
        elements[`${strainId}_seedling`] = {
            color: ['#8bc34a', '#7cb342', '#9ccc65'],
            behavior: [
                "XX|CR:plant_nutrients%0.001|XX",
                "XX|CH:plant_nutrients%0.001|XX", 
                "CR:plant_nutrients%0.001 AND CH:plant_nutrients%0.001|XX|CR:plant_nutrients%0.001 AND CH:plant_nutrients%0.001"
            ],
            category: 'botanicals',
            tempHigh: 150,
            stateHigh: 'ash',
            state: 'solid',
            density: 700,
            grow: true,
            growTime: 80,
            growInto: `${strainId}_vegetative`,
            reactions: {
                soil: { elem1: null, elem2: null, chance: 0.005 },
                wet_soil: { elem1: null, elem2: null, chance: 0.01 },
                fertilizer: { elem1: null, elem2: null, chance: 0.02 },
                plant_nutrients: { elem1: `${strainId}_vegetative`, elem2: null, chance: 0.4 }
            },
            desc: `Young ${strainId} seedling - grows fast with nutrients`
        };

        // VEGETATIVE STAGE
        elements[`${strainId}_vegetative`] = {
            color: ['#4caf50', '#66bb6a', '#81c784'],
            behavior: largeCannabisBehavior,
            category: 'botanicals',
            tempHigh: 170,
            stateHigh: 'ash',
            state: 'solid',
            density: 750,
            grow: true,
            growTime: 120,
            growInto: `${strainId}_large`,
            reactions: {
                soil: { elem1: null, elem2: null, chance: 0.008 },
                wet_soil: { elem1: null, elem2: null, chance: 0.015 },
                fertilizer: { elem1: null, elem2: null, chance: 0.03 },
                plant_nutrients: { elem1: `${strainId}_large`, elem2: null, chance: 0.35 }
            },
            desc: `Vegetative ${strainId} plant - growing larger`
        };

        // LARGE STAGE (Massive Plant)
        elements[`${strainId}_large`] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 5,
            burnTime: 1200,
            burnInto: 'ash',
            breakInto: `seed_${strainId}`,
            state: 'solid',
            density: 600,
            grow: true,
            growTime: 100,
            growInto: `${strainId}_giant`,
            reactions: {
                soil: { elem1: null, elem2: null, chance: 0.03 },
                wet_soil: { elem1: null, elem2: null, chance: 0.06 },
                mud: { elem1: null, elem2: null, chance: 0.05 },
                fertilizer: { elem1: null, elem2: null, chance: 0.12 },
                plant_nutrients: { elem1: `${strainId}_giant`, elem2: null, chance: 0.25 },
                water: { elem1: null, elem2: null, chance: 0.02 }
            },
            tool: function(pixel) {
                changePixel(pixel, `${strainId}_flower`);
                for (let i = 0; i < 3; i++) {
                    const x = pixel.x + (Math.random() * 6 - 3);
                    const y = pixel.y + (Math.random() * 6 - 3);
                    if (x >= 0 && x < width && y >= 0 && y < height) {
                        if (!isEmpty(x, y, true)) continue;
                        createPixel(`${strainId}_flower`, x, y);
                    }
                }
                return true;
            },
            desc: `Large ${strainId} plant - massive growth! Harvest for multiple flowers.`
        };

        // GIANT STAGE (Maximum Size)
        elements[`${strainId}_giant`] = {
            color: cfg.colors,
            behavior: giantCannabisBehavior,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 5,
            burnTime: 1500,
            burnInto: 'ash',
            breakInto: [`seed_${strainId}`, `seed_${strainId}`, `seed_${strainId}`],
            state: 'solid',
            density: 500,
            grow: false,
            reactions: {
                soil: { elem1: null, elem2: null, chance: 0.04 },
                wet_soil: { elem1: null, elem2: null, chance: 0.08 },
                mud: { elem1: null, elem2: null, chance: 0.07 },
                fertilizer: { elem1: null, elem2: null, chance: 0.15 },
                plant_nutrients: { elem1: null, elem2: null, chance: 0.3 },
                water: { elem1: null, elem2: null, chance: 0.03 },
                rain: { elem1: null, elem2: null, chance: 0.05 }
            },
            tool: function(pixel) {
                changePixel(pixel, `${strainId}_flower`);
                for (let i = 0; i < 8; i++) {
                    const x = pixel.x + (Math.random() * 10 - 5);
                    const y = pixel.y + (Math.random() * 10 - 5);
                    if (x >= 0 && x < width && y >= 0 && y < height) {
                        if (!isEmpty(x, y, true)) continue;
                        createPixel(`${strainId}_flower`, x, y);
                    }
                }
                return true;
            },
            desc: `Giant ${strainId} plant - MAXIMUM SIZE! Massive yield when harvested.`
        };

        // MAIN PLANT (Flowering stage - alias for large)
        elements[strainId] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 5,
            burnTime: 800,
            burnInto: 'ash',
            breakInto: `seed_${strainId}`,
            state: 'solid',
            density: 800,
            grow: true,
            growTime: 60,
            growInto: `${strainId}_large`,
            reactions: {
                soil: { elem1: null, elem2: null, chance: 0.02 },
                wet_soil: { elem1: null, elem2: null, chance: 0.04 },
                mud: { elem1: null, elem2: null, chance: 0.03 },
                fertilizer: { elem1: null, elem2: null, chance: 0.08 },
                plant_nutrients: { elem1: `${strainId}_large`, elem2: null, chance: 0.15 },
                knife: { elem1: `${strainId}_flower`, elem2: null, chance: 0.4 },
                blade: { elem1: `${strainId}_flower`, elem2: null, chance: 0.4 },
                scissors: { elem1: `${strainId}_flower`, elem2: null, chance: 0.5 }
            },
            desc: `${cfg.desc} (${cfg.thc * 100}% THC, ${cfg.cbd * 100}% CBD) - Grows into massive plant`
        };

        // FLOWERING STAGE (alias)
        elements[`${strainId}_flowering`] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 5,
            burnTime: 800,
            burnInto: 'ash',
            breakInto: `seed_${strainId}`,
            state: 'solid',
            density: 800,
            grow: true,
            growTime: 60,
            growInto: `${strainId}_large`,
            reactions: {
                knife: { elem1: `${strainId}_flower`, elem2: null, chance: 0.4 },
                blade: { elem1: `${strainId}_flower`, elem2: null, chance: 0.4 },
                scissors: { elem1: `${strainId}_flower`, elem2: null, chance: 0.5 }
            },
            desc: `Flowering ${strainId} plant - ready for harvest or let grow larger`
        };

        // SEEDS - FAST GROWTH INTO MASSIVE PLANTS
        elements[`seed_${strainId}`] = {
            color: ['#8d6e63', '#795548', '#a1887f', '#6d4c41'],
            behavior: PW,
            category: 'botanicals',
            tempHigh: 300,
            stateHigh: 'ash',
            tempLow: -20,
            stateLow: 'frozen_seed',
            state: 'solid',
            density: 1100,
            burn: 0,
            burnTime: 0,
            conduct: 0.05,
            reactions: {
                soil: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.08, tempMin: 18 },
                wet_soil: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.12, tempMin: 18 },
                mud: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.15, tempMin: 18 },
                water: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.06, tempMin: 18 },
                fertilizer: { elem1: `${strainId}_seedling`, elem2: null, chance: 0.20, tempMin: 18 },
                plant_nutrients: { elem1: `${strainId}_vegetative`, elem2: null, chance: 0.25, tempMin: 18 }
            },
            desc: `${cfg.desc.split(' - ')[0]} seeds - ${cfg.type} - Grows into MASSIVE plants with nutrients`
        };

        // FLOWER PRODUCT (Harvested buds)
        elements[`${strainId}_flower`] = {
            color: cfg.colors,
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 700,
            tempHigh: 175,
            stateHigh: ['smoke', 'thc_vapor'],
            burn: 3,
            burnTime: 1000,
            breakInto: ['cannabis_trichomes', 'plant_matter'],
            reactions: {
                butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25 },
                ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18 },
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2 },
                hexane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.28 }
            },
            desc: `${cfg.desc} - ${cfg.thc * 100}% THC - Harvested from massive plants`
        };
    });

    // --------------------------------------------------------------------------
    // 6. PLANT NUTRIENTS FOR MASSIVE GROWTH
    // --------------------------------------------------------------------------
    
    if (!elements.plant_nutrients) {
        elements.plant_nutrients = {
            color: ['#fff9c4', '#ffecb3', '#ffe082'],
            behavior: PW,
            category: 'tools',
            state: 'solid',
            density: 900,
            reactions: {},
            desc: 'Plant nutrients - SUPERCHARGES growth into massive plants!'
        };
    }

    // Add nutrient reactions for all cannabis growth stages
    const nutrientReactions = {};
    Object.keys(cannabisStrains).forEach(strain => {
        nutrientReactions[`${strain}_seedling`] = { elem1: `${strain}_vegetative`, elem2: null, chance: 0.4 };
        nutrientReactions[`${strain}_vegetative`] = { elem1: `${strain}_large`, elem2: null, chance: 0.35 };
        nutrientReactions[strain] = { elem1: `${strain}_large`, elem2: null, chance: 0.3 };
        nutrientReactions[`${strain}_flowering`] = { elem1: `${strain}_large`, elem2: null, chance: 0.3 };
        nutrientReactions[`${strain}_large`] = { elem1: `${strain}_giant`, elem2: null, chance: 0.25 };
    });
    
    elements.plant_nutrients.reactions = nutrientReactions;

    // --------------------------------------------------------------------------
    // 7. ENHANCED TOOLS FOR MASSIVE PLANTS
    // --------------------------------------------------------------------------
    
    // Scissors for harvesting massive plants
    if (!elements.scissors) {
        elements.scissors = {
            color: ['#9e9e9e', '#757575', '#616161'],
            behavior: WALL,
            category: 'tools',
            state: 'solid',
            density: 7850,
            conduct: 0.8,
            tempHigh: 1540,
            stateHigh: 'molten_steel',
            hardness: 0.9,
            breakInto: 'scrap_metal',
            tool: function(pixel) {
                const harvestMap = {};
                
                // Add all strain harvesting
                Object.keys(cannabisStrains).forEach(strain => {
                    harvestMap[strain] = `${strain}_flower`;
                    harvestMap[`${strain}_flowering`] = `${strain}_flower`;
                    harvestMap[`${strain}_large`] = `${strain}_flower`;
                    harvestMap[`${strain}_giant`] = `${strain}_flower`;
                });
                
                if (harvestMap[pixel.element]) {
                    // For giant plants, create extra flowers
                    if (pixel.element.includes('_giant')) {
                        changePixel(pixel, `${pixel.element.split('_giant')[0]}_flower`);
                        for (let i = 0; i < 6; i++) {
                            const x = pixel.x + (Math.random() * 8 - 4);
                            const y = pixel.y + (Math.random() * 8 - 4);
                            if (x >= 0 && x < width && y >= 0 && y < height) {
                                if (!isEmpty(x, y, true)) continue;
                                createPixel(`${pixel.element.split('_giant')[0]}_flower`, x, y);
                            }
                        }
                    } else {
                        changePixel(pixel, harvestMap[pixel.element]);
                    }
                    return true;
                }
                return false;
            },
            desc: 'Scissors - perfect for harvesting massive cannabis plants'
        };
    }

    // Enhanced Grow Light
    if (!elements.grow_light) {
        elements.grow_light = {
            color: ['#fff59d', '#fff176', '#ffee58'],
            behavior: [
                "XX|CR:plant_nutrients%0.2 AND M2|XX",
                "CR:plant_nutrients%0.2 AND M2|XX|CR:plant_nutrients%0.2 AND M2",
                "XX|M1 AND CR:plant_nutrients%0.1|XX"
            ],
            category: 'machines',
            state: 'solid',
            density: 2500,
            temp: 25,
            tempHigh: 200,
            stateHigh: 'molten_steel',
            conduct: 0.8,
            desc: 'Enhanced grow light - promotes MASSIVE plant growth'
        };
    }

    // --------------------------------------------------------------------------
    // 8. PRECURSORS & REAGENTS
    // --------------------------------------------------------------------------
    const precursors = {
        ephedrine: {
            colors: ['#ffffff', '#fafafa', '#f5f5f5'],
            density: 1180,
            tempHigh: 255,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'pseudoephedrine', elem2: null, chance: 0.15, tempMin: 120 },
                catalyst: { elem1: 'pseudoephedrine', elem2: null, chance: 0.12, tempMin: 100 },
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 },
                lithium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.2, tempMin: 100 },
                sodium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.18, tempMin: 100 }
            },
            desc: 'Ephedrine HCl - white crystalline'
        },
        pseudoephedrine: {
            colors: ['#f5f5f5', '#fafafa', '#eeeeee'],
            density: 1200,
            tempHigh: 260,
            stateHigh: 'smoke',
            reactions: {
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 },
                lithium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.2, tempMin: 100 }
            },
            desc: 'Pseudoephedrine - white powder'
        },
        nicotine: {
            colors: ['#f5f5f5', '#e0e0e0'],
            density: 1010,
            liquid: true,
            viscosity: 2500,
            tempHigh: 247,
            stateHigh: 'nicotine_vapor',
            reactions: {
                water: { elem1: 'nicotine_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Nicotine - oily liquid'
        },
        caffeine: {
            colors: ['#ffffff', '#fafafa'],
            density: 1230,
            tempHigh: 238,
            stateHigh: 'smoke',
            reactions: {
                water: { elem1: 'tea', elem2: null, chance: 0.15 }
            },
            desc: 'Caffeine - white powder, stimulant'
        },
        lsa: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1280,
            tempHigh: 180,
            stateHigh: 'smoke',
            reactions: {
                ethanol: { elem1: 'lsa_solution', elem2: null, chance: 0.15 },
                lithium_aluminum_hydride: { elem1: 'lsd', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'Lysergic acid amide'
        },
        theobromine: {
            colors: ['#f5f5f5', '#ffffff'],
            density: 1340,
            tempHigh: 290,
            stateHigh: 'smoke',
            desc: 'Theobromine - chocolate alkaloid'
        },
        ammonia: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 682,
            liquid: true,
            viscosity: 600,
            tempHigh: -33,
            stateHigh: 'ammonia_gas',
            reactions: {
                nitrogen: { elem1: 'ammonia', elem2: null, chance: 0.1, tempMin: 400 },
                hydrogen: { elem1: 'ammonia', elem2: null, chance: 0.12, tempMin: 450 }
            },
            desc: 'Ammonia - pungent liquid'
        },
        nitric_acid: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1510,
            liquid: true,
            viscosity: 1200,
            tempHigh: 83,
            stateHigh: 'nitrogen_dioxide',
            reactions: {
                ammonia: { elem1: 'nitric_acid', elem2: null, chance: 0.15, tempMin: 200 }
            },
            desc: 'Nitric acid - strong oxidizer'
        },
        glycerol: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1261,
            liquid: true,
            viscosity: 1500,
            tempHigh: 290,
            stateHigh: 'steam',
            reactions: {
                fat: { elem1: 'glycerol', elem2: 'fatty_acid', chance: 0.2, tempMin: 100 }
            },
            desc: 'Glycerol - sweet, viscous'
        },
        phenylacetone: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1015,
            liquid: true,
            viscosity: 1200,
            tempHigh: 216,
            stateHigh: 'smoke',
            reactions: {
                methylamine: { elem1: 'methamphetamine', elem2: null, chance: 0.3, tempMin: 80 },
                ammonia: { elem1: 'amphetamine', elem2: null, chance: 0.25, tempMin: 85 }
            },
            desc: 'P2P - amphetamine precursor'
        },
        safrole: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1096,
            liquid: true,
            viscosity: 1100,
            tempHigh: 234,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'mdp2p', elem2: null, chance: 0.25, tempMin: 100 },
                potassium_permanganate: { elem1: 'mdp2p', elem2: null, chance: 0.3, tempMin: 90 }
            },
            desc: 'Safrole - MDMA precursor oil'
        },
        mdp2p: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1040,
            liquid: true,
            viscosity: 1600,
            tempHigh: 130,
            stateHigh: 'mdma_smoke',
            reactions: {
                methylamine: { elem1: 'mdma', elem2: null, chance: 0.35, tempMin: 80 },
                ammonia: { elem1: 'mda', elem2: null, chance: 0.3, tempMin: 85 }
            },
            desc: 'MDP2P - MDMA intermediate'
        },
        ergotamine: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1320,
            tempHigh: 213,
            stateHigh: 'smoke',
            reactions: {
                lithium_aluminum_hydride: { elem1: 'lsd', elem2: null, chance: 0.3, tempMin: 70 },
                diethyl_ether: { elem1: 'lsd', elem2: null, chance: 0.25, tempMin: 60 }
            },
            desc: 'Ergotamine - LSD precursor'
        },
        lysergic_acid: {
            colors: ['#ffffff', '#fafafa'],
            density: 1280,
            tempHigh: 240,
            stateHigh: 'smoke',
            reactions: {
                diethyl_ether: { elem1: 'lsd', elem2: null, chance: 0.35, tempMin: 50 },
                thionyl_chloride: { elem1: 'lsd', elem2: null, chance: 0.4, tempMin: 60 }
            },
            desc: 'Lysergic acid - LSD precursor'
        },
        tryptamine: {
            colors: ['#ffffff', '#fafafa'],
            density: 1090,
            tempHigh: 174,
            stateHigh: 'smoke',
            reactions: {
                dimethylformamide: { elem1: 'dmt', elem2: null, chance: 0.3, tempMin: 80 },
                formaldehyde: { elem1: 'dmt', elem2: null, chance: 0.25, tempMin: 90 }
            },
            desc: 'Tryptamine - DMT precursor'
        },
        indole: {
            colors: ['#ffffff', '#fafafa'],
            density: 1175,
            tempHigh: 254,
            stateHigh: 'smoke',
            reactions: {
                formaldehyde: { elem1: 'tryptamine', elem2: null, chance: 0.25, tempMin: 100 }
            },
            desc: 'Indole - tryptamine precursor'
        },
        piperidine_precursor: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 862,
            liquid: true,
            viscosity: 800,
            tempHigh: 106,
            stateHigh: 'smoke',
            reactions: {
                phenylacetone: { elem1: 'pcp', elem2: null, chance: 0.3, tempMin: 80 },
                benzene: { elem1: 'pcp', elem2: null, chance: 0.25, tempMin: 90 }
            },
            desc: 'Piperidine - PCP precursor'
        },
        cyclohexanone: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 948,
            liquid: true,
            viscosity: 1000,
            tempHigh: 156,
            stateHigh: 'smoke',
            reactions: {
                piperidine: { elem1: 'ketamine', elem2: null, chance: 0.3, tempMin: 70 },
                methylamine: { elem1: 'ketamine', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'Cyclohexanone - ketamine precursor'
        },
        acetic_acid_anhydride: {
            colors: ['#ffffff', '#f5f5f5'],
            density: 1080,
            liquid: true,
            viscosity: 900,
            tempHigh: 140,
            stateHigh: 'smoke',
            reactions: {
                morphine: { elem1: 'heroin', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 },
                morphine_base: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 }
            },
            desc: 'Acetic anhydride - acetylating agent'
        },
        thebaine: {
            colors: ['#bcaaa4', '#a1887f'],
            density: 1300,
            tempHigh: 193,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'oxycodone', elem2: null, chance: 0.3, tempMin: 100 },
                sodium_borohydride: { elem1: 'hydrocodone', elem2: null, chance: 0.28, tempMin: 90 }
            },
            desc: 'Thebaine - opioid precursor'
        },
        acrylfentanyl_precursor: {
            colors: ['#ffffff', '#fafafa'],
            density: 1150,
            tempHigh: 120,
            stateHigh: 'smoke',
            reactions: {
                aniline: { elem1: 'fentanyl', elem2: null, chance: 0.35, tempMin: 70 },
                phenyl: { elem1: 'carfentanil', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'Fentanyl precursor'
        },
        cathinone_precursor: {
            colors: ['#ffffff', '#fafafa'],
            density: 1190,
            tempHigh: 220,
            stateHigh: 'smoke',
            reactions: {
                methylamine: { elem1: 'mephedrone', elem2: null, chance: 0.3, tempMin: 80 },
                ethanol: { elem1: 'methylone', elem2: null, chance: 0.28, tempMin: 85 }
            },
            desc: 'Cathinone precursor base'
        },
        gamma_butyrolactone: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1130,
            liquid: true,
            viscosity: 1500,
            tempHigh: 204,
            stateHigh: 'steam',
            reactions: {
                sodium_hydroxide: { elem1: 'ghb', elem2: null, chance: 0.35 },
                water: { elem1: 'ghb', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'GBL - GHB precursor'
        },
        synthetic_cannabinoid_base: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1180,
            tempHigh: 178,
            stateHigh: 'synthetic_cannabinoid_smoke',
            reactions: {
                indole: { elem1: 'jwh_018', elem2: null, chance: 0.3, tempMin: 90 }
            },
            desc: 'Synthetic cannabinoid base'
        }
    };

    Object.entries(precursors).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.colors,
            behavior: cfg.liquid ? LIQ : PW,
            category: 'precursors',
            state: cfg.liquid ? 'liquid' : 'solid',
            density: cfg.density,
            viscosity: cfg.viscosity,
            tempHigh: cfg.tempHigh + 100,
            stateHigh: cfg.stateHigh,
            burn: 0,
            burnTime: 0,
            conduct: 0.03,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 9. INTERMEDIATES & FINAL COMPOUNDS
    // --------------------------------------------------------------------------
    const intermediates = {
        cocaine_sulfate: {
            colors: ['#f5f5f5', '#fafafa'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1180,
            tempHigh: 180,
            stateHigh: 'smoke',
            reactions: {
                sodium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.3 },
                ammonium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.25 },
                potassium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.28 }
            },
            desc: 'Cocaine sulfate - intermediate'
        },
        cocaine_base: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1150,
            tempHigh: 98,
            stateHigh: 'crack_smoke',
            reactions: {
                hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.35 },
                acetic_acid: { elem1: 'cocaine', elem2: null, chance: 0.3 }
            },
            desc: 'Cocaine freebase'
        },
        meth_intermediate: {
            colors: ['#e0e0e0', '#eeeeee'],
            behavior: LIQ,
            viscosity: 1800,
            category: 'precursors',
            state: 'liquid',
            density: 980,
            tempHigh: 150,
            stateHigh: 'meth_smoke',
            reactions: {
                hydrochloric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.35 },
                sulfuric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.3 }
            },
            desc: 'Methamphetamine freebase'
        },
        mdma_intermediate: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            viscosity: 1600,
            category: 'precursors',
            state: 'liquid',
            density: 1040,
            tempHigh: 130,
            stateHigh: 'mdma_smoke',
            reactions: {
                methylamine: { elem1: 'mdma', elem2: null, chance: 0.25, tempMin: 100 },
                hydrochloric_acid: { elem1: 'mdma', elem2: null, chance: 0.3 }
            },
            desc: 'MDP2P - MDMA precursor'
        },
        heroin_base: {
            colors: ['#8d6e63', '#a1887f', '#795548'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1320,
            tempHigh: 170,
            stateHigh: 'heroin_smoke',
            reactions: {
                hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 },
                citric_acid: { elem1: 'heroin', elem2: null, chance: 0.25 }
            },
            desc: 'Heroin base - #3 form'
        },
        morphine_base: {
            colors: ['#bcaaa4', '#a1887f', '#8d6e63'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1230,
            tempHigh: 197,
            stateHigh: 'morphine_smoke',
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 },
                acetic_acid_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 }
            },
            desc: 'Morphine base'
        },
        mda_intermediate: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1180,
            tempHigh: 187,
            stateHigh: 'smoke',
            reactions: {
                formaldehyde: { elem1: 'mdma', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'MDA - MDMA precursor'
        }
    };

    Object.entries(intermediates).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: cfg.category,
            state: cfg.state,
            density: cfg.density,
            viscosity: cfg.viscosity,
            tempHigh: cfg.tempHigh + 100,
            stateHigh: cfg.stateHigh,
            burn: 0,
            burnTime: 0,
            conduct: 0.03,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 10. FINAL COMPOUNDS
    // --------------------------------------------------------------------------
    const finalCompounds = {
        cocaine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 195,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'cocaine_solution', elem2: null, chance: 0.2 },
                baking_soda: { elem1: 'crack_slurry', elem2: null, chance: 0.25 },
                sodium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.3 }
            },
            desc: 'Schedule II - Cocaine HCl'
        },
        crack: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 98,
            stateHigh: 'crack_smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Crack cocaine'
        },
        methamphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 170,
            stateHigh: 'meth_smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'meth_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule II - Methamphetamine'
        },
        amphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 200,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Amphetamine'
        },
        mdma: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 148,
            stateHigh: 'mdma_smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'mdma_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule I - MDMA'
        },
        mda: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1190,
            tempHigh: 187,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                formaldehyde: { elem1: 'mdma', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'Schedule I - MDA'
        },
        heroin: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1350,
            tempHigh: 173,
            stateHigh: 'heroin_smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule I - Heroin'
        },
        morphine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1320,
            tempHigh: 255,
            stateHigh: 'morphine_smoke',
            burn: 0, burnTime: 0,
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.3, tempMin: 85 }
            },
            desc: 'Schedule II - Morphine'
        },
        psilocybin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1280,
            tempHigh: 220,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'psilocybin_tea', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule I - Psilocybin'
        },
        psilocin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1270,
            tempHigh: 173,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Psilocin'
        },
        mescaline: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 183,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'mescaline_tea', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule I - Mescaline'
        },
        lsd: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1300,
            tempHigh: 83,
            stateHigh: 'lsd_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - LSD'
        },
        dmt: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 160,
            stateHigh: 'dmt_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - DMT'
        },
        fentanyl: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1400,
            tempHigh: 87,
            stateHigh: 'fentanyl_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Fentanyl'
        },
        carfentanil: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1420,
            tempHigh: 91,
            stateHigh: 'fentanyl_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Carfentanil'
        },
        pcp: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1240,
            tempHigh: 233,
            stateHigh: 'pcp_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - PCP'
        },
        ketamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 262,
            stateHigh: 'ketamine_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule III - Ketamine'
        },
        ghb: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            viscosity: 1800,
            category: 'research_compounds',
            state: 'liquid',
            density: 1120,
            tempHigh: 100,
            stateHigh: 'steam',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - GHB'
        },
        gbl: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            viscosity: 1500,
            category: 'research_compounds',
            state: 'liquid',
            density: 1130,
            tempHigh: 204,
            stateHigh: 'steam',
            burn: 0, burnTime: 0,
            reactions: {
                sodium_hydroxide: { elem1: 'ghb', elem2: null, chance: 0.35 },
                water: { elem1: 'ghb', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'Schedule I - GBL'
        },
        codeine: {
            color: ['#f5f5f5', '#ffffff'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1340,
            tempHigh: 157,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                morphine: { elem1: 'codeine', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule II - Codeine'
        },
        oxycodone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1360,
            tempHigh: 219,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Oxycodone'
        },
        hydrocodone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1340,
            tempHigh: 198,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Hydrocodone'
        },
        mephedrone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 194,
            stateHigh: 'mephedrone_smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Mephedrone'
        },
        methylone: {
            color: ['#f5f5f5', '#ffffff'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1220,
            tempHigh: 201,
            stateHigh: 'methylone_smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Methylone'
        },
        jwh_018: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 178,
            stateHigh: 'synthetic_cannabinoid_smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - JWH-018'
        },
        _2c_b: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1260,
            tempHigh: 235,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 2C-B'
        },
        _4_aco_dmt: {
            color: ['#ffccbc', '#ffab91'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 185,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 4-AcO-DMT'
        },
        tramadol: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1310,
            tempHigh: 180,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule IV - Tramadol'
        },
        ayahuasca_brew: {
            color: ['#8d6e63', '#795548'],
            behavior: LIQ,
            viscosity: 1800,
            category: 'research_compounds',
            state: 'liquid',
            density: 1050,
            tempHigh: 100,
            stateHigh: 'steam',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Ayahuasca brew'
        },
        kava_extract: {
            color: ['#827717', '#9e9d24'],
            behavior: LIQ,
            viscosity: 2200,
            category: 'research_compounds',
            state: 'liquid',
            density: 1120,
            tempHigh: 95,
            stateHigh: 'steam',
            burn: 0, burnTime: 0,
            desc: 'Unscheduled - Kava extract'
        },
        salvinorin_a: {
            color: ['#004d40', '#00695c'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 238,
            stateHigh: 'salvinorin_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Salvinorin A'
        },
        ibogaine: {
            color: ['#3e2723', '#4e342e'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1320,
            tempHigh: 152,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Ibogaine'
        },
        cathinone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1190,
            tempHigh: 220,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                methylamine: { elem1: 'mephedrone', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'Cathinone - stimulant from khat'
        },
        mitragynine: {
            color: ['#8d6e63', '#795548'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 240,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Mitragynine - kratom alkaloid'
        }
    };

    Object.entries(finalCompounds).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh + 150,
                stateHigh: cfg.stateHigh,
                burn: 0,
                burnTime: 0,
                conduct: 0.02,
                reactions: cfg.reactions,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 11. UNIVERSAL PRECURSOR
    // --------------------------------------------------------------------------
    if (!elements.universal_precursor) {
        elements.universal_precursor = {
            color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
            behavior: PW,
            category: 'special',
            state: 'solid',
            density: 1000,
            reactions: {
                dirt: { 
                    elem1: [
                        ...Object.keys(cannabisStrains),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_seedling`),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_vegetative`),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_large`),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_giant`),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_flowering`),
                        ...Object.keys(cannabisStrains).map(strain => `${strain}_flower`),
                        'ephedrine', 'pseudoephedrine', 'nicotine', 'caffeine', 'lsa',
                        'cocaine', 'methamphetamine', 'heroin', 'mdma', 'lsd',
                        'psilocybin', 'mescaline', 'dmt', 'fentanyl', 'ketamine'
                    ], 
                    elem2: null, 
                    chance: 0.1 
                },
                salt: { 
                    elem1: [
                        'ephedrine', 'pseudoephedrine', 'nicotine', 'caffeine', 'lsa',
                        'sodium_hydroxide', 'ammonium_hydroxide', 'hydrochloric_acid',
                        'acetic_anhydride', 'methylamine', 'potassium_permanganate'
                    ], 
                    elem2: null, 
                    chance: 0.08 
                },
                sugar: { 
                    elem1: [
                        'methamphetamine', 'amphetamine', 'mdma', 'mda', 'heroin', 'morphine',
                        'fentanyl', 'carfentanil', 'lsd', 'psilocybin', 'psilocin',
                        'cocaine', 'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl'
                    ], 
                    elem2: null, 
                    chance: 0.05 
                },
                water: {
                    elem1: [
                        'cocaine', 'methamphetamine', 'heroin', 'mdma', 'lsd'
                    ],
                    elem2: null,
                    chance: 0.03
                },
                fire: {
                    elem1: [
                        'crack', 'heroin_base', 'cocaine_base', 'methamphetamine'
                    ],
                    elem2: null,
                    chance: 0.04
                },
                plant_nutrients: {
                    elem1: 'plant_nutrients',
                    elem2: null,
                    chance: 0.1
                }
            },
            desc: 'Universal precursor - creates everything including MASSIVE cannabis plants'
        };
    }

    // --------------------------------------------------------------------------
    // 12. CONSOLE LOG - COMPLETE SYSTEM
    // --------------------------------------------------------------------------
    
    console.log('🌿 CHEMRESEARCH v3.3 - COMPLETE MASSIVE PLANTS SYSTEM!');
    console.log('='.repeat(70));
    console.log('🔥 COMPLETE CHEMISTRY:');
    console.log('  ✓ 500+ chemical elements and compounds');
    console.log('  ✓ Complete synthesis pathways for all research compounds');
    console.log('  ✓ Universal precursor creates everything');
    console.log('');
    console.log('🌱 MASSIVE CANNABIS PLANTS:');
    console.log('  ✓ ' + Object.keys(cannabisStrains).length + ' cannabis strains');
    console.log('  ✓ 4 Growth stages: seedling → vegetative → LARGE → GIANT');
    console.log('  ✓ Plants grow 12-16+ pixels TALL (like your screenshot)');
    console.log('  ✓ Giant plants yield 8+ flowers when harvested');
    console.log('  ✓ Enhanced tools: scissors, plant_nutrients, grow_light');
    console.log('');
    console.log('🚀 QUICK MASSIVE GROWTH:');
    console.log('  seed_og_kush + plant_nutrients = instant vegetative');
    console.log('  og_kush + plant_nutrients = instant LARGE plant');
    console.log('  og_kush_large + plant_nutrients = instant GIANT plant');
    console.log('  GIANT plants = 8+ flowers + 3 seeds when harvested!');
    console.log('');
    console.log('✅ COMPLETE SYSTEM READY - Chemistry + Massive Plants!');

})();
