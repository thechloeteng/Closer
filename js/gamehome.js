var isItemClicked = false, collectedItemsArray = [], callBeforeSleepAni;

/* ready function */
$(function(){
    $("#s1-capsule").show();

    $("#s3-pickItems, #s4-inBriefing, #s5-inWork, #s6-duringLunch, #s7-receivePaycheck, #s8-inBed, #s9-beforeSleep").hide();

    $(".s1-start-btn").click(function(){
        prepareForWorkAni(); /* Scene 3 */
        $("#s1-capsule").hide();
        $("#s3-pickItems").show();
    });

    $("#s3-next").click(function(){
        inBriefingAni(); /* Scene 4 */
        $("#s3-pickItems").hide();
        $("#s4-inBriefing").show();
    });

    $("#s4-next").click(function(){
        inWorkAni(); /* Scene 5 */
        $("#s4-inBriefing").hide();
        $("#s5-inWork").show();
    });

    $("#s5-next").click(function(){
        eatingLunchAni();
        $("#s5-inWork").hide();
        $("#s6-duringLunch").show();
    });

    $("#s6-next").click(function(){
        receivePaycheckAni(); /* Scene 7 */

        $("#s6-duringLunch").hide();
        $("#s7-receivePaycheck").show();
    });
});

/* Preparing for Work In Dorm (Scene 1) */
function prepareForWorkAni(){
    let fadeIn = {
        y: 220,
        duration: 0.47,
        opacity: 1,
        ease: Power1.easeIn
    };
    let personMove = {
        delay: 0.5,
        x: 110,
        duration: 1.3,
       opacity: 1,
       ease: SteppedEase.config(10)
    };
    let overlay = {
        duration: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    };

    gsap.set("#s3-pickItems", { clearProps: "all" });

    let t1 = gsap.timeline();
    t1.to(".s3-person", personMove);
    t1.to(".s3-innercontainer", overlay);
    t1.to("#s1-popUp", fadeIn);

    $("#s1-close").click(movingObjectsAni);
}

function movingObjectsAni(){ /* Moving all 3 objects, side to side */
    $("#s1-popUp").addClass("hide-popup"); // hide pop up

    let resetOverlay = {
        backgroundColor: "rgba(0, 0, 0, 0)"
    };
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let moveVest = {
        duration: 0.6,
		x:"+=7",
		ease: "sine.inOut",
		yoyo: true,
		repeat: -1
    };
    let moveTag = {
        duration: 0.6,
        y: "-=5",
		x:"+=10",
		ease: "sine.inOut",
		yoyo: true,
		repeat: -1
    };
    let moveHelmet = {
        duration: 0.6,
        y: "-=5",
		x:"+=5",
		ease: "sine.inOut",
		yoyo: true,
		repeat: -1
    };
    let rotateIn = {
        opacity: 1,
        x: "+=5",
        rotation: "+=6",
        duration: 0.95,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 5
    };
    let objectFade = {
        opacity: 0
    };

    gsap.set("#s3-pickItems", { clearProps: "all" });

    var t1 = gsap.timeline();
    t1.to(".s3-innercontainer", resetOverlay);
    
    $(".s3-vest").click(function(){
        collectedItemsArray.push(1);
        t1.to(this, objectFade);
        if(collectedItemsArray.length >= 3){
            afterCollectObjects();
        }
    });
    $(".s3-tag").click(function(){
        collectedItemsArray.push(2);
        t1.to(this, objectFade);
        if(collectedItemsArray.length >= 3){
            afterCollectObjects();
        }
    });
    $(".s3-helmet").click(function(){
        collectedItemsArray.push(3);
        t1.to(this, objectFade);
        if(collectedItemsArray.length >= 3){
            afterCollectObjects();
        }
    });

    t1.fromTo(".one", blinkOut, blinkIn);
    t1.to(".s3-clickme", rotateIn);
    t1.to(".s3-helmet", moveHelmet);
    t1.to(".s3-vest", moveVest);
    t1.to(".s3-tag", moveTag);
}

function afterCollectObjects(){ /* if character picks up all objects, call this fn */
    $(".s3-clickme").css("opacity", 0);
    $(".s3-all-item").removeClass("hide-popup"); // hide pop up
    $(".s3-beditems").css("opacity", 0);

    let overlay = {
        duration: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    };
    
    let fadeIn = {
        duration: 0.63,
        opacity: 1,
        ease: Power1.easeIn
    };

    let scaleTo = {
        opacity: 1,
        duration: 0.47,
        scale: 1.3,
        delay: 0.35
    };

    let scaleBack = {
        duration: 0.52,
        scale: 1,
    };

    let fadeInFast = {
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    };

    let t1 = gsap.timeline();
    t1.to(".s3-innercontainer", overlay);
    t1.to(".acquired-text", fadeIn);
    t1.to(".s3-all-item", fadeIn);
    t1.to(".s3-helmet-item", scaleTo);
    t1.to(".s3-helmet-item", scaleBack);
    t1.to(".s3-tag-item", scaleTo);
    t1.to(".s3-tag-item", scaleBack);
    t1.to(".s3-vest-item", scaleTo);
    t1.to(".s3-vest-item", scaleBack);
    t1.to("#s3-next", fadeInFast);
}

/* In Briefing (Scene 4) */
function inBriefingAni(){
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let floatL = {
        opacity: 1,
        duration: 0.9,
        x: -625
    };
    let floatLUp = {
        duration: 0.9,
        opacity: 0,
        x: -620,
        y: -420
    };
    let floatR = {
        delay: 0.6,
        opacity: 1,
        duration: 0.8,
        x: -395
    };
    let floatRUp = {
        duration: 0.7,
        opacity: 0,
        x: -400,
        y: -600
    };
    let floatL2 = {
        delay: 0.6,
        opacity: 1,
        duration: 0.9,
        x: -623
    };
    let floatL2Up = {
        duration: 0.7,
        opacity: 0,
        x: -620,
        y: -500
    };
    let fadeInFast = {
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    };

    gsap.set("#s4-inBriefing", { clearProps: "all" });

    let t2 = gsap.timeline();
    t2.fromTo(".two", blinkOut, blinkIn);
    t2.to(".s4-text-bubble", floatL); /* left speech bubble */
    t2.to(".s4-text-bubble", floatLUp); /* left speech bubble */
    t2.to(".s4-text-bubble-2", floatR); /* right speech bubble 1 */
    t2.to(".s4-text-bubble-2", floatRUp); /* right speech bubble 1 */
    t2.to(".s4-text-bubble-3", floatL2); /* right speech bubble 2 */
    t2.to(".s4-text-bubble-3", floatL2Up); /* right speech bubble 2 */
    t2.to("#s4-next", fadeInFast); /* next button appear */
}

/* Doing Construction (Scene 5) */
function inWorkAni(){ /* Scene 5 */
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let charMoveIn = {
        opacity: 0.9,
        x: -2000
    };
    let charMoveL = {
        delay: 0.3,
        opacity: 1,
        duration: 4.5,
        x: 1400,
        ease: SteppedEase.config(8)
    };
    let overlay = {
        duration: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    };
    let resetOverlay = {
        backgroundColor: "rgba(0, 0, 0, 0)"
    };
    let fadeIn = {
        y: 400,
        duration: 0.47,
        opacity: 1,
        ease: Power1.easeIn
    };
    let fadeInFast = {
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    };
    
    gsap.set("#s5-inWork", { clearProps: "all" });

    let t3 = gsap.timeline();
    t3.fromTo(".three", blinkOut, blinkIn);
    t3.fromTo(".s5-twoperson", charMoveIn, charMoveL);
    t3.to(".s5-innercontainer", overlay);
    t3.to("#s5-popUp", fadeIn);

    $("#s5-close").click(function(){
        t3.to(".s5-innercontainer", resetOverlay);
        $("#s5-popUp").css("opacity", 0); // hide pop up
        t3.to("#s5-next", fadeInFast);
    });
}

