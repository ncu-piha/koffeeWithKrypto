const dropdowns = document.querySelectorAll('.dropdown');
function searchFun() {
    const searchTerm = document.getElementById("input-box").value.trim().toLowerCase();
  
    const videoElements = document.querySelectorAll(".intro iframe");
  
    videoElements.forEach(videoElement => {
      const episodeInfo = videoElement.parentElement.querySelector(".episode_info");
      const episodeTitle = episodeInfo.querySelector("h3").textContent.toLowerCase();
      const episodeDescription = episodeInfo.querySelector("p").textContent.toLowerCase();
  
      const isMatch = episodeTitle.includes(searchTerm) || episodeDescription.includes(searchTerm) || videoElement.dataset.title.toLowerCase().includes(searchTerm);
  
      episodeInfo.classList.toggle("search-result", isMatch);
    });
  }
  

dropdowns.forEach(dropdown =>{
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    
    
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });
    options.forEach(option => {
        option.addEventListener('click', () => {
            
            selected.innerText = option.innerText;
            
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
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