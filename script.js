const PHONE_CODE = "0810";
const PHOTO_CLUE_TEXT = `phone code: ${PHONE_CODE}`;
const BOX_PASSWORD = "2112";
const GALLERY_CODE = "Renad123";
const GALLERY_LETTER_PASSWORD = "6767";
const HAPPY_BIRTHDAY_AUDIO = "music/happy.mpeg";
const PENDANT_PHOTO = "images/3.jpeg";
const GALLERY_MEDIA = [
  { type: "image", src: "images/1.jpeg", title: "Memory 1" },
  { type: "image", src: "images/2.jpeg", title: "Memory 2" },
  { type: "image", src: "images/3.jpeg", title: "Memory 3" },
  { type: "image", src: "images/777.jpeg", title: "Memory 4" },
  { type: "image", src: "images/5.jpeg", title: "Memory 4" },
   { type: "image", src: "images/WhatsApp Image 2026-08-10 at 12.58.02 AM.jpeg", title: "Memory 4" },
  
];
const TIKTOK_USERNAME = "Rena2011";
const TIKTOK_PASSWORD = "Lera";
const TIKTOK_START_IMAGE = "images/tiktikstart.jpeg";
const TIKTOK_END_IMAGE = "images/tiktikend.jpeg";
const TIKTOK_VIDEOS = [
  "videos/vid4.mp4",
  "videos/vid5.mp4",
  "videos/vid6.mp4",
  "videos/vid3.mp4",
  "videos/vid7.mp4"
];
// The case is split into three task sets. Only the current set is shown.
// When every task in a set is completed, the next set appears automatically.
const CASE_TASK_SETS = [
  [
    "Solve the photo puzzle to reveal the phone code.",
    "Open the notebook for app logins and useful clues.",
    "Unlock the phone",
    "Login to Instagram and complete the leaf game",
    "Check Instagram posts for useful information"
  ],
  [
    "Unlock the Notes app",
    "Log in to TikTok",
    "Unlock the music app",
    "Unlock WhatsApp and read the chats carefully"
  ],
  [
    "Unlock the box",
    "Inspect the pendant photo for hidden text",
    "Unlock the Gallery",
    "Find the letter password in a gallery photo",
    "Unlock the letter"
  ]
];

let caseStepStage = 0;
let caseStepAdvanceTimer = null;

const SAVE_KEY = "missingCozyCaseProgress_v1";
let isRestarting = false;
const PANCAKE_TARGET = 5;
let savedTaskCompletions = new Set();

function saveProgress() {
  if (isRestarting) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      version: 1,
      caseStepStage,
      completedTasks: Array.from(savedTaskCompletions),
      photoSolved,
      boxUnlocked,
      pendantOpen,
      galleryUnlocked,
      galleryPasswordFound,
      notesUnlocked,
      musicUnlocked,
      envelopeUnlocked,
      endingStarted,
      finalLetterOpened,
      instagramLoggedIn,
      instagramLeafGameCompleted,
      tiktokLoggedIn
    }));
  } catch (error) {
    console.warn("Could not save game progress.", error);
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || data.version !== 1) return;

    caseStepStage = Math.max(0, Math.min(Number(data.caseStepStage) || 0, CASE_TASK_SETS.length - 1));
    savedTaskCompletions = new Set(Array.isArray(data.completedTasks) ? data.completedTasks : []);
    photoSolved = Boolean(data.photoSolved);
    boxUnlocked = Boolean(data.boxUnlocked);
    pendantOpen = Boolean(data.pendantOpen);
    galleryUnlocked = Boolean(data.galleryUnlocked);
    galleryPasswordFound = Boolean(data.galleryPasswordFound);
    notesUnlocked = Boolean(data.notesUnlocked);
    musicUnlocked = Boolean(data.musicUnlocked);
    envelopeUnlocked = Boolean(data.envelopeUnlocked);
    endingStarted = Boolean(data.endingStarted);
    finalLetterOpened = Boolean(data.finalLetterOpened);
    instagramLoggedIn = Boolean(data.instagramLoggedIn);
    instagramLeafGameCompleted = Boolean(data.instagramLeafGameCompleted);
    tiktokLoggedIn = Boolean(data.tiktokLoggedIn);
  } catch (error) {
    console.warn("Could not load saved game progress.", error);
  }
}

function clearSavedProgress() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.warn("Could not clear saved progress.", error);
  }
}


const INSTAGRAM_USERNAME = "Rena101";
const INSTAGRAM_PASSWORD = "RenadlovesLera";
const WHATSAPP_QUIZ = [
  {
    prompt: "What is my favorite color?",
    options: ["Pink", "Blue", "Green", "Red"],
    correctIndex: 3
  },
  {
    prompt: "What do I like more?",
    options: ["Lipstick", "Lipliner", "Lip gloss", "Lip oil"],
    correctIndex: 2
  },
  {
    prompt: "What would I order in a restaurant?",
    options: ["Fried Chicken", "Burger", "Koshary", "Shawarma"],
    correctIndex: 1
  },
  {
    prompt: "What city do I want to visit",
    options: ["London", "New York", "Moscow", "Rome"],
    correctIndex: 0
  },
  {
    prompt: "What is my favourite animal",
    options: ["Elephants", "Rabbits", "Lion", "Giraffe"],
    correctIndex: 3
  }
];
const WHATSAPP_CHATS = {
  mom: [
    { who: "them", text: "Hi sweetheart, Can you get Feno on your way back?" },
    { who: "me", text: "okayyyy" }
  ],
  dad: [
    { who: "them", text: "Where are you?" },
    { who: "me", text: "I'm out with my friends" }
  ],
  mariam: [
    { who: "them", text: "Are we still meeting later?" },
    { who: "me", text: "Yes, at 4," },
    { who: "them", text: "Okay meet me at my place" },
    { who: "me", text: "Okay" },
  ],
  basant: [
    { who: "them", text: "Get me some Blazo" },
    { who: "me", text: "No." },
    { who: "them", text: "Whatever, what's the password for the box" },
    { who: "them", text: "I'll take the money that you owe me" },
    { who: "me", text: "BROOOOO" },
     { who: "me", text: "It's 2112" }
  ]
};
const INSTAGRAM_POSTS = [
  {
    image: "images/WhatsApp Image 2026-08-08 at 9.32.47 PM.jpeg",
    caption: "HAPPY BIRTHDAY YA @lera3",
    likes: "128 likes"
  },
  {
    image: "images/Teru icon tbhk (1).png",
    caption: "I want teruuuuu @mariam",
    likes: "96 likes"
  },
  {
    image: "images/2.jpeg",
    caption: "out with @lera3 ",
    likes: "74 likes"
  },
  {
    image: "images/tiktikstart.jpeg",
    caption: "Followmy tiktok my username is Rena2011 :3",
    likes: "74 likes"
  },
];
const LEAF_GAME_ROUNDS = 10;
const LEAF_GAME_TILES = 10;
const LEAF_COLORS = [
  { hue: 104, saturation: 38, lightness: 44 },
  { hue: 139, saturation: 34, lightness: 42 },
  { hue: 84, saturation: 40, lightness: 48 },
  { hue: 168, saturation: 30, lightness: 40 },
  { hue: 56, saturation: 42, lightness: 47 }
];
const NOTES_APP_NOTE = {
  title: "My Note",
  body: "My Tiktok password is Lera"
 
};
const MUSIC_SONGS = [
  {
    title: "Run Rabbit",
    artist: "Mollie Elizabeth",
    src: "music/oh1.mpeg",
    cover: "music/oh1.jpeg"
  },
  {
    title: "Lucy~",
    artist: "Corbon Amodio",
    src: "music/lucy.mpeg",
    cover: "music/lucy.jpeg"
  },
  {
    title: "Young Dumb & Broke",
    artist: "Khalid",
    src: "music/young.mpeg",
    cover: "music/YOUNG.jpeg"
  }
];
const PIANO_TILE_PATTERN = [1, 3, 0, 2, 1, 0, 3, 2, 1, 3, 0, 2];
const PIANO_TILE_SONG = "music/piano-tiles-song.mpeg";

