
"use strict";

/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuBtn && mobileMenu && menuIcon) {
  menuBtn.addEventListener("click", () => {
    const isOpening = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(isOpening));

    menuIcon.innerHTML = isOpening
      ? '<path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/>'
      : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");

      menuIcon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
    });
  });
}

/* ================= SEARCH ELEMENTS ================= */

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

let searchResults = document.getElementById("searchResults");

if (!searchResults && searchBox) {
  searchResults = document.createElement("div");
  searchResults.id = "searchResults";
  searchResults.className =
    "mx-auto mt-3 max-w-xl overflow-hidden rounded-xl border border-yellow-400/30 bg-gray-950 shadow-xl hidden";

  searchBox.appendChild(searchResults);
}

if (searchBtn && searchBox) {
  searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("hidden");

    if (!searchBox.classList.contains("hidden")) {
      searchInput?.focus();
    } else {
      searchResults?.classList.add("hidden");
    }
  });
}

/* ================= 20 PLAYERS ================= */

const players = [
  { name: "UJJWAL BARIK", image: "PLAYER (_1_).jpg", role: "All-Rounder", number: 1, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "MEHABUB MONDAL", image: "PLAYER (2).jpg", role: "All-Rounder", number: 2, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "ARNOB MONDAL", image: "PLAYER 3.jpg", role: "All-Rounder", number: 3, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "WARISH ALI LASKAR", image: "PLAYER 4.jpg", role: "All-Rounder", number: 4, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "AVIJIT NASKAR", image: "PLAYER 5.jpg", role: "All-Rounder", number: 5, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "BARUN", image: "PLAYER (6).jpg", role: "All-Rounder", number: 6, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "SOURAV ( WK )", image: "PLAYER 7.jpg", role: "Wicket Keeper & Batsman", number: 7, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "HASAN LASKAR", image: "PLAYER 6.jpg", role: "All-Rounder", number: 8, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "AVIJIT", image: "PLAYER 9.jpg", role: "Bowler", number: 9, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "FAIJAN LASKAR", image: "PLAYER 8.jpg", role: "Batsman", number: 10, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "JISHAN", image: "PLAYER 11.jpg", role: "Batsman", number: 11, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "KAZI KARIMUN", image: "PLAYER 12.jpg", role: "Bowler", number: 12, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "ANIRUDDHO", image: "PLAYER 13.jpg", role: "Bowler", number: 13, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "JAHIR SARDAR", image: "PLAYER 14.jpg", role: "Bowler", number: 14, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "SADDAM MUNSHI", image: "PLAYER 15.jpg", role: "Bowler", number: 15, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "MRINOY", image: "PLAYER 16.jpg", role: "Bowler", number: 16, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "Player 17", image: "player17.jpg", role: "Wicket Keeper", number: 17, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "AYUB SARDAR", image: "PLAYER 18.jpg", role: "Batsman", number: 18, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "KAZI FIROZ", image: "PLAYER 19.jpg", role: "Bowler", number: 19, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." },
  { name: "Player 20", image: "player20.jpg", role: "All-Rounder", number: 20, batting: "Runs: Not added", bowling: "Wickets: Not added", about: "AS UNITED CRICKET TEAM PLAYER." }
];

/* ================= MANAGEMENT ================= */

const management = [
  {
    uid: "p4ZUmN9RPrXRtcDPpEP9MNQO7Zf2",
    name: "CASHIER",
    role: "SADDAM MUNSHI",
    image: "CASHIER.jpg",
    about: "Managing the team's management."
  },
  {
    uid: "e4YqZfnMaXMuEfsP6Xr33a7rfhh2",
    name: "CASHIER",
    role: "HASAN LASKAR",
    image: "PLAYER 6.jpg",
    about: "Managing the team's finances."
  },
  {
    uid: "Hihf73uMhMak4imMdo0U8TPrL7u1",
    name: "CASHIER ADMIN",
    role: "WARISH ALI LASKAR",
    image: "WARISH CASHIER.jpg",
    about: "Leading the team on and off the field."
  },
  {
    uid: "9v33lKsZJEh6QrNneoz5ktHSxX33",
    name: "ASSISTANT CASHIER",
    role: "MEHABUB MONDAL",
    image: "PLAYER 2.jpg",
    about: "Supporting the team."
  }
];

/* ================= FINANCE EVENT ================= */

function notifyFinanceProfile(
  isManagement,
  profileUid = null,
  profileName = ""
) {
  window.dispatchEvent(
    new CustomEvent("club-profile-change", {
      detail: {
        isManagement,
        profileUid,
        profileName
      }
    })
  );
}

/* ================= PROFILE POPUP ================= */

const profileModal = document.getElementById("profileModal");

function openTeamProfile(person) {
  if (!profileModal) return;

  const image = document.getElementById("profileImage");
  const playerStats = document.getElementById("playerStats");
  const managementFinance = document.getElementById("managementFinance");
  const profileBox = profileModal.querySelector(".profile-box");

  if (image) {
    image.onerror = function () {
      this.onerror = null;
      this.src =
        "https://placehold.co/400x400/111827/FACC15?text=Add+Photo";
    };

    image.src = `./IMAGE/${person.image}`;
    image.alt = person.name;
  }

  const profileNameElement = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileAbout = document.getElementById("profileAbout");

  if (profileNameElement) {
    profileNameElement.textContent = person.name;
  }

  if (profileRole) {
    profileRole.textContent = person.role;
  }

  if (profileAbout) {
    profileAbout.textContent = person.about || "";
  }

  const managementMember = management.find(
    (member) =>
      member.name === person.name &&
      member.role === person.role
  );

  const isManagement = Boolean(managementMember);

  // Finance-এ profile object-এর UID ব্যবহার হবে।
  // Search result থেকেও profile খুললে UID অক্ষত থাকবে।
  notifyFinanceProfile(
    isManagement,
    isManagement ? managementMember.uid : null,
    isManagement ? managementMember.role : ""
  );

  if (isManagement) {
    playerStats?.classList.add("hidden");
    profileBox?.classList.add("management-compact");
  } else {
    profileBox?.classList.remove("management-compact");
    playerStats?.classList.remove("hidden");
    managementFinance?.classList.add("hidden");

    const profileNumber = document.getElementById("profileNumber");
    const profileBatting = document.getElementById("profileBatting");
    const profileBowling = document.getElementById("profileBowling");

    if (profileNumber) {
      profileNumber.textContent = person.number
        ? `Jersey Number: ${person.number}`
        : "";
    }

    if (profileBatting) {
      profileBatting.textContent =
        `Batting: ${person.batting || "Not added"}`;
    }

    if (profileBowling) {
      profileBowling.textContent =
        `Bowling: ${person.bowling || "Not added"}`;
    }
  }

  profileModal.classList.remove("hidden");
  profileModal.classList.add("flex");
}

function closeTeamProfile() {
  if (!profileModal) return;

  profileModal.classList.add("hidden");
  profileModal.classList.remove("flex");

  notifyFinanceProfile(false, null, "");

  document.getElementById("managementFinance")?.classList.add("hidden");
}

document
  .getElementById("closeProfile")
  ?.addEventListener("click", closeTeamProfile);

profileModal?.addEventListener("click", (event) => {
  if (event.target === profileModal) {
    closeTeamProfile();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTeamProfile();
  }
});

/* ================= CREATE TEAM CARD ================= */

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

  button.addEventListener("click", () => {
    openTeamProfile(person);
  });

  content.append(name, role, button);
  card.append(image, content);

  return card;
}

