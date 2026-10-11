// Provides dark mode functionality for Strands

const strandsSourceObservers = {};
let strandsReplaceTimeout = null;
let strandsObserver = null;

// Points a how to play video at the dark copy, keeping and watching the element origin so the page cannot put the light one back
function replaceVideo(selector, newSource) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source) return;
    const newSrc = chrome.runtime.getURL(newSource);
    if (source.src === newSrc) {
        video.style.visibility = 'visible';
        return;
    }
    if (!source.dataset.originalSource) {
        source.dataset.originalSource = source.src || "";
    }
    source.src = newSrc;
    video.load();
    video.style.visibility = 'visible';

    if (strandsSourceObservers[selector]) strandsSourceObservers[selector].disconnect();
    strandsSourceObservers[selector] = new MutationObserver(() => {
        if (!source.isConnected) return;
        if (source.src !== newSrc) {
            source.src = newSrc;
        }
    });
    strandsSourceObservers[selector].observe(source, {attributes: true, attributeFilter: ["src"]});
}

// Puts a how to play video back to the source NYT has and stops watching it
function restoreVideo(selector) {
    if (strandsSourceObservers[selector]) {
        strandsSourceObservers[selector].disconnect();
        delete strandsSourceObservers[selector];
    }
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || !source.dataset.originalSource) return;
    source.src = source.dataset.originalSource;
    delete source.dataset.originalSource;
    video.load();
    video.style.visibility = '';
}

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
// then swaps the how to play videos and watches the page so they stay swapped
function enableStrandsDarkMode() {
    const svgURL_Regiwall = chrome.runtime.getURL("svgs/strands-stats-regiwall.svg");
    const strandsCSS = `
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

        .pz-row {
            background-color: #0f0f0f;
        }

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover:not(:disabled),
        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover:not(:disabled) {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

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

        /* Stats Popup */

        .xwd__modal--overlay {
            background: #00000060;
        }

        .strands__modal {
            background-color: #0f0f0f;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .Stats-module_wrapper__zUfh0 {
            color: white;
            background: #0f0f0f;
        }

        .Stats-module_stats__CB23r {
            border-top: 1px solid white;
        }

        .Stat-module_stats__row__xnktL {
            border-bottom: 1px solid white;
        }

        .TrophyItem-module_name__wbtJx {
            color: white;
        }

        .ProgressBar-module_progressBar__MOWb7 {
            background-color: black !important;
            border: 1px solid white !important;
        }

        .ProgressBar-module_progressBarFill__E7Rrg {
            border-color: black !important;
            background-color: white !important;
        }

        .Stats-module_inline_carrot__icon__YCGc0 {
            filter: invert(1);
        }

        .xwd__modal--close .pz-icon, .Stats-module_inline_carrot__icon__G2cbk {
            filter: invert(1);
        }

        .modal-stats-body .xwd__modal--content {
            color: white;
        }

        .RegiWall-module_regiwall_abstract_stats__L6lxo {
            background: url(${svgURL_Regiwall}) center no-repeat;
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }

        button.button-dark-mode-support:hover:enabled {
            background: #e4e4e4;
        }

        button.RegiWall-module_log_in_link__NlizD {
            color: white;
        }

        /* Badges Page */

        .pz-moment__badgeDetail, .BadgeDetail-module_container__RKO_D {
            background-color: #0f0f0f;
            color: white;
        }

        .BadgeDetail-module_background__Y5IWc path {
			fill: #005b6d !important;
		}

        .BadgeDetail-module_helpCenterIcon__ZsJPD {
            fill: white;
        }

        .BadgeDetailCTAs-module_buttonContainer__Td8eU button.pz-moment__button.secondary.default, 
        .BadgeDetailCTAs-module_buttonContainer__Td8eU a.pz-moment__button.secondary.default {
            color: white;
            border: 1px solid white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v {
            background-color: #0f0f0f;
            border: 1px solid white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v path {
            fill: white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v:disabled {
            border: 1px solid #777777;
        }

        .BadgeDetail-module_closeIcon__pPedP {
            fill: white;
        }

        .pz-moment__frame, .BadgeDetail-module_background__Y5IWc {
            background-color: #0f0f0f;
        }

        /* How to Play Popup */

        .darkPage1Gif, .darkPage3Gif {
            visibility: hidden;
        }

        .Help-module_title___5yTv, .carousel-module_wrapper__ZdPMF {
            background: #0f0f0f;
            color: white;
        }

        .carousel-module_buttonsWrapper__sEp8T button {
            border: 1px solid white;
            color: white;
        }

        .carousel-module_currentDot__hbt8i {
            background-color: white;
        }

        /* Game Page */

        .bubbles-module_hider__zoPog {
            background-color: #0f0f0f;
        }

        .pz-game-field {
            background: #0f0f0f;
            color: white;
        }

        .styles-module_strandsBtn__xobCT {
            color: white;
        }

        .hint-module_lightbulb__YfeFm {
            background: #0f0f0f;
            border: 3px solid #9f9f9f;
        }

        .hint-module_overlay___9ixH>div {
            border: 3px solid #0f0f0f;
            transform: none;
        }

        .hint-module_overlay___9ixH {
            border: 3px solid white;
        }

        .hint-module_bluebulb__QtJ5d {
            color: black !important;
            background: white;
            border: 2px solid white;
        }

        .styles-module_invalidshake__KMQkk {
            color: white !important;
        }

        .pz-game-wrapper {
            background-color: #0f0f0f !important;
        }

        /* Hint Popup */

        .strands-hint-modal {
            background: #0f0f0f;
            color: white;
            border: none;
        }

        .Hints-module_confirmButton__PyF6x {
            background-color: white;
            color: black;
        }

        /* Congrats Page */

        .pz-moment.Congrats-module_wrapper__QikSo {
            background-color: #0f0f0f !important;
        }

        .Congrats-module_fullscreenContent__hmx5w, .Congrats-module_shareDescriptor__XO5GF {
            color: white;
        }

        .Congrats-module_closeButton__e7oha {
            filter: invert(1);
        }

        .BadgeCarousel-module_badgeHeader__H_g5M h3, .BadgeCarouselItem-module_displayName__GrwKg {
            color: white;
        }

        .BadgeCarouselItem-module_badge__YWm7f {
            background-color: #0f0f0f;
            border: 1px solid white;
        }

        button.button-primary {
            background: white;
            color: black;
            border: 1px solid white;
        }

        button.button-primary:hover:enabled {
            background: #e4e4e4;
        }

        button.css-15cgz6j {
            background-color: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        button.css-27fpwl:hover {
            outline: #b4b4b4 solid 3px;
        }

        .Toast-module_toast__q1i0d {
            background-color: white;
            color: black;
        }

        /* Bonus Puzzles */

        .Congrats-module_bonusStatsDisclaimerIcon__oF2mJ {
            filter: invert(1);
        }

        .BonusHubCTA-module_card__WI1lq {
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "strandsstyle";
    style.textContent = strandsCSS;
    (document.head || document.documentElement).appendChild(style);

    applyDarkModeVideosIfEnabled();
    strandsObserver = new MutationObserver(() => {
        clearTimeout(strandsReplaceTimeout);
        strandsReplaceTimeout = setTimeout(() => applyDarkModeVideosIfEnabled(), 0);
    });
    strandsObserver.observe(document.documentElement, {childList: true, subtree: true});
}

// Only swaps the how to play videos while the stylesheet is actually on the page
function applyDarkModeVideosIfEnabled() {
    if (!document.getElementById("strandsstyle")) return;
    replaceVideo(".darkPage1Gif", "mp4s/FirstGIFH2P.mp4");
    replaceVideo(".darkPage3Gif", "mp4s/ThirdGIFH2P.mp4");
}


// Takes dark mode back off by removing the style element, leaving NYT as it is normally
// along with putting the how to play videos back and stopping the page from being watched
function disableStrandsDarkMode() {
    const styleElement = document.getElementById("strandsstyle");
    if (styleElement) {
        styleElement.remove();
    }

    clearTimeout(strandsReplaceTimeout);
    strandsReplaceTimeout = null;
    restoreVideo(".darkPage1Gif");
    restoreVideo(".darkPage3Gif");
    if (strandsObserver) {
        strandsObserver.disconnect();
        strandsObserver = null;
    }
}

// Reads the strands dm switch, adds/removes the stylesheet
function syncStrandsDarkMode() {
    chrome.storage.sync.get(["strandsDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.strandsDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("strandsstyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableStrandsDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableStrandsDarkMode();
        }
    });
}

// Catches the popup flipping the strands toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableStrandsDarkMode" || message.action === "syncDarkModeState") {
        syncStrandsDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("strandsDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncStrandsDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncStrandsDarkMode();