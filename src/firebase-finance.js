
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

/* ================= BASIC SETTINGS ================= */

const $ = (id) => document.getElementById(id);

let currentUser = null;
let currentMember = null;
let profileIsManagement = false;
let currentProfileUid = null;
let currentProfileName = "";
let authCheckVersion = 0;
let transactionLoadVersion = 0;

const ADMIN_EMAIL = "warishalilaskar11051996@gmail.com";
const ADMIN_UID = "Hihf73uMhMak4imMdo0U8TPrL7u1";

/* ================= PERMISSIONS ================= */

function isAdmin() {
  return Boolean(
    currentUser &&
    currentUser.email === ADMIN_EMAIL &&
    currentUser.uid === ADMIN_UID &&
    currentMember?.approved === true &&
    String(currentMember?.role || "").toLowerCase() === "admin"
  );
}

function isApprovedMember() {
  return Boolean(
    currentUser &&
    currentMember &&
    currentMember.approved === true
  );
}

function canUseFinance() {
  return isAdmin() || isApprovedMember();
}

function canViewCurrentProfileFinance() {
  if (
    !canUseFinance() ||
    !profileIsManagement ||
    !currentProfileUid
  ) {
    return false;
  }

  return isAdmin() || currentUser.uid === currentProfileUid;
}

/* ================= MESSAGES ================= */

function showMessage(id, message) {
  const element = $(id);
  if (element) element.textContent = message;
}

/* ================= DATE AND TIME ================= */

function formatTransactionDate(timestamp) {
  if (!timestamp) return "Date & time unavailable";

  let date;

  if (typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  if (Number.isNaN(date.getTime())) {
    return "Date & time unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

/* ================= RESET FINANCE ================= */

function resetFinance() {
  $("clubTransactionList")?.replaceChildren();

  if ($("clubIncome")) {
    $("clubIncome").textContent = "₹0.00";
  }

  if ($("clubExpense")) {
    $("clubExpense").textContent = "₹0.00";
  }

  if ($("clubBalance")) {
    $("clubBalance").textContent = "₹0.00";
  }
}

/* ================= FINANCE VISIBILITY ================= */

function updateFinanceVisibility() {
  const signedIn = Boolean(currentUser);
  const approved = canUseFinance();
  const canView = canViewCurrentProfileFinance();

  $("managementFinance")?.classList.toggle(
    "hidden",
    !profileIsManagement
  );

  $("clubFinanceForm")?.classList.toggle(
    "hidden",
    !canView
  );

  $("clubTransactionList")?.classList.toggle(
    "hidden",
    !canView
  );

  $("clubLoginBox")?.classList.toggle(
    "hidden",
    !profileIsManagement || (signedIn && approved && !canView)
  );

  $("clubEmailRegister")?.classList.toggle(
    "hidden",
    signedIn
  );

  $("clubEmailLogin")?.classList.toggle(
    "hidden",
    signedIn
  );

  $("clubEmailLogout")?.classList.toggle(
    "hidden",
    !signedIn
  );

  if (
    profileIsManagement &&
    signedIn &&
    approved &&
    !canView
  ) {
    showMessage(
      "clubLoginMessage",
      "এই Profile-এর Finance দেখতে পারবে না। নিজের Management Profile খোলো।"
    );
  }
}

/* ================= PROFILE CHANGE EVENT ================= */

window.addEventListener("club-profile-change", (event) => {
  profileIsManagement =
    event.detail?.isManagement === true;

  currentProfileUid = event.detail?.profileUid || null;
  currentProfileName = event.detail?.profileName || "";

  // পুরোনো Profile-এর অসমাপ্ত load বাতিল করো।
  transactionLoadVersion++;

  resetFinance();
  updateFinanceVisibility();

  if (canViewCurrentProfileFinance()) {
    loadTransactions();
  }
});

/* ================= LOAD TRANSACTIONS ================= */

async function loadTransactions() {
  const requestVersion = ++transactionLoadVersion;

  resetFinance();

  if (!canViewCurrentProfileFinance()) return;

  try {
    let transactionsQuery;

    if (isAdmin()) {
      // Admin সব Transaction দেখতে পারবে।
      transactionsQuery = query(
        collection(db, "clubTransactions"),
        orderBy("createdAt", "desc")
      );
    } else {
      // সাধারণ সদস্য শুধু নিজের profileUid-এর Transaction পাবে।
      transactionsQuery = query(
        collection(db, "clubTransactions"),
        where("profileUid", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(transactionsQuery);

    if (
      requestVersion !== transactionLoadVersion ||
      !canViewCurrentProfileFinance()
    ) {
      return;
    }

    let income = 0;
    let expense = 0;

    const rows = document.createDocumentFragment();

    snapshot.forEach((transactionDoc) => {
      const transaction = transactionDoc.data();

      // UI-তে অতিরিক্ত যাচাই; আসল নিরাপত্তা Rules নিশ্চিত করবে।
      if (
        !isAdmin() &&
        transaction.profileUid !== currentUser.uid
      ) {
        return;
      }

      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "income") {
        income += amount;
      } else if (transaction.type === "expense") {
        expense += amount;
      }

      const row = document.createElement("div");

      row.className =
        "flex flex-wrap items-center justify-between gap-3 border-b border-white/20 p-3";

      const details = document.createElement("div");
      details.className = "min-w-0 flex-1";

      const title = document.createElement("p");
      title.className = "font-semibold text-white";
      title.textContent =
        transaction.description || "Transaction";

      const info = document.createElement("p");
      info.className = "text-sm text-gray-300";

      const transactionType =
        transaction.type === "income" ? "Income" : "Expense";

      info.textContent =
        `${transactionType} · ₹${amount.toFixed(2)}`;

      const dateTime = document.createElement("p");
      dateTime.className = "mt-1 text-xs text-gray-400";
      dateTime.textContent =
        formatTransactionDate(transaction.createdAt);

      details.append(title, info, dateTime);
      row.appendChild(details);

      // Delete শুধু Admin করতে পারবে।
      if (isAdmin()) {
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className =
          "rounded bg-red-600 px-3 py-2 text-white";

        deleteButton.addEventListener("click", async () => {
          if (!isAdmin()) return;

          const confirmed = confirm(
            "এই Transaction-টি Delete করতে চাও?"
          );

          if (!confirmed) return;

          try {
            await deleteDoc(
              doc(db, "clubTransactions", transactionDoc.id)
            );

            showMessage(
              "clubFinanceMessage",
              "Transaction deleted."
            );

            await loadTransactions();
          } catch (error) {
            console.error("Delete error:", error);

            showMessage(
              "clubFinanceMessage",
              "Delete হয়নি। Firestore Security Rules পরীক্ষা করো।"
            );
          }
        });

        row.appendChild(deleteButton);
      }

      rows.appendChild(row);
    });

    $("clubTransactionList")?.replaceChildren(rows);

    if ($("clubIncome")) {
      $("clubIncome").textContent =
        `₹${income.toFixed(2)}`;
    }

    if ($("clubExpense")) {
      $("clubExpense").textContent =
        `₹${expense.toFixed(2)}`;
    }

    if ($("clubBalance")) {
      $("clubBalance").textContent =
        `₹${(income - expense).toFixed(2)}`;
    }

    showMessage(
      "clubFinanceMessage",
      snapshot.empty
        ? "এই Profile-এর জন্য এখনও কোনো Transaction নেই।"
        : ""
    );
  } catch (error) {
    console.error("Transaction loading error:", error);

    showMessage(
      "clubFinanceMessage",
      "ডেটা লোড হয়নি। Firestore Rules এবং প্রয়োজন হলে index পরীক্ষা করো।"
    );
  }
}

/* ================= REGISTER ================= */

$("clubEmailRegister")?.addEventListener(
  "click",
  async () => {
    const email = $("clubEmail")?.value.trim();
    const password = $("clubPassword")?.value;

    if (!email || !password) {
      showMessage(
        "clubLoginMessage",
        "Email ও Password দাও।"
      );
      return;
    }

    try {
      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "clubMembers", credential.user.uid),
        {
          email: credential.user.email,
          name: "",
          role: "member",
          approved: false,
          createdAt: serverTimestamp(),
        }
      );

      currentUser = credential.user;

      currentMember = {
        email: credential.user.email,
        name: "",
        role: "member",
        approved: false,
      };

      updateFinanceVisibility();

      showMessage(
        "clubLoginMessage",
        "Registration হয়েছে। Finance ব্যবহারের আগে Admin approval প্রয়োজন।"
      );
    } catch (error) {
      console.error("Registration error:", error);

      showMessage(
        "clubLoginMessage",
        "Registration হয়নি: " + error.message
      );
    }
  }
);

/* ================= LOGIN ================= */

$("clubEmailLogin")?.addEventListener(
  "click",
  async () => {
    const email = $("clubEmail")?.value.trim();
    const password = $("clubPassword")?.value;

    if (!email || !password) {
      showMessage(
        "clubLoginMessage",
        "Email ও Password দাও।"
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showMessage(
        "clubLoginMessage",
        "Login successful. Permission যাচাই হচ্ছে..."
      );
    } catch (error) {
      console.error("Login error:", error);

      showMessage(
        "clubLoginMessage",
        "Login হয়নি: " + error.message
      );
    }
  }
);

/* ================= LOGOUT ================= */

$("clubEmailLogout")?.addEventListener(
  "click",
  async () => {
    try {
      await signOut(auth);

      currentProfileUid = null;
      currentProfileName = "";

      resetFinance();

      showMessage(
        "clubLoginMessage",
        "Logout successful."
      );
    } catch (error) {
      console.error("Logout error:", error);

      showMessage(
        "clubLoginMessage",
        "Logout হয়নি: " + error.message
      );
    }
  }
);

/* ================= PASSWORD SHOW / HIDE ================= */

$("toggleClubPassword")?.addEventListener(
  "click",
  () => {
    const passwordInput = $("clubPassword");

    if (!passwordInput) return;

    passwordInput.type =
      passwordInput.type === "password"
        ? "text"
        : "password";
  }
);

/* ================= SAVE INCOME / EXPENSE ================= */

$("clubFinanceForm")?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    if (!canViewCurrentProfileFinance()) {
      showMessage(
        "clubFinanceMessage",
        "নিজের Management Profile-এ Finance যোগ করো। Admin সব Profile-এ যোগ করতে পারবেন।"
      );
      return;
    }

    const type = $("clubTransactionType")?.value;
    const description =
      $("clubDescription")?.value.trim();

    const amount = Number($("clubAmount")?.value);

    if (
      !["income", "expense"].includes(type) ||
      !description ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      showMessage(
        "clubFinanceMessage",
        "সঠিক Transaction Type, Description ও Amount দাও।"
      );
      return;
    }

    try {
      await addDoc(
        collection(db, "clubTransactions"),
        {
          type,
          description,
          amount,
          profileUid: currentProfileUid,
          profileName: currentProfileName,
          createdBy: currentUser.uid,
          createdByEmail: currentUser.email,
          createdAt: serverTimestamp(),
        }
      );

      $("clubFinanceForm").reset();

      showMessage(
        "clubFinanceMessage",
        "Transaction save হয়েছে।"
      );

      await loadTransactions();
    } catch (error) {
      console.error("Transaction save error:", error);

      showMessage(
        "clubFinanceMessage",
        "Save হয়নি। Firestore Security Rules পরীক্ষা করো।"
      );
    }
  }
);

/* ================= AUTHENTICATION STATE ================= */

onAuthStateChanged(auth, async (user) => {
  const version = ++authCheckVersion;

  transactionLoadVersion++;

  currentUser = user;
  currentMember = null;

  resetFinance();
  updateFinanceVisibility();

  if (!user) {
    showMessage(
      "clubLoginMessage",
      "Finance দেখতে Login করো।"
    );
    return;
  }

  try {
    const memberSnapshot = await getDoc(
      doc(db, "clubMembers", user.uid)
    );

    if (version !== authCheckVersion) return;

    currentMember = memberSnapshot.exists()
      ? memberSnapshot.data()
      : null;

    if (!currentMember) {
      updateFinanceVisibility();

      showMessage(
        "clubLoginMessage",
        "Member profile পাওয়া যায়নি। Admin-এর সঙ্গে যোগাযোগ করো।"
      );
      return;
    }

    updateFinanceVisibility();

    if (!isApprovedMember()) {
      showMessage(
        "clubLoginMessage",
        "তোমার Account এখনও Admin approve করেননি।"
      );
      return;
    }

    if (isAdmin()) {
      showMessage(
        "clubLoginMessage",
        "Admin login successful."
      );
    } else {
      showMessage(
        "clubLoginMessage",
        "Login successful. Finance access approved."
      );
    }

    if (canViewCurrentProfileFinance()) {
      await loadTransactions();
    } else if (profileIsManagement) {
      showMessage(
        "clubLoginMessage",
        "এই Profile-এর Finance দেখতে পারবে না। নিজের Management Profile খোলো।"
      );
    }
  } catch (error) {
    console.error("Member lookup error:", error);

    if (version !== authCheckVersion) return;

    currentMember = null;
    updateFinanceVisibility();

    showMessage(
      "clubLoginMessage",
      "Member তথ্য পড়া যায়নি। Firestore Rules পরীক্ষা করো।"
    );
  }
});