const startScreen = document.getElementById("startScreen");
const deskScreen = document.getElementById("deskScreen");
const playButton = document.getElementById("playButton");
const deskPhoto = document.getElementById("deskPhoto");
const deskPhotoClue = document.getElementById("deskPhotoClue");
const photoPuzzle = document.getElementById("photoPuzzle");
const photoPuzzleStatus = document.getElementById("photoPuzzleStatus");
const shufflePhoto = document.getElementById("shufflePhoto");
const wakePhone = document.getElementById("wakePhone");
const phoneUnlock = document.getElementById("phoneUnlock");
const phoneKeypad = document.getElementById("phoneKeypad");
const phoneStatus = document.getElementById("phoneStatus");
const phoneHome = document.getElementById("phoneHome");
const phoneLogin = document.getElementById("phoneLogin");
const phoneLoginTitle = document.getElementById("phoneLoginTitle");
const phoneLoginBack = document.getElementById("phoneLoginBack");
const phoneLoginClose = document.getElementById("phoneLoginClose");
const phoneLoginForm = document.getElementById("phoneLoginForm");
const phoneLoginStatus = document.getElementById("phoneLoginStatus");
const phoneLoginUser = document.getElementById("phoneLoginUser");
const phoneLoginPassword = document.getElementById("phoneLoginPassword");
const galleryLockScreen = document.getElementById("galleryLockScreen");
const galleryLockBack = document.getElementById("galleryLockBack");
const galleryLockClose = document.getElementById("galleryLockClose");
const galleryCodeForm = document.getElementById("galleryCodeForm");
const galleryCodeInput = document.getElementById("galleryCodeInput");
const galleryCodeStatus = document.getElementById("galleryCodeStatus");
const galleryScreen = document.getElementById("galleryScreen");
const galleryBack = document.getElementById("galleryBack");
const galleryClose = document.getElementById("galleryClose");
const galleryGrid = document.getElementById("galleryGrid");
const whatsappScreen = document.getElementById("whatsappScreen");
const whatsappBack = document.getElementById("whatsappBack");
const whatsappClose = document.getElementById("whatsappClose");
const whatsappGame = document.getElementById("whatsappGame");
const whatsappGameStatus = document.getElementById("whatsappGameStatus");
const whatsappBoard = document.getElementById("whatsappBoard");
const whatsappChats = document.getElementById("whatsappChats");
const whatsappThread = document.getElementById("whatsappThread");
const whatsappThreadBack = document.getElementById("whatsappThreadBack");
const whatsappThreadAvatar = document.getElementById("whatsappThreadAvatar");
const whatsappThreadName = document.getElementById("whatsappThreadName");
const whatsappThreadNote = document.getElementById("whatsappThreadNote");
const whatsappMessages = document.getElementById("whatsappMessages");
const tiktokScreen = document.getElementById("tiktokScreen");
const tiktokBack = document.getElementById("tiktokBack");
const tiktokClose = document.getElementById("tiktokClose");
const tiktokStage = document.getElementById("tiktokStage");
const tiktokNext = document.getElementById("tiktokNext");
const instagramScreen = document.getElementById("instagramScreen");
const instagramBack = document.getElementById("instagramBack");
const instagramClose = document.getElementById("instagramClose");
const instagramFeed = document.getElementById("instagramFeed");
const instagramLeafGame = document.getElementById("instagramLeafGame");
const leafGameBack = document.getElementById("leafGameBack");
const leafGameClose = document.getElementById("leafGameClose");
const leafGameStatus = document.getElementById("leafGameStatus");
const leafGameBoard = document.getElementById("leafGameBoard");
const notesScreen = document.getElementById("notesScreen");
const notesBack = document.getElementById("notesBack");
const notesClose = document.getElementById("notesClose");
const noteTitle = document.getElementById("noteTitle");
const noteBody = document.getElementById("noteBody");
const musicScreen = document.getElementById("musicScreen");
const musicBack = document.getElementById("musicBack");
const musicClose = document.getElementById("musicClose");
const musicCover = document.getElementById("musicCover");
const musicTitle = document.getElementById("musicTitle");
const musicArtist = document.getElementById("musicArtist");
const musicAudio = document.getElementById("musicAudio");
const musicList = document.getElementById("musicList");
const pianoTilesScreen = document.getElementById("pianoTilesScreen");
const pianoBack = document.getElementById("pianoBack");
const pianoClose = document.getElementById("pianoClose");
const pianoStatus = document.getElementById("pianoStatus");
const pianoScore = document.getElementById("pianoScore");
const pianoCombo = document.getElementById("pianoCombo");
const pianoTilesBoard = document.getElementById("pianoTilesBoard");
const pianoStart = document.getElementById("pianoStart");
const pianoSong = document.getElementById("pianoSong");
const pancakeGameScreen = document.getElementById("pancakeGameScreen");
const pancakeBack = document.getElementById("pancakeBack");
const pancakeClose = document.getElementById("pancakeClose");
const pancakeStatus = document.getElementById("pancakeStatus");
const pancakeCount = document.getElementById("pancakeCount");
const pancakeTarget = document.getElementById("pancakeTarget");
const pancakeGame = document.getElementById("pancakeGame");
const pancakeCanvas = document.getElementById("pancakeCanvas");
const pancakeStart = document.getElementById("pancakeStart");
const phoneShell = document.querySelector(".phone-shell");
const pinSlots = document.querySelectorAll(".pin-display span");
const leftPageTitle = document.getElementById("leftPageTitle");
const rightPageTitle = document.getElementById("rightPageTitle");
const leftPageText = document.getElementById("leftPageText");
const rightPageText = document.getElementById("rightPageText");
const notebookPageCount = document.getElementById("notebookPageCount");
const prevNotebookPage = document.getElementById("prevNotebookPage");
const nextNotebookPage = document.getElementById("nextNotebookPage");
const boxPasswordForm = document.getElementById("boxPasswordForm");
const boxPasswordInput = document.getElementById("boxPasswordInput");
const boxPasswordStatus = document.getElementById("boxPasswordStatus");
const boxReward = document.getElementById("boxReward");
const pendantButton = document.getElementById("pendantButton");
const pendantPhoto = document.getElementById("pendantPhoto");
const boxGalleryCode = document.getElementById("boxGalleryCode");
const envelopePasswordForm = document.getElementById("envelopePasswordForm");
const envelopePasswordInput = document.getElementById("envelopePasswordInput");
const envelopePasswordStatus = document.getElementById("envelopePasswordStatus");
const envelopeContent = document.getElementById("envelopeContent");
const envelopeLetterBody = document.getElementById("envelopeLetterBody");
const goToLocationButton = document.getElementById("goToLocationButton");
const locationTransition = document.getElementById("locationTransition");
const endingScreen = document.getElementById("endingScreen");
const playAgainButton = document.getElementById("playAgainButton");
const birthdayLetter = document.getElementById("birthdayLetter");
const finalLetterModal = document.getElementById("finalLetterModal");
const finalLetterBody = document.getElementById("finalLetterBody");
const happyBirthdayAudio = document.getElementById("happyBirthdayAudio");
const inspectCharm = document.getElementById("inspectCharm");
const charmInscription = document.getElementById("charmInscription");
const caseStepsList = document.getElementById("caseStepsList");
const caseStepsStatus = document.getElementById("caseStepsStatus");

const photoPuzzleStart = [4, 0, 2, 7, 1, 5, 3, 8, 6];
let photoPieces = [...photoPuzzleStart];
let selectedPiece = null;
let phoneInput = "";
let notebookSpread = 0;
let photoSolved = false;
let activeLoginApp = "";
let boxUnlocked = false;
let pendantOpen = false;
let galleryUnlocked = false;
let whatsappRound = 0;
let whatsappAnswerIndex = 0;
let activeWhatsappChat = "mom";
let whatsappThreadOpen = false;
let tiktokStep = 0;
let leafRound = 1;
let leafAnswer = 0;
let musicUnlocked = false;
let pianoStep = 0;
let pianoPlaying = false;
let pianoPoints = 0;
let notesUnlocked = false;
let envelopeUnlocked = false;
let galleryPasswordFound = false;
let endingStarted = false;
let finalLetterOpened = false;
let instagramLoggedIn = false;
let instagramLeafGameCompleted = false;
let tiktokLoggedIn = false;
let pancakePlaying = false;
let pancakeScore = 0;
let pancakeStack = [];
let pancakeMoving = null;
let pancakeX = 140;
let pancakeY = 50;
let pancakeVelocity = 0;
let pancakeDirection = 1;
let pancakeGameLoop = null;
let pancakeLastTime = 0;

const notebookPages = [
  "Passwords:\n\nInsta:\nusername: Rena101\npassword: RenadlovesLera\n",

];

playButton.addEventListener("click", () => {
  startScreen.classList.remove("active");
  deskScreen.classList.add("active");
});

