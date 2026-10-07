// Stored information that all popup script files can easily access without copy pasting preexisting code

// Storage keys for the last page and game color panel the popup was on and every game's saved colors
export const popupActivePageStorageKey = "popupActivePage";
export const popupActiveColorPanelStorageKey = "popupActiveColorPanel";
export const gameColorsStorageKey = "gameColorSettings";

// Storage keys and behavior choice for the settings page's default page and color panel preferences
export const defaultPageStorageKey = "defaultPageOnOpen";
export const defaultColorPanelStorageKey = "defaultColorPanelOnOpen";
export const lastUsedOptionValue = "last-used";

// GitHub links for the extension's repository and its releases page
export const githubUrl = "https://github.com/mateov-07/NYT-Games-Dark-Mode";
export const changelogUrl = "https://github.com/mateov-07/NYT-Games-Dark-Mode/releases";

// Notes shown in the changelog dialog, updated with every release
export const changelogNotes = [
    "Updated README.md",
    "Changed extension name and description"
];

// Email address that bug reports, feedback and questions are sent to
export const supportEmail = "speakingblock@gmail.com";

// Only pages on this origin get attached to a bug report
export const gameUrlPrefix = "https://www.nytimes.com/";

// Storage keys for the games, archives and misc master switches
export const dmGroupMasterStorageKeys = {
    "games-main": "gamesMasterEnabled",
    "archives-main": "archivesMasterEnabled",
    "misc-main": "miscMasterEnabled"
};

// Message that tells the open tab to resync its dark mode state
export const syncDarkModeAction = "syncDarkModeState";

// Message that sends a game's colors to the open tab for preview
export const applyGameColorsAction = "applyGameColors";

// Keys written by the old popup, cleared out on startup
export const legacyGroupStorageKeys = [
    "games-main", "archives-main", "misc-main",
    "games-mainRememberedChildren", "archives-mainRememberedChildren", "misc-mainRememberedChildren"
];

// Default light (made by NYT) and dark (made by the extension) colors for crosswords, sudoku, wordle and connections
export const lightCrosswordColors = {
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
export const darkCrosswordColors = {
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
export const lightSudokuColors = {
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
export const darkSudokuColors = {
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
export const lightWordleColors = {
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
export const darkWordleColors = {...lightWordleColors};
export const lightConnectionsColors = {
    cn_card_background:              "#EFEFE6",
    cn_card_text:                    "#121212",
    cn_selected_card_background:     "#5A594E",
    cn_selected_card_text:           "#F8F8F8",
    cn_solved_category_background_1: "#F9DF6D",
    cn_solved_category_text_1:       "#000000",
    cn_solved_category_background_2: "#A0C35A",
    cn_solved_category_text_2:       "#000000",
    cn_solved_category_background_3: "#B0C4EF",
    cn_solved_category_text_3:       "#000000",
    cn_solved_category_background_4: "#BA81C5",
    cn_solved_category_text_4:       "#000000",
    cn_mistakes_bubbles:             "#5A594E",
    cn_top_mistakes_text:            "#000000"
};
export const darkConnectionsColors = {
    cn_card_background:              "#FFFFFF",
    cn_card_text:                    "#000000",
    cn_selected_card_background:     "#777777",
    cn_selected_card_text:           "#FFFFFF",
    cn_solved_category_background_1: "#F9DF6D",
    cn_solved_category_text_1:       "#000000",
    cn_solved_category_background_2: "#A0C35A",
    cn_solved_category_text_2:       "#000000",
    cn_solved_category_background_3: "#B0C4EF",
    cn_solved_category_text_3:       "#000000",
    cn_solved_category_background_4: "#BA81C5",
    cn_solved_category_text_4:       "#000000",
    cn_mistakes_bubbles:             "#FFFFFF",
    cn_top_mistakes_text:            "#FFFFFF"
};

// Prebuilt Midnight, Forest and Magma palettes for crosswords, sudoku, wordle and connections
export const prebuiltCrosswordColors = {
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
export const prebuiltSudokuColors = {
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
export const prebuiltWordleColors = {
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
export const prebuiltConnectionsColors = {
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

// Every dark mode toggle along with the storage key it saves to plus the message it sends to the open tab
export const dmToggleConfig = {
    "the-crossword": {
        storageKey: "crosswordDarkModeEnabled",
        action: "enableCrosswordDarkMode"
    },
    "midi-crossword": {
        storageKey: "midiDarkModeEnabled",
        action: "enableMidiDarkMode"
    },
    "mini-crossword": {
        storageKey: "miniDarkModeEnabled",
        action: "enableMiniDarkMode"
    },
    "connections": {
        storageKey: "connectionsDarkModeEnabled",
        action: "enableConnectionsDarkMode"
    },
    "spelling-bee": {
        storageKey: "spellingBeeDarkModeEnabled",
        action: "enableSpellingBeeDarkMode"
    },
    "pips": {
        storageKey: "pipsDarkModeEnabled",
        action: "enablePipsDarkMode"
    },
    "strands": {
        storageKey: "strandsDarkModeEnabled",
        action: "enableStrandsDarkMode"
    },
    "letter-boxed": {
        storageKey: "letterBoxedDarkModeEnabled",
        action: "enableLetterBoxedDarkMode"
    },
    "tiles": {
        storageKey: "tilesDarkModeEnabled",
        action: "enableTilesDarkMode"
    },
    "sudoku": {
        storageKey: "sudokuDarkModeEnabled",
        action: "enableSudokuDarkMode"
    },
    "archive-crosswords": {
        storageKey: "crosswordsArchiveDarkModeEnabled",
        action: "enableCrosswordsArchiveDarkMode"
    },
    "archive-connections": {
        storageKey: "connectionsArchiveDarkModeEnabled",
        action: "enableConnectionsArchiveDarkMode"
    },
    "archive-spelling-bee": {
        storageKey: "spellingBeeArchiveDarkModeEnabled",
        action: "enableSpellingBeeArchiveDarkMode"
    },
    "archive-wordle": {
        storageKey: "wordleArchiveDarkModeEnabled",
        action: "enableWordleArchiveDarkMode"
    },
    "archive-strands": {
        storageKey: "strandsArchiveDarkModeEnabled",
        action: "enableStrandsArchiveDarkMode"
    },
    "games-menu": {
        storageKey: "menuDarkModeEnabled",
        action: "enableMenuDarkMode"
    },
    "crossword-stats": {
        storageKey: "crosswordStatsDarkModeEnabled",
        action: "enableCrosswordStatsDarkMode"
    },
    "custom-wordle": {
        storageKey: "customWordleDarkModeEnabled",
        action: "enableCustomWordleDarkMode"
    },
    "ta-connections": {
        storageKey: "taConnectionsDarkModeEnabled",
        action: "enableTAConnectionsDarkMode"
    },
    "misc-pages": {
        storageKey: "miscPagesDarkModeEnabled",
        action: "enableMiscPagesDarkMode"
    }
};

// Grouped dark mode toggles under each master switch
export const dmToggleGroups = {
    "games-main": [
        "the-crossword",
        "midi-crossword",
        "mini-crossword",
        "connections",
        "spelling-bee",
        "pips",
        "strands",
        "letter-boxed",
        "tiles",
        "sudoku"
    ],
    "archives-main": [
        "archive-crosswords",
        "archive-connections",
        "archive-spelling-bee",
        "archive-wordle",
        "archive-strands"
    ],
    "misc-main": [
        "games-menu",
        "crossword-stats",
        "custom-wordle",
        "ta-connections",
        "misc-pages"
    ]
};

// Every key the popup reads on open so the switches show the right state before storage is reached
export const popupStorageKeys = [
    popupActivePageStorageKey,
    popupActiveColorPanelStorageKey,
    defaultPageStorageKey,
    defaultColorPanelStorageKey,
    gameColorsStorageKey,
    ...Object.values(dmGroupMasterStorageKeys),
    ...Object.values(dmToggleConfig).map((toggleConfig) => toggleConfig.storageKey)
];

// How far the picker cursor stays inside the saturation/value box so it can still reach the exact corners
export const svCursorInset = 4;

// How long the confirmation toast beside the title stays up in milliseconds
export const headerToastDuration = 2000;

// Names of the display preset, the prebuilt presets and the custom presets
export const displayPresetName = "display";
export const prebuiltPresetNames = ["midnight", "forest", "magma"];
export const customPresetNames = ["preset1", "preset2", "preset3"];

// Display names for every preset
export const presetLabels = {
    display:  "Display",
    midnight: "Midnight",
    forest:   "Forest",
    magma:    "Magma",
    preset1:  "Preset 1",
    preset2:  "Preset 2",
    preset3:  "Preset 3"
};

// Dropdown dot colors for the light/dark display preset and the custom color presets
export const displayLightSwatch = "#FFFFFF";
export const displayDarkSwatch = "#000000";
export const customPresetSwatch = "#FFFFFF";

// Dropdown dot colors for each prebuilt preset
export const prebuiltPresetSwatches = {
    midnight: "#6FA0E8",
    forest:   "#86B96B",
    magma:    "#E8894A"
};

// Longest character length a custom preset can have
export const presetNameMaxLength = 14;

// Every game on the custom colors page with its corresponding fields and the dark mode toggles
export const colorPanelConfig = {
    crosswords: {
        label: "Crosswords",
        panelId: "panel-crosswords",
        lightColors: lightCrosswordColors,
        darkColors: darkCrosswordColors,
        prebuiltColors: prebuiltCrosswordColors,
        presetsStorageField: "crosswords",
        presetStorageField: "crosswordPreset",
        activeKeyStorageField: "activeCrosswordKey",
        displayToggleIds: ["the-crossword", "midi-crossword", "mini-crossword"]
    },
    sudoku: {
        label: "Sudoku",
        panelId: "panel-sudoku",
        lightColors: lightSudokuColors,
        darkColors: darkSudokuColors,
        prebuiltColors: prebuiltSudokuColors,
        presetsStorageField: "sudoku",
        presetStorageField: "sudokuPreset",
        activeKeyStorageField: "activeSudokuKey",
        displayToggleIds: ["sudoku"]
    },
    wordle: {
        label: "Wordle",
        panelId: "panel-wordle",
        lightColors: lightWordleColors,
        darkColors: darkWordleColors,
        prebuiltColors: prebuiltWordleColors,
        presetsStorageField: "wordle",
        presetStorageField: "wordlePreset",
        activeKeyStorageField: "activeWordleKey",
        displayToggleIds: []
    },
    connections: {
        label: "Connections",
        panelId: "panel-connections",
        lightColors: lightConnectionsColors,
        darkColors: darkConnectionsColors,
        prebuiltColors: prebuiltConnectionsColors,
        presetsStorageField: "connections",
        presetStorageField: "connectionsPreset",
        activeKeyStorageField: "activeConnectionsKey",
        displayToggleIds: ["connections"]
    }
};
export const colorPanelNames = Object.keys(colorPanelConfig);

// Page buttons and the pages they open, in the same order
export const pageButtons = [
    "dark-mode-button",
    "custom-colors-button",
    "settings-button"
];
export const pages = [
    "dark-mode-page",
    "custom-colors-page",
    "settings-page"
];