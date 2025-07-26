// Data
const recentJoiners = [
  { name: "Chisom Dahel.", location: "Lagos", time: "2m ago" },
  { name: "Divine I.", location: "Calabar", time: "5m ago" },
  { name: "Idiege I.", location: "Calabar", time: "12m ago" },
  { name: "Williams R.", location: "Port Harcourt", time: "18m ago" },
  { name: "Omar T.", location: "Calabar", time: "25m ago" },
  { name: "Amina L.", location: "Rivers", time: "34m ago" },
];

const testimonials = [
  {
    name: "Chisom E.",
    role: "E-commerce Seller",
    text: "Checkamo will be a game-changer for my business. Can't wait to verify products easily before i buy them.",
    avatar: "CE",
  },
  {
    name: "Divine I.",
    role: "Real Estate Agent",
    text: "Property verification has always been a challenge. I almost paid N10M for piece of land that did not exist. Thank God Checkamo came for my rescue.",
    avatar: "DI",
  },
  {
    name: "Roland W.",
    role: "Freelance Developer",
    text: "As a freelancer, building trust with clients is crucial. Checkamo would help prevent my clients from disappering with my money.",
    avatar: "RW",
  },
  {
    name: "Amina L.",
    role: "Social Media Influencer",
    text: "Agents did me dirty, omoor! With Checkamo, i don't need to empty my wallet to secure an apartment.",
    avatar: "AL",
  },
  {
    name: "Omar T.",
    role: "Tech Entrepreneur",
    text: "I paid inspection fee twice for the same apartment. Thank God, Checkamo verifiers came to my rescue. Now I can verify properties before paying.",
    avatar: "OT",
  },
];

const verifierLocations = [
  { city: "Lagos", count: 124 },
  { city: "Abuja", count: 87 },
  { city: "Calabar", count: 76 },
  { city: "Enugu", count: 65 },
  { city: "Dubai", count: 58 },
  { city: "Port Harcourt", count: 52 },
  { city: "Ondo", count: 43 },
  { city: "Rivers", count: 38 },
];

const interestOptions = [
  "I want to verify a product",
  "I want to verify a person",
  "I want to verify a property",
  "I am a vendor or seller",
  "I want to be a trusted Verifier",
  "Just exploring for now",
];

// State
let waitlistCount = 2847;
const formData = {
  fullName: "",
  email: "",
  phone: "",
  interests: [],
  industry: "",
  language: "",
  wantToBeVerifier: "",
  location: "",
  agreeToTerms: false,
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  setupTabs();
  setupForm();
  setupAvatars();
  setupTestimonials();
  setupVerifierLocations();
  setupLiveNotifications();
  setupFormValidation();
}

// Tab functionality
function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active");
      document.getElementById(targetTab + "Tab").classList.add("active");
    });
  });
}

// Form setup
function setupForm() {
  // Setup interests checkboxes
  const interestsGrid = document.getElementById("interestsGrid");
  interestOptions.forEach((interest) => {
    const div = document.createElement("div");
    div.className = "checkbox-item";
    div.innerHTML = `
            <input type="checkbox" id="${interest.replace(
              /\s+/g,
              ""
            )}" name="interests" value="${interest}" class="checkbox">
            <label for="${interest.replace(
              /\s+/g,
              ""
            )}" style="color: #cbd5e1; font-size: 0.875rem; cursor: pointer;">${interest}</label>
        `;
    interestsGrid.appendChild(div);
  });

  // Setup verifier radio buttons
  const verifierRadios = document.querySelectorAll(
    'input[name="wantToBeVerifier"]'
  );
  verifierRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const locationGroup = document.getElementById("locationGroup");
      if (this.value === "yes") {
        locationGroup.classList.remove("hidden");
        locationGroup.style.maxHeight = locationGroup.scrollHeight + "px";
      } else {
        locationGroup.classList.add("hidden");
        locationGroup.style.maxHeight = "0";
      }
    });
  });
}

// Setup avatars
function setupAvatars() {
  const avatarStack = document.getElementById("avatarStack");

  recentJoiners.slice(0, 5).forEach((joiner, index) => {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = joiner.name.split(" ")[0][0];
    avatar.title = `${joiner.name} from ${joiner.location} - ${joiner.time}`;
    avatar.style.animationDelay = `${1.2 + index * 0.1}s`;
    avatarStack.appendChild(avatar);
  });

  // Add "more" avatar
  const moreAvatar = document.createElement("div");
  moreAvatar.className = "avatar avatar-more";
  moreAvatar.textContent = `+${recentJoiners.length - 5}`;
  avatarStack.appendChild(moreAvatar);
}

// Setup testimonials
function setupTestimonials() {
  const testimonialsGrid = document.getElementById("testimonialsGrid");

  testimonials.forEach((testimonial, index) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.style.animationDelay = `${0.2 * index}s`;
    card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${testimonial.avatar}</div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
            <div class="stars">
                ${Array(5)
                  .fill()
                  .map(
                    () => `
                    <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                `
                  )
                  .join("")}
            </div>
            <p style="color: #cbd5e1;">${testimonial.text}</p>
        `;
    testimonialsGrid.appendChild(card);
  });
}

// Setup verifier locations
function setupVerifierLocations() {
  const locationsGrid = document.getElementById("locationsGrid");

  verifierLocations.forEach((location, index) => {
    const item = document.createElement("div");
    item.className = "location-item";
    item.style.animationDelay = `${0.1 * index}s`;
    item.innerHTML = `
            <div class="location-name">
                <i class="fa-solid fa-location-dot" style="color: #94a3b8;"></i>
                ${location.city}
            </div>
            <div class="location-count">${location.count} verifiers</div>
        `;
    locationsGrid.appendChild(item);
  });
}

// Live notifications
function setupLiveNotifications() {
  setInterval(() => {
    showLiveNotification();

    // Occasionally increment waitlist count
    if (Math.random() > 0.7) {
      waitlistCount++;
      document.getElementById("waitlistCount").textContent = waitlistCount;
    }
  }, 8000);
}

function showLiveNotification() {
  const notification = document.getElementById("liveNotification");
  const randomJoiner =
    recentJoiners[Math.floor(Math.random() * recentJoiners.length)];

  document.getElementById("notificationInitial").textContent =
    randomJoiner.name.split(" ")[0][0];
  document.getElementById("notificationName").textContent = randomJoiner.name;
  document.getElementById("notificationLocation").textContent =
    randomJoiner.location;

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 4000);
}

// Form validation and progress
function setupFormValidation() {
  const form = document.getElementById("waitlistForm");
  const inputs = form.querySelectorAll("input, select");

  inputs.forEach((input) => {
    input.addEventListener("input", updateProgress);
    input.addEventListener("change", updateProgress);
  });

  form.addEventListener("submit", handleSubmit);
}

function updateProgress() {
  const form = document.getElementById("waitlistForm");
  const formData = new FormData(form);

  let progress = 0;

  if (formData.get("fullName")) progress += 20;
  if (formData.get("email")) progress += 20;
  if (formData.getAll("interests").length > 0) progress += 20;
  if (formData.get("industry")) progress += 20;
  if (formData.get("agreeToTerms")) progress += 20;

  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").textContent = progress + "%";
}

async function handleSubmit(e) {
  e.preventDefault();

  const submitButton = document.getElementById("submitButton");
  const buttonContent = submitButton.querySelector(".button-content");

  // Show loading state
  submitButton.disabled = true;
  buttonContent.innerHTML = `
        <div class="loading-spinner"></div>
        Joining Waitlist...
    `;

  // Collect form data
  const form = document.getElementById("waitlistForm");
  const formData = new FormData(form);

  // Store form data globally
  window.submittedFormData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    interests: formData.getAll("interests"),
    industry: formData.get("industry"),
    language: formData.get("language"),
    wantToBeVerifier: formData.get("wantToBeVerifier"),
    location: formData.get("location"),
  };

  console.log(submittedFormData);

  // Simulate API call
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(window.submittedFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const result = await response.json();
    console.log("User created successfully:", result);

    // Close modal
    closeCreateModal();

  // Increment waitlist count
  waitlistCount++;

  // Show success page
  showSuccessPage();

  // Trigger confetti
  triggerConfetti();

    // Show success message
    alert("User added to waitlist successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Failed to add user to waitlist. Please try again.");
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.textContent = "Join Wailist";
  }
}

function showSuccessPage() {
  const mainPage = document.getElementById("mainPage");
  const successPage = document.getElementById("successPage");

  // Hide main page
  mainPage.style.display = "none";

  // Populate success page with user data
  populateSuccessPage();

  // Show success page
  successPage.classList.remove("hidden");
  successPage.style.display = "block";
}

function populateSuccessPage() {
  const data = window.submittedFormData;

  // Generate user initials
  const initials = data.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  // Update user avatar
  document.getElementById("userAvatar").textContent = initials;

  // Update user info
  document.getElementById("userName").textContent = data.fullName;
  document.getElementById("userEmail").textContent = data.email;
  document.getElementById("userIndustry").textContent =
    data.industry || "Industry not specified";

  // Show location if user wants to be verifier
  if (data.wantToBeVerifier === "yes" && data.location) {
    document.getElementById("userLocationDetail").style.display = "flex";
    document.getElementById("userLocation").textContent = data.location;
  }
}

function triggerConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    window.confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#06b6d4", "#8b5cf6", "#10b981"],
      })
    );
    window.confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#06b6d4", "#8b5cf6", "#10b981"],
      })
    );
  }, 250);
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function scrollToForm() {
  const formSection = document.querySelector(".form-section");
  formSection.scrollIntoView({ behavior: "smooth" });
}

// Initialize tooltips for avatars
document.addEventListener("DOMContentLoaded", () => {
  const avatars = document.querySelectorAll(".avatar");
  avatars.forEach((avatar) => {
    avatar.addEventListener("mouseenter", function () {
      if (this.title) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = this.title;
        tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                    transform: translateX(-50%);
                    bottom: 100%;
                    left: 50%;
                    margin-bottom: 0.5rem;
                `;

        this.style.position = "relative";
        this.appendChild(tooltip);
      }
    });

    avatar.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".tooltip");
      if (tooltip) {
        this.removeChild(tooltip);
      }
    });
  });
});
