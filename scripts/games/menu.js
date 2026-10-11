// Provides dark mode functionality for the Games Menu

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableMenuDarkMode() {
    const menuCSS = `
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

        /* Featured Cards */

        .hub-welcome-loading {
            background-color: #0f0f0f;
        }

        .featured.standard, .featured.primary, .hub-stats-card__puzzle-info, .hub-promo-card {
            background: #0f0f0f;
        }

        .hub-promo-card:hover {
            background: #0f0f0f;
        }

        .PillGrey-module_pill__fJN18 {
            background-color: white;
            color: black !important;
        }

        .progressIconContent.puzzleProgress0, .progressIconContent.midiProgress0, .progressIconContent.miniProgress0,
        .puzzleProgressUnavailable, .midiProgressUnavailable, .miniProgressUnavailable {
            filter: invert(1);
        }

        @media (min-width: 992px) {
            .featured.standard:hover, .featured.primary:hover, .hub-stats-card__puzzle-info:hover, .hub-promo-card:hover {
                background-color: #181818;
            }
        }

        .hub-welcome-sections h3.title, .hub-welcome-sections div.date, div.hub-stats-card__title,
        .hub-stats-card__streak-title, .hub-stats-card__streak-info:first-child, 
        .hub-stats-card__streak-info, div.hub-stats-card__more-stats, .featured .title, h3.hub-promo-card__title {
            color: white;
        }

        .hub-stats-card__streak-block {
            border-top: none;
        }

        .upsell .copy {
            color: #777777;
        }

        .hub-stats-card__time, .hub-stats-card__day-of-week {
            color: white;
        }

        /* Game Cards */

        .section__header {
            color: white;
        }

        .hub-game-card {
            background: #0f0f0f;
            border: solid 1px #777777;
        }

        .hub-game-card__button {
            color: white;
            border: 1px solid #777777;
        }

        .hub-game-card.hub-dual-link:hover .hub-game-card__button {
            background: #0f0f0f;
        }

        .hub-game-card.hub-dual-link .hub-game-card__button:hover {
            background: #333333;
        }

        .hub-game-card:hover .hub-game-card__button {
            background: #333333;
        }

        .hub-game-card:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        /* Recent Crosswords + Print Popup */

        .tab__tabGroup .tab__tab>.active {
            background-color: #0f0f0f;
            color: white;
            border-color: #777777;
        }

        .tab__tabGroup .tab__tab {
            background-color: #222222;
        }

        .tab__tabGroup .tab__tab:hover {
            color: white;
        }

        .tab__tabGroup .tab__tabNav {
            border: 1px solid #777777;
            background-color: #0f0f0f;
        }

        .progress__sectionHeader, .oneLiner, .thumb .date, .progress__playMoreLink {
            color: white;
        }

        .section__section .progressIconContent {
            border-radius: 8px;
        }

        .progress__playMoreLink:hover {
            background: #777777
        }

        .thumb .printTool {
            background-color: #0f0f0f;
        }

        @media (min-width: 992px) {
            .print:hover {
                filter: invert(1);
            }
        }

        .pzm-modals-wrapper {
            background: rgba(0, 0, 0, .85);
        }

        .pzm-modal {
            background: #0f0f0f;
            border: 1px solid white;
            box-shadow: 0 4px 23px 0 rgba(255, 255, 255, .1);
            color: white;
        }

        .pzm-modal-ex {
            color: white;
        }

        .hub-print-modal-content .hub-print-modal-cell-darkness 
        .hub-print-modal-opacity-icon .hub-print-modal-user-opacity {
            border: 1px solid white;
        }

        .pz-modal__button.dark {
            background-color: white;
            color: black;
        }

        .pz-modal__button.dark:hover {
            background-color: #e4e4e4;
        }

        /* Monthly Bonus + Featured Article */

        .section__container .puzzleInfo .puzzleInfoContent {
            color: white;
        }

        .island {
            background-color: #0f0f0f;
            border: 1px solid #777777
        }

        .island:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        .island:hover .printTool {
            background-color: #0f0f0f;
            border-top: 1px solid #777777;
        }

        .hub-section-header {
            color: white;
        }

        .hub-guide-promo-card {
            border: solid 1px #777777;
        }

        .hub-guide-promo-card-content {
            background: #0f0f0f;
        }

        .hub-guide-promo-card-content h2 {
            color: white;
        }

        .hub-guide-promo-card:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        .hub-puzzle-group__more-link a {
            color: white;
            background: #222222;
        }

        .hub-puzzle-group__more-link a:hover {
            background: #555555;
        }

        /* Color Changes when Certain Width */

        @media (max-width: 991.98px) {
            .hub-welcome-midi {
                background-color: #1f1f1f;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant.hub-welcome {
                background-color: #0f0f0f;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .featured {
                border: solid 1px #777777;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-welcome__title {
                color: white;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-wordplay-link {
                color: white;
                background-color: #0f0f0f;
                border: 1px solid #777777;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-wordplay-link:hover {
                background-color: #333333;
            }
        }

        .alternate-card-phone.moar-games-variant {
            background-color: #0f0f0f;
        }

        .alternate-card-phone .date {
            color: white;
        }

        @media (max-width: 767.98px) {
            #hub-root {
                background-color: #0f0f0f;
            }
        }

        .accordion__drawerContent {
            background-color: #0f0f0f;
        }

        .accordion__drawerTitle {
            background-color: #222222;
            color: white;
        }

        .accordion__drawerTitle:hover {
            background: #777777;
        }

        .hub-mobile-stats__container {
            background: #0f0f0f;
            color: white;
        }

        .hub-mobile-stats__no-stats {
            background-color: #333333;
        }

        .hub-mobile-stats__stats-more {
            color: white;
            background-color: #333333;
        }

        .hub-mobile-stats__time {
            color: white;
        }

        .hub-mobile-stats__bars-block .grey {
            background-color: #777777;
        }

        .hub-mobile-stats__bars-block .grey:nth-child(1), .hub-mobile-stats__bars-block .grey:nth-child(2) {
            border-right: 2px solid #0f0f0f;
        }
    `;  
    const style = document.createElement("style");
    style.id = "menustyle";
    style.textContent = menuCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableMenuDarkMode() {
    const styleElement = document.getElementById("menustyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the games menu dm switch, adds/removes the stylesheet
function syncMenuDarkMode() {
    chrome.storage.sync.get(["menuDarkModeEnabled", "miscMasterEnabled"], function(data) {
        const shouldBeEnabled = data.miscMasterEnabled !== false && Boolean(data.menuDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("menustyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableMenuDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableMenuDarkMode();
        }
    });
}

// Catches the popup flipping the games menu toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableMenuDarkMode" || message.action === "syncDarkModeState") {
        syncMenuDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("menuDarkModeEnabled" in changes || "miscMasterEnabled" in changes)) {
        syncMenuDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncMenuDarkMode();