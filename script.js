// let currentSubject = null;
let currentMode = "home";
let scene, camera, renderer, crystal, animationFrameId;
let hideTimeout = null;
let currentElement = null;
let currentTier = null;

let activeSubject = null;
let activeGameMode = null;
let activeOverlay = null;
let activeOverlayType = null;
let activeGroups = new Set();


// GAME MODE STATE
let gameMode = false;
let gameElements = [];
let placedElements = {};
let gameFinished = false;
let modeLock = null;

let currentFlashcard = null;
let flashcardIndex = 0;
let flashcardScore = 0;

const originalColor = getThemeColor();



const MODE_TO_GROUP = {

    chemistry: "journey",

    table: "tools",
    lewis: "tools",
    elemental_fit_menu: "games",
    matchmaker: "games"
};

const SUBJECT_ROUTES = {
    Chemistry: "chemistry"
};

const overlays = {
    colorGrid: false,
    electronegativity: false,
    ionization: false,
    radius: false
};

function renderPolyProgHome() {
    const arena = document.getElementById('game-arena');

    arena.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'home-container';

    container.innerHTML = `
        <div class="ui-section phenonics-section">
            
            <div class="phenonics-header">
                
                <div class="phenonics-title">
                    phenonics.
                </div>
                
                <div class="phenonics-subtitle ">
                    learn phenomenally
                </div>

                <div class="phenonics-divider"></div>
                
            </div>
            
            <div class="phenonics-dropdown-wrapper">
                
                <button class="phenonics-dropdown-btn" id="phen-dropdown-btn">
                    Pick a subject ▼
                </button>
                
                <div class="phenonics-dropdown-menu hidden" id="phen-dropdown-menu">
                
                    <div class="phenonics-subject active-subject" data-subject="chemistry">
                        🧪 Chemistry
                    </div>

                     <div class="phenonics-subject active-subject" data-subject="physics">
                        ⚛️ Physics
                    </div>

                     <div class="phenonics-subject active-subject" data-subject="mathematics">
                        ➗ Mathematics
                    </div>

                    <div class="phenonics-subject active-subject" data-subject="engineering">
                        ⚙️ Engineering
                    </div>
                </div>
            </div>
        </div>
    `;

    arena.appendChild(container);

    const dropdownBtn = document.getElementById("phen-dropdown-btn");
    const dropdownMenu = document.getElementById("phen-dropdown-menu");

    dropdownBtn.onclick = () => {
        dropdownMenu.classList.toggle("hidden");
    };

    document.querySelectorAll(".phenonics-subject")
        .forEach(card => {
            card.onclick = () => {
                const subject = card.dataset.subject;

                setMode(subject);
            };
        });
}

function getThemeColor() {
    return document.body.classList.contains("game-mode")
    ? "#fca5a5"
    : "#69FAAD";
}

function setMode(mode) {
    mode = String(mode).trim();
    currentMode = mode;

    if (modeLock === mode) return;
    modeLock = mode;

    if (mode !== "table") modeLock = null;


    document.querySelectorAll(".sidebar-group")
        .forEach(g => g.classList.remove("open"));

    document.querySelectorAll("#sidebar [data-mode].active").forEach(el => {
        el.classList.remove("active");
    });

    if (mode === "chemistry") {
        activeSubject = "Chemistry";

        document.body.classList.add("chemistry-active");
        document.body.classList.add("subject-active");

        updateSidebarSubject("Chemistry");
        renderChemistrySidebar();
        renderChemistryMenu();
    } else {
        activeSubject = null;
        document.body.classList.remove("chemistry-active");

        document.getElementById("active-subject-container").innerHTML = "";
    }

    if (mode !== "table") {
        Object.keys(overlays).forEach(k => overlays[k] = false);
    }

    const panel = document.getElementById("sidebar-dynamic-panel");

    if (mode === "table") {
        renderTableTools();
    } else {
        panel.innerHTML = "";
    }

    const activeItems = document.querySelectorAll(
        `#sidebar [data-mode="${mode}"]`);

    activeItems.forEach(el => el.classList.add("active"));

    switch (mode) {

        case "home":
            currentSubject = null;
            activeSubject = null;
            resetSidebar();

            document.getElementById("home-nav-item")?.classList.add("active");

            document.getElementById("active-subject-container").innerHTML = "";
            document.getElementById("sidebar-dynamic-panel").innerHTML = "";

            document.getElementById('game-arena').innerHTML = '';
            document.getElementById('game-controls').innerHTML = '';

            document.body.classList.remove("game-mode");
            document.body.classList.remove("chemistry-active");

            renderPolyProgHome();
            return;

        case "journey":
            renderChemJourney();
            openSidebarGroupForMode("journey");
            return;
        
        case "chemistry":
            document.getElementById("active-subject-container").innerHTML = "";
            currentSubject = "Chemistry";
            return;

        case "table":
            document.getElementById('game-arena').innerHTML = '';
            document.getElementById('game-controls').innerHTML = '';
            document.body.classList.remove("game-mode");
            modeLock = "table";

            openSidebarIfCollapsed();

            renderDefaultLayout();
            openSidebarGroupForMode("table");

            document
                .querySelector('.sidebar-group.chemistry')
                ?.classList.add("open");

            return;
        
        case "elemental_fit_menu":
            openElementalFitMenu();
            openSidebarGroupForMode("elemental_fit_menu");
            return;

        case "table_complete":
            document.body.classList.add("game-mode");
            startGameMode();
            return;

        case "table_master":
            document.body.classList.add("game-mode");
            startMasterMode();
            return;

        case "table_timed":
            document.body.classList.add("game-mode");
            startTimedMode();
            return;

        case "matchmaker":
            renderMatchMaker();
            openSidebarGroupForMode("matchmaker");
            return;

        case "lewis":
            document.getElementById('game-arena').innerHTML = '';
            document.getElementById('game-controls').innerHTML = '';
            document.body.classList.remove("game-mode");
            renderLewisMode();
            openSidebarGroupForMode("lewis");
            return;
            
        default:
            console.warn("Unknown mode", mode);
            return;
    }
}

function openSidebarGroupForMode(mode) {
    const groupName = MODE_TO_GROUP[mode];
    if (!groupName) return;

    document.querySelectorAll(".sidebar-group")
        .forEach(g => g.classList.remove("open"));

        document
            .querySelector(`[data-group="${groupName}"]`)
            ?.classList.add("open");
}

function updateSidebarSubject(subject) {
    const sidebar = document.getElementById("sidebar");

    const existing = document.getElementById("subject-nav-item");
    if (existing) existing.remove();

    const item = document.createElement("div");
    item.id = "subject-nav-item";
    item.className = "overlay-item subject-item active";
    item.dataset.persistent = "subject";


    item.innerHTML = `
        <span class="dot"></span>
        <span class="label">${subject}</span>
    `;

    item.onclick = () => {
        const mode = SUBJECT_ROUTES[subject];
        if (mode) setMode(mode);
    };

    const homeItem = document.getElementById("home-nav-item");
    homeItem.after(item);
}

function getGroup(atomicNumber) {
    for (const [group, numbers] of Object.entries(GROUPS)) {
        if (numbers.includes(atomicNumber)) {
            return group;
        }
    }
    return;
}

elements.forEach(el => {
    el.group = getGroup(el.number);
    el.radius = ATOMIC_RADIUS[el.number] ?? null;
    el.electronegativity = ELECTRONEGATIVITY[el.number] ?? null;
    el.ionization = IONIZATION[el.number] ?? null;
});

function getRadiusSize(value) {
    if (value == null) return 18;

    const min = 50;
    const max = 280;

    let normalized = (value - min) / (max - min);

    normalized = Math.max(0, Math.min(1, normalized));

    normalized = (Math.pow(normalized, 1.4) * 0.6) + (normalized * 0.4);

    const minSize = 15;
    const maxSize = 75;

    let size = minSize + normalized * (maxSize - minSize);

    const SAFE_LIMIT = 65;

    return Math.min(size, SAFE_LIMIT);

}

function getIonizationColor(value) {
    if (value == null) return "#ffffff";

    const min = 400;
    const max = 1800;

    const clamped = Math.max(min, Math.min(max, value));
    let normalized = (clamped - min) / (max - min);

    const steps = 8;
    normalized = Math.round(normalized * steps) / steps;

    const hue = 120 - (120 * normalized);

    return `hsl(${hue}, 70%, 60%)`;
}

function renderTableTools() {
    const panel = document.getElementById("sidebar-dynamic-panel");
    panel.innerHTML = "";

    const template = document.getElementById("table-tools-template");
    const clone = template.cloneNode(true);
    clone.style.display = "block";

    const menu = clone.querySelector(".table-tools-menu");

    panel.appendChild(clone);

    requestAnimationFrame(() => {
        menu.classList.add("visible");
    });
}

function openColorGridSubmenu() {
    const panel = document.getElementById("sidebar-dynamic-panel");
    closeColorGridSubmenu();

    const submenu = document.createElement("div");
    submenu.id = "group-submenu";
    submenu.className = "group-submenu";

    Object.keys(GROUP_COLORS).forEach(group => {
        const item = document.createElement("div");

        item.className = `
            overlay-item subgroup-item
            ${activeGroups.has(group) ? "active" : ""}
        `;

        item.innerHTML = `
            <span class="dot"></span>
            <span class="label">
                ${group
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase())
                }
            </span>
        `;

        item.onclick = () => toggleGroup(group);

        submenu.appendChild(item);
    });

    panel.appendChild(submenu);
}

function closeColorGridSubmenu() {
    document.getElementById("group-submenu")?.remove();
}

function toggleGroup(group) {
    if (activeGroups.has(group)) {
        activeGroups.delete(group);
    } else {
        activeGroups.add(group);
    }
    refreshGrid();
    openColorGridSubmenu();
}

function getElementStyle(el) {
    if (overlays.colorGrid) {
        return GROUP_COLORS[el.group] || "#69FAAD";
    }
    return "#69FAAD";
}

function resetGroups() {
    activeGroups.clear();

    buildPeriodicTable(document.getElementById("game-arena"));

    openColorGridSubmenu();
}

function resetSidebar() {
    const sidebar = document.getElementById("sidebar");

    sidebar.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    sidebar.querySelectorAll(".open").forEach(el => el.classList.remove("open"));

    document.getElementById("active-subject-container").innerHTML = "";

    sidebar.querySelectorAll(".chemistry-inserted").forEach(el => el.remove());
    sidebar.querySelectorAll("#subject-nav-item").forEach(el => el.remove());

    document.body.classList.remove("chemistry-active");
    document.querySelectorAll(".chemistry-inserted").forEach(el => el.remove());

}

function goHome() {
    currentSubject = null;

    const subjectItem = document.getElementById("subject-nav-item");
    if (subjectItem) subjectItem.remove();

    const chemBlock = document.querySelector(".chemistry-sidebar-block");
    if (chemBlock) chemBlock.remove();

    setMode("home");
}

function renderChemistryMenu() {
    const arena = document.getElementById('game-arena');
    arena.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'home-container';

    container.innerHTML = `
        <div class="chemistry-sections">

            <!-- JOURNEY SECTION -->

            <div class="chem-section">

                <div class="section-title">Journey</div>

                <div class="home-card-container">
                    <div class="home-card" id="chem-journey-card">
                        <div class="home-icon">🧠</div>
                        <div class="home-label">Learn Chemistry</div>
                    </div>
                </div>
            </div>

            <!-- TOOLS -->

            <div class="chem-section">
                <div class="section-title">Tools</div>

                <div class="home-card-container">
                    <div class="home-card" id="pt-card">
                        <div class="home-icon">⚛️</div>
                        <div class="home-label">Periodic Table</div>
                    </div>

                    <div class="home-card" id="lewis-card">
                        <div class="home-icon">•••</div>
                        <div class="home-label">Lewis Dots</div>
                    </div>
                </div>
            </div>

            <!-- GAMES -->
            <div class="chem-section">

                <div class="section-title">Games</div>

                <div class="home-card-container">
                    <div class="home-card" id="table_chal_card">
                        <div class="home-icon">🎮</div>
                        <div class="home-label">Elemental Fit</div>
                    </div>

                <div class="home-card" id="matchmaker-card">
                    <div class="home-icon">🃏</div>
                    <div class="home-label">MatchMaker</div>
                </div>
            </div>
        </div>
    
    `;

    arena.appendChild(container);

    // JOURNEY
    document.getElementById("chem-journey-card").onclick = () => {
        setMode("journey");
    };

    // TOOLS
    document.getElementById("pt-card").onclick = () => {
        setMode("table");
    };

    document.getElementById("lewis-card").onclick = () => {
        setMode("lewis");
    };

    // GAMES
    document.getElementById("table_chal_card").onclick = () => {
        setMode("elemental_fit_menu");
    };

    document.getElementById("matchmaker-card").onclick = () => {
        setMode("matchmaker");
    };

}

