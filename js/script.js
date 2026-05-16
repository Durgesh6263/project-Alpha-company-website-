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


/* ================================
   TESTIMONIAL SLIDER (AUTO + MANUAL)
================================ */

const testimonials = [
  {
    text: "The mobile app they developed exceeded our expectations. User engagement increased by 200% within the first quarter of launch.",
    name: "Marcus Williams",
    role: "CEO, GrowthScale"
  },
  {
    text: "Project Alpha delivered an outstanding web platform for our company. Their team was fast, professional, and highly skilled.",
    name: "Sophia Martinez",
    role: "Founder, TechFlow"
  },
  {
    text: "Their cybersecurity solutions gave us complete confidence. We now operate with stronger protection and compliance than ever before.",
    name: "David Chen",
    role: "CTO, SecureNet"
  }
];

let currentIndex = 0;

// Elements
const testimonialText = document.getElementById("testimonialText");
const clientName = document.getElementById("clientName");
const clientRole = document.getElementById("clientRole");
const dots = document.querySelectorAll(".dot");

// Function to show testimonial
function showTestimonial(index) {

  // Fade animation
  testimonialText.style.opacity = 0;
  clientName.style.opacity = 0;
  clientRole.style.opacity = 0;

  setTimeout(() => {
    testimonialText.innerText = testimonials[index].text;
    clientName.innerText = testimonials[index].name;
    clientRole.innerText = testimonials[index].role;

    testimonialText.style.opacity = 1;
    clientName.style.opacity = 1;
    clientRole.style.opacity = 1;
  }, 300);

  // Update active dot
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  currentIndex = index;
}

// Auto Slide every 5 seconds
let sliderInterval = setInterval(() => {
  let next = (currentIndex + 1) % testimonials.length;
  showTestimonial(next);
}, 4000);

// Manual Dot Click
dots.forEach(dot => {
  dot.addEventListener("click", () => {

    // Stop + Restart auto slider
    clearInterval(sliderInterval);

    showTestimonial(parseInt(dot.dataset.index));

    sliderInterval = setInterval(() => {
      let next = (currentIndex + 1) % testimonials.length;
      showTestimonial(next);
    }, 5000);
  });
});


/* ================================
   CONTACT FORM → GOOGLE SHEETS + FULL PREMIUM UX
================================ */

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzTDroGe8Scp1ocMGHU7EGuOqbWC8NDB-EPmff3OtJ_vOPy7_rM9znM7vTCruVHTxE/exec";

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

/* ================================
   TOAST HELPER
================================ */
function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ================================
   ERROR + SUCCESS HELPERS
================================ */
function showError(input, message) {
  const box = input.parentElement;
  const error = box.querySelector(".error-msg");
  const icon = box.querySelector(".status-icon");

  error.innerText = message;
  error.classList.add("active");

  input.classList.add("error");
  input.classList.remove("success");

  icon.innerText = "✖";
  icon.classList.add("show", "error");
  icon.classList.remove("success");
}

function showSuccess(input) {
  const box = input.parentElement;
  const error = box.querySelector(".error-msg");
  const icon = box.querySelector(".status-icon");

  error.innerText = "";
  error.classList.remove("active");

  input.classList.add("success");
  input.classList.remove("error");

  icon.innerText = "✔";
  icon.classList.add("show", "success");
  icon.classList.remove("error");
}

/* ================================
   VALIDATION FUNCTION
================================ */
function validateField(input) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Name Validation
  if (input.name === "name" && input.value.trim() === "") {
    showError(input, "Name is required.");
    return false;
  }

  // Email Validation
  if (input.name === "email" && !emailPattern.test(input.value.trim())) {
    showError(input, "Enter a valid email address.");
    return false;
  }

  // Message Validation
  if (input.name === "message" && input.value.trim() === "") {
    showError(input, "Message cannot be empty.");
    return false;
  }

  showSuccess(input);
  return true;
}

/* ================================
   LIVE VALIDATION WHILE TYPING
================================ */
["name", "email", "message"].forEach((field) => {
  form[field].addEventListener("input", () => {
    validateField(form[field]);
  });
});

/* ================================
   FORM SUBMIT HANDLER
================================ */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate required fields
  const nameValid = validateField(form.name);
  const emailValid = validateField(form.email);
  const messageValid = validateField(form.message);

  // Stop if invalid
  if (!nameValid || !emailValid || !messageValid) return;

  // Button loading state
  const button = form.querySelector("button");
  button.innerText = "Sending...";
  button.disabled = true;

  // Send form data
  const formData = new FormData(form);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      button.innerText = "Sent ✅";

      // Reset form
      form.reset();

      // Remove validation styling/icons
      document.querySelectorAll(".status-icon").forEach((icon) => {
        icon.classList.remove("show", "success", "error");
      });

      document.querySelectorAll("input, textarea").forEach((field) => {
        field.classList.remove("success", "error");
      });

      // Show toast popup
      showToast();

      // Reset button after 3 seconds
      setTimeout(() => {
        button.innerText = "Send Message →";
        button.disabled = false;
      }, 3000);
    })
    .catch((err) => {
      console.error("Submission Error:", err);

      button.innerText = "Send Message →";
      button.disabled = false;
    });
});
