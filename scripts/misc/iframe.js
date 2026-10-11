// Injected into the iframe to apply dark mode styles based on the extension's storage settings

// Groups of dark mode keys
const darkModeGroups = {
    gamesMasterEnabled: [
        "crosswordDarkModeEnabled",
        "midiDarkModeEnabled",
        "miniDarkModeEnabled",
        "connectionsDarkModeEnabled",
        "spellingBeeDarkModeEnabled",
        "pipsDarkModeEnabled",
        "strandsDarkModeEnabled",
        "letterBoxedDarkModeEnabled",
        "tilesDarkModeEnabled",
        "sudokuDarkModeEnabled"
    ],
    archivesMasterEnabled: [
        "crosswordsArchiveDarkModeEnabled",
        "connectionsArchiveDarkModeEnabled",
        "spellingBeeArchiveDarkModeEnabled",
        "wordleArchiveDarkModeEnabled",
        "strandsArchiveDarkModeEnabled"
    ],
    miscMasterEnabled: [
        "menuDarkModeEnabled",
        "crosswordStatsDarkModeEnabled",
        "customWordleDarkModeEnabled",
        "taConnectionsDarkModeEnabled",
        "miscPagesDarkModeEnabled"
    ]
};

// Every key the iframe cares about so storage can be read and watched
const darkModeKeys = Object.entries(darkModeGroups).flatMap(
    ([masterKey, gameKeys]) => [masterKey, ...gameKeys]
);

// Function that returns true when at least one game has a dark mode state active
function isAnyDarkModeEnabled(data) {
    return Object.entries(darkModeGroups).some(([masterKey, gameKeys]) =>
        data[masterKey] !== false && gameKeys.some((gameKey) => data[gameKey] === true)
    );
}

// Applies or removes dark mode to match storage via what the page is showing for proper iframe usage
function applyIframeDarkMode() {
    const iframeCSS = `
        .css-ec6qvc-IframeBody, .css-1pd93lg-FormBox, .css-68379f-HiddenInput {
            background-color: #0f0f0f !important;
        }

        .css-sfogtm-InputLabel, .css-stk443-Separator {
            color: white !important;
        }

        .css-11g480x-InputBox {
            color: white !important;
            background-color: #0f0f0f !important;
        }

        .css-1aaraqy-FieldBox, .css-1p2nody-FieldBox {
            border: 1px solid white !important;
        }

        .css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button {
            border: 0.0625em solid white !important;
            color: black !important;
            background-color: white !important;
        }

        .css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button:hover {
            background-color: #e4e4e4 !important;
            border-color: #e4e4e4 !important;
            color: black !important;
        }

        .css-1k28tcn-formStyles-formStyles-EnterEmailSsoBottom .legal-disclaimer p,
        .css-1k28tcn-formStyles-formStyles-EnterEmailSsoBottom .legal-disclaimer p a,
        .css-1pd93lg-FormBox a {
            color: white !important;
        }
    `;
    const style = document.createElement("style");
    style.id = "iframestyle";
    style.textContent = iframeCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Removes the dark mode style element from the iframe
function removeIframeDarkMode() {
    const styleElement = document.getElementById("iframestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Syncs the iframe dark mode state with storage
function syncIframeDarkMode() {
    chrome.storage.sync.get(darkModeKeys, function(data) {
        const shouldBeEnabled = isAnyDarkModeEnabled(data);
        const isEnabled = Boolean(document.getElementById("iframestyle"));
        if (shouldBeEnabled && !isEnabled) {
            applyIframeDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            removeIframeDarkMode();
        }
    });
}

// Listens for messages from the popup to sync dark mode state
chrome.runtime.onMessage.addListener(function(message) {
    const isDarkModeToggle = message.action && message.action.toLowerCase().includes("darkmode");
    if (isDarkModeToggle) {
        syncIframeDarkMode();
    }
});

// Listens for storage changes to sync dark mode state
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && darkModeKeys.some((key) => key in changes)) {
        syncIframeDarkMode();
    }
});

syncIframeDarkMode();