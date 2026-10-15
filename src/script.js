
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

// Mobile menu open / close
menuBtn.addEventListener("click", () => {
    const isOpening = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(isOpening));

    menuIcon.innerHTML = isOpening
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
});

// Close menu after clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");

        menuIcon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
    });
});

// Search box open / close
searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("hidden");

    if (!searchBox.classList.contains("hidden")) {
        searchInput.focus();
    }
});

// Demo search
searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const searchText = searchInput.value.trim();

    if (searchText) {
        alert("Search: " + searchText);
    }
});


// Bannar page Start


// AS United Cricket Banner Slider
const heroSlides = document.querySelectorAll(".hero-slide");
const slideDots = document.querySelectorAll(".slide-dot");
const heroContent = document.getElementById("heroContent");

let currentSlide = 0;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
    });

    slideDots.forEach((dot, i) => {
        dot.classList.toggle("bg-yellow-400", i === index);
        dot.classList.toggle("bg-white/50", i !== index);
    });

    // Replay text animation on every slide
    heroContent.querySelectorAll(".hero-text").forEach(text => {
        text.style.animation = "none";
        void text.offsetWidth;
        text.style.animation = "";
    });

    currentSlide = index;
}

// Click the dots to change slides
slideDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showHeroSlide(index);
    });
});

// Automatic slide every 5 seconds
setInterval(() => {
    const nextSlide = (currentSlide + 1) % heroSlides.length;
    showHeroSlide(nextSlide);
}, 5000);

// Start animation on page load
showHeroSlide(0);





// ================= 20 PLAYERS =================
// Names below are examples. Replace them with real team names.

