// Handles all preset actions for the dropdown, saving/sending colors to the tab, preset codes, and related dialogs

// Imports
import {popupState} from "./states.js";
import {
    colorPanelConfig, colorPanelNames,
    displayPresetName, customPresetNames, presetLabels, presetNameMaxLength, customPresetSwatch,
    applyGameColorsAction
} from "./defaultExports.js";
import {hexToHsv, normalizeHexColor} from "./colorMath.js";
import {saveTheme, sendMessageToActiveTab} from "./storage.js";
import {getModalElements, openModal} from "./modal.js";
import {
    updateAll, updatePresetMenuOpenState, showHeaderToast, getPresetDisplayName, getCustomPresetColor
} from "./updater.js";
import {
    buildActivePanelColors, resolveColorKey, syncPickerToSelectedColor, isPrebuiltPreset, isPanelEditingLocked
} from "./colorState.js";

// Bumped if the preset code format ever changes so old codes can be rejected with a clear reason
const presetCodeVersion = 1;

// Opens and closes the preset dropdown and applies the picked perset and closes it on click
export function attachColorPresetHandlers() {
    const selectButton = document.getElementById("presetSelectButton");
    const menu = document.getElementById("presetMenu");
    if (!selectButton || !menu) return;
    selectButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setPresetMenuOpen(!popupState.presetMenuOpen);
    });
    menu.querySelectorAll(".preset-menu-item").forEach((menuItem) => {
        menuItem.addEventListener("click", () => {
            const presetName = menuItem.dataset.preset;
            setPresetMenuOpen(false);
            if (!presetName) return;
            applyPanelPreset(popupState.activeColorPanel, presetName);
        });
    });
    document.addEventListener("click", (event) => {
        if (!popupState.presetMenuOpen) return;
        if (event.target.closest(".preset-select")) return;
        setPresetMenuOpen(false);
    });
}

// Shows/hides the preset dropdown menu
function setPresetMenuOpen(shouldOpen) {
    popupState.presetMenuOpen = shouldOpen;
    updatePresetMenuOpenState();
}

// Switches a game to the given preset, rebuilds its colors, keeps a color selected, then saves and redraws
function applyPanelPreset(panelName, presetName) {
    const isKnownPreset = presetName === displayPresetName ||
        isPrebuiltPreset(presetName) ||
        customPresetNames.includes(presetName);
    if (!isKnownPreset) return;
    popupState.activePresets[panelName] = presetName;
    buildActivePanelColors(panelName);
    const panelColors = popupState.colors[panelName];
    if (popupState.selectedPanel !== panelName || !panelColors[popupState.selectedColorKey]) {
        popupState.selectedPanel = panelName;
        popupState.selectedColorKey = resolveColorKey(popupState.lastColorKeys[panelName], panelColors);
    }
    popupState.lastColorKeys[panelName] = popupState.selectedColorKey;
    syncPickerToSelectedColor();
    saveThemeNow();
    updateAll();
}

// Saves every game's custom presets, what preset is active and last selected color to storage
export function saveThemeNow() {
    const themeData = {presetMeta: {}};
    for (const panelName of colorPanelNames) {
        themeData.presetMeta[panelName] = popupState.presetMeta[panelName];
        const panelConfig = colorPanelConfig[panelName];
        themeData[panelConfig.presetsStorageField] = serializeCustomPresets(popupState.customColors[panelName]);
        themeData[panelConfig.presetStorageField] = popupState.activePresets[panelName];
        themeData[panelConfig.activeKeyStorageField] = popupState.lastColorKeys[panelName];
    }
    saveTheme(themeData);
}

// Stores only the colors a custom preset changes from the light defaults
function serializeCustomPresets(presetMaps) {
    const serialized = {};
    for (const presetName of customPresetNames) {
        const presetMap = presetMaps[presetName] || {};
        const changedColors = {};
        for (const [colorKey, colorState] of Object.entries(presetMap)) {
            if (colorState.hex === colorState.defaultHex) continue;
            changedColors[colorKey] = {
                h: Math.round(colorState.h * 100) / 100,
                s: Math.round(colorState.s * 10000) / 10000,
                v: Math.round(colorState.v * 10000) / 10000,
                hex: colorState.hex
            };
        }
        serialized[presetName] = changedColors;
    }
    return serialized;
}

