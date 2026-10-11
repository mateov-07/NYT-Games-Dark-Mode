// Shared connections color layer, loaded before connections.js
const gameColorsStorageKey = "gameColorSettings";
const cnPanelName = "connections";
const cnActivePresetKey = "connectionsPreset";
const applyGameColorsAction = "applyGameColors";

// Default presets that are either made by NYT (light) or by the extension (dark)
const lightConnectionsColors = {
    cn_card_background: "#EFEFE6",
    cn_card_text: "#121212",
    cn_selected_card_background: "#5A594E",
    cn_selected_card_text: "#F8F8F8",
    cn_solved_category_background_1: "#F9DF6D",
    cn_solved_category_text_1: "#000000",
    cn_solved_category_background_2: "#A0C35A",
    cn_solved_category_text_2: "#000000",
    cn_solved_category_background_3: "#B0C4EF",
    cn_solved_category_text_3: "#000000",
    cn_solved_category_background_4: "#BA81C5",
    cn_solved_category_text_4: "#000000",
    cn_mistakes_bubbles: "#5A594E",
    cn_top_mistakes_text: "#000000"
};
const darkConnectionsColors = {
    cn_card_background: "#FFFFFF",
    cn_card_text: "#000000",
    cn_selected_card_background: "#777777",
    cn_selected_card_text: "#FFFFFF",
    cn_solved_category_background_1: "#F9DF6D",
    cn_solved_category_text_1: "#000000",
    cn_solved_category_background_2: "#A0C35A",
    cn_solved_category_text_2: "#000000",
    cn_solved_category_background_3: "#B0C4EF",
    cn_solved_category_text_3: "#000000",
    cn_solved_category_background_4: "#BA81C5",
    cn_solved_category_text_4: "#000000",
    cn_mistakes_bubbles: "#FFFFFF",
    cn_top_mistakes_text: "#FFFFFF"
};

// Prebuilt presets that come with the extension (Midnight, Forest, Magma)
const prebuiltConnectionsColors = {
    midnight: {
        cn_card_background:              "#223146",
        cn_card_text:                    "#E4EAF2",
        cn_selected_card_background:     "#43608A",
        cn_selected_card_text:           "#F2F6FB",
        cn_solved_category_background_1: "#E8B84B",
        cn_solved_category_text_1:       "#14202E",
        cn_solved_category_background_2: "#4FB0A0",
        cn_solved_category_text_2:       "#14202E",
        cn_solved_category_background_3: "#5B8DEF",
        cn_solved_category_text_3:       "#14202E",
        cn_solved_category_background_4: "#9B72D4",
        cn_solved_category_text_4:       "#14202E",
        cn_mistakes_bubbles:             "#7E9AB8",
        cn_top_mistakes_text:            "#E4EAF2"
    },
    forest: {
        cn_card_background:              "#26332A",
        cn_card_text:                    "#E6EDE6",
        cn_selected_card_background:     "#4A6D53",
        cn_selected_card_text:           "#F1F6F1",
        cn_solved_category_background_1: "#E0C25A",
        cn_solved_category_text_1:       "#16211A",
        cn_solved_category_background_2: "#86B96B",
        cn_solved_category_text_2:       "#16211A",
        cn_solved_category_background_3: "#59A3A8",
        cn_solved_category_text_3:       "#16211A",
        cn_solved_category_background_4: "#A47AB8",
        cn_solved_category_text_4:       "#16211A",
        cn_mistakes_bubbles:             "#8FAF95",
        cn_top_mistakes_text:            "#E6EDE6"
    },
    magma: {
        cn_card_background:              "#45302A",
        cn_card_text:                    "#F7E9E0",
        cn_selected_card_background:     "#7D5748",
        cn_selected_card_text:           "#FDF6F1",
        cn_solved_category_background_1: "#F0C24E",
        cn_solved_category_text_1:       "#241A18",
        cn_solved_category_background_2: "#E27D52",
        cn_solved_category_text_2:       "#241A18",
        cn_solved_category_background_3: "#5FB3AA",
        cn_solved_category_text_3:       "#241A18",
        cn_solved_category_background_4: "#B394D1",
        cn_solved_category_text_4:       "#241A18",
        cn_mistakes_bubbles:             "#D9B8A6",
        cn_top_mistakes_text:            "#F7E9E0"
    }
};