document.querySelectorAll("[data-modal]").forEach((item) => {
  item.addEventListener("click", () => {
    const modal = document.getElementById(item.dataset.modal);
    if (!modal) return;
    modal.classList.add("active");

    // Ensure pancake game screen is hidden when opening any modal
    pancakeGameScreen.hidden = true;
    pancakeGameScreen.style.display = '';

    if (item.dataset.modal === "photoModal" && photoPuzzle.children.length === 0) {
      renderPhotoPuzzle();
    }

    if (item.dataset.modal === "notebookModal") {
      renderNotebook();
      completeCaseStep(1, 'Notebook opened - check for logins.');
    }

    if (item.dataset.modal === "boxModal") {
      renderBox();
    }

    if (item.dataset.modal === "envelopeModal") {
      renderEnvelope();
    }

    if (item.dataset.modal === "charmModal") {
      // Reset charm state when opening
      charmInscription.hidden = true;
      inspectCharm.textContent = "Inspect Charm";
    }
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    resetPhoneLogin();
    button.closest(".modal").classList.remove("active");
    // Ensure pancake game screen is hidden when closing modals
    pancakeGameScreen.hidden = true;
    pancakeGameScreen.style.display = '';
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      resetPhoneLogin();
      stopActivePhoneMedia();
      modal.classList.remove("active");
      // Ensure pancake game screen is hidden when closing modals
      pancakeGameScreen.hidden = true;
      pancakeGameScreen.style.display = '';
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      resetPhoneLogin();
      stopActivePhoneMedia();
      modal.classList.remove("active");
    });
  }
});

shufflePhoto.addEventListener("click", () => {
  photoPieces = shufflePieces();
  selectedPiece = null;
  photoSolved = false;
  photoPuzzle.classList.remove("solved");
  photoPuzzle.classList.remove("fusing");
  deskPhoto.classList.remove("done");
  deskPhotoClue.hidden = true;
  photoPuzzleStatus.textContent = "The photo scattered again. Put it back together.";
  renderPhotoPuzzle();
});

function renderPhotoPuzzle() {
  photoPuzzle.innerHTML = "";

  photoPieces.forEach((pieceNumber, slotNumber) => {
    const piece = document.createElement("button");
    piece.type = "button";
    piece.className = "puzzle-piece";
    piece.dataset.slot = slotNumber;
    piece.dataset.piece = pieceNumber;
    piece.setAttribute("aria-label", `Photo piece ${pieceNumber + 1}`);
    piece.style.backgroundPosition = getPiecePosition(pieceNumber);
    piece.addEventListener("click", () => choosePhotoPiece(slotNumber));
    photoPuzzle.appendChild(piece);
  });

  if (isPhotoSolved()) {
    unlockPhotoClue();
  }
}

function choosePhotoPiece(slotNumber) {
  if (photoSolved) return;

  if (selectedPiece === null) {
    selectedPiece = slotNumber;
    markSelectedPiece();
    photoPuzzleStatus.textContent = "Choose a second piece to swap.";
    return;
  }

  if (selectedPiece === slotNumber) {
    selectedPiece = null;
    markSelectedPiece();
    photoPuzzleStatus.textContent = "Pick any two pieces to swap them.";
    return;
  }

  const firstPiece = photoPieces[selectedPiece];
  photoPieces[selectedPiece] = photoPieces[slotNumber];
  photoPieces[slotNumber] = firstPiece;
  selectedPiece = null;
  renderPhotoPuzzle();

  if (!isPhotoSolved()) {
    photoPuzzleStatus.textContent = "Good swap. Keep restoring the picture.";
  }
}

function markSelectedPiece() {
  document.querySelectorAll(".puzzle-piece").forEach((piece) => {
    piece.classList.toggle("selected", Number(piece.dataset.slot) === selectedPiece);
  });
}

function getPiecePosition(pieceNumber) {
  const col = pieceNumber % 3;
  const row = Math.floor(pieceNumber / 3);
  return `${col * 50}% ${row * 50}%`;
}

function isPhotoSolved() {
  return photoPieces.every((pieceNumber, slotNumber) => pieceNumber === slotNumber);
}

function unlockPhotoClue() {
  photoSolved = true;
  saveProgress();
  photoPuzzleStatus.textContent = "Photo restored. Watch the seams fade.";
  photoPuzzle.classList.add("solved");
  photoPuzzle.classList.add("fusing");

  document.querySelectorAll(".puzzle-piece").forEach((piece) => {
    piece.classList.add("solved");
  });

  // The task is completed as soon as the puzzle reaches its solved state.
  markCaseStepDoneByText("Solve the photo puzzle to reveal the phone code.");
  setCaseStepsStatus('Photo solved — the phone code is ready.');

  window.setTimeout(() => {
    photoPuzzleStatus.textContent = "The phone code appeared under the desk photo.";
    deskPhoto.classList.add("done");
    deskPhotoClue.textContent = PHOTO_CLUE_TEXT;
    deskPhotoClue.hidden = false;
  }, 750);
}

function shufflePieces() {
  const pieces = [...photoPuzzleStart];

  for (let index = pieces.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = pieces[index];
    pieces[index] = pieces[swapIndex];
    pieces[swapIndex] = current;
  }

  if (pieces.every((pieceNumber, slotNumber) => pieceNumber === slotNumber)) {
    return [...photoPuzzleStart];
  }

  return pieces;
}

wakePhone.addEventListener("click", () => {
  wakePhone.classList.add("awake");
  phoneUnlock.hidden = false;
});

["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Enter"].forEach((key) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = key;
  button.addEventListener("click", () => pressPhoneKey(key));
  phoneKeypad.appendChild(button);
});

function pressPhoneKey(key) {
  if (key === "Clear") {
    phoneInput = "";
    phoneStatus.textContent = "";
  } else if (key === "Enter") {
    checkPhoneCode();
  } else if (phoneInput.length < 4) {
    phoneInput += key;
  }

  renderPhoneInput();
}

function renderPhoneInput() {
  pinSlots.forEach((slot, index) => {
    slot.textContent = phoneInput[index] ? "*" : "";
  });
}

function checkPhoneCode() {
  if (phoneInput === PHONE_CODE) {
    phoneStatus.textContent = "Phone unlocked.";
    markCaseStepDoneByText("Unlock the phone");
    setCaseStepsStatus('Phone unlocked — explore the apps.');
    window.setTimeout(showPhoneHome, 350);
  } else {
    phoneStatus.textContent = "Wrong code.";
    phoneInput = "";
    renderPhoneInput();
  }
}

function showPhoneHome() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneUnlock.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  whatsappScreen.hidden = true;
  tiktokScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  pancakeGameScreen.style.display = "";
  stopTikTokMedia();
  stopMusic();
  stopPianoGame();
  stopPancakeGame();
  phoneHome.hidden = false;
}

document.querySelectorAll("[data-login-app]").forEach((appButton) => {
  appButton.addEventListener("click", () => {
    const appName = appButton.dataset.loginApp;

    if (appName === "Instagram" && instagramLoggedIn) {
      if (instagramLeafGameCompleted) {
        showInstagramFeed();
      } else {
        showInstagramLeafGame();
      }
      return;
    }

    if (appName === "TikTok" && tiktokLoggedIn) {
      showTikTokFeed();
      return;
    }

    showPhoneLogin(appName);
  });
});

document.querySelectorAll("[data-open-app]").forEach((appButton) => {
  appButton.addEventListener("click", () => {
    if (appButton.dataset.openApp === "Music") {
      if (musicUnlocked) {
        showMusicApp();
      } else {
        showPianoTilesGame();
      }
    }

    if (appButton.dataset.openApp === "Notes") {
      if (notesUnlocked) {
        showNotesApp();
      } else {
        showPancakeGame();
      }
    }

    if (appButton.dataset.openApp === "WhatsApp") {
      showWhatsAppApp();
    }

    if (appButton.dataset.openApp === "Gallery") {
      if (galleryUnlocked) {
        showGalleryApp();
      } else {
        showGalleryLock();
      }
    }
  });
});

phoneLoginBack.addEventListener("click", showPhoneHome);
phoneLoginClose.addEventListener("click", showPhoneHome);

phoneLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (activeLoginApp === "TikTok") {
    checkTikTokLogin();
    return;
  }

  if (activeLoginApp === "Instagram") {
    checkInstagramLogin();
    return;
  }

  phoneLoginStatus.textContent = "Login info entered.";
});

