import { isJSDocEnumTag, transform } from "../node_modules/typescript/lib/typescript";

class JumpGame {
    userName: string;
    score: number;
    renewDate: string;
    constructor(nickName: string, _score: number, _renewDate: string) {
        this.userName = nickName,
            this.score = _score,
            this.renewDate = _renewDate
    }
}

class JumpGameManager {
    scoreList: JumpGame[];
    constructor() {
        this.scoreList = [];
    }

    init(storage) {
        if (storage === null) {
            localStorage.setItem("jump_score", JSON.stringify(this.scoreList));
        } else {
            this.scoreList = JSON.parse(storage);
        }
    }

    gameOver() {
        this.init(localStorage.getItem("jump_score"));
        const score = document.getElementById("score");
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("jump_score"));
        const date = new Date();
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        if (parseInt(month) < 10) {
            month = "0" + month
        }

        let day = (date.getDate()).toString();
        if (parseInt(day) < 10) {
            day = "0" + day
        }
        let check = "아직";
        for (let i = 0; i < rankData.length; i++) {
            if ((userData.userName === rankData[i].userName) && (rankData[i].score < point)) {
                rankData[i].score = point;
                rankData[i].renewDate = `${year}-${month}-${day}`;
                check = "확인";
            } else if ((userData.userName === rankData[i].userName) && (rankData[i].score >= point)) {
                check = "아쉽";
            }
        }
        if (check === "확인") {
            localStorage.setItem("jump_score", JSON.stringify(rankData));
        } else if (check === "아쉽") {
            return;
        } else {
            const userScore = new JumpGame(userData.userName, point, `${year}-${month}-${day}`);
            this.scoreList.push(userScore);
            localStorage.setItem("jump_score", JSON.stringify(this.scoreList));
        }
    }
    // 랭킹 그려주기
    read() {
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        const rankData = JSON.parse(localStorage.getItem("jump_score"));
        rankData.sort();
        const rankContent = document.querySelector(".rank-content");
        const myRank = document.querySelector(".my-rank");
        let hi = "hi";
        for (let i = 0; i < 4; i++) {
            try {
                const box = document.createElement("div");
                box.className = "rankBox"
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
            } catch (e) {
                console.log(e)
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
        } else {
            const myBox = document.createElement("div");
            myBox.className = "myRankBox";
            const ranking = document.createElement("span")
            const me = document.createElement("span");
            const myScore = document.createElement("span");
            const myDate = document.createElement("span");
            ranking.innerHTML = "-";
            me.innerHTML = `${userData.userName}`;
            myScore.innerHTML = "---"
            myDate.innerHTML = "---"
            myBox.append(ranking, me, myScore, myDate);
            myRank.append(myBox);
        }
    }
}

const rankData = JSON.parse(localStorage.getItem("jump_score"));
if (rankData !== null) {
    const jumpGameManager = new JumpGameManager();
    jumpGameManager.read();
}


// 점수 선언
let point = 0;

const start_btn = document.getElementById("start");
const game_wrap = document.querySelector(".game-wrap")

