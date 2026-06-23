const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".section").forEach(section => {

    observer.observe(section);

});

const roles = [
  "Frontend Developer",
  "Java Developer",
  "AI Enthusiast",
  "B.Tech IT Student"
];

let roleIndex = 0;
let charIndex = 0;

function typeEffect() {
  const typing = document.getElementById("typing");

  if (charIndex < roles[roleIndex].length) {
    typing.innerHTML += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  const typing = document.getElementById("typing");

  if (charIndex > 0) {
    typing.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 300);
  }
}

typeEffect();