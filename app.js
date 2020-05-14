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
    let scrollSlide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
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
        const nextText = nextPage.querySelector('.detail');
        const portfolio = document.querySelector('.portfolio');

        const tl = new TimelineMax({
            // You cannot click on the nav buttons until the animation finishes
            onStart: function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                })
            },
            onComplete: function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        // tl.fromTo(what I want to animate, the time, {y: '-10%'}, {y: '-100%'})
        // -=0.2 will make the animation start quicker : the second animation will not wait until the ed of the first animation
        tl.fromTo(currentLeft, 0.3, {y: '-7%'}, {y: '-100%'})
        .fromTo(currentRight, 0.3, {y: '7%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
        .fromTo(currentPage, 0.3, {opacity:1, pointerEvents: 'all'}, {opacity:0, pointerEvents: 'none'})
        .fromTo(nextPage, 0.3, {opacity:0, pointerEvents: 'none'}, {opacity:1, pointerEvents: 'all'}, "-=0.6")
        .fromTo(nextLeft, 0.3, {y: '-100%'}, {y: '-7%'}, '-=0.6')
        .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '7%'}, '-=0.8')
        .fromTo(nextText, 0.3, {opacity: 0, y: 30}, {opacity: 1, y: 0})
        .set(nextLeft, {clearProps: 'all'})
        .set(nextRight, {clearProps: 'all'});

        current = pageNumber;
        
    }

document.addEventListener('wheel', throttle(scrollChange, 1500));
document.addEventListener('touchmove', throttle(scrollChange, 1500)); // for mobile devices

function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll('.slide')[dotNumber];
    slides.forEach(slide => {
        slide.classList.remove('active');
    })
    activeDot.classList.add('active');
}

function scrollChange(e) {
    if (e.deltaY > 0){
        scrollSlide += 1;
    } else {
        scrollSlide -= 1;
    }

    if (scrollSlide > 3){
        scrollSlide = 0;
    }
    if (scrollSlide < 0){
        scrollSlide = 3;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
    console.log(scrollSlide);
}
}

// Detects the scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

init();