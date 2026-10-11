// Provides dark mode functionality for The Athletic Connections

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableTAConnectionsDarkMode() {
    const imgURL_Stats = chrome.runtime.getURL("imgs/sports-connections-stats.png");
    const taConnectionsCSS = `
        /* Toolbar */

        .ToolBar_content__uBhTg {
            background-color: #0f0f0f;
        }

        body .Nav_TA_CollabDesktop__oBU_1 path, body .Nav_TA_CollabMobile__6pB6E path {
            fill: white;
        }

        .Nav_hamburger__8vvYK {
            background-color: #0f0f0f;
        }

        .Nav_hamburgerLine__WlEGr {
            background-color: white;
        }

        /* Menu Sidebar */

        .Nav_drawer__zUJBS {
            background-color: #0f0f0f;
            color: white;
            scrollbar-color: white #0f0f0f;
        }

        .Nav_navItem__c5wKU {
            color: white;
        }

        .Nav_navItemWrapper__9FfdP:hover {
            background-color: #777777;
        }

        .Nav_icon-connections__2rfhc {
            border: 1px solid white;
            border-radius: 20%;
        }

        .Nav_icon-nyt__Fw6mx {
            filter: invert(1);
        }

        /* Ad Page */

        .InterstitialAd_adBody__DQLO6 {
            background-color: #0f0f0f;
        }

        .InterstitialAd_adControlsContainer__ydgVU {
            border-top: 1px solid white;
            background-color: #0f0f0f;
        }

        .InterstitialAd_adTimerContainer__hBBxs div {
            color: white;
        }

        .InterstitialAd_adContinueContainer__uOGv8 {
            color: white;
        }

        .InterstitialAd_adCaretContainer__i6S7T {
            filter: invert(1);
        }

        .InterstitialAd_adTimerContainer__hBBxs>div:last-child {
            border-left: 1px solid white;
        }

        /* Toolbar Interactables */

        div.App_toolbar__l_J2c>div>div:last-child>div>a, 
        div.App_toolbar__l_J2c>div>div:last-child>div>button, 
        div.App_toolbar__l_J2c>div>div:last-child>div>div>button {
            filter: invert(1);
        }
        div.App_toolbar__l_J2c>div>div:last-child>div>a:hover, 
        div.App_toolbar__l_J2c>div>div:last-child>div>button:hover, 
        div.App_toolbar__l_J2c>div>div:last-child>div>div>button:hover {
            background-color: #777777;
        }

        .Dropdown_dropdownItem__PJxWl a, .Dropdown_dropdownItem__PJxWl button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown_dropdownItem__PJxWl a:hover, .Dropdown_dropdownItem__PJxWl button:hover {
            background-color: #777777;
        }

        img[alt="dropdown arrow"] {
            filter: invert(1);
        }

        .Modal_content__mW7Xx {
            color: white;
            background-color: #0f0f0f;
        }

        .closeX_closeX__GlEGx {
            background-color: white;
        }

        .ToolbarMessage_titleText__9QJ7s .closeX_closeX__GlEGx {
            background-color: black;
        }

        .Help_helpArrow__WyGGr {
            filter: invert(1);
        }

        .Stats_shareButton__NpkFB {
            color: black;
            background-color: white;
        }

        .Stats_anonGraphic__z2XCn img {
            content: url("${imgURL_Stats}");
        }

        .Stats_createAccountButton__KG_FZ {
            background-color: white;
            color: black;
        }

        /* Results Page */

        .FirstFoundCategoryStat_firstFoundTitleContainer__BTHlv p {
            color: white;
        }

        .FirstFoundCategoryStat_bordered__6GpVF {
            border: 2px solid white !important;
        }

        .FirstFoundCategoryStat_categoryData__gjpCG>legend {
            background: #0f0f0f;
        }

        .Congrats_createAccountButton__CaPkb {
            border: 1px solid white;
        }

        .Congrats_actions__UTIPV button {
            color: black;
            background-color: white;
        }

        .Congrats_backToPuzzle__aYmfn button, .Difficulty_difficultyContainer__LbXDB,
        .Difficulty_difficultyPercent__qTzOL, .Difficulty_difficultyRate__9El7j,
        .MostPopular_header-title__bGfW4, .MostPopular_item-title__YFcDz {
            color: white;
        }
            
        .SponsorshipBottomBanner_bottomBanner__gDBu_ {
            box-shadow: 0 0 rgba(255, 255, 255, 0), 0 0 rgba(255, 255, 255, 0), 1px -3px 6px rgba(255, 255, 255, .15)
        }
    `;
    const style = document.createElement("style");
    style.id = "taconnectionsstyle";
    style.textContent = taConnectionsCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableTAConnectionsDarkMode() {
    const styleElement = document.getElementById("taconnectionsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the athletic connections dm switch, adds/removes the stylesheet
function syncTAConnectionsDarkMode() {
    chrome.storage.sync.get(["taConnectionsDarkModeEnabled", "miscMasterEnabled"], function(data) {
        const shouldBeEnabled = data.miscMasterEnabled !== false && Boolean(data.taConnectionsDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("taconnectionsstyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableTAConnectionsDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableTAConnectionsDarkMode();
        }
    });
}

// Catches the popup flipping the athletic connections toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableTAConnectionsDarkMode" || message.action === "syncDarkModeState") {
        syncTAConnectionsDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("taConnectionsDarkModeEnabled" in changes || "miscMasterEnabled" in changes)) {
        syncTAConnectionsDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncTAConnectionsDarkMode();