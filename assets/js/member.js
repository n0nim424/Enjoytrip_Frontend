window.onload = function () {
  let tbody = document.querySelector("#userinfo");

  initTable();
  const keys = ["name", "id", "password", "email"];

  let users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < keys.length; j++) {
      let tmp = document.createElement("td");
      tmp.appendChild(document.createTextNode(users[i][`${keys[j]}`]));
      tr.appendChild(tmp);
    }

    let td = document.createElement("td");
    let modifybtn = document.createElement("button");
    modifybtn.setAttribute("type", "button");
    modifybtn.setAttribute("class", "btn btn-dark btn-sm me-1");
    modifybtn.setAttribute("onclick", "tddelete(" + i + ")");
    modifybtn.innerHTML = "수정";
    td.appendChild(modifybtn);

    let deletebtn = document.createElement("button");
    deletebtn.setAttribute("type", "button");
    deletebtn.setAttribute("class", "btn btn-dark btn-sm ms-1");
    deletebtn.setAttribute("onclick", "tddelete(" + i + ")");
    deletebtn.innerHTML = "삭제";
    td.appendChild(deletebtn);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
};

function initTable() {
  let tbody = document.querySelector("#userinfo");
  let len = tbody.rows.length;
  for (let i = len - 1; i >= 0; i--) {
    tbody.deleteRow(i);
  }
}

function tddelete(i) {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  delete users[i];
  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
}
