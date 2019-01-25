(() => {
  let currentAnimation = null;

  const outTimeline = anime.timeline({
    autoplay: false,
    complete: anim => {
      if (anim.direction === "reverse") {
        document.getElementById("Overlay").style.display = "block";
        anim.direction = "normal";
      } else {
        document.getElementById("Overlay").style.display = "none";
        currentAnimation = inTimeline;
      }
    }
  });

  outTimeline.add({
    targets: [".MenuOverlay-Item", ".LanguageSwitcher"],
    opacity: [1, 0],
    translateY: [
      { value: 0, easing: "easeOutElastic(1, .5)" },
      { value: -2, easing: "easeOutElastic(1, .5)" }
    ],
    delay: anime.stagger(100, { direction: "reverse", ease: "inOutElastic" }),
    easing: "linear"
  });

  outTimeline.add({
    targets: "#Overlay",
    opacity: [1, 0],
    duration: 200,
    easing: "linear"
  });

  // Menu animation
  const inTimeline = anime.timeline({
    autoplay: false,
    complete: function(anim) {
      if (anim.direction === "reverse") {
        anim.direction = "normal";
        document.getElementById("Overlay").style.display = "none";
      } else {
        console.log("Set other animation");
        currentAnimation = outTimeline;
      }
    }
  });

  inTimeline
    .add({
      targets: "#Overlay",
      opacity: [0, 1],
      duration: 200,
      begin: () => {
        document.getElementById("Overlay").style.display = "block";
      },
      easing: "linear"
    })
    .add({
      targets: [".MenuOverlay-Item", ".LanguageSwitcher"],
      opacity: [0, 1],
      translateY: [
        { value: -2, easing: "easeOutElastic(1, .5)" },
        { value: 0, easing: "easeOutElastic(1, .5)" }
      ],
      delay: anime.stagger(100, { ease: "inOutElastic" }),
      easing: "linear"
    });

  currentAnimation = inTimeline;

  document.getElementById("hamburger-toggle").addEventListener(
    "click",
    function(e) {
      currentAnimation.play();
      if (currentAnimation.began) {
        currentAnimation.reverse();
      }
    },
    false
  );
})();
