// Handles the entire settings page

// Imports
import {popupState} from "./states.js";
import {
    popupStorageKeys, defaultPageStorageKey, defaultColorPanelStorageKey,
    lastUsedOptionValue, githubUrl, changelogUrl, changelogNotes, supportEmail, gameUrlPrefix,
    pageButtons, colorPanelNames, syncDarkModeAction
} from "./defaultExports.js";
import {readSyncValues, writeSyncValue, writeSyncValues, removeSyncValues, sendMessageToActiveTab} from "./storage.js";
import {openModal} from "./modal.js";
import {reloadPopupState} from "./startup.js";
import {updateAll, showHeaderToast} from "./updater.js";

// Bumped if the backup format ever changes so old codes can be rejected with a clear reason
const settingsCodeVersion = 1;

// Marks a code as a whole backup, which keeps it from being confused with a single preset's code
const settingsCodeType = "settings";

// Starting text of the bug report box thats above the automatically filled in details
const reportTemplate = [
    "Error details:",
    "",
    ""
].join("\n");

// Called once the popup starts to connect every control on the settings page
export function initializeSettings() {
    attachDataHandlers();
    attachBehaviorHandlers();
    attachSupportHandlers();
    attachAboutHandlers();
    loadVersionLabel();
}

// Connects the backup, restore and reset data options to their dialogs
function attachDataHandlers() {
    document.getElementById("backupSettings")?.addEventListener("click", openBackupModal);
    document.getElementById("restoreSettings")?.addEventListener("click", openRestoreModal);
    document.getElementById("resetSettings")?.addEventListener("click", openResetModal);
}

// Opens the dialog that shows every saved setting as one code the user can copy and keep
async function openBackupModal() {
    const savedValues = await readSyncValues(popupStorageKeys);
    openModal({
        title: "Backup Data",
        message: "This code holds every dark mode toggle, color and preference saved right now. Copy it and store it somewhere safe to be able to restore it later.",
        code: {value: buildSettingsCode(savedValues), readOnly: true},
        confirmLabel: "Copy",
        cancelLabel: "Close",
        focus: "code-select",
        onConfirm: async (modal) => {
            try {
                await navigator.clipboard.writeText(modal.code.value);
            } catch (error) {
                console.error("Error copying backup code: ", error);
                return {error: "The code could not be copied. Select it and copy it manually."};
            }
        }
    });
}

// Opens the dialog that takes a backup code and puts everything it holds back into storage
function openRestoreModal() {
    openModal({
        title: "Restore Data",
        message: "Paste in a backup code. Every dark mode toggle, color and preference saved right now will be replaced by what the backup code holds.",
        code: {value: "", readOnly: false},
        confirmLabel: "Restore",
        cancelLabel: "Cancel",
        focus: "code",
        onConfirm: async (modal) => {
            const result = readSettingsCode(modal.code.value);
            if (result.error) return result;
            await applyRestoredValues(result.values);
        }
    });
}

// Opens the dialog that clears everything the extension has saved so it resets to defaults
function openResetModal() {
    openModal({
        title: "Reset To Defaults",
        message: "Are you sure you want to reset? Every dark mode toggle, color and preference goes back to how the extension first started. This CANNOT be undone!",
        confirmLabel: "Reset",
        cancelLabel: "Cancel",
        focus: "cancel",
        onConfirm: resetToDefaults
    });
}

// Packs every saved value into a base64 code for the backup dialog
function buildSettingsCode(savedValues) {
    const values = {};
    for (const storageKey of popupStorageKeys) {
        if (savedValues[storageKey] === undefined) continue;
        values[storageKey] = savedValues[storageKey];
    }
    return encodeBase64(JSON.stringify({v: settingsCodeVersion, type: settingsCodeType, values}));
}

// Unpacks a backup code, returning the values it holds or an error message
function readSettingsCode(code) {
    let payload;
    try {
        payload = JSON.parse(decodeBase64(String(code).replace(/\s+/g, "")));
    } catch {
        return {error: "Code could not be read. Check that it was copied correctly."};
    }
    if (!payload || payload.type !== settingsCodeType) {
        return {error: "This is not a backup code. Preset codes are loaded from the custom colors page."};
    }
    if (payload.v !== settingsCodeVersion) {
        return {error: "Code came from a different version of the extension."};
    }
    const values = {};
    for (const storageKey of popupStorageKeys) {
        if (payload.values?.[storageKey] === undefined) continue;
        values[storageKey] = payload.values[storageKey];
    }
    if (!Object.keys(values).length) {
        return {error: "Code did not hold any settings this version of the extension knows about."};
    }
    return {values};
}

