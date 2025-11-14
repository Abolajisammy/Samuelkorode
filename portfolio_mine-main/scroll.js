const slideWrapper = document.querySelectorAll(".slide-wrapper");

window.addEventListener('scroll' , slideTrigger);

slideTrigger();

function slideTrigger() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
slideWrapper.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
        section.classList.add("display");
    } else if (sectionTop < triggerBottom) {
        section.classlist.remove("display");
    }     
});

} 

     