function showPhoneLogin(appName) {
  phoneHome.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  phoneLogin.hidden = false;
  phoneLoginTitle.textContent = `${appName} Login`;
  activeLoginApp = appName;
  phoneLoginStatus.textContent = "";
  phoneLoginForm.reset();
  phoneLoginUser.focus();
}

function resetPhoneLogin() {
  if (!phoneLogin) return;

  const wasViewingPhoneApp = !phoneLogin.hidden || !galleryLockScreen.hidden || !galleryScreen.hidden || !tiktokScreen.hidden || !whatsappScreen.hidden || !instagramScreen.hidden || !instagramLeafGame.hidden || !notesScreen.hidden || !musicScreen.hidden || !pianoTilesScreen.hidden || !pancakeGameScreen.hidden;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  pancakeGameScreen.style.display = "";
  stopTikTokMedia();
  stopMusic();
  stopPianoGame();
  stopPancakeGame();
  if (wasViewingPhoneApp && phoneUnlock.hidden) {
    phoneHome.hidden = false;
  }
  activeLoginApp = "";
  phoneLoginStatus.textContent = "";
  phoneLoginForm.reset();
}

// Case steps helpers
function markCaseStepDone(index) {
  if (!caseStepsList) return false;
  const li = caseStepsList.children[index];
  if (!li) return false;
  return markCaseStepDoneElement(li);
}

function completeCaseStep(index, statusText) {
  markCaseStepDone(index);
  if (statusText) setCaseStepsStatus(statusText);
}

function completeCaseStepByText(text, statusText) {
  markCaseStepDoneByText(text);
  if (statusText) setCaseStepsStatus(statusText);
}

function setCaseStepsStatus(text) {
  if (caseStepsStatus) caseStepsStatus.textContent = text;
}

function markCaseStepDoneElement(li) {
  if (!li || li.classList.contains('done')) return false;
  li.classList.add('done');
  savedTaskCompletions.add(li.textContent.trim());
  saveProgress();
  checkAllStepsComplete();
  return true;
}

function checkAllStepsComplete() {
  if (!caseStepsList) return false;
  const items = Array.from(caseStepsList.children);
  const allDone = items.length > 0 && items.every((li) => li.classList.contains('done'));

  if (!allDone || caseStepStage >= CASE_TASK_SETS.length - 1) return allDone;

  // Guard against multiple completed-task handlers scheduling the next set.
  if (caseStepAdvanceTimer !== null) return true;

  setCaseStepsStatus(`Set ${caseStepStage + 1} complete — loading the next tasks...`);
  caseStepAdvanceTimer = window.setTimeout(() => {
    caseStepAdvanceTimer = null;
    showNextCaseSteps();
  }, 250);

  return true;
}

// Task lists are generated here so every set uses the same markup and styling.
function attachCaseStepClickHandlers() {
  // Tasks are status indicators, not buttons. Puzzle actions are what complete them.
}

function setCaseSteps(steps) {
  if (!caseStepsList) return;
  caseStepsList.replaceChildren();

  steps.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    caseStepsList.appendChild(li);
  });

  attachCaseStepClickHandlers();
}

function addCaseStep(text) {
  if (!caseStepsList) return;
  const li = document.createElement('li');
  li.textContent = text;
  caseStepsList.appendChild(li);
  attachCaseStepClickHandlers();
}

function markCaseStepDoneByText(text) {
  if (!caseStepsList) return false;

  const target = normalizeStepText(text);
  const li = Array.from(caseStepsList.children).find((element) => {
    const current = normalizeStepText(element.textContent);
    return current === target || current.includes(target) || target.includes(current);
  });

  return li ? markCaseStepDoneElement(li) : false;
}

function showNextCaseSteps() {
  if (!caseStepsList || caseStepStage >= CASE_TASK_SETS.length - 1) return;

  caseStepStage += 1;
  setCaseSteps(CASE_TASK_SETS[caseStepStage]);
  setCaseStepsStatus(`Task set ${caseStepStage + 1} of ${CASE_TASK_SETS.length} unlocked.`);
  saveProgress();
}

function normalizeStepText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// expose API
window.setCaseSteps = setCaseSteps;
window.addCaseStep = addCaseStep;
window.markCaseStepDoneByText = markCaseStepDoneByText;
window.completeCaseStep = completeCaseStep;
window.completeCaseStepByText = completeCaseStepByText;

// Restore the saved task set and checked tasks.
loadProgress();
setCaseSteps(CASE_TASK_SETS[caseStepStage]);
savedTaskCompletions.forEach((taskText) => {
  const normalized = normalizeStepText(taskText);
  const item = Array.from(caseStepsList.children).find((li) => normalizeStepText(li.textContent) === normalized);
  if (item) item.classList.add("done");
});
attachCaseStepClickHandlers();

// Keep the saved state synchronized if the browser/tab is closed or backgrounded.
window.addEventListener("beforeunload", () => {
  if (!isRestarting) saveProgress();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && !isRestarting) saveProgress();
});

tiktokBack.addEventListener("click", showPhoneHome);
tiktokClose.addEventListener("click", showPhoneHome);
tiktokNext.addEventListener("click", showNextTikTokItem);
galleryLockBack.addEventListener("click", showPhoneHome);
galleryLockClose.addEventListener("click", showPhoneHome);
galleryBack.addEventListener("click", showPhoneHome);
galleryClose.addEventListener("click", showPhoneHome);
galleryCodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkGalleryCode();
});
whatsappBack.addEventListener("click", () => {
  if (whatsappThreadOpen) {
    showWhatsAppChatList();
    return;
  }

  showPhoneHome();
});
whatsappClose.addEventListener("click", showPhoneHome);
whatsappThreadBack.addEventListener("click", showWhatsAppChatList);
boxPasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkBoxPassword();
});
pendantButton.addEventListener("click", togglePendant);
envelopePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkEnvelopePassword();
});
inspectCharm.addEventListener("click", toggleCharm);
goToLocationButton.addEventListener("click", startLocationEnding);
birthdayLetter.addEventListener("click", openFinalLetter);
instagramBack.addEventListener("click", showPhoneHome);
instagramClose.addEventListener("click", showPhoneHome);
leafGameBack.addEventListener("click", showPhoneHome);
leafGameClose.addEventListener("click", showPhoneHome);
notesBack.addEventListener("click", showPhoneHome);
notesClose.addEventListener("click", showPhoneHome);
musicBack.addEventListener("click", showPhoneHome);
musicClose.addEventListener("click", showPhoneHome);
pianoBack.addEventListener("click", showPhoneHome);
pianoClose.addEventListener("click", showPhoneHome);
pianoStart.onclick = startPianoGame;
pancakeBack.addEventListener("click", showPhoneHome);
pancakeClose.addEventListener("click", showPhoneHome);
pancakeStart.onclick = handlePancakeStart;
musicAudio.addEventListener("error", () => {
  musicArtist.textContent = "Song file could not load.";
});

function checkTikTokLogin() {
  const username = phoneLoginUser.value.trim();
  const password = phoneLoginPassword.value;

  if (username === TIKTOK_USERNAME && password === TIKTOK_PASSWORD) {
    tiktokLoggedIn = true;
    saveProgress();
    markCaseStepDoneByText("Log in to TikTok");
    setCaseStepsStatus('TikTok login successful — feed unlocked.');
    showTikTokFeed();
    return;
  }

  phoneLoginStatus.textContent = "Wrong TikTok login.";
  phoneLoginPassword.value = "";
}

function renderBox() {
  boxGalleryCode.textContent = GALLERY_CODE;
  pendantPhoto.style.backgroundImage = `url("${PENDANT_PHOTO}")`;
  boxPasswordStatus.textContent = boxUnlocked ? "The box is open." : "";
  boxPasswordForm.hidden = boxUnlocked;
  boxReward.hidden = !boxUnlocked;
  pendantButton.classList.toggle("open", pendantOpen);
}

function checkBoxPassword() {
  const password = boxPasswordInput.value.trim();

  if (password === BOX_PASSWORD) {
    boxUnlocked = true;
    saveProgress();
    boxPasswordInput.value = "";
    boxPasswordStatus.textContent = "The box opened.";
    markCaseStepDoneByText("Unlock the box");
    setCaseStepsStatus('Box opened — found the gallery code!');
    renderBox();
    return;
  }

  boxPasswordStatus.textContent = "Wrong password.";
  boxPasswordInput.value = "";
}

