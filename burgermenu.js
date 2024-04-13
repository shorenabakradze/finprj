function myFunction() {
  let x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
    localStorage.setItem('menuState', 'closed');
  } else {
    x.style.display = "block";
    localStorage.setItem('menuState', 'open');
  }
}