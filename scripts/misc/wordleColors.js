// Shared wordle color layer, loaded on its own (no wordle.js)
const gameColorsStorageKey = "gameColorSettings";
const wdPanelName = "wordle";
const wdActivePresetKey = "wordlePreset";
const applyGameColorsAction = "applyGameColors";

// Default presets that are made by NYT (light/dark)
const lightWordleColors = {
    wd_empty_tile_border:            "#3A3A3C",
    wd_filled_tile_border:           "#565758",
    wd_filled_tile_text:             "#FFFFFF",
    wd_absent_tile_background:       "#3A3A3C",
    wd_absent_tile_text:             "#FFFFFF",
    wd_present_tile_background:      "#B59F3B",
    wd_present_tile_text:            "#FFFFFF",
    wd_correct_tile_background:      "#538D4E",
    wd_correct_tile_text:            "#FFFFFF",
    wd_unused_letter_key_background: "#818384",
    wd_unused_letter_key_text:       "#FFFFFF"
};
const darkWordleColors = {...lightWordleColors};

// Prebuilt presets that come with the extension (Midnight, Forest, Magma)
const prebuiltWordleColors = {
    midnight: {
        wd_empty_tile_border:            "#3A4A61",
        wd_filled_tile_border:           "#56688A",
        wd_filled_tile_text:             "#E8EDF4",
        wd_absent_tile_background:       "#26303F",
        wd_absent_tile_text:             "#E8EDF4",
        wd_present_tile_background:      "#7A6FA0",
        wd_present_tile_text:            "#E8EDF4",
        wd_correct_tile_background:      "#4F87B8",
        wd_correct_tile_text:            "#E8EDF4",
        wd_unused_letter_key_background: "#3C4A5E",
        wd_unused_letter_key_text:       "#E8EDF4"
    },
    forest: {
        wd_empty_tile_border:            "#3C5142",
        wd_filled_tile_border:           "#587060",
        wd_filled_tile_text:             "#E9EFE9",
        wd_absent_tile_background:       "#26332A",
        wd_absent_tile_text:             "#E9EFE9",
        wd_present_tile_background:      "#AE7B52",
        wd_present_tile_text:            "#E9EFE9",
        wd_correct_tile_background:      "#6D9C7C",
        wd_correct_tile_text:            "#E9EFE9",
        wd_unused_letter_key_background: "#3E5245",
        wd_unused_letter_key_text:       "#E9EFE9"
    },
    magma: {
        wd_empty_tile_border:            "#5C4038",
        wd_filled_tile_border:           "#7E5B50",
        wd_filled_tile_text:             "#F9EEE6",
        wd_absent_tile_background:       "#3D2C26",
        wd_absent_tile_text:             "#F9EEE6",
        wd_present_tile_background:      "#D08A45",
        wd_present_tile_text:            "#F9EEE6",
        wd_correct_tile_background:      "#C8502F",
        wd_correct_tile_text:            "#F9EEE6",
        wd_unused_letter_key_background: "#5C4038",
        wd_unused_letter_key_text:       "#F9EEE6"
    }
};

// Getter for wordle colors, merging dark colors with custom colors
function getWordleColors(customColors = {}) {
    return {
        ...darkWordleColors,
        ...customColors
    };
}

// CSS builder for wordle board colors
function buildWordleColorsCSS(customColors = {}) {
    const wdColors = getWordleColors(customColors);
    return `
        /* Wordle Board Colors */

        .Tile-module_tile__UWEHN[data-state=empty] /* Empty tile border */ {
            border: 2px solid ${wdColors.wd_empty_tile_border};
        }

        .Tile-module_tile__UWEHN[data-state=tbd] /* Filled tile border + text */ {
            border: 2px solid ${wdColors.wd_filled_tile_border};
            color: ${wdColors.wd_filled_tile_text};
        }

        .Key-module_key__kchQI /* Unused letter key background */ {
            background-color: ${wdColors.wd_unused_letter_key_background};
        }

        .Key-module_key__kchQI, .Key-module_key__kchQI path /* Unused letter key text */ {
            color: ${wdColors.wd_unused_letter_key_text};
            fill: ${wdColors.wd_unused_letter_key_text};
        }

        .Tile-module_tile__UWEHN[data-state=absent],
        .Key-module_key__kchQI[data-state=absent] /* Absent tile + key background + text */ {
            background-color: ${wdColors.wd_absent_tile_background};
            color: ${wdColors.wd_absent_tile_text};
        }

        .Tile-module_tile__UWEHN[data-state=present],
        .Key-module_key__kchQI[data-state=present] /* Present tile + key background + text */ {
            background-color: ${wdColors.wd_present_tile_background};
            color: ${wdColors.wd_present_tile_text};
        }

        .Tile-module_tile__UWEHN[data-state=correct],
        .Key-module_key__kchQI[data-state=correct] /* Correct tile + key background + text */ {
            background-color: ${wdColors.wd_correct_tile_background};
            color: ${wdColors.wd_correct_tile_text};
        }
    `;
}

// Function to apply wordle colors to the page
function applyWordleColors(customColors = {}) {
    let style = document.getElementById("nyt-wordle-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-wordle-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildWordleColorsCSS(customColors);
}

// Function to remove wordle colors from the page
function removeWordleColors() {
    const style = document.getElementById("nyt-wordle-color-style");
    if (style) {
        style.remove();
    }
}

// Custom color presets names for wordle
const customWordlePresetNames = ["preset1", "preset2", "preset3"];
const prebuiltWordlePresetNames = Object.keys(prebuiltWordleColors);

// Loads the correct preset; the display one drops the layer so NYT's own light/dark board shows through
function loadStoredWordleColors() {
    chrome.storage.sync.get(gameColorsStorageKey, (data) => {
        const settings = data?.[gameColorsStorageKey] || {};
        const preset = settings[wdActivePresetKey];
        if (prebuiltWordlePresetNames.includes(preset)) {
            applyWordleColors(prebuiltWordleColors[preset]);
            return;
        }
        if (!customWordlePresetNames.includes(preset)) {
            removeWordleColors();
            return;
        }
        const saved = settings[wdPanelName]?.[preset] || {};
        const colors = {...lightWordleColors};
        for (const [key, value] of Object.entries(saved)) {
            if (value?.hex) {
                colors[key] = value.hex;
            }
        }
        applyWordleColors(colors);
    });
}

// Listens for messages from the popup to apply colors immediately
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === applyGameColorsAction && message.panel === wdPanelName) {
        applyWordleColors(message.colors || {});
    }
});

// Listens for changes to the storage and reloads the colors if wordle settings have changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && gameColorsStorageKey in changes) {
        loadStoredWordleColors();
    }
});

loadStoredWordleColors();