// 1. GLOBAL STATE
let currentTurn = 'red';
let timerInterval;
let seconds = 60;
window.currentGameData = [];

// 2. DATA WITH ARTICLES OF FAITH ADDED
const wordPacks = {
    bom: {
        label: "Book of Mormon",
        people: [{w:"Nephi",d:1},{w:"Lehi",d:1},{w:"Sariah",d:1},{w:"Samuel",d:1},{w:"Enos",d:1},{w:"Abinadi",d:2},{w:"Alma",d:1},{w:"Amulek",d:2},{w:"Zeezrom",d:3},{w:"Lamoni",d:2},{w:"Ammon",d:1},{w:"Aaron",d:2},{w:"Mormon",d:1},{w:"Moroni",d:1},{w:"Ether",d:2},{w:"Brother of Jared",d:2},{w:"Coriantumr",d:3},{w:"Shiz",d:3},{w:"Helaman",d:2},{w:"Teancum",d:3}],
        places: [{w:"Zarahemla",d:1},{w:"Bountiful",d:1},{w:"Cumorah",d:1},{w:"Land of Nephi",d:1},{w:"Sidon River",d:2},{w:"Manti",d:2},{w:"Nahom",d:3},{w:"Valley of Lemuel",d:2},{w:"Irreantum",d:3}],
        things: [{w:"Liahona",d:1},{w:"Iron Rod",d:1},{w:"Gold Plates",d:1},{w:"Title of Liberty",d:2},{w:"Rameumptom",d:2},{w:"Urim and Thummim",d:2},{w:"Sword of Laban",d:2},{w:"Deseret",d:2}],
        mastery: [
            {w:"Go and Do",d:1},{w:"Free to Choose",d:1},{w:"Adam Fell",d:1},{w:"Heart and Mind",d:1},{w:"Natural Man",d:2},{w:"Atonement",d:1},{w:"Baptismal Covenant",d:1},{w:"No Other Name",d:1},{w:"Faith in Jesus",d:1},{w:"Infinite Atonement",d:2},{w:"Search the Scriptures",d:1},{w:"Witnesses",d:2},{w:"Plain and Precious",d:2},{w:"Spirit of Lord",d:2},{w:"Small and Simple",d:1},{w:"Faith as a Seed",d:2},{w:"Charity",d:1},{w:"Weakness to Strength",d:1},{w:"Anchor for Souls",d:2},{w:"Doctrine of Christ",d:2},{w:"Come unto Christ",d:1},{w:"Pray Always",d:1},{w:"Spiritual Knowledge",d:2},{w:"Heal the Sick",d:2},{w:"Moroni's Promise",d:1}
        ],
        references: [
            {w:"1 Nephi 3:7",d:1},{w:"2 Nephi 2:25",d:1},{w:"2 Nephi 2:27",d:2},{w:"2 Nephi 26:33",d:2},{w:"2 Nephi 28:30",d:3},{w:"2 Nephi 32:3",d:1},{w:"2 Nephi 32:8-9",d:2},{w:"Mosiah 2:17",d:1},{w:"Mosiah 3:19",d:2},{w:"Mosiah 4:30",d:3},{w:"Mosiah 18:8-10",d:2},{w:"Alma 7:11-13",d:2},{w:"Alma 32:21",d:1},{w:"Alma 37:6-7",d:2},{w:"Alma 37:35",d:1},{w:"Alma 39:9",d:3},{w:"Alma 41:10",d:2},{w:"Helaman 5:12",d:1},{w:"3 Nephi 11:10-11",d:1},{w:"3 Nephi 12:48",d:2},{w:"3 Nephi 18:15",d:2},{w:"3 Nephi 27:20",d:2},{w:"Ether 12:6",d:1},{w:"Ether 12:27",d:1},{w:"Moroni 7:45-48",d:2},{w:"Moroni 10:4-5",d:1}
        ]
    },
    ot: {
        label: "Old Testament",
        people: [{w:"Adam",d:1},{w:"Eve",d:1},{w:"Noah",d:1},{w:"Abraham",d:1},{w:"Sarah",d:1},{w:"Isaac",d:1},{w:"Joseph",d:1},{w:"Moses",d:1},{w:"Miriam",d:2},{w:"Joshua",d:2},{w:"Deborah",d:3},{w:"Gideon",d:2},{w:"Samson",d:1},{w:"Ruth",d:1},{w:"Samuel",d:1}],
        places: [{w:"Eden",d:1},{w:"Ararat",d:2},{w:"Egypt",d:1},{w:"Red Sea",d:1},{w:"Sinai",d:2},{w:"Jericho",d:2},{w:"Jerusalem",d:1},{w:"Babylon",d:2},{w:"Nineveh",d:2},{w:"Sodom",d:2}],
        things: [{w:"Ark",d:1},{w:"Manna",d:2},{w:"Tabernacle",d:2},{w:"Burning Bush",d:1},{w:"Stone Tablets",d:1},{w:"Staff",d:1},{w:"Sling",d:1}],
        mastery: [
            {w:"Image of God",d:1},{w:"Sabbath Day",d:1},{w:"Temptation",d:1},{w:"Commandments",d:1},{w:"Trust in Lord",d:1},{w:"Fear of Lord",d:2},{w:"Scarlet to Snow",d:2},{w:"Marvelous Work",d:2},{w:"Watchman",d:3},{w:"Tithes",d:1},{w:"Turning Hearts",d:2},{w:"Choice to Serve",d:1},{w:"Priesthood",d:1},{w:"Atoning Sacrifice",d:2},{w:"Spirit of Prophecy",d:2},{w:"Creation",d:1},{w:"Covenant",d:2},{w:"Greatest Miracle",d:2},{w:"Still Small Voice",d:2},{w:"Holy Hill",d:3},{w:"Strength",d:1},{w:"Peace",d:1},{w:"Gathering",d:2},{w:"New Heart",d:3},{w:"Standard",d:3}
        ],
        references: [
            {w:"Moses 1:39",d:2},{w:"Moses 7:18",d:3},{w:"Abraham 3:22",d:2},{w:"Gen 1:26-27",d:1},{w:"Gen 2:24",d:1},{w:"Gen 39:9",d:2},{w:"Ex 19:5-6",d:2},{w:"Ex 20:3-17",d:1},{w:"Joshua 24:15",d:1},{w:"Psalm 24:3-4",d:2},{w:"Prov 3:5-6",d:1},{w:"Isaiah 1:18",d:2},{w:"Isaiah 5:20",d:2},{w:"Isaiah 29:13",d:2},{w:"Isaiah 53:3-5",d:3},{w:"Isaiah 58:6-7",d:3},{w:"Isaiah 58:13-14",d:2},{w:"Jer 1:4-5",d:3},{w:"Ezekiel 3:17",d:3},{w:"Ezekiel 37:15",d:2},{w:"Daniel 2:44",d:3},{w:"Amos 3:7",d:1},{w:"Malachi 3:8-10",d:1},{w:"Malachi 4:5-6",d:1}
        ]
    },
    nt: {
        label: "New Testament",
        people: [{w:"Jesus",d:1},{w:"Mary",d:1},{w:"Joseph",d:1},{w:"John the Baptist",d:1},{w:"Peter",d:1},{w:"James",d:1},{w:"John",d:1},{w:"Matthew",d:1},{w:"Thomas",d:2},{w:"Judas",d:1},{w:"Nicodemus",d:2},{w:"Zacchaeus",d:1},{w:"Lazarus",d:1}],
        places: [{w:"Bethlehem",d:1},{w:"Nazareth",d:1},{w:"Galilee",d:1},{w:"Jordan River",d:1},{w:"Gethsemane",d:1},{w:"Calvary",d:1},{w:"Damascus",d:2},{w:"Ephesus",d:3}],
        things: [{w:"Manger",d:1},{w:"Cross",d:1},{w:"Crown of Thorns",d:1},{w:"Loaves",d:2},{w:"Fishes",d:2}],
        mastery: [
            {w:"Born Again",d:1},{w:"Light of World",d:1},{w:"One Sheep",d:1},{w:"True Witness",d:2},{w:"Holy Ghost",d:1},{w:"Body is Temple",d:1},{w:"Grace",d:2},{w:"Armor of God",d:1},{w:"Pure Religion",d:2},{w:"Judge Dead",d:3},{w:"Resurrection",d:1},{w:"Foundation",d:1},{w:"Rest",d:1},{w:"Love Lord",d:1},{w:"Priesthood keys",d:2},{w:"Baptism",d:1},{w:"Living Water",d:2},{w:"Bread of Life",d:2},{w:"Gospel",d:1},{w:"Works",d:2},{w:"Endure",d:1},{w:"Second Coming",d:2},{w:"Faith",d:1},{w:"Good Samaritan",d:1},{w:"Prodigal Son",d:1}
        ],
        references: [
            {w:"Matt 5:14-16",d:1},{w:"Matt 11:28-30",d:1},{w:"Matt 16:15-19",d:2},{w:"Matt 22:36-39",d:1},{w:"Luke 24:36-39",d:2},{w:"John 3:5",d:1},{w:"John 3:16",d:1},{w:"John 7:17",d:2},{w:"John 14:15",d:1},{w:"John 15:16",d:2},{w:"John 17:3",d:2},{w:"Acts 2:38",d:1},{w:"Acts 3:19-21",d:3},{w:"1 Cor 2:5",d:3},{w:"1 Cor 6:19-20",d:1},{w:"1 Cor 15:20",d:2},{w:"1 Cor 15:40",d:2},{w:"Eph 2:19-20",d:2},{w:"Eph 4:11-14",d:2},{w:"2 Thess 2:1-3",d:3},{w:"2 Tim 3:15",d:2},{w:"Heb 12:9",d:2},{w:"James 1:5-6",d:1},{w:"James 2:17",d:1},{w:"1 Peter 4:6",d:3}
        ]
    },
    dc: {
        label: "Doctrine & Covenants",
        people: [{w:"Joseph Smith",d:1},{w:"Emma Smith",d:1},{w:"Hyrum Smith",d:1},{w:"Oliver Cowdery",d:2},{w:"Martin Harris",d:2},{w:"David Whitmer",d:2},{w:"Sidney Rigdon",d:3}],
        places: [{w:"Palmyra",d:1},{w:"Sacred Grove",d:1},{w:"Kirtland",d:2},{w:"Independence",d:2},{w:"Liberty Jail",d:2},{w:"Nauvoo",d:2},{w:"Carthage Jail",d:2}],
        things: [{w:"Manuscript",d:2},{w:"Printing Press",d:2},{w:"Keys",d:1},{w:"Sections",d:1},{w:"Standard Works",d:1}],
        mastery: [
            {w:"Voice of Warning",d:2},{w:"Worth of Souls",d:1},{w:"Ask in Faith",d:1},{w:"Power to Bless",d:1},{w:"Forgiveness",d:1},{w:"Word of Wisdom",d:1},{w:"Marriage",d:1},{w:"Priesthood keys",d:2},{w:"Gathering",d:2},{w:"Zion",d:2},{w:"Celestial",d:1},{w:"Tithing",d:1},{w:"Spirit of Lord",d:2},{w:"Search D&C",d:2},{w:"Missionaries",d:1},{w:"Sacrament",d:1},{w:"Temple",d:1},{w:"Ordinances",d:2},{w:"Testimony",d:1},{w:"Standard",d:3},{w:"Revelation",d:2},{w:"Heal",d:2},{w:"Small things",d:1},{w:"Pure in Heart",d:2},{w:"Law of Sacrifice",d:2}
        ],
        references: [
            {w:"D&C 1:37-38",d:2},{w:"D&C 6:36",d:1},{w:"D&C 8:2-3",d:2},{w:"D&C 13:1",d:1},{w:"D&C 18:10-11",d:1},{w:"D&C 18:15-16",d:1},{w:"D&C 19:16-19",d:2},{w:"D&C 19:23",d:2},{w:"D&C 25:13",d:2},{w:"D&C 42:11",d:3},{w:"D&C 58:42-43",d:2},{w:"D&C 64:9-11",d:2},{w:"D&C 76:22-24",d:2},{w:"D&C 82:10",d:1},{w:"D&C 84:33-39",d:3},{w:"D&C 88:118",d:2},{w:"D&C 89:18-21",d:1},{w:"D&C 107:8",d:3},{w:"D&C 121:36",d:3},{w:"D&C 130:22",d:1},{w:"D&C 131:1-4",d:2},{w:"D&C 135:3",d:2}
        ]
    },
    pgp: {
        label: "Pearl of Great Price",
        people: [{w:"Enoch",d:2},{w:"Abraham",d:1},{w:"Moses",d:1},{w:"Kolob",d:2}],
        places: [{w:"Egypt",d:1},{w:"Chaldea",d:3},{w:"Stars",d:1}],
        things: [{w:"Papyrus",d:2},{w:"Facsimile",d:3}],
        mastery: [
            {w:"Godhead",d:1},{w:"Punished for Sins",d:1},{w:"Atonement",d:1},{w:"First Principles",d:1},{w:"Called of God",d:1},{w:"Organization",d:2},{w:"Gifts of Spirit",d:1},{w:"Bible and BoM",d:1},{w:"Gathering of Israel",d:1},{w:"Worship",d:1},{w:"Kings/Presidents",d:1},{w:"Law/Obedience",d:1},{w:"Honest/Virtuous",d:1}
        ],
        references: [
            {w:"AOF 1:1",d:1},{w:"AOF 1:2",d:1},{w:"AOF 1:3",d:1},{w:"AOF 1:4",d:1},{w:"AOF 1:5",d:1},{w:"AOF 1:6",d:1},{w:"AOF 1:7",d:1},{w:"AOF 1:8",d:1},{w:"AOF 1:9",d:1},{w:"AOF 1:10",d:1},{w:"AOF 1:11",d:1},{w:"AOF 1:12",d:1},{w:"AOF 1:13",d:1}
        ]
    },
    mp: {
        label: "Modern Prophets & Apostles",
        prophets: [
            {w:"Joseph Smith",d:1},{w:"Brigham Young",d:1},{w:"John Taylor",d:2},{w:"Wilford Woodruff",d:2},
            {w:"Lorenzo Snow",d:3},{w:"Joseph F. Smith",d:2},{w:"Heber J. Grant",d:3},{w:"George Albert Smith",d:3},
            {w:"David O. McKay",d:2},{w:"Joseph Fielding Smith",d:2},{w:"Harold B. Lee",d:3},{w:"Spencer W. Kimball",d:2},
            {w:"Ezra Taft Benson",d:2},{w:"Howard W. Hunter",d:3},{w:"Gordon B. Hinckley",d:1},{w:"Thomas S. Monson",d:1},
            {w:"Russell M. Nelson",d:1}
        ],
        apostles: [
            {w:"Dallin H. Oaks",d:1},{w:"Jeffrey R. Holland",d:1},{w:"Dieter F. Uchtdorf",d:1},{w:"David A. Bednar",d:1},
            {w:"Quentin L. Cook",d:2},{w:"Todd Christofferson",d:2},{w:"Neil L. Andersen",d:2},{w:"Ronald A. Rasband",d:2},
            {w:"Gary E. Stevenson",d:2},{w:"Dale G. Renlund",d:2},{w:"Gerrit W. Gong",d:2},{w:"Ulisses Soares",d:2},
            {w:"Patrick Kearon",d:2}
        ]
    }
};

// 3. SETUP PAGE LOGIC
function buildWordManager() {
    const container = document.getElementById('word-pack-container');
    if (!container) return;
    container.innerHTML = '';

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
        
        ["people", "places", "things", "mastery", "references", "prophets", "apostles"].forEach(subType => {
            if(!pack[subType]) return;
            
            let listId = `list-${packKey}-${subType}`;
            let displayTitle = "";
            
            // Contextual labeling for Mastery/References/AOF
            if (packKey === 'pgp' && subType === 'mastery') displayTitle = "AOF THEMES";
            else if (packKey === 'pgp' && subType === 'references') displayTitle = "AOF REFERENCES";
            else if (subType === 'mastery') displayTitle = "MASTERY THEMES";
            else if (subType === 'references') displayTitle = "MASTERY REFERENCES";
            else displayTitle = subType.toUpperCase();
            
            let subHeader = document.createElement('div');
            subHeader.className = 'sub-header';
            subHeader.onclick = (e) => {
                if(e.target.type !== 'checkbox') toggleVisibility(listId);
            };
            
            subHeader.innerHTML = `
                <span>${displayTitle}</span> 
                <input type="checkbox" checked class="type-toggle" onclick="toggleCategory(this, '${listId}')">
            `;
            
            let wordGrid = document.createElement('div');
            wordGrid.id = listId;
            wordGrid.className = 'word-grid';
            wordGrid.style.display = 'none';

            pack[subType].forEach(wordObj => {
                let wordBox = document.createElement('div');
                wordBox.className = 'word-option';
                wordBox.setAttribute('data-level', wordObj.d);
                wordBox.innerHTML = `
                    <input type="checkbox" checked class="word-check" 
                    data-word="${wordObj.w}" data-level="${wordObj.d}" 
                    onchange="updateStartButton()"> ${wordObj.w}
                `;
                wordGrid.appendChild(wordBox);
            });
            
            subContainer.appendChild(subHeader);
            subContainer.appendChild(wordGrid);
        });
        container.appendChild(subContainer);
    }
}