// Converts text to and from base64 through UTF-8 so preset names with special characters survive a backup
function encodeBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
}
function decodeBase64(code) {
    const bytes = Uint8Array.from(atob(code), (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

// Removes saved keys the backup does not hold writes the backup's values and redraws the popup
async function applyRestoredValues(values) {
    const missingKeys = popupStorageKeys.filter((storageKey) => values[storageKey] === undefined);
    await removeSyncValues(missingKeys);
    await writeSyncValues(values);
    await refreshAfterStorageRewrite("Data restored successfully!");
}

// Drops every key the extension saves which leaves each one back at its built in default
async function resetToDefaults() {
    await removeSyncValues(popupStorageKeys);
    await refreshAfterStorageRewrite("Data reset successfully!");
}

// Pulls the rewritten storage back into the popup and tells the tab to catch up and show the confirmation toast
async function refreshAfterStorageRewrite(confirmation) {
    await reloadPopupState();
    sendMessageToActiveTab({action: syncDarkModeAction});
    showHeaderToast(confirmation);
}

// Connects the default page and default color panel choices and saves the selected pick
function attachBehaviorHandlers() {
    attachChoiceGroup("#defaultPage [data-default-page]", "defaultPage", pageButtons, (choiceValue) => {
        popupState.defaultPage = choiceValue;
        return writeSyncValue(defaultPageStorageKey, choiceValue);
    });
    attachChoiceGroup("#defaultColorPanel [data-default-panel]", "defaultPanel", colorPanelNames, (choiceValue) => {
        popupState.defaultColorPanel = choiceValue;
        return writeSyncValue(defaultColorPanelStorageKey, choiceValue);
    });
}

// Saves the clicked choice of a behavior group then redraws the popup
function attachChoiceGroup(selector, datasetKey, allowedValues, saveChoice) {
    document.querySelectorAll(selector).forEach((choiceButton) => {
        choiceButton.addEventListener("click", async () => {
            const choiceValue = choiceButton.dataset[datasetKey];
            if (choiceValue !== lastUsedOptionValue && !allowedValues.includes(choiceValue)) return;
            await saveChoice(choiceValue);
            updateAll();
        });
    });
}

// Connects the changelog and bug report rows to their dialogs
function attachSupportHandlers() {
    document.getElementById("viewChangelog")?.addEventListener("click", openChangelogModal);
    document.getElementById("reportBug")?.addEventListener("click", openBugReportModal);
}

// Lists what changed in the running version with a link to the releases page on GitHub
function openChangelogModal() {
    openModal({
        title: `What's New in v${chrome.runtime.getManifest().version}`,
        notes: changelogNotes,
        link: {label: "Click here to see the full changelog", url: changelogUrl},
        confirmLabel: "Done",
        focus: "confirm"
    });
}

// Opens the bug report dialog with details already filled in and opens the mail app on confirm
async function openBugReportModal() {
    const details = await collectReportDetails();
    openModal({
        title: "Report a Bug",
        message: `Fill this in and send it to ${supportEmail}. The details at the bottom are already filled in and help track the problem down.`,
        code: {value: `${reportTemplate}\n${buildDetailBlock(details)}`, readOnly: false},
        confirmLabel: "Open Mail App",
        cancelLabel: "Close",
        focus: "code",
        onOpen: (modal) => {
            const caret = reportTemplate.indexOf("\n") + 1;
            modal.code.setSelectionRange(caret, caret);
            modal.code.scrollTop = 0;
        },
        onConfirm: (modal) => {
            chrome.tabs.create({url: buildMailtoUrl(details.version, modal.code.value)});
        }
    });
}

// Reads everything worth knowing about the build, the browser and the page being played
async function collectReportDetails() {
    return {
        version: chrome.runtime.getManifest().version,
        browser: readBrowserName(),
        system: navigator.userAgentData?.platform || "Unknown",
        page: await readActiveGameUrl()
    };
}

// Picks the browser's name and version out of the Chromium brand list, falling back to the user agent
function readBrowserName() {
    const brands = (navigator.userAgentData?.brands || [])
        .filter((entry) => !/not.?a.?brand/i.test(entry.brand));
    const namedBrand = brands.find((entry) => !/chromium/i.test(entry.brand)) || brands[0];
    if (namedBrand) return `${namedBrand.brand} ${namedBrand.version}`;
    return navigator.userAgent;
}

// Returns the NYT page the user is on, or null for anything else so no unrelated browsing goes out
function readActiveGameUrl() {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeUrl = tabs?.[0]?.url || "";
            resolve(activeUrl.startsWith(gameUrlPrefix) ? activeUrl : null);
        });
    });
}

// Builds the details block at the bottom of the bug report
function buildDetailBlock(details) {
    const lines = [
        "--- DO NOT TOUCH, KEEP THE BELOW DETAILS  ---",
        `Version: v${details.version}`,
        `Browser: ${details.browser}`,
        `System: ${details.system}`
    ];
    if (details.page) {
        lines.push(`Page: ${details.page}`);
    }
    return lines.join("\n");
}

// Packs the bug report into a mail link addressed to the support email
function buildMailtoUrl(version, reportBody) {
    const subject = `Dark Mode for NYT Games v${version} - bug report`;
    return `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(reportBody)}`;
}

// Opens the GitHub repository in a new tab from the about section
function attachAboutHandlers() {
    document.getElementById("openGithub")?.addEventListener("click", () => {
        chrome.tabs.create({url: githubUrl});
    });
}

// Fills the about section's version row straight from manifest.json so it never drifts away from the build
function loadVersionLabel() {
    const versionLabel = document.getElementById("extensionVersion");
    if (!versionLabel) return;
    versionLabel.textContent = `v${chrome.runtime.getManifest().version}`;
}