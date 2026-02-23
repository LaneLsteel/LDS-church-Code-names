// 1. DATA AND GLOBAL VARIABLES
const wordPacks = {
    bom: {
        label: "Book of Mormon",
        people: ["Nephi", "Lehi", "Sariah", "Abinadi", "Alma", "Amulek", "Zeezrom", "Lamoni", "Ammon", "Aaron", "Omner", "Himni", "Mormon", "Moroni", "Ether", "Brother of Jared", "Coriantumr", "Shiz", "Helaman", "Teancum"],
        places: ["Zarahemla", "Bountiful", "Cumorah", "Land of Nephi", "Gershon", "Sidon River", "Manti", "Gid", "Mulek", "Morianton", "Antionum", "Irreantum", "Nahom", "Valley of Lemuel"],
        things: ["Liahona", "Iron Rod", "Gold Plates", "Title of Liberty", "Rameumptom", "Urim and Thummim", "Sword of Laban", "Deseret", "Compass", "Breastplate"],
        mastery: ["Plain and Precious", "Natural Man", "Small and Simple", "Feast upon words", "Adam fell", "Broken heart", "Service of God", "Believe in God", "Wickedness", "Free to choose", "Search the scriptures", "Rebirth", "Angels", "Strength of Lord", "Good for evil", "Arm of flesh", "Wisdom", "Prayer", "Charity", "Faith", "Hope", "Trial of Faith", "Witness", "Meditation", "Record"]
    },
    ot: {
        label: "Old Testament",
        people: ["Adam", "Eve", "Noah", "Abraham", "Sarah", "Isaac", "Rebekah", "Jacob", "Rachel", "Leah", "Joseph", "Moses", "Aaron", "Miriam", "Joshua", "Deborah", "Gideon", "Samson", "Ruth", "Samuel"],
        places: ["Eden", "Ararat", "Ur", "Canaan", "Egypt", "Red Sea", "Sinai", "Jericho", "Jerusalem", "Babylon", "Nineveh", "Sodom", "Gomorrah"],
        things: ["Ark of the Covenant", "Manna", "Tabernacle", "Burning Bush", "Stone Tablets", "Staff", "Altar", "Ram", "Sling", "Gourd"],
        mastery: ["Image of God", "Sabbath", "Cleave", "Choice Seer", "Wickedness", "Covenant", "Birthright", "House of God", "Commandments", "Peculiar Treasure", "Holy", "Inquire", "Heart", "Soul", "Strength", "Watchman", "Sanctuary", "Clean Hands", "Trust", "Scarlet", "Wool", "Word of God", "Standard", "Tithes", "Offering"]
    },
    nt: {
        label: "New Testament",
        people: ["Jesus", "Mary", "Joseph", "John the Baptist", "Peter", "James", "John", "Andrew", "Philip", "Bartholomew", "Matthew", "Thomas", "Thaddaeus", "Simon", "Judas", "Nicodemus", "Zacchaeus", "Lazarus", "Martha", "Mary Magdalene"],
        places: ["Bethlehem", "Nazareth", "Galilee", "Jordan River", "Gethsemane", "Calvary", "Golgotha", "Emmaus", "Damascus", "Antioch", "Corinth", "Ephesus"],
        things: ["Manger", "Cross", "Crown of Thorns", "Fisherman's Net", "Loaves", "Fishes", "Waterpot", "Silver Pieces", "Sepulchre"],
        mastery: ["Born Again", "Light of World", "Life Eternal", "Spirit", "True Vine", "Resurrection", "Atonement", "Grace", "Faith", "Works", "Cornerstone", "Apostasy", "Restoration", "Gospel", "Fruit of Spirit", "Armor of God", "Strength", "Scripture", "Wisdom", "Trial", "Communication", "Example", "Head of Church", "Firstfruits", "Priesthood"]
    },
    dc: {
        label: "Doctrine & Covenants",
        people: ["Joseph Smith", "Emma Smith", "Hyrum Smith", "Oliver Cowdery", "Martin Harris", "David Whitmer", "Sidney Rigdon", "Edward Partridge", "W.W. Phelps", "Parley P. Pratt"],
        places: ["Palmyra", "Sacred Grove", "Fayette", "Kirtland", "Independence", "Far West", "Liberty Jail", "Nauvoo", "Carthage Jail", "Winter Quarters"],
        things: ["Manuscript", "Printing Press", "Plates", "Keys", "Sections", "Covenants", "Proclamation", "Standard Works"],
        mastery: ["Voice of Warning", "The Only True", "Look unto me", "Ask in Faith", "Peace of mind", "Rock", "Worth of souls", "Sacrament", "Priesthood keys", "Marvelous work", "Standard", "Temple", "Gathering", "Tithing", "Endure", "Oath", "Covenant", "Word of Wisdom", "Celestial", "Kingdom", "Intelligence", "Power", "Authority", "Vision", "Truth"]
    },
    pgp: {
        label: "Pearl of Great Price",
        people: ["Enoch", "Mahijah", "Abraham", "Moses", "Kolob"],
        places: ["Egypt", "Chaldea", "Stars", "Universe"],
        things: ["Papyrus", "Facsimile", "Articles of Faith", "Pearl"]
    }
};

let currentTurn = 'red'; 

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
            pack[subType].forEach(word => {
                let wordBox = document.createElement('div');
                wordBox.className = 'word-option';
                wordBox.innerHTML = `<input type="checkbox" checked class="word-check" data-word="${word}"> ${word}`;
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
    alert("Randomly selected 60 words!");
}

function saveSettings() {
    localStorage.setItem('gridSize', document.getElementById('gridSize').value);
    localStorage.setItem('teamRedName', document.getElementById('teamRedName').value || "Red Team");
    localStorage.setItem('teamBlueName', document.getElementById('teamBlueName').value || "Blue Team");
    let activeWords = [];
    document.querySelectorAll('.word-check:checked').forEach(cb => activeWords.push(cb.getAttribute('data-word')));
    localStorage.setItem('activeWords', JSON.stringify(activeWords));
    alert("Settings Saved!");
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
    const activeWords = JSON.parse(localStorage.getItem('activeWords') || "[]");

    // Fix: Show a warning if no words were picked instead of the winner screen
    if (activeWords.length < (gridSize * gridSize)) {
        board.innerHTML = "<h2 style='grid-column: 1/-1; text-align:center;'>Not enough words! Go to SETUP and pick more or click RANDOM 60.</h2>";
        return;
    }

    let gameWords = activeWords.sort(() => 0.5 - Math.random()).slice(0, gridSize * gridSize);
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
                showGameOver();
            } else {
                if (role !== currentTurn) { toggleTurn(); }
                updateGameScore();
            }
        };
        board.appendChild(card);
    });

    currentTurn = 'red'; // Reset turn to red on load
    updateGameScore();
    generateSpymasterQR();
}

function toggleTurn() {
    currentTurn = (currentTurn === 'red') ? 'blue' : 'red';
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
    // Check if game data exists before calculating
    if (!window.currentGameData || window.currentGameData.length === 0) return;

    const r = window.currentGameData.filter(d => d.role === 'red' && !d.revealed).length;
    const b = window.currentGameData.filter(d => d.role === 'blue' && !d.revealed).length;
    
    document.getElementById('red-count').innerText = r;
    document.getElementById('blue-count').innerText = b;
    
    applyTurnGlow();

    // Fix: Only trigger win if the total cards are 0 AND the board was actually loaded
    if (r === 0 && window.currentGameData.length > 0) {
        showWinner(localStorage.getItem('teamRedName') || "Red Team");
    } else if (b === 0 && window.currentGameData.length > 0) {
        showWinner(localStorage.getItem('teamBlueName') || "Blue Team");
    }
}

function showWinner(name) {
    document.getElementById('winner-name').innerText = name;
    document.getElementById('winner-overlay').style.display = 'flex';
}

function showGameOver() {
    const isRedTurn = currentTurn === 'red';
    document.getElementById('loser-name').innerText = isRedTurn ? (localStorage.getItem('teamRedName') || "Red Team") : (localStorage.getItem('teamBlueName') || "Blue Team");
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