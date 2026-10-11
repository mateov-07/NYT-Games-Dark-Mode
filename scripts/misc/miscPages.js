// Provides dark mode functionality for any other games page not covered

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableMiscPagesDarkMode() {
    const miscPagesCSS = `
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
            border: 1px solid white;
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

        /* ----------------- */
        /* PAGE 1: CROSSPLAY */
        /* ----------------- */

        @media only screen and (max-width: 1024px) and (orientation: portrait) {
            [data-app-variant=crossplay] .column-left, [data-app-variant=locked] .column-left {
                color: white;
            }
        }

        .column {
            color: white;
        }

        /* ----------------- */
        /* PAGE 2: BONUS HUB */
        /* ----------------- */

        .App-module_container__vQnEW {
            border-bottom: 1px solid white;
        }

        .App-module_header__nKliJ {
            color: white;
        }

        .DatePickerArrows-module_dropDate__E_9VM {
            border: 1px solid white;
            color: white;
        }

        .DatePickerArrows-module_arrowButtons__MlYRB {
            border: 1px solid white;
            background: #0f0f0f;
        }

        .DatePickerArrows-module_arrowButtons__MlYRB path {
            fill: white;
        }

        .DatePickerArrows-module_arrowButtons__MlYRB:disabled {
            opacity: 0.5;
        }

        .FeedbackLink-module_message__aScBi {
            color: white;
        }

        .FeedbackLink-module_button__dTxgA a {
            border: 1px solid white;
            color: white;
        }
    `;  
    const style = document.createElement("style");
    style.id = "miscpagesstyle";
    style.textContent = miscPagesCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableMiscPagesDarkMode() {
    const styleElement = document.getElementById("miscpagesstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the misc pages dm switch, adds/removes the stylesheet
function syncMiscPagesDarkMode() {
    chrome.storage.sync.get(["miscPagesDarkModeEnabled", "miscMasterEnabled"], function(data) {
        const shouldBeEnabled = data.miscMasterEnabled !== false && Boolean(data.miscPagesDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("miscpagesstyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableMiscPagesDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableMiscPagesDarkMode();
        }
    });
}

// Catches the popup flipping the misc pages toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableMiscPagesDarkMode" || message.action === "syncDarkModeState") {
        syncMiscPagesDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("miscPagesDarkModeEnabled" in changes || "miscMasterEnabled" in changes)) {
        syncMiscPagesDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncMiscPagesDarkMode();