class UserData {
    constructor(_userId, _userPw, _userName, _date, _profileImg) {
        this.userId = _userId;
        this.userPw = _userPw;
        this.userName = _userName;
        this.date = _date;
        this.profileImg = _profileImg;
    }
}
class UserDataManager {
    constructor() {
        this.userList = [];
    }
    init(LocalStorage) {
        if (LocalStorage === null) {
            localStorage.setItem("sign_request", JSON.stringify(this.userList));
        }
        else {
            this.userList = JSON.parse(LocalStorage);
        }
    }
    save() {
        if (localStorage.getItem("sign_data") === null) {
            const admin = new UserData("a", "1", "admin", "0", "");
            console.log(admin);
            localStorage.setItem("sign_data", JSON.stringify([admin]));
        }
        else
            this.init(localStorage.getItem("sign_request"));
        const id_finder = document.getElementById("id_text");
        const pw_finder = document.getElementById("pw_text");
        const pw_finder2 = document.getElementById("pw_check");
        const name_finder = document.getElementById("name_text");
        const id_dbl = document.getElementById("id_check");
        const name_dbl = document.getElementById("name_check");
        id_dbl.onclick = () => {
            const userdata = JSON.parse(localStorage.getItem("sign_data"));
            if ((idLength(id_finder.value)) && (onlyNumberAndEnglish(id_finder.value))) {
                let text = "안녕";
                let classList = "클래스리스트";
                for (let i = 0; i < userdata.length; i++) {
                    if (userdata[i].userId === id_finder.value) {
                        text = "이미 사용중인 아이디입니다";
                        classList = "id_impossible";
                        break;
                    }
                    else {
                        text = "사용 가능한 아이디입니다";
                        classList = "id_possible";
                    }
                }
                const success = document.getElementById("id_repeat");
                success.innerText = text;
                success.classList.add(classList);
                const finder = document.querySelector(".id-box");
                finder.append(success);
            }
            else {
                alert("아이디를 규칙에 맞게 다시 입력해주세요");
            }
        };
        pw_finder.onkeyup = (e) => {
            if (document.querySelector(".passwordtest") !== null) {
                document.querySelector(".passwordtest").remove();
            }
            let text = "";
            const target = e.target;
            if (target.value === pw_finder2.value) {
                text = "비밀번호가 일치합니다.";
                target.style.borderColor = "green";
                pw_finder2.style.borderColor = "green";
            }
            else {
                text = "비밀번호를 다시 확인해주세요.";
                target.style.borderColor = "red";
                pw_finder2.style.borderColor = "red";
            }
            const passwordBox = document.querySelector(".password-box");
            const passwordSmallText = document.createElement("span");
            if (text === "비밀번호가 일치합니다.") {
                passwordSmallText.style.color = "green";
            }
            else if (text === "비밀번호를 다시 확인해주세요.") {
                passwordSmallText.style.color = "red";
            }
            passwordSmallText.classList.add("passwordtest");
            passwordSmallText.innerHTML = `${text}`;
            passwordBox.append(passwordSmallText);
        };
        pw_finder2.onkeyup = (e) => {
            const target = e.target;
            console.log(document.querySelector(".passwordtest"));
            if (document.querySelector(".passwordtest") !== null) {
                document.querySelector(".passwordtest").remove();
            }
            let text = "";
            if (target.value === pw_finder.value) {
                text = "비밀번호가 일치합니다.";
                target.style.borderColor = "green";
                pw_finder.style.borderColor = "green";
            }
            else {
                text = "비밀번호를 다시 확인해주세요.";
                target.style.borderColor = "red";
                pw_finder.style.borderColor = "red";
            }
            const passwordBox = document.querySelector(".password-box");
            const passwordSmallText = document.createElement("span");
            if (text === "비밀번호가 일치합니다.") {
                passwordSmallText.style.color = "green";
            }
            else if (text === "비밀번호를 다시 확인해주세요.") {
                passwordSmallText.style.color = "red";
            }
            passwordSmallText.classList.add("passwordtest");
            passwordSmallText.innerHTML = `${text}`;
            passwordBox.append(passwordSmallText);
        };
        name_dbl.onclick = () => {
            const userdata = JSON.parse(localStorage.getItem("sign_data"));
            let text = "안녕";
            let classList = "바보야";
            for (let i = 0; i < userdata.length; i++) {
                if (userdata[i].userName === name_finder.value) {
                    text = "이미 사용중인 닉네임입니다";
                    classList = "name_impossible";
                    break;
                }
                else {
                    text = "사용 가능한 닉네임입니다";
                    classList = "name_possible";
                }
            }
            const success = document.getElementById("name_repeat");
            success.innerText = text;
            success.classList.add(classList);
            const finder = document.querySelector(".name-box");
            finder.append(success);
            const clear_btn = document.getElementById("clear_btn");
            clear_btn.onclick = () => {
                const find = document.querySelector(".id_possible");
                const find2 = document.querySelector(".name_possible");
                if (pw_finder.value !== pw_finder2.value) {
                    alert("비밀번호가 일치하지 않습니다");
                    return;
                }
                if (!strongPassword(pw_finder.value)) {
                    alert("비밀번호를 규칙에 맞게 다시 입력해주세요");
                    return;
                }
                if ((pw_finder.value === pw_finder2.value) && (idLength(id_finder.value)) && (onlyNumberAndEnglish(id_finder.value)) && (strongPassword(pw_finder.value)) && (find.innerHTML === "사용 가능한 아이디입니다") && (find2.innerHTML === "사용 가능한 닉네임입니다")) {
                    console.log(1);
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    const newData = new UserData(id_finder.value, pw_finder.value, name_finder.value, `${year}` + `-` + `${month + 1}` + `-` + `${day}`, "http://127.0.0.1:5500/src/img/mypageIcon.png");
                    this.userList.push(newData);
                    localStorage.setItem("sign_request", JSON.stringify(this.userList));
                    alert("회원가입 성공");
                    location.href = "./main.html";
                }
            };
        };
    }
}
function idLength(value) {
    return value.length >= 4 && value.length <= 12;
}
function onlyNumberAndEnglish(str) {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}
function strongPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
const userDataManager = new UserDataManager();
userDataManager.save();
const loginStatus2 = sessionStorage.getItem("login_status");
const gameMove2 = document.getElementById("game-move");
gameMove2.onclick = () => {
    if (loginStatus2) {
        location.href = "./donutgame.html";
    }
    else {
        alert("로그인이 필요합니다.");
    }
};
