// Provides dark mode functionality for the Mini Crossword

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableMiniDarkMode() {
    const svgURL_Settings = chrome.runtime.getURL("svgs/settings-black.svg");
    const svgURL_Help = chrome.runtime.getURL("svgs/help.svg");
    const svgURL_Pencil = chrome.runtime.getURL("svgs/pencil-black.svg");
    const svgURL_PencilActive = chrome.runtime.getURL("svgs/pencil-active.svg");
    const svgURL_Assistance = chrome.runtime.getURL("svgs/assistance-black.svg");
    const svgURL_Checkmark = chrome.runtime.getURL("svgs/check-standard.svg");
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const miniCSS = `
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

        /* Misc Stuff */

        .pz-desktop .xwd__loading {
            background-color: #0f0f0f;
        }

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .pz-game-field {
            background: #0f0f0f;
        }

        .xwd__modal--body {
            background-color: #0f0f0f;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
            color: white;
        }

        .pz-moment__button.primary.default {
            background: white;
            color: black;
        }

        /* Puzzle Note */

        .xwd__notes--content-container {
            background-color: #222222;
            border: 1px solid #333333;
        }

        /* Game Toolbar */

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }

        .xwd__toolbar--wrapper {
            background-color: #0f0f0f;
        }

        .xwd__tool--button button {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__tool--button :hover {
            background-color: #777777;
        }

        .xwd__tool--texty :hover {
            color: white;
        }

        .xwd__toolbar_icon--settings-gear {
            background-image: url("${svgURL_Settings}");
        }

        .xwd__timer--button i {
            filter: invert(1);
        }

        .xwd__toolbar_icon--support {
            background-image: url("${svgURL_Help}");
        }

        .xwd__toolbar_icon--pencil {
            background-image: url("${svgURL_Pencil}");
        }

        .xwd__toolbar_icon--pencil-active {
            background-image: url("${svgURL_PencilActive}");
        }

        .xwd__toolbar_icon--cheat-menu {
            background-image: url("${svgURL_Assistance}");
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink, .xwd__support-menu .xwd__menu--item a,
        .xwd__support-menu .xwd__menu--item {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink:hover, .xwd__support-menu .xwd__menu--item a:hover,
        .xwd__support-menu .xwd__menu--item:hover {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        /* Settings + Reveal Puzzle Popups */

        .secondary:disabled {
            color: white;
            border: 1px solid white;
            opacity: 0.5;
        }

        .pz-moment__button.secondary, .pz-moment__button.secondary:active {
            color: white;
            border: 1px solid white;
        }

        .xwd__modal--close .pz-icon {
            filter: invert(1);
        }

        /* Game Page */

        :root {
            --bg-moment: #0f0f0f;
        }

        .xwd__clue-list--title {
            color: white;
            border-bottom: 1px solid white;
        }

        .xwd__clue-list--list {
            scrollbar-color: black white;
        }

        .xwd__clue-bar-desktop--bar.obscured, .xwd__clue-list--obscured li span:last-child {
            background-color: #777777;
            color: #777777;
        }

        .xwd__clue--li {
            color: white
        }

        .xwd__clue--filled span {
            color: #959595;
        }

        /* Congrats Page */

        .pz-moment.xwd__congrats-moment.CongratsMoment-module_wrapper__GMYHg {
            background-color: #0f0f0f !important;
        }

        .mini__congrats-modal--content {
            color: white
        }

        body .css-1k8l6v3 hr {
            border-top: 2px solid white;
        }

        .midi-cta {
            border: 1px solid white;
        }

        .midi-cta .midi-icon {
            filter: invert(1);
        }

        .xwd__modal--close:hover {
            color: #777777;
        }

        .xwd__share-modal_shareLink {
            color: white;
        }

        .xwd__share-modal_shareItem button i,
        .xwd__share-modal_shareItem a i {
            filter: invert(1);
        }

        .xwd__share-modal_shareItem button:hover i,
        .xwd__share-modal_shareItem a:hover i {
            background-color: #aaaaaa;
        }
            
        .xwd__share-modal_shareIcon {
            background-color: #f0f0f0;
            border: 1px solid #aaaaaa;
        }

        .xwd__share-modal_shareLinkButton.xwd__share-modal_copiedLink {
            background-image: url("${svgURL_Checkmark}");
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

        /* Bonus Puzzles */

        .xwd__printtools--button {
            background-color: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        .xwd__printtools--button:hover:not(:disabled) {
            background-color: #777777;
            color: white;
        }

        .pz-icon-print-black {
            filter: invert(1);
        }

        .xwd__print-modal--printModalContent .xwd__print-modal--cellDarkness 
        .xwd__print-modal--opacityIcon .xwd__print-modal--userOpacity {
            border: 1px solid white;
        }

        .xwd__congrats-modal--content, .mini__congrats-modal--content {
            color: white;
        }

        p.xwd__congrats--bonus-stats-disclaimer .xwd__congrats--bonus-stats-disclaimer-icon {
            filter: invert(1);
        }

        .BonusHubCTA-module_card__WI1lq {
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "ministyle";
    style.textContent = miniCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableMiniDarkMode() {
    const styleElement = document.getElementById("ministyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the mini crossword dm switch, adds/removes the stylesheet, tells crosswordColors.js the result so display preset knows which palette to show
function syncMiniDarkMode() {
    chrome.storage.sync.get(["miniDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.miniDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("ministyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableMiniDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableMiniDarkMode();
        }
        setCrosswordDarkModeActive(shouldBeEnabled);
    });
}

// Catches the popup flipping the mini crossword toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableMiniDarkMode" || message.action === "syncDarkModeState") {
        syncMiniDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("miniDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncMiniDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncMiniDarkMode();