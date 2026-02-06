// console.log("Project Alpha Loaded 🚀");

// // Theme Toggle
// const toggle = document.getElementById("themeToggle");
// let dark = true;

// toggle.onclick = () => {
//   document.body.style.background = dark ? "#f5f7ff" : "#05070c";
//   document.body.style.color = dark ? "#000" : "#fff";
//   toggle.textContent = dark ? "☀️" : "🌙";
//   dark = !dark;
// };

// const reveal = document.querySelector(".reveal");

// function scrollReveal() {
//   const top = reveal.getBoundingClientRect().top;
//   if (top < window.innerHeight - 150) {
//     reveal.classList.add("active");
//   }
// }

// window.addEventListener("scroll", scrollReveal);
// scrollReveal();


const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

toggle.onclick = () => {
  nav.classList.toggle("show");
};

const links = document.querySelectorAll("#nav a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});




window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (window.scrollY > 80) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
});

// popups
function openCase(file) {
  document.getElementById("caseModal").style.display = "flex";
  document.getElementById("caseFrame").src = file;
}

function closeCase() {
  document.getElementById("caseModal").style.display = "none";
  document.getElementById("caseFrame").src = "";
}






// Reveal animation already handled above

// Counter animation
document.querySelectorAll("[data-num]").forEach(el=>{
 let target=parseFloat(el.dataset.num);
 let val=0;
 let timer=setInterval(()=>{
  val+=target/40;
  if(val>=target){
   el.innerText=target + (el.innerText.includes('%')?'%':'');
   clearInterval(timer);
  } else {
   el.innerText=Math.floor(val);
  }
 },30);
});

document.querySelectorAll(".reveal").forEach(el=>{
  window.addEventListener("scroll",()=>{
    if(el.getBoundingClientRect().top < window.innerHeight-80){
      el.classList.add("active");
    }
  });
});


