// Provides dark mode functionality for Custom Wordle

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableCustomWordleDarkMode() {
    const imgURL_Hint1 = chrome.runtime.getURL("imgs/cywp-hint-1.png");
    const imgURL_Hint2 = chrome.runtime.getURL("imgs/cywp-hint-2.png");
    const customWordleCSS = `
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

        /* Starting Page */

        .Welcome-module_welcomeWrapper__Gv8Mi {
            background-image: linear-gradient(to right, #333 1.5px, transparent 2.5px),
                              linear-gradient(to bottom, #333 1.5px, transparent 2.5px);
            background-color: #0f0f0f;
            color: white;
        }

        .Welcome-module_buttonContainer__pK1JE button, .Welcome-module_buttonContainer__pK1JE a {
            background: white;
            color: black;
        }

        .Welcome-module_buttonContainer__pK1JE button.Welcome-module_secondary__AYpws, 
        .Welcome-module_buttonContainer__pK1JE a.Welcome-module_secondary__AYpws {
            background: black;
            color: white;
            border: 1px solid white;
        }

        /* Create Wordle Toolbar */

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ path {
            fill: white;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover, 
        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777;
        }

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        /* Help Popup */

        .modal-rules-body.cywp__modal--help {
            background: #0f0f0f;
            color: white;
        }

        [aria-label="An example of a text input with the display name entered, such as Sherlock"] img {
            content: url("${imgURL_Hint1}");
        }

        [aria-label*="An example of a text input with a custom hint entered"] img {
            content: url("${imgURL_Hint2}");
        }

        .xwd__modal--close .pz-icon {
            filter: invert(1);
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
            scrollbar-color: white #0f0f0f;
            background-color: #0f0f0f;
            color: white;
        }

        /* Create Wordle Page */

        .CreationForm-module_formWrapper__xYext, .CreationForm-module_legalDisclaimer__yFK6d {
            color: white;
        }

        .FormInput-module_inputField__inIfE {
            border: 1px solid white;
            color: white;
            background-color: #0f0f0f;
        }

        .CreationForm-module_submitButton__jezRS:disabled {
            background: #777777;
            color: #ffffff50;
        }

        /* Wordle Created Page */ 
        
        .create-wordle-end-body {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__modal--close:hover {
            color: #c9c9c9;
        }

        .End-module_endTile__GG9e1 {
            border: 1.5px solid #6aaa64;
        }

        .End-module_shareButton__HNoMA {
            background: white;
            color: black;
        }

        .End-module_puzzleLink__k_CND {
            background: black;
            color: white;
            border: 1px solid white;        
        }

        .End-module_feedbackLink__MlJcR {
            border-bottom: 1px solid white;
        }

        .Toast-module_toast__iiVsN {
            background-color: white;
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "customwordlestyle";
    style.textContent = customWordleCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableCustomWordleDarkMode() {
    const styleElement = document.getElementById("customwordlestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the custom wordle dm switch, adds/removes the stylesheet
function syncCustomWordleDarkMode() {
    chrome.storage.sync.get(["customWordleDarkModeEnabled", "miscMasterEnabled"], function(data) {
        const shouldBeEnabled = data.miscMasterEnabled !== false && Boolean(data.customWordleDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("customwordlestyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableCustomWordleDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableCustomWordleDarkMode();
        }
    });
}

// Catches the popup flipping the custom wordle toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableCustomWordleDarkMode" || message.action === "syncDarkModeState") {
        syncCustomWordleDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("customWordleDarkModeEnabled" in changes || "miscMasterEnabled" in changes)) {
        syncCustomWordleDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncCustomWordleDarkMode();