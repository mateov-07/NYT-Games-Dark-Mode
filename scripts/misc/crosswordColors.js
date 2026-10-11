// Shared crossword color layer, loaded before all three crossword.js
const gameColorsStorageKey = "gameColorSettings";
const cwPanelName = "crosswords";
const cwActivePresetKey = "crosswordPreset";
const applyGameColorsAction = "applyGameColors";

// Default presets that are either made by NYT (light) or by the extension (dark)
const darkCrosswordColors = {
    cw_cell_borders:            "#161718",
    cw_letter_number_in_cell:   "#FFFFFF",
    cw_correct_letter_in_cell:  "#A9D6FE",
    cw_empty_cell:              "#585863",
    cw_prefilled_cell:          "#161718",
    cw_shaded_cell:             "#383840",
    cw_related_cell_clue:       "#596D83",
    cw_related_shaded_cell:     "#596D83",
    cw_highlighted_cell_clue:   "#483F80",
    cw_shaded_highlighted_cell: "#383361",
    cw_selected_cell_clue:      "#4678AA",
    cw_shaded_selected_cell:    "#476E93",
    cw_circle_within_cell:      "#161718",
    cw_main_selected_clue_bg:   "#393361",
    cw_main_selected_clue_text: "#FFFFFF"
};
const lightCrosswordColors = {
    cw_cell_borders:            "#696969",
    cw_letter_number_in_cell:   "#000000",
    cw_correct_letter_in_cell:  "#2860D8",
    cw_empty_cell:              "#FFFFFF",
    cw_prefilled_cell:          "#000000",
    cw_shaded_cell:             "#DCDCDC",
    cw_related_cell_clue:       "#FFECA0",
    cw_related_shaded_cell:     "#E8E2C7",
    cw_highlighted_cell_clue:   "#A7D8FF",
    cw_shaded_highlighted_cell: "#BAD9F3",
    cw_selected_cell_clue:      "#FFDA00",
    cw_shaded_selected_cell:    "#F3DB4D",
    cw_circle_within_cell:      "#696969",
    cw_main_selected_clue_bg:   "#DCEFFF",
    cw_main_selected_clue_text: "#000000"
};

// Prebuilt presets that come with the extension (Midnight, Forest, Magma)
const prebuiltCrosswordColors = {
    midnight: {
        cw_cell_borders:            "#0E1622",
        cw_letter_number_in_cell:   "#E4EAF2",
        cw_correct_letter_in_cell:  "#8FBCE8",
        cw_empty_cell:              "#223146",
        cw_prefilled_cell:          "#0E1622",
        cw_shaded_cell:             "#1A2739",
        cw_related_cell_clue:       "#2E4460",
        cw_related_shaded_cell:     "#283C55",
        cw_highlighted_cell_clue:   "#35547A",
        cw_shaded_highlighted_cell: "#2F4B6D",
        cw_selected_cell_clue:      "#4A7099",
        cw_shaded_selected_cell:    "#41628A",
        cw_circle_within_cell:      "#0E1622",
        cw_main_selected_clue_bg:   "#35547A",
        cw_main_selected_clue_text: "#E4EAF2"
    },
    forest: {
        cw_cell_borders:            "#141C17",
        cw_letter_number_in_cell:   "#E6EDE6",
        cw_correct_letter_in_cell:  "#A6D0A8",
        cw_empty_cell:              "#26332A",
        cw_prefilled_cell:          "#141C17",
        cw_shaded_cell:             "#1C2620",
        cw_related_cell_clue:       "#35493A",
        cw_related_shaded_cell:     "#2E4033",
        cw_highlighted_cell_clue:   "#3E5A45",
        cw_shaded_highlighted_cell: "#37503E",
        cw_selected_cell_clue:      "#547A5D",
        cw_shaded_selected_cell:    "#4A6D53",
        cw_circle_within_cell:      "#141C17",
        cw_main_selected_clue_bg:   "#3E5A45",
        cw_main_selected_clue_text: "#E6EDE6"
    },
    magma: {
        cw_cell_borders:            "#241A18",
        cw_letter_number_in_cell:   "#F7E9E0",
        cw_correct_letter_in_cell:  "#F0B27A",
        cw_empty_cell:              "#45302A",
        cw_prefilled_cell:          "#241A18",
        cw_shaded_cell:             "#33231F",
        cw_related_cell_clue:       "#5E3B2E",
        cw_related_shaded_cell:     "#523327",
        cw_highlighted_cell_clue:   "#7A4830",
        cw_shaded_highlighted_cell: "#6E4029",
        cw_selected_cell_clue:      "#B06330",
        cw_shaded_selected_cell:    "#9E572B",
        cw_circle_within_cell:      "#241A18",
        cw_main_selected_clue_bg:   "#7A4830",
        cw_main_selected_clue_text: "#F7E9E0"
    }
};

// Getter for crossword colors, merging dark colors with custom colors
function getCrosswordColors(customColors = {}) {
    return {
        ...darkCrosswordColors,
        ...customColors
    };
}

// CSS builder for crossword board colors
function buildCrosswordColorsCSS(customColors = {}) {
    const cwColors = getCrosswordColors(customColors);
    return `
        /* Crossword Board + Clue Colors */

        [data-group="grid"] rect, [data-group="grid"] path /* Cell borders */ {
            stroke: ${cwColors.cw_cell_borders};
        }

        .xwd__cell text /* Letter + Number in cell */ {
            fill: ${cwColors.cw_letter_number_in_cell};
        }

        .xwd__assistance--confirmed~text:last-of-type /* Correct letter in cell */ {
            fill: ${cwColors.cw_correct_letter_in_cell};
        }
        
        .xwd__cell--cell /* Empty cell */ {
            fill: ${cwColors.cw_empty_cell};
        }

        .xwd__cell--block /* Prefilled cell */ {
            fill: ${cwColors.cw_prefilled_cell};
        }

        .xwd__cell--shaded /* Shaded cell */ {
            fill: ${cwColors.cw_shaded_cell};
        }

        .xwd__cell--related /* Clue related cell */ {
            fill: ${cwColors.cw_related_cell_clue};
        }

        .xwd__cell--related.xwd__cell--shaded /* Related + shaded cell */ {
            fill: ${cwColors.cw_related_shaded_cell};
        }

        .xwd__cell--highlighted, .xwd__cell--related.xwd__cell--highlighted /* Highlighted word cell */ {
            fill: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__cell--highlighted.xwd__cell--shaded /* Shaded + highlighted cell */ {
            fill: ${cwColors.cw_shaded_highlighted_cell};
        }

        .xwd__cell--selected, .xwd__cell--related.xwd__cell--highlighted.xwd__cell--selected /* Selected cell */ {
            fill: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__cell--selected.xwd__cell--shaded /* Shaded + selected cell */{
            fill: ${cwColors.cw_shaded_selected_cell};
        }

        .xwd__cell--cell+circle, .xwd__cell--cell+path /* Circle within cell */ {
            stroke: ${cwColors.cw_circle_within_cell};
        }

        .xwd__clue--highlighted /* Highlighted clue */ {
            border-left-color: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__clue--related /* Related clue */ {
            background-color: ${cwColors.cw_related_cell_clue};
        }

        .xwd__clue--selected /* Selected clue */ {
            background-color: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__clue-bar-desktop--bar /* Main selected clue */ {
            background: ${cwColors.cw_main_selected_clue_bg};
            color: ${cwColors.cw_main_selected_clue_text};
        }
    `;
}

// Function to apply crossword colors to the page
function applyCrosswordColors(customColors = {}) {
    let style = document.getElementById("nyt-crossword-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-crossword-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildCrosswordColorsCSS(customColors);
}

// Function to remove crossword colors from the page
function removeCrosswordColors() {
    const style = document.getElementById("nyt-crossword-color-style");
    if (style) {
        style.remove();
    }
}

// Custom color preset names for all crosswords and a check to see if its on or not
const customCrosswordPresetNames = ["preset1", "preset2", "preset3"];
const prebuiltCrosswordPresetNames = Object.keys(prebuiltCrosswordColors);
let crosswordDarkModeActive = false;

// Loads the correct preset; if display then track dark mode toggles, if prebuilt then apply it, if custom then check saved one
function loadStoredCrosswordColors() {
    chrome.storage.sync.get(gameColorsStorageKey, (data) => {
        const settings = data?.[gameColorsStorageKey] || {};
        const preset = settings[cwActivePresetKey];
        if (prebuiltCrosswordPresetNames.includes(preset)) {
            applyCrosswordColors(prebuiltCrosswordColors[preset]);
            return;
        }
        if (!customCrosswordPresetNames.includes(preset)) {
            if (crosswordDarkModeActive) {
                applyCrosswordColors(darkCrosswordColors);
            } else {
                removeCrosswordColors();
            }
            return;
        }
        const saved = settings[cwPanelName]?.[preset] || {};
        const colors = {...lightCrosswordColors};
        for (const [key, value] of Object.entries(saved)) {
            if (value?.hex) {
                colors[key] = value.hex;
            }
        }
        applyCrosswordColors(colors);
    });
}

// Function called by all crosswords.js whenever a dark mode state is modified
function setCrosswordDarkModeActive(isActive) {
    crosswordDarkModeActive = isActive;
    loadStoredCrosswordColors();
}

// Listens for messages from the popup to apply colors immediately
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === applyGameColorsAction && message.panel === cwPanelName) {
        applyCrosswordColors(message.colors || {});
    }
});

// Listens for changes to the storage and reloads the colors if crossword settings have changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && gameColorsStorageKey in changes) {
        loadStoredCrosswordColors();
    }
});