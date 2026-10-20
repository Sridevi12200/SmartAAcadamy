const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open/close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile navigation after a link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// When a course card enquiry link is clicked, preselect that course in the form.
document.querySelectorAll("[data-course]").forEach((link) => {
  link.addEventListener("click", () => {
    const courseSelect = document.getElementById("course");
    courseSelect.value = link.dataset.course;
  });
});

// Keep the footer year current.
document.getElementById("year").textContent = new Date().getFullYear();

// This front-end form creates an email draft. It does not store data on a server.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim() || "Not provided";
  const course = formData.get("course");
  const message = formData.get("message").trim() || "No additional message";

  const subject = encodeURIComponent(`SmartA Academy course enquiry — ${course}`);
  const body = encodeURIComponent(
    `Hello SmartA Academy,\n\nI would like to enquire about your training.\n\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\n\n` +
    `Learning goals / message:\n${message}\n\nThank you.`
  );

  document.getElementById("formNote").textContent =
    "Your email app should open with the enquiry prepared. Please send the email to complete your enquiry.";
  window.location.href = `mailto:sridevi122000@gmail.com?subject=${subject}&body=${body}`;
});
