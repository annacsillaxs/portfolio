// SMOOTH SCROLLING
const links = document.querySelectorAll(".smooth a");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

// CONTACT POP-UP
hideContact();

document
  .querySelector(".footer__social-list--email")
  .addEventListener("click", function () {
    document.querySelector(".contact__box--1").style.display = "flex";
  });

document
  .querySelector(".footer__social-list--skype")
  .addEventListener("click", function () {
    document.querySelector(".contact__box--2").style.display = "flex";
  });

document.querySelector(".footer__btn").addEventListener("click", function () {
  document.querySelector(".contact__box--1").style.display = "flex";
});

const exitBtns = document.querySelectorAll(".btn-exit");

for (const exitBtn of exitBtns) {
  exitBtn.addEventListener("click", hideContact);
}

function hideContact() {
  document.querySelector(".contact__box--1").style.display = "none";
  document.querySelector(".contact__box--2").style.display = "none";
}
