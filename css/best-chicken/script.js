const OWNER_EMAIL = "youremail@example.com";

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const quiz = document.querySelector("#quiz");
const quizResult = document.querySelector("#quiz-result");

if (quiz && quizResult) {
  quiz.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(quiz);
    const scores = { harolds: 0, remus: 0, sharks: 0 };

    if (data.get("sauce") === "mild") {
      scores.harolds += 1;
      scores.remus += 1;
    }
    if (data.get("sauce") === "lemon") scores.sharks += 2;

    if (data.get("food") === "half") scores.harolds += 2;
    if (data.get("food") === "wings") scores.remus += 2;
    if (data.get("food") === "fish") scores.sharks += 2;

    if (data.get("story") === "old") scores.harolds += 2;
    if (data.get("story") === "west") scores.remus += 2;
    if (data.get("story") === "new") scores.sharks += 2;

    const winner = Object.keys(scores).sort(function (a, b) {
      return scores[b] - scores[a];
    })[0];

    const picks = {
      harolds: {
        name: "Harold's Chicken",
        href: "harolds.html",
        why: "You leaned toward mild sauce, a half-chicken plate, or the oldest South Side story."
      },
      remus: {
        name: "Uncle Remus",
        href: "uncle-remus.html",
        why: "You leaned toward wings, mild sauce, or the West Side family story from 1969."
      },
      sharks: {
        name: "Shark's Fish & Chicken",
        href: "sharks.html",
        why: "You leaned toward lemon pepper, fish, or the newer Chicago chain."
      }
    };

    const pick = picks[winner];
    quizResult.hidden = false;
    quizResult.innerHTML = "<strong>Start with " + pick.name + ".</strong> " + pick.why + " <a href=\"" + pick.href + "\">Read that page</a>.";
  });
}

const contactForm = document.querySelector("#contact-form");
const contactError = document.querySelector("#contact-error");

if (contactForm && contactError) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      contactError.textContent = "Name, email, and message are all required.";
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      contactError.textContent = "Enter an email address that includes an @ symbol.";
      return;
    }

    contactError.textContent = "";
    const subject = encodeURIComponent("Best Chicken in Chicago");
    const body = encodeURIComponent(name + " (" + email + ")\n\n" + message);
    window.location.href = "mailto:" + OWNER_EMAIL + "?subject=" + subject + "&body=" + body;
  });
}