// Provides dark mode functionality for Letter Boxed

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableLetterBoxedDarkMode() {
    const letterBoxedCSS = `
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

        /* Ads + Loading Bar + Footer + Title */

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

        .pz-module {
            color: white; 
        }

        /* Game Toolbar */

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbarColors__d6naZ, .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
            color: white;
        }

        .Game-module_toolbarContainer__QaAst {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover:not(:disabled),
        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover:not(:disabled) {
            background-color: #777777;
        }

        [data-testid="icon-help"] path {
            fill: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg button, 
        .Dropdown-module_dropdown__menuItem__FJHMg a, 
        .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_toolbarColorsDesktop__ptWzT:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover:not(:disabled) {
            background-color: #777777;
        }

        [data-testid="icon-arrow"] path {
            fill: white;
        }

        /* Yesterday and Help Popups */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .lb__modal {
            background: #0f0f0f;
            color: white;
        }

        .modal-wordlist {
            color: white;
        }

        .modal-system-centered-content canvas {
            filter: invert(1) hue-rotate(175deg) brightness(3.7);
        }

        .pz-icon-close {
            filter: invert(1);
        }

        /* Congrats Popup */

        .xwd__modal--body.modal-congrats-body {
            background: #0f0f0f;
            color: white;
        }

        body .css-1e3260o {
            color: black;
            background-color: white;
            border: 1px solid white;
        }

        body .css-1e3260o:hover {
            color: black;
            background-color: #777777;
            border: 1px solid #777777;
        }
        
        .css-1k8l6v3 hr {
            border-top: 2px solid white;
        } 
    `;
    const style = document.createElement("style");
    style.id = "letterBoxedstyle";
    style.textContent = letterBoxedCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableLetterBoxedDarkMode() {
    const styleElement = document.getElementById("letterBoxedstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the letter boxed dm switch, adds/removes the stylesheet
function syncLetterBoxedDarkMode() {
    chrome.storage.sync.get(["letterBoxedDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.letterBoxedDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("letterBoxedstyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableLetterBoxedDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableLetterBoxedDarkMode();
        }
    });
}

// Catches the popup flipping the letter boxed toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableLetterBoxedDarkMode" || message.action === "syncDarkModeState") {
        syncLetterBoxedDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("letterBoxedDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncLetterBoxedDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncLetterBoxedDarkMode();