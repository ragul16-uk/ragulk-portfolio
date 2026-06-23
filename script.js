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

// ===== CURSOR SPOTLIGHT =====
const spotlight = document.createElement('div');
spotlight.className = 'spotlight';
document.body.appendChild(spotlight);
document.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top  = e.clientY + 'px';
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar ul li a');
const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ===== SCROLL PROGRESS BAR =====
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = pct + '%';
});

// ===== BACK TO TOP =====
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== TOAST ON DOWNLOAD =====
const toast = document.getElementById('toast');
document.getElementById('download-btn').addEventListener('click', () => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(timer);
    }, 40);
}

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const raw = h3.dataset.val;
            const suffix = h3.dataset.suffix || '';
            animateCounter(h3, parseFloat(raw), suffix);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-card').forEach(c => statObserver.observe(c));

// ===== SKILL BAR ANIMATION =====
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
const skillSection = document.getElementById('skills');
if (skillSection) barObserver.observe(skillSection);

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 55; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.4,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.4 + 0.1
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();