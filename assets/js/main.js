window.addEventListener("load", function () {
  animationPageLoad();
});

function animationPageLoad() {
  const svgWrapper = document.querySelector(".svg-wrapper");
  const svg = svgWrapper.querySelector(".svg-donut");
  const turbulence = svg.querySelector("feTurbulence");
  const description = document.querySelector(".hero__description .text");
  const tl = gsap.timeline({
    defaults: { duration: 4, ease: Back.easeOut.config(0.7) },
  });

  // tl.add(tlPageLoad).add(tlRepeatTurbulence, 3).add(tlshowText, 3);
  tl.add(tlPageLoad).add(tlRepeatTurbulence, 3);

  function tlPageLoad() {
    return gsap
      .timeline({ defaults: { ease: Back.easeOut.config(0.5), duration: 3 } })
      .to(svg, { autoAlpha: 1 })
      .to(svgWrapper, { transformOrigin: "center", rotate: 540 }, "<")
      .to(svg, { transformOrigin: "center", scale: 1, x: -26, y: -23 }, "<")
      .to(turbulence, { attr: { baseFrequency: 0, numOctaves: 0 } }, "<");
  }

  function tlRepeatTurbulence() {
    return gsap
      .timeline({
        defaults: { ease: Expo.easeInOut, duration: 3 },
        repeat: -1,
        yoyo: true,
      })
      .fromTo(
        turbulence,
        { attr: { baseFrequency: 0, numOctaves: 0 } },
        { attr: { baseFrequency: 0.05, numOctaves: 2 } },
        "<"
      )
      .to(turbulence, { attr: { baseFrequency: 0, numOctaves: 0 } });
  }

  function tlshowText() {
    const turbulence = description.nextElementSibling.querySelector("feTurbulence");
    let tl = null;

    gsap.to(description, {
      autoAlpha: 1,
      duration: 1,
      onComplete: () => {
        tl = gsap
          .timeline({
            defaults: { ease: Linear.easeInOut, duration: 1.5 },
            repeat: -1,
            repeatDelay: 3,
            yoyo: true,
          })
          .fromTo(
            turbulence,
            { attr: { baseFrequency: 0, numOctaves: 0 } },
            { attr: { baseFrequency: 0.05, numOctaves: 2 } },
            "<"
          )
          .to(turbulence, { attr: { baseFrequency: 0, numOctaves: 0 } });
      },
    });

    return tl;
  }
}