/* ================= DISPLAY PLAYER & MANAGEMENT CARDS ================= */

function renderTeamCards() {
  const playerGrid = document.getElementById("playerGrid");
  const managementGrid = document.getElementById("managementGrid");

  if (!playerGrid) {
    console.error('Player grid missing: check id="playerGrid" in index.html');
  } else {
    playerGrid.replaceChildren();

    players.forEach((player, index) => {
      playerGrid.appendChild(createTeamCard(player, index));
    });
  }

  if (!managementGrid) {
    console.error('Management grid missing: check id="managementGrid" in index.html');
  } else {
    managementGrid.replaceChildren();

    management.forEach((person, index) => {
      managementGrid.appendChild(createTeamCard(person, index));
    });
  }

  console.log("Players rendered:", playerGrid?.children.length ?? 0);
  console.log("Management rendered:", managementGrid?.children.length ?? 0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderTeamCards, {
    once: true
  });
} else {
  renderTeamCards();
}

/* ================= SEARCH MEMBERS ================= */

function performTeamSearch() {
  if (!searchInput || !searchResults) return;

  const query = searchInput.value.trim().toLowerCase();

  searchResults.replaceChildren();

  if (!query) {
    searchResults.classList.add("hidden");
    return;
  }

  searchResults.classList.remove("hidden");

  const allPeople = [
    ...players.map((person) => ({
      ...person,
      category: "Player",
      section: "players"
    })),
    ...management.map((person) => ({
      ...person,
      category: "Management",
      section: "management"
    }))
  ];

  const matches = allPeople.filter((person) =>
    `${person.name} ${person.role} ${person.number || ""}`
      .toLowerCase()
      .includes(query)
  );

  if (!matches.length) {
    const message = document.createElement("p");
    message.className = "p-4 text-sm text-gray-300";
    message.textContent = "No results found. Try another name.";
    searchResults.appendChild(message);
    return;
  }

  matches.forEach((person) => {
    const result = document.createElement("button");
    result.type = "button";
    result.className =
      "flex w-full items-center gap-3 border-b border-gray-800 p-3 text-left transition hover:bg-yellow-400/10";

    const image = document.createElement("img");
    image.src = `./IMAGE/${person.image}`;
    image.alt = person.name;
    image.className =
      "h-12 w-12 rounded-full border border-yellow-400 object-cover";

    image.onerror = function () {
      this.onerror = null;
      this.src =
        "https://placehold.co/100x100/111827/FACC15?text=Photo";
    };

    const details = document.createElement("span");
    details.className = "min-w-0 flex-1";

    const name = document.createElement("span");
    name.className = "block font-bold text-white";
    name.textContent = person.name;

    const role = document.createElement("span");
    role.className = "block text-sm text-yellow-400";
    role.textContent = `${person.category} · ${person.role}`;

    details.append(name, role);
    result.append(image, details);

    result.addEventListener("click", () => {
      searchResults.classList.add("hidden");

      document.getElementById(person.section)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      openTeamProfile(person);

      searchBox?.classList.add("hidden");

      if (searchInput) {
        searchInput.value = "";
      }
    });

    searchResults.appendChild(result);
  });
}

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  performTeamSearch();
});

searchInput?.addEventListener("input", performTeamSearch);

/* ================= BANNER SLIDER ================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const slideDots = document.querySelectorAll(".slide-dot");
const heroContent = document.getElementById("heroContent");

let currentSlide = 0;

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("opacity-100", i === index);
    slide.classList.toggle("opacity-0", i !== index);
  });

  slideDots.forEach((dot, i) => {
    dot.classList.toggle("bg-yellow-400", i === index);
    dot.classList.toggle("bg-white/50", i !== index);
  });

  heroContent?.querySelectorAll(".hero-text").forEach((element) => {
    element.style.animation = "none";
    void element.offsetWidth;
    element.style.animation = "";
  });

  currentSlide = index;
}

slideDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showHeroSlide(index));
});

if (heroSlides.length > 1) {
  setInterval(() => {
    showHeroSlide((currentSlide + 1) % heroSlides.length);
  }, 5000);
}

if (heroSlides.length) {
  showHeroSlide(0);
}

/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
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

/* ================= FOOTER YEAR ================= */

const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
