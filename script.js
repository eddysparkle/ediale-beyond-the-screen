const portal = document.getElementById("portal");
const enterButton = document.getElementById("enterButton");
const experiences = document.getElementById("experiences");

const reduceMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

// Scroll into the experience section.
enterButton.addEventListener("click", () => {
experiences.scrollIntoView({
behavior: reduceMotion ? "auto" : "smooth",
block: "start"
});
});

// Interactive portal movement on desktop.
const canHover = window.matchMedia(
"(hover: hover) and (pointer: fine)"
);

if (canHover.matches && !reduceMotion) {
document.addEventListener("pointermove", (event) => {
const rect = portal.getBoundingClientRect();

const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

const x = (event.clientX - centerX) / window.innerWidth;
const y = (event.clientY - centerY) / window.innerHeight;

portal.style.transform = `
  rotateX(${(-y * 12).toFixed(2)}deg)
  rotateY(${(x * 15).toFixed(2)}deg)
`;

});

document.addEventListener("pointerleave", () => {
portal.style.transform = "";
});
}

// Animate the world cards as they enter view.
const cards = document.querySelectorAll(".world-card");

if ("IntersectionObserver" in window && !reduceMotion) {
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("is-visible");
observer.unobserve(entry.target);
}
});
}, {
threshold: 0.15
});

cards.forEach((card) => observer.observe(card));
}

// Project information.
const projects = {
savoure: {
number: "PROJECT / 01",
title: "Savouré — Restaurant Experience",
description:
"A luxury restaurant website designed to present food beautifully and give visitors an easy way to explore the menu and place orders.",
problem:
"Restaurants need an attractive online presence that helps customers discover dishes and understand how to order.",
technologies: [
"HTML5",
"CSS3",
"JavaScript",
"Responsive Web Design",
"WhatsApp Ordering"
],
link: "https://eddysparkle.github.io/savoure-restaurant/"
},

commerce: {
number: "PROJECT / 02",
title: "Savouré — Interactive Ordering",
description:
"An interactive ordering experience featuring menu selections, an order summary, and ways for customers to submit their orders.",
problem:
"Customers need a straightforward way to explore food options, select items, and communicate their orders without unnecessary steps.",
technologies: [
"HTML5",
"CSS3",
"JavaScript",
"Interactive Menu",
"Order Summary",
"WhatsApp Integration"
],
link: "https://eddysparkle.github.io/savoure-restaurant/"
},

expense: {
number: "PROJECT / 03",
title: "Expense Tracker",
description:
"A JavaScript web application for recording and reviewing income and expenses, with transaction data stored in the browser.",
problem:
"People need a simple way to record transactions and understand their spending without complicated financial software.",
technologies: [
"HTML5",
"CSS3",
"JavaScript",
"Local Storage",
"NGN Currency Support"
],
link: "https://eddysparkle.github.io/Expense--Tracker/"
}
};

// Project details panel elements.
const projectDetail = document.getElementById("projectDetail");
const closeProjectDetail = document.getElementById("closeProjectDetail");
const projectDetailKicker = document.getElementById("projectDetailKicker");
const projectDetailTitle = document.getElementById("projectDetailTitle");
const projectDetailDescription = document.getElementById("projectDetailDescription");
const projectDetailProblem = document.getElementById("projectDetailProblem");
const projectDetailTech = document.getElementById("projectDetailTech");
const projectDetailLink = document.getElementById("projectDetailLink");

let lastProjectTrigger = null;

// Open the selected project's details.
function openProject(projectKey, trigger) {
const project = projects[projectKey];

if (!project) return;

lastProjectTrigger = trigger;

projectDetailKicker.textContent = project.number;
projectDetailTitle.textContent = project.title;
projectDetailDescription.textContent = project.description;
projectDetailProblem.textContent = project.problem;
projectDetailLink.href = project.link;

projectDetailTech.replaceChildren();

project.technologies.forEach((technology) => {
const item = document.createElement("li");
item.textContent = technology;
projectDetailTech.appendChild(item);
});

projectDetail.hidden = false;

projectDetail.scrollIntoView({
behavior: reduceMotion ? "auto" : "smooth",
block: "start"
});

closeProjectDetail.focus({ preventScroll: true });
}

// Connect the world links to their projects.
document.querySelectorAll(".world-link[data-project]").forEach((link) => {
link.addEventListener("click", (event) => {
event.preventDefault();
openProject(link.dataset.project, link);
});
});

// Close the project panel.
function closeProject() {
projectDetail.hidden = true;

if (lastProjectTrigger) {
lastProjectTrigger.focus({ preventScroll: true });
}
}

closeProjectDetail.addEventListener("click", closeProject);

// Close with Escape.
document.addEventListener("keydown", (event) => {
if (event.key === "Escape" && !projectDetail.hidden) {
closeProject();
}
});

// Allow keyboard users to open a world card using Enter or Space.
cards.forEach((card) => {
card.addEventListener("keydown", (event) => {
if (
event.target === card &&
(event.key === "Enter" || event.key === " ")
) {
event.preventDefault();

  const link = card.querySelector(".world-link");

  if (link) {
    openProject(link.dataset.project, link);
  }
}

});
});
