let computerResult = 0;
let playerResult = 0;
let cards = [...document.querySelectorAll('img + img')];
let playerCardPositionX = 40;
let computerCardPositionX = 40;
let zIndex = 1;
let nextCardDelay = 1000;

const totalResults = {
    computerWins: 0,
    playerWins: 0,
    draws: 0,
}

document.querySelector(".pc-wins span").textContent = totalResults.computerWins;
document.querySelector(".player-wins span").textContent = totalResults.playerWins;
document.querySelector(".total-draws span").textContent = totalResults.draws;

const startButton = document.querySelector('.start');
const hitButton = document.querySelector('.hit');
const standButton = document.querySelector('.stand');
const hiddenCard = document.querySelector('.hiddencard')

startButton.addEventListener("click", startGame);
hitButton.addEventListener("click", hitMe);
standButton.addEventListener("click", computerTurn);

document.querySelector(".computer").style.display = "none";
document.querySelector(".player").style.display = "none";

function startGame() {
    reset()
    setTimeout(twoCardsforPlayer, 500)
    buttonsManager()
    if (playerResult == 21 || playerResult == 22) {
        allButtonsOff();
    }

}

function twoCardsforPlayer() {
    for (let i = 0; i < 2; i++) {
        const CardIndex = Math.floor(Math.random() * cards.length);
        const playerCard = cards[CardIndex];
        playerResult += parseInt(cards[CardIndex].dataset.value);
        playerCard.classList.add('activeforplayer');
        playerCard.style.left = playerCardPositionX + "vw";
        playerCardPositionX += 2;
        playerCard.style.zIndex = zIndex;
        zIndex++;
        cards.splice(CardIndex, 1);
        document.querySelector(".player").style.display = "block";
        document.querySelector(".player").textContent = playerResult;
    }
    if (playerResult == 21) {
        oczko();
        allButtonsOff()


    } else if (playerResult == 22) {
        perskieOczko();
        allButtonsOff()

    } else if (playerResult > 21) {
        loss()

    }
}

function buttonsManager() {
    startButton.classList.add('inactive');
    hitButton.classList.add('active');
    standButton.classList.add('active');
}

function allButtonsOff() {
    startButton.classList.add('inactive');
    hitButton.classList.remove('active');
    standButton.classList.remove('active');
}

function oczko() {
    hitButton.classList.remove('active');
    standButton.classList.remove('active');
    startButton.classList.remove('inactive');
    document.querySelector('.oczko').style.display = "block";
    playerCardPositionX = 40;
    setTimeout(computerTurn, 1000);
}

function perskieOczko() {
    hitButton.classList.remove('active');
    standButton.classList.remove('active');
    startButton.classList.remove('inactive');
    document.querySelector('.perskieoczko').style.display = "block";
    playerCardPositionX = 40;
    setTimeout(computerTurn, 1000);
}

function loss() {
    hitButton.classList.remove('active');
    standButton.classList.remove('active');
    startButton.classList.remove('inactive');
    document.querySelector('.loss').style.display = "block";
    playerCardPositionX = 40;
    totalResults.computerWins++;
    document.querySelector(".pc-wins span").textContent = totalResults.computerWins;
}

function reset() {
    const resetCards = document.querySelectorAll('img + img');
    resetCards.forEach(e => {
        cards = [...document.querySelectorAll('img + img')];
        e.classList.remove('activeforplayer');
        e.classList.remove('activefordealer');
        e.style.left = 48 + "vw";
        e.style.zIndex = 1;
        computerResult = 0;
        document.querySelector(".computer").textContent = computerResult;
        document.querySelector(".computer").style.display = "none";
        playerResult = 0;
        document.querySelector(".oczko").style.display = 'none';
        document.querySelector(".perskieoczko").style.display = 'none';
        document.querySelector('.loss').style.display = 'none';
        document.querySelector('.draw').style.display = 'none';
        document.querySelector('.win').style.display = 'none';
        zIndex = 1;
        computerCardPositionX = 40;
        playerCardPositionX = 40;
        nextCardDelay = 1000;
    })
}

function hitMe() {
    if (playerResult < 21) {
        const CardIndex = Math.floor(Math.random() * cards.length);
        const playerCard = cards[CardIndex];
        playerResult += parseInt(cards[CardIndex].dataset.value);
        playerCard.classList.add('activeforplayer');
        playerCard.style.left = playerCardPositionX + "vw";
        playerCardPositionX += 2;
        playerCard.style.zIndex = zIndex;
        zIndex++;
        cards.splice(CardIndex, 1);
        document.querySelector(".player").textContent = playerResult;
        if (playerResult > 21) {
            loss()

        } else if (playerResult == 21) {
            oczko();
            allButtonsOff()
        }
    }
    setTimeout(gameOver, 1000);
}

