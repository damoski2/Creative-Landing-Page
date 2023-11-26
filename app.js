gsap.registerPlugin(Flip, ScrollTrigger);
new Ukiyo(".ukiyo", {
  scale: 1.4,
  willChange: true,
  wrapperClass: "ukiyo-wrapper",
  externalRAF: false,
});
let locoScroll;
let xPercent = 0;
let direction = -1;

const initializeLenisScrollLibrary = () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
};

let links = document.querySelectorAll("nav a");
let line = document.querySelector(".line");
let sebastianimage = document.querySelector(".sebastianimage");
let gridimages = document.querySelectorAll(".gridimage");
let carouselimages = document.querySelectorAll(".carouselimage");
let carouselslider = document.querySelector(".carouselslider");
let slide1 = document.querySelector(".slide1");
let slide2 = document.querySelector(".slide2");

const initialUnsetAnimationState = () => {
  let tween1, tween2, tween3;

  links.forEach((link, index) => {
    index !== 0 &&
      gsap.set(link, {
        opacity: 0.3,
      });
  });

  gsap.set(sebastianimage, {
    filter: "grayscale(100%)",
  });
};

const lineAnimation = (_class, startnum = '70%') => {
  gsap.to(_class, {
    width: "100%",
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: _class,
      start: `top top+=${startnum}`,
      end: "top top",
    },
  });
};

const lineAnimation2 = (_class) => {
  gsap.to(_class, {
    width: "1px",
    scaleX: 780,
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: _class,
      start: "top top+=90%",
      end: "top top",
    },
  });
};

const animate = () => {
  //console.log(xPercent, direction)
  if (xPercent < -100) {
    xPercent = 0;
  } else if (xPercent > 0) {
    xPercent = -100;
  }
  gsap.set(slide1, { xPercent: xPercent });
  gsap.set(slide2, { xPercent: xPercent });
  requestAnimationFrame(animate);
  xPercent += 0.1 * direction;
};

const initializeApp = () => {
  //alert("Hello World");

  let body1_h1 = document.querySelector(".body1_h1");

  gsap.to(line, {
    width: "100%",
    duration: 1,
    delay: 0.7,
    ease: "power1.out",
  });

  /* Scroll Trigger Version */
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".heroimagecnt",
      start: "top top",
      end: `bottom ${body1_h1.offsetHeight}`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
    },
  });

  tl.fromTo(
    ".heroimage",
    { scale: 1 },
    {
      scale: 0.17,
      left: "30px",
    }
  );

  lineAnimation(".aboutline");
  lineAnimation(".aboutline2");
  lineAnimation(".worksline");
  lineAnimation(".contactline");
  lineAnimation(".footerline", '98%');
  lineAnimation2(".contactlinemini2");
  lineAnimation2(".contactlinemini");

  sebastianimage.addEventListener("mouseenter", (e) => {
    tween1 = gsap.to(".sebastianimage", {
      filter: "grayscale(0)",
      duration: 0.7,
      ease: "power3.out",
    });
  });

  sebastianimage.addEventListener("mouseleave", (e) => {
    tween1.reverse();
  });

  gridimages.forEach((gridimage) => {
    gridimage.addEventListener("mouseenter", (e) => {
      tween2 = gsap.to(e.target, {
        opacity: "0.8",
        duration: 0.3,
        ease: "power1.inOut",
      });
    });

    gridimage.addEventListener("mouseleave", (e) => {
      tween2.reverse();
    });
  });

  carouselimages.forEach((image) => {
    image.addEventListener("mouseenter", (e) => {
      tween3 = gsap.to(e.target, {
        opacity: "0.8",
        duration: 0.3,
        ease: "power1.inOut",
      });
    });

    image.addEventListener("mouseleave", (e) => {
      tween3.reverse();
    });
  });

  const childSplit = new SplitType(".splittext", {
    types: "lines, words",
    /*  linesClass: "split-child", */
  });
  const parentSplit = new SplitType(".splittext", {
    /* types: "lines", */
    lineClass: "split-parent",
  });

  const workHeading = new SplitType(".workheading1", {
    types: "lines, words",
  });

  const workparentSplit = new SplitType(".workheading1", {
    lineClass: "workparent",
  });

  const contactHeading = new SplitType(".contactsplit", {
    types: "lines, words",
  });

  const contactparentSplit = new SplitType(".contactsplit", {
    lineClass: "contactparent",
  });

  gsap.to(parentSplit.words, {
    opacity: 1,
    translateY: "0",
    ease: "power3.out",
    delay: 0.2,
    duration: 1.4,
    stagger: 0.06,
    scrollTrigger: {
      trigger: ".splittext",
      start: "top top+=70%",
    },
  });

  gsap.to(workparentSplit.words, {
    opacity: 1,
    translateY: "0",
    ease: "power3.out",
    delay: 0.2,
    duration: 1.4,
    stagger: 0.06,
    scrollTrigger: {
      trigger: ".workheading1",
      start: "top top+=70%",
    },
  });

  gsap.to(contactparentSplit.words, {
    opacity: 1,
    translateY: "0",
    ease: "power3.out",
    delay: 0.2,
    duration: 1.4,
    stagger: 0.06,
    scrollTrigger: {
      trigger: ".contactsplit",
      start: "top top+=70%",
    },
  });

  gsap.to(carouselslider, {
    scrollTrigger: {
      trigger: document.getElementsByTagName("html")[0],
      scrub: 0.25,
      start: 0,
      onUpdate: (e) => {
        //console.log('direction scroll',e.direction)
        return (direction = e.direction * -1);
      },
    },
    x: "-500px",
  });
  requestAnimationFrame(animate);

  /* Flip version */
  /*   ScrollTrigger.create({
    trigger: ".heroimagecnt",
    start: "top top",
    scrub: true,
    onEnter: () => {
        let state = Flip.getState(".heroimage");
        let flipcontainer = document.querySelector('.flipcontainer');
        let bodyflip = document.querySelector('.bodyflip');
        flipcontainer.appendChild(document.querySelector('.heroimage'));
        bodyflip.style.top = '340px';

        Flip.from(state, {
            duration: 1,
            scale: true,
            absolute: true,
            ease: "power1.out",
        })
    }
  }) */
};

links.forEach((link) => {
  let tween;
  link.addEventListener("mouseenter", (e) => {
    tween = gsap.to(e.target, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  });

  link.addEventListener("mouseleave", (e) => {
    tween.reverse();
  });
});

document.addEventListener("DOMContentLoaded", (e) => {
  initialUnsetAnimationState();
  initializeLenisScrollLibrary();
  initializeApp();
});

// Differenet Scroll Speeds JQuery
$.fn.moveIt = function () {
  var $window = $(window);
  var instances = [];

  $(this).each(function () {
    instances.push(new moveItItem($(this)));
  });

  window.onscroll = function () {
    var scrollTop = $window.scrollTop();
    instances.forEach(function (inst) {
      inst.update(scrollTop);
    });
  };
};

var moveItItem = function (el) {
  this.el = $(el);
  this.speed = parseInt(this.el.attr("data-scroll-speed"));
};

moveItItem.prototype.update = function (scrollTop) {
  var pos = scrollTop / this.speed;
  this.el.css("transform", "translateY(" + -pos + "px)");
};

$(function () {
  $("[data-scroll-speed]").moveIt();
});

/* ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh(); */

/* let container = document.querySelector('.container');
let box = document.querySelector('.box');

document.addEventListener('click', (e)=>{
    let state = Flip.getState(".box");

    container.appendChild(box);

    Flip.from(state, {
        duration: 1,
        ease: "power1.out",
    })
}) */