// 시작 버튼
start_btn.onclick = () => {
    game_wrap.innerHTML = `<div class="game-box">
    <div id="back1"></div>
                <div id="back2"></div>
                <div id="back3"></div>
                <div id="back4"></div>
    <div class="game-header">
        <span id="current-score">0</span>
        <span id="score">0</span>
    </div>
    <div class="game-content">
            <img id="person" src="../src/img/png-transparent-computer-icons-person-others-miscellaneous-text-hand-thumbnail-removebg-preview.png" alt="">
        <table>
            <tr>
                <td id="1">1</td>
                <td id="2">2</td>
                <td id="3">3</td>
                <td id="4">4</td>
            </tr>
        </table>
        <div class="game-over-box">
                        <p>GAME OVER</p>
                    </div>
                    </div>
                    </div>
                    <div class="rank-box">
                <div class="rank-info">
                    <span>순위</span>
                    <span>닉네임</span>
                    <span>점수</span>
                    <span>갱신날짜</span>
                </div>
                <div class="rank-content rank"></div>
                <div class="my-rank rank"></div>
            </div>`
    move();
    if(JSON.parse(localStorage.getItem("jump_score")) !== null){
        const jumpScore = JSON.parse(localStorage.getItem("jump_score"));
        const userData = JSON.parse(sessionStorage.getItem("login_status"));
        for(let i = 0; i < jumpScore.length; i++){
            if(jumpScore[i].userName === userData.userName){
                const currentScore = document.getElementById("current-score");
                currentScore.innerHTML = `${jumpScore[i].score}`
            }
        }
    }
    setInterval(() => {
        // 시간 지나면 점수 오르게 + 게임오버시 점수 오르기 멈추기
        const gameOverBox = document.querySelector(".game-over-box") as HTMLDivElement;
        if(!gameOverBox.classList.contains("end")){
            const score = document.getElementById("score");
            point++;
            score.innerHTML = `${point}`;
        }

        // 배경화면 변경
        const back1 = document.getElementById("back1");
        const back2 = document.getElementById("back2");
        const back3 = document.getElementById("back3");
        const back4 = document.getElementById("back4");
        if(point < 1400){
            if((point % 700) === 0){
                back1.style.backgroundImage = "url(../src/img/sora2.jpg)";
                back2.style.backgroundImage = "url(../src/img/sora2.jpg)";
                back3.style.backgroundImage = "url(../src/img/chi2.jpg)";
                back4.style.backgroundImage = "url(../src/img/chi2.jpg)";
            }else if((point % 700) === 300){
                back1.style.backgroundImage = "url(../src/img/sora.jpg)";
                back2.style.backgroundImage = "url(../src/img/sora.jpg)";
                back3.style.backgroundImage = "url(../src/img/chi.jpg)";
                back4.style.backgroundImage = "url(../src/img/chi.jpg)";
            }
        }else if(point >= 1400){
            if((point % 700) === 0){
                back1.style.backgroundImage = "url(../src/img/sora2.jpg)";
                back2.style.backgroundImage = "url(../src/img/sora2.jpg)";
                back3.style.backgroundImage = "url(../src/img/chi2.jpg)";
                back4.style.backgroundImage = "url(../src/img/chi2.jpg)";
            }else if((point % 700) === 400){
                back1.style.backgroundImage = "url(../src/img/sora.jpg)";
                back2.style.backgroundImage = "url(../src/img/sora.jpg)";
                back3.style.backgroundImage = "url(../src/img/chi.jpg)";
                back4.style.backgroundImage = "url(../src/img/chi.jpg)";
            }
        }
    }, 100);
    
    let t = 0;
    for(let i = 0; i < 100; i++){
        setTimeout(() => {
            game();
        }, t);
        if(point < 1400){
            if(point < 700){
                t += 4000
            }else if((point % 700) === 0){
                t += 4000
            }else if((point % 700) === 300){
                t += 3000
            }
        }else if(point >= 1400){
            if((point % 700) === 0){
                t += 3000
            }else if((point % 700) === 400){
                t += 2500
            }
        }
    }
    if (rankData !== null) {
        const jumpGameManager = new JumpGameManager();
        jumpGameManager.read();
    }
}
                
// 게임 실행
function game() {
    All_random = Math.floor(Math.random() * 3);
    if(All_random === 3) All_random = 1;
    move();
    if(All_random === 1){
        createObstacle();
        const obastacle1 = document.querySelector(".obstacle1") as HTMLImageElement;
        obastacle1.style.display = "block";
        dead(obastacle1);
        remove(obastacle1 as HTMLImageElement)
    }else if(All_random === 2){
        createObstacle2();
        const obastacle2 = document.querySelector(".obstacle2") as HTMLImageElement;
        obastacle2.style.display = "block";
        dead(obastacle2);
        remove(obastacle2 as HTMLImageElement)
    }else if(All_random === 0){
        createObstacle3();
        const obastacle3 = document.querySelector(".obstacle3") as HTMLImageElement;
        obastacle3.style.display = "block";
        dead(obastacle3);
        remove(obastacle3 as HTMLImageElement)
    }
}


// 장애물 랜덤
let All_random = Math.floor(Math.random() * 3);
if(All_random === 3) All_random = 1;

// 장애물 애니메이션
let obsAni = [
    { transform: "translateX(0px)"},
    { transform: "translateX(-100px)"},
    { transform: "translateX(-200px)"},
    { transform: "translateX(-300px)"},
    { transform: "translateX(-400px)"},
    { transform: "translateX(-500px)"},
    { transform: "translateX(-600px)"},
    { transform: "translateX(-700px)"},
    { transform: "translateX(-800px)"},
    { transform: "translateX(-900px)"},
]

// 장애물1 만들기
function createObstacle(){
    if(All_random === 1){
        const person = document.getElementById("person");
        const score = document.getElementById("score");
        const obstacle1 = document.createElement("img");
        obstacle1.src = "../src/img/white.png";
        obstacle1.className = "obstacle1";
        if(point < 700){
            obstacle1.animate(obsAni, {
                delay: 0,
                duration: 4000,
                iterations: Infinity,
            });
        }else if(point < 1400){
            if((point % 700) >= 0){
                obstacle1.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: Infinity,
                });
            }else if(point % 700 >= 300){
                obstacle1.animate(obsAni, {
                    delay: 0,
                    duration: 4000,
                    iterations: 1,
                });
            }
        }else if(point >= 1400){
            if((point % 700) >= 0){
                obstacle1.animate(obsAni, {
                    delay: 0,
                    duration: 2000,
                    iterations: 1,
                });
            }else if(point % 700 >= 400){
                obstacle1.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: 1,
                });
            }
        }
        const line = document.getElementById("4");
        line.append(obstacle1);
    }
}

// 장애물2 만들기
function createObstacle2() {
    if(All_random === 2){
        const obstacle2 = document.createElement("img");
        obstacle2.src = "../src/img/pink.png";
        obstacle2.className = "obstacle2";
        if(point < 700){
            obstacle2.animate(obsAni, {
                delay: 0,
                duration: 4000,
                iterations: 1,
            });
        }else if(point < 1400){
            if((point % 700) >= 0){
                obstacle2.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: 1,
                });
            }else if(point % 700 >= 300){
                obstacle2.animate(obsAni, {
                    delay: 0,
                    duration: 4000,
                    iterations: 1,
                });
            }
        }else if(point >= 1400){
            if((point % 700) >= 0){
                obstacle2.animate(obsAni, {
                    delay: 0,
                    duration: 2500,
                    iterations: 1,
                });
            }else if(point % 700 >= 400){
                obstacle2.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: 1,
                });
            }
        }
        const line = document.getElementById("3");
        line.append(obstacle2);
    }
}

// 장애물3 만들기
function createObstacle3(){
    if(All_random === 0){
        const obstacle3 = document.createElement("img");
        obstacle3.src = "../src/img/m int.png";
        obstacle3.className = "obstacle3";
        if(point < 700){
            obstacle3.animate(obsAni, {
                delay: 0,
                duration: 4000,
                iterations: 1,
            });
        }else if(point < 1400){
            if((point % 700) >= 0){
                obstacle3.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: 1,
                });
            }else if(point % 700 >= 300){
                obstacle3.animate(obsAni, {
                    delay: 0,
                    duration: 4000,
                    iterations: 1,
                });
            }
        }else if(point >= 1400){
            if((point % 700) >= 0){
                obstacle3.animate(obsAni, {
                    delay: 0,
                    duration: 2500,
                    iterations: 1,
                });
            }else if(point % 700 >= 400){
                obstacle3.animate(obsAni, {
                    delay: 0,
                    duration: 3000,
                    iterations: 1,
                });
            }
        }
        let random = Math.floor(Math.random() * 2);
        if(random === 2) random = 1;
        if(random === 0){
            const line = document.getElementById("2");
            line.append(obstacle3);
        }else if(random === 1){
            const line = document.getElementById("4");
            line.append(obstacle3);
        }
    }
}

// 점프 애니메이션
let animation = [
    { transform: "translateY(0)" },
    { transform: "translateY(-100px)" },
    { transform: "translateY(0)" },
]
let animation2 = [
    { transform: "translateY(0)" },
    { transform: "translateY(-200px)" },
    { transform: "translateY(0)" },
]

// 키가 눌린시간이랑 뗀 시간 계산하기 위해 변수 선언
let date = 0;
let date1 = 1;
let date2 = 0;
let date3 = 1;

// 플레이어 조종 space바, 방향키
function move() {
    const gameBox = document.querySelector(".game-box");
    const person = <HTMLImageElement>document.getElementById("person");

    // 스페이스바, 방향키 누를 때
    document.addEventListener("keydown", (e) => {
        switch (e.key) {

            // 스페이스바 (점프)
            case " ":
                date1 = new Date().getTime();
                date = new Date().getTime();
                break;

            case "ArrowUp":
                break;

            // 방향키 아래 (슬라이딩)
            case "ArrowDown":
            person.src = "../src/img/png-transparent-computer-icons-person-others-miscellaneous-text-hand-thumbnail-removebg-preview 복사본.png";
            person.style.top = `${300 + 20}px`;
        }
        e.stopImmediatePropagation();
    });

    // 스페이스바, 방향키 땔 때
    document.addEventListener("keyup", (e) => {
        switch (e.key) {

            // 누른 시간에 따라 점프 길고 짧음
            case " ":
                date2 = new Date().getTime();
                console.log(date2 - date);
                if ((date2) - (date) <= 100 && (date2) - (date) > 85 || (date2) - (date) < 80) {
                    person.animate(animation, {
                        delay: 0,
                        duration: 1000,
                        fill: "forwards"
                    });
                }
                else if ((date2) - (date) > 100) {
                    person.animate(animation2, {
                        delay: 0,
                        duration: 1000,
                        fill: "forwards"
                    });
                }
                else if ((date2 - date) >= 80 && (date2 - date) <= 85) {
                    person.animate(animation, {
                        delay: 0,
                        duration: 1000,
                        fill: "forwards"
                    });
                }
                break;

            // 방향키 아래 땔 때
            case "ArrowDown":
                console.log(e.key);
                person.src = "../src/img/png-transparent-computer-icons-person-others-miscellaneous-text-hand-thumbnail-removebg-preview.png";
                person.style.top = `${300}px`;
        }
        e.stopImmediatePropagation();
    }); 
}

// 맞으면 죽는 기능
function dead(img) {
    const person = document.getElementById("person");
    const gameOverBox = document.querySelector(".game-over-box") as HTMLDivElement;
    setInterval(()=>{
        if((img.getBoundingClientRect().top < person.getBoundingClientRect().bottom) && (img.getBoundingClientRect().bottom > person.getBoundingClientRect().top) && (img.getBoundingClientRect().left < person.getBoundingClientRect().right) && (img.getBoundingClientRect().right > person.getBoundingClientRect().left)){
            gameOverBox.style.display = "flex";
            gameOverBox.classList.add("end");
            const jumpGameManager = new JumpGameManager();
            jumpGameManager.gameOver();
        }
    }, 200);
}

// 장애물 사라지게
function remove (s: HTMLImageElement) {
    const person = document.getElementById("person");
    setInterval(() => {
        if((s.getBoundingClientRect().right - 5) < person.getBoundingClientRect().left + 20){
            s.remove();
        }
    })
}