const players = [
  { name: "UJJWAL ( VICE-CAPTAIN )", image: "PLAYER (_1_).jpg", role: "All-Rounder", number: 1 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "MEHABUB  ( CAPTAIN )", image: "PLAYER (2).jpg", role: "All-Rounder", number: 2 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "ARNOB MONDAL", image: "PLAYER 3.jpg", role: "All-Rounder", number: 3 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "WARISH ALI LASKAR", image: "PLAYER 4.jpg", role: "All-Rounder", number: 4, batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "AVIJIT NASKAR", image: "PLAYER 5.jpg", role: "All-Rounder", number: 5 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "BARUN", image: "PLAYER (6).jpg", role: "All-Rounder", number: 6 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "SOURAV ( WK )", image: "PLAYER 7.jpg", role: "Wicket Keeper & Batsman", number: 7 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "FIJAN LASKAR", image: "PLAYER 8.jpg", role: "Batsman", number: 8 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "AVIJIT", image: "PLAYER 9.jpg", role: "Bowler", number: 9 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "HASAN LASKAR", image: "PLAYER 6.jpg", role: "All-Rounder", number: 10 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "JISHAN", image: "PLAYER 11.jpg", role: "Batsman", number: 11 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "KAZI KARIMUN", image: "PLAYER 12.jpg", role: "Bowler", number: 12 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "ANIRUDDHO", image: "PLAYER 13.jpg", role: "Bowler", number: 13 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "JAHIR SARDAR", image: "PLAYER 14.jpg", role: "Bowler", number: 14 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "SADDAM MUNSHI", image: "PLAYER 15.jpg", role: "Bowler", number: 15 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "MRINOY", image: "PLAYER 16.jpg", role: "Bowler", number: 16 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "Player 17", image: "player17.jpg", role: "Wicket Keeper", number: 17 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "AYUB SARDAR", image: "PLAYER 18.jpg", role: "Batsman", number: 18 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "Player 19", image: "player19.jpg", role: "Bowler", number: 19 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."},
  { name: "Player 20", image: "player20.jpg", role: "All-Rounder", number: 20 ,batting: "Runs: Not added",bowling: "Wickets: Not added",about: "AS UNITED CRICKET TEAM PLAYER."}
];


// ================= MANAGEMENT =================

const management = [
     {
    name: "president ",
    role: "RAJU SARDAR",
    image: "PRESIDENT.jpg",
    batting: "Not added",
    bowling: "Not added",
    about: "Managing the team's finances."
  },
   {
    name: "Cashier ",
    role: "SADDAM MUNSHI",
    image: "CASHIER.jpg",
    batting: "Not added",
    bowling: "Not added",
    about: "Managing the team's finances."
  },
  
  {
    name: "SECRETARY",
    role: "HASAN LASKAR",
    image: "PLAYER 6.jpg",
    batting: "Not added",
    bowling: "Not added",
    about: "Leading the team on and off the field."
  },
  {
    name: "GAME SECRETARY",
    role: "SAJID SARDAR",
    image: "GAME SECRETARY.jpg",
    batting: "Not added",
    bowling: "Not added",
    about: "Supporting the captain and the team."
  },
 
];


// ================= CARD CREATION =================

function createTeamCard(person, index) {
  const card = document.createElement("article");
  card.className = "team-card";
  card.style.animationDelay = `${Math.min(index * 0.05, 0.5)}s`;

  const image = document.createElement("img");
  image.src = `./IMAGE/${person.image}`;
  image.alt = person.name;
  image.loading = "lazy";
  image.className = "team-card-image";

  image.onerror = function () {
    this.onerror = null;
    this.src =
      "https://placehold.co/400x400/111827/FACC15?text=Add+Photo";
  };

  const content = document.createElement("div");
  content.className = "team-card-content";

  const name = document.createElement("h3");
  name.className = "team-card-name";
  name.textContent = person.name;

  const role = document.createElement("p");
  role.className = "team-card-role";
  role.textContent = person.role;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "team-profile-button";
  button.textContent = "View Profile";
  button.addEventListener("click", () => openTeamProfile(person));

  content.append(name, role, button);
  card.append(image, content);

  return card;
}


// ================= DISPLAY CARDS =================

const playerGrid = document.getElementById("playerGrid");
const managementGrid = document.getElementById("managementGrid");

if (playerGrid) {
  players.forEach((player, index) => {
    playerGrid.appendChild(createTeamCard(player, index));
  });
}

if (managementGrid) {
  management.forEach((person, index) => {
    managementGrid.appendChild(createTeamCard(person, index));
  });
}


// ================= PROFILE POPUP =================

const profileModal = document.getElementById("profileModal");

function openTeamProfile(person) {
  if (!profileModal) return;

  const image = document.getElementById("profileImage");
  image.onerror = function () {
    this.onerror = null;
    this.src =
      "https://placehold.co/400x400/111827/FACC15?text=Add+Photo";
  };
  image.src = `./IMAGE/${person.image}`;
  image.alt = person.name;

  document.getElementById("profileName").textContent = person.name;
  document.getElementById("profileRole").textContent = person.role;
  document.getElementById("profileNumber").textContent =
    person.number ? `Jersey Number: ${person.number}` : "";
  document.getElementById("profileBatting").textContent =
    `Batting: ${person.batting}`;
  document.getElementById("profileBowling").textContent =
    `Bowling: ${person.bowling}`;
  document.getElementById("profileAbout").textContent = person.about;

  profileModal.classList.remove("hidden");
  profileModal.classList.add("flex");
}

function closeTeamProfile() {
  if (!profileModal) return;
  profileModal.classList.add("hidden");
  profileModal.classList.remove("flex");
}

const closeButton = document.getElementById("closeProfile");

if (closeButton) {
  closeButton.addEventListener("click", closeTeamProfile);
}

if (profileModal) {
  profileModal.addEventListener("click", event => {
    if (event.target === profileModal) {
      closeTeamProfile();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeTeamProfile();
  }
});






// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        contactStatus.classList.remove(
            "hidden",
            "bg-red-500/10",
            "text-red-300",
            "bg-green-500/10",
            "text-green-300"
        );

        contactStatus.classList.add(
            "bg-yellow-400/10",
            "text-yellow-300"
        );

        contactStatus.textContent =
            "Your form design is working, but message delivery is not connected yet. Please connect an email service to receive enquiries.";

        contactForm.reset();
    });
}






// ================= FOOTER YEAR =================

const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