// Fixed Toggle Function to handle showing/hiding names
function toggleVisibility(id) {
    const el = document.getElementById(id);
    if(el) {
        if (el.style.display === 'none' || el.style.display === '') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    }
}

function refreshWordVisibility() {
    const diffEl = document.getElementById('difficulty-select');
    if (!diffEl) return;
    const maxDiff = parseInt(diffEl.value);
    document.querySelectorAll('.word-option').forEach(opt => {
        const level = parseInt(opt.getAttribute('data-level'));
        const input = opt.querySelector('input');
        if (level > maxDiff) {
            opt.classList.add('difficulty-hidden');
            input.disabled = true;
            input.checked = false;
        } else {
            opt.classList.remove('difficulty-hidden');
            input.disabled = false;
        }
    });
    updateStartButton();
}

function updateStartButton() {
    const startBtn = document.getElementById('start-mission-btn');
    const gridInput = document.getElementById('gridSize');
    if(!startBtn || !gridInput) return;
    const gridSize = parseInt(gridInput.value);
    const required = gridSize * gridSize;
    const count = document.querySelectorAll('.word-check:checked:not(:disabled)').length;
    startBtn.innerText = `🚀 START MISSION (${count}/${required})`;
    startBtn.disabled = count < required;
    startBtn.style.opacity = count < required ? "0.5" : "1";
}

// 4. GAME PAGE LOGIC
function loadGame() {
    const board = document.getElementById('game-board');
    if (!board) return;

    document.getElementById('red-team-display').innerText = localStorage.getItem('teamRedName') || "RED TEAM";
    document.getElementById('blue-team-display').innerText = localStorage.getItem('teamBlueName') || "BLUE TEAM";

    const maxDiff = localStorage.getItem('gameDifficulty') || "2";
    const labels = {"1": "EASY (PRIMARY)", "2": "NORMAL (SEMINARY)", "3": "HARD (SCHOLAR)"};
    const diffDisplay = document.getElementById('difficulty-display');
    if(diffDisplay) diffDisplay.innerText = `INTEL LEVEL: ${labels[maxDiff]}`;

    const gridSize = parseInt(localStorage.getItem('gridSize')) || 5;
    const allSelectedWords = JSON.parse(localStorage.getItem('activeWords') || "[]"); 
    let gameWords = allSelectedWords.sort(() => 0.5 - Math.random()).slice(0, gridSize * gridSize);
    
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

    gameWords.forEach((wordObj, i) => {
        let role = roles[i];
        window.currentGameData.push({ word: wordObj.w, role, revealed: false });
        let card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${i}`;
        card.innerText = wordObj.w;
        card.onclick = () => {
            if(window.currentGameData[i].revealed) return;
            window.currentGameData[i].revealed = true;
            card.classList.add('revealed', role);
            
            if(role === 'assassin') {
                playSound('sound-fail');
                showGameOver();
            } else if (role === 'neutral') {
                toggleTurn();
            } else {
                if (role !== currentTurn) {
                    toggleTurn();
                } else {
                    playSound('sound-correct');
                }
            }
            updateGameScore();
        };
        board.appendChild(card);
    });
    
    currentTurn = 'red';
    updateGameScore();
    generateSpymasterQR();
    startTimer();
}

function updateGameScore() {
    if (!window.currentGameData || !window.currentGameData.length) return;
    const r = window.currentGameData.filter(d => d.role === 'red' && !d.revealed).length;
    const b = window.currentGameData.filter(d => d.role === 'blue' && !d.revealed).length;
    
    const redCount = document.getElementById('red-count');
    const blueCount = document.getElementById('blue-count');
    if(redCount) redCount.innerText = r;
    if(blueCount) blueCount.innerText = b;

    applyTurnGlow();

    if (r === 0) { playSound('sound-win'); showWinner(localStorage.getItem('teamRedName') || "Red Team"); }
    else if (b === 0) { playSound('sound-win'); showWinner(localStorage.getItem('teamBlueName') || "Blue Team"); }
}

function toggleTurn() {
    currentTurn = (currentTurn === 'red') ? 'blue' : 'red';
    applyTurnGlow();
    startTimer();
}

function applyTurnGlow() {
    const redBox = document.querySelector('.red-score');
    const blueBox = document.querySelector('.blue-score');
    if(!redBox || !blueBox) return;
    redBox.classList.toggle('active-team', currentTurn === 'red');
    blueBox.classList.toggle('active-team', currentTurn === 'blue');
}

function startTimer() {
    if(timerInterval) clearInterval(timerInterval);
    seconds = 60;
    const timerEl = document.getElementById('timer');
    if(!timerEl) return;
    timerEl.innerText = "60s";
    timerEl.classList.remove('low-time');
    
    timerInterval = setInterval(() => {
        seconds--;
        timerEl.innerText = seconds + "s";
        if(seconds <= 10) timerEl.classList.add('low-time');
        if(seconds <= 0) toggleTurn();
    }, 1000);
}

function saveSettings() {
    const gSize = document.getElementById('gridSize');
    const dSelect = document.getElementById('difficulty-select');
    const trName = document.getElementById('teamRedName');
    const tbName = document.getElementById('teamBlueName');

    if(gSize) localStorage.setItem('gridSize', gSize.value);
    if(dSelect) localStorage.setItem('gameDifficulty', dSelect.value);
    if(trName) localStorage.setItem('teamRedName', trName.value || "Red Team");
    if(tbName) localStorage.setItem('teamBlueName', tbName.value || "Blue Team");
    
    let activeWords = [];
    document.querySelectorAll('.word-check:checked').forEach(cb => {
        activeWords.push({w: cb.getAttribute('data-word'), d: parseInt(cb.getAttribute('data-level'))});
    });
    localStorage.setItem('activeWords', JSON.stringify(activeWords));
}

function toggleCategory(master, listId) {
    document.querySelectorAll(`#${listId} .word-check:not(:disabled)`).forEach(cb => cb.checked = master.checked);
    updateStartButton();
}

function clearAll() {
    document.querySelectorAll('.word-check').forEach(cb => cb.checked = false);
    updateStartButton();
}

function randomAll() {
    clearAll();
    const allValid = Array.from(document.querySelectorAll('.word-check:not(:disabled)'));
    const shuffled = allValid.sort(() => 0.5 - Math.random());
    for(let i=0; i < 60; i++) { if(shuffled[i]) shuffled[i].checked = true; }
    updateStartButton();
}

function toggleSpy(show) {
    window.currentGameData.forEach((data, i) => {
        const card = document.getElementById(`card-${i}`);
        if (!data.revealed) {
            show ? card.classList.add('peek', `${data.role}-key`) : card.classList.remove('peek', 'red-key', 'blue-key', 'neutral-key', 'assassin-key');
        }
    });
}

function generateSpymasterQR() {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer || typeof QRCode === "undefined") return;

    // 1. Correctly map the layout string (X for assassin)
    let layout = window.currentGameData.map(d => {
        if (d.role === 'assassin') return 'X';
        return d.role[0].toUpperCase();
    }).join('');

    // 2. Build a robust path for key.html
    const path = window.location.pathname;
    const directory = path.substring(0, path.lastIndexOf('/'));
    const finalUrl = `${window.location.origin}${directory}/key.html?layout=${layout}`;

    // 3. Render with high error correction
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { 
        text: finalUrl, 
        width: 160, 
        height: 160,
        correctLevel: QRCode.CorrectLevel.H 
    });
}

function playSound(id) {
    const s = document.getElementById(id);
    if(s) { s.currentTime = 0; s.play().catch(()=>{}); }
}

function showWinner(name) {
    clearInterval(timerInterval);
    const winName = document.getElementById('winner-name');
    const winOverlay = document.getElementById('winner-overlay');
    if(winName) winName.innerText = name;
    if(winOverlay) winOverlay.style.display = 'flex';
}

function showGameOver() {
    clearInterval(timerInterval);
    const loser = currentTurn === 'red' ? (localStorage.getItem('teamRedName') || "Red Team") : (localStorage.getItem('teamBlueName') || "Blue Team");
    const loseName = document.getElementById('loser-name');
    const loseOverlay = document.getElementById('game-over-overlay');
    if(loseName) loseName.innerText = loser;
    if(loseOverlay) loseOverlay.style.display = 'flex';
}

function addManualWord() {
    const input = document.getElementById('manualWordInput');
    if(!input) return;
    const word = input.value.trim();
    if (word) {
        const container = document.querySelector('.word-grid');
        if(!container) return;
        let wordBox = document.createElement('div');
        wordBox.className = 'word-option';
        wordBox.setAttribute('data-level', 1);
        wordBox.innerHTML = `<input type="checkbox" checked class="word-check" data-word="${word}" data-level="1" onchange="updateStartButton()"> ${word}`;
        container.prepend(wordBox);
        input.value = "";
        updateStartButton();
    }
}

// 6. INIT
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('word-pack-container')) buildWordManager();
    if (document.getElementById('game-board')) loadGame();
    
    const diffSelect = document.getElementById('difficulty-select');
    if(diffSelect) diffSelect.addEventListener('change', refreshWordVisibility);
});