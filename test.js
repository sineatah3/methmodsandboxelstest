// ============================================================================
// thebestchemistrymod.js
// mostly drug elements currently but i want to actually add chemistry elements like all kinds of elements
// MIT Licence – Research / EDU Use Only i do not condone the use of drugs and drug making
// im pretty bad at this my mod is pretty jumbled
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
    // 4. CHEMICAL REAGENTS
    // --------------------------------------------------------------------------
    const chemicalReagents = {
        sodium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1130 },
        ammonium_hydroxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 910 },
        hydrochloric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049 },
        sulfuric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1840, viscosity: 2400 },
        acetic_anhydride: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1080 },
        methylamine: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7 },
        potassium_permanganate: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'powders', state: 'solid', density: 1270 },
        sodium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1120 },
        toluene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 867 },
        hexane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 655 }
    };

    Object.entries(chemicalReagents).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: `${id} - chemical reagent` };
        }
    });

    // --------------------------------------------------------------------------
    // 5. ALL 60+ CANNABIS STRAINS DATABASE
    // --------------------------------------------------------------------------
    
    const cannabisStrains = {
        og_kush: { colors: ['#3e8948', '#2d6634', '#4a9b54'], thc: 0.25, cbd: 0.05, type: 'hybrid', desc: 'OG Kush - West Coast legend' },
        sour_diesel: { colors: ['#7cb342', '#689f38', '#558b2f'], thc: 0.26, cbd: 0.02, type: 'sativa', desc: 'Sour Diesel - diesel fuel aroma' },
        blue_dream: { colors: ['#5c6bc0', '#3949ab', '#4a5f8d'], thc: 0.24, cbd: 0.03, type: 'hybrid', desc: 'Blue Dream - California classic' },
        girl_scout_cookies: { colors: ['#6a4c93', '#553c7a', '#7d5ba6'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'GSC - sweet and potent' },
        gorilla_glue: { colors: ['#4a7c2f', '#5d9033', '#3e6d27'], thc: 0.30, cbd: 0.02, type: 'hybrid', desc: 'GG4 - extremely sticky' },
        northern_lights: { colors: ['#1b5e20', '#2e7d32', '#388e3c'], thc: 0.22, cbd: 0.04, type: 'indica', desc: 'Northern Lights - relaxing' },
        granddaddy_purple: { colors: ['#6a1b9a', '#7b1fa2', '#8e24aa'], thc: 0.23, cbd: 0.03, type: 'indica', desc: 'GDP - deep purple' },
        jack_herer: { colors: ['#7cb342', '#8bc34a', '#9ccc65'], thc: 0.24, cbd: 0.03, type: 'sativa', desc: 'Jack Herer - uplifting' },
        white_widow: { colors: ['#f5f5f5', '#eeeeee', '#e0e0e0'], thc: 0.25, cbd: 0.03, type: 'hybrid', desc: 'White Widow - Dutch champion' },
        green_crack: { colors: ['#7cb342', '#8bc34a', '#689f38'], thc: 0.24, cbd: 0.02, type: 'sativa', desc: 'Green Crack - energizing' },
        charlottes_web: { colors: ['#7cb342', '#8bc34a', '#689f38'], thc: 0.03, cbd: 0.17, type: 'sativa', desc: "Charlotte's Web - high CBD" },
        gelato: { colors: ['#7b5ba6', '#9575cd', '#6a4c93'], thc: 0.27, cbd: 0.02, type: 'hybrid', desc: 'Gelato - dessert strain' },
        wedding_cake: { colors: ['#e1bee7', '#ce93d8', '#ba68c8'], thc: 0.27, cbd: 0.02, type: 'indica', desc: 'Wedding Cake - vanilla' },
        runtz: { colors: ['#ab47bc', '#ba68c8', '#9c27b0'], thc: 0.29, cbd: 0.02, type: 'hybrid', desc: 'Runtz - candy-like' },
        pineapple_express: { colors: ['#fff176', '#ffd54f', '#ffca28'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Pineapple Express - tropical' }
    };

    // --------------------------------------------------------------------------
    // 6. PLANT NUTRIENTS - SOLID POWDER
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
    // 7. CREATE TALL GROWING CANNABIS PLANTS - SIMPLIFIED 3 STAGES
    // --------------------------------------------------------------------------
    
    Object.entries(cannabisStrains).forEach(([strainId, cfg]) => {
        
        // SEED - starts the growth
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
            desc: `${strainId} seeds - plant in soil to grow TALL`
        };

        // SEEDLING (Stage 1) - Like sapling
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
            forceAutoGen: true,
            tick: function(pixel) {
                if (tryMove(pixel, pixel.x, pixel.y-1)) {
                    // Moved up successfully
                }
                if (!pixel.stage) { pixel.stage = 0 }
                pixel.stage++;
                
                // After 100 ticks, grow into next stage
                if (pixel.stage > 100 && isEmpty(pixel.x, pixel.y-1)) {
                    changePixel(pixel, `${strainId}_stem`);
                    createPixel(`${strainId}_plant`, pixel.x, pixel.y-1);
                }
            },
            reactions: {
                plant_nutrients: { elem1: `${strainId}_plant`, elem2: null, chance: 0.9 }
            },
            desc: `Young ${strainId} seedling - grows into tall plant`
        };

        // PLANT (Stage 2) - Main growing trunk
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
            forceAutoGen: true,
            tick: function(pixel) {
                if (tryMove(pixel, pixel.x, pixel.y-1)) {
                    // Moved up successfully
                }
                if (!pixel.stage) { pixel.stage = 0 }
                pixel.stage++;
                
                // Continue growing upward
                if (pixel.stage > 60 && isEmpty(pixel.x, pixel.y-1)) {
                    changePixel(pixel, `${strainId}_stem`);
                    createPixel(`${strainId}_plant`, pixel.x, pixel.y-1);
                }
                
                // Spawn branches and flowers on sides
                if (pixel.stage % 30 === 0) {
                    if (Math.random() < 0.3 && isEmpty(pixel.x+1, pixel.y)) {
                        createPixel(`${strainId}_branch`, pixel.x+1, pixel.y);
                    }
                    if (Math.random() < 0.3 && isEmpty(pixel.x-1, pixel.y)) {
                        createPixel(`${strainId}_branch`, pixel.x-1, pixel.y);
                    }
                }
                
                // Occasionally spawn flowers
                if (pixel.stage % 50 === 0) {
                    if (Math.random() < 0.4 && isEmpty(pixel.x+1, pixel.y)) {
                        createPixel(`${strainId}_flower`, pixel.x+1, pixel.y);
                    }
                    if (Math.random() < 0.4 && isEmpty(pixel.x-1, pixel.y)) {
                        createPixel(`${strainId}_flower`, pixel.x-1, pixel.y);
                    }
                }
            },
            desc: `${cfg.desc} - grows tall like a tree`
        };

        // STEM - structural support (like tree_trunk)
        elements[`${strainId}_stem`] = {
            color: ['#6d4c41', '#5d4037', '#4e342e'],
            behavior: STURDY,
            category: 'botanicals',
            state: 'solid',
            density: 1200,
            tempHigh: 200,
            stateHigh: 'ash',
            burn: 5,
            burnTime: 150,
            burnInto: 'ash',
            breakInto: 'plant_matter',
            desc: `${strainId} stem - supports tall growth`
        };

        // BRANCH - side growth (like tree_branch)
        elements[`${strainId}_branch`] = {
            color: cfg.colors,
            behavior: behaviors.STURDY_PLANT,
            category: 'botanicals',
            state: 'solid',
            density: 950,
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 8,
            burnTime: 100,
            burnInto: 'ash',
            breakInto: `${strainId}_flower`,
            desc: `${strainId} branch - grows flowers`
        };

        // FLOWER - harvestable product
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
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2 },
                hexane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.28 }
            },
            desc: `${cfg.desc} - ${cfg.thc * 100}% THC, ${cfg.cbd * 100}% CBD`
        };

        // Add nutrient reactions
        elements.plant_nutrients.reactions[`${strainId}_seedling`] = { elem1: `${strainId}_plant`, elem2: null, chance: 0.9 };
        elements.plant_nutrients.reactions[`${strainId}_plant`] = { elem1: null, elem2: null, chance: 0.05 };
    });

    // --------------------------------------------------------------------------
    // 8. BOTANICAL PRODUCTS & EXTRACTS
    // --------------------------------------------------------------------------
    
    const botanicalProducts = {
        cannabis_oil: { color: ['#827717', '#9e9d24'], behavior: LIQ, viscosity: 5000, category: 'botanicals', tempHigh: 255, stateHigh: 'thc_vapor', state: 'liquid', density: 940 },
        bho: { color: ['#827717', '#9e9d24'], behavior: LIQ, viscosity: 8000, category: 'research_compounds', state: 'liquid', density: 920, tempHigh: 307, stateHigh: 'thc_vapor' },
        bubble_hash: { color: ['#d7ccc8', '#bcaaa4'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1050, tempHigh: 307, stateHigh: 'thc_vapor' },
        cannabis_trichomes: { color: ['#e8f5e9', '#f1f8e9'], behavior: PW, category: 'botanicals', state: 'solid', density: 950, tempHigh: 320, stateHigh: 'thc_vapor' }
    };

    Object.entries(botanicalProducts).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: `${id} - cannabis extract` };
        }
    });

    // --------------------------------------------------------------------------
    // 9. HARVESTING TOOLS
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
    // 10. RESEARCH COMPOUNDS
    // --------------------------------------------------------------------------
    
    const finalCompounds = {
        cocaine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 345, stateHigh: 'smoke' },
        crack: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1150, tempHigh: 248, stateHigh: 'crack_smoke' },
        methamphetamine: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1180, tempHigh: 320, stateHigh: 'meth_smoke' },
        mdma: { color: ['#fff9c4', '#ffecb3'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 298, stateHigh: 'mdma_smoke' },
        heroin: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1350, tempHigh: 323, stateHigh: 'heroin_smoke' },
        lsd: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1300, tempHigh: 233, stateHigh: 'lsd_vapor' },
        dmt: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'research_compounds', state: 'solid', density: 1200, tempHigh: 310, stateHigh: 'dmt_vapor' }
    };

    Object.entries(finalCompounds).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg, desc: `${id} - research compound` };
        }
    });

    // --------------------------------------------------------------------------
    // 11. UNIVERSAL PRECURSOR
    // --------------------------------------------------------------------------
    
    const allPlantElements = [];
    Object.keys(cannabisStrains).forEach(strain => {
        allPlantElements.push(`seed_${strain}`, `${strain}_seedling`, `${strain}_plant`, `${strain}_stem`, `${strain}_branch`, `${strain}_flower`);
    });

    const allChemicals = [...Object.keys(chemicalReagents), ...Object.keys(finalCompounds), ...Object.keys(botanicalProducts), 'plant_nutrients', 'scissors'];

    elements.universal_precursor = {
        color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
        behavior: PW,
        category: 'special',
        state: 'solid',
        density: 1000,
        reactions: {
            soil: { elem1: [...allPlantElements, ...allChemicals], elem2: null, chance: 0.1 }
        },
        desc: 'Universal precursor - creates ALL elements'
    };

    // --------------------------------------------------------------------------
    // 12. CONSOLE LOG
    // --------------------------------------------------------------------------
    
    console.log('🌿 thebestchemistrymod.js LOADED!');
    console.log('='.repeat(70));
    console.log('✅ ' + Object.keys(cannabisStrains).length + ' Cannabis Strains with TALL TREE-LIKE GROWTH');
    console.log('✅ Simplified 3-stage growth: seed → seedling → plant');
    console.log('✅ Plants grow vertically like evergreen trees');
    console.log('✅ Stems form below, branches and flowers on sides');
    console.log('');
    console.log('🚀 USAGE:');
    console.log('  1. Place seed_og_kush on soil');
    console.log('  2. Watch it grow TALL (100 ticks per stage)');
    console.log('  3. Use plant_nutrients for instant growth');
    console.log('  4. Harvest with scissors');
    console.log('');
    console.log('🎮 MOD READY!');

})();
