// Provides dark mode functionality for Connections

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableConnectionsDarkMode() {
    const svgURL_Regiwall = chrome.runtime.getURL("svgs/connections-stats-regiwall.svg");
    const connectionsCSS = `
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

        .ToolbarAdapter-module_toolbarContainer__Ni4KN, .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover:not(:disabled),
        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover:not(:disabled) {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_toolbarColorsDesktop__ptWzT:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover:not(:disabled), 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover:not(:disabled) {
            background-color: #777777;
        }

        /* Stats + How to Play Popup */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .modal-stats-body {
            background-color: #0f0f0f;
            color: white;
        }

        .Stats-module_stats__Oq7rS {
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

        .xwd__modal--close .pz-icon, .Stats-module_inline_carrot__icon__G2cbk {
            filter: invert(1);
        }

        .Stats-module_histogram_bar___Mxj8 {
            background-color: #444444;
        }

        .modal-rules-body.conn__modal--help {
            background: #0f0f0f;
            color: white;
        }

        .HowToPlay-module_helpArrow__WMXx9 {
            filter: invert(1);
        }

        .Stats-module_regiwall_stats_badges__yjE6J {
            background: url("${svgURL_Regiwall}") center no-repeat;
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }

        button.button-dark-mode-support:hover:enabled {
            background: #e4e4e4;
        }

        /* Badges Page */

        .pz-moment__badgeDetail, .BadgeDetail-module_container__RKO_D {
            background-color: #0f0f0f;
            color: white;
        }

        .pz-desktop .Congrats-module_wrapper__vzL87 {
            background-color: #0f0f0f !important;
        }

        .BadgeDetail-module_background__Y5IWc path {
			fill: #2c132f !important;
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

        /* Game Page */

        .pz-game-field {
            background-color: #0f0f0f;
            color: white;
        }

        .Board-module_form__B5pmo {
            color: white;
        }

        .Mistakes-module_mistakesContent__nlijY {
            color: white;
        }

        .Mistakes-module_mistakesContent__nlijY.Mistakes-module_indicatorDisabled___J578 {
            color: white;
        }

        .ActionButton-module_button__IlhXt {
            background-color: #0f0f0f;
            color: white;
            border-color: white;
        }

        .ActionButton-module_button__IlhXt:disabled {
            background-color: #0f0f0f;
            color: white;
            border-color: white;
            opacity: .5;
        }

        .ActionButton-module_button__IlhXt.ActionButton-module_filled__zUShw {
            background-color: white;
            color: black;
        }

        .ActionButton-module_button__IlhXt.ActionButton-module_filled__zUShw, 
        .ActionButton-module_button__IlhXt.ActionButton-module_filled__zUShw:disabled {
            border: 1px solid white;
        }

        .Toast-module_toast__YAoDa {
            background-color: white;
            color: black;
        }

        /* Track your Stats Not Logged In Popup */

        .pz-moment:has(.LoginPrompt-module_lireContainer__Iqekx) {
            background-color: #0f0f0f !important;
        }

        .pz-moment:has(.pz-moment__container) {
            background-color: rgb(179, 167, 254) !important;
        }

        .pz-icon-close {
            filter: invert(1);
        }

        .LoginPrompt-module_title__mWQeD, .LoginPrompt-module_subtitle__xO56q {
            color: white;
        }

        /* Congrats Page */

        .Congrats-module_modalContent__LWPwi, .css-adlkoi p, body .css-1gd2pxv {
            color: white;
        }

        body .css-1jvmgpk {
            border-bottom: 1px solid white;
        }

        .BadgeCarousel-module_badgeHeader__H_g5M h3, .BadgeCarouselItem-module_displayName__GrwKg {
            color: white;
        }

        .BadgeCarouselItem-module_badge__YWm7f {
            background-color: #0f0f0f;
            border: 1px solid white;
        }

        button.button-primary {
            background-color: white;
            color: black;
        }

        button.button-primary:hover:enabled {
            background-color: #e4e4e4;
        }

        button.button-transparent {
            color: white;
            border: 1px solid white;
        }

        button.button-transparent:hover:enabled {
            color: white;
        }

        .Stats-module_inline_right_caret__CGkGb {
            filter: invert(1);
        }

        .GamesCarouselStack-module_frictionMitigationContent__sfyQO 
        .GamesCarouselStack-module_carouselStackContainer__ogcQ6 hr {
            border-color: #777777;
            border-top: solid 2px white;
        }

        .GamesCarouselStack-module_frictionMitigationContent__sfyQO h4 {
            color: white;
        }

        .pz-moment__close_text .inner-text {
            color: white;
        }

        /* Bonus Puzzles */

        .Congrats-module_bonusStatsDisclaimerIcon__u08xL {
            filter: invert(1);
        }

        .BonusHubCTA-module_card__WI1lq {
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "connectionsstyle";
    style.textContent = connectionsCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableConnectionsDarkMode() {
    const styleElement = document.getElementById("connectionsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the connections dm switch, adds/removes the stylesheet, tells connectionsColors.js the result so display preset knows which palette to show
function syncConnectionsDarkMode() {
    chrome.storage.sync.get(["connectionsDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.connectionsDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("connectionsstyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableConnectionsDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableConnectionsDarkMode();
        }
        setConnectionsDarkModeActive(shouldBeEnabled);
    });
}

// Catches the popup flipping the connections toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableConnectionsDarkMode" || message.action === "syncDarkModeState") {
        syncConnectionsDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("connectionsDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncConnectionsDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncConnectionsDarkMode();