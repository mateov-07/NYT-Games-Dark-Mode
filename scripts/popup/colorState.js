// Holds the color data behind the custom colors page

// Imports
import {popupState} from "./states.js";
import {
    colorPanelConfig, colorPanelNames,
    displayPresetName, customPresetNames, presetLabels, presetNameMaxLength,
    isPrebuiltPreset, isPresetLocked
} from "./defaultExports.js";
import {hexToHsv, normalizeHexColor} from "./colorMath.js";
import {updateAll, isDisplayPresetDark, getCurrentPickerHex} from "./updater.js";

// Loads every game's saved theme into popupState
export function loadThemeState(savedTheme) {
    for (const panelName of colorPanelNames) {
        const panelConfig = colorPanelConfig[panelName];
        const savedPresets = savedTheme?.[panelConfig.presetsStorageField] || {};
        popupState.customColors[panelName] = loadCustomPresets({
            selector: `#${panelConfig.panelId} .color-option[data-key]`,
            defaults: panelConfig.lightColors,
            savedPresets
        });
        popupState.presetMeta[panelName] = loadPresetMeta(savedTheme?.presetMeta?.[panelName]);
        popupState.activePresets[panelName] = resolvePresetName(savedTheme?.[panelConfig.presetStorageField]);
        buildActivePanelColors(panelName);
        popupState.lastColorKeys[panelName] = resolveColorKey(
            savedTheme?.[panelConfig.activeKeyStorageField],
            popupState.colors[panelName]
        );
    }
    selectColorForActivePanel();
}

// Reads the saved names and dot colors of a custom preset and falls back to the default label if invalid
function loadPresetMeta(savedMeta) {
    const meta = {};
    for (const presetName of customPresetNames) {
        const saved = savedMeta?.[presetName] || {};
        const name = typeof saved.name === "string" ? saved.name.trim().slice(0, presetNameMaxLength) : "";
        meta[presetName] = {
            name: name || presetLabels[presetName],
            color: normalizeHexColor(saved.color) || null
        };
    }
    return meta;
}

// Builds all three custom presets for a game by using existing saved colors and light defaults everywhere else
function loadCustomPresets({selector, defaults, savedPresets}) {
    const targetMap = {};
    const colorKeys = [...document.querySelectorAll(selector)].map((colorOption) => colorOption.dataset.key);
    for (const presetName of customPresetNames) {
        const savedColors = savedPresets[presetName] || {};
        const presetMap = {};
        for (const colorKey of colorKeys) {
            const defaultHex = (defaults[colorKey] || "#FFFFFF").toUpperCase();
            const savedColor = savedColors[colorKey];
            if (savedColor) {
                presetMap[colorKey] = {
                    h: savedColor.h ?? 0,
                    s: savedColor.s ?? 0,
                    v: savedColor.v ?? 1,
                    hex: (savedColor.hex || defaultHex).toUpperCase(),
                    defaultHex
                };
            } else {
                const defaultHsv = hexToHsv(defaultHex) || {h: 0, s: 0, v: 1};
                presetMap[colorKey] = {
                    h: defaultHsv.h,
                    s: defaultHsv.s,
                    v: defaultHsv.v,
                    hex: defaultHex,
                    defaultHex
                };
            }
        }
        targetMap[presetName] = presetMap;
    }
    return targetMap;
}

// Returns the saved preset if the popup still offers it, otherwise the display preset
function resolvePresetName(savedPreset) {
    if (customPresetNames.includes(savedPreset)) return savedPreset;
    if (isPrebuiltPreset(savedPreset)) return savedPreset;
    return displayPresetName;
}

// Builds color states from a plain hex palette
function buildColorStateMap(palette) {
    const map = {};
    for (const [colorKey, hexValue] of Object.entries(palette)) {
        const hex = (hexValue || "#FFFFFF").toUpperCase();
        const hsv = hexToHsv(hex) || {h: 0, s: 0, v: 1};
        map[colorKey] = {h: hsv.h, s: hsv.s, v: hsv.v, hex, defaultHex: hex};
    }
    return map;
}

// Points a game's colors to its active preset (Display, Prebuilt 1-3, Custom 1-3)
export function buildActivePanelColors(panelName) {
    const panelConfig = colorPanelConfig[panelName];
    const presetName = popupState.activePresets[panelName];
    if (presetName === displayPresetName) {
        popupState.colors[panelName] = buildColorStateMap(
            isDisplayPresetDark(panelName) ? panelConfig.darkColors : panelConfig.lightColors
        );
    } else if (isPrebuiltPreset(presetName)) {
        popupState.colors[panelName] = buildColorStateMap(panelConfig.prebuiltColors[presetName]);
    } else {
        popupState.colors[panelName] = popupState.customColors[panelName][presetName];
    }
}

// Rebuilds every game on the display preset after a dark mode change and moves the picker onto the refreshed color
export function refreshDisplayPresetColors() {
    let didRebuild = false;
    for (const panelName of colorPanelNames) {
        if (popupState.activePresets[panelName] !== displayPresetName) continue;
        buildActivePanelColors(panelName);
        didRebuild = true;
    }
    if (!didRebuild) return;
    syncPickerToSelectedColor();
}

// Returns true when a game's active preset cannot be edited (Display or Prebuilt)
export function isPanelEditingLocked(panelName) {
    return isPresetLocked(popupState.activePresets[panelName]);
}

// Returns true when no color is selected or the selected color belongs to a preset that cannot be edited
export function isActiveEditingLocked() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return true;
    return isPanelEditingLocked(popupState.selectedPanel);
}

// Returns the saved color key if it still exists in the palette, otherwise the palette's first key
export function resolveColorKey(savedKey, colorMap) {
    if (savedKey && colorMap[savedKey]) return savedKey;
    return Object.keys(colorMap)[0] || null;
}

// Selects the remembered color of the game panel being shown, returning whether a color was selected or not
export function selectColorForActivePanel() {
    const panelName = popupState.activeColorPanel;
    const colorKey = resolveColorKey(popupState.lastColorKeys[panelName], popupState.colors[panelName]);
    if (!colorKey) {
        popupState.selectedPanel = panelName;
        popupState.selectedColorKey = null;
        return false;
    }
    return selectPanelColor(panelName, colorKey, false);
}

// Selects a color option, moves the picker onto it and redraws the popup and returns false if the color does not exist
export function selectPanelColor(panelName, colorKey, shouldSetPanel = true) {
    const colorState = popupState.colors[panelName]?.[colorKey];
    if (!colorState) return false;
    popupState.selectedPanel = panelName;
    popupState.selectedColorKey = colorKey;
    popupState.lastColorKeys[panelName] = colorKey;
    if (shouldSetPanel) {
        popupState.activeColorPanel = panelName;
    }
    setPickerHsv(colorState);
    updateAll();
    return true;
}

// Returns the color state the picker is editing or null when nothing is selected
export function getSelectedColorState() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return null;
    return popupState.colors[popupState.selectedPanel]?.[popupState.selectedColorKey] || null;
}

// Returns the default hex of the selected color
export function getSelectedDefaultHex() {
    return getSelectedColorState()?.defaultHex || "#FFFFFF";
}

// Moves the color picker onto the given hue, saturation and value
export function setPickerHsv(hsv) {
    popupState.pickerHue = hsv.h;
    popupState.pickerSaturation = hsv.s;
    popupState.pickerValue = hsv.v;
}

// Moves the color picker onto whichever color is selected
export function syncPickerToSelectedColor() {
    const colorState = getSelectedColorState();
    if (!colorState) return;
    setPickerHsv(colorState);
}

// Copies the picker's color onto the selected color option, unless the preset cannot be edited
export function applyPickerColorToSelectedOption() {
    if (isActiveEditingLocked()) return;
    const colorState = getSelectedColorState();
    if (!colorState) return;
    colorState.h = popupState.pickerHue;
    colorState.s = popupState.pickerSaturation;
    colorState.v = popupState.pickerValue;
    colorState.hex = getCurrentPickerHex();
}