// Getter for connections colors, merging dark colors with custom colors
function getConnectionsColors(customColors = {}) {
    return {
        ...darkConnectionsColors,
        ...customColors
    };
}

// CSS builder for connections board colors
function buildConnectionsColorsCSS(customColors = {}) {
    const cnColors = getConnectionsColors(customColors);
    return `
        /* Connections Board Colors */

        .Card-module_label__U_Q2H /* Card background + text */ {
            background-color: ${cnColors.cn_card_background};
            color: ${cnColors.cn_card_text};
        }

        .Card-module_label__U_Q2H.Card-module_selected__cN2eT /* Selected card background + text */ {
            background-color: ${cnColors.cn_selected_card_background};
            color: ${cnColors.cn_selected_card_text};
        }

        .SolvedCategory-module_solvedCategory___8phN[data-level="0"] /* Solved category background + text #1 */ {
            background-color: ${cnColors.cn_solved_category_background_1} !important;
            color: ${cnColors.cn_solved_category_text_1};
        }

        .SolvedCategory-module_solvedCategory___8phN[data-level="1"] /* Solved category background + text #2 */ {
            background-color: ${cnColors.cn_solved_category_background_2} !important;
            color: ${cnColors.cn_solved_category_text_2};
        }

        .SolvedCategory-module_solvedCategory___8phN[data-level="2"] /* Solved category background + text #3 */ {
            background-color: ${cnColors.cn_solved_category_background_3} !important;
            color: ${cnColors.cn_solved_category_text_3};
        }

        .SolvedCategory-module_solvedCategory___8phN[data-level="3"] /* Solved category background + text #4*/ {
            background-color: ${cnColors.cn_solved_category_background_4} !important;
            color: ${cnColors.cn_solved_category_text_4};
        }

        .Mistakes-module_bubble__nDlOh /* Mistakes bubbles */ {
            background-color: ${cnColors.cn_mistakes_bubbles};
        }

        .Game-module_form__BCqGO, .Mistakes-module_mistakesContent__nlijY /* Top + mistakes text */ {
            color: ${cnColors.cn_top_mistakes_text};
        }
    `;
}

// Function to apply connections colors to the page
function applyConnectionsColors(customColors = {}) {
    let style = document.getElementById("nyt-connections-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-connections-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildConnectionsColorsCSS(customColors);
}

// Function to remove connections colors from the page
function removeConnectionsColors() {
    const style = document.getElementById("nyt-connections-color-style");
    if (style) {
        style.remove();
    }
}

// Custom color preset names for connections and a check to see if its on or not
const customConnectionsPresetNames = ["preset1", "preset2", "preset3"];
const prebuiltConnectionsPresetNames = Object.keys(prebuiltConnectionsColors);
let connectionsDarkModeActive = false;

// Loads the correct preset; if display then track dark mode toggles, if prebuilt then apply it, if custom then check saved one
function loadStoredConnectionsColors() {
    chrome.storage.sync.get(gameColorsStorageKey, (data) => {
        const settings = data?.[gameColorsStorageKey] || {};
        const preset = settings[cnActivePresetKey];
        if (prebuiltConnectionsPresetNames.includes(preset)) {
            applyConnectionsColors(prebuiltConnectionsColors[preset]);
            return;
        }
        if (!customConnectionsPresetNames.includes(preset)) {
            if (connectionsDarkModeActive) {
                applyConnectionsColors(darkConnectionsColors);
            } else {
                removeConnectionsColors();
            }
            return;
        }
        const saved = settings[cnPanelName]?.[preset] || {};
        const colors = {...lightConnectionsColors};
        for (const [key, value] of Object.entries(saved)) {
            if (value?.hex) {
                colors[key] = value.hex;
            }
        }
        applyConnectionsColors(colors);
    });
}

// Function called by connections.js whenever a dark mode state is modified
function setConnectionsDarkModeActive(isActive) {
    connectionsDarkModeActive = isActive;
    loadStoredConnectionsColors();
}

// Listens for messages from the popup to apply colors immediately
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === applyGameColorsAction && message.panel === cnPanelName) {
        applyConnectionsColors(message.colors || {});
    }
});

// Listens for changes to the storage and reloads the colors if connections settings have changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && gameColorsStorageKey in changes) {
        loadStoredConnectionsColors();
    }
});