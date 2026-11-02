// Starts the popup; loads everything saved and connects the controls of the dark mode and custom colors pages

// Imports
import {popupState} from "./states.js";
import {
    defaultPageStorageKey, defaultColorPanelStorageKey, lastUsedOptionValue,
    colorPanelNames, legacyGameColorsStorageKey, legacyGroupStorageKeys, popupStorageKeys, pageButtons
} from "./defaultExports.js";
import {readSyncValues, removeSyncValues, mergePanelThemes, migrateLegacyGameColors} from "./storage.js";
import {updateAll} from "./updater.js";
import {loadThemeState} from "./colorState.js";
import {loadDMToggleStates, attachDMToggleHandlers} from "./darkMode.js";
import {
    loadSavedPageState, loadSavedColorPanelState,
    attachPageButtonHandlers, attachGameColorPanelHandlers, attachGameColorObjectHandlers, attachColorPanelScrollHandlers
} from "./navigation.js";
import {attachPickerHandlers, attachClipboardHandlers, attachHexInputHandlers, attachResetHandler} from "./picker.js";
import {attachColorPresetHandlers, attachPresetActionHandlers} from "./presets.js";

// Called from popup.js once the page loads to load saved state, attaches every handler and draws the popup
export async function initializePopup() {
    await loadPopupState();
    attachPageButtonHandlers();
    attachGameColorPanelHandlers();
    attachGameColorObjectHandlers();
    attachColorPresetHandlers();
    attachDMToggleHandlers();
    attachPickerHandlers();
    attachClipboardHandlers();
    attachHexInputHandlers();
    attachResetHandler();
    attachColorPanelScrollHandlers();
    attachPresetActionHandlers();
    updateAll();
}

// Reads every saved value from storage, clears the old popup's keys and loads everything into popupState
async function loadPopupState() {
    const [readValues] = await Promise.all([
        readSyncValues([...popupStorageKeys, legacyGameColorsStorageKey]),
        removeSyncValues(legacyGroupStorageKeys)
    ]);
    const savedValues = await migrateLegacyGameColors(readValues);
    loadBehaviorSettings(savedValues);
    loadSavedPageState(savedValues);
    loadDMToggleStates(savedValues);
    loadSavedColorPanelState(savedValues);
    loadThemeState(mergePanelThemes(savedValues));
}

// Reloads everything from storage after the settings page rewrites it to keep the user on the page they are looking at
export async function reloadPopupState() {
    const currentPage = popupState.activePageButtonClass;
    await loadPopupState();
    popupState.activePageButtonClass = currentPage;
    updateAll();
}

// Loads the settings page's default page and color panel choices and falls back to the last used option
function loadBehaviorSettings(savedValues) {
    const savedDefaultPage = savedValues[defaultPageStorageKey];
    popupState.defaultPage = pageButtons.includes(savedDefaultPage) ? savedDefaultPage : lastUsedOptionValue;
    const savedDefaultPanel = savedValues[defaultColorPanelStorageKey];
    popupState.defaultColorPanel = colorPanelNames.includes(savedDefaultPanel) ? savedDefaultPanel : lastUsedOptionValue;
}