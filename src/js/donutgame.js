class DonutGame {
    constructor(nickName, _score, _renewDate) {
        this.userName = nickName,
            this.score = _score,
            this.renewDate = _renewDate;
    }
}
class DonutGameManager {
    constructor() {
        this.scoreList = [];
    }
    init(storage) {
        if (storage === null) {
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }
        else {
            this.scoreList = JSON.parse(storage);
        }
    }
    gameOver() {
        this.init(localStorage.getItem("donut_score"));
        const score = document.getElementById("score");
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("donut_score"));
        const date = new Date();
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        if (parseInt(month) < 10) {
            month = "0" + month;
        }
        let day = (date.getDate()).toString();
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        let check = "아직";
        for (let i = 0; i < rankData.length; i++) {
            if ((userData.userName === rankData[i].userName) && (rankData[i].score < point)) {
                rankData[i].score = point;
                rankData[i].renewDate = `${year}-${month}-${day}`;
                check = "확인";
            }
            else if ((userData.userName === rankData[i].userName) && (rankData[i].score >= point)) {
                check = "아쉽";
            }
        }
        if (check === "확인") {
            localStorage.setItem("donut_score", JSON.stringify(rankData));
        }
        else if (check === "아쉽") {
            return;
        }
        else {
            const userScore = new DonutGame(userData.userName, point, `${year}-${month}-${day}`);
            this.scoreList.push(userScore);
            localStorage.setItem("donut_score", JSON.stringify(this.scoreList));
        }
    }
    read() {
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("donut_score"));
        rankData.sort();
        const rankContent = document.querySelector(".rank-content");
        const myRank = document.querySelector(".my-rank");
        let hi = "hi";
        for (let i = 0; i < 4; i++) {
            try {
                const box = document.createElement("div");
                box.className = "rankBox";
                const ranking = document.createElement("span");
                const user = document.createElement("span");
                const score = document.createElement("span");
                const date = document.createElement("span");
                ranking.innerHTML = `${i + 1}`;
                user.innerHTML = `${rankData[i].userName}`;
                score.innerHTML = `${rankData[i].score}`;
                date.innerHTML = `${rankData[i].renewDate}`;
                box.append(ranking, user, score, date);
                rankContent.append(box);
            }
            catch (e) {
                console.log(e);
            }
        }
        for (let i = 0; i < rankData.length; i++) {
            if (rankData[i].userName === userData.userName) {
                hi = "정보 있음";
                const myBox = document.createElement("div");
                myBox.className = "myRankBox";
                const ranking = document.createElement("span");
                const me = document.createElement("span");
                const myScore = document.createElement("span");
                const myDate = document.createElement("span");
                ranking.innerHTML = `${i + 1}`;
                me.innerHTML = `${rankData[i].userName}`;
                myScore.innerHTML = `${rankData[i].score}`;
                myDate.innerHTML = `${rankData[i].renewDate}`;
                myBox.append(ranking, me, myScore, myDate);
                myRank.append(myBox);
            }
        }
        if (hi === "정보 있음") {
            return;
        }
        else {
            const myBox = document.createElement("div");
            myBox.className = "myRankBox";
            const ranking = document.createElement("span");
            const me = document.createElement("span");
            const myScore = document.createElement("span");
            const myDate = document.createElement("span");
            ranking.innerHTML = "-";
            me.innerHTML = `${userData.userName}`;
            myScore.innerHTML = "---";
            myDate.innerHTML = "---";
            myBox.append(ranking, me, myScore, myDate);
            myRank.append(myBox);
        }
    }
}
const rankData = JSON.parse(localStorage.getItem("donut_score"));
if (rankData !== null) {
    const donutGameManager = new DonutGameManager();
    donutGameManager.read();
}
const game_wrap = document.querySelector(".game-wrap");
const start_btn = document.getElementById("start");
start_btn.onclick = () => {
    game_wrap.innerHTML = `
<div class="game-box">
<div class="game-header">
    <span id="score">점수 : 0</span>
    <span id="heart">♥️♥️♥️</span>
</div>
<div class="game-slide">
    <table id="1"></table>
    <table id="2"></table>
    <table id="3"></table>
    <table id="4"></table>
    <table id="5"></table>
    <table id="6"></table>
    <table id="7"></table>
    <table id="8"></table>
    </div>
    </div>
    <div class="rank-box">
    <div class = "move-box">
        <img id="person" src="../src/img/food-basket-with-pixel-art-style_475147-662-removebg-preview.png" alt="">
    </div>
    <div class="rank-info">
        <span>순위</span>
        <span>닉네임</span>
        <span>점수</span>
        <span>갱신날짜</span>
    </div>
    <div class="rank-content rank"></div>
    <div class="my-rank rank"></div>
</div>`;
    if (rankData !== null) {
        const donutGameManager = new DonutGameManager();
        donutGameManager.read();
    }
    move();
    const heart = document.querySelector("#heart");
    let t = 0;
    for (let i = 0; i < 100; i++) {
        if (heart.innerHTML !== "") {
            setTimeout(() => {
                game();
                console.log(point);
            }, t);
            if (point < 2000) {
                t += 6100;
            }
            else if (point >= 2000) {
                t += 5300;
            }
            else if (point >= 4000) {
                t += 4200;
            }
        }
    }
};
function game() {
    const game_slide = document.querySelector(".game-slide");
    game_slide.innerHTML = `<table id="1"></table>
    <table id="2"></table>
    <table id="3"></table>
    <table id="4"></table>
    <table id="5"></table>
    <table id="6"></table>
    <table id="7"></table>
    <table id="8"></table>`;
    createDonut();
    createDonut2();
    createDonut3();
    restore();
    bomb();
    const donutImg = document.querySelector(".donutImg");
    const donutImg2 = document.querySelector(".donutImg2");
    const donutImg3 = document.querySelector(".donutImg3");
    life(donutImg);
    life(donutImg2);
    life(donutImg3);
    gotcha(donutImg);
    gotcha(donutImg2);
    gotcha(donutImg3);
}
let arr = [];
for (let i = 1; i < 9; i++) {
    arr.push(i);
}
function charge() {
    if (arr.length <= 6) {
        for (let i = 0; i < 8 - arr.length; i++) {
            const some1 = (element) => element === 1;
            const some2 = (element) => element === 2;
            const some3 = (element) => element === 3;
            const some4 = (element) => element === 4;
            const some5 = (element) => element === 5;
            const some6 = (element) => element === 6;
            const some7 = (element) => element === 7;
            const some8 = (element) => element === 8;
            if (!arr.some(some1)) {
                arr.push(1);
            }
            if (!arr.some(some2)) {
                arr.push(2);
            }
            if (!arr.some(some3)) {
                arr.push(3);
            }
            if (!arr.some(some4)) {
                arr.push(4);
            }
            if (!arr.some(some5)) {
                arr.push(5);
            }
            if (!arr.some(some6)) {
                arr.push(6);
            }
            if (!arr.some(some7)) {
                arr.push(7);
            }
            if (!arr.some(some8)) {
                arr.push(8);
            }
        }
    }
}
let point = 0;
let keyframes = [
    { opacity: 0, transform: "translateY(0)" },
    { opacity: 1, transform: "translateY(100px)" },
    { transform: "translateY(200px)" },
    { transform: "translateY(300px)" },
    { transform: "translateY(400px)" },
    { opacity: 1, transform: "translateY(500px)" },
];
function createDonut() {
    const score = document.querySelector("#score");
    let random = Math.floor(Math.random() * 8);
    if (random === 0)
        random = 1;
    const randomLine = document.getElementById(`${arr[random - 1]}`);
    arr.splice(random - 1, 1);
    console.log(arr);
    const donut = document.createElement("img");
    donut.className = "donutImg";
    if (point < 2000) {
        donut.animate(keyframes, {
            delay: 0,
            duration: 4000,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 2000) {
        donut.animate(keyframes, {
            delay: 0,
            duration: 2000,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 4000) {
        donut.animate(keyframes, {
            delay: 0,
            duration: 1000,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    donut.src = "../src/img/choco.png";
    randomLine.append(donut);
    charge();
}
function createDonut2() {
    const person = document.getElementById("person");
    const score = document.querySelector("#score");
    let random = Math.floor(Math.random() * 7);
    if (random === 0)
        random = 1;
    const randomLine = document.getElementById(`${arr[random - 1]}`);
    arr.splice(random - 1, 1);
    console.log(arr);
    const donut = document.createElement("img");
    donut.className = "donutImg2";
    if (point < 2000) {
        donut.animate(keyframes, {
            delay: 700,
            duration: 4700,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 2000) {
        donut.animate(keyframes, {
            delay: 1500,
            duration: 2600,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 4000) {
        donut.animate(keyframes, {
            delay: 1300,
            duration: 1200,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    donut.src = "../src/img/pink.png";
    randomLine.append(donut);
    charge();
}
function createDonut3() {
    const person = document.getElementById("person");
    const score = document.querySelector("#score");
    let random = Math.floor(Math.random() * 6);
    if (random === 0)
        random = 1;
    const randomLine = document.getElementById(`${arr[random - 1]}`);
    arr.splice(random - 1, 1);
    const donut = document.createElement("img");
    donut.className = "donutImg3";
    if (point < 2000) {
        donut.animate(keyframes, {
            delay: 1000,
            duration: 5000,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 2000) {
        donut.animate(keyframes, {
            delay: 1800,
            duration: 3000,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    else if (point >= 4000) {
        donut.animate(keyframes, {
            delay: 1700,
            duration: 1300,
            iterations: Infinity,
            fill: "forwards"
        });
    }
    donut.src = "../src/img/mint.png";
    randomLine.append(donut);
    charge();
}
function life(a) {
    const score = document.querySelector("#score");
    const heart = document.querySelector("#heart");
    const gameBox = document.querySelector(".game-box");
    const person = document.getElementById("person");
    setInterval(() => {
        if (a.getBoundingClientRect().bottom > person.getBoundingClientRect().bottom) {
            if (heart.innerHTML === "♥️♥️♥️") {
                a.remove();
                heart.innerHTML = "♥️♥️";
                return;
            }
            else if (heart.innerHTML === "♥️♥️") {
                a.remove();
                heart.innerHTML = "♥️";
                return;
            }
            else if (heart.innerHTML === "♥️") {
                heart.innerHTML = "";
                gameBox.className = "game-over-box";
                gameBox.innerHTML = `<div class="lastgamebox">
                <p class= "gameover1">GAME OVER</p>
                <p class = "score1">score : ${point}</p>
                </div>`;
                const donutGameManager = new DonutGameManager();
                donutGameManager.gameOver();
            }
        }
    }, 100);
}
function restore() {
    const score = document.getElementById("score");
    const heart = document.getElementById("heart");
    const random = Math.floor(Math.random() * 4);
    const person = document.getElementById("person");
    if (random === 3) {
        const mashi = document.createElement("img");
        mashi.src = "../src/img/heart.png";
        mashi.className = "restore";
        if (point < 2000) {
            mashi.animate(keyframes, {
                delay: 1000,
                duration: 3000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        else if (point >= 2000) {
            mashi.animate(keyframes, {
                delay: 1000,
                duration: 3000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        else if (point >= 4000) {
            mashi.animate(keyframes, {
                delay: 1000,
                duration: 2600,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        let random = Math.floor(Math.random() * 5);
        if (random === 0)
            random = 1;
        const randomLine = document.getElementById(`${arr[random - 1]}`);
        arr.splice(random - 1, 1);
        randomLine.append(mashi);
        charge();
        setInterval(() => {
            if ((mashi.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (mashi.getBoundingClientRect().left < person.getBoundingClientRect().right) && (mashi.getBoundingClientRect().right > person.getBoundingClientRect().left)) {
                mashi.remove();
                if (heart.innerHTML === "♥️") {
                    heart.innerHTML = "♥️♥️";
                    return;
                }
                else if (heart.innerHTML === "♥️♥️") {
                    heart.innerHTML = "♥️♥️♥️";
                    return;
                }
                else if (heart.innerHTML === "♥️♥️♥️") {
                    point += 500;
                    score.innerHTML = `${point}`;
                    console.log(point);
                }
                person.style.width = `${60 + (point / 100)}px`;
                person.style.height = `${60 + (point / 100)}px`;
            }
            fall(mashi);
        }, 200);
    }
}
function bomb() {
    const gameBox = document.querySelector(".game-box");
    const heart = document.getElementById("heart");
    const random = Math.floor(Math.random() * 5);
    const score = document.getElementById("score");
    if (random === 3) {
        const createBomb = document.createElement("img");
        createBomb.src = "../src/img/bomb.png";
        createBomb.className = "bomb";
        if (point < 2000) {
            createBomb.animate(keyframes, {
                delay: 200,
                duration: 6000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        else if (point >= 2000) {
            createBomb.animate(keyframes, {
                delay: 300,
                duration: 5000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        else if (point >= 4000) {
            createBomb.animate(keyframes, {
                delay: 300,
                duration: 3000,
                iterations: Infinity,
                fill: "forwards"
            });
        }
        let random = Math.floor(Math.random() * 4);
        if (random === 0)
            random = 1;
        const randomLine = document.getElementById(`${arr[random - 1]}`);
        randomLine.append(createBomb);
        charge();
        setInterval(() => {
            const person = document.getElementById("person");
            const score = document.getElementById("score");
            if ((createBomb.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (createBomb.getBoundingClientRect().left < person.getBoundingClientRect().right) && (createBomb.getBoundingClientRect().right > person.getBoundingClientRect().left)) {
                createBomb.remove();
                if (heart.innerHTML === "♥️♥️♥️") {
                    heart.innerHTML = "♥️♥️";
                }
                else if (heart.innerHTML === "♥️♥️") {
                    heart.innerHTML = "♥️";
                    return;
                }
                else if (heart.innerHTML === "♥️") {
                    heart.innerHTML = "";
                    gameBox.className = "game-over-box";
                    gameBox.innerHTML = `<div class="lastgamebox">
                <p class= "gameover1">GAME OVER</p>
                <p class = "score1">score : ${point}</p>
                </div>`;
                    const donutGameManager = new DonutGameManager();
                    donutGameManager.gameOver();
                }
            }
            fall(createBomb);
        }, 200);
    }
}
function fall(img) {
    const person = document.getElementById("person");
    setInterval(() => {
        if (img.getBoundingClientRect().bottom > person.getBoundingClientRect().bottom) {
            img.remove();
        }
    }, 200);
}
function move() {
    const person = document.getElementById("person");
    const gameBox = document.querySelector(".game-box");
    if (person !== null) {
        gameBox.addEventListener("mousemove", (e) => {
            person.style.left = `${e.clientX - 474}px`;
            gameBox.style.cursor = "none";
        });
    }
}
function gotcha(donut) {
    setInterval(() => {
        let person = document.getElementById("person");
        const moveBox = document.querySelector(".move-box");
        const score = document.getElementById("score");
        if ((donut.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (donut.getBoundingClientRect().left < person.getBoundingClientRect().right) && (donut.getBoundingClientRect().right > person.getBoundingClientRect().left)) {
            donut.remove();
            point += 100;
            score.innerHTML = `${point}`;
            console.log(point);
            person.style.width = `${60 + (point / 100)}px`;
            person.style.height = `${60 + (point / 100)}px`;
            moveBox.style.bottom = `${280 + 5}px`;
        }
    }, 200);
}