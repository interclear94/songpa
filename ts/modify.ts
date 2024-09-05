class ModifyManager {
    boardDataList: WriteData[]
    constructor() {
        this.boardDataList = []
    }

    // // 로컬스토리지 값이 없을때 빈배열, 있으면 가져옴
    // getLocalStorage(a) {
    //     if (a === null) {
    //         localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
    //     } else {
    //         this.boardDataList = JSON.parse(a);
    //     }
    // }

    render() {
        const param = new URLSearchParams(location.search).get("index");

        const localdata = JSON.parse(localStorage.getItem("board_data"))[param]
        const detail_no = localdata.no;
        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;
        const detail_count = localdata.count;

        const title = <HTMLInputElement>document.querySelector("#title");
        const userName = <HTMLElement>document.querySelector(".writer");
        const date = <HTMLElement>document.querySelector(".date");
        const content = <HTMLInputElement>document.querySelector("#content");

        const btnBoard = <HTMLElement>document.querySelector("#btn_board");
        const btnCancel = <HTMLElement>document.querySelector("#btn_cancel");
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm");

        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;

        // 목록으로 버튼
        btnBoard.onclick = () => {
            location.href = "./board.html?index=1&search=";
        }

        // 취소하기 버튼
        btnCancel.onclick = () => {
            location.href = "./detail.html?index=" + param;
        }

        // 수정완료 버튼
        btnConfirm.onclick = () => {
            if (confirm("수정하시겠습니까? 작성중인 내용이 저장됩니다.")) {
                const modifiedData = {
                    no: detail_no,
                    userName: detail_userName,
                    title: title.value,
                    content: content.value,
                    date: detail_date,
                    count: detail_count
                }
                const modifyItem = JSON.parse(localStorage.getItem("board_data"))
                modifyItem.splice(param, 1, modifiedData)
                localStorage.setItem("board_data", JSON.stringify(modifyItem))
                location.href = "./detail.html?index=" + param;
            } else {
                return;
            }
        }
    }
}

const modifyBoard = new ModifyManager
modifyBoard.render();