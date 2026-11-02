// Loads and handles the dark mode page's game, archive and misc toggles

// Imports
import {dmToggleConfig, dmToggleGroups, dmGroupMasterStorageKeys, syncDarkModeAction} from "./defaultExports.js";
import {writeSyncValue, sendMessageToActiveTab} from "./storage.js";
import {updateAll, showHeaderToast} from "./updater.js";
import {refreshDisplayPresetColors} from "./colorState.js";

// Sets every toggle from storage, master switches get turned on and the game switches are off by default
export function loadDMToggleStates(savedValues) {
    for (const parentToggleId of Object.keys(dmToggleGroups)) {
        const parentToggle = document.getElementById(parentToggleId);
        if (!parentToggle) continue;
        parentToggle.checked = savedValues[dmGroupMasterStorageKeys[parentToggleId]] !== false;
    }
    for (const [toggleId, toggleConfig] of Object.entries(dmToggleConfig)) {
        const toggleInput = document.getElementById(toggleId);
        if (!toggleInput) continue;
        toggleInput.checked = Boolean(savedValues[toggleConfig.storageKey]);
    }
}

// Saves a toggle when it changes, tells the tab to update and refreshes the display preset's preview colors
export function attachDMToggleHandlers() {
    for (const [toggleId, toggleConfig] of Object.entries(dmToggleConfig)) {
        const toggleInput = document.getElementById(toggleId);
        if (!toggleInput) continue;
        toggleInput.addEventListener("change", async () => {
            const isEnabled = toggleInput.checked;
            const result = await writeSyncValue(toggleConfig.storageKey, isEnabled);
            if (result.error) showHeaderToast(result.error, "error");
            sendMessageToActiveTab({ action: toggleConfig.action });
            refreshDisplayPresetColors();
            updateAll();
        });
    }
    for (const groupToggleId of Object.keys(dmToggleGroups)) {
        const groupToggle = document.getElementById(groupToggleId);
        if (!groupToggle) continue;
        groupToggle.addEventListener("change", async () => {
            const result = await writeSyncValue(dmGroupMasterStorageKeys[groupToggleId], groupToggle.checked);
            if (result.error) showHeaderToast(result.error, "error");
            sendMessageToActiveTab({ action: syncDarkModeAction });
            refreshDisplayPresetColors();
            updateAll();
        });
    }
}