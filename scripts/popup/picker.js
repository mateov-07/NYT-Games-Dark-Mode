// Handles the color picker for HSV interactions, typable hex field, and the copy, paste and reset buttons

// Imports
import {popupState} from "./states.js";
import {svCursorInset} from "./defaultExports.js";
import {clamp, hexToHsv, normalizeHexColor} from "./colorMath.js";
import {updateAll, showHeaderToast, getCurrentPickerHex} from "./updater.js";
import {
    isActiveEditingLocked, setPickerHsv, applyPickerColorToSelectedOption, getSelectedDefaultHex
} from "./colorState.js";
import {
    saveThemeNow, scheduleThemeSave, sendSelectedPanelColorsNow, scheduleSelectedPanelUpdate
} from "./presets.js";

// Lets the saturation/value box and the hue slider be dragged
export function attachPickerHandlers() {
    const saturationValueArea = document.getElementById("sv");
    const hueSlider = document.getElementById("hue");
    attachDragHandler(saturationValueArea, (event) => {
        updateSaturationAndValueFromCursor(event);
    });
    attachDragHandler(hueSlider, (event) => {
        updateHueFromSlider(event);
    });
}

// Runs the move handler on press and while dragging, even if the pointer leaves the element
function attachDragHandler(element, moveHandler) {
    if (!element) return;
    let isDragging = false;
    element.addEventListener("pointerdown", (event) => {
        isDragging = true;
        element.setPointerCapture?.(event.pointerId);
        moveHandler(event);
        event.preventDefault();
    });
    window.addEventListener("pointermove", (event) => {
        if (!isDragging) return;
        moveHandler(event);
        event.preventDefault();
    });
    window.addEventListener("pointerup", (event) => {
        if (!isDragging) return;
        isDragging = false;
        element.releasePointerCapture?.(event.pointerId);
        event.preventDefault();
    });
}

// Sets saturation and value from the cursor's position with a preview and a save and tab update delay
function updateSaturationAndValueFromCursor(event) {
    if (isActiveEditingLocked()) return;
    const saturationValueArea = document.getElementById("sv");
    if (!saturationValueArea) return;
    const bounds = saturationValueArea.getBoundingClientRect();
    const cursorX = event.clientX - bounds.left;
    const cursorY = event.clientY - bounds.top;
    const saturationTravel = saturationValueArea.clientWidth - 2 * svCursorInset;
    const valueTravel = saturationValueArea.clientHeight - 2 * svCursorInset;
    if (saturationTravel <= 0 || valueTravel <= 0) {
        return;
    }
    popupState.pickerSaturation = clamp((cursorX - svCursorInset) / saturationTravel);
    popupState.pickerValue = clamp(1 - (cursorY - svCursorInset) / valueTravel);

    applyPickerColorToSelectedOption();
    updateAll();
    scheduleThemeSave();
    scheduleSelectedPanelUpdate();
}

// Sets the hue from the slider's position, previewing right away while delaying the save and tab update
function updateHueFromSlider(event) {
    if (isActiveEditingLocked()) return;
    const hueSlider = document.getElementById("hue");
    if (!hueSlider) return;
    const bounds = hueSlider.getBoundingClientRect();
    const sliderX = event.clientX - bounds.left;
    const sliderWidth = hueSlider.clientWidth;
    if (sliderWidth <= 0) return;
    popupState.pickerHue = clamp(sliderX / sliderWidth) * 360;
    if (popupState.pickerHue >= 360) {
        popupState.pickerHue = 359.999;
    }

    applyPickerColorToSelectedOption();
    updateAll();
    scheduleThemeSave();
    scheduleSelectedPanelUpdate();
}

// Moves the picker onto a hex color and returns false when the hex is not valid
function setPickerFromHex(hex) {
    const hsv = hexToHsv(hex);
    if (!hsv) return false;
    setPickerHsv(hsv);
    return true;
}

// Applies the picker's color to the selected option, redraws, saves and sends the colors to the tab
function commitPickerColor() {
    applyPickerColorToSelectedOption();
    updateAll();
    saveThemeNow();
    sendSelectedPanelColorsNow();
}

// Copies the picker's hex to the clipboard or pastes a copied hex onto the selected color (depending on button clicked)
export function attachClipboardHandlers() {
    const copyButton = document.getElementById("copyHex");
    const pasteButton = document.getElementById("pasteHex");
    copyButton?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(getCurrentPickerHex());
            showHeaderToast("Copied hex to clipboard");
        } catch (error) {
            console.error("Error copying hex: ", error);
        }
    });
    pasteButton?.addEventListener("click", async () => {
        if (isActiveEditingLocked()) return;
        try {
            const clipboardText = await navigator.clipboard.readText();
            const normalizedHex = normalizeHexColor(clipboardText);
            if (!normalizedHex || !setPickerFromHex(normalizedHex)) return;
            commitPickerColor();
            showHeaderToast("Pasted hex to selection");
        } catch (error) {
            console.error("Error pasting hex: ", error, error?.name, error?.message);
        }
    });
}

// Selects the hex field's text on focus and commits what was typed on Enter/focus leaves
export function attachHexInputHandlers() {
    const hexInput = document.getElementById("hexInput");
    if (!hexInput) return;
    hexInput.addEventListener("focus", () => {
        hexInput.select();
    });
    hexInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        hexInput.blur();
    });
    hexInput.addEventListener("blur", () => {
        commitTypedHex(hexInput);
    });
}

// Commits the typed hex as is or with extra zeros if short, invalid turns black, anything else restores current color
function commitTypedHex(hexInput) {
    const pickerHex = getCurrentPickerHex();
    const typedValue = hexInput.value.trim().toUpperCase();
    if (!typedValue || isActiveEditingLocked()) {
        hexInput.value = pickerHex.slice(1);
        return;
    }
    const typedHex = buildTypedHex(typedValue);
    hexInput.value = typedHex.slice(1);
    if (typedHex === pickerHex) return;
    if (!setPickerFromHex(typedHex)) return;
    commitPickerColor();
}

// Turns what was typed into a hex so that typing/pasting a code always land on the same color, and pads anything shorter
function buildTypedHex(typedValue) {
    if (!/^[0-9A-F]{1,6}$/.test(typedValue)) return "#000000";
    return normalizeHexColor(typedValue) || `#${typedValue.padEnd(6, "0")}`;
}

// Resets the selected color back to its default when the reset button is clicked
export function attachResetHandler() {
    const resetButton = document.getElementById("resetHex");
    resetButton?.addEventListener("click", () => {
        if (isActiveEditingLocked()) return;
        if (!setPickerFromHex(getSelectedDefaultHex())) return;
        commitPickerColor();
        showHeaderToast("Reset selected hex to default");
    });
}