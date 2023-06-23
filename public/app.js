let menu = document.querySelector("#menu-icon");
let nbar = document.querySelector(".nbar");

menu.onclick = ()=>{
    menu.classList.toggle("bx-x");
    nbar.classList.toggle("nav-open");
}
