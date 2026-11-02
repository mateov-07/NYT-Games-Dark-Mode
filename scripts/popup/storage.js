// Storage to save, read and sync keys throughout chrome storage

// Wraps chrome storage and tab messaging for the rest of the popup
import {
    colorPanelConfig, colorPanelNames, gameColorsStorageKeys, legacyGameColorsStorageKey
} from "./defaultExports.js";

// Runs a chrome storage write and turns whatever it reports back into a result the popup can show
function runStorageWrite(startWrite) {
    return new Promise((resolve) => {
        startWrite(() => {
            const failure = chrome.runtime.lastError;
            if (!failure) {
                resolve({});
                return;
            }
            console.error("Storage write failed: ", failure.message);
            resolve({error: describeStorageError(failure.message || "")});
        });
    });
}

// Puts chrome's storage errors into words that say what can be done about them
function describeStorageError(message) {
    if (message.includes("QUOTA_BYTES_PER_ITEM")) {
        return "Too many colors to save. Clear a preset slot.";
    }
    if (message.includes("QUOTA_BYTES") || message.includes("MAX_ITEMS")) {
        return "Chrome's sync storage is full.";
    }
    if (message.includes("WRITE_OPERATIONS")) {
        return "Saving too quickly. Wait a moment.";
    }
    return "Chrome could not save this.";
}

// Reads every given key from chrome.storage.sync and returns them as an object
export function readSyncValues(keys) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(keys, (result) => {
            if (chrome.runtime.lastError) {
                console.error("Storage read failed: ", chrome.runtime.lastError.message);
            }
            resolve(result || {});
        });
    });
}

// Saves a value to the key in chrome.storage.sync
export function writeSyncValue(key, value) {
    return runStorageWrite((done) => chrome.storage.sync.set({[key]: value}, done));
}

// Saves a whole object of keys and values to chrome.storage.sync
export function writeSyncValues(values) {
    return runStorageWrite((done) => chrome.storage.sync.set(values, done));
}

// Deletes keys from chrome.storage.sync
export function removeSyncValues(keys) {
    return runStorageWrite((done) => chrome.storage.sync.remove(keys, done));
}

// Pulls one game's fields out of a whole theme so it can be stored under its own key
function buildPanelTheme(panelName, theme) {
    const panelConfig = colorPanelConfig[panelName];
    const panelTheme = {presetMeta: {}};
    if (theme?.presetMeta?.[panelName] !== undefined) {
        panelTheme.presetMeta[panelName] = theme.presetMeta[panelName];
    }
    const panelFields = [
        panelConfig.presetsStorageField,
        panelConfig.presetStorageField,
        panelConfig.activeKeyStorageField
    ];
    for (const panelField of panelFields) {
        if (theme?.[panelField] !== undefined) {
            panelTheme[panelField] = theme[panelField];
        }
    }
    return panelTheme;
}

// Puts the per game items back together into the one theme object the popup loads from
export function mergePanelThemes(savedValues) {
    const theme = {};
    const presetMeta = {};
    for (const panelName of colorPanelNames) {
        const panelTheme = savedValues[gameColorsStorageKeys[panelName]];
        if (!panelTheme) continue;
        Object.assign(theme, panelTheme);
        Object.assign(presetMeta, panelTheme.presetMeta);
    }
    theme.presetMeta = presetMeta;
    return theme;
}

// Saves every game's colors under its own key, as one write so it still counts as a single operation
export function saveTheme(themeData) {
    const values = {};
    for (const panelName of colorPanelNames) {
        values[gameColorsStorageKeys[panelName]] = buildPanelTheme(panelName, themeData);
    }
    return writeSyncValues(values);
}

// Splits a save that still holds every game in one item, only dropping the old item once the split is stored
export async function migrateLegacyGameColors(savedValues) {
    const legacyTheme = savedValues[legacyGameColorsStorageKey];
    if (!legacyTheme || typeof legacyTheme !== "object") return savedValues;
    const values = {};
    for (const panelName of colorPanelNames) {
        const storageKey = gameColorsStorageKeys[panelName];
        if (savedValues[storageKey] !== undefined) continue;
        values[storageKey] = buildPanelTheme(panelName, legacyTheme);
    }
    if (Object.keys(values).length) {
        const result = await writeSyncValues(values);
        if (result.error) return savedValues;
    }
    await removeSyncValues([legacyGameColorsStorageKey]);
    return {...savedValues, ...values};
}

// Sends a message to the tab the user is on and ignores tabs that have nothing to listen to
export function sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs?.length) return;
        chrome.tabs.sendMessage(tabs[0].id, message, () => {
            void chrome.runtime.lastError;
        });
    });
}