function renderChemistrySidebar() {
    const sidebar = document.getElementById("sidebar");

    const oldBlock = sidebar.querySelector(".chemistry-inserted");
    if (oldBlock) oldBlock.remove();

    const template = document.getElementById("chemistry-sidebar-template");

    const block = template.querySelector(".chemistry-sidebar-block");

    const clone = block.cloneNode(true);
    clone.classList.add("chemistry-inserted");

    sidebar.appendChild(clone);
    
    attachSidebarHandlers();
    // attachSidebarDropdowns();
}

function attachSidebarHandlers() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar._handlerAttached) return;
    sidebar._handlerAttached = true;

    sidebar.addEventListener("click", (e) => {

        const title = e.target.closest(".sidebar-title");
        if (title) {
            const group = title.closest(".sidebar-group");
            const mode = title.dataset.mode;

            if (group) {
                const isOpen = group.classList.contains("open");

                group.classList.toggle("open");

                if (!isOpen && mode) {
                    setMode(mode);
                }
            }

            return;
        }
    });
}

function renderChemJourney() {

    const arena = document.getElementById("game-arena");

    arena.innerHTML = "";

    const container = document.createElement("div");

    container.innerHTML = `

        <div class="journey-section-container">

            <div class="journey-header">

                <div class="journey-section-label">
                    Foundations
                </div>
            
                <div class="phenonics-subtitle foundations-subtitle">
                    Master chemistry step by step.
                </div>

                <div class="journey-divider"></div>
            
            </div>
        
            <div class="journey-grid">
        
                ${CHEM_JOURNEY.map(section => `
                    <div class="
                        journey-card
                        ${section.unlocked ? "unlocked" : "locked"}
                    "
                    data-id="${section.id}"
                    >
                    
                        ${
                            !section.unlocked
                            ? `
                                <div class="journey-lock">
                                    🔒
                                </div>
                            `
                            : ""
                        }
                        
                        <div class="journey-card-top">
                        
                            <div class="journey-title">
                                ${section.title}
                            </div>
                            
                            <div class="journey-count">
                                ${section.questions} Qs
                            </div>
                            
                        </div>
                        
                        <div class="journey-subtitle">
                            ${section.subtitle}
                        </div>
                        
                    </div>
                `).join("")}
            </div>
        </div>

 
    `;

    arena.appendChild(container);

    setupJourneyCards();
}

function setupJourneyCards() {
    document
        .querySelectorAll(".journey-card.unlocked")
        .forEach(card => {
            card.onclick = () => {

                const id = card.dataset.id;

                console.log("Selected:", id);

                startChemFlashcards(id);
            };
        });
}

function startChemFlashcards(tier) {

    currentTier = tier;
    const arena = document.getElementById("game-arena");

    arena.innerHTML = "";

    const questionPool = CHEM_QUESTIONS[tier];

    if (flashcardIndex >= questionPool.length) {
        
        showCompletionPopup(tier);
        return;
    }

    currentFlashcard = questionPool[flashcardIndex];

    const shuffledAnswers = [...currentFlashcard.answers]
        .sort(() => Math.random() - 0.5);

    const container = document.createElement("div");

    container.className = "flashcard-layout";

    container.innerHTML = `

        <div class="flashcard-score">
            ${flashcardScore} / ${questionPool.length} Correct
        </div>
        
        <div class="flashcard-question-card">
            <div class="flashcard-question">
                ${currentFlashcard.question}
            </div>
        </div>
        
        <div class="flashcard-answer-grid">
            ${shuffledAnswers.map(answer => `
                <div class="flashcard-answer" data-answer="${answer}">
                    ${answer}
                </div>
            `).join("")}
            
        </div>
    `;

    arena.appendChild(container);

    setupFlashcardAnswers(currentTier, questionPool);
}

function showCompletionPopup(tier) {
    const questionPool = CHEM_QUESTIONS[tier];
    const popup = document.createElement("div");

    popup.className = "correct-overlay visible";

    popup.innerHTML = `
        <div class="correct-popup-card">
            
            <div class="section-title correct-popup-title">
                Yay!
            </div>
            
            <div class="phenonics-subtitle correct-popup-subtitle">
                You answered all ${questionPool.length} questions!
            </div>
            
            <button class="control-btn popup-btn" id="continue-btn">
                Continue
            </button>
            
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("continue-btn").onclick = () => {
        popup.remove();
        unlockNextTier(tier)
    };
}

function unlockNextTier(tier) {

    if (tier === "particles") {

        const atomsTier = CHEM_JOURNEY.find(
            section => section.id === "atoms"
        );

        if (atomsTier) {
            atomsTier.unlocked = true;
        }

        showUnlockPopup("Atoms");
    }
}

function showUnlockPopup(nextTierName) {
    
    const popup = document.createElement("div");

    popup.className = "correct-overlay visible";

    popup.innerHTML = `
        <div class="correct-popup-card">
        
            <div class="section-title correct-popup-title">
                New Tier Unlocked!
            </div>
            
            <div class="phenonics-subtitle correct-popup-subtitle">
                You've unlocked ${nextTierName}!
            </div>
            
            <button class="control-btn popup-btn" id="unlock-ok-btn">
                Okay
            </button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("unlock-ok-btn").onclick = () => {

        popup.remove();

        flashcardScore = 0;
        flashcardIndex = 0;

        renderChemJourney();
    };
}

function setupFlashcardAnswers(tier, questionPool) {
    
    document
        .querySelectorAll(".flashcard-answer")
        .forEach(card => {

            card.onclick = () => {

                const selected = card.dataset.answer;

                if (selected === currentFlashcard.correct) {
                    flashcardIndex++;
                    flashcardScore++;

                    card.classList.add("correct-answer");

                    showCorrectPopup(tier);

                    setTimeout(() => {
                        if (flashcardIndex >= questionPool.length) {
                            startChemFlashcards(tier);
                            return;
                        }

                        startChemFlashcards(tier);
                    }, 800);

                } else {

                    card.classList.add("wrong-answer");

                    showWrongPopup(tier);

                    setTimeout(() => {
                        card.classList.remove("wrong-answer");
                    }, 400);
                }

            };
        });
}

function showCorrectPopup(tier) {

    const popup = document.createElement("div");

    popup.className = "correct-overlay";

    popup.innerHTML = `
        <div class="correct-popup-card">
            
            <div class="section-title correct-popup-title">
                Correct!
            </div>
            
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("visible");
    }, 10);

    setTimeout(() => {
        popup.classList.remove("visible");

        setTimeout(() => {
            popup.remove();
        }, 250);
    }, 700);
}

function showWrongPopup(tier) {
    const popup = document.createElement("div");

    popup.className = "wrong-overlay";

    popup.innerHTML = `
        <div class="wrong-popup-card">
            
            <div class="section-title wrong-popup-title">
                Not quite
            </div>
            
            <div class="phenonics-subtitle wrong-popup-subtitle">
                Try again!
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("visible");
    }, 40);

    setTimeout(() => {
        popup.classList.remove("visible");

        setTimeout(() => {
            popup.remove();
        }, 250);
    }, 650);
}

function renderMatchMaker() {
    const arena = document.getElementById("game-arena");
    arena.innerHTML = "";

    const container = document.createElement("div");

    container.className = "home-container";

    container.innerHTML = `
        
        <div class="chemistry-sections">
        
            <div class="chem-section games">
                
                <div class="section-title matchmaker-title">
                    MatchMaker
                </div>
                
                <div class="phenonics-subtitle matchmaker-subtitle">
                    Train your chemsitry recall.
                </div>

                <div class="phenonics-divider"></div>
                
                <div class="home-card-container">
                
                    <div class="home-card" id="match-elements">
                    
                        <div class="home-icon">⚛️</div>
                        <div class="home-label">
                            Elements
                        </div>
                        
                    </div>
                    
                    <div class="home-card" id="math-molecules">
                    
                        <div class="home-icon">🧪</div>
                        <div class="home-label">
                            Molecules
                        </div>
                        
                    </div>
                    
                    <div class="home-card" id="math-equations">
                    
                        <div class="home-icon">⚗️</div>
                        <div class="home-label">
                            Equations
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `;

    arena.appendChild(container);

}


function renderDefaultLayout() {
    const arena = document.getElementById('game-arena');
    const controls = document.getElementById('game-controls');

    arena.innerHTML = '';
    controls.innerHTML = '';

    buildPeriodicTable(arena);
}

function toggleOverlay(type) {
    if (currentMode !== "table") return;

    const isActive = overlays[type] === true;

    Object.keys(overlays).forEach(k => {
        overlays[k] = false;
    });

    if (!isActive) {
        overlays[type] = true;
    }


    document.querySelectorAll('[data-overlay]').forEach(btn => {
        btn.classList.remove("active");
    });

    if (overlays[type]) {
        document
        .querySelector(`[data-overlay="${type}"]`)
        ?.classList.add("active");

    }
    
    document.body.classList.toggle(
        "electronegativity-mode",
        overlays.electronegativity
    );

    document.body.classList.toggle(
        "ionization-mode",
        overlays.ionization
    );

    if (type === "colorGrid" && overlays.colorGrid) {
        openColorGridSubmenu();
    } else {
        closeColorGridSubmenu();
        activeGroups.clear();
    }

    refreshGrid();
}


function render() {
    const container = document.getElementById("grid-mode");
    container.innerHTML = "";

    if (mode === "grid") {
        buildPeriodicTable(container);
    }

    if (mode === "game") {
        start(container);
    }
}

