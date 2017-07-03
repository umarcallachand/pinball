$(document).ready(function(){
    
var playerScores = [];
var i = 1;              //the same as player number
var speed = 250;        //the starting value of speed y
var array_night = [];
var array_drop = [];
var array_fly = [];
var array_abcd = []; 
    
var credit = +localStorage.getItem('coins');
var gravity = +localStorage.getItem('gravity');
var tilt_sensitivity = +localStorage.getItem('tilt_sensitivity');
var balls_per_player = +localStorage.getItem('num_balls');//balls per player defines number of balls per player
var free_score = +localStorage.getItem('free_score');
var num_players = +localStorage.getItem('num_players');

var numBalls = + balls_per_player;                        //numBalls defines current number of balls
    
var score = 00;
var free = false; //for free score
var night = false;//used to trigger night bonus only once
var drop = false;   //used to trigger drop bonus only once
    
var tilt_left = 0; //uses to detect tilt
var tilt_right = 0;

    
$('.box' + i).addClass('active');
    
$('.box1').text(playerScores[0]);
$('.box2').text(playerScores[1]);
$('.box3').text(playerScores[2]);
$('.box4').text(playerScores[3]);
$('.box5').text(credit);
$('.box6').text(numBalls);
numBalls = numBalls + 1;  //this one corresponds to the ball which will be killed

//Phaser starts here
var gameScreen = new Phaser.Game(450,600,Phaser.AUTO,pinball);

var pinballScreen = {
    preload: function(){
        //loads all the components and ball for the game
        this.load.image('pinballBoardLeft', 'assets/left.png');
        this.load.image('pinballBoardRight', 'assets/right.png');
        this.load.image('pinballBoardTopLeft', 'assets/top_left.png');
        this.load.image('pinballBoardTopRight', 'assets/top_right.png');
        this.load.image('bottom_right','assets/bot_right.png');
        this.load.image('triangle_right','assets/triangle_right.png');
        this.load.image('triangle_left','assets/triangle_left.png');
        this.load.image('obj_top','assets/obj_top2.png');
        this.load.image('obj_bot','assets/obj_bot.png');
        this.load.image('obj_bot2','assets/obj_bot2.png');
        this.load.image('circle1','assets/circle1.png');
        this.load.image('circle2','assets/circle2.png');
        this.load.image('circle3','assets/circle3.png');
        this.load.image('circle4','assets/circle4.png');
        this.load.image('bf_left','assets/B_flipper_L.png');
        this.load.image('bf_right','assets/B_flipper_R.png');
        this.load.image('flipper_R','assets/flipper_R.png');
        this.load.image('flipper_L','assets/flipper_L.png');
        this.load.image('bumper_left','assets/bumper_left.png');
        this.load.image('bumper_right','assets/bumper_right.png');
        this.load.image('spring','assets/spring.png');
        this.load.image('ball','assets/boul2.png');
        this.load.image('bar','assets/bar.png');
        this.load.image('bar2','assets/bar2.png');
        this.load.image('bar3','assets/bar3.png');
        this.load.image('bar4','assets/bar4.png');
        this.load.image('A','assets/A.png');
        this.load.image('B','assets/B.png');
        this.load.image('F','assets/F_red.png');
        this.load.image('L','assets/L_red.png');
        this.load.image('Y','assets/Y_red.png');
        this.load.image('C','assets/C.png');
        this.load.image('D','assets/D.png');
        this.load.image('N','assets/N_red.png');
        this.load.image('I','assets/I_red.png');
        this.load.image('G','assets/G_red.png');
        this.load.image('H','assets/H_red.png');
        this.load.image('T','assets/T_red.png');
        this.load.image('Dr','assets/Drop.png');
        this.load.image('R','assets/Rop.png');
        this.load.image('O','assets/Op.png');
        this.load.image('P','assets/P.png');
        this.load.image('tri','assets/trial.png');
    
        //loads JSON file
        this.load.physics("sprite_physics", "Assets/sprite_physics.json");    
    },
    
    create: function(){
        //starts physics
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);
        
        //sets gravity
        this.physics.p2.gravity.y = gravity;
        this.physics.p2.restitution = 0.9;
        
        var pinballBoardLeft, pinballBoardRight, pinballBoardTopLeft, pinballBoardTopRight,bottom_right, triangle_right, triangle_left, obj_bot, obj_top, circle1, circle2, circle3_1, circle3_2, circle4, bf_right, bf_left, flipper_L, flipper_R, bumper_right, bumper_left, pinballBoard;
        
        pinballBoard = gameScreen.add.group();
                
        this.bumper_left = pinballBoard.create(145,430,'bumper_left'); 
        this.bumper_right = pinballBoard.create(315,430,'bumper_right');
        this.circle1 = pinballBoard.create(290,200,'circle1');
        this.circle2 = pinballBoard.create(200,300,'circle2');
        this.circle3_1 = pinballBoard.create(220,150,'circle3');
        this.circle3_2 = pinballBoard.create(280,300,'circle3');
        this.circle4 = pinballBoard.create(360,140,'circle4');
        pinballBoardLeft = pinballBoard.create(0,300,'pinballBoardLeft');
        obj_bot = pinballBoard.create(110,160,'obj_bot');
        this.obj_bot2 = pinballBoard.create(108,223,'obj_bot2');
        this.obj_top = pinballBoard.create(105,120,'obj_top');
        pinballBoardRight = pinballBoard.create(450,300,'pinballBoardRight');
        pinballBoardTopLeft = pinballBoard.create(184,18,'pinballBoardTopLeft');
        pinballBoardTopRight = pinballBoard.create(410,42,'pinballBoardTopRight');
        triangle_left = pinballBoard.create(30,280,'triangle_left');
        triangle_right = pinballBoard.create(386,343,'triangle_right');
        bf_right = pinballBoard.create(343,505,'bf_right');
        bf_left = pinballBoard.create(118,505,'bf_left');
        this.bottom_right = pinballBoard.create(414,575,'bottom_right');
        this.spring = pinballBoard.create(427,571,'spring');
        this.flipper_L = pinballBoard.create(147,544,'flipper_L');
        this.flipper_R = pinballBoard.create(310,545,'flipper_R');
        this.bar_1 = pinballBoard.create(210,95,'bar');
        this.bar_2 = pinballBoard.create(242,88,'bar2');
        this.bar_3 = pinballBoard.create(275,76,'bar3');
        this.bar_4 = pinballBoard.create(310,76,'bar3');
        this.bar_5 = pinballBoard.create(343,88,'bar2');
        this.bar_6 = pinballBoard.create(375,95,'bar');
        this.bar_bot_3 = pinballBoard.create(89,395,'bar3');
        this.bar_bot_2 = pinballBoard.create(61,395,'bar3');
        this.bar_bot_1 = pinballBoard.create(54,420,'bar4');
        this.inclined_F = pinballBoard.create(108,267,'F');
        this.inclined_L = pinballBoard.create(130,257,'L');
        this.inclined_Y = pinballBoard.create(152,247,'Y');
        this.inclined_A = pinballBoard.create(365,285,'A');
        this.inclined_B = pinballBoard.create(385,305,'B');
        this.inclined_C = pinballBoard.create(20,320,'C');
        this.inclined_D = pinballBoard.create(45,305,'D');
        
        this.N_back = pinballBoard.create(225,95,'tri');
        this.N = pinballBoard.create(225,95,'N');
        this.I_back = pinballBoard.create(257,88,'tri');
        this.I = pinballBoard.create(257,88,'I');
        this.G_back = pinballBoard.create(293,85,'tri');
        this.G = pinballBoard.create(293,85,'G');
        this.H_back = pinballBoard.create(325,88,'tri');
        this.H = pinballBoard.create(325,88,'H');
        this.T_back = pinballBoard.create(358,95,'tri');
        this.T = pinballBoard.create(358,95,'T');
        
        this.Dr_back = pinballBoard.create(20,395,'tri');
        this.Dr = pinballBoard.create(20,395,'Dr');
        this.R_back = pinballBoard.create(46,395,'tri');
        this.R = pinballBoard.create(46,395,'R');
        this.O_back = pinballBoard.create(75,395,'tri');
        this.O = pinballBoard.create(75,395,'O');
        this.P_back = pinballBoard.create(105,395,'tri');
        this.P = pinballBoard.create(105,395,'P');
        
        //sets a ball which will be killed automatically in the update function
        //it's done so as the ball will be released with a speed determine by the amount of time the spacebar is pressed as it can be used in only update function
        this.ball = this.add.sprite(430,590,'ball');
        this.physics.p2.enable([this.ball,pinballBoard],false);
        
        
        //objectName = ["bumper_left", "bumper_right", "circle1", "circle2", "circle3", "circle4", "flipper_L", "flipper_R", "left", "obj_bot", "obj_top", "right", "top_left", "top_right", "triangle_left", "triangle_right", "B_flipper_L", "B_flipper_R", "bot_right"]
        
        pinballBoard.forEach(function(child){
            child.body.clearShapes();
            child.body.static = true;
        });
        
        //these will load the polygon with which the ball will collide
        this.bumper_left.body.loadPolygon('sprite_physics','bumper_left');
        this.bumper_right.body.loadPolygon('sprite_physics','bumper_right');
        this.circle1.body.loadPolygon('sprite_physics','circle1');
        this.circle2.body.loadPolygon('sprite_physics','circle2');
        this.circle3_1.body.loadPolygon('sprite_physics','circle3');
        this.circle3_2.body.loadPolygon('sprite_physics','circle3');
        this.circle4.body.loadPolygon('sprite_physics','circle4');
        this.flipper_L.body.loadPolygon('sprite_physics','flipper_L');
        this.flipper_R.body.loadPolygon('sprite_physics','flipper_R');
        pinballBoardLeft.body.loadPolygon('sprite_physics','left');
        obj_bot.body.loadPolygon('sprite_physics','obj_bot');
        this.obj_bot2.body.loadPolygon('sprite_physics','obj_bot2');
        this.obj_top.body.loadPolygon('sprite_physics','obj_top');
        pinballBoardRight.body.loadPolygon('sprite_physics','right');
        pinballBoardTopLeft.body.loadPolygon('sprite_physics','top_left');
        pinballBoardTopRight.body.loadPolygon('sprite_physics','top_right');
        triangle_left.body.loadPolygon('sprite_physics','triangle_left');
        triangle_right.body.loadPolygon('sprite_physics','triangle_right');
        bf_right.body.loadPolygon('sprite_physics','B_flipper_R');
        bf_left.body.loadPolygon('sprite_physics','B_flipper_L');
        this.bottom_right.body.loadPolygon('sprite_physics','bot_right');
        this.bar_1.body.loadPolygon('sprite_physics','bar');
        this.bar_2.body.loadPolygon('sprite_physics','bar2');
        this.bar_3.body.loadPolygon('sprite_physics','bar3');
        this.bar_4.body.loadPolygon('sprite_physics','bar3');
        this.bar_5.body.loadPolygon('sprite_physics','bar2');
        this.bar_6.body.loadPolygon('sprite_physics','bar');
        this.bar_bot_3.body.loadPolygon('sprite_physics','bar3');
        this.bar_bot_2.body.loadPolygon('sprite_physics','bar3');
        this.bar_bot_1.body.loadPolygon('sprite_physics','bar4');
        this.inclined_F.body.loadPolygon('sprite_physics','inclined_bar2');
        this.inclined_L.body.loadPolygon('sprite_physics','inclined_bar2');
        this.inclined_Y.body.loadPolygon('sprite_physics','inclined_bar2');
        this.inclined_B.body.loadPolygon('sprite_physics','inclined_bar');
        this.inclined_A.body.loadPolygon('sprite_physics','inclined_bar');
        this.inclined_D.body.loadPolygon('sprite_physics','inclined_bar3');
        this.inclined_C.body.loadPolygon('sprite_physics','inclined_bar3');
        
        //changes the pivot of the flippers so that they rotate as expected
        this.flipper_L.anchor.setTo(0,0);    
        this.flipper_R.anchor.setTo(1,0);
        
        this.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.A,
        Phaser.Keyboard.L,
        Phaser.Keyboard.P
        ]);
        
        //pausing the game
        // Create a label to use as a button
        pause_label = this.add.text(50, 0, 'Pause', { font: '18px Arial', fill: '#0000dd' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            // When the pause button is pressed, the game is paused
            gameScreen.paused = true;
            $('.tilt').text('Game Paused');
        });
        
        //this will help to unpause the game
        this.input.onDown.add(unpause, self);

        //the method that handels the game when paused
        function unpause(event){
            if(gameScreen.paused){
                //click anywhere on the screen to unpause
                if(event.x > 0 && event.x < 450 && event.y > 0 && event.y < 600){
                        gameScreen.paused = false;
                        $('.tilt').text(' ');
                }
            }
        }
        
    },
    
    update: function(){
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
        if(this.flipper_L.body.angle > -65){
            this.flipper_L.body.angle -= 10; 
        }
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
        if(this.flipper_R.body.angle < 65){
        this.flipper_R.body.angle += 10;
        }
        }
        else 
        {
        this.flipper_L.body.setZeroRotation();
        this.flipper_R.body.setZeroRotation();
        this.flipper_L.body.angle = 0;
        this.flipper_R.body.angle = 0;
        }
        
        if(this.ball.y > 585){
            this.ball.body.sprite.kill();
            
            //adds another ball
            if(numBalls >= 0){
                
                if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && speed < 1000){
                    speed += 10;
                    this.spring.scale.y -= 0.01;
                }
                
                else if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) == false && speed > 250){
                    numBalls -= 1;
                    $('.box6').text(numBalls);
                    this.ball = this.add.sprite(430,530,'ball');
                    this.physics.p2.enable([this.ball],false);
                    this.ball.body.setCircle(9);
                    this.ball.body.velocity.x = -20;
                    this.ball.body.velocity.y = -speed;
                    
                    //inserts all the functions which will have effect on the ball
                    this.ball.body.createBodyCallback(this.bumper_left, hitBumper, this);
                    this.ball.body.createBodyCallback(this.bumper_right, hitBumper, this);
                    //increases the speed of the ball so that it does not get stuck
                    this.ball.body.createBodyCallback(this.bottom_right, increase_speed, this);
                    this.ball.body.createBodyCallback(this.obj_bot2, increase_speed, this);
                    //increases the velocity y when the ball hits the flipper to add impact
                    this.ball.body.createBodyCallback(this.flipper_L, flipper, this);
                    this.ball.body.createBodyCallback(this.flipper_R, flipper, this);
                    //this.ball.body.createBodyCallback(this.obj_top, hitBumper, this);
                    //small bumpers = the circles
                    this.ball.body.createBodyCallback(this.circle1, small_bumpers, this);
                    this.ball.body.createBodyCallback(this.circle2, small_bumpers, this);
                    this.ball.body.createBodyCallback(this.circle3_1, small_bumpers, this);
                    this.ball.body.createBodyCallback(this.circle3_2, small_bumpers, this);
                    this.ball.body.createBodyCallback(this.circle4, small_bumpers, this);
                    
                    this.ball.body.createBodyCallback(this.inclined_A, fly_abcd, this);
                    this.ball.body.createBodyCallback(this.inclined_B, fly_abcd, this);
                    this.ball.body.createBodyCallback(this.inclined_C, fly_abcd, this);
                    this.ball.body.createBodyCallback(this.inclined_D, fly_abcd, this);
                    
                    this.ball.body.createBodyCallback(this.inclined_F, fly, this);
                    this.ball.body.createBodyCallback(this.inclined_L, fly, this);
                    this.ball.body.createBodyCallback(this.inclined_Y, fly, this);
                    
                    //resets all the bodies which have been killed
                    this.inclined_F.body.sprite.reset(108,267);
                    this.inclined_L.body.sprite.reset(130,257);
                    this.inclined_Y.body.sprite.reset(152,247);
                    this.inclined_A.body.sprite.reset(365,285);
                    this.inclined_B.body.sprite.reset(385,305);
                    this.inclined_C.body.sprite.reset(20,320);
                    this.inclined_D.body.sprite.reset(45,305);
                    
                    //empty the arrays
                    array_abcd = [];
                    array_fly = [];
                    
                    $('.abcd').text(" ");
                    $('.fly').text(" ");
                    $('.tilt').text(" ");
                                     
                    speed = 250;
                    this.spring.scale.y = 1;
                }
            }
            if(numBalls < 1){
                playerScores.push(score);
                score = 0;
                $('.box' + i).removeClass('active');
                if(i < num_players){ 
                    i += 1;
                    numBalls += balls_per_player;
                    $('.box6').text(numBalls);
                    $('.box' + i).addClass('active');
                    $('.free_score').text(" ");
                    
                    this.N.body.sprite.reset(225,95);
                    this.I.body.sprite.reset(257,88);
                    this.G.body.sprite.reset(293,85);
                    this.H.body.sprite.reset(325,88);
                    this.T.body.sprite.reset(358,95);
                    this.Dr.body.sprite.reset(20,395);
                    this.R.body.sprite.reset(46,395);
                    this.O.body.sprite.reset(75,395);
                    this.P.body.sprite.reset(105,395);
                    
                    //empty these arrays
                    array_night = [];
                    array_drop = [];
                    
                    $('.night').text(" ");
                    $('.drop').text(" ");
                    
                    //resets bonuses
                    night = false;
                    drop = false;
                }
                else if(numBalls == 0){
                    
                    gameScreen.destroy();
                    gameOver();
                }
            }
        }
        //checks if ball has overlap with NIGHT and perform these functions
        if (Overlap(this.ball, this.N_back)){fly_for_night(this.N);}
        if (Overlap(this.ball, this.I_back)){fly_for_night(this.I);}
        if (Overlap(this.ball, this.G_back)){fly_for_night(this.G);}
        if (Overlap(this.ball, this.H_back)){fly_for_night(this.H);}
        if (Overlap(this.ball, this.T_back)){fly_for_night(this.T);}
        
        //checks if ball has overlap with DROP and perform these functions   
        if (Overlap(this.ball, this.Dr_back)){fly_for_drop(this.Dr);}
        if (Overlap(this.ball, this.R_back)){fly_for_drop(this.R);}
        if (Overlap(this.ball, this.O_back)){fly_for_drop(this.O);}
        if (Overlap(this.ball, this.P_back)){fly_for_drop(this.P);} 
        
        //bumping table
        //to the right
        if (this.input.keyboard.isDown(Phaser.Keyboard.L)){
            this.ball.body.velocity.x += 20;
            $('#pinball').css('padding-left','50px');
            tilt_right += 1;
            //detects if tilted and place the ball at position y >585 so that it will be killed 
            if(tilt_right > tilt_sensitivity){
                this.ball.body.y = 590;
                $('.tilt').text('TILTED!');
            }
        }
        else if(this.input.keyboard.isDown(Phaser.Keyboard.L) == false){
            $('#pinball').css('padding-left','0px');
            tilt_right = 0;
        }
        //bump table to the left
        if (this.input.keyboard.isDown(Phaser.Keyboard.A)){
            this.ball.body.velocity.x -= 20;
            
            $('#pinball').css('padding-right','50px');
            tilt_left += 1;
            //detects if tilted and place the ball at position y >585 so that it will be killed 
            if(tilt_left > tilt_sensitivity){
                this.ball.body.y = 590;
                $('.tilt').text('TILTED!');
            }
        }
        else if(this.input.keyboard.isDown(Phaser.Keyboard.A) == false){
            $('#pinball').css('padding-right','0px');
            tilt_left = 0;
        }
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.P)){
            gameScreen.paused = true;
            $('.tilt').text('Game Paused');
        }
    }
    
};

function hitBumper(body1, body2){
    if(this.ball.body.velocity.x < 0 && this.ball.body.velocity.x > -900){
        this.ball.body.velocity.x -= 125;
    }
    if(this.ball.body.velocity.y < 0 && this.ball.body.velocity.y > -900){
        this.ball.body.velocity.y -= 250;
    }
    else if(this.ball.body.velocity.x < 900){
        this.ball.body.velocity.x += 125;
    }
    else if(this.ball.body.velocity.y < 900){
        this.ball.body.velocity.y += 250;
    }
    score += 90;
    $('.box'+i).text(score);
    
    freeScore();
    
};

function small_bumpers(body1,body2){
    if(this.ball.body.velocity.x < 0 && this.ball.body.velocity.x > -900){
        this.ball.body.velocity.x -= 50;
    }
    if(this.ball.body.velocity.y < 0 && this.ball.body.velocity.y > -900){
        this.ball.body.velocity.y -= 150;
    }
    else if(this.ball.body.velocity.x < 900){
        this.ball.body.velocity.x += 50;
    }
    else if(this.ball.body.velocity.y < 900){
        this.ball.body.velocity.y += 150;
    }
    score += 50;
    $('.box'+i).text(score);
    freeScore();
};

function fly(body1,body2){
    //console.log(body2.sprite.key);
    array_fly.push(body2.sprite.key);
    array_fly.sort();
    $('.fly').text(array_fly);
    body2.sprite.kill();
    score += 1000;
    $('.box'+i).text(score);
    
    if(array_fly.length == 3){
        $('.fly').text("GOT ALL! SCORES + 5 000!");
        score += 5000;
        $('.box'+i).text(score);
    }
    freeScore();
};
    
function fly_abcd(body1,body2){
    //console.log(body2.sprite.key);
    array_abcd.push(body2.sprite.key);
    array_abcd.sort();
    $('.abcd').text(array_abcd);
    body2.sprite.kill();
    score += 1000;
    $('.box'+i).text(score);
    
    if(array_abcd.length == 4){
        $('.abcd').text("GOT ALL! SCORES + 2 000!");
        score += 2000;
        $('.box'+i).text(score);
    }
    freeScore();
};

function Overlap(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
    
function fly_for_night(body1){
    //tests if the object's key is found in the array
    if(array_night.includes(body1.body.sprite.key) == false){
        body1.body.sprite.kill();
        array_night.push(body1.body.sprite.key);        //push the key to the array of NIGHT
        $('.night').text(array_night);
        score += 1500;
        $('.box'+i).text(score);
    }
    
    else if(array_night.length == 5 && night == false){
        $('.night').text("GOT ALL! SCORES + 10 000!");
        score += 10000;
        $('.box'+i).text(score);
        night = true;
    }
    freeScore();
};

function fly_for_drop(body1){
    //tests if the object's key is found in the array
    if(array_drop.includes(body1.body.sprite.key) == false){
        body1.body.sprite.kill();
        array_drop.push(body1.body.sprite.key);        //push the key to the array of DROP
        $('.drop').text(array_drop);
        score += 2000;
        $('.box'+i).text(score);
    }
    
    else if(array_drop.length == 4 && drop == false){
        $('.drop').text("GOT ALL! SCORES + 10 000!");
        score += 10000;
        $('.box'+i).text(score);
        drop = true;
    }
    
    freeScore();
};


function increase_speed(body1,body2){
    this.ball.body.velocity.y -= 250;
    this.ball.body.velocity.x -= 200;
};
    
function flipper(body1,body2){
    this.ball.body.velocity.y -= 100;
};

function freeScore(){
    if(score > free_score && free == false){
        numBalls += 1;
        $('.free_score').text("Free Score achieved!! BAll + 1");
        $('.box6').text(numBalls);
        free = true;
    }
}
    
function gameOver(){
    //finds the biggest value in the array with its index = max
    var max = playerScores.length-1;
    for (var i=playerScores.length-1; i--;) {
        if (playerScores[i] > playerScores[max]) {
            max = i;
        }
    }
    var highscore = playerScores[max];
    //max is the index so max+1 is the player number
    var playerWon = max +1;
    $('#pinball').html('<p>Highscore: '+ highscore + '</p><p>Player ' + playerWon + ' WINS!</p>');
}
    
gameScreen.state.add('pinball',pinballScreen);
gameScreen.state.start('pinball');
//Phaser ends here

});