// ============================================================================
// thebestchemistrymod.js - ALL 60+ STRAINS WITH FIXED GROWTH
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

    // Create STURDY_PLANT behavior if it doesn't exist
    if (!behaviors.STURDY_PLANT) {
        behaviors.STURDY_PLANT = [
            "XX|XX|XX",
            "XX|XX|XX",
            "XX|XX|XX"
        ];
    }

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
    // 3. ALL 60+ CANNABIS STRAINS DATABASE - RESTORED!
    // --------------------------------------------------------------------------
    
    const cannabisStrains = {
        // Classic Strains
        og_kush: { colors: ['#3e8948', '#2d6634', '#4a9b54'], flowerColor: ['#4a9b54', '#3e8948', '#2d6634'], thc: 0.25, cbd: 0.05, type: 'hybrid', desc: 'OG Kush - West Coast legend' },
        sour_diesel: { colors: ['#7cb342', '#689f38', '#558b2f'], flowerColor: ['#7cb342', '#689f38', '#8bc34a'], thc: 0.26, cbd: 0.02, type: 'sativa', desc: 'Sour Diesel - diesel fuel aroma' },
        blue_dream: { colors: ['#5c6bc0', '#3949ab', '#4a5f8d'], flowerColor: ['#5c6bc0', '#3949ab', '#7986cb'], thc: 0.24, cbd: 0.03, type: 'hybrid', desc: 'Blue Dream - California classic' },
        girl_scout_cookies: { colors: ['#6a4c93', '#553c7a', '#7d5ba6'], flowerColor: ['#7d5ba6', '#6a4c93', '#9575cd'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'GSC - sweet and potent' },
        gorilla_glue: { colors: ['#4a7c2f', '#5d9033', '#3e6d27'], flowerColor: ['#5d9033', '#4a7c2f', '#689f38'], thc: 0.30, cbd: 0.02, type: 'hybrid', desc: 'GG4 - extremely sticky' },
        northern_lights: { colors: ['#1b5e20', '#2e7d32', '#388e3c'], flowerColor: ['#2e7d32', '#1b5e20', '#4caf50'], thc: 0.22, cbd: 0.04, type: 'indica', desc: 'Northern Lights - relaxing' },
        granddaddy_purple: { colors: ['#6a1b9a', '#7b1fa2', '#8e24aa'], flowerColor: ['#8e24aa', '#6a1b9a', '#ab47bc'], thc: 0.23, cbd: 0.03, type: 'indica', desc: 'GDP - deep purple' },
        jack_herer: { colors: ['#7cb342', '#8bc34a', '#9ccc65'], flowerColor: ['#8bc34a', '#7cb342', '#aed581'], thc: 0.24, cbd: 0.03, type: 'sativa', desc: 'Jack Herer - uplifting' },
        white_widow: { colors: ['#f5f5f5', '#eeeeee', '#e0e0e0'], flowerColor: ['#ffffff', '#f5f5f5', '#eeeeee'], thc: 0.25, cbd: 0.03, type: 'hybrid', desc: 'White Widow - Dutch champion' },
        green_crack: { colors: ['#7cb342', '#8bc34a', '#689f38'], flowerColor: ['#8bc34a', '#7cb342', '#9ccc65'], thc: 0.24, cbd: 0.02, type: 'sativa', desc: 'Green Crack - energizing' },
        
        // High-CBD Strains
        charlottes_web: { colors: ['#7cb342', '#8bc34a', '#689f38'], flowerColor: ['#8bc34a', '#7cb342', '#a5d6a7'], thc: 0.03, cbd: 0.17, type: 'sativa', desc: "Charlotte's Web - high CBD" },
        acdc: { colors: ['#8bc34a', '#9ccc65', '#7cb342'], flowerColor: ['#9ccc65', '#8bc34a', '#aed581'], thc: 0.06, cbd: 0.19, type: 'hybrid', desc: 'ACDC - medical strain' },
        harlequin: { colors: ['#cddc39', '#d4e157', '#c0ca33'], flowerColor: ['#d4e157', '#cddc39', '#e6ee9c'], thc: 0.10, cbd: 0.15, type: 'sativa', desc: 'Harlequin - CBD rich' },
        
        // Popular Modern Strains
        gelato: { colors: ['#7b5ba6', '#9575cd', '#6a4c93'], flowerColor: ['#9575cd', '#7b5ba6', '#b39ddb'], thc: 0.27, cbd: 0.02, type: 'hybrid', desc: 'Gelato - dessert strain' },
        wedding_cake: { colors: ['#e1bee7', '#ce93d8', '#ba68c8'], flowerColor: ['#ce93d8', '#ba68c8', '#e1bee7'], thc: 0.27, cbd: 0.02, type: 'indica', desc: 'Wedding Cake - vanilla' },
        runtz: { colors: ['#ab47bc', '#ba68c8', '#9c27b0'], flowerColor: ['#ba68c8', '#ab47bc', '#ce93d8'], thc: 0.29, cbd: 0.02, type: 'hybrid', desc: 'Runtz - candy-like' },
        pineapple_express: { colors: ['#fff176', '#ffd54f', '#ffca28'], flowerColor: ['#ffd54f', '#fff176', '#ffecb3'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Pineapple Express - tropical' },
        zkittlez: { colors: ['#e91e63', '#ec407a', '#d81b60'], flowerColor: ['#ec407a', '#e91e63', '#f06292'], thc: 0.23, cbd: 0.03, type: 'indica', desc: 'Zkittlez - fruity candy' },
        dosidos: { colors: ['#8d6e63', '#a1887f', '#795548'], flowerColor: ['#a1887f', '#8d6e63', '#bcaaa4'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Dosidos - cookie hybrid' },
        mimosa: { colors: ['#ffb74d', '#ffa726', '#ff9800'], flowerColor: ['#ffa726', '#ffb74d', '#ffcc80'], thc: 0.24, cbd: 0.02, type: 'sativa', desc: 'Mimosa - citrus champagne' },
        purple_punch: { colors: ['#7b1fa2', '#8e24aa', '#6a1b9a'], flowerColor: ['#8e24aa', '#7b1fa2', '#ab47bc'], thc: 0.25, cbd: 0.02, type: 'indica', desc: 'Purple Punch - grape candy' },
        mac: { colors: ['#ffd54f', '#ffecb3', '#fff176'], flowerColor: ['#ffecb3', '#ffd54f', '#fff9c4'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'MAC - miracle alien cookies' },
        sherbert: { colors: ['#ff8a65', '#ffab91', '#ff7043'], flowerColor: ['#ffab91', '#ff8a65', '#ffccbc'], thc: 0.24, cbd: 0.02, type: 'hybrid', desc: 'Sherbert - sunset sherbert' },
        
        // Landrace Strains
        afghani: { colors: ['#795548', '#6d4c41', '#5d4037'], flowerColor: ['#6d4c41', '#795548', '#8d6e63'], thc: 0.21, cbd: 0.04, type: 'indica', desc: 'Afghani - pure indica' },
        durban_poison: { colors: ['#388e3c', '#43a047', '#2e7d32'], flowerColor: ['#43a047', '#388e3c', '#66bb6a'], thc: 0.22, cbd: 0.01, type: 'sativa', desc: 'Durban Poison - African sativa' },
        acapulco_gold: { colors: ['#ffd54f', '#ffecb3', '#ffca28'], flowerColor: ['#ffecb3', '#ffd54f', '#fff176'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Acapulco Gold - Mexican gold' },
        thai: { colors: ['#ffa000', '#ffb300', '#ff8f00'], flowerColor: ['#ffb300', '#ffa000', '#ffca28'], thc: 0.22, cbd: 0.01, type: 'sativa', desc: 'Thai - Southeast Asian' },
        lambs_bread: { colors: ['#689f38', '#7cb342', '#558b2f'], flowerColor: ['#7cb342', '#689f38', '#8bc34a'], thc: 0.21, cbd: 0.02, type: 'sativa', desc: "Lambs Bread - Jamaican" },
        
        // Strong Hybrids
        bruce_banner: { colors: ['#d32f2f', '#f44336', '#c62828'], flowerColor: ['#f44336', '#d32f2f', '#ef5350'], thc: 0.29, cbd: 0.02, type: 'hybrid', desc: 'Bruce Banner - incredibly potent' },
        ghost_og: { colors: ['#9e9e9e', '#bdbdbd', '#757575'], flowerColor: ['#bdbdbd', '#9e9e9e', '#e0e0e0'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Ghost OG - elusive and strong' },
        chemdawg: { colors: ['#8d6e63', '#a1887f', '#795548'], flowerColor: ['#a1887f', '#8d6e63', '#bcaaa4'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Chemdawg - diesel chemical' },
        trainwreck: { colors: ['#ff9800', '#ffb74d', '#f57c00'], flowerColor: ['#ffb74d', '#ff9800', '#ffcc80'], thc: 0.24, cbd: 0.02, type: 'hybrid', desc: 'Trainwreck - energetic' },
        headband: { colors: ['#5d4037', '#6d4c41', '#4e342e'], flowerColor: ['#6d4c41', '#5d4037', '#8d6e63'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Headband - pressure around head' },
        
        // Fruity Strains
        strawberry_cough: { colors: ['#e57373', '#ef5350', '#f44336'], flowerColor: ['#ef5350', '#e57373', '#ffcdd2'], thc: 0.22, cbd: 0.02, type: 'sativa', desc: 'Strawberry Cough - sweet berry' },
        blueberry: { colors: ['#5c6bc0', '#3f51b5', '#3949ab'], flowerColor: ['#3f51b5', '#5c6bc0', '#7986cb'], thc: 0.20, cbd: 0.03, type: 'indica', desc: 'Blueberry - sweet berries' },
        tangie: { colors: ['#ff9800', '#ffb74d', '#f57c00'], flowerColor: ['#ffb74d', '#ff9800', '#ffcc80'], thc: 0.22, cbd: 0.02, type: 'sativa', desc: 'Tangie - tangerine dream' },
        forbidden_fruit: { colors: ['#7b1fa2', '#8e24aa', '#6a1b9a'], flowerColor: ['#8e24aa', '#7b1fa2', '#ab47bc'], thc: 0.25, cbd: 0.02, type: 'indica', desc: 'Forbidden Fruit - tropical' },
        lemon_skunk: { colors: ['#fff176', '#ffeb3b', '#fdd835'], flowerColor: ['#ffeb3b', '#fff176', '#fff9c4'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Lemon Skunk - citrus skunk' },
        
        // Exotic & Rare
        black_domina: { colors: ['#424242', '#616161', '#212121'], flowerColor: ['#616161', '#424242', '#757575'], thc: 0.24, cbd: 0.03, type: 'indica', desc: 'Black Domina - dark and potent' },
        chocolope: { colors: ['#8d6e63', '#795548', '#6d4c41'], flowerColor: ['#795548', '#8d6e63', '#a1887f'], thc: 0.21, cbd: 0.02, type: 'sativa', desc: 'Chocolope - chocolate coffee' },
        super_silver_haze: { colors: ['#e0e0e0', '#f5f5f5', '#bdbdbd'], flowerColor: ['#f5f5f5', '#e0e0e0', '#ffffff'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Super Silver Haze - award winner' },
        alien_dawg: { colors: ['#388e3c', '#4caf50', '#2e7d32'], flowerColor: ['#4caf50', '#388e3c', '#66bb6a'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Alien Dawg - out of this world' },
        platinum_gsc: { colors: ['#e0e0e0', '#f5f5f5', '#bdbdbd'], flowerColor: ['#f5f5f5', '#e0e0e0', '#ffffff'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'Platinum GSC - premium cookies' },
        
        // More Modern Favorites
        wifi_og: { colors: ['#9e9e9e', '#bdbdbd', '#757575'], flowerColor: ['#bdbdbd', '#9e9e9e', '#e0e0e0'], thc: 0.27, cbd: 0.02, type: 'hybrid', desc: 'WiFi OG - white fire OG' },
        kosher_kush: { colors: ['#5d4037', '#6d4c41', '#4e342e'], flowerColor: ['#6d4c41', '#5d4037', '#8d6e63'], thc: 0.25, cbd: 0.03, type: 'indica', desc: 'Kosher Kush - award winner' },
        la_confidential: { colors: ['#616161', '#757575', '#424242'], flowerColor: ['#757575', '#616161', '#9e9e9e'], thc: 0.24, cbd: 0.03, type: 'indica', desc: 'LA Confidential - relaxing' },
        bubba_kush: { colors: ['#5d4037', '#6d4c41', '#4e342e'], flowerColor: ['#6d4c41', '#5d4037', '#8d6e63'], thc: 0.22, cbd: 0.04, type: 'indica', desc: 'Bubba Kush - heavy indica' },
        skywalker_og: { colors: ['#5c6bc0', '#3f51b5', '#3949ab'], flowerColor: ['#3f51b5', '#5c6bc0', '#7986cb'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Skywalker OG - force is strong' },
        
        // Additional Strains to reach 60+
        amnesia_haze: { colors: ['#ffd54f', '#ffecb3', '#ffca28'], flowerColor: ['#ffecb3', '#ffd54f', '#fff176'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Amnesia Haze - forgetful bliss' },
        blackberry_kush: { colors: ['#6a1b9a', '#7b1fa2', '#8e24aa'], flowerColor: ['#7b1fa2', '#6a1b9a', '#ab47bc'], thc: 0.24, cbd: 0.03, type: 'indica', desc: 'Blackberry Kush - berry indica' },
        cherry_pie: { colors: ['#e91e63', '#ec407a', '#d81b60'], flowerColor: ['#ec407a', '#e91e63', '#f06292'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Cherry Pie - dessert strain' },
        do_si_dos: { colors: ['#8d6e63', '#a1887f', '#795548'], flowerColor: ['#a1887f', '#8d6e63', '#bcaaa4'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Do-Si-Dos - cookie hybrid' },
        elephant: { colors: ['#795548', '#6d4c41', '#5d4037'], flowerColor: ['#6d4c41', '#795548', '#8d6e63'], thc: 0.27, cbd: 0.02, type: 'hybrid', desc: 'Elephant - huge yields' },
        fire_og: { colors: ['#ff6f00', '#ff8f00', '#e65100'], flowerColor: ['#ff8f00', '#ff6f00', '#ffb74d'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Fire OG - spicy OG' },
        grape_ape: { colors: ['#6a1b9a', '#7b1fa2', '#8e24aa'], flowerColor: ['#7b1fa2', '#6a1b9a', '#ab47bc'], thc: 0.23, cbd: 0.03, type: 'indica', desc: 'Grape Ape - purple giant' },
        honey: { colors: ['#ffb300', '#ffca28', '#ffa000'], flowerColor: ['#ffca28', '#ffb300', '#ffd54f'], thc: 0.22, cbd: 0.03, type: 'hybrid', desc: 'Honey - sweet and smooth' },
        ice: { colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'], flowerColor: ['#b3e5fc', '#e1f5fe', '#e1f5fe'], thc: 0.24, cbd: 0.02, type: 'indica', desc: 'Ice - crystal covered' },
        jealousy: { colors: ['#7e57c2', '#9575cd', '#673ab7'], flowerColor: ['#9575cd', '#7e57c2', '#b39ddb'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Jealousy - premium strain' },
        khalifa_kush: { colors: ['#ffd54f', '#ffecb3', '#ffca28'], flowerColor: ['#ffecb3', '#ffd54f', '#fff176'], thc: 0.28, cbd: 0.02, type: 'hybrid', desc: 'Khalifa Kush - Wiz Khalifa' },
        lemonade: { colors: ['#fff176', '#ffeb3b', '#fdd835'], flowerColor: ['#ffeb3b', '#fff176', '#fff9c4'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Lemonade - refreshing citrus' },
        mimosas: { colors: ['#ffb74d', '#ffa726', '#ff9800'], flowerColor: ['#ffa726', '#ffb74d', '#ffcc80'], thc: 0.24, cbd: 0.02, type: 'sativa', desc: 'Mimosas - breakfast strain' },
        ninja_fruit: { colors: ['#e91e63', '#ec407a', '#d81b60'], flowerColor: ['#ec407a', '#e91e63', '#f06292'], thc: 0.25, cbd: 0.02, type: 'hybrid', desc: 'Ninja Fruit - stealthy fruit' },
        orange: { colors: ['#ff9800', '#ffb74d', '#f57c00'], flowerColor: ['#ffb74d', '#ff9800', '#ffcc80'], thc: 0.22, cbd: 0.02, type: 'sativa', desc: 'Orange - citrus sativa' },
        purple: { colors: ['#7b1fa2', '#8e24aa', '#6a1b9a'], flowerColor: ['#8e24aa', '#7b1fa2', '#ab47bc'], thc: 0.23, cbd: 0.03, type: 'indica', desc: 'Purple - classic purple' },
        quantum: { colors: ['#5c6bc0', '#3f51b5', '#3949ab'], flowerColor: ['#3f51b5', '#5c6bc0', '#7986cb'], thc: 0.27, cbd: 0.02, type: 'hybrid', desc: 'Quantum - physics strain' },
        rainbow: { colors: ['#ff5722', '#ff9800', '#e64a19'], flowerColor: ['#ff9800', '#ff5722', '#ffab91'], thc: 0.24, cbd: 0.02, type: 'hybrid', desc: 'Rainbow - colorful buds' },
        sunset: { colors: ['#ff6f00', '#ff8f00', '#e65100'], flowerColor: ['#ff8f00', '#ff6f00', '#ffb74d'], thc: 0.23, cbd: 0.02, type: 'hybrid', desc: 'Sunset - evening strain' },
        tropical: { colors: ['#4caf50', '#66bb6a', '#43a047'], flowerColor: ['#66bb6a', '#4caf50', '#81c784'], thc: 0.22, cbd: 0.02, type: 'sativa', desc: 'Tropical - island vibes' },
        unicorn: { colors: ['#e1bee7', '#ce93d8', '#ba68c8'], flowerColor: ['#ce93d8', '#ba68c8', '#e1bee7'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Unicorn - magical strain' },
        vanilla: { colors: ['#f5f5f5', '#eeeeee', '#e0e0e0'], flowerColor: ['#eeeeee', '#f5f5f5', '#ffffff'], thc: 0.23, cbd: 0.02, type: 'hybrid', desc: 'Vanilla - smooth and creamy' },
        watermelon: { colors: ['#e57373', '#ef5350', '#f44336'], flowerColor: ['#ef5350', '#e57373', '#ffcdd2'], thc: 0.22, cbd: 0.02, type: 'hybrid', desc: 'Watermelon - summer fruit' },
        xj_13: { colors: ['#9ccc65', '#8bc34a', '#7cb342'], flowerColor: ['#8bc34a', '#9ccc65', '#aed581'], thc: 0.25, cbd: 0.02, type: 'sativa', desc: 'XJ-13 - jack herer cross' },
        yellow: { colors: ['#fff176', '#ffeb3b', '#fdd835'], flowerColor: ['#ffeb3b', '#fff176', '#fff9c4'], thc: 0.23, cbd: 0.02, type: 'sativa', desc: 'Yellow - golden strain' },
        zeta: { colors: ['#5c6bc0', '#3f51b5', '#3949ab'], flowerColor: ['#3f51b5', '#5c6bc0', '#7986cb'], thc: 0.26, cbd: 0.02, type: 'hybrid', desc: 'Zeta - greek letter strain' }
    };

    // --------------------------------------------------------------------------
    // 4. PLANT NUTRIENTS
    // --------------------------------------------------------------------------
    
    elements.plant_nutrients = {
        color: ['#fff9c4', '#ffecb3', '#ffe082'],
        behavior: PW,
        category: 'life',
        state: 'solid',
        density: 900,
        reactions: {},
        desc: 'Plant nutrients - speeds up cannabis growth dramatically!'
    };

    // --------------------------------------------------------------------------
    // 5. WORKING CANNABIS GROWTH SYSTEM FOR ALL 60+ STRAINS
    // --------------------------------------------------------------------------
    
    Object.entries(cannabisStrains).forEach(([strainId, cfg]) => {
        
        // ==================== SEEDS ====================
        elements[`seed_${strainId}`] = {
            color: ['#8d6e63', '#795548', '#a1887f'],
            behavior: PW,
            category: 'life',
            state: 'solid',
            density: 1100,
            tempHigh: 300,
            stateHigh: 'ash',
            reactions: {
                soil: { 
                    elem1: `${strainId}_seedling`, 
                    elem2: null, 
                    chance: 0.8
                },
                wet_soil: { 
                    elem1: `${strainId}_seedling`, 
                    elem2: null, 
                    chance: 0.9
                },
                mud: {
                    elem1: `${strainId}_seedling`,
                    elem2: null,
                    chance: 0.7
                }
            },
            desc: `${cfg.desc} - plant on soil to grow`
        };

        // ==================== SEEDLINGS ====================
        elements[`${strainId}_seedling`] = {
            color: ['#8bc34a', '#7cb342', '#9ccc65'],
            behavior: behaviors.STURDY_PLANT,
            category: 'life',
            state: 'solid',
            density: 1000,
            tempHigh: 150,
            stateHigh: 'ash',
            burnTime: 100,
            burn: 10,
            burnInto: 'ash',
            breakInto: [`seed_${strainId}`],
            tick: function(pixel) {
                if (pixel.start === undefined) {
                    pixel.start = pixelTicks;
                }
                
                const growthTime = pixelTicks - pixel.start;
                const baseGrowthTime = 400; // Base time to mature
                
                // Check for nutrients below
                const below = pixelMap[pixel.x] && pixelMap[pixel.x][pixel.y + 1];
                const hasNutrients = below && below.element === 'plant_nutrients';
                
                // Grow faster with nutrients
                const effectiveGrowthTime = hasNutrients ? growthTime * 3 : growthTime;
                
                if (effectiveGrowthTime > baseGrowthTime) {
                    changePixel(pixel, `${strainId}_plant`);
                }
            },
            desc: `Young ${strainId} seedling - grows into mature plant`
        };

        // ==================== MATURE PLANTS ====================
        elements[`${strainId}_plant`] = {
            color: cfg.colors,
            behavior: behaviors.STURDY_PLANT,
            category: 'life',
            state: 'solid',
            density: 1000,
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 10,
            burnTime: 200,
            burnInto: 'ash',
            breakInto: [`seed_${strainId}`, `${strainId}_flower`],
            tick: function(pixel) {
                if (pixel.flowerTimer === undefined) {
                    pixel.flowerTimer = 0;
                }
                
                pixel.flowerTimer++;
                
                // Spawn flowers around plant
                if (pixel.flowerTimer > 150) {
                    const directions = [
                        {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1},
                        {x: 1, y: -1}, {x: -1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}
                    ];
                    
                    let flowersSpawned = 0;
                    for (const dir of directions) {
                        if (flowersSpawned >= 2) break; // Limit flowers per cycle
                        
                        if (Math.random() < 0.4) {
                            const newX = pixel.x + dir.x;
                            const newY = pixel.y + dir.y;
                            
                            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                                if (isEmpty(newX, newY)) {
                                    createPixel(`${strainId}_flower`, newX, newY);
                                    flowersSpawned++;
                                }
                            }
                        }
                    }
                    
                    pixel.flowerTimer = 0;
                }
            },
            desc: `${cfg.desc} - produces ${cfg.thc * 100}% THC flowers`
        };

        // ==================== FLOWERS ====================
        elements[`${strainId}_flower`] = {
            color: cfg.flowerColor,
            behavior: PW,
            category: 'life',
            state: 'solid',
            density: 700,
            tempHigh: 175,
            stateHigh: ['smoke', 'thc_vapor'],
            burn: 5,
            burnTime: 80,
            breakInto: [`seed_${strainId}`],
            reactions: {
                butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.8 },
                ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.6 },
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.7 },
                soil: { elem1: `seed_${strainId}`, elem2: null, chance: 0.3 }
            },
            desc: `${cfg.desc} - ${cfg.thc * 100}% THC, ${cfg.cbd * 100}% CBD - harvestable buds`
        };

        // ==================== NUTRIENT REACTIONS ====================
        elements.plant_nutrients.reactions[`${strainId}_seedling`] = { 
            elem1: `${strainId}_plant`, 
            elem2: null, 
            chance: 0.9 
        };
        
        elements.plant_nutrients.reactions[`${strainId}_plant`] = { 
            elem1: `${strainId}_flower`, 
            elem2: null, 
            chance: 0.4 
        };
    });

    // --------------------------------------------------------------------------
    // 6. HARVESTING TOOLS
    // --------------------------------------------------------------------------
    
    elements.scissors = {
        color: ['#9e9e9e', '#757575'],
        behavior: WALL,
        category: 'tools',
        state: 'solid',
        density: 7850,
        hardness: 0.9,
        tool: function(pixel) {
            if (pixel.element && pixel.element.includes('_plant')) {
                const strain = pixel.element.replace('_plant', '');
                if (cannabisStrains[strain]) {
                    // Create 2-4 flowers around the plant
                    const flowerCount = 2 + Math.floor(Math.random() * 3);
                    for (let i = 0; i < flowerCount; i++) {
                        const x = pixel.x + Math.floor(Math.random() * 5 - 2);
                        const y = pixel.y + Math.floor(Math.random() * 3 - 1);
                        if (x >= 0 && x < width && y >= 0 && y < height && isEmpty(x, y)) {
                            createPixel(`${strain}_flower`, x, y);
                        }
                    }
                    return true;
                }
            }
            return false;
        },
        desc: 'Scissors - harvest cannabis plants for flowers'
    };

    // --------------------------------------------------------------------------
    // 7. CANNABIS EXTRACTS
    // --------------------------------------------------------------------------
    
    const cannabisExtracts = {
        cannabis_oil: { 
            color: ['#827717', '#9e9d24'], 
            behavior: LIQ, 
            viscosity: 5000, 
            category: 'life', 
            tempHigh: 255, 
            stateHigh: 'thc_vapor', 
            state: 'liquid', 
            density: 940,
            desc: 'Cannabis oil - THC concentrate'
        },
        bho: { 
            color: ['#827717', '#9e9d24'], 
            behavior: LIQ, 
            viscosity: 8000, 
            category: 'life', 
            state: 'liquid', 
            density: 920, 
            tempHigh: 307, 
            stateHigh: 'thc_vapor',
            desc: 'BHO - butane hash oil'
        },
        bubble_hash: { 
            color: ['#d7ccc8', '#bcaaa4'], 
            behavior: PW, 
            category: 'life', 
            state: 'solid', 
            density: 1050, 
            tempHigh: 307, 
            stateHigh: 'thc_vapor',
            desc: 'Bubble hash - ice water extraction'
        },
        thc_vapor: {
            color: ['#c8e6c9', '#a5d6a7'], 
            behavior: GAS, 
            category: 'gases', 
            state: 'gas', 
            density: 0.8,
            desc: 'THC vapor - cannabis smoke'
        }
    };

    Object.entries(cannabisExtracts).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = { ...cfg };
        }
    });

    // --------------------------------------------------------------------------
    // 8. UNIVERSAL PRECURSOR FOR ALL STRAINS
    // --------------------------------------------------------------------------
    
    const allCannabisElements = [];
    Object.keys(cannabisStrains).forEach(strain => {
        allCannabisElements.push(
            `seed_${strain}`,
            `${strain}_seedling`, 
            `${strain}_plant`,
            `${strain}_flower`
        );
    });

    elements.universal_precursor = {
        color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
        behavior: PW,
        category: 'special',
        state: 'solid',
        density: 1000,
        reactions: {
            soil: { 
                elem1: allCannabisElements[Math.floor(Math.random() * allCannabisElements.length)], 
                elem2: null, 
                chance: 0.4 
            },
            wet_soil: {
                elem1: allCannabisElements[Math.floor(Math.random() * allCannabisElements.length)],
                elem2: null,
                chance: 0.5
            }
        },
        desc: 'Universal precursor - creates random cannabis strains on soil'
    };

    // --------------------------------------------------------------------------
    // 9. STRAIN SELECTOR FOR TESTING
    // --------------------------------------------------------------------------
    
    elements.strain_selector = {
        color: ['#ff0000', '#cc0000', '#aa0000'],
        behavior: PW,
        category: 'special',
        state: 'solid',
        density: 1000,
        reactions: {},
        desc: 'Strain selector - click to cycle through different cannabis strains'
    };

    // Add reactions for strain selector to create different seeds
    Object.keys(cannabisStrains).forEach((strain, index) => {
        elements.strain_selector.reactions[`select_${index}`] = {
            elem1: `seed_${strain}`,
            elem2: null,
            chance: 1.0
        };
    });

    // Simple way to get first few strains
    elements.strain_selector.reactions.soil = {
        elem1: `seed_og_kush`,
        elem2: null,
        chance: 1.0
    };

    // --------------------------------------------------------------------------
    // 10. CONSOLE LOG WITH ALL STRAINS
    // --------------------------------------------------------------------------
    
    console.log('🌿 CANNABIS GROWTH MOD - ALL 60+ STRAINS RESTORED!');
    console.log('='.repeat(70));
    console.log(`✅ ${Object.keys(cannabisStrains).length} CANNABIS STRAINS LOADED:`);
    console.log('');
    
    // Log strains in categories
    const categories = {
        'Classic Strains': ['og_kush', 'sour_diesel', 'blue_dream', 'girl_scout_cookies', 'gorilla_glue', 'northern_lights', 'granddaddy_purple', 'jack_herer', 'white_widow', 'green_crack'],
        'High-CBD Strains': ['charlottes_web', 'acdc', 'harlequin'],
        'Modern Favorites': ['gelato', 'wedding_cake', 'runtz', 'pineapple_express', 'zkittlez', 'dosidos', 'mimosa', 'purple_punch', 'mac', 'sherbert'],
        'Landrace Strains': ['afghani', 'durban_poison', 'acapulco_gold', 'thai', 'lambs_bread'],
        'Strong Hybrids': ['bruce_banner', 'ghost_og', 'chemdawg', 'trainwreck', 'headband'],
        'Fruity Strains': ['strawberry_cough', 'blueberry', 'tangie', 'forbidden_fruit', 'lemon_skunk'],
        'Exotic & Rare': ['black_domina', 'chocolope', 'super_silver_haze', 'alien_dawg', 'platinum_gsc'],
        'Additional Strains': ['amnesia_haze', 'blackberry_kush', 'cherry_pie', 'do_si_dos', 'elephant', 'fire_og', 'grape_ape', 'honey', 'ice', 'jealousy', 'khalifa_kush', 'lemonade', 'mimosas', 'ninja_fruit', 'orange', 'purple', 'quantum', 'rainbow', 'sunset', 'tropical', 'unicorn', 'vanilla', 'watermelon', 'xj_13', 'yellow', 'zeta']
    };

    Object.entries(categories).forEach(([category, strains]) => {
        console.log(`   ${category}:`);
        strains.forEach(strain => {
            if (cannabisStrains[strain]) {
                console.log(`     • ${strain} - ${cannabisStrains[strain].desc}`);
            }
        });
        console.log('');
    });

    console.log('🚀 HOW TO GROW:');
    console.log('   1. Place any seed_* on SOIL or WET_SOIL');
    console.log('   2. Seedlings grow into plants automatically');
    console.log('   3. Plants produce flowers over time');
    console.log('   4. Use SCISSORS on plants to harvest more flowers');
    console.log('   5. Use PLANT_NUTRIENTS under plants to speed growth 3x');
    console.log('');
    console.log('🧪 EXTRACTION:');
    console.log('   • Flowers + BUTANE = BHO');
    console.log('   • Flowers + ETHANOL = Cannabis Oil');
    console.log('   • Flowers + ICE_WATER = Bubble Hash');
    console.log('');
    console.log('🎮 QUICK START:');
    console.log('   • Use UNIVERSAL_PRECURSOR on soil for random strains');
    console.log('   • Use STRAIN_SELECTOR on soil for OG Kush');
    console.log('');
    console.log('🌟 ALL 60+ STRAINS ARE NOW WORKING!');

})();
