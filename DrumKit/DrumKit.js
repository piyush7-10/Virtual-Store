var drumButtons= document.querySelectorAll(".drum") ;
for (var i=0; i<drumButtons.length; i++)
{
    drumButtons[i].addEventListener("click", handleClick) ;

     

}

function handleClick()
{
    var buttonInnerHTML= this.innerHTML ;

    makeSound(buttonInnerHTML) ;
   buttonAnimation(buttonInnerHTML) ;

   
}

document.addEventListener("keydown", function(event){

     
    var keyboard_code= event.key; 
    
    makeSound(keyboard_code) ;
   buttonAnimation(keyboard_code) ;

})


function makeSound(key_pressed)
{

    switch(key_pressed)
    {
           case "w" :
            var audio= new Audio('sounds/tom-1.mp3') ;
           audio.play() ;
           break ;

            case "a" :
            var audio= new Audio('sounds/tom-2.mp3') ;
            audio.play() ;
            break ;
         
            case "s" :
            var audio= new Audio('sounds/tom-3.mp3') ;
            audio.play() ;
            break ;

            case "d" :
            var audio= new Audio('sounds/tom-4.mp3') ;
            audio.play() ;
            break ;

            case "j" :
            var audio= new Audio('sounds/snare.mp3') ;
            audio.play() ;
            break ;
            
            case "k" :
            var audio= new Audio('sounds/crash.mp3') ;
            audio.play() ;
            break ;


            case "l" :
            var audio= new Audio('sounds/kick-bass.mp3') ;
            audio.play() ;
            break ;
        
           default: console.log(key_pressed) ;
    }


}


function buttonAnimation(curr_key)
{

    var active_button= document.querySelector("."+ curr_key) ;
    active_button.classList.add("pressed") ;

    setTimeout(function(){
        active_button.classList.remove("pressed") ;
    }, 100) 
}