// Delays saving by 250ms so dragging the picker does not write to storage on every move
export function scheduleThemeSave() {
    clearTimeout(popupState.saveTimerId);
    popupState.saveTimerId = setTimeout(() => { saveThemeNow(); }, 250);
}

// Builds a plain map of one game's color keys to their hex values
function buildPanelColorPayload(panelName) {
    const payload = {};
    for (const [colorKey, colorState] of Object.entries(popupState.colors[panelName] || {})) {
        payload[colorKey] = colorState.hex;
    }
    return payload;
}

// Sends a game's colors to the tab for a preview
function sendPanelColorsNow(panelName) {
    sendMessageToActiveTab({
        action: applyGameColorsAction,
        panel: panelName,
        colors: buildPanelColorPayload(panelName)
    });
}

// Sends the colors of whichever game owns the selected color to the tab
export function sendSelectedPanelColorsNow() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return;
    sendPanelColorsNow(popupState.selectedPanel);
}

// Delays sending one game's colors by 35ms so dragging the picker does not flood the tab with messages
function schedulePanelUpdate(panelName) {
    clearTimeout(popupState.panelUpdateTimerIds[panelName]);
    popupState.panelUpdateTimerIds[panelName] = setTimeout(() => { sendPanelColorsNow(panelName); }, 35);
}

// Delays sending the colors of whichever game owns the selected color
export function scheduleSelectedPanelUpdate() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return;
    schedulePanelUpdate(popupState.selectedPanel);
}

// Returns the game and preset the user is on and whether the preset is prebuilt or locked
function getActivePresetContext() {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    return {
        kind: panelName,
        presetName,
        presetMaps: popupState.customColors[panelName],
        prebuilt: isPrebuiltPreset(presetName),
        locked: isPanelEditingLocked(panelName)
    };
}

// Packs the active preset's colors into a base64 code for exporting
function buildPresetCode() {
    const {kind} = getActivePresetContext();
    const colors = {};
    for (const [colorKey, colorState] of Object.entries(popupState.colors[kind] || {})) {
        colors[colorKey] = colorState.hex;
    }
    return btoa(JSON.stringify({v: presetCodeVersion, kind, colors}));
}

// Unpacks a preset code, returning its colors or an error when it is unreadable/bad version or meant for a different game
function readPresetCode(code) {
    let payload;
    try {
        payload = JSON.parse(atob(String(code).trim()));
    } catch {
        return {error: "Code could not be read. Check that it was copied correctly."};
    }
    if (!payload || payload.v !== presetCodeVersion) {
        return {error: "Code came from a different version of the extension."};
    }
    const {kind} = getActivePresetContext();
    if (payload.kind !== kind) {
        const codePanel = colorPanelConfig[payload.kind]?.label;
        if (!codePanel) {
            return {error: "Code came from a different version of the extension."};
        }
        return {error: "This is " + codePanel + " code. Switch to the " + codePanel + " tab to load it."};
    }
    return {colors: payload.colors || {}};
}

// Writes imported colors into the active custom preset, skipping any key or hex this version does not recognize
function applyPresetCode(colors) {
    const {presetMaps, presetName} = getActivePresetContext();
    const presetMap = presetMaps[presetName];
    if (!presetMap) return;
    for (const [colorKey, hexValue] of Object.entries(colors)) {
        const colorState = presetMap[colorKey];
        if (!colorState) continue;
        const hex = normalizeHexColor(hexValue);
        const hsv = hex && hexToHsv(hex);
        if (!hsv) continue;
        colorState.h = hsv.h;
        colorState.s = hsv.s;
        colorState.v = hsv.v;
        colorState.hex = hex;
    }
    refreshAfterPresetWrite();
}

// Puts every color in the active custom preset back to its default
function clearActivePreset() {
    const {presetMaps, presetName} = getActivePresetContext();
    const presetMap = presetMaps[presetName];
    if (!presetMap) return;
    for (const colorState of Object.values(presetMap)) {
        const defaultHsv = hexToHsv(colorState.defaultHex) || {h: 0, s: 0, v: 1};
        colorState.h = defaultHsv.h;
        colorState.s = defaultHsv.s;
        colorState.v = defaultHsv.v;
        colorState.hex = colorState.defaultHex;
    }
    refreshAfterPresetWrite();
}

// Resyncs the picker, saves, redraws and sends the colors to the open tab after a preset changes
function refreshAfterPresetWrite() {
    syncPickerToSelectedColor();
    saveThemeNow();
    updateAll();
    sendSelectedPanelColorsNow();
}

// Connects the edit, export, import and clear buttons to their dialogs and keeps the color dot synced while typing
export function attachPresetActionHandlers() {
    document.getElementById("editPreset")?.addEventListener("click", openEditPresetModal);
    document.getElementById("exportPreset")?.addEventListener("click", openExportPresetModal);
    document.getElementById("importPreset")?.addEventListener("click", openImportPresetModal);
    document.getElementById("clearPreset")?.addEventListener("click", openClearPresetModal);
    getModalElements().presetColor?.addEventListener("input", updateEditSwatch);
}

// Opens the dialog that renames the active custom preset and sets its dot color in the dropdown
function openEditPresetModal() {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    openModal({
        title: "Edit Preset",
        message: `Rename this preset and give it a color in the list. This only changes the appearance in the popup's dropdown and does not affect the board colors for ${colorPanelConfig[panelName].label}.`,
        showFields: true,
        confirmLabel: "Save",
        cancelLabel: "Cancel",
        focus: "name",
        onOpen: (modal) => {
            modal.presetName.value = getPresetDisplayName(panelName, presetName);
            modal.presetName.placeholder = presetLabels[presetName];
            modal.presetColor.value = (getCustomPresetColor(panelName, presetName) || customPresetSwatch).slice(1);
            updateEditSwatch();
        },
        onConfirm: saveEditedPreset
    });
}

// Opens the dialog that shows the active preset as a shareable code with its own message for prebuilt presets
function openExportPresetModal() {
    const {prebuilt, presetName} = getActivePresetContext();
    openModal({
        title: prebuilt ? "Export Prebuilt Preset" : "Export Preset",
        message: prebuilt
            ? `This is the ${presetLabels[presetName]} preset code. ${presetLabels[presetName]} itself cannot be edited, so load this code into one of your custom slots to make your own version of it.`
            : "This is your preset code. Copy it and make sure to store it to be able to share this preset.",
        code: {value: buildPresetCode(), readOnly: true},
        confirmLabel: "Done",
        focus: "code-select"
    });
}

// Opens the dialog that loads a preset code into the active custom preset
function openImportPresetModal() {
    openModal({
        title: "Import Preset",
        message: "Paste in the code that was given to you on preset export.",
        code: {value: "", readOnly: false},
        confirmLabel: "Load",
        cancelLabel: "Cancel",
        focus: "code",
        onConfirm: (modal) => {
            const result = readPresetCode(modal.code.value);
            if (result.error) return result;
            applyPresetCode(result.colors);
            showHeaderToast("Imported preset via code");
        }
    });
}

// Opens the dialog that confirms clearing the active custom preset back to its defaults
function openClearPresetModal() {
    openModal({
        title: "Clear Preset",
        message: "Are you sure you want to clear this preset? Every color in it goes back to the light default. This CANNOT be undone!",
        confirmLabel: "Clear",
        cancelLabel: "Cancel",
        focus: "cancel",
        onConfirm: () => {
            clearActivePreset();
            showHeaderToast("Cleared preset to default");
        }
    });
}

// Keeps the edit dialog's color dot synced with whatever hex has been typed
function updateEditSwatch() {
    const modal = getModalElements();
    if (!modal.presetSwatch) return;
    const hex = normalizeHexColor(modal.presetColor.value);
    modal.presetSwatch.style.background = hex || "transparent";
}

// Saves the edit dialog's name and dot color onto the active custom preset or returns an error for a bad hex/non-custom preset
function saveEditedPreset(modal) {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    if (!customPresetNames.includes(presetName)) return {error: "Only custom presets can be renamed."};
    const hex = normalizeHexColor(modal.presetColor.value);
    if (!hex) return {error: "Invalid Hexcode. Use 6 characters from 0-9 and/or A-F."};
    const typedName = modal.presetName.value.trim().slice(0, presetNameMaxLength);
    popupState.presetMeta[panelName][presetName] = {
        name: typedName || presetLabels[presetName],
        color: hex
    };
    saveThemeNow();
    updateAll();
    return {};
}