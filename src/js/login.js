const signData = JSON.parse(localStorage.getItem("sign_data"));
const formbtn = document.querySelector("#login_form");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const loginPopupBtn = document.querySelector(".loginBtn");
const loginPop = document.querySelector(".login-popup");
const loginDeleteBtn = document.querySelector(".login-delete");
const body = document.querySelector("body");
loginPopupBtn.onclick = () => {
    loginPop.style.display = "block";
    body.style.overflow = "hidden";
};
loginDeleteBtn.onclick = () => {
    loginPop.style.display = "none";
    body.style.overflow = "visible";
};
function originState() {
    const login_status = JSON.parse(sessionStorage.getItem("login_status"));
    const userArea = document.querySelector(".user-area");
    const logoutList = document.createElement("li");
    logoutList.classList.add("click-cursor");
    const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
    const _span02 = document.querySelector(".user-area > li:nth-child(2)");
    if (login_status !== null && JSON.stringify(login_status) !== "{}") {
        _span01.innerHTML = `
    <img src="${login_status.profileImg}" alt="로고" style="border-radius:50%; margin-right:5px">
    ${login_status.userName} 님
    `;
        if (login_status.userId === signData[0].userId) {
            _span01.innerHTML = `
      <img src="data:image/png;base64,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" alt="로고" style="border-radius:50%; margin-right:5px">
      ${login_status.userName} 님
      `;
        }
        const _img = document.querySelector(".user-area > li > span > img");
        _img.style.width = "30px";
        _img.style.height = "30px";
        _span02.style.display = "none";
        logoutList.innerHTML = "Log-out";
        userArea.append(logoutList);
        logoutList.onclick = function () {
            const logoutQ = confirm("로그아웃을 하시겠습니까?");
            if (logoutQ) {
                sessionStorage.setItem("login_status", JSON.stringify({}));
                _span01.innerHTML = "Log-in";
                logoutList.innerHTML = "Log-out";
                logoutList.style.display = "none";
                _span02.style.display = "block";
                location.reload();
                _span01.classList.replace('loginX', 'loginBtn');
                _span01.onclick = function () {
                    loginPop.style.display = "block";
                    userId.value = "";
                    userPw.value = "";
                };
            }
        };
    }
}
function myPage() {
    const login_status = JSON.parse(sessionStorage.getItem("login_status"));
    if (login_status === null || JSON.stringify(login_status) !== "{}") {
        const _span01 = document.querySelector(".user-area > li:nth-child(1) > span");
        if (login_status.userId === signData[0].userId && login_status.userPw === signData[0].userPw) {
            _span01.onclick = function () {
                location.href = "admin.html";
            };
        }
        else {
            _span01.onclick = function () {
                location.href = "mypage.html";
            };
        }
    }
}
formbtn.onsubmit = function (e) {
    e.preventDefault();
    if (userId.value === "" || userPw.value === "") {
        alert("아이디 비밀번호를 입력해주세요");
        return;
    }
    let text = "";
    let _bool = false;
    for (let i = 0; i < signData.length; i++) {
        if (userId.value === signData[i].userId && userPw.value === signData[i].userPw) {
            const loginObj = signData[i];
            sessionStorage.setItem("login_status", JSON.stringify(loginObj));
            _bool = true;
            loginPop.style.display = "none";
            location.reload();
        }
    }
    text = _bool ? "로그인이 성공했습니다." : "아이디와 비밀번호를 확인해주세요.";
    alert(text);
};
const loginStatus4 = sessionStorage.getItem("login_status");
const gameMove4 = document.getElementById("game-move");
gameMove4.onclick = () => {
    if (loginStatus4 !== null && JSON.stringify(loginStatus4) !== '"{}"') {
        location.href = "./donutgame.html";
    }
    else {
        alert("로그인이 필요합니다.");
    }
};
const loginStatus = sessionStorage.getItem("login_status");
const gameMove = document.getElementById("game-move2");
gameMove.onclick = () => {
    if (loginStatus && loginStatus !== "{}") {
        location.href = "./jumpgame.html";
    }
    else {
        alert("로그인이 필요합니다.");
    }
};
originState();
myPage();
