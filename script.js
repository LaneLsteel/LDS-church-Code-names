// 1. DATA WITH DIFFICULTY TAGS (1=Easy, 2=Med, 3=Hard)
const wordPacks = {
    bom: {
        label: "Book of Mormon",
        people: [{w:"Nephi",d:1},{w:"Lehi",d:1},{w:"Sariah",d:1},{w:"Samuel",d:1},{w:"Enos",d:1},{w:"Abinadi",d:2},{w:"Alma",d:1},{w:"Amulek",d:2},{w:"Zeezrom",d:3},{w:"Lamoni",d:2},{w:"Ammon",d:1},{w:"Aaron",d:2},{w:"Mormon",d:1},{w:"Moroni",d:1},{w:"Ether",d:2},{w:"Brother of Jared",d:2},{w:"Coriantumr",d:3},{w:"Shiz",d:3},{w:"Helaman",d:2},{w:"Teancum",d:3}],
        places: [{w:"Zarahemla",d:1},{w:"Bountiful",d:1},{w:"Cumorah",d:1},{w:"Land of Nephi",d:1},{w:"Sidon River",d:2},{w:"Manti",d:2},{w:"Nahom",d:3},{w:"Valley of Lemuel",d:2},{w:"Irreantum",d:3}],
        things: [{w:"Liahona",d:1},{w:"Iron Rod",d:1},{w:"Gold Plates",d:1},{w:"Title of Liberty",d:2},{w:"Rameumptom",d:2},{w:"Urim and Thummim",d:2},{w:"Sword of Laban",d:2},{w:"Deseret",d:2}],
        mastery: [{w:"Adam fell",d:1},{w:"Search the scriptures",d:1},{w:"Faith",d:1},{w:"Charity",d:1},{w:"Natural Man",d:2},{w:"Small and Simple",d:2},{w:"Plain and Precious",d:3}]
    },
    ot: {
        label: "Old Testament",
        people: [{w:"Adam",d:1},{w:"Eve",d:1},{w:"Noah",d:1},{w:"Abraham",d:1},{w:"Sarah",d:1},{w:"Isaac",d:1},{w:"Joseph",d:1},{w:"Moses",d:1},{w:"Miriam",d:2},{w:"Joshua",d:2},{w:"Deborah",d:3},{w:"Gideon",d:2},{w:"Samson",d:1},{w:"Ruth",d:1},{w:"Samuel",d:1}],
        places: [{w:"Eden",d:1},{w:"Ararat",d:2},{w:"Egypt",d:1},{w:"Red Sea",d:1},{w:"Sinai",d:2},{w:"Jericho",d:2},{w:"Jerusalem",d:1},{w:"Babylon",d:2},{w:"Nineveh",d:2},{w:"Sodom",d:2}],
        things: [{w:"Ark",d:1},{w:"Manna",d:2},{w:"Tabernacle",d:2},{w:"Burning Bush",d:1},{w:"Stone Tablets",d:1},{w:"Staff",d:1},{w:"Sling",d:1}],
        mastery: [{w:"Image of God",d:1},{w:"Sabbath",d:1},{w:"Commandments",d:1},{w:"Trust",d:2},{w:"Watchman",d:3}]
    },
    nt: {
        label: "New Testament",
        people: [{w:"Jesus",d:1},{w:"Mary",d:1},{w:"Joseph",d:1},{w:"John the Baptist",d:1},{w:"Peter",d:1},{w:"James",d:1},{w:"John",d:1},{w:"Matthew",d:1},{w:"Thomas",d:2},{w:"Judas",d:1},{w:"Nicodemus",d:2},{w:"Zacchaeus",d:1},{w:"Lazarus",d:1}],
        places: [{w:"Bethlehem",d:1},{w:"Nazareth",d:1},{w:"Galilee",d:1},{w:"Jordan River",d:1},{w:"Gethsemane",d:1},{w:"Calvary",d:1},{w:"Damascus",d:2},{w:"Ephesus",d:3}],
        things: [{w:"Manger",d:1},{w:"Cross",d:1},{w:"Crown of Thorns",d:1},{w:"Loaves",d:2},{w:"Fishes",d:2}],
        mastery: [{w:"Born Again",d:1},{w:"Light of World",d:1},{w:"Atonement",d:1},{w:"Grace",d:2},{w:"Armor of God",d:2}]
    },
    dc: {
        label: "Doctrine & Covenants",
        people: [{w:"Joseph Smith",d:1},{w:"Emma Smith",d:1},{w:"Hyrum Smith",d:1},{w:"Oliver Cowdery",d:2},{w:"Martin Harris",d:2},{w:"David Whitmer",d:2},{w:"Sidney Rigdon",d:3}],
        places: [{w:"Palmyra",d:1},{w:"Sacred Grove",d:1},{w:"Kirtland",d:2},{w:"Independence",d:2},{w:"Liberty Jail",d:2},{w:"Nauvoo",d:2},{w:"Carthage Jail",d:2}],
        things: [{w:"Manuscript",d:2},{w:"Printing Press",d:2},{w:"Keys",d:1},{w:"Sections",d:1},{w:"Standard Works",d:1}],
        mastery: [{w:"Ask in Faith",d:1},{w:"Word of Wisdom",d:1},{w:"Worth of souls",d:2},{w:"Priesthood keys",d:2},{w:"Celestial",d:1}]
    },
    pgp: {
        label: "Pearl of Great Price",
        people: [{w:"Enoch",d:2},{w:"Abraham",d:1},{w:"Moses",d:1},{w:"Kolob",d:2}],
        places: [{w:"Egypt",d:1},{w:"Chaldea",d:3},{w:"Stars",d:1}],
        things: [{w:"Papyrus",d:2},{w:"Facsimile",d:3},{w:"Articles of Faith",d:1}]
    }
};

let currentTurn = 'red'; 
let timerInterval;
let seconds = 60;

// 2. SETUP PAGE LOGIC
function buildWordManager() {
    const container = document.getElementById('word-pack-container');
    if (!container) return;
    document.getElementById('teamRedName').value = localStorage.getItem('teamRedName') || "Red Team";
    document.getElementById('teamBlueName').value = localStorage.getItem('teamBlueName') || "Blue Team";

    for (let packKey in wordPacks) {
        const pack = wordPacks[packKey];
        let mainHeader = document.createElement('div');
        mainHeader.className = 'main-cat';
        mainHeader.innerHTML = `<strong>${pack.label}</strong>`;
        mainHeader.onclick = () => toggleVisibility(`sub-${packKey}`);
        container.appendChild(mainHeader);

        let subContainer = document.createElement('div');
        subContainer.id = `sub-${packKey}`;
        subContainer.className = 'sub-container';
        subContainer.style.display = 'none';
        
        ["people", "places", "things", "mastery"].forEach(subType => {
            if(!pack[subType]) return;
            let subHeader = document.createElement('div');
            subHeader.className = 'sub-header';
            let listId = `list-${packKey}-${subType}`;
            let displayTitle = subType === 'mastery' ? "SCRIPTURE MASTERY" : subType.toUpperCase();
            
            subHeader.innerHTML = `<span>${displayTitle}</span> <input type="checkbox" checked class="type-toggle" onclick="toggleCategory(this, '${listId}')">`;
            subHeader.onclick = (e) => { if(e.target.type !== 'checkbox') toggleVisibility(listId); };
            
            let wordGrid = document.createElement('div');
            wordGrid.id = listId;
            wordGrid.className = 'word-grid';
            wordGrid.style.display = 'none';

            pack[subType].forEach(wordObj => {
                let wordBox = document.createElement('div');
                wordBox.className = 'word-option';
                wordBox.innerHTML = `<input type="checkbox" checked class="word-check" data-word="${wordObj.w}" data-level="${wordObj.d}"> ${wordObj.w}`;
                wordGrid.appendChild(wordBox);
            });
            subContainer.appendChild(subHeader);
            subContainer.appendChild(wordGrid);
        });
        container.appendChild(subContainer);
    }
}

function toggleCategory(masterCheckbox, listId) {
    const checkboxes = document.querySelectorAll(`#${listId} .word-check`);
    checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
}

function clearAll() {
    document.querySelectorAll('.word-check').forEach(cb => cb.checked = false);
    document.querySelectorAll('.type-toggle').forEach(cb => cb.checked = false);
}

function toggleVisibility(id) {
    const el = document.getElementById(id);
    if(el) el.style.display = (el.style.display === 'none') ? 'block' : 'none';
}

function randomAll() {
    clearAll();
    const allBoxes = Array.from(document.querySelectorAll('.word-check'));
    const shuffled = allBoxes.sort(() => 0.5 - Math.random());
    for(let i=0; i < 60; i++) { if(shuffled[i]) shuffled[i].checked = true; }
}

function saveSettings() {
    localStorage.setItem('gridSize', document.getElementById('gridSize').value);
    localStorage.setItem('teamRedName', document.getElementById('teamRedName').value || "Red Team");
    localStorage.setItem('teamBlueName', document.getElementById('teamBlueName').value || "Blue Team");
    
    // Save words AND their difficulty levels as objects
    let activeWords = [];
    document.querySelectorAll('.word-check:checked').forEach(cb => {
        activeWords.push({w: cb.getAttribute('data-word'), d: parseInt(cb.getAttribute('data-level'))});
    });
    localStorage.setItem('activeWords', JSON.stringify(activeWords));
}

// 3. GAME PAGE LOGIC
function loadGame() {
    const board = document.getElementById('game-board');
    if (!board) return;

    const teamRed = localStorage.getItem('teamRedName') || "Red Team";
    const teamBlue = localStorage.getItem('teamBlueName') || "Blue Team";
    document.getElementById('red-team-display').innerText = teamRed;
    document.getElementById('blue-team-display').innerText = teamBlue;

    const gridSize = parseInt(localStorage.getItem('gridSize')) || 5;
    const allSelectedWords = JSON.parse(localStorage.getItem('activeWords') || "[]"); 
    const maxDiff = parseInt(document.getElementById('difficulty-select')?.value || 2);

    // FIX: Filter by difficulty correctly
    let filteredWords = allSelectedWords
        .filter(obj => obj.d <= maxDiff)
        .map(obj => obj.w);

    if (filteredWords.length < (gridSize * gridSize)) {
        board.innerHTML = `<h2 style='grid-column: 1/-1; text-align:center;'>Not enough words found for Level ${maxDiff}. <br>Please go to SETUP and pick more Level 1 or 2 words!</h2>`;
        return;
    }

    let gameWords = filteredWords.sort(() => 0.5 - Math.random()).slice(0, gridSize * gridSize);
    
    // ROLES GENERATION
    let roles = ["assassin"];
    let redN = Math.floor((gridSize * gridSize) / 3) + 1;
    let blueN = Math.floor((gridSize * gridSize) / 3);
    for(let i=0; i<redN; i++) roles.push("red");
    for(let i=0; i<blueN; i++) roles.push("blue");
    while(roles.length < (gridSize * gridSize)) roles.push("neutral");
    roles = roles.sort(() => 0.5 - Math.random());

    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    board.innerHTML = '';
    window.currentGameData = [];

    gameWords.forEach((word, i) => {
        let role = roles[i];
        window.currentGameData.push({ word, role, revealed: false });
        let card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${i}`;
        card.innerText = word;
        card.onclick = () => {
            if(window.currentGameData[i].revealed) return;
            window.currentGameData[i].revealed = true;
            card.classList.add('revealed', role);
            
            if(role === 'assassin') {
                playSound('sound-fail');
                showGameOver();
            } else if (role === 'neutral') {
                toggleTurn();
                updateGameScore();
            } else {
                if (role === currentTurn) {
                    playSound('sound-correct');
                } else {
                    toggleTurn(); // Hit opponent's card
                }
                updateGameScore();
            }
        };
        board.appendChild(card);
    });
    
    currentTurn = 'red';
    updateGameScore();
    generateSpymasterQR();
    startTimer();
}

function playSound(id) {
    const s = document.getElementById(id);
    if(s) { s.currentTime = 0; s.play(); }
}

function startTimer() {
    if(timerInterval) clearInterval(timerInterval);
    seconds = 60;
    const timerEl = document.getElementById('timer');
    if(timerEl) {
        timerEl.innerText = "60s";
        timerEl.classList.remove('low-time');
    }
    
    timerInterval = setInterval(() => {
        seconds--;
        if(timerEl) {
            timerEl.innerText = seconds + "s";
            if(seconds <= 10) timerEl.classList.add('low-time');
        }
        if(seconds <= 0) toggleTurn();
    }, 1000);
}

function toggleTurn() {
    currentTurn = (currentTurn === 'red') ? 'blue' : 'red';
    startTimer();
    applyTurnGlow();
}

function applyTurnGlow() {
    const redBox = document.querySelector('.red-score');
    const blueBox = document.querySelector('.blue-score');
    if(!redBox || !blueBox) return;
    redBox.classList.remove('active-team');
    blueBox.classList.remove('active-team');
    if (currentTurn === 'red') { redBox.classList.add('active-team'); } 
    else { blueBox.classList.add('active-team'); }
}

function updateGameScore() {
    if (!window.currentGameData) return;
    const r = window.currentGameData.filter(d => d.role === 'red' && !d.revealed).length;
    const b = window.currentGameData.filter(d => d.role === 'blue' && !d.revealed).length;
    document.getElementById('red-count').innerText = r;
    document.getElementById('blue-count').innerText = b;
    applyTurnGlow();

    if (r === 0) {
        playSound('sound-win');
        showWinner(localStorage.getItem('teamRedName') || "Red Team");
    } else if (b === 0) {
        playSound('sound-win');
        showWinner(localStorage.getItem('teamBlueName') || "Blue Team");
    }
}

function showWinner(name) {
    clearInterval(timerInterval);
    document.getElementById('winner-name').innerText = name;
    document.getElementById('winner-overlay').style.display = 'flex';
}

function showGameOver() {
    clearInterval(timerInterval);
    const loser = currentTurn === 'red' ? (localStorage.getItem('teamRedName') || "Red Team") : (localStorage.getItem('teamBlueName') || "Blue Team");
    document.getElementById('loser-name').innerText = loser;
    document.getElementById('game-over-overlay').style.display = 'flex';
}

function generateSpymasterQR() {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer || typeof QRCode === "undefined") return;
    let layout = window.currentGameData.map(d => d.role[0].toUpperCase()).join('').replace('A', 'X');
    const url = window.location.origin + window.location.pathname.replace('game.html', 'key.html') + "?layout=" + layout;
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { text: url, width: 140, height: 140 });
}

function toggleSpy(show) {
    window.currentGameData.forEach((data, i) => {
        const card = document.getElementById(`card-${i}`);
        if (!data.revealed) {
            show ? card.classList.add('peek', `${data.role}-key`) : card.classList.remove('peek', 'red-key', 'blue-key', 'neutral-key', 'assassin-key');
        }
    });
}

// 4. INITIALIZATION
if (document.getElementById('word-pack-container')) buildWordManager();
if (document.getElementById('game-board')) loadGame();