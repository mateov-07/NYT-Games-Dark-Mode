// Provides dark mode functionality for the Connections Archive

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableConnectionsArchiveDarkMode() {
    const svgURL_DateArrow = chrome.runtime.getURL("svgs/date-picker-arrow.svg");
    const connectionsArchiveCSS = `
        /* Toolbar */

        html .pz-page {
            background-color: #0f0f0f;
        }

        .pz-nav {
            background: #0f0f0f;
        }

        .pz-nav__logo rect {
            fill: #0f0f0f;
        }

        .pz-nav__logo path {
            fill: white;
        }

        .pz-nav__hamburger-inner, .pz-nav__hamburger-inner::before, .pz-nav__hamburger-inner::after {
            background-color: white;
        }

        .pz-nav__hamburger:focus {
            background-color: #777777;
        }

        body .css-1igzjy9 {
            background-color: white;
        }

        body .css-1igzjy9 a {
            color: black;
        }

        body .css-1igzjy9:hover {
            background-color: #e4e4e4;
        }

        /* Main Sidebar */

        .pz-nav-drawer {
            background: #0f0f0f;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #1b1b1b;
        }

        .pz-icon-nyt, .pz-icon-athletic {
            filter: invert(1);
        }     
            
        .pz-icon-daily {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Crossword-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-midi {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Midi-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-mini {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Mini-Icon-Normalized-Color.svg");
        }

        .pz-icon-connections {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Connections-Icon-Dark-Mode.svg");
        }

        .pz-icon-spelling-bee {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/SpellingBee-Icon-Normalized-Color.svg");
        }

        .pz-icon-wordle {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/page-icons/wordle-icon-padded.svg");
        }

        .pz-icon-pips {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Pips-Icon-Normalized-Color.svg");
        }

        .pz-icon-strands {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Strands-Icon-Normalized-Color.svg")
        }

        .pz-icon-letter-boxed {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/LetterBoxed-Icon-Normalized-Color.svg");
        }

        .pz-icon-tiles {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Tiles-Icon-Normalized-Color.svg");
        }

        .pz-icon-sudoku {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Sudoku-Icon-Normalized-Color.svg");
        }

        .BonusHubHamburgerCTA-module_bonusHubCTAContainer__EieaJ {
            background-color: #424242;
        }

        .BonusHubHamburgerCTA-module_newLabel__SVmF2, .BonusHubHamburgerCTA-module_heading__Svs95 h2,
        .BonusHubHamburgerCTA-module_heading__Svs95 p {
            color: white;
        }

        .BonusHubHamburgerCTA-module_ctaButton__lBT18 {
            color: black;
            background-color: white;
        }

        .DirectLink-module_directLink__description__SPUgJ,
        .LinkGroup-module_linkGroup__header__e8tYm,
        body .ExpansionButton-module_ExpansionButton__lqTjh,
        .pz-nav-drawer__heading,
        .pz-nav-drawer__account .pz-nav-drawer__link {
            color: white;
        }

        .pz-icon-arrow-up, .pz-icon-arrow-down {
            filter: invert(1);
        }

        .CollapsibleLink-module_collapsibleLink__NvSrT:hover, 
        .CollapsibleLink-module_isexpanded__AGnRL, 
        .DirectLink-module_directLink__kSggP:hover {
            background-color: #363636;
        }

        .pz-nav-drawer__link:hover {
            background-color: #2f2f31;
        }

        .LinkGroup-module_linkGroup__jAkmD ul.LinkGroup-module_isGameLink__V32y3 
        .LinkGroup-module_link__wwRAz:not(:first-child)::before {
            border-top: 1px solid #363636;
        }

        .DirectLink-module_directLink__pill__lFxm9 {
            background-color: white;
            color: black;
        }

        .pz-nav-drawer__account {
            background-color: #0f0f0f;
            border-top: 1px solid white;
            margin-top: 0px;
        }

        .pz-nav-drawer__account-actions .pz-nav__button {
            background-color: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        .pz-nav__button:hover {
            background-color: #e4e4e4;
        }

        .pz-nav__button.white {
            background-color: black;
            color: white;
            border-color: white;
        }

        .pz-nav__button.white:hover {
            background-color: #777777;
            color: white;
        }

        .pz-nav__button.gray:hover {
            background-color: #e4e4e4;
        }

        /* Ads + Loading Bar + Footer */

        .pz-ad-box {
            background-color: #0f0f0f;
        }

        .pz-ad-box::before {
            color: white;
            border: 1px solid white;
        }        

        .xwd--loading-bar__fill {
            background-color: white;
        }

        .pz-footer {
            background-color: #0f0f0f;
            color: white;
        }

        .Footer-module_legalLink__saQgH a {
            color: white;
        }

        /* Calendar Page */

        .Header-module_archiveHeader__rjL9u {
            color: white;
            border-bottom: 1px solid white;
        }

        .ArchiveLayout-module_wrapper__agJhw {
            background-color: #0f0f0f;
            color: white;
        }

        .ArchiveCalendarGrid-module_daysOfWeekContainer__LjX8P {
            border-bottom: 1px solid white;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH {
            border: 1px solid white;
            background: #0f0f0f;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH:disabled {
            border: 1px solid #777777;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH path {
            fill: white;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH:disabled path {
            fill: #777777;
        }

        select.ArchiveDatePicker-module_dropDownSelect__BqLa6 {
            border: 1px solid white;
            color: white;
            background: url("${svgURL_DateArrow}") no-repeat #0f0f0f;
            background-position: calc(100% - .75rem) center
        }

        /* Not Logged In Popup */

        .xwd__modal--wrapper .ArchiveModalPaywall-module_modalOverlay__zCxO6 {
            background: linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0) 40%, #0f0f0f 55%);
        }

        .ArchiveModalPaywall-module_modalBody__QbLIt h3, 
        .ArchiveModalPaywall-module_modalBody__QbLIt p {
            color: white;
        }

        ._momentButton_e4jbe_2._primary_e4jbe_37 {
            background: white;
            color: black;
        }

        ._momentButton_e4jbe_2._secondary_e4jbe_42 {
            color: white;
            border: 1px solid white;
        }
    `;
    const style = document.createElement("style");
    style.id = "connectionsarchivestyle";
    style.textContent = connectionsArchiveCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableConnectionsArchiveDarkMode() {
    const styleElement = document.getElementById("connectionsarchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the connections archive dm switch, adds/removes the stylesheet
function syncConnectionsArchiveDarkMode() {
    chrome.storage.sync.get(["connectionsArchiveDarkModeEnabled", "archivesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.archivesMasterEnabled !== false && Boolean(data.connectionsArchiveDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("connectionsarchivestyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableConnectionsArchiveDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableConnectionsArchiveDarkMode();
        }
    });
}

// Catches the popup flipping the connections archive toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableConnectionsArchiveDarkMode" || message.action === "syncDarkModeState") {
        syncConnectionsArchiveDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("connectionsArchiveDarkModeEnabled" in changes || "archivesMasterEnabled" in changes)) {
        syncConnectionsArchiveDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncConnectionsArchiveDarkMode();