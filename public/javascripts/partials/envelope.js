let t1 = gsap.timeline({ paused: true }); 
let t2 = gsap.timeline({ paused: true }); 
let isOpen = false;

let flap = CSSRulePlugin.getRule(".envelope:before"); 

t1.to(flap, { 
  duration: 0.5, 
  cssRule: {
    rotateX: 180
  }
})
 .set(flap, {
  cssRule: {
    zIndex: 10
  }
})
 .to('.enve-letter', {
  translateY: -200,
  duration: 0.9, 
  ease: "back.inOut(1.5)"
})
 .set('.enve-letter', {
  zIndex: 40
})
 .to('.enve-letter', {
  duration: .7,  
  ease: "back.out(.4)",
  translateY: -5,
  translateZ: 250,
  scale: 1.5
});

t2.to('.enve-shadow', {
  delay: 1.4,
  width: 450,
  boxShadow: "-75px 150px 10px 5px #eeeef3",
  ease: "back.out(.2)",
  duration: .7
}); 

function toggleCard(){
  if(!isOpen){
    t1.play();
    t2.play();
    isOpen = true;
  }
  else{
    t1.reverse();
    t2.reverse();
    isOpen = false;
  }
}