function computerTurn() {
    allButtonsOff();
    for (let i = 0; i < 2; i++) {
        const CardIndex = Math.floor(Math.random() * cards.length);
        const computerCard = cards[CardIndex];
        computerResult += parseInt(cards[CardIndex].dataset.value);
        document.querySelector(".computer").textContent = computerResult;
        document.querySelector(".computer").style.display = "block";
        computerCard.classList.add('activefordealer');
        computerCard.style.left = computerCardPositionX + "vw";
        computerCardPositionX += 2;
        computerCard.style.zIndex = zIndex;
        zIndex++;
        cards.splice(CardIndex, 1);
        document.querySelector(".computer").textContent = computerResult;
        if ((computerResult == 22 && playerResult == 22) || (computerResult == 22 && playerResult == 21) || (document.querySelector('.perskieoczko').style.display == "block" && computerResult == 21)) {
            startButton.classList.remove('inactive');
            document.querySelector('.draw').style.display = "block";
            totalResults.draws++;
            document.querySelector(".total-draws span").textContent = totalResults.draws;
        } else if (computerCard.hasAttribute("11") && computerResult == 22 && playerResult < 21) {
            startButton.classList.remove('inactive');
            document.querySelector('.loss').style.display = "block";
            totalResults.computerWins++;
            document.querySelector(".pc-wins span").textContent = totalResults.computerWins;
        } else if (computerResult > playerResult && computerResult <= 21) {
            startButton.classList.remove('inactive');
            document.querySelector('.loss').style.display = "block";
            totalResults.computerWins++;
            document.querySelector(".pc-wins span").textContent = totalResults.computerWins;

        } else if (computerResult == 20 && playerResult == 20) {
            startButton.classList.remove('inactive');
            document.querySelector('.draw').style.display = "block";
            totalResults.draws++;
            document.querySelector(".total-draws span").textContent = totalResults.draws;

        }

    }
    setTimeout(nextCardForComputer, nextCardDelay);
    setTimeout(gameOver, 1000);

}

function nextCardForComputer() {
    for (let i = 0; i < 8; i++) {
        setTimeout(getNewCard, nextCardDelay);
        nextCardDelay += 1500;
    }

}

function getNewCard() {
    if (computerResult <= playerResult && computerResult < 20 && (playerResult <= 21 || document.querySelector('.perskieoczko').style.display == "block") && standButton.className != "stand active" && cards.length <= 48) {
        const CardIndex = Math.floor(Math.random() * cards.length);
        const computerCard = cards[CardIndex];
        computerResult += parseInt(cards[CardIndex].dataset.value);
        computerCard.classList.add('activefordealer');
        computerCard.style.left = computerCardPositionX + "vw";
        computerCardPositionX += 2;
        computerCard.style.zIndex = zIndex;
        zIndex++;
        cards.splice(CardIndex, 1);
        document.querySelector(".computer").textContent = computerResult;
        showResult()
        setTimeout(gameOver, 1000);
    }
}

function showResult() {
    if (computerResult > playerResult && computerResult <= 21) {
        startButton.classList.remove('inactive');
        document.querySelector('.loss').style.display = "block";
        totalResults.computerWins++;
        document.querySelector(".pc-wins span").textContent = totalResults.computerWins;

    } else if (computerResult == 22 && playerResult == 22 && document.querySelector('.perskieoczko').style.display == "block") {
        startButton.classList.remove('inactive');
        document.querySelector('.draw').style.display = "block";
        totalResults.draws++;
        document.querySelector(".total-draws span").textContent = totalResults.draws;

    } else if (computerResult == 21 && playerResult == 21) {
        startButton.classList.remove('inactive');
        document.querySelector('.draw').style.display = "block";
        totalResults.draws++;
        document.querySelector(".total-draws span").textContent = totalResults.draws;

    } else if (computerResult == 20 && playerResult == 20) {
        startButton.classList.remove('inactive');
        document.querySelector('.draw').style.display = "block";
        totalResults.draws++;
        document.querySelector(".total-draws span").textContent = totalResults.draws;

    } else if (computerResult > 21) {
        startButton.classList.remove('inactive');
        document.querySelector('.win').style.display = "block";
        totalResults.playerWins++;
        document.querySelector(".player-wins span").textContent = totalResults.playerWins;

    } else if (computerResult == 20 && playerResult == 21) {
        startButton.classList.remove('inactive');
        document.querySelector('.win').style.display = "block";
        totalResults.playerWins++;
        document.querySelector(".player-wins span").textContent = totalResults.playerWins;

    }


}

function gameOver() {
    if (totalResults.playerWins == 3) {
        alert("Zwycięstwo!");
        totalResults.computerWins = 0;
        totalResults.playerWins = 0;
        totalResults.draws = 0;
        document.querySelector(".pc-wins span").textContent = totalResults.computerWins;
        document.querySelector(".player-wins span").textContent = totalResults.playerWins;
        document.querySelector(".total-draws span").textContent = totalResults.draws;
        reset();
        document.querySelector(".player").textContent = "";
        document.querySelector(".player").style.display = "none";

    } else if (totalResults.computerWins == 3) {
        alert("Porażka!");
        totalResults.computerWins = 0;
        totalResults.playerWins = 0;
        totalResults.draws = 0;
        document.querySelector(".pc-wins span").textContent = totalResults.computerWins;
        document.querySelector(".player-wins span").textContent = totalResults.playerWins;
        document.querySelector(".total-draws span").textContent = totalResults.draws;
        reset();
        document.querySelector(".player").textContent = "";
        document.querySelector(".player").style.display = "none";
    }
}