function createElementSlot(el, targetSet = null) {
    const div = document.createElement('div');

    const isGame = !!targetSet;
    const isTarget = isGame && targetSet.has(el.number);

    if (isGame) {
        if (isTarget) {
            div.className = 'element';
            div.style.opacity = '0.55';
            div.style.background = 'rgba(255,255,255,0.99)';
            div.style.color = '#000';
            div.style.border = `2px solid rgba(0,0,0,0.35)`;
            div.style.boxShadow = `
                0 4px 10px rgba(0,0,0,0.15),
                0 0 10px rgba(255,255,255,0.4)
            `;

            div.style.backdropFilter = 'blur(2px)';

            div.onmouseenter = ()=> {
                div.style.transform = "scale(1.03)";
                div.style.boxShadow = "0 0 12px rgba(105,250,173,0.4)";
            };

            div.onmouseleave = () => {
                div.style.transform = "scale(1)";
            };

            div.ondragover = (e) => e.preventDefault();

            div.ondrop = (e) => {

                const draggedNumber = Number(e.dataTransfer.getData("number"));
                
                if (draggedNumber === el.number) {
                    div.innerHTML = `
                        <div class="number">${el.number}</div>
                        <div class="symbol">${el.symbol}</div>
                        <div class="mass">${el.mass}</div>
                    `;

                    div.style.opacity = '1';
                    placedElements[el.number] = true;

                    if (!gameFinished && gameElements.every(el => placedElements[el.number])) {
                        gameFinished = true;
                        setTimeout(() => {
                            alert("⚛️ You completed the challenge!");
                            showRestartButton();
                        }, 200);
                    }
                
                } else {
                    div.style.background = 'red';
                    setTimeout(() => div.style.background = '', 300);
                }
            };
        }
    } else {
        div.className = overlays.radius ? 'element radius-mode' : 'element';

        
        if (overlays.radius) {
            const size = getRadiusSize(el.radius);

            div.innerHTML = `
                <div class="radius-wrapper">
                    <div class="radius-circle" style="
                        width:${size}px;
                        height:${size}px;
                    "></div>
                </div>
                <div class="symbol-overlay">${el.symbol}</div>
            `;

        } else {
            div.innerHTML = `
                <div class="number">${el.number}</div>
                <div class="symbol">${el.symbol}</div>
                <div class="mass">${el.mass}</div>
            `;
        

            div.style.borderColor = originalColor;
            div.style.boxShadow = `0 0 12px ${originalColor}`;
        }

        div.onmouseenter = (e) => {
            const groupColor = GROUP_COLORS[el.group] || originalColor;

            if (!overlays.radius) {
                div.style.borderColor = groupColor;
                div.style.boxShadow = `0 0 20px ${groupColor}`;
            }

            showHoloPopup(e, el);
        };

        div.onmouseleave = () => {

            if (!overlays.radius) {

                if (overlays.colorGrid) {
                    const groupColor = GROUP_COLORS[el.group] || originalColor;
                    div.style.borderColor = groupColor;
                    div.style.boxShadow = `0 0 20px ${groupColor}`;
                } else {
                    div.style.borderColor = originalColor;
                    div.style.boxShadow = `0 0 12px ${originalColor}`;
                }
            }

            hideHoloPopup();
        };

        // div.onclick = () => showCrystalModal(el);
    }

    // Element Colors
    if (overlays.colorGrid && !overlays.radius) {
        const groupColor = GROUP_COLORS[el.group] || originalColor;
        const showAll = activeGroups.size === 0;
        const isActive = activeGroups.has(el.group);

        if (showAll || isActive) {
            div.style.borderColor = groupColor;
            div.style.boxShadow = `0 0 20px ${groupColor}`;
            div.style.opacity = "1";
        } else {

            div.style.opacity = "0.15";
            div.style.boxShadow = "none";
        }




    }

    // Electronegativity
    if (overlays.electronegativity) {
        if (el.electronegativity == null) {
            div.style.background = "#ffffff";
            div.style.opacity = "0.4";
        } else {
            div.style.background = getEnergyColor(el.electronegativity);
        }

        div.style.color = "#fff"
    }

    if (overlays.ionization) {
        if (el.ionization == null) {
            div.style.background = "#ffffff";
            div.style.color = "#000";
        } else {
            div.style.background = getIonizationColor(el.ionization);
            div.style.color = "#000";
        }
    }
   
    return div;
}

function getEnergyColor(value) {
    if (value == null) return "#ffffff";

    const min = 0.7;
    const max = 4.0;

    const clamped = Math.max(min, Math.min(max, value));

    let normalized = (clamped - min) / (max - min);

    const steps = 8;
    normalized = Math.round(normalized * steps) / steps;

    const hue = 120 - (120 * normalized);

        return `hsl(${hue}, 75%, ${55 + (normalized * 5)}%)`;
    
    }

function showRestartButton() {
    const container = document.getElementById('grid-mode');

    const btn = document.createElement('button');
    btn.className = 'control-btn mt-6';
    btn.innerText = "Restart Game";

    btn.onclick = () => {
        resetGameMode();
        startGameMode();
    };

    container.appendChild(btn)
}

function buildPeriodicTable(container, targetSet = null) {
    container.innerHTML = '';

    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'main-wrapper';
    container.appendChild(mainWrapper);

    const mainTable = document.createElement('div');
    mainTable.className = 'periodic-table';
    mainWrapper.appendChild(mainTable);

    // Period 1
    mainTable.appendChild(createElementSlot(elements[0], targetSet));
    for (let i = 0; i < 16; i++) mainTable.appendChild(createSpacer());
    mainTable.appendChild(createElementSlot(elements[1], targetSet));

    // Period 2
    mainTable.appendChild(createElementSlot(elements[2], targetSet));
    mainTable.appendChild(createElementSlot(elements[3], targetSet));
    for (let i = 0; i < 10; i++) mainTable.appendChild(createSpacer());
    for (let i = 4; i < 10; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Period 3
    mainTable.appendChild(createElementSlot(elements[10], targetSet));
    mainTable.appendChild(createElementSlot(elements[11], targetSet));
    for (let i = 0; i < 10; i++) mainTable.appendChild(createSpacer());
    for (let i = 12; i < 18; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Period 4
    for (let i = 18; i < 36; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Period 5
    for (let i = 36; i < 54; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Period 6
    mainTable.appendChild(createElementSlot(elements[54], targetSet));
    mainTable.appendChild(createElementSlot(elements[55], targetSet));
    mainTable.appendChild(createSpacer());
    for (let i = 71; i < 86; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Period 7
    mainTable.appendChild(createElementSlot(elements[86], targetSet));
    mainTable.appendChild(createElementSlot(elements[87], targetSet));
    mainTable.appendChild(createSpacer());
    for (let i = 103; i < 118; i++) mainTable.appendChild(createElementSlot(elements[i], targetSet));

    // Lanthanides row (57-71) - full size
    const lanHeader = document.createElement('div');
    lanHeader.className = 'fblock-label';
    lanHeader.textContent = '57 — 71   LANTHANIDES';
    mainWrapper.appendChild(lanHeader);

    const lanRow = document.createElement('div');
    lanRow.className = 'fblock-row';
    for (let i = 56; i <= 70; i++) lanRow.appendChild(createElementSlot(elements[i], targetSet));
    mainWrapper.appendChild(lanRow);

    // Actinides row (89-103) - full size, Ac and Th included
    const actHeader = document.createElement('div');
    actHeader.className = 'fblock-label';
    actHeader.textContent = '89 — 103   ACTINIDES';
    mainWrapper.appendChild(actHeader);

    const actRow = document.createElement('div');
    actRow.className = 'fblock-row';
    for (let i = 88; i <= 102; i++) actRow.appendChild(createElementSlot(elements[i], targetSet));
    mainWrapper.appendChild(actRow);
}

function openElementalFitMenu() {
    const arena = document.getElementById("game-arena");
    const controls = document.getElementById("game-controls");

    arena.innerHTML = "";
    controls.innerHTML = "";

    const container = document.createElement("div");
    container.className = "mode-select-container";

    container.innerHTML = `
    <div class="elemental-fit-layout">

        <div class="home-container">

            <div class="ui-section elemental-fit-section">
                
                <div class="section-title start-challenge-title">
                    Elemental Fit
                </div>

                <div class="section-title start-challenge-subtitle">
                    Choose your challenge.
                </div>

                <div class="phenonics-divider ef-divider"></div>


                <div class="home-card-container">

                    <div class="home-card" id="complete-mode">
                        <div class="home-icon">🧩</div>
                        <div class="home-label">Fill in the Table</div>
                    </div>

                    <div class="home-card" id="master-mode">
                        <div class="home-icon">🧠</div>
                        <div class="home-label">Master the Table</div>
                    </div>

                    <div class="home-card" id="timed-mode">
                        <div class="home-icon">⏱️</div>
                        <div class="home-label">Timed Trial</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

        arena.appendChild(container);

        document.getElementById("complete-mode").onclick = () => {
            setMode("table_complete")
        }

        document.getElementById("master-mode").onclick = () => {
            setMode("table_master");
        }

        document.getElementById("timed-mode").onclick = () => {
            setMode("table_timed");
        }
}

function startGameMode() {
    gameMode = true;
    placedElements = {};
    gameFinished = false;

    // pick 15 random elements
    gameElements = [...elements]
    .sort(() => Math.random() - 0.5)
    .slice(0, 15);

    const arena = document.getElementById('game-arena');
    const controls = document.getElementById('game-controls');

    arena.innerHTML = '';
    controls.innerHTML = '';

    const targetSet = new Set(gameElements.map(e => e.number));

    const gameLayout = document.createElement("div");
    gameLayout.className = "game-layout";

    arena.appendChild(gameLayout);

    buildPeriodicTable(gameLayout, targetSet);
    renderElementBank(gameLayout);
    renderShuffleAndClearButtons(gameLayout);

    document.body.classList.add("game-mode");
}


function renderElementBank(container) {
    const bank = document.createElement('div');
    bank.className = 'element-bank flex flex-wrap justify-center gap-3';

    gameElements.forEach(el => {
        const div = document.createElement('div');
        div.className = 'element';
        div.draggable = true;

        div.innerHTML = `
        <div class="number">${el.number}</div>
        <div class="symbol">${el.symbol}</div>
        `;

        div.ondragstart = (e) => {
            e.dataTransfer.setData("number", el.number);
        };

        bank.appendChild(div);
    });

    container.appendChild(bank);
}

function clearBoard() {
    placedElements = {};
    gameFinished = false;

    const arena = document.getElementById('game-arena');
    const controls = document.getElementById('game-controls');
    arena.innerHTML = '';
    controls.innerHTML = '';

    const targetSet = new Set (gameElements.map(e => e.number));

    buildPeriodicTable(arena, targetSet);
    renderElementBank(arena);
}

function renderShuffleAndClearButtons(container) {
    container.innerHTML = '';

    const controls = document.createElement('div');
    controls.className = 'game-controls flex justify-center';

    const shuffleBtn = document.createElement('button');
    shuffleBtn.classList.add('control-btn');
    shuffleBtn.innerText = "Shuffle";
    shuffleBtn.onclick = shuffleGameElements;

    const clearBtn = document.createElement('button');
    clearBtn.classList.add('control-btn');
    clearBtn.innerText = "Clear";
    clearBtn.onclick = clearBoard;

    controls.appendChild(shuffleBtn);
    controls.appendChild(clearBtn);

    container.appendChild(controls);
}

function shuffleGameElements() {
    if (Object.keys(placedElements).length > 0) {
        alert("Must clear first.");
        return;
    }

    gameElements = [...elements]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

    for (let i = gameElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameElements[i], gameElements[j]] = [gameElements[j], gameElements[i]];
    }

    placedElements = {};
    gameFinished = false;

    const targetSet = new Set(gameElements.map(e => e.number));
    const arena = document.getElementById('game-arena');
    arena.innerHTML = '';

    buildPeriodicTable(arena, targetSet);
    renderElementBank(arena);
    renderShuffleAndClearButtons(document.getElementById('game-controls'));
}

function createElementDiv(el) {
    const div = document.createElement('div');
    div.className = 'element';
    div.innerHTML = `
        <div class="number">${el.number}</div>
        <div class="symbol">${el.symbol}</div>
        <div class="mass">${el.mass}</div>
    `;

    const originalColor = "#69FAAD";
    div.style.borderColor = originalColor;
    div.style.boxShadow = `0 0 12px ${originalColor}`;

    div.onmouseenter = (e) => {
        const groupColor = GROUP_COLORS[el.group] || originalColor;
        div.style.borderColor = groupColor;
        div.style.boxShadow = `0 0 20px ${groupColor}, 0 0 40px ${groupColor}`;
        showHoloPopup(e, el);
    },
    div.onmouseleave = () => {
        if (colorGridEnabled) {
            const groupColor = GROUP_COLORS[el.group] || originalColor;
            div.style.borderColor = groupColor;
            div.style.boxShadow = `0 0 20px ${groupColor}, 0 0 40px ${groupColor}`;
        } else {
            div.style.borderColor = originalColor;
            div.style.boxShadow = `0 0 12px ${originalColor}`;
        }
        hideHoloPopup();
    };
    div.onclick = () => showCrystalModal(el);
    
    return div;
}

function createSpacer() {
    const div = document.createElement('div');
    div.className = 'spacer';
    return div;
}

// CREATE ELEMENTS
function createElements() {
    gameMode = false;
    const container = document.getElementById('grid-mode');
    buildPeriodicTable(container);
}

    
function hexToRgba(hex, alpha = 0.60) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0,2), 16);
    const g = parseInt(clean.substring(2,4), 16);
    const b = parseInt(clean.substring(4,6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function showHoloPopup(e, el) {

    if (hideTimeout) clearTimeout(hideTimeout);

    const popup = document.getElementById('holo-popup');
    const groupColor = GROUP_COLORS[el.group] || "#69FAAD"
    const bgColor = hexToRgba(groupColor, 0.81);

    popup.innerHTML = `
        <div class="flex items-center gap-4 mb-3">
            <span
                class="text-7xl font-extrabold leading-none"
                style="color: #ffffff; text-shadow: 0 0 12px rgba(0,0,0, 0.8);"
                >
                ${el.symbol}
                </span>

            <div class="flex flex-col">

                <div
                    class="text-xl font-bold text-white"
                    style="text-shadow: 0 0 6px rgba(0,0,0,0.5)"
                >
                    ${el.number} — ${el.name}
                </div>

                ${
                    overlays.radius
                    ?`

                        <div
                            class="text-base font-semibold text-white mt-1"
                            style="text-shadow: 0 0 3px rgba(0,0,0,0.5);"
                        >
                            Period: ${el.period}
                        </div>

                        <div 
                            class="text-base font-semibold text-white mt-1"
                            style="text-shadow: 0 0 3px rgba(0,0,0,0.5);"

                        >
                            Atomic Radius: ${el.radius} pm
                        </div>
                    `
                    : `
                        <div
                            class="text-base font-semibold text-white mt-1"
                            style="text-shadow: 0 0 3px rgba(0,0,0,0.5);"
                        >
                            Mass: ${el.mass} u
                        </div>
                        
                        <div
                            class="text-base font-semibold text-white mt-1 capitalize"
                            style="text-shadow: 0 0 3px rgba(0,0,0,0.5);"
                        >
                            Group: ${el.group.replace(/_/g, " ")}
                         </div>
                    `
                }

            </div>
        </div>
        
        ${
            overlays.radius
            ?``
            :`
                <div
                    class="text-base font-medium leading-relaxed text-white"
                    style="text-shadow: 0 0 4px rgba(0,0,0,0.5)"
                >
                    ${el.notes}
                </div>

            `
        }
    `;


    popup.classList.remove('hidden');

    popup.style.display = "block";

    const popupRect = popup.getBoundingClientRect();

    let x = e.pageX + 100;
    let y = e.pageY - 170;

    const padding = 12;

    // Right Edge Check
    if (x + popupRect.width > window.innerWidth) {
        x = e.pageX - popupRect.width - 100;
    }

    // Left Edge Check
    if (x < padding) {
        x = padding;
    }

    // Bottom Edge Check
    if (y + popupRect.height > window.innerHeight) {
        y = window.innerHeight - popupRect.height - padding;
    }

    // Top Edge Check
    if (y < padding) {
        y = padding;
    }

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    popup.style.visibility = "visible";

    // Style
    popup.style.background = bgColor;
    popup.style.border = `3px solid rgba(255,255,255,0.9)`;
    popup.style.boxShadow = `0 0 25px ${groupColor}`;

    // Keep Popup Visible While Hovering Over
    popup.onmouseenter = () => { if (hideTimeout) clearTimeout(hideTimeout); };
    popup.onmouseleave = hideHoloPopup;
}

function refreshGrid() {
    const container = document.getElementById('game-arena');
    if (!container) return;

    container.innerHTML = '';

    switch (currentMode) {
        case "practice":
            const targetSet = new Set(gameElements.map(e => e.number));
            buildPeriodicTable(container, targetSet);
            renderElementBank(container);
            renderShuffleAndClearButtons(document.getElementById('game-controls'));
            break;

        default: buildPeriodicTable(container);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        content.style.transform = "translateX(0)";
        document.body.classList.remove("sidebar-open");
    } else {
        content.style.transform = "translateX(40px)";
        document.body.classList.add("sidebar-open");
    }
}

function openSidebarIfCollapsed () {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");

    if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        content.style.transform = "translateX(40px)";
        document.body.classList.add("sidebar-open");
    }

}

function toggleGameMode() {
    const body= document.body;

    if (gameMode) {
        resetGameMode();
        createElements();
        body.classList.remove("game-mode");
    } else { 
        console.log("starting game mode...");
        startGameMode();
        body.classList.add("game-mode");
    }
}

function resetGameMode() {
    gameMode = false;
    gameFinished = false;
    gameElements = [];
    placedElements = {};

    const container = document.getElementById('game-arena');
    container.innerHTML = '';

    tableContainer = null;
    bankContainer = null;
    controlsContainer = null;

    createElements();
}

function hideHoloPopup() {
    if (hideTimeout) clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
        const popup = document.getElementById('holo-popup');
        if (!popup) return;

        popup.classList.add('hidden');
        popup.style.display = "none";
    }, 0);
}

function renderLewisMode() {
    const arena = document.getElementById('game-arena');

    arena.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'lewis-container';

    container.innerHTML = `
        <input
            id="lewis-search"
            class="lewis-search"
            placeholder="What structure are you looking for?"
        />
        
        <div id="lewis-suggestions" class="lewis-suggestions"></div>
        
        <div id="lewis-display" class="lewis-display"></div>
    `;

    arena.appendChild(container);

    setupLewisSearch();
}

function setupLewisSearch() {
    const input = document.getElementById("lewis-search");

    input.style.width = "100%";
    input.style.maxWidth = "600px";
    input.style.fontSize = "18px";
    input.style.padding = "12px 16px";
    input.style.borderRadius = "12px";
    input.style.border = "2px solid #fff";
    input.style.outline = "none";
    input.style.boxShadow = "0 0 12px rgba(34,197,94,0.25)";

    const suggestions = document.getElementById("lewis-suggestions");
    const display = document.getElementById("lewis-display");

    const keys = Object.keys(LEWIS_DATA);

    function showLewis(key) {
        display.innerText = LEWIS_DATA[key];
    }

    keys.forEach(k => {
        const div = document.createElement("div");
        div.innerText = k.toUpperCase();

        div.style.background = "#69FAAD";
        div.style.color = "#fff";
        div.style.padding = "8px 12px";
        div.style.borderRadius = "10px";
        div.style.cursor = "pointer";
        div.style.margin = "6px 0";
        div.style.fontWeight = "600";
        div.style.boxShadow = "0 0 10px rgba(34,197,94,0.4)";
        div.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";

        div.onmouseenter = () => {
            div.style.transform = "scale(1.03)";
            div.style.boxShadow = "0 0 14px rgba(34, 197, 94, 0.7)";
        };

        div.onmouseleave = () => {
            div.style.transform = "scale(1)";
            div.style.boxShadow = "0 0 10px rgba(34,197,94,0.4)";
        };

        div.onclick = () => showLewis(k);

        suggestions.appendChild(div);
    });

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();
        suggestions.innerHTML = "";

        keys
            .filter(k => k.includes(value))
            .forEach(k=> {
                const div = document.createElement("div");
                div.innerText = k.toUpperCase();
                div.style.background = "#69FAAD";
                div.style.color = "#fff";
                div.style.padding = "8px 12px";
                div.style.borderRadius = "10px";
                div.style.cursor = "pointer";
                div.style.margin = "6px 0";
                div.style.fontWeight = "600";
                div.style.boxShadow = "0 0 10px rgba(34,197,94,0.4)";
                div.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";

                div.onmouseenter = () => {
                    div.style.transform = "scale(1.03)";
                    div.style.boxShadow = "0 0 14px rgba(34, 197, 94, 0.7)";
                };

                div.onmouseleave = () => {
                    div.style.transform = "scale(1)";
                    div.style.boxShadow = "0 0 10px rgba(34,197,94,0.4)";
                };

                div.onclick = () => showLewis(k);

                suggestions.appendChild(div);
            });


                        div.onclick = () => showLewis(k);
                        suggestions.appendChild(div);
                });
}


// function showCrystalModal(el) {
//     currentElement = el;
//     const modal = document.getElementById('modal');
//     document.getElementById('modal-title').innerHTML = `${el.number} — <span class="text-cyan-300">${el.symbol}</span> <span class="text-2xl">${el.name}</span>`;
    
//     document.getElementById('modal-notes').innerHTML = `
//         <div><strong class="text-cyan-300">Atomic Structure:</strong><br>
//             Nucleus + Electron Orbitals</div>
//             <div><strong class="text-cyan-300">Properties:</strong><br>${el.notes}</div>
//     `;

//     modal.classList.remove('hidden');

//     setTimeout(() => {
//         const container = document.getElementById('three-canvas');
//         container.innerHTML = '';

//         const width = container.clientWidth || 820;
//         const height = 460;

//         scene = new THREE.Scene();
//         camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(width, height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         container.appendChild(renderer.domElement);

//         scene.add(new THREE.AmbientLight(0x67e8f9, 1.2));

//         const light = new THREE.PointLight(0x00f5ff, 3, 200);
//         light.position.set(20, 20, 20);
//         scene.add(light);

//         const atom = new THREE.Group();

//         // NUCLEUS
//         const nucleusGeo = new THREE.SphereGeometry(2.2, 32, 32);
//         const nucleusMat = new THREE.MeshPhongMaterial({
//             color: 0x00f5ff,
//             emissive: 0x67e8f9,
//             shininess: 100
//         });

//         const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
//         atom.add(nucleus);

//         // ELECTRON ORBITS
//         const electronCount = Math.min(el.number, 20);
//         const orbitRadii = [4, 6, 8];

//         let electronsPlaced = 0;

//         orbitRadii.forEach((radius, orbitIndex) => {
//             const orbit = new THREE.RingGeometry(radius, radius + 0.05, 64);
//             const orbitMat = new THREE.MeshBasicMaterial({
//                 color: 0x67e8f9,
//                 side: THREE.DoubleSide,
//                 transparent: true,
//                 opacity: 0.4
//             });

//             const ring = new THREE.Mesh(orbit, orbitMat);
//             ring.rotation.x = Math.PI / 2;
//             atom.add(ring);

//             const electronsInOrbit = Math.min(electronCount - electronsPlaced, 8);

//             for (let i = 0; i < electronsInOrbit; i++) {
//                 const angle = (i / electronsInOrbit) * Math.PI * 2;

//                 const electronGeo = new THREE.SphereGeometry(0.35,16, 16);
//                 const electronMat = new THREE.MeshBasicMaterial({ color: 0xffffff});

//                 const electron = new THREE.Mesh(electronGeo, electronMat);
//                 electron.userData = { angle, radius, speed: 0.01 + Math.random() * 0.01 };

//                 electron.position.x = Math.cos(angle) * radius;
//                 electron.position.z = Math.sin(angle) * radius;

//                 atom.add(electron);
//             }

//             electronsPlaced += electronsInOrbit;
//         });
//         scene.add(atom);
//         camera.position.set(0, 6, 18);
//         camera.lookAt(0, 0, 0);

//         function animate () {
//         animationFrameId = requestAnimationFrame(animate);

//         atom.rotation.y += 0.002;

//         atom.children.forEach(obj => {
//             if (obj.userData?.angle !== undefined) {
//                 obj.userData.angle += obj.userData.speed;
//                 obj.position.x = Math.cos(obj.userData.angle) * obj.userData.radius;
//                 obj.position.z = Math.sin(obj.userData.angle) * obj.userData.radius;
//             }
//         });

//         renderer.render(scene, camera);
//     }

//     console.log("Scene created:", scene);
//     console.log("Atom children:", atom.children.length);

//     animate();
// }, 80);
// }

// function closeModal() {
//     const modal = document.getElementById('modal');
//     modal.classList.add('hidden');
//     if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     if (renderer) renderer.dispose();
//     currentElement = null;
// }


window.onload =  function () {


    document.addEventListener('click', (e) => {
        const modeEl = e.target.closest('[data-mode]');
        if (modeEl) {
            console.log("mode:", modeEl.dataset.mode);
            setMode(modeEl.dataset.mode);
            return;
        }

        const overlayEl = e.target.closest('[data-overlay]');
        if (overlayEl) {
            console.log("overlay:", overlayEl.dataset.overlay);
            toggleOverlay(overlayEl.dataset.overlay);
            return;
        }
    });

    renderPolyProgHome();
};


