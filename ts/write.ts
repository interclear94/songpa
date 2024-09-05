// 작성받을 데이터
type WriteData = {
    title: string
    content: string
    date: string
    userName: string
    count: number
}

class WriteSaveManager {
    boardDataList: WriteData[]
    constructor() {
        this.boardDataList = []
    }

    // 로컬스토리지 값이 없을때 빈배열, 있으면 가져옴
    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("board_data", JSON.stringify(writeBoard.boardDataList));
        } else {
            writeBoard.boardDataList = JSON.parse(a);
        }
    }

    // 작성완료시 배열에 푸시후 배열을 로컬스토리지에 저장
    setLocalStorage(a) {
        writeBoard.boardDataList.push(a);
        localStorage.setItem("board_data", JSON.stringify(writeBoard.boardDataList))
    }


    save() {
        writeBoard.getLocalStorage(localStorage.getItem("board_data"))

        const title = <HTMLInputElement>document.querySelector("#title")
        const content = <HTMLInputElement>document.querySelector("#content")
        const btnBoard = <HTMLElement>document.querySelector("#btn_board")
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm")

        // 목록으로 버튼
        btnBoard.onclick = () => {
            if (confirm("글 작성을 취소하고 목록으로 돌아가시겠습니까? 작성중인 내용은 저장되지 않습니다.")) {
                location.href = "./board.html?index=1&search=";
            } else {
                return;
            }
        }

        // 작성완료 버튼
        btnConfirm.onclick = () => {
            const no = JSON.parse(localStorage.getItem("board_data")) ? JSON.parse(localStorage.getItem("board_data")).length : 0
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

            const count = 0
            const writeData = {
                no,
                userName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                title: title.value,
                content: content.value,
                date: `${year}-${month}-${day}`,
                count: count
            }
            if (confirm("작성을 완료하시겠습니까? 작성중인 내용이 저장됩니다.")) {
                this.setLocalStorage(writeData);
                location.href = "./board.html?index=1&search="
            } else {
                return;
            }
        }
    }
}

const writeBoard = new WriteSaveManager
writeBoard.save();