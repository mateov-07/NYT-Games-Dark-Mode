// Provides dark mode functionality for the Spelling Bee Archive

// Builds the whole dark mode stylesheet and drops it onto the page as one style element
function enableSpellingBeeArchiveDarkMode() {
    const svgURL_Swirl = chrome.runtime.getURL("svgs/path-swirl.svg");
    const svgURL_Wavy = chrome.runtime.getURL("svgs/path-wavy.svg");
    const spellingBeeArchiveCSS = `
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

        /* Today's Puzzle Section */

        .Layout-module_outerWrapper__kO4JV {
            background-image: url("${svgURL_Swirl}"), url("${svgURL_Wavy}"),
                              linear-gradient(to bottom, #0f0f0f 377px, #151515 377px);
        }

        @media (max-width: 991.98px) {
            .Layout-module_outerWrapper__kO4JV {
                background-image: url("${svgURL_Swirl}"), url("${svgURL_Wavy}"),
                                  linear-gradient(to bottom, #0f0f0f 332px, #151515 332px);
            }
        }

        @media (max-width: 767.98px) {
            .Layout-module_outerWrapper__kO4JV {
                background-image: none, none, linear-gradient(to bottom, #0f0f0f 306px, #151515 306px);
            }
        }

        /* Rest of Page */

        .Layout-module_outerWrapper__kO4JV .Layout-module_innerWrapper__J9ldt {
            color: white;
        }

        .PastPuzzlesSections-module_pastPuzzlesContent__KwLBJ 
        .PastPuzzlesSections-module_weekSectionContainer__LNvJi {
            border-top: 2px solid white;
        }

        .HeroCard-module_heroCard___sPDU {
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "spellingbeearchivestyle";
    style.textContent = spellingBeeArchiveCSS;
    (document.head || document.documentElement).appendChild(style);
}

// Takes dark mode back off by removing the style element, leaving NYT as it is normally
function disableSpellingBeeArchiveDarkMode() {
    const styleElement = document.getElementById("spellingbeearchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

// Reads the spelling bee archive dm switch, adds/removes the stylesheet
function syncSpellingBeeArchiveDarkMode() {
    chrome.storage.sync.get(["spellingBeeArchiveDarkModeEnabled", "archivesMasterEnabled"], function(data) {
        const shouldBeEnabled = data.archivesMasterEnabled !== false && Boolean(data.spellingBeeArchiveDarkModeEnabled);
        const isEnabled = Boolean(document.getElementById("spellingbeearchivestyle"));
        if (shouldBeEnabled && !isEnabled) {
            enableSpellingBeeArchiveDarkMode();
        } else if (!shouldBeEnabled && isEnabled) {
            disableSpellingBeeArchiveDarkMode();
        }
    });
}

// Catches the popup flipping the spelling bee archive toggle and sync so an already open tab updates without needing a reload
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "enableSpellingBeeArchiveDarkMode" || message.action === "syncDarkModeState") {
        syncSpellingBeeArchiveDarkMode();
    }
});

// Catches the same two keys changing anywhere else which covers another window and another synced device
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && ("spellingBeeArchiveDarkModeEnabled" in changes || "archivesMasterEnabled" in changes)) {
        syncSpellingBeeArchiveDarkMode();
    }
});

// Runs once on load so a tab opened after the toggle was set still comes up dark
syncSpellingBeeArchiveDarkMode();