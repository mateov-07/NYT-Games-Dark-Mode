// Provides dark mode functionality for Spelling Bee

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableSpellingBeeDarkMode() {
    const svgURL_Genius = chrome.runtime.getURL("svgs/sb-stats-genius.svg");
    const svgURL_Regiwall = chrome.runtime.getURL("svgs/spellingbee-stats-regiwall.svg");
    const svgURL_Checkmark = chrome.runtime.getURL("svgs/check-standard.svg")
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const spellingBeeCSS = `
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

        /* Game Toolbar */

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
        }

        .pz-toolbar-button {
            color: white;
        }

        .pz-toolbar-button:hover {
            background-color: #777777;
        }

        .pz-toolbar-icon.external {
            filter: invert(1);
        }

        .pz-dropdown>.pz-dropdown__button:not(.pz-dropdown__show) {
            background-color: #0f0f0f !important;
            color: white;
        }

        .pz-desktop button.pz-dropdown__button:hover, .pz-desktop a.pz-dropdown__button:hover {
            color: white;
            background-color: #777777;
        }

        .pz-dropdown .pz-dropdown__show {
            background-color: #777777 !important;
            color: white;
        }

        .pz-dropdown__arrow {
            border-top: 5px solid white;
        }

        .pz-dropdown__arrow.reverse {
            border-bottom: 5px solid white;
        }

        .pz-dropdown__menu-item button, .pz-dropdown__menu-item a {
            background-color: #0f0f0f;
            color: white;
        }

        /* Badge Earned Alert */

        .BadgeCarouselItem-module_badge__YWm7f {
            border: 1px solid white;
            background-color: #0f0f0f;
            color: white;
        }

        .InGameBadges-module_badgeContainer__rHPik .InGameBadges-module_closeButton__qKBMj {
            border: 1px solid white;
            background-color: #0f0f0f;
        }

        .InGameBadges-module_badgeContainer__rHPik .InGameBadges-module_closeButton__qKBMj .pz-icon-close {
            filter: brightness(2);
        }

        /* Stats Popup */

        .sb-modal-frame {
            background: #0f0f0f;
            color: white;
            box-shadow: 0 0 10px 0 rgba(255, 255, 255, .12);
        }

        @media (min-width: 768px) {
            .sb-modal-frame {
                box-shadow: 0 0 23px 0 rgba(255, 255, 255, .08);
            }
        }

        .sb-modal-frame.stats .sb-modal-header {
            background-color: #0f0f0f;
        }

        .sb-modal-content {
            scrollbar-color: white #0f0f0f;
        }

        .sb-modal-scrim {
            background-color: #00000060;
        }

        .sb-lifetime-stats {
            border-top: 1px solid white;
        }

        .Stat-module_stats__row__xnktL {
            border-bottom: 1px solid white;
        }

        .Stat-module_genius__HKzOf {
            background-image: url("${svgURL_Genius}");
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

        .pz-toggle {
            border: 1px solid #777777;
        }

        .pz-toggle__option:first-child {
            border-right: 1px solid #777777;
        }

        .pz-toggle__option.selected {
            background-color: #0f0f0f;
            color: white;
        }

        .pz-toggle__option {
            background-color: #222222;
            color: #959595;
        }

        button.sb-stats-bar {
            background-color: #0f0f0f;
            color: white;
        }

        .sb-stats-percentage-bar.pale-yellow {
            background-color: #f7da21;
        }

        .sb-stats-bar__text.sb-game-in-progress {
            color: white;
        }

        .sb-stats-bar__arrow {
            filter: invert(1);
        }

        .sb-stats-bar__current {
            background-color: #f7da21;
        }

        .sb-game-complete {
            color: black;
        }

        .sb-game-complete .sb-stats-bar__arrow {
            filter: invert(0);
        }

        .bottom-border--active.list-item--today, .bottom-border--active.list-item--yesterday,
        .bottom-border--active.list-item--current.list-item--in-progress {
            border-bottom: 1px solid #979797;
        }

        .sb-modal-content::after {
            background: linear-gradient(180deg, #0f0f0f00 0%, 
                        color-mix(in srgb, #0f0f0f, #0f0f0f00 20%) 56.65%, #0f0f0f 100%);
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }

        button.button-dark-mode-support:hover:enabled {
            background: #e4e4e4;
        }

        .StatsRegiWallBadges-module_regiwall_stats_badges__kDmYK {
            background: url("${svgURL_Regiwall}") center no-repeat;
        }

        /* Badges Page */

        .pz-moment__badgeDetail, .BadgeDetail-module_container__RKO_D {
            background-color: #0f0f0f;
            color: white;
        }

        .BadgeDetail-module_background__Y5IWc path {
			fill: #a8872cff !important;
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

        /* Yesterday's Answers + Rankings Popups */

        .sb-modal-content .sb-modal-body .sb-modal-buttons-container button.button-primary {
            background-color: white;
            color: black;
        }

        .sb-modal-content .sb-modal-body .sb-modal-buttons-container button.button-secondary {
            color: white;
            border: 1px solid white;
        }

        .sb-modal-ranks__list tr {
            color: white;
        }

        ._moment_1d9lu_8, ._momentExit_1d9lu_23._momentExitActive_1d9lu_27 {
            background-color: #0f0f0f !important;
        }

        /* Game Page */

        .pz-game-field {
            background: #0f0f0f;
            color: white;
        }

        .hive-cell .cell-fill {
            fill: white;
            stroke: #0f0f0f;
        }

        .hive-action {
            color: white;
        }

        .hive-action__shuffle {
            border: 1px solid black;
            filter: invert(1);
        }

        .hive-action.push-active, .hive-action.action-active {
            background-color: #777777;
        }

        .error-message .sb-message {
            background: white;
            color: black;
        }

        .sb-hive-play-past-puzzles button.button-secondary {
            background: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        .sb-hive-play-past-puzzles button.button-secondary:hover:enabled {
            background: #333333;
            color: white;
        }

        .conversion-banner {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }

        .conversion-banner__gift-logo, .conversion-banner__icon {
            filter: invert(1);
        }

        .sb-toggle-expand {
            background: #0f0f0f;
            box-shadow: 0px 0px 20px 5px #0f0f0f
        }

        .sb-toggle-icon {
            filter: invert(1);
        }

        /* Subscribe Page */

        ._moment_1d9lu_8.undefined {
            background: #0f0f0f !important;
        }

        body .css-1955y77 {
            background-color: #0f0f0f;
        }

        body .css-1vb76m5::before {
            background: linear-gradient(0deg, transparent 0%, rgb(15, 15, 15) 100%)
        }

        body .css-1vb76m5::after {
            background: linear-gradient(transparent 0%, rgb(15, 15, 15) 100%)
        }

        body .css-adz32p, .css-1pncw7 {
            color: white;
        }

        body .css-1agjjmj .css-1pncw7 {
            color: black;
        }

        [data-testid="onsite-messaging-unit-gamesPaywallSpellingBee"] .css-1pncw7 {
            color: white;
        }

        body .css-qh6j7n, .css-jiplj9, .css-1qdiitl {
            color: white;
        }

        body .css-ggah8x {
            background: white;
            color: black;
        }

        body .css-d88202 {
            color: white;
            border: 1px solid white;
        }

        /* Congrats Page */

        ._moment_1d9lu_8:not(._hide_1d9lu_50) .pz-moment {
            background-color: #0f0f0f !important;
            color: white;
        }

        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(button.pz-moment__button.primary.default) .pz-moment {
            background-color: #f7da21 !important;
            color: black;
        }

        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(.pz-moment__button--padlock) .pz-moment {
            background-color: #f7da21 !important;
            color: black;
        }

        .Stat-module_stats__row__xnktL.Stat-module_topBorder___ilW5 {
            border-top: 1px solid white;
            color: white;
        }

        .pz-moment__congrats .pz-moment__content .pz-moment__button.primary {
            background: white;
            color: black;
        }

        ._moment_1d9lu_8:not(._hide_1d9lu_50):not(:has(button.pz-moment__button.primary.default)):not(:has(.pz-moment__button--padlock)) .pz-moment__description.karnak,
        ._moment_1d9lu_8:not(._hide_1d9lu_50):not(:has(button.pz-moment__button.primary.default)):not(:has(.pz-moment__button--padlock)) .pz-moment__title.large {
            color: white;
        }

        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(button.pz-moment__button.primary.default) .pz-moment__description.karnak,
        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(button.pz-moment__button.primary.default) .pz-moment__title.large,
        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(.pz-moment__button--padlock) .pz-moment__description.karnak,
        ._moment_1d9lu_8:not(._hide_1d9lu_50):has(.pz-moment__button--padlock) .pz-moment__title.large {
            color: black;
        }

        .pz-moment__button-wrapper.vertical .pz-moment__button.secondary {
            color: white;
            border: 1px solid white;
            background: transparent;
        }

        .BadgeCarousel-module_badgeHeader__H_g5M h3, .GamesCarouselStack-module_frictionMitigationContent__sfyQO h4 {
            color: white;
        }

        .GamesCarouselStack-module_frictionMitigationContent__sfyQO .GamesCarouselStack-module_carouselStackContainer__ogcQ6 hr {
            border-top: 2px solid white;
        }

        .pz-moment__close_text {
            filter: invert(1);
        }

        .sb-share__share-item a, .sb-share__share-link {
            color: white;
        }

        .sb-share__share-link-button.sb-share__copied-link {
            background-image: url("${svgURL_Checkmark}");
        }

        .sb-share__tout-image {
            filter: invert(0.94) hue-rotate(183deg);
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
    style.id = "spellingbeestyle";
    style.textContent = spellingBeeCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableSpellingBeeDarkMode() {
    const styleElement = document.getElementById("spellingbeestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the spelling bee dm switch, adds/removes the stylesheet
function syncSpellingBeeDarkMode() {
    chrome.storage.sync.get(["spellingBeeDarkModeEnabled", "gamesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.gamesMasterEnabled !== false && Boolean(data.spellingBeeDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("spellingbeestyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableSpellingBeeDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableSpellingBeeDarkMode();
        }
    });
}

// Catches the popup flipping the spelling bee toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableSpellingBeeDarkMode" || message.action === "syncDarkModeState") {
        syncSpellingBeeDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("spellingBeeDarkModeEnabled" in changes || "gamesMasterEnabled" in changes)) {
        syncSpellingBeeDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncSpellingBeeDarkMode();