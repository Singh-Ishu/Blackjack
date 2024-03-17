let dealerCards=[]
let dealerSum=0
let playerCards=[]
let playerSum=0
let playingDeck=['HA','H2','H3','H4','H5','H6','H7','H8','H9','H10','HK','HQ','HJ','DA','D2','D3','D4','H5','D6','D7','D8','D9','D10','DK','DQ','DJ','SA','S2','S3','S4','S5','S6','S7','S8','S9','S10','SK','SQ','SJ','CA','C2','C3','C4','C5','C6','C7','C8','C9','C10','CK','CQ','CJ']
let isAlive=true
//Gives one card to any deck of choice
function cardGiver(deck){
    let flag=0
    let n=0
    let chk=0
    while (flag===0){
        let cnt=0
        n=Math.floor(Math.random()*52)
        //Checking in playerCards
        while(cnt<(playerCards.length)){
            if(playerCards[cnt]===n){
                chk=1
            }
            cnt+=1
        }
        cnt=0
        //Checking in dealerCards only if not in playerCards
        if(chk===0){
            while(cnt<(dealerCards.length)){
                if(dealerCards[cnt]===n){
                    chk=1
                }
                cnt+=1
            }
        }
        if(chk!=1){
            deck.push(n)
            flag=1
        }
    }
}

//Places the ace cards at the end of the deck
/*The Error is that deck is composed of integers where as card needs to be a string
function cardSort(deck){
    let cardIndex=[]
    let newDeck=[]
    //finding the index of all ace cards
    for(let i=0;i<deck.length;i++){
        let cardLength=deck[i].length
        let card=deck[i]
        if(card.slice(1)==='A'){
            cardIndex.push(i)
        }
    }
    //Adding all non aces cards to newDeck
    for(let j=0;j<deck.length;j++){
        if(deck[j].slice(1)!='A'){
            newDeck.push(deck[j])
        }
    }
    //Adding all ace cards
    for(let i=0;i<cardIndex.length;i++){
        newDeck.push(deck[cardIndex[i]])
    }
    return newDeck
}*/

//Updates the values of playerSum and dealerSum
function Count(){
    let card=''
    let cardValue=0
    dealerSum=0
    for(let i=0;i<dealerCards.length;i++){
        card=dealerCards[i]
        card=playingDeck[card]
        card=card.slice(1,card.length)
        if(card==='A'){
            if(dealerSum<10){
                cardValue=11
            }
            else{
                cardValue=1
            }
        }
        else if((card==='K')||(card==='J')||(card==='Q')){
            cardValue=10
        }
        else{
            cardValue=Number(card)
        }
        dealerSum+=cardValue
    }

    playerSum=0
    for(let i=0;i<playerCards.length;i++){
        card=playerCards[i]
        card=playingDeck[card]
        card=card.slice(1,card.length)
        if(card==='A'){
            if(playerSum<10){
                cardValue=11
            }
            else{
                cardValue=1
            }
        }
        else if((card==='K')||(card==='J')||(card==='Q')){
            cardValue=10
        }
        else{
            cardValue=Number(card)
        }
        playerSum+=cardValue
    }   
}

//Returns the name of the image for any card given card name
function imageName(cardName){
    let sr='_of_'
    if(cardName.slice(0,1)==='S'){
        sr+='spades'
        if(cardName.slice(1,2)==='A'){
            sr='ace'+sr
        }
        else if(cardName.slice(1,2)==='K'){
            sr='king'+sr
        }
        else if(cardName.slice(1,2)==='Q'){
            sr='queen'+sr
        }
        else if(cardName.slice(1,2)==='J'){
            sr='jack'+sr
        }
        else{
            sr=cardName.slice(1,cardName.length)+sr
        }
    }
    else if(cardName.slice(0,1)==='H'){
        sr+='hearts'
        if(cardName.slice(1,2)==='A'){
            sr='ace'+sr
        }
        else if(cardName.slice(1,2)==='K'){
            sr='king'+sr
        }
        else if(cardName.slice(1,2)==='Q'){
            sr='queen'+sr
        }
        else if(cardName.slice(1,2)==='J'){
            sr='jack'+sr
        }
        else{
            sr=cardName.slice(1,cardName.length)+sr
        }
    }
    else if(cardName.slice(0,1)==='C'){
        sr+='clubs'
        if(cardName.slice(1,2)==='A'){
            sr='ace'+sr
        }
        else if(cardName.slice(1,2)==='K'){
            sr='king'+sr
        }
        else if(cardName.slice(1,2)==='Q'){
            sr='queen'+sr
        }
        else if(cardName.slice(1,2)==='J'){
            sr='jack'+sr
        }
        else{
            sr=cardName.slice(1,cardName.length)+sr
        }
    }
    else{
        sr+='diamonds'
        if(cardName.slice(1,2)==='A'){
            sr='ace'+sr
        }
        else if(cardName.slice(1,2)==='K'){
            sr='king'+sr
        }
        else if(cardName.slice(1,2)==='Q'){
            sr='queen'+sr
        }
        else if(cardName.slice(1,2)==='J'){
            sr='jack'+sr
        }
        else{
            sr=cardName.slice(1,cardName.length)+sr
        }
    }
    return(sr)
}

//Places the player's cards on the screen
function playerImage(){
    let divPlayerImage=document.getElementById('playerImg')
    while(divPlayerImage.firstChild) { 
        divPlayerImage.removeChild(divPlayerImage.firstChild); 
    } 
    for(let i=0;i<playerCards.length;i++){
        let curCard=playerCards[i]
        curCard=playingDeck[curCard]
        let imgSrc="assets/"
        imgSrc+=imageName(curCard)
        imgSrc+='.png'
        let x = document.createElement("IMG");
        x.setAttribute("src", imgSrc);
        document.getElementById("playerImg").appendChild(x);
    }
}

//Reveals both the dealer cards
function dealerImage(){
    let divDealerImage=document.getElementById('dealerImg')
    while(divDealerImage.firstChild) { 
        divDealerImage.removeChild(divDealerImage.firstChild); 
    } 
    for(let i=0;i<dealerCards.length;i++){
        let curCard=dealerCards[i]
        curCard=playingDeck[curCard]
        let imgSrc="assets/"
        imgSrc+=imageName(curCard)
        imgSrc+='.png'
        let x = document.createElement("IMG");
        x.setAttribute("src", imgSrc);
        document.getElementById("dealerImg").appendChild(x);
    }
}

//Remove All Cards from the screen
function cardClear(){
    let divPlayerImage=document.getElementById('playerImg')
    while(divPlayerImage.firstChild) { 
        divPlayerImage.removeChild(divPlayerImage.firstChild); 
    }
    let divDealerImage=document.getElementById('dealerImg')
    while(divDealerImage.firstChild) { 
        divDealerImage.removeChild(divDealerImage.firstChild); 
    }
    playerCards=[]
    dealerCards=[]
}

//Hit: gives player another card, places it on screen and if card value goes above 21 ends game
function Hit(){
    if(isAlive){
        cardGiver(playerCards)
        playerImage()
        Count()
        if (playerSum>=21){
            End()
        }
    }
}

//Stay: reveals dealerOne card, calculates end condtion
function Stay(){
    if (isAlive){
        dealerImage()
        playerImage()
        End()
    }
}

//End function
function End(){
    isAlive=false
    Count()
    document.getElementById("endMessage").style.display = "inline-block";
    if(playerSum>21){
        //Lose
        document.getElementById("resultDeclaration").innerText="Your sum exceeds 21, you lose."
    }
    else if(playerSum<dealerSum){
        //Lose
        document.getElementById("resultDeclaration").innerText="Your sum is less than the dealer's, you lose."
    }
    else if(playerSum==dealerSum){
        //Tie
        document.getElementById("resultDeclaration").innerText="Your and Dealer's card values are equal, it's a tie."
    }
    else{
        if(playerSum==21){
            //BlackJack
            document.getElementById("resultDeclaration").innerText="BLACKJACK!!!\nCongratulations"
        }
        else{
            //Win
            document.getElementById("resultDeclaration").innerText="Your sum is higher than the dealer's, you win."
        }
    }
}

//Start functions
function startGame(){
    isAlive=true
    document.getElementById("game").style.display = "block";
    document.getElementById("intro").style.display = "none";
    document.getElementById("endMessage").style.display = "none";
    cardClear()
    cardGiver(dealerCards)
    cardGiver(playerCards)
    cardGiver(dealerCards)
    cardGiver(playerCards)
    playerImage()
    //Putting Dealer Cards on the table as well
    let divDealerImage=document.getElementById('dealerImg')
    while(divDealerImage.firstChild) { 
        divDealerImage.removeChild(divDealerImage.firstChild); 
    } 
    for(let i=0;i<dealerCards.length;i++){
        if(i==0){
            let imgSrc="assets/Back.png"
            let x =document.createElement("IMG");
            x.setAttribute("src",imgSrc);
            document.getElementById("dealerImg").appendChild(x)
        }
        else{
            let curCard=dealerCards[i]
            curCard=playingDeck[curCard]
            let imgSrc="assets/"
            imgSrc+=imageName(curCard)
            imgSrc+='.png'
            let x = document.createElement("IMG");
            x.setAttribute("src", imgSrc);
            document.getElementById("dealerImg").appendChild(x);
        }
    }
}

//Home function: Clear out all lists and cards, hide blocks that are not required
function goHome(){
    cardClear()
    document.getElementById("intro").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("endMessage").style.display = "none";
}