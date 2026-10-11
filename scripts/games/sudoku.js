// Provides dark mode functionality for Sudoku

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableSudokuDarkMode() {
    const svgURL_IconClose = chrome.runtime.getURL("svgs/icon-close-2.svg");
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const sudokuCSS = `
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
            color: white;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover:not(:disabled),
        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover:not(:disabled) {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .su-timer__value {
            color: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_toolbarColorsDesktop__ptWzT:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover:not(:disabled){
            background-color: #777777;
        }

        /* How to Play, Settings, Pause Popups */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .modal-rules-body.su-modal-help, .su-modal-help.modal-stats-body,
        .modal-settings-body.su-modal-settings, .modal-pause-body.su-modal-pause {
            background: #0f0f0f;
            color: white;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .xwd__modal--close .pz-icon, .kebab-icon {
            filter: invert(1);
        }

        .pz-modal__button.primary {
            background-color: white;
            color: black;
        }

        /* Game Page */

        .gameContainer {
            background-color: #0f0f0f;
        }

        .su-keyboard__mode.candidateMode, .su-keyboard__mode.normalMode {
            background-color: white;
            color: black;
        }

        .su-keyboard__mode {
            background-color: #0f0f0f;
            border: 1px solid #777777;
            color: #979797;
        }

        .su-keyboard__undo, .su-keyboard__delete, .su-keyboard__number {
            background-color: #434342;
        }

        .su-keyboard__undo:active, .su-keyboard__delete:active, .su-keyboard__number:active {
            background-color: #0f0f0f;
            color: #979797;
        }

        .su-keyboard__svg {
            fill: white;
        }

        .su-keyboard__delete {
            background-image: url("${svgURL_IconClose}");
        }

        .su-keyboard__undo {
            color: white;
        }

        .su-keyboard__auto [role="button"] {
            color: white;
        }

        /* Congrats Popup */

        .xwd__modal--body.modal-congrats-body {
            background: #0f0f0f;
            color: white;
        }

        .pz-modal__button.primary:hover {
            background-color: #e4e4e4;
        }

        .GamesCarouselStack-module_frictionMitigationContent__sfyQO 
        .GamesCarouselStack-module_carouselStackContainer__ogcQ6 hr {
            border-color: #777777;
            border-top: solid 2px white;
        }

        /* Error Page */

        .pz-error__message h1 {
            color: white;
        }

        .pz-error__button {
            color: black;
            background-color: white;
            border: 1px solid white;
        }

        .pz-error-img-1 {
            background-image: url("${svgURL_Error404Small}");
        }

        @media (min-width: 444px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404Small}");
            }   
        }

        @media (min-width: 768px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404Medium}");
            }
        }

        @media (min-width: 992px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404XL}");
            }
        }        
    `;    
    const style = document.createElement("style");
    style.id = "sudokustyle";
    style.textContent = sudokuCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableSudokuDarkMode() {
    const styleElement = document.getElementById("sudokustyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the sudoku dm switch, adds/removes the stylesheet, tells sudokuColors.js the result so display preset knows which palette to show
function syncSudokuDarkMode() {
    chrome.storage.sync.get(["sudokuDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.sudokuDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("sudokustyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableSudokuDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableSudokuDarkMode();
        }
        setSudokuDarkModeActive(shouldBeEnabled);
    });
}

// Catches the popup flipping the sudoku toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableSudokuDarkMode" || message.action === "syncDarkModeState") {
        syncSudokuDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("sudokuDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncSudokuDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncSudokuDarkMode();