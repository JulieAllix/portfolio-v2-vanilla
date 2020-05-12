function init() {
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    console.log(pages);
    const backgrounds = [
        `radial-gradient(#4B4B4B, #0B1023)`,
        `radial-gradient(#225D94, #0B1023)`,
        `radial-gradient(#4D0E30, #0B1023)`,
        `radial-gradient(#1E6176, #0B1023)`
    ];
    // Tracker
    let current = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            changeDots(this);
            nextSlide(index);
        });
    });

    function changeDots(dot){
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dot.classList.add("active");
    }

    function nextSlide(pageNumber){
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero .photo-left');
        const nextRight = nextPage.querySelector('.hero .photo-right');
        const currentLeft = currentPage.querySelector('.hero .photo-left');
        const currentRight = currentPage.querySelector('.hero .photo-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');

        const tl = new TimelineMax();

        // tl.fromTo(what I want to animate, the time, {y: '-10%'}, {y: '-100%'})
        // -=0.2 will make the animation start quicker : the second animation will not wait until the ed of the first animation
        tl.fromTo(currentLeft, 0.3, {y: '-10%'}, {y: '-100%'})
        .fromTo(currentRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] });
        
    }


}

init();