function togglePendant() {
  pendantOpen = !pendantOpen;
  saveProgress();
  pendantButton.classList.toggle("open", pendantOpen);
  if (pendantOpen) {
    markCaseStepDoneByText("Inspect the pendant photo for hidden text");
    setCaseStepsStatus('Pendant opened — check the photo for hidden clues.');
  }
}

function renderEnvelope() {
  envelopePasswordStatus.textContent = envelopeUnlocked ? "Letter unlocked." : "";
  envelopePasswordForm.hidden = envelopeUnlocked;
  envelopeContent.hidden = !envelopeUnlocked;
  if (goToLocationButton) {
    goToLocationButton.hidden = !envelopeUnlocked;
    goToLocationButton.disabled = false;
  }
}

function checkEnvelopePassword() {
  const password = envelopePasswordInput.value.trim();

  if (!galleryPasswordFound) {
    envelopePasswordStatus.textContent = "Find the password hidden in one of the Gallery photos first.";
    return;
  }

  if (password === GALLERY_LETTER_PASSWORD) {
    envelopeUnlocked = true;
    saveProgress();
    envelopePasswordInput.value = "";
    markCaseStepDoneByText("Unlock the letter");
    setCaseStepsStatus("Letter unlocked — when you're ready, go to the location.");
    renderEnvelope();
    return;
  }

  envelopePasswordStatus.textContent = "Wrong password.";
  envelopePasswordInput.value = "";
}

function toggleCharm() {
  charmInscription.hidden = !charmInscription.hidden;
  inspectCharm.textContent = charmInscription.hidden ? "Inspect Charm" : "Hide Inscription";
  if (!charmInscription.hidden) {
    markCaseStepDoneByText("Inspect the charm for its inscription");
    setCaseStepsStatus('Charm inspected — found a mysterious inscription.');
  }
}

function startLocationEnding() {
  if (!envelopeUnlocked) return;

  endingStarted = true;
  saveProgress();
  markCaseStepDoneByText("Go to the location");

  if (goToLocationButton) {
    goToLocationButton.disabled = true;
  }

  // Make absolutely sure the birthday song is silent during the black screen.
  if (happyBirthdayAudio) {
    happyBirthdayAudio.pause();
    happyBirthdayAudio.currentTime = 0;
    happyBirthdayAudio.src = HAPPY_BIRTHDAY_AUDIO;
    happyBirthdayAudio.loop = true;
  }

  if (locationTransition) {
    locationTransition.hidden = false;
    locationTransition.setAttribute("aria-hidden", "false");
    locationTransition.classList.add("active");
  }

  window.setTimeout(() => {
    if (locationTransition) {
      locationTransition.classList.remove("active");
      locationTransition.hidden = true;
      locationTransition.setAttribute("aria-hidden", "true");
    }

    // Show the birthday scene first. The music is deliberately started
    // on the next rendered frame so the black screen is completely gone.
    showBirthdayEnding();

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (happyBirthdayAudio) {
          happyBirthdayAudio.currentTime = 0;
          happyBirthdayAudio.play().catch((error) => {
            console.warn("Birthday audio could not play:", error);
          });
        }
      });
    });
  }, 3000);
}

function showBirthdayEnding() {
  document.querySelectorAll(".modal.active").forEach((modal) => modal.classList.remove("active"));
  if (endingScreen) {
    endingScreen.hidden = false;
    endingScreen.classList.add("active");
    endingScreen.classList.remove("letter-opened");
  }

  // Start with a fresh confetti burst every time the ending appears.
  createConfetti();
}

