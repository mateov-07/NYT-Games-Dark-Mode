// Provides dark mode functionality for the Crosswords Archive

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableCrosswordsArchiveDarkMode() {
    const svgURL_Arrow = chrome.runtime.getURL("svgs/arrow.svg");
    const crosswordsArchiveCSS = `
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

        /* Calendar Toolbar */

        .archive_date-selector-container {
            background-color: #0f0f0f;
        }

        .tab__tabGroup .tab__tab>.active {
            border: 1px solid #777777;
            color: white;
            background-color: #0f0f0f;
            border-bottom: none;
        }

        .tab__tabGroup .tab__tab {
            color: #777777;
            background: #222222;
        }

        .tab__tabGroup .tab__tab:hover {
            color: white;
        }

        .tab__tabGroup .tab__tabNav {
            background-color: #0f0f0f;
            border: 1px solid #777777;
        }

        /* Calendar Buttons + Text */

        .archive_viewer button {
            background-color: #0f0f0f;
            border: 1px solid white;
            color: white;
        }

        .archive_viewer button.archive_next:hover, 
        .archive_viewer button.archive_prev:hover, 
        .archive_viewer button.archive_today:hover,
        .archive_viewer button.archive_next:disabled:hover,
        .archive_viewer button.archive_today:disabled:hover {
            background-color: #777777;
        }

        .archive_viewer button.archive_next {
            background-image: url("${svgURL_Arrow}");
        }

        .archive_viewer button.archive_prev {
            background-image: url("${svgURL_Arrow}");
            transform: scale(-1, 1);
        }

        .archive_date-selector-container select {
            background-color: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        .archive_calendar-header, .calendar.puzzleInfo .date {
            color: white;
        }

        /* Calendar Icons */

        .progressIconContent.puzzleProgress0, .progressIconContent.midiProgress0, .progressIconContent.miniProgress0,
        .puzzleProgressUnavailable, .midiProgressUnavailable, .miniProgressUnavailable {
            filter: invert(1);
        }

        .print {
            filter: brightness(1.5);
        }

        @media (min-width: 992px) {
            .print:hover {
                filter: invert(1);
            }
        }

        .cardRibbon.brandNew {
            filter: invert(1);
        }

        .calendar.puzzleInfo .printTool {
            background-color: #0f0f0f;
        }

        /* List View */

        .archive_mobile-list-item, .archive_list-item, .archive_list-item .archive_title>a,
        .archive_list-columns {
            color: white;
        }

        /* Print Popup */

        .pzm-modals-wrapper {
            background: rgba(0, 0, 0, .85);
        }

        .pzm-modal {
            background: #0f0f0f;
            border: 1px solid #0f0f0f;
            box-shadow: 0 4px 23px 0 rgba(255, 255, 255, .08);
            color: white;
        }

        .hub-print-modal-content .hub-print-modal-cell-darkness 
        .hub-print-modal-opacity-icon .hub-print-modal-user-opacity {
            border: 1px solid white;
        }

        .pzm-modal-ex {
            color: white;
        }

        .pz-modal__button.dark {
            background-color: white;
            color: black;
            border: 1px solid white;
        }

        .pz-modal__button.dark:hover {
            background-color: #e4e4e4;
        }

        /* Bonus Page */

        .island {
            background-color: #0f0f0f;
            border: 1px solid #777777;
        }

        .island:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        .island:hover .printTool {
            background-color: #0f0f0f;
            border-top: 1px solid #777777;
        }

        .puzzleInfo .puzzleInfoContent {
            color: white;
        }

        /* No Puzzles Yet Text */

        .archive_empty-state-message {
            color: white;
        }

        /* Not Logged In Page */

        .archive_overlay-gradient--mini-redesign {
            background: linear-gradient(to bottom, rgba(15, 15, 15, 0.4) 0%, rgb(15, 15, 15) 100%)
        }

        .archive_overlay-body--mini-redesign {
            background-color: #0f0f0f;
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

        .archive_subscribe-button--mini-redesign {
            border: 1px solid white;
        }
    `;
    const style = document.createElement("style");
    style.id = "crosswordsarchivestyle";
    style.textContent = crosswordsArchiveCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableCrosswordsArchiveDarkMode() {
    const styleElement = document.getElementById("crosswordsarchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the crosswords archive dm switch, adds/removes the stylesheet
function syncCrosswordsArchiveDarkMode() {
    chrome.storage.sync.get(["crosswordsArchiveDarkModeEnabled", "archivesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.archivesMasterEnabled !== false && Boolean(data.crosswordsArchiveDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("crosswordsarchivestyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableCrosswordsArchiveDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableCrosswordsArchiveDarkMode();
        }
    });
}

// Catches the popup flipping the crosswords archive toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableCrosswordsArchiveDarkMode" || message.action === "syncDarkModeState") {
        syncCrosswordsArchiveDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("crosswordsArchiveDarkModeEnabled" in changes || "archivesMasterEnabled" in changes)) {
        syncCrosswordsArchiveDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncCrosswordsArchiveDarkMode();