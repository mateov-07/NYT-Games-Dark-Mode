// Redraws the popup from popupState

// Imports
import {popupState} from "./states.js";
import {
    pageButtons, pages, dmToggleGroups, svCursorInset,
    displayPresetName, presetLabels,
    prebuiltPresetSwatches, displayLightSwatch, displayDarkSwatch, customPresetSwatch,
    customPresetNames, colorPanelConfig, colorPanelNames, headerToastDuration,
    isPrebuiltPreset, isPresetLocked
} from "./defaultExports.js";
import {hsvToHex} from "./colorMath.js";

// Gets the elements the color panels and the color picker are drawn into
function getColorPanel(panelName) {
    return document.getElementById(colorPanelConfig[panelName].panelId);
}
function getSaturationValueArea() {
    return document.getElementById("sv");
}
function getHueSlider() {
    return document.getElementById("hue");
}
function getSaturationValueCursor() {
    return document.getElementById("svCursor");
}
function getHueSliderCursor() {
    return document.getElementById("hueCursor");
}
function getPreviewSwatch() {
    return document.getElementById("preview");
}
function getHexOutput() {
    return document.getElementById("hexOut");
}
function getHexOutputText() {
    return document.querySelector("#hexOut .hex-text");
}
function getSaturationValueMask() {
    return document.querySelector("#sv .sv-mask");
}

// Returns the color picker's current color as a hex value
export function getCurrentPickerHex() {
    return hsvToHex(
        popupState.pickerHue,
        popupState.pickerSaturation,
        popupState.pickerValue
    );
}

// Redraws the entire popup from popupState
export function updateAll() {
    updatePages();
    updateSuspendedGroups();
    updateGameColorButton();
    updateGameColorPanel();
    updateAllGamesColorObjects();
    updatePicker();
    updatePresetUI();
    updateSettingsChoices();
    updateScrollAffordance();
}

// Marks whichever behavior choices the settings page has saved
export function updateSettingsChoices() {
    updateChoiceGroup("#defaultPage [data-default-page]", "defaultPage", popupState.defaultPage);
    updateChoiceGroup("#defaultColorPanel [data-default-panel]", "defaultPanel", popupState.defaultColorPanel);
}

// Lights up the saved choice within one behavior group
function updateChoiceGroup(selector, datasetKey, activeValue) {
    document.querySelectorAll(selector).forEach((choiceButton) => {
        choiceButton.classList.toggle("enabled", choiceButton.dataset[datasetKey] === activeValue);
    });
}

// Timer that hides the confirmation toast, restarted whenever a new toast is shown
let headerToastTimerId = null;

// Flashes a short confirmation beside the popup's title once an action succeeds
export function showHeaderToast(message) {
    const toast = document.getElementById("headerToast");
    if (!toast) return;
    const toastText = toast.querySelector(".header-toast-text");
    if (toastText) {
        toastText.textContent = message;
    }
    toast.classList.add("open");
    clearTimeout(headerToastTimerId);
    headerToastTimerId = setTimeout(() => {
        toast.classList.remove("open");
    }, headerToastDuration);
}

// Dims a group whose master switch is off, its games keep their settings and stay clickable but are not applied
export function updateSuspendedGroups() {
    for (const parentToggleId of Object.keys(dmToggleGroups)) {
        const parentToggle = document.getElementById(parentToggleId);
        if (!parentToggle) continue;
        const subToggles = parentToggle.closest(".section-header")?.parentElement?.querySelector(".sub-toggles");
        if (subToggles) {
            subToggles.classList.toggle("suspended", !parentToggle.checked);
        }
    }
}

// Fades the edges of the visible color panel wherever more options are still down/up
export function updateScrollAffordance() {
    const panelsContainer = document.querySelector(".color-info-panels");
    if (!panelsContainer) return;
    const visiblePanel = panelsContainer.querySelector(".color-info-panel:not(.hidden)");
    if (!visiblePanel) {
        panelsContainer.classList.remove("can-scroll");
        panelsContainer.classList.remove("can-scroll-up");
        return;
    }
    const remainingScroll =
        visiblePanel.scrollHeight - visiblePanel.scrollTop - visiblePanel.clientHeight;
    panelsContainer.classList.toggle("can-scroll", remainingScroll > 2);
    panelsContainer.classList.toggle("can-scroll-up", visiblePanel.scrollTop > 2);
}

// Draws the preset dropdown and locks the picker, hex field and preset buttons when a display or prebuilt preset is active
export function updatePresetUI() {
    const activePreset = popupState.activePresets[popupState.activeColorPanel];
    updatePresetSelect(activePreset);
    for (const panelName of colorPanelNames) {
        const colorPanel = getColorPanel(panelName);
        if (colorPanel) {
            colorPanel.classList.toggle("preset-locked", isPresetLocked(popupState.activePresets[panelName]));
        }
    }
    const hexInput = getHexOutputText();
    if (hexInput) {
        hexInput.readOnly = !popupState.selectedColorKey ||
            isPresetLocked(popupState.activePresets[popupState.selectedPanel]);
    }
    
    const pickerLocked = isPresetLocked(activePreset);
    const activeIsPrebuilt = isPrebuiltPreset(activePreset);
    const colorPicker = document.querySelector(".color-picker");
    if (colorPicker) {
        colorPicker.classList.toggle("locked", pickerLocked);
        colorPicker.classList.toggle("prebuilt", activeIsPrebuilt);
        if (activeIsPrebuilt) {
            colorPicker.dataset.lockedPreset = presetLabels[activePreset];
        } else {
            delete colorPicker.dataset.lockedPreset;
        }
        colorPicker.dataset.lockedGame = colorPanelConfig[popupState.activeColorPanel].label;
    }
    const exportButton = document.getElementById("exportPreset");
    if (exportButton) {
        exportButton.disabled = activePreset === displayPresetName;
    }
    for (const buttonId of ["importPreset", "clearPreset"]) {
        const actionButton = document.getElementById(buttonId);
        if (actionButton) {
            actionButton.disabled = pickerLocked;
        }
    }
}

// Returns true when the display preset should preview dark colors (dark toggles are on)
export function isDisplayPresetDark(panelName) {
    const groupToggle = document.getElementById("games-main");
    if (groupToggle && !groupToggle.checked) return false;
    return (colorPanelConfig[panelName].displayToggleIds || []).some(
        (toggleId) => document.getElementById(toggleId)?.checked
    );
}

// Returns the name a preset shows in the dropdown
export function getPresetDisplayName(panelName, presetName) {
    return popupState.presetMeta[panelName]?.[presetName]?.name || presetLabels[presetName] || presetName;
}

// Returns a custom preset's saved dot color, or null when it does not have one
export function getCustomPresetColor(panelName, presetName) {
    return popupState.presetMeta[panelName]?.[presetName]?.color || null;
}

// Returns the dot color a preset shows in the dropdown
function getPresetSwatchHex(presetName) {
    const panelName = popupState.activeColorPanel;
    if (presetName === displayPresetName) {
        const ownsNoToggle = !(colorPanelConfig[panelName].displayToggleIds || []).length;
        return ownsNoToggle || isDisplayPresetDark(panelName) ? displayDarkSwatch : displayLightSwatch;
    }
    if (isPrebuiltPreset(presetName)) {
        return prebuiltPresetSwatches[presetName] || customPresetSwatch;
    }
    return getCustomPresetColor(panelName, presetName) || customPresetSwatch;
}

// Puts the active preset on the dropdown button, marks it in the menu and only allows editing custom presets
function updatePresetSelect(activePreset) {
    const panelName = popupState.activeColorPanel;
    const selectName = document.querySelector("#presetSelectButton .preset-select-name");
    const selectSwatch = document.querySelector("#presetSelectButton .preset-select-swatch");
    if (selectName) {
        selectName.textContent = getPresetDisplayName(panelName, activePreset);
    }
    if (selectSwatch) {
        selectSwatch.style.background = getPresetSwatchHex(activePreset);
    }

    document.querySelectorAll("#presetMenu .preset-menu-item").forEach((menuItem) => {
        const presetName = menuItem.dataset.preset;
        const isActive = presetName === activePreset;
        menuItem.classList.toggle("enabled", isActive);
        menuItem.setAttribute("aria-selected", String(isActive));
        const menuName = menuItem.querySelector(".preset-menu-name");
        if (menuName) {
            menuName.textContent = getPresetDisplayName(panelName, presetName);
        }
        const swatch = menuItem.querySelector(".preset-menu-swatch");
        if (swatch) {
            swatch.style.background = getPresetSwatchHex(presetName);
        }
    });
    const editButton = document.getElementById("editPreset");
    if (editButton) {
        editButton.disabled = !customPresetNames.includes(activePreset);
    }
}

// Shows or hides the preset dropdown menu and keeps the button's expanded state synced
export function updatePresetMenuOpenState() {
    const menu = document.getElementById("presetMenu");
    const selectButton = document.getElementById("presetSelectButton");
    if (menu) {
        menu.classList.toggle("open", popupState.presetMenuOpen);
    }
    if (selectButton) {
        selectButton.setAttribute("aria-expanded", String(popupState.presetMenuOpen));
    }
}

// Shows whichever page is active and highlights its button
export function updatePages() {
    pageButtons.forEach((buttonClassName) => {
        const pageButton = document.querySelector(`.${buttonClassName}`);
        if (pageButton) {
            pageButton.classList.toggle("enabled", buttonClassName === popupState.activePageButtonClass);
        }
    });
    pages.forEach((pageClassName) => {
        const page = document.querySelector(`.${pageClassName}`);
        if (!page) return;
        const expectedPageClass = popupState.activePageButtonClass.replace("button", "page");
        page.classList.toggle("hidden", pageClassName !== expectedPageClass);
    });
}

// Highlights whichever game color tab is active
export function updateGameColorButton() {
    document.querySelectorAll(".color-info-tab").forEach((panelButton) => {
        panelButton.classList.toggle(
            "enabled",
            panelButton.dataset.colorPanel === popupState.activeColorPanel
        );
    });
}

// Shows whichever game color panel is active
export function updateGameColorPanel() {
    for (const panelName of colorPanelNames) {
        const colorPanel = getColorPanel(panelName);
        if (colorPanel) {
            colorPanel.classList.toggle("hidden", popupState.activeColorPanel !== panelName);
        }
    }
}

// Redraws every game's color options
export function updateAllGamesColorObjects() {
    for (const panelName of colorPanelNames) {
        updateOneGamesColorObjects(
            `#${colorPanelConfig[panelName].panelId} .color-option[data-key]`,
            popupState.colors[panelName] || {},
            popupState.selectedPanel === panelName ? popupState.selectedColorKey : null
        );
    }
}

// Redraws one game's color options and draws the checked radio and each option's hex and color box
function updateOneGamesColorObjects(selector, colorMap, selectedColorKey) {
    document.querySelectorAll(selector).forEach((colorOption) => {
        const colorKey = colorOption.dataset.key;
        const colorState = colorMap[colorKey];
        if (!colorState) return;
        const radioInput = colorOption.querySelector("input[type='radio']");
        const hexLabel = colorOption.querySelector(".element-hex");
        const colorBox = colorOption.querySelector(".element-hex-box");

        if (radioInput) {
            radioInput.checked = colorKey === selectedColorKey;
        }
        if (hexLabel) {
            hexLabel.textContent = colorState.hex;
        }
        if (colorBox) {
            colorBox.style.background = colorState.hex;
        }
    });
}

// Redraws the color picker's box, cursors, preview and hex field, without overwriting the hex field
export function updatePicker() {
    const saturationValueArea = getSaturationValueArea();
    const hueSlider = getHueSlider();
    const saturationValueCursor = getSaturationValueCursor();
    const hueSliderCursor = getHueSliderCursor();
    const previewSwatch = getPreviewSwatch();
    const hexOutput = getHexOutput();
    const hexOutputText = getHexOutputText();
    const saturationValueMask = getSaturationValueMask();
    if (!saturationValueArea || !hueSlider || !saturationValueCursor || !hueSliderCursor || !previewSwatch || !hexOutput) {
        return;
    }

    const currentHex = getCurrentPickerHex();
    const fullHueHex = hsvToHex(popupState.pickerHue, 1, 1);
    if (saturationValueMask) {
        saturationValueMask.style.background = fullHueHex;
    }
    previewSwatch.style.background = currentHex;
    if (hexOutputText) {
        if (document.activeElement !== hexOutputText) {
            hexOutputText.value = currentHex.slice(1);
        }
    } else {
        hexOutput.textContent = currentHex;
    }

    saturationValueCursor.style.background = currentHex;
    const saturationTravel = saturationValueArea.clientWidth - 2 * svCursorInset;
    const valueTravel = saturationValueArea.clientHeight - 2 * svCursorInset;
    if (saturationTravel > 0 && valueTravel > 0) {
        const left = svCursorInset + popupState.pickerSaturation * saturationTravel;
        const top = svCursorInset + (1 - popupState.pickerValue) * valueTravel;
        saturationValueCursor.style.left = `${left}px`;
        saturationValueCursor.style.top = `${top}px`;
    }

    const hueSliderWidth = hueSlider.clientWidth;
    if (hueSliderWidth > 0) {
        const left = (popupState.pickerHue / 360) * hueSliderWidth;
        hueSliderCursor.style.left = `${left}px`;
    }
}