function createConfetti() {
  if (!endingScreen) return;

  endingScreen.querySelectorAll(".confetti-piece").forEach((piece) => piece.remove());

  const fragment = document.createDocumentFragment();
  const confettiColors = [
    "#bf8475", "#8d4f5b", "#70866a", "#f5d7a6",
    "#e7c6b2", "#6a4435", "#f7b7c5", "#ffffff"
  ];

  for (let i = 0; i < 110; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.1}s`;
    piece.style.animationDuration = `${2.8 + Math.random() * 2.2}s`;
    piece.style.setProperty("--confetti-rotation", `${Math.random() * 360}deg`);
    piece.style.setProperty("--confetti-color", confettiColors[i % confettiColors.length]);
    piece.style.setProperty("--confetti-drift", `${-90 + Math.random() * 180}px`);
    piece.style.setProperty("--confetti-size", `${0.4 + Math.random() * 0.35}rem`);
    fragment.appendChild(piece);
  }

  endingScreen.appendChild(fragment);
}

function openFinalLetter() {
  if (!endingStarted) return;

  finalLetterOpened = true;
  saveProgress();

  // Play the physical-letter opening animation first.
  if (birthdayLetter) {
    birthdayLetter.classList.remove("opened");
    void birthdayLetter.offsetWidth;
    birthdayLetter.classList.add("opened");
  }

  // Give the browser a frame to show the opening animation before the modal appears.
  window.setTimeout(() => {
    if (finalLetterModal) finalLetterModal.classList.add("active");
    if (playAgainButton) playAgainButton.hidden = false;
  }, 650);
}

function restartWholeGame() {
  // beforeunload used to save the finished game again during reload.
  // Block all saving while restarting so Play Again is a genuinely fresh game.
  isRestarting = true;

  if (caseStepAdvanceTimer !== null) {
    window.clearTimeout(caseStepAdvanceTimer);
    caseStepAdvanceTimer = null;
  }

  if (pancakeGameLoop) {
    cancelAnimationFrame(pancakeGameLoop);
    pancakeGameLoop = null;
  }

  pancakePlaying = false;
  pianoPlaying = false;

  if (happyBirthdayAudio) {
    happyBirthdayAudio.pause();
    happyBirthdayAudio.currentTime = 0;
  }
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  }
  if (pianoSong) {
    pianoSong.pause();
    pianoSong.currentTime = 0;
  }

  clearSavedProgress();

  // Reset the UI immediately as well as reloading, so no old ending state flashes.
  document.querySelectorAll(".modal.active").forEach((modal) => modal.classList.remove("active"));
  if (endingScreen) {
    endingScreen.classList.remove("active", "letter-opened");
    endingScreen.hidden = true;
    endingScreen.querySelectorAll(".confetti-piece").forEach((piece) => piece.remove());
  }
  if (finalLetterBody) finalLetterBody.value = finalLetterBody.defaultValue;
  if (envelopeLetterBody) envelopeLetterBody.value = envelopeLetterBody.defaultValue;
  if (birthdayLetter) birthdayLetter.classList.remove("opened");
  if (playAgainButton) playAgainButton.hidden = true;

  window.setTimeout(() => {
    window.location.reload();
  }, 0);
}

function showGalleryLock() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryScreen.hidden = true;
  whatsappScreen.hidden = true;
  tiktokScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  galleryLockScreen.hidden = false;
  galleryCodeStatus.textContent = "";
  galleryCodeForm.reset();
  galleryCodeInput.focus();
}

function checkGalleryCode() {
  if (galleryCodeInput.value.trim() === GALLERY_CODE) {
    galleryUnlocked = true;
    saveProgress();
    galleryCodeStatus.textContent = "Gallery unlocked.";
    markCaseStepDoneByText("Unlock the Gallery");
    setCaseStepsStatus('Gallery unlocked — check the photos for clues.');
    window.setTimeout(showGalleryApp, 250);
    return;
  }

  galleryCodeStatus.textContent = "Wrong gallery code.";
  galleryCodeInput.value = "";
}

function showGalleryApp() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  whatsappScreen.hidden = true;
  tiktokScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  galleryScreen.hidden = false;
  renderGallery();
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  GALLERY_MEDIA.forEach((item, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "gallery-tile";
    tile.dataset.galleryIndex = index;
    tile.setAttribute("aria-label", `${item.title || "Gallery item"} ${index + 1}`);

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.addEventListener("error", () => {
        video.remove();
        const placeholder = document.createElement("p");
        placeholder.className = "gallery-missing";
        placeholder.textContent = `Add your video here: ${item.src}`;
        tile.appendChild(placeholder);
      });
      tile.appendChild(video);
      tile.classList.add("video-tile");
    } else {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.title || `Gallery photo ${index + 1}`;
      image.addEventListener("error", () => {
        image.remove();
        const placeholder = document.createElement("p");
        placeholder.className = "gallery-missing";
        placeholder.textContent = `Add your image here: ${item.src}`;
        tile.appendChild(placeholder);
      });
      tile.appendChild(image);
    }

    tile.addEventListener("click", () => inspectGalleryPhoto(index));
    galleryGrid.appendChild(tile);
  });
}

function inspectGalleryPhoto(index) {
  if (index !== 3) {
    galleryCodeStatus.textContent = "Just a memory... keep looking through the photos.";
    return;
  }

  galleryPasswordFound = true;
  saveProgress();
  galleryCodeStatus.textContent = `You found a handwritten password in this photo: ${GALLERY_LETTER_PASSWORD}`;
  markCaseStepDoneByText("Find the letter password in a gallery photo");
  setCaseStepsStatus("You found the letter password — open the envelope and enter it.");
}


function showTikTokFeed() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneLogin.hidden = true;
  phoneHome.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  whatsappScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  tiktokScreen.hidden = false;
  tiktokStep = 0;
  renderTikTokItem();
}

function showWhatsAppApp() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  whatsappScreen.hidden = false;
  activeWhatsappChat = "mom";
  startWhatsAppGame();
}

function showNextTikTokItem() {
  tiktokStep += 1;
  renderTikTokItem();
}

function renderTikTokItem() {
  stopTikTokMedia();

  const itemCount = TIKTOK_VIDEOS.length + 2;

  if (tiktokStep === 0) {
    renderTikTokImage(TIKTOK_START_IMAGE, "TikTok intro image");
  } else if (tiktokStep <= TIKTOK_VIDEOS.length) {
    renderTikTokVideo(TIKTOK_VIDEOS[tiktokStep - 1]);
  } else {
    renderTikTokImage(TIKTOK_END_IMAGE, "TikTok ending image");
  }

  tiktokNext.hidden = tiktokStep >= itemCount - 1;
}

function renderTikTokImage(src, alt) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.addEventListener("error", () => {
    showTikTokMissingMedia(src);
  });
  tiktokStage.replaceChildren(image);
}

function renderTikTokVideo(src) {
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.addEventListener("error", () => {
    showTikTokMissingMedia(src);
  });
  tiktokStage.replaceChildren(video);
  video.play().catch(() => {
    video.controls = true;
  });
}

function showTikTokMissingMedia(src) {
  const message = document.createElement("p");
  message.className = "tiktok-message";
  message.textContent = `Add your file here: ${src}`;
  tiktokStage.replaceChildren(message);
}

function stopTikTokMedia() {
  const video = tiktokStage.querySelector("video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
}

function checkInstagramLogin() {
  const username = phoneLoginUser.value.trim();
  const password = phoneLoginPassword.value;

  if (username === INSTAGRAM_USERNAME && password === INSTAGRAM_PASSWORD) {
    instagramLoggedIn = true;
    saveProgress();

    if (instagramLeafGameCompleted) {
      setCaseStepsStatus('Instagram is already logged in — feed unlocked.');
      showInstagramFeed();
    } else {
      setCaseStepsStatus('Instagram logged in — complete the leaf game to see posts.');
      showInstagramLeafGame();
    }
    return;
  }

  phoneLoginStatus.textContent = "Wrong Instagram login.";
  phoneLoginPassword.value = "";
}

function showInstagramFeed() {
  phoneLogin.hidden = true;
  phoneHome.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  whatsappScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  instagramLeafGame.hidden = true;
  instagramScreen.hidden = false;
  markCaseStepDoneByText("Login to Instagram and complete the leaf game");
  setCaseStepsStatus('Instagram feed unlocked — check the posts for clues.');
  renderInstagramFeed();
}

function showInstagramLeafGame() {
  phoneLogin.hidden = true;
  phoneHome.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  whatsappScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = false;
  leafRound = 1;
  renderLeafRound();
}

function renderLeafRound() {
  const color = LEAF_COLORS[(leafRound - 1) % LEAF_COLORS.length];
  const difference = Math.max(4, 24 - leafRound * 2);
  const direction = leafRound % 2 === 0 ? -1 : 1;
  const answerLightness = Math.max(18, Math.min(72, color.lightness + difference * direction));

  leafAnswer = (leafRound * 7 + 3) % LEAF_GAME_TILES;
  leafGameStatus.textContent = `Round ${leafRound} of ${LEAF_GAME_ROUNDS}`;
  leafGameBoard.innerHTML = "";

  for (let index = 0; index < LEAF_GAME_TILES; index += 1) {
    const leaf = document.createElement("button");
    leaf.type = "button";
    leaf.className = "leaf-choice";
    leaf.setAttribute("aria-label", `Leaf ${index + 1}`);

    const lightness = index === leafAnswer ? answerLightness : color.lightness;
    leaf.style.setProperty("--leaf-color", `hsl(${color.hue} ${color.saturation}% ${lightness}%)`);
    leaf.style.setProperty("--leaf-shadow", `hsl(${color.hue} ${color.saturation}% ${Math.max(16, lightness - 18)}%)`);
    leaf.addEventListener("click", () => chooseLeaf(index));
    leafGameBoard.appendChild(leaf);
  }
}

function chooseLeaf(index) {
  if (index !== leafAnswer) {
    leafGameStatus.textContent = `Try again. Round ${leafRound} of ${LEAF_GAME_ROUNDS}`;
    leafGameBoard.classList.add("miss");
    window.setTimeout(() => leafGameBoard.classList.remove("miss"), 250);
    return;
  }

  if (leafRound >= LEAF_GAME_ROUNDS) {
    instagramLeafGameCompleted = true;
    saveProgress();
    leafGameStatus.textContent = "Feed unlocked.";
    window.setTimeout(showInstagramFeed, 450);
    return;
  }

  leafRound += 1;
  leafGameStatus.textContent = "Correct.";
  window.setTimeout(renderLeafRound, 250);
}

function renderInstagramFeed() {
  instagramFeed.innerHTML = "";

  INSTAGRAM_POSTS.forEach((postData, index) => {
    const post = document.createElement("article");
    post.className = "instagram-post";

    const header = document.createElement("header");
    header.className = "instagram-post-header";
    header.innerHTML = `
      <span class="instagram-avatar"></span>
      <span class="instagram-user">rena.case</span>
      <span class="instagram-more">...</span>
    `;

    const imageWrap = document.createElement("div");
    imageWrap.className = "instagram-photo-frame";

    const image = document.createElement("img");
    image.src = postData.image;
    image.alt = `Instagram post ${index + 1}`;
    image.addEventListener("error", () => {
      image.remove();
      const placeholder = document.createElement("p");
      placeholder.className = "instagram-missing";
      placeholder.textContent = `Add your image here: ${postData.image}`;
      imageWrap.appendChild(placeholder);
    });
    imageWrap.appendChild(image);

    const actions = document.createElement("div");
    actions.className = "instagram-actions";
    actions.innerHTML = `
      <button class="instagram-action" type="button" aria-label="Like">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6c-1.7-1.7-4.5-1.6-6.1.2L12 7.6 9.3 4.8C7.7 3 4.9 2.9 3.2 4.6 1.4 6.4 1.5 9.3 3.4 11.1L12 19.5l8.6-8.4c1.9-1.8 2-4.7.2-6.5Z"/></svg>
      </button>
      <button class="instagram-action" type="button" aria-label="Comment">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.9L3 20.5l1.4-4.4A8.1 8.1 0 0 1 3 11.5a8.5 8.5 0 0 1 18 0Z"/></svg>
      </button>
      <button class="instagram-action" type="button" aria-label="Share">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 3 9.8 14.2"/><path d="m22 3-7 18-5.2-6.8L3 11.5 22 3Z"/></svg>
      </button>
      <button class="instagram-action instagram-save-action" type="button" aria-label="Save">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>
      </button>
    `;

    const likes = document.createElement("p");
    likes.className = "instagram-likes";
    likes.textContent = postData.likes;

    const caption = document.createElement("p");
    caption.className = "instagram-caption";
    const captionUser = document.createElement("strong");
    captionUser.textContent = "rena.case";
    caption.append(captionUser, " ", postData.caption);

    const comments = document.createElement("p");
    comments.className = "instagram-comments";
    comments.textContent = "View all comments";

    post.append(header, imageWrap, actions, likes, caption, comments);
    instagramFeed.appendChild(post);
  });

  // Mark the "Check Instagram posts" step as done when feed is rendered
  markCaseStepDoneByText("Check Instagram posts for useful information");
  setCaseStepsStatus('Instagram posts checked — found useful information.');
}

function showNotesApp() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  notesScreen.hidden = false;
  noteTitle.textContent = NOTES_APP_NOTE.title;
  noteBody.textContent = NOTES_APP_NOTE.body;
  markCaseStepDoneByText("Unlock the Notes app");
  setCaseStepsStatus('Notes app opened — information found.');
}

function showMusicApp() {
  phoneShell?.classList.remove("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  musicScreen.hidden = false;
  renderMusicList();
}

function renderMusicList() {
  musicList.innerHTML = "";

  MUSIC_SONGS.forEach((song, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "music-song-button";
    button.innerHTML = `<span>${song.title}</span><small>${song.artist}</small>`;
    button.addEventListener("click", () => playSong(index));
    musicList.appendChild(button);
  });
}

function playSong(index) {
  const song = MUSIC_SONGS[index];
  if (!song) return;
  
  musicTitle.textContent = song.title;
  musicArtist.textContent = song.artist;
  musicCover.style.backgroundImage = `url("${song.cover}")`;
  musicCover.style.backgroundSize = "cover";
  musicCover.style.backgroundPosition = "center";
  musicAudio.src = song.src;
  musicAudio.load();
  
  musicAudio.play().catch(() => {
    musicAudio.controls = true;
    musicArtist.textContent = "Press play on the audio bar.";
  });
}

function stopMusic() {
  if (!musicAudio) return;

  musicAudio.pause();
}

function showPianoTilesGame() {
  phoneShell?.classList.add("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pancakeGameScreen.hidden = true;
  pianoTilesScreen.hidden = false;
  resetPianoGame();
}

function resetPianoGame() {
  pianoStep = 0;
  pianoPlaying = false;
  pianoPoints = 0;
  pianoStart.hidden = false;
  pianoScore.textContent = "0";
  pianoCombo.textContent = "Ready";
  pianoStatus.textContent = "Finish the tiles to unlock Music.";
  pianoTilesBoard.innerHTML = "";
  pianoSong.pause();
  pianoSong.currentTime = 0;
  pianoSong.src = PIANO_TILE_SONG;
  renderPianoRows();
}

function startPianoGame() {
  if (musicUnlocked) {
    showMusicApp();
    return;
  }
  resetPianoGame();
  pianoPlaying = true;
  pianoStart.hidden = true;
  renderPianoRows();
  pianoCombo.textContent = "Go";
  pianoStatus.textContent = "Tap the glowing tiles from bottom to top.";
  pianoSong.play().catch(() => {
    pianoStatus.textContent = "Tap the black tiles. Use the audio controls if the song does not start.";
  });
}

function renderPianoRows() {
  pianoTilesBoard.innerHTML = "";

  PIANO_TILE_PATTERN.forEach((column, rowIndex) => {
    const row = document.createElement("div");
    row.className = "piano-row";
    row.dataset.row = rowIndex;

    for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "piano-tile";
      tile.disabled = !pianoPlaying;

      if (columnIndex === column) {
        tile.classList.add("black-tile");
        tile.innerHTML = "<span></span>";
        tile.addEventListener("click", () => pressPianoTile(rowIndex));
      } else {
        tile.addEventListener("click", missPianoTile);
      }

      row.appendChild(tile);
    }

    pianoTilesBoard.prepend(row);
  });

  markCurrentPianoTile();
}

function pressPianoTile(rowIndex) {
  if (!pianoPlaying) return;

  const expectedRow = pianoStep;
  if (rowIndex !== expectedRow) {
    missPianoTile();
    return;
  }

  const rows = Array.from(pianoTilesBoard.querySelectorAll(".piano-row"));
  const hitRow = rows.find((row) => Number(row.dataset.row) === rowIndex);
  const hitTile = hitRow ? hitRow.querySelector(".black-tile") : null;
  if (hitTile) hitTile.classList.add("hit");

  pianoStep += 1;
  pianoPoints += 100;
  pianoScore.textContent = String(pianoPoints);
  pianoCombo.textContent = `${pianoStep} combo`;
  pianoStatus.textContent = `${pianoStep}/${PIANO_TILE_PATTERN.length}`;
  markCurrentPianoTile();

  if (pianoStep >= PIANO_TILE_PATTERN.length) {
    finishPianoGame();
  }
}

function missPianoTile() {
  if (!pianoPlaying) return;

  resetPianoGame();
  pianoCombo.textContent = "Miss";
  pianoStatus.textContent = "Oops, try again.";
}

function markCurrentPianoTile() {
  const rows = Array.from(pianoTilesBoard.querySelectorAll(".piano-row"));
  rows.forEach((row) => row.querySelectorAll(".black-tile").forEach((tile) => tile.classList.remove("current")));

  const currentRow = rows.find((row) => Number(row.dataset.row) === pianoStep);
  if (currentRow) {
    const currentTile = currentRow.querySelector(".black-tile");
    if (currentTile) currentTile.classList.add("current");
  }
}

function finishPianoGame() {
  musicUnlocked = true;
  saveProgress();
  markCaseStepDoneByText("Unlock the music app");
  pianoPlaying = false;
  pianoSong.pause();
  pianoCombo.textContent = "Unlocked";
  pianoStatus.textContent = "Music unlocked.";
  window.setTimeout(showMusicApp, 700);
}

function stopPianoGame() {
  if (!pianoSong) return;

  pianoPlaying = false;
  pianoSong.pause();
}

function stopPancakeGame() {
  if (!pancakeGameLoop) return;
  
  pancakePlaying = false;
  cancelAnimationFrame(pancakeGameLoop);
  pancakeGameLoop = null;
}

// Pancake Game Functions
function showPancakeGame() {
  phoneShell?.classList.add("mini-game-phone");
  phoneHome.hidden = true;
  phoneLogin.hidden = true;
  galleryLockScreen.hidden = true;
  galleryScreen.hidden = true;
  tiktokScreen.hidden = true;
  whatsappScreen.hidden = true;
  instagramScreen.hidden = true;
  instagramLeafGame.hidden = true;
  notesScreen.hidden = true;
  musicScreen.hidden = true;
  pianoTilesScreen.hidden = true;
  pancakeGameScreen.hidden = false;
  
  setTimeout(() => {
    resetPancakeGame();
  }, 100);
}

function handlePancakeStart() {
  if (notesUnlocked) {
    showNotesApp();
    return;
  }

  startPancakeGame();
}

function resetPancakeGame() {
  pancakePlaying = false;
  pancakeScore = 0;
  pancakeStack = [];
  pancakeMoving = null;
  pancakeX = 140;
  pancakeY = 72;
  pancakeVelocity = 0;
  pancakeDirection = 1;
  pancakeCount.textContent = "0";
  pancakeStatus.textContent = `Stack ${PANCAKE_TARGET} pancakes to unlock Notes.`;
  pancakeStart.hidden = false;
  pancakeStart.textContent = "Tap to start";
  
  if (pancakeGameLoop) {
    cancelAnimationFrame(pancakeGameLoop);
    pancakeGameLoop = null;
  }
  
  drawPancakeGame();
}

function startPancakeGame() {
  resetPancakeGame();
  pancakePlaying = true;
  pancakeStart.hidden = true;
  pancakeStatus.textContent = "Tap when the pancake is lined up with the stack.";
  pancakeLastTime = performance.now();
  pancakeGameLoop = requestAnimationFrame(updatePancakeGame);
}

function updatePancakeGame(currentTime) {
  if (!pancakePlaying) return;
  
  const deltaTime = (currentTime - pancakeLastTime) / 1000;
  pancakeLastTime = currentTime;

  if (!pancakeMoving) {
    const pancakeRadius = 24;
    const speed = 115 + pancakeScore * 7;
    pancakeX += pancakeDirection * speed * deltaTime;

    if (pancakeX >= 280 - pancakeRadius) {
      pancakeX = 280 - pancakeRadius;
      pancakeDirection = -1;
    } else if (pancakeX <= pancakeRadius) {
      pancakeX = pancakeRadius;
      pancakeDirection = 1;
    }
  }
  
  if (pancakeMoving) {
    pancakeVelocity += 500 * deltaTime;
    pancakeY += pancakeVelocity * deltaTime;
    
    const targetY = 350 - (pancakeStack.length + 1) * 15;
    
    if (pancakeY >= targetY) {
      pancakeY = targetY;
      pancakeVelocity = 0;
      
      const stackTop = pancakeStack.length > 0 ? pancakeStack[pancakeStack.length - 1].x : 140;
      const offset = Math.abs(pancakeX - stackTop);
      
      if (offset <= 34) {
        pancakeStack.push({
          x: pancakeX,
          y: pancakeY,
          size: 15 + Math.random() * 5
        });
        pancakeScore++;
        pancakeCount.textContent = String(pancakeScore);
        pancakeStatus.textContent = `${pancakeScore}/${PANCAKE_TARGET} pancakes stacked!`;
        
        if (pancakeScore >= PANCAKE_TARGET) {
          winPancakeGame();
          return;
        }
      } else {
        gameOverPancake();
        return;
      }
      
      pancakeMoving = null;
      pancakeY = 72;
    }
    
    // Check if pancake fell off screen
    if (pancakeY > 400) {
      gameOverPancake();
      return;
    }
  }
  
  drawPancakeGame();
  
  pancakeGameLoop = requestAnimationFrame(updatePancakeGame);
}

function drawPancakeGame() {
  if (!pancakeCanvas) {
    return;
  }
  
  const ctx = pancakeCanvas.getContext('2d');
  if (!ctx) {
    return;
  }
  
  pancakeCanvas.width = 280;
  pancakeCanvas.height = 400;
  
  const width = pancakeCanvas.width;
  const height = pancakeCanvas.height;
  
  ctx.clearRect(0, 0, width, height);
  
  ctx.fillStyle = '#FFF8DC';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(20, 350, 240, 20);
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(20, 355, 240, 5);

  drawStackTarget(ctx);
  
  pancakeStack.forEach((pancake, index) => {
    const pancakeY = 350 - (index + 1) * 15;
    drawPancake(ctx, pancake.x, pancakeY, pancake.size);
  });
  
  if (pancakeMoving) {
    drawPancake(ctx, pancakeX, pancakeY, 15);
  }
  
  if (!pancakeMoving && !notesUnlocked) {
    drawPancake(ctx, pancakeX, 72, 18);
    ctx.fillStyle = pancakePlaying ? '#FFF' : '#6a4435';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(pancakePlaying ? 'DROP' : 'READY', pancakeX, 105);
  }
}

function drawStackTarget(ctx) {
  ctx.strokeStyle = 'rgba(106, 68, 53, 0.45)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.ellipse(140, 335, 24, 8, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPancake(ctx, x, y, size) {
  ctx.fillStyle = '#D2691E';
  ctx.beginPath();
  ctx.ellipse(x, y, size, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#E8A87C';
  ctx.beginPath();
  ctx.ellipse(x - size * 0.3, y - size * 0.1, size * 0.3, size * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + size * 0.2, y + size * 0.1, 3, 0, Math.PI * 2);
  ctx.fill();
}

function gameOverPancake() {
  pancakePlaying = false;
  pancakeMoving = null;
  pancakeY = 72;
  pancakeStatus.textContent = `Pancake fell! You stacked ${pancakeScore}/10. Try again!`;
  pancakeStart.hidden = false;
  pancakeStart.textContent = "Tap to restart";
  
  if (pancakeGameLoop) {
    cancelAnimationFrame(pancakeGameLoop);
    pancakeGameLoop = null;
  }

  drawPancakeGame();
}

function winPancakeGame() {
  pancakePlaying = false;
  notesUnlocked = true;
  saveProgress();
  pancakeStatus.textContent = "Notes unlocked! 🎉";
  pancakeStart.hidden = false;
  pancakeStart.textContent = "Open Notes";
  
  markCaseStepDoneByText("Unlock the Notes app");
  setCaseStepsStatus('Pancake stacking completed — Notes unlocked!');
  
  if (pancakeGameLoop) {
    cancelAnimationFrame(pancakeGameLoop);
    pancakeGameLoop = null;
  }

  drawPancakeGame();
}

// Pancake game controls
function dropPancake() {
  if (!pancakePlaying || pancakeMoving) return;
  pancakeMoving = true;
  pancakeVelocity = 0;
  pancakeY = 72;
}

pancakeGame.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  dropPancake();
});

function startWhatsAppGame() {
  whatsappChats.hidden = true;
  whatsappThread.hidden = true;
  whatsappThreadOpen = false;
  whatsappGame.hidden = false;
  whatsappRound = 1;
  renderWhatsAppRound();
}

function renderWhatsAppRound() {
  whatsappBoard.innerHTML = "";
  const quiz = WHATSAPP_QUIZ[(whatsappRound - 1) % WHATSAPP_QUIZ.length];
  whatsappAnswerIndex = quiz.correctIndex;

  whatsappGameStatus.textContent = `Question ${whatsappRound} of ${WHATSAPP_QUIZ.length}. Pick the correct answer.`;

  const prompt = document.createElement("p");
  prompt.className = "whatsapp-quiz-prompt";
  prompt.textContent = quiz.prompt;
  whatsappBoard.appendChild(prompt);

  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "whatsapp-item whatsapp-quiz-option";
    button.dataset.index = String(index);
    const icon = document.createElement("span");
    icon.className = "whatsapp-item-icon";
    icon.textContent = String(index + 1);

    const label = document.createElement("strong");
    label.textContent = option;

    const hint = document.createElement("small");
    hint.textContent = "tap to choose";

    button.append(icon, label, hint);
    button.addEventListener("click", () => chooseWhatsAppItem(index));
    whatsappBoard.appendChild(button);
  });
}

function chooseWhatsAppItem(index) {
  if (index !== whatsappAnswerIndex) {
    whatsappGameStatus.textContent = "Not quite. Try again.";
    return;
  }

  if (whatsappRound >= WHATSAPP_QUIZ.length) {
    whatsappGameStatus.textContent = "Chats unlocked.";
    window.setTimeout(showWhatsAppChats, 350);
    return;
  }

  whatsappRound += 1;
  whatsappGameStatus.textContent = "Correct. Next round.";
  window.setTimeout(renderWhatsAppRound, 300);
}

function showWhatsAppChats() {
  whatsappGame.hidden = true;
  whatsappChats.hidden = false;
  markCaseStepDoneByText("Unlock WhatsApp and read the chats carefully");
  setCaseStepsStatus('WhatsApp unlocked — check the chats for clues.');
  showWhatsAppChatList();
}

function showWhatsAppChatList() {
  whatsappThreadOpen = false;
  whatsappChats.classList.remove("thread-open");
  whatsappThread.hidden = true;
  whatsappMessages.innerHTML = "";
}

function renderWhatsAppChat(chatName) {
  activeWhatsappChat = chatName;
  whatsappThreadOpen = true;
  whatsappChats.classList.add("thread-open");
  whatsappThread.hidden = false;
  whatsappThreadAvatar.textContent = chatName.slice(0, 1).toUpperCase();
  whatsappThreadName.textContent = chatName;
  whatsappThreadNote.textContent = "online";
  whatsappMessages.innerHTML = "";

  (WHATSAPP_CHATS[chatName] || []).forEach((message) => {
    const bubble = document.createElement("p");
    bubble.className = `whatsapp-bubble ${message.who === "me" ? "outgoing" : "incoming"}`;
    bubble.textContent = message.text;
    whatsappMessages.appendChild(bubble);
  });
}

document.querySelectorAll(".whatsapp-chat").forEach((chatButton) => {
  chatButton.addEventListener("click", () => {
    renderWhatsAppChat(chatButton.dataset.chat);
  });
});

prevNotebookPage.addEventListener("click", () => {
  notebookSpread = Math.max(0, notebookSpread - 1);
  renderNotebook();
});

nextNotebookPage.addEventListener("click", () => {
  const maxSpread = Math.floor((notebookPages.length - 1) / 2);
  notebookSpread = Math.min(maxSpread, notebookSpread + 1);
  renderNotebook();
});

function renderNotebook() {
  const leftIndex = notebookSpread * 2;
  const rightIndex = leftIndex + 1;
  const maxSpread = Math.floor((notebookPages.length - 1) / 2);

  leftPageTitle.textContent = `page ${leftIndex + 1}`;
  rightPageTitle.textContent = rightIndex < notebookPages.length ? `page ${rightIndex + 1}` : "";
  leftPageText.textContent = notebookPages[leftIndex] || "";
  rightPageText.textContent = rightIndex < notebookPages.length ? (notebookPages[rightIndex] || "") : "";
  notebookPageCount.textContent = rightIndex < notebookPages.length ? `pages ${leftIndex + 1}-${rightIndex + 1}` : `page ${leftIndex + 1}`;
  prevNotebookPage.disabled = notebookSpread === 0;
  nextNotebookPage.disabled = notebookSpread >= maxSpread;
}


if (playAgainButton) {
  playAgainButton.addEventListener("click", restartWholeGame);
}
