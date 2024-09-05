


function paintBoard() {
  const param = new URLSearchParams(location.search).get("index");
  let str: any = location.search;
  str = str.replace("?", "");
  str = str.split("=");
  const boardData = JSON.parse(localStorage.getItem("board_data"));
  const boardList = document.querySelector("#boardList") as HTMLUListElement
  boardList.innerHTML = "";

  //
  localStorage.setItem("", JSON.stringify(this._boardList))
  const filter = boardData.filter((value) => value);
  console.log(filter);
  const arr = [];
  for (let i = 0; i < boardData.length; i += 5) {
    const num = i + 5;
    const page_arr = boardData.slice(i, num);
    arr.push(page_arr);
    console.log(page_arr);
  }
  console.log(arr);
  for (let i = 0; i < arr[param].length; i++) {
    const li = document.createElement("li")
    const span1 = document.createElement("span")
    const no = i + parseInt(param) * 5;
    span1.innerHTML = (no + 1) + "";
    const span2 = document.createElement("span")
    span2.innerHTML = arr[param][i].userName
    const span3 = document.createElement("span")
    span3.innerHTML = arr[param][i].title
    const span4 = document.createElement("span")
    span4.innerHTML = arr[param][i].date
    const span5 = document.createElement("span")
    span5.innerHTML = `${arr[param][i].count}`
    span3.dataset.index = `${i}`;
    span3.onclick = (e: any) => {
      const a = e.target.getAttribute("data-index");

      const c = (parseInt(param)) * 5;
      const d = c + i;
      console.log(d)
      console.log(e.target.classList)
      if (!span3.classList.contains("return")) {
        for (let i = 0; i < boardData.length; i++) {
          if ((boardData[i].title === e.target.innerHTML)) {
            location.href = "./detail.html?index=" + d;
          }
        }
      }
      for (let i = 0; i < boardData.length; i++) {
        if (boardData[i] === arr[param][i]) {
          boardData[i].count++;
          localStorage.setItem("board_data", JSON.stringify(boardData));

        }
      }
    }

    boardList.appendChild(li);
    li.append(span1, span2, span3, span4, span5);
  }
  for (let i = 0; i < arr.length; i++) {
    const num_finder = document.querySelector(".number-button")
    const num = document.createElement("span");
    num.classList.add("pages");
    const j = i + 1;
    num.innerHTML = `${j}`;
    num.onclick = () => {
      location.href = "./board.html?index=" + i;
    }
    num_finder.append(num);
  }

  const search = document.querySelector("#inputSearch") as HTMLInputElement
  const searchBtn = document.querySelector("#inputBtn") as HTMLInputElement

  searchBtn.onclick = () => {
    sessionStorage.setItem("data-num", `${0}`);
    const filter = boardData.filter((value) => value.title.includes(search.value));
    console.log(filter);
    const arr = [];
    for (let i = 0; i < filter.length; i += 5) {
      const num = i + 5;
      const page_arr = filter.slice(i, num);
      arr.push(page_arr);
    }
    console.log(arr);

    boardList.innerHTML = "";
    for (let i = 0; i < arr[param].length; i++) {
      const li = document.createElement("li")
      const span1 = document.createElement("span")
      const no = i + parseInt(param) * 5;
      span1.innerHTML = (no + 1) + "";
      const span2 = document.createElement("span")
      span2.innerHTML = arr[param][i].userName
      const span3 = document.createElement("span")
      span3.innerHTML = arr[param][i].title
      span3.classList.add(`return`);
      span3.dataset.search = `${i + 1}`
      const span4 = document.createElement("span")
      span4.innerHTML = arr[param][i].date
      const span5 = document.createElement("span")
      span5.innerHTML = `${arr[param][i].count}`
      boardList.appendChild(li);
      li.append(span1, span2, span3, span4, span5);
      span3.onclick = (e: any) => {
        const a = e.target.getAttribute("data-search");
        sessionStorage.setItem("index", `${a}`);
        console.log(a);
        const get = sessionStorage.getItem("data-num")
        const page_num = parseInt(get) + 1;
        console.log(page_num)
        const no = (page_num - 1) * 5
        const adress = no + parseInt(a);
        console.log(adress - 1)
        const c = (parseInt(param)) * 5;
        const d = c + i;
        // console.log(d)
        // console.log(e.target.classList)
        for (let i = 0; i < boardData.length; i++) {
          if ((boardData[i] === filter[adress - 1])) {
            location.href = "./detail.html?index=" + i;
          }
        }
        if (boardData[i] === arr[param][i]) {
          boardData[i].count++;
          localStorage.setItem("board_data", JSON.stringify(boardData));
        }
        for (let i = 0; i < arr.length; i++) {
          const find = document.querySelector(".number-button");
          if (i == 0) {
            find.innerHTML = "";
          }
          const num = <HTMLSpanElement>document.createElement("span");
          find.append(num);
          const j = i + 1;
          num.dataset.num = `${i}`
          num.innerHTML = `${j}`;
          num.onclick = (e: any) => {
            const a = e.target.getAttribute("data-num");
            sessionStorage.setItem("data-num", a);
            console.log(a)
            boardList.innerHTML = "";
            for (let i = 0; i < arr[a].length; i++) {
              const li = document.createElement("li")
              const span1 = document.createElement("span")
              const no = i + parseInt(a) * 5;
              span1.innerHTML = (no + 1) + "";
              const span2 = document.createElement("span")
              span2.innerHTML = arr[a][i].userName
              const span3 = document.createElement("span")
              span3.innerHTML = arr[a][i].title
              span3.classList.add(`return`);
              span3.dataset.search = `${i + 1}`;
              const span4 = document.createElement("span")
              span4.innerHTML = arr[a][i].date
              const span5 = document.createElement("span")
              span5.innerHTML = `${arr[a][i].count}`
              boardList.appendChild(li);
              li.append(span1, span2, span3, span4, span5);
              span3.onclick = (e: any) => {
                const a = e.target.getAttribute("data-search");
                sessionStorage.setItem("index", `${a}`);
                console.log(a);
                const get = sessionStorage.getItem("data-num")
                const page_num = parseInt(get) + 1;
                console.log(page_num)
                const no = (page_num - 1) * 5
                const adress = no + parseInt(a);
                console.log(adress - 1)
                const data = a * parseInt(get);
                // console.log(data)
                const c = (parseInt(param)) * 5;
                const d = c + i;
                // console.log(d)
                for (let i = 0; i < boardData.length; i++) {
                  if ((boardData[i] === filter[adress - 1])) {
                    location.href = "./detail.html?index=" + i;
                  }
                }
                if (boardData[i] === arr[param][i]) {
                  boardData[i].count++;
                  localStorage.setItem("board_data", JSON.stringify(boardData));
                }
                // location.href = "./board.html?index=" + i;

              }
            }
          }

        }

      }
    }
  }
}
paintBoard();
