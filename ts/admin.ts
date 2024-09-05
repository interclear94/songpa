class AdminPageManager {
    signList: UserData[];
    constructor() {
        this.signList = [];
    }

    init(LocalStorage) {
        if (LocalStorage === null) {
            localStorage.setItem("sign_data", JSON.stringify(this.signList));
        } else {
            this.signList = JSON.parse(LocalStorage);
        }
    }

    register() {
        const request = JSON.parse(localStorage.getItem("sign_request"));
        this.init(localStorage.getItem("sign_data"));
        const view = <HTMLElement>document.getElementById("content");
        view.innerHTML = `<div class="top"><span>아이디</span><span>닉네임</span><span>날짜</span><span>수락여부</span></div>`
        for (let i = 0; i < request.length; i++) {
            const div = document.createElement("div");
            div.className = "divContainer"
            const id_span = document.createElement("span");
            const name_span = document.createElement("span");
            const date_span = document.createElement("span");
            const btn_span = document.createElement("span");
            btn_span.className = "btn_span"
            const img1 = document.createElement("span");
            const img2 = document.createElement("span");
            id_span.innerHTML = request[i].userId;
            name_span.innerHTML = request[i].userName;
            date_span.innerHTML = request[i].date;
            img1.innerText = "✅";
            img2.innerHTML = "❌";
            btn_span.append(img1, img2);
            div.append(id_span, name_span, date_span, btn_span);
            view.append(div);
            img1.onclick = () => {
                this.signList.push(request[i]);
                localStorage.setItem("sign_data", JSON.stringify(this.signList));
                request.splice(i, 1);
                localStorage.setItem("sign_request", JSON.stringify(request));
                window.location.reload();
            }

            img2.onclick = () => {
                if (confirm("삭제?")) {
                    request.splice(i, 1);
                    localStorage.setItem("sign_request", JSON.stringify(request));
                    console.log(request);
                    window.location.reload();
                } else {
                    return;
                }
            }
        }
    }
    render() {
        const loginData = JSON.parse(localStorage.getItem("sign_data"));
        const box = document.getElementById("box");
        box.innerHTML = `<div class="sign-title-box">
        <span>아이디</span>
        <span>비밀번호</span>
        <span>닉네임</span>
        <span>생성날짜</span>
    </div>`
        for (let i = 1; i < loginData.length; i++) {
            const div = document.createElement("div");
            div.className = "divcontainer2"
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            const span3 = document.createElement("span");
            const span4 = document.createElement("span");
            span1.innerHTML = loginData[i].userId;
            span2.innerHTML = loginData[i].userPw;
            span3.innerHTML = loginData[i].userName;
            span4.innerHTML = loginData[i].date;
            div.append(span1, span2, span3, span4);
            box.append(div);
            console.log(1);
        }
    }
}

const adminPageManager = new AdminPageManager();
adminPageManager.register();
adminPageManager.render();

// 도넛 게임 이동
const loginStatus3 = sessionStorage.getItem("login_status");
const gameMove3 = document.getElementById("game-move");
gameMove3.onclick = () => {
    if (JSON.parse(loginStatus3) !== null || loginStatus3 !== "{}") {
        location.href = "./donutgame.html";
    } else {
        alert("로그인이 필요합니다.")
    }
}