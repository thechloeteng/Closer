var t1, t2, containerWidth = 70; // normal rotating animation, pause rotating animation timelines
var isTwistBtnClicked, isRestartBtnClicked = false;

$sceneMgr.setStage("#all");

$sceneMgr.addScene(".capsule-all", 1, "Scene1", {
    startScene: startScene1,
    endScene: endScene1,
});

function measure(){ // random pokeball
    for(let a=0; a<10; a++){
        $(`.pokeball${a+1}`).each(function(){
            let parent = $(this).parent();
            let grandpa = $(parent).parent();
            let grandpaWidth = $(grandpa).width();
            // console.log(grandpaWidth);
            let grandpaHeight= $(grandpa).height();
            // console.log(grandpaHeight);
            $(this).css({
                left: Math.floor(Math.max(0, Math.random() * grandpaWidth-60)),
                top: Math.floor(Math.random() * grandpaHeight)
            });
        });
    }
}

function playRotation(){
    for(let i=0; i<10; i++){
        t2.set(`.pokeball${i+1}`, {opacity: 1, y: 0, x: Math.max(0, Math.random()*containerWidth-100)}); /* Math.max chooses the 
        bigger number between -35 to the width of 400 || 0 is basically the default value of the set parameter */
        /* below is for y axis */
        t2.to(`.pokeball${i+1}`, {duration: Math.max(1.7, Math.random()*3.4), x: Math.max(0, Math.random()*containerWidth-100), opacity: 0, y: 140, rotation: Math.max(0, Math.random()* 360), repeat: -1}) /* 5+Math.random means 5 to 10 seconds */
        .progress(Math.random());
    }
}

function getRandomBall(){
    let msg = gsap.utils.random(
        [
            "img/svg/popUp1.svg", "img/svg/popUp2.svg", "img/svg/popUp3.svg", 
            "img/svg/popUp4.svg", "img/svg/popUp5.svg", "img/svg/popUp6.svg", 
            "img/svg/popUp7.svg", "img/svg/popUp8.svg"
        ]
    );
    if(msg){ // if item was caught
        $(".hole").click(function(){
            $(".popUp-img").removeClass("hide-borders");
            $(".close-btn").removeClass("hide-close-btn");
            $(".close").removeClass("hide-close-div");
            $(".image").removeClass("hide-img-div");
            $(".random-info-popup").removeClass("hide-info");

            $(".random-info-popup").attr("style", "display: block");
            $(".close-btn").attr("style", "display: block");
            $(".close").attr("style", "display: block");
            $(".image").attr("style", "display: block");
            $(".popUp-img").attr("src", msg);
            $(".popUp-img").attr("style", "display: block");
        });

        t1.pause();
        t2.pause();

        console.log("Caught!");
    }
    else {
        console.log("Not Caught!");
    }
    if(!isTwistBtnClicked){ // if true, do this
        $(".twist-btn").attr("disabled", true);
        $(".restart-btn").attr("style", "display: block");

        $(".restart-btn").click(function(){
            resumeRotation();
        });
        $(".close-btn").click(function(){
            $(".popUp-img").attr("style", "display: none");
            $(".close").attr("style", "display: none");
            $(".image").attr("style", "display: none");
            $(".random-info-popup").attr("style", "display: none");
            // $(this).attr("style", "display: none");
        });
        
        $(".twist-btn").attr("style", "display: none");
        $(".hole").attr("style", "display: block");
    }
}

function closePopUp(){ //function to close popup
	$(".close, .image, .random-info-popup").removeClass("fadeInAni");
}

function showPopUp(){ //function to show pop up
	$(".close, .image, .random-info-popup").addClass("fadeInAni");
}

function resumeRotation(){
    t1.resume();
    t2.resume();

    if(!isRestartBtnClicked){
        $(".twist-btn").attr("disabled", false);
        $(".restart-btn").attr("style", "display: none");
        $(".hole").attr("src", "img/svg/gachaball.svg");
        $(".twist-btn").attr("style", "display: block");
        $(".hole").attr("style", "display: none");
    }
}

var TwistBtnRotate = {
    rotate: 360,
    duration: 1
};

function rotateTwistBtn(evt){
    gsap.to(evt.currentTarget, TwistBtnRotate);
}

function gachacaught(evt){ //gacha ball rotate appear in hole and shake
    gsap.from(".hole",
        {
            rotate: "-=20",
            yoyo: true,
            repeat: -1,
            ease: "Power0,easeNone"
        }
    );
    gsap.to(".hole",
        {
            rotate: "+=20",
            yoyo: true,
            repeat: -1,
            ease: "Power0,easeNone"
        }
    );
}

function startScene1(){
    measure(); // place balls at random positions each time
    playRotation();

    $(".twist-btn").click(getRandomBall);

    gsap.from(".twist-btn", //twist button rotate animation
        {
            rotate: "-=10",
            yoyo: true,
            repeat: -1,
            ease: "Power0,easeNone"
        }
    );
    gsap.to(".twist-btn",
        {
            rotate: "+=10",
            yoyo: true,
            repeat: -1,
            ease: "Power0,easeNone"
        }
    );
}

function endScene1(){
    $(".twist-btn").off("click");
    gsap.killTweensOf(startScene1);
}

$sceneMgr.ready(function(){
    t1 = gsap.timeline(); // rotating the balls
    t2 = gsap.timeline(); // pausing the ongoing rotating balls animation

    $sceneMgr.start("Scene1"); // start 1st scene, HOME

    $(".twist-btn").on("click", rotateTwistBtn);
    $(".twist-btn").on("click", gachacaught);
    $(".hole").on("click", showPopUp); //event delegation
    $(".close-btn").on("click", closePopUp); //listen mouse click on X button
});