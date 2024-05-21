class DetailRenderManager {
    boardDataList: WriteData[]
    sessionData: any
    replyReplyData: any
    constructor() {
        this.boardDataList = []
        this.sessionData = {}
        this.replyReplyData = []
    }

    // // 로컬스토리지 값이 없을때 빈배열, 있으면 가져옴
    // getLocalStorage(a) {
    //     if (a === null) {
    //         localStorage.setItem("board_data", JSON.stringify(this.boardDataList));
    //     } else {
    //         this.boardDataList = JSON.parse(a);
    //     }
    // }

    // 세션스토리지 값이 없을때 빈객체
    getsessionStorage(a) {
        if (a === null) {
            sessionStorage.setItem("login_status", JSON.stringify(detailBoard.sessionData));
        }
    }

    // 댓글 배열 푸시후 댓글배열 로컬에 생성 
    setLocalStorage(a) {
        detailBoard.boardDataList.push(a);
        localStorage.setItem("reply_data", JSON.stringify(detailBoard.boardDataList))
    }

    getLocalStorage(a) {
        if (a === null) {
            localStorage.setItem("reply_data", JSON.stringify(detailBoard.boardDataList));
        } else {
            detailBoard.boardDataList = JSON.parse(a);
        }
    }

    // 대댓글 배열 푸시후 대댓글 배열 로컬에 생성
    setLocalStorageReplyReply(a) {
        detailBoard.replyReplyData.push(a);
        localStorage.setItem("replyreply_data", JSON.stringify(detailBoard.replyReplyData))
    }

    getLocalStorageReplyReply(a) {
        if (a === null) {
            localStorage.setItem("replyreply_data", JSON.stringify(detailBoard.replyReplyData));
        } else {
            detailBoard.replyReplyData = JSON.parse(a);
        }
    }

    render() {
        // this.getLocalStorage(localStorage.getItem("board_data"))

        this.getLocalStorage(localStorage.getItem("reply_data"));
        this.getLocalStorageReplyReply(localStorage.getItem("replyreply_data"));
        this.getsessionStorage(sessionStorage.getItem("login_status"));

        const param = new URLSearchParams(location.search).get("index");

        //조회수 만드는 페이지 
        let boardList: IBoard[] = JSON.parse(localStorage.getItem("board_data"))
        boardList.forEach(board => {
            if (param !== undefined) {
                if (board.no === parseInt(param)) {
                    board.count++
                    localStorage.setItem("board_data", JSON.stringify(boardList))
                }
            }
        });

        // 보드 데이터
        const localdata = JSON.parse(localStorage.getItem("board_data"))[param];

        const detail_title = localdata.title;
        const detail_userName = localdata.userName;
        const detail_date = localdata.date;
        const detail_content = localdata.content;

        const title = <HTMLElement>document.querySelector("#title");
        const userName = <HTMLElement>document.querySelector(".writer");
        const date = <HTMLElement>document.querySelector(".date");
        const content = <HTMLElement>document.querySelector("#content");

        const reply = <HTMLInputElement>document.querySelector("#reply");

        const btnDelete = <HTMLElement>document.querySelector("#btn_delete");
        const btnBoard = <HTMLElement>document.querySelector("#btn_board");
        const btnConfirm = <HTMLElement>document.querySelector("#btn_confirm");
        const btnReply = <HTMLElement>document.querySelector("#btn_reply");

        title.innerHTML = detail_title;
        userName.innerHTML = detail_userName;
        date.innerHTML = detail_date;
        content.innerHTML = detail_content;

        // 내 이름과 일치하지않고 관리자 이름도 아닐 경우 댓글 수정삭제 버튼 비활성화
        if ((detail_userName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
            const btnBox = <HTMLElement>document.querySelector(".btnright")
            btnBox.outerHTML = "";
        }

        // 댓글 데이터
        for (let i = 0; i < (JSON.parse(localStorage.getItem("reply_data"))).length; i++) {
            if ((JSON.parse(localStorage.getItem("reply_data"))[i].replyindex) == param) {
                const localReplyData = JSON.parse(localStorage.getItem("reply_data"))[i];

                const detail_replyUserName = localReplyData.replyUserName;
                const detail_reply = localReplyData.reply;
                const detail_replydate = localReplyData.replydate;

                const replyList = <HTMLElement>document.querySelector("#replylist");

                const replyWriter = <HTMLElement>document.createElement("div");
                const replyDetail = <HTMLElement>document.createElement("div");
                const replyModify = <HTMLElement>document.createElement("button");
                const replyDelete = <HTMLElement>document.createElement("button");
                const replyReplyBtn = <HTMLElement>document.createElement("button");
                const replyDate = <HTMLElement>document.createElement("div");
                // 댓글 박스
                const replyContent = <HTMLElement>document.createElement("div");
                replyContent.classList.add("replycontentbox")
                // 대댓글 렌더박스
                const replyReplyList = <HTMLElement>document.createElement("div");
                replyReplyList.classList.add("replyreplylist")
                // 대댓글작성창 쓰기박스
                const replyReplyinput = <HTMLElement>document.createElement("div");

                replyWriter.innerHTML = detail_replyUserName;
                replyDetail.innerHTML = detail_reply;
                replyDate.innerHTML = detail_replydate;
                replyModify.innerHTML = "수정";
                replyDelete.innerHTML = "삭제";
                replyReplyBtn.innerHTML = "답글달기";
                replyContent.append(replyWriter, replyDetail, replyDate, replyModify, replyDelete, replyReplyBtn);
                replyList.append(replyContent, replyReplyList, replyReplyinput);

                // 내이름과 일치하지않고 관리자 이름도 아닐경우 비활성화
                if (detail_replyUserName !== (JSON.parse(sessionStorage.getItem("login_status"))).userName && "admin" !== (JSON.parse(sessionStorage.getItem("login_status"))).userName) {
                    replyModify.outerHTML = "";
                    replyDelete.outerHTML = "";
                }

                // 대댓글 렌더
                for (let x = 0; x < (JSON.parse(localStorage.getItem("replyreply_data"))).length; x++) {
                    if ((JSON.parse(localStorage.getItem("replyreply_data")))[x].replyreplyindex == i) {
                        const localReplyReplyData = JSON.parse(localStorage.getItem("replyreply_data"))[x];

                        const detail_replyReplyUserName = localReplyReplyData.replyUserName;
                        const detail_replyreply = localReplyReplyData.reply;
                        const detail_replyreplydate = localReplyReplyData.replydate;

                        const replyReplyWriter = <HTMLElement>document.createElement("div");
                        const replyReplyDetail = <HTMLElement>document.createElement("div");
                        const replyReplyDate = <HTMLElement>document.createElement("div");
                        const replyReplyContent = <HTMLElement>document.createElement("div");
                        replyReplyContent.classList.add("replyreplycontent");

                        const replyReplyModify = <HTMLElement>document.createElement("button");
                        const replyReplyDelete = <HTMLElement>document.createElement("button");

                        replyReplyWriter.innerHTML = detail_replyReplyUserName;
                        replyReplyDetail.innerHTML = detail_replyreply;
                        replyReplyDate.innerHTML = detail_replyreplydate;
                        replyReplyModify.innerHTML = "수정";
                        replyReplyDelete.innerHTML = "삭제";
                        replyReplyContent.append(replyReplyWriter, replyReplyDetail, replyReplyDate, replyReplyModify, replyReplyDelete);
                        replyReplyList.append(replyReplyContent);


                        // 대댓글 수정버튼
                        replyReplyModify.onclick = () => {
                            const replyTextArea = <HTMLTextAreaElement>document.createElement("textarea");
                            replyReplyDetail.innerHTML = "";
                            replyReplyDetail.append(replyTextArea);
                            replyTextArea.innerHTML = detail_replyreply;
                            replyReplyModify.innerHTML = "수정완료";

                            replyReplyModify.onclick = () => {
                                replyReplyModify.innerHTML = "수정";
                                const modifiedReplyReply = {
                                    replyUserName: detail_replyReplyUserName,
                                    reply: replyTextArea.value,
                                    replydate: detail_replyreplydate,
                                    replyindex: param,
                                    replyreplyindex: i,
                                }
                                const modifyItemReply = JSON.parse(localStorage.getItem("replyreply_data"));
                                modifyItemReply.splice(x, 1, modifiedReplyReply);
                                localStorage.setItem("replyreply_data", JSON.stringify(modifyItemReply))
                                location.reload();
                            }
                        }

                        // 대댓글 삭제버튼
                        replyReplyDelete.onclick = () => {
                            if (confirm("대댓글을 삭제하시겠습니까?")) {
                                const modifyItemReply = JSON.parse(localStorage.getItem("replyreply_data"));
                                modifyItemReply.splice(x, 1);
                                localStorage.setItem("replyreply_data", JSON.stringify(modifyItemReply));
                                location.reload();
                            } else {
                                return;
                            }
                        }
                    }
                }


                // 대댓글작성창 띄우기 버튼
                replyReplyBtn.addEventListener("click", () => {
                    const replyReplyInput = <HTMLTextAreaElement>document.createElement("textarea");
                    const replyReplySubmit = <HTMLElement>document.createElement("button");
                    const replyReplyCancel = <HTMLElement>document.createElement("button");

                    replyReplyCancel.innerHTML = "취소";
                    replyReplySubmit.innerHTML = "작성";
                    replyReplyBtn.innerHTML = "";
                    replyReplyinput.append(replyReplyInput, replyReplyCancel, replyReplySubmit);

                    // 대댓글작성창 취소버튼
                    replyReplyCancel.onclick = () => {
                        replyReplyinput.innerHTML = "";
                        replyReplyBtn.innerHTML = "답글달기";
                    }

                    // 대댓글작성창 작성 버튼
                    replyReplySubmit.onclick = () => {
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
                        const replyReplyData = {
                            replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                            reply: replyReplyInput.value,
                            replydate: `${year}-${month}-${day}`,
                            replyindex: param,
                            replyreplyindex: i,
                        }
                        // 로컬스토리지로 저장
                        this.setLocalStorageReplyReply(replyReplyData);
                        location.reload();
                    }

                })

                // 댓글 수정 버튼
                replyModify.onclick = () => {
                    const textArea = <HTMLTextAreaElement>document.createElement("textarea");
                    textArea.classList.add("textarea")
                    replyDetail.innerHTML = "";
                    replyDetail.append(textArea);
                    textArea.innerHTML = detail_reply;
                    replyModify.innerHTML = "수정완료";

                    replyModify.onclick = () => {
                        replyModify.innerHTML = "수정";
                        const modifiedReply = {
                            replyUserName: detail_replyUserName,
                            reply: textArea.value,
                            replydate: detail_replydate,
                            replyindex: param
                        }
                        const modifyItem = JSON.parse(localStorage.getItem("reply_data"));
                        modifyItem.splice(i, 1, modifiedReply);
                        localStorage.setItem("reply_data", JSON.stringify(modifyItem));
                        location.reload();
                    }
                }

                // 댓글 삭제 버튼
                replyDelete.onclick = () => {
                    const deleteReply = JSON.parse(localStorage.getItem("reply_data"));
                    const originalReplyReply = JSON.parse(localStorage.getItem("replyreply_data"));
                    const deleteReplyReply = JSON.parse(localStorage.getItem("replyreply_data"));
                    if (confirm("댓글을 삭제하시겠습니까?")) {
                        deleteReply.splice(i, 1);
                        localStorage.setItem("reply_data", JSON.stringify(deleteReply));



                        for (let n = originalReplyReply.length - 1; n >= 0; n--) {
                            if ((originalReplyReply[n].replyreplyindex) == i && (originalReplyReply[n].replyindex) == param) {
                                deleteReplyReply.splice(n, 1)

                            }
                            else if ((deleteReplyReply[n].replyreplyindex) > i && (deleteReplyReply[n].replyindex) == param) {
                                deleteReplyReply[n].replyreplyindex = deleteReplyReply[n].replyreplyindex - 1
                            }

                        }

                        localStorage.setItem("replyreply_data", JSON.stringify(deleteReplyReply));



                        location.reload();
                    } else {
                        return;
                    }
                }
            }
        }

        // 목록으로 버튼
        btnBoard.onclick = () => {
            location.href = "./board.html?index=1&search=";
        }

        // 수정하기 버튼
        btnConfirm.onclick = () => {
            location.href = "./modify.html?index=" + param;
        }

        // 삭제 버튼
        btnDelete.onclick = () => {
            // 글 배열
            const deleteItem = JSON.parse(localStorage.getItem("board_data"));
            // 원본 댓글 배열
            const originalReply = JSON.parse(localStorage.getItem("reply_data"));
            // 가공할 댓글 배열
            const deleteReply = JSON.parse(localStorage.getItem("reply_data"));
            if (confirm("삭제하시겠습니까?")) {
                deleteItem.splice(param, 1)
                localStorage.setItem("board_data", JSON.stringify(deleteItem))
                for (let i = originalReply.length - 1; i >= 0; i--) {
                    if ((originalReply[i].replyindex) == param) {
                        deleteReply.splice(i, 1)
                    }
                }
                localStorage.setItem("reply_data", JSON.stringify(deleteReply))
                location.href = "./board.html?index=1&search=";
            } else {
                return;
            }
        }

        // 댓글 달기 버튼 회원이 아닐경우 댓 버튼 클릭시 얼러트, 빈 값 입력시 얼러트
        btnReply.onclick = () => {
            if (JSON.stringify(sessionStorage.getItem("login_status")) == `"{}"`) {
                alert("로그인을 해주세요!");
            } else if (reply.value === "") {
                alert("댓글을 입력해주세요!")
            } else {
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
                const replyData = {
                    replyUserName: (JSON.parse(sessionStorage.getItem("login_status"))).userName,
                    reply: reply.value,
                    replydate: `${year}-${month}-${day}`,
                    replyindex: param
                }
                // 로컬스토리지로 저장
                this.setLocalStorage(replyData);
                location.reload();
            }
        }
    }
}

const detailBoard = new DetailRenderManager
detailBoard.render();