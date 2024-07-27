const headers = document.querySelectorAll(".section_header");
const video = document.querySelector('video');
let lastScrollTop = 0;
// cards
const playlistss = document.querySelector(".playlistss");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".playlistss i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
// cards end
const counts = document.querySelectorAll('.count')
const speed = 1500
counts.forEach((counter) => {
    function upData(){
        const target = Number(counter.getAttribute('data-target'))
        const count = Number(counter.innerText)
        const inc = target / speed
        if(count < target){
            counter.innerText = Math.floor(inc + count)
            setTimeout(upData, 1)
        }else{
            counter.innerText = target
        }
    }
    upData()
})


let isDragging = false, startX, startScrollLeft, TimeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn =>{
    btn.addEventListener ("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

    }
const dragStop = () =>{
        isDragging = false;
        carousel.classList.remove("dragging");
    }
const autoplay = () => {
    if(window.innerWidth < 800) return;
    TimeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
}
autoplay();
const infiniteScroll = () =>{
    //if carousel is at the beginning, scroll to the end 
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth -( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    //if carousel is at the end, scroll to the begginging
     else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    //clear timeout and start autoplay if mouse not hovering 
    clearTimeout(TimeoutId);
    if(!playlistss.matches(":hover")) autoplay();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
playlistss.addEventListener("mouseenter", () => clearTimeout(TimeoutId));
playlistss.addEventListener("mouseleave", autoplay);
// cards end

if (video) {
    video.playbackRate = 1.45;
}

document.addEventListener("scroll", function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling

    headers.forEach((header) => {
        if (isInView(header)) {
            header.classList.add("RWM_TEXT--visible");
        } else {
            header.classList.remove("RWM_TEXT--visible");
        }
    });
});

function isInView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (rect.top >= 2 && rect.bottom <= windowHeight);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });

    });
});

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle('open')
    constisOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}
// document.addEventListener('DOMContentLoaded', function () {
//     const video = document.getElementById('myVideo');
//     const videoSource = document.getElementById('videoSource');

//     function setVideoSource() {
//         if (window.innerWidth < 768) {
//             videoSource.src = 'images/0001-0170 (2) - Trim.mkv'; 
//         } else {
//             videoSource.src = 'images/0001-0160.mkv'; }
//         video.load();
//     }

//     setVideoSource();
//     window.addEventListener('resize', setVideoSource);
// });
