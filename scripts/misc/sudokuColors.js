// Shared sudoku color layer, loaded before sudoku.js
const gameColorsStorageKey = "gameColorSettings";
const sdPanelName = "sudoku";
const sdActivePresetKey = "sudokuPreset";
const applyGameColorsAction = "applyGameColors";

// Default presets that are either made by NYT (light) or by the extension (dark)
const lightSudokuColors = {
    sd_board_frame:               "#121212",
    sd_inner_board_frame:         "#979797",
    sd_grid_lines:                "#979797",
    sd_empty_cell:                "#FFFFFF",
    sd_prefilled_cell:            "#DFDFDF",
    sd_affected_no_number_cell:   "#F9EAC2",
    sd_affected_number_cell:      "#D3C6AF",
    sd_selected_cell:             "#FB9B00",
    sd_filled_selected_number:    "#D48200",
    sd_selected_number:           "#FEC468",
    sd_prefilled_selected_number: "#E69100",
    sd_numbers:                   "#000000",
    sd_candidate_number:          "#5A5A5A",
    sd_confirmed_cell_number:     "#2C64D5",
    sd_conflicted_cell_bubble:    "#FF4B56",
    sd_cell_correction:           "#FF4B56"
};
const darkSudokuColors = {
    sd_board_frame:               "#FFFFFF",
    sd_inner_board_frame:         "#979797",
    sd_grid_lines:                "#979797",
    sd_empty_cell:                "#0F0F0F",
    sd_prefilled_cell:            "#434342",
    sd_affected_no_number_cell:   "#5C5639",
    sd_affected_number_cell:      "#413A25",
    sd_selected_cell:             "#FC9B00",
    sd_filled_selected_number:    "#9F6F21",
    sd_selected_number:           "#9E6708",
    sd_prefilled_selected_number: "#563B0A",
    sd_numbers:                   "#FFFFFF",
    sd_candidate_number:          "#D3D3D3",
    sd_confirmed_cell_number:     "#2C64D5",
    sd_conflicted_cell_bubble:    "#FF4B56",
    sd_cell_correction:           "#FF4B56"
};

// Prebuilt presets that come with the extension (Midnight, Forest, Magma)
const prebuiltSudokuColors = {
    midnight: {
        sd_board_frame:               "#8FA8C4",
        sd_inner_board_frame:         "#5A6B80",
        sd_grid_lines:                "#5A6B80",
        sd_empty_cell:                "#16202E",
        sd_prefilled_cell:            "#2B3A4E",
        sd_affected_no_number_cell:   "#1E3B5F",
        sd_affected_number_cell:      "#2B5385",
        sd_selected_cell:             "#3E8FE8",
        sd_filled_selected_number:    "#634E8C",
        sd_selected_number:           "#7A5FA8",
        sd_prefilled_selected_number: "#4C3A6E",
        sd_numbers:                   "#E8EEF6",
        sd_candidate_number:          "#93A9C2",
        sd_confirmed_cell_number:     "#5B8DEF",
        sd_conflicted_cell_bubble:    "#E2626B",
        sd_cell_correction:           "#E2626B"
    },
    forest: {
        sd_board_frame:               "#9BBBA1",
        sd_inner_board_frame:         "#5E7563",
        sd_grid_lines:                "#5E7563",
        sd_empty_cell:                "#1A241C",
        sd_prefilled_cell:            "#2E3D31",
        sd_affected_no_number_cell:   "#1E4429",
        sd_affected_number_cell:      "#2E6B41",
        sd_selected_cell:             "#5CA372",
        sd_filled_selected_number:    "#6B4F63",
        sd_selected_number:           "#835F79",
        sd_prefilled_selected_number: "#523C4D",
        sd_numbers:                   "#EAF1EA",
        sd_candidate_number:          "#A6BCAA",
        sd_confirmed_cell_number:     "#6FA8B8",
        sd_conflicted_cell_bubble:    "#C96A5E",
        sd_cell_correction:           "#C96A5E"
    },
    magma: {
        sd_board_frame:               "#D9B8A6",
        sd_inner_board_frame:         "#8A6E60",
        sd_grid_lines:                "#8A6E60",
        sd_empty_cell:                "#241A18",
        sd_prefilled_cell:            "#45302A",
        sd_affected_no_number_cell:   "#5E3418",
        sd_affected_number_cell:      "#874C22",
        sd_selected_cell:             "#DE9440",
        sd_filled_selected_number:    "#356B66",
        sd_selected_number:           "#427F79",
        sd_prefilled_selected_number: "#2A5551",
        sd_numbers:                   "#F9EEE6",
        sd_candidate_number:          "#CFB3A3",
        sd_confirmed_cell_number:     "#5FB3AA",
        sd_conflicted_cell_bubble:    "#E2624F",
        sd_cell_correction:           "#E2624F"
    }
};

// Getter for sudoku colors, merging dark colors with custom colors
function getSudokuColors(customColors = {}) {
    return {
        ...darkSudokuColors,
        ...customColors
    };
}

// CSS builder for sudoku board colors
function buildSudokuColorsCSS(customColors = {}) {
    const sdColors = getSudokuColors(customColors);
    return `
        /* Sudoku Board Colors */

        .su-board__frame /* Outer board frame */{
            outline: 0px solid ${sdColors.sd_board_frame};
        }

        .su-board /* Inner board frame */ {
            background-color: ${sdColors.sd_inner_board_frame};
        }

        .su-cell /* Grid lines */ {
            outline: 1px solid ${sdColors.sd_grid_lines};
        }

        .su-cell /* Empty cell */ { 
            background-color: ${sdColors.sd_empty_cell};
        }

        .su-cell.prefilled /* Prefilled cell */ {
            background-color: ${sdColors.sd_prefilled_cell};
        }

        .su-cell:not(.selected).highlighted /* Cell that will be affected with no number in cell */ {
            background-color: ${sdColors.sd_affected_no_number_cell};
        }

        .su-cell:not(.selected).highlighted.prefilled /* Cell that will be affected with a number in cell */ {
            background-color: ${sdColors.sd_affected_number_cell};
        }

        .su-cell.selected.highlighted /* Cell currently selected */ {
            background-color: ${sdColors.sd_selected_cell};
        }

        .su-cell.prefilled.highlightedSameNumber /* User filled cell with same number as selected cell */ {
            background-color: ${sdColors.sd_filled_selected_number};
        }

        .su-cell:not(.selected).highlightedSameNumber /* Cell with same number as selected cell */ {
            background-color: ${sdColors.sd_selected_number};
        }

        .su-cell:not(.selected).highlightedSameNumber.prefilled /* Prefilled cell with same number as selected cell */ {
            background-color: ${sdColors.sd_prefilled_selected_number};
        }   

        .su-cell__value>path, .selected .su-cell__value>path /* All filled/prefilled numbers */ {
            fill: ${sdColors.sd_numbers};
        }

        .su-candidates>svg>path /* Candidate numbers */ {
            fill: ${sdColors.sd_candidate_number};
        }

        .confirmed .su-cell__value>path /* Confirmed cell number */ {
            fill: ${sdColors.sd_confirmed_cell_number};
        }

        .su-cell__conflict /* Conflicted cell bubble */ {
            background-color: ${sdColors.sd_conflicted_cell_bubble};
        }

        .su-cell__correction::after /* Cell correction */ {
            background-color: ${sdColors.sd_cell_correction};
        }
    `;
}

// Function to apply sudoku colors to the page
function applySudokuColors(customColors = {}) {
    let style = document.getElementById("nyt-sudoku-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-sudoku-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildSudokuColorsCSS(customColors);
}

// Function to remove sudoku colors from the page
function removeSudokuColors() {
    const style = document.getElementById("nyt-sudoku-color-style");
    if (style) {
        style.remove();
    }
}

// Custom color preset names for sudoku and a check to see if its on or not
const customSudokuPresetNames = ["preset1", "preset2", "preset3"];
const prebuiltSudokuPresetNames = Object.keys(prebuiltSudokuColors);
let sudokuDarkModeActive = false;

// Loads the correct preset; if display then track dark mode toggles, if prebuilt then apply it, if custom then check saved one
function loadStoredSudokuColors() {
    chrome.storage.sync.get(gameColorsStorageKey, (data) => {
        const settings = data?.[gameColorsStorageKey] || {};
        const preset = settings[sdActivePresetKey];
        if (prebuiltSudokuPresetNames.includes(preset)) {
            applySudokuColors(prebuiltSudokuColors[preset]);
            return;
        }
        if (!customSudokuPresetNames.includes(preset)) {
            if (sudokuDarkModeActive) {
                applySudokuColors(darkSudokuColors);
            } else {
                removeSudokuColors();
            }
            return;
        }
        const saved = settings[sdPanelName]?.[preset] || {};
        const colors = {...lightSudokuColors};
        for (const [key, value] of Object.entries(saved)) {
            if (value?.hex) {
                colors[key] = value.hex;
            }
        }
        applySudokuColors(colors);
    });
}

// Function called by sudoku.js whenever a dark mode state is modified
function setSudokuDarkModeActive(isActive) {
    sudokuDarkModeActive = isActive;
    loadStoredSudokuColors();
}

// Listens for messages from the popup to apply colors immediately
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === applyGameColorsAction && message.panel === sdPanelName) {
        applySudokuColors(message.colors || {});
    }
});

// Listens for changes to the storage and reloads the colors if sudoku settings have changed
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && gameColorsStorageKey in changes) {
        loadStoredSudokuColors();
    }
});