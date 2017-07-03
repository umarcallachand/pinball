$(document).ready(function(){
    var gravity = 400;
    var tilt_sensitivity = 30;
    var num_players = 1;
    var num_balls = 3;
    var free_score = 50000;
    var cust = false; //for customize button
    var coins = 0;
                     
    $(".easy").click(function(){gravity = 300; tilt_sensitivity = 60; free_score = 20000;});
    $(".medium").click(function(){gravity = 400; tilt_sensitivity = 30; free_score = 50000;});
    $(".hard").click(function(){gravity = 500; tilt_sensitivity = 20; free_score = 75000;});
    
    $(".one").click(function(){num_players = 1 });
    $(".two").click(function(){num_players = 2 });
    $(".three").click(function(){num_players = 3 });
    $(".four").click(function(){num_players = 4 }); 
    
    $(".cust").click(function(){
        $("form").html('<div class="form-group"><label>Gravity:</label><input type="number" value="400" class="form-control" id="gravity"></div><div class="form-group"><label>Tilt Sensitivity:</label><input type="number" class="form-control" id="tilt" value="30"></div><div class="form-group"><label>Number of balls per player:</label><input type="number" class="form-control" value="3" min="1" max="5" id="num_balls"></div><div class="form-group"><label>Free score:</label><input type="number" class="form-control" value="50000" min="1" id="free_score"></div>');
        cust = true;
    });
    
    $("#coin").click(function(){
        coins += 1;
        $('kbd').text(coins);
    });
    
    $('.instruction').click(function(){
        document.getElementById("overlay").style.display = "block";
    });
    
    $('#overlay').click(function(){
        document.getElementById("overlay").style.display = "none";
    });

    $("#play").click(function(){
        //each coin for 1 player
        //therfore, if coins inserted is less than number of players selected,
        //number of players is then the same as coins inserted
        if(coins < num_players){
            num_players = coins;
            coins = 0;
        }
        else{
            coins -= num_players;
        }
        
        if(cust == true){
            gravity = $("#gravity").val();
            tilt_sensitivity = $("#tilt").val();
            num_balls = $("#num_balls").val();
            free_score = $("#free_score").val();
        }
        localStorage.setItem('gravity',gravity);
        localStorage.setItem('tilt_sensitivity',tilt_sensitivity);
        localStorage.setItem('num_balls',num_balls);
        localStorage.setItem('free_score',free_score);
        localStorage.setItem('num_players',num_players);
        localStorage.setItem('coins',coins);
        
        window.location.href='index.html';
             }); 
    
    
});