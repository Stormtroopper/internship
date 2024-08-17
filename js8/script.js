let randomNum = Math.floor(Math.random() * 6) + 1
let randomNum2 = Math.floor(Math.random() * 6) + 1
let h1Content=document.querySelector('.text-center')
let imgTag = document.querySelectorAll('img')[0]
let imgTag2 = document.querySelectorAll('img')[1]
console.log(randomNum);

    document.body.addEventListener('click',(e)=>{
        e.preventDefault();
        let randomDiceImg2 = "images/" + "dice" + randomNum2 + '.png'
        let randomDiceImg = "images/" + "dice" + randomNum + '.png'
        imgTag2.setAttribute('src', randomDiceImg2)
        imgTag.setAttribute('src', randomDiceImg)
    
        if(randomNum>randomNum2){
        h1Content.innerText='Player 1 won the game !!!'
        }else if(randomNum<randomNum2){
            h1Content.innerText='Player 2 won the game!!!'
            
        }else{
            h1Content.innerText='Its a draw !!!'
        
        }
    
    })