/* Eating Lunch (Scene 6) */
function eatingLunchAni(){
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let fadeIn = {
        y: 295,
        duration: 0.47,
        opacity: 1,
        ease: Power1.easeIn
    };
    let overlay = {
        duration: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    };
    let resetOverlay = {
        backgroundColor: "rgba(0, 0, 0, 0)"
    };

    gsap.set("#s6-duringLunch", { clearProps: "all" });

    let t4 = gsap.timeline();
    t4.fromTo(".four", blinkOut, blinkIn);

    $(".s6-all-objects").css("opacity", 0.05);
    $(".start-eating-btn").css("opacity", 0);
    
    t4.to(".s6-innercontainer", overlay);
    t4.to("#s6-popUp", fadeIn);

    $("#s6-close").click(function(){
        t4.to(".s6-innercontainer", resetOverlay);
        $("#s6-popUp").css("opacity", 0); // hide pop up

        eatingLunchAni2();
    });
}

/* Eating Lunch Part 2 (Scene 6) */
function eatingLunchAni2(){
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let floatL = {
        opacity: 1,
        duration: 1.5,
        x: -1025
    };
    let floatLUp = {
        duration: 0.7,
        opacity: 0,
        x: -1020,
        y: -400
    };
    let floatR = {
        opacity: 1,
        duration: 1.7,
        x: -960
    };
    let floatRUp = {
        duration: 0.9,
        opacity: 0,
        x: -965,
        y: -650
    };
    let foodFadeOut = {
        delay: 0.2,
        duration: 1,
        opacity: 0,
        ease: Power1.easeOut
    };
    let fadeInFast = {
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    };

    gsap.set("#s6-duringLunch", { clearProps: "all" });

    $(".s6-all-objects").css("opacity", 1);
    $(".four").text("After Lunch...");

    let t4 = gsap.timeline();
    t4.to(".s6-text-bubble", floatL);
    t4.to(".s6-text-bubble", floatLUp);
    t4.to(".s6-text-bubble-2", floatR);
    t4.to(".s6-text-bubble-2", floatRUp);
    t4.fromTo(".four", blinkOut, blinkIn);
    t4.to(".food-one", foodFadeOut);
    t4.to(".food-three", foodFadeOut);
    t4.to(".food-two", foodFadeOut);
    t4.to("#s6-next", fadeInFast);
}

/* Receiving Paycheck (Scene 7) */
function receivePaycheckAni(){
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let floatL = {
        opacity: 1,
        duration: 1.7,
        x: -500
    };
    let floatLUp = {
        duration: 0.9,
        opacity: 0,
        x: -510,
        y: 290
    };
    let floatR = {
        delay: 0.2,
        opacity: 1,
        duration: 1.7,
        x: -110
    };
    let floatRUp = {
        duration: 0.9,
        opacity: 0,
        x: -110,
        y: 140
    };
    let angryShake = {
        duration: 1.3,
        rotate: 70,
        scale: 1.2,
        repeat: 2
    };
    let angryShakeReset = {
        scale: 1
    };
    let fadeIn = {
        y: -88,
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    };
    let fadeInQuick = {
        duration: 0.65,
        opacity: 1,
        ease: Power1.easeIn
    };

    $(".s7-angry-lines").css("opacity", 1);

    gsap.set("#s7-receivePaycheck", { clearProps: "all" });

    let t5 = gsap.timeline();
    t5.to(".s7-text-bubble", floatL);
    t5.to(".s7-text-bubble", floatLUp);
    t5.to(".s7-angry-lines", angryShake, angryShakeReset);
    t5.to(".s7-text-bubble-2", floatR);
    t5.to(".s7-text-bubble-2", floatRUp);
    t5.fromTo(".five", blinkOut, blinkIn);
    t5.to(".s7-paycheck", fadeIn);
    t5.to("#s7-receive", fadeInQuick);
    
    $("#s7-receive").click(function(){
        $(".s7-paycheck").css("opacity", 0); // hide paycheck pop up
        $("#s7-receive").css("opacity", 0); // hide receive payment button
        inBedAni(); /* Scene 8 */
        $("#s7-receivePaycheck").hide();
        $("#s8-inBed").show();
    });
}

/* Kumar Lying In Bed (Scene 8) */
function inBedAni(){
    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let floatL = {
        opacity: 1,
        duration: 2.2,
        x: -1050
    };
    let floatLUp = {
        duration: 0.9,
        opacity: 0,
        x: -1045,
        y: -45
    };
    let floatR = {
        delay: 0.4,
        opacity: 1,
        duration: 2.2,
        x: -260
    };
    let floatRUp = {
        duration: 0.9,
        opacity: 0,
        x: -260,
        y: -220
    };
    let overlay = {
        delay: 0.2,
        duration: 1.8,
        backgroundColor: "rgba(0, 0, 0, 0.75)"
    };

    gsap.set("#s8-inBed", { clearProps: "all" });

    let t6 = gsap.timeline();
    t6.fromTo(".six", blinkOut, blinkIn);
    t6.to(".s8-innercontainer", overlay);
    t6.to(".s8-family-text-bubble", floatL);
    t6.to(".s8-family-text-bubble", floatLUp);
    t6.to(".s8-paycheck-text-bubble", floatR);
    t6.to(".s8-paycheck-text-bubble", floatRUp);

    callBeforeSleepAni = setInterval(beforeSleepAni, 10000);
}

function beforeSleepAni(){
    $("#s8-inBed").hide();
    $("#s9-beforeSleep").show();

    setTimeout(function(){
        clearInterval(callBeforeSleepAni, 1000);
    }, 1000);

    let blinkOut = {
        opacity: 0
    };
    let blinkIn = {
        duration: 1.5,
        opacity: 1,
        repeat: -1,
        ease: Power1.easeIn
    };
    let floatL = {
        opacity: 1,
        duration: 2.3,
        x: -1050
    };
    let floatLUp = {
        duration: 0.8,
        opacity: 0,
        x: -1055,
        y: -30
    };
    let overlay = {
        delay: 0.2,
        duration: 2.8,
        backgroundColor: "rgba(0, 0, 0, 1)"
    };
    let fadeIn = { /* apology text to his son */
        duration: 2,
        opacity: 1,
        ease: Power1.easeIn
    };
    let fadeOut = { /* apology text to his son */
        delay: 1,
        duration: 2.6,
        opacity: 0,
        ease: Power1.easeIn
    };
    let ctaTextFadeIn = { /* final cta text to users */
        delay: 0.25,
        duration: 2,
        opacity: 1,
        ease: Power1.easeIn
    };
    let ctaFadeInFast = {
        delay: 0.4,
        duration: 1.2,
        opacity: 1,
        ease: Power1.easeIn
    };
    let fadeInFast = {
        opacity: 0.5,
        delay: 0.2,
        duration: 1,
        ease: Power1.easeIn
    };

    gsap.set("#s9-beforeSleep", { clearProps: "all" });

    let t7 = gsap.timeline();
    t7.fromTo(".seven", blinkOut, blinkIn);
    t7.to(".s9-superhero-text-bubble", floatL);
    t7.to(".s9-superhero-text-bubble", floatLUp);
    t7.to(".s9-innercontainer", overlay);
    t7.to(".apology-text", fadeIn);
    t7.to(".apology-text", fadeOut);
    t7.to(".final-cta-text", ctaTextFadeIn);
    t7.to("#s9-cta", ctaFadeInFast);
    t7.to("#s9-restart", fadeInFast);

    $("#s9-restart").click(function(){
        $("#s9-beforeSleep").hide();

        location.reload(); // reload page after clicking restart

        setTimeout(function(){
            clearInterval(displayAcquiredText, 1000);
        }, 1000);
    });
}