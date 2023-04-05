let logincheck = JSON.parse(localStorage.getItem("login"));
let admincheck = JSON.parse(localStorage.getItem("admin"));

// 로그인 후
if (logincheck === true) {
  const beforeLogin = document.querySelectorAll("#beforelogin");
  beforeLogin.forEach((value) => {
    value.style.display = "none";
  });
  const afterLogin = document.querySelectorAll("#afterlogin");
  afterLogin.forEach((value) => {
    value.style.display = "block";
  });
  // 관리자일경우
  if (admincheck === true) {
    const admin = document.querySelectorAll("#admin");
    admin.forEach((value) => {
      value.style.display = "block";
    });
  }
  // 관리자가 아닐 경우
  else {
    const admin = document.querySelectorAll("#admin");
    admin.forEach((value) => {
      value.style.display = "none";
    });
  }
}
// 로그인 전
else {
  const afterLogin = document.querySelectorAll("#afterlogin");
  afterLogin.forEach((value) => {
    value.style.display = "none";
  });

  const admin = document.querySelectorAll("#admin");
  admin.forEach((value) => {
    value.style.display = "none";
  });
}

function login() {
  // 문서에서 id로 input data 가져오기
  let id = document.getElementById("loginid").value;
  let password = document.getElementById("loginpwd").value;

  // 로컬스토리지에 "users" 키로 저장된 item 가져와서 json 객체로 만들기
  const users = JSON.parse(localStorage.getItem("users"));

  // 로컬스토리지에서 id로 찾기
  let flag = false;
  for (let i = 0; i < users.length; i++) {
    if (id === users[i]["id"]) {
      if (password === users[i]["password"]) {
        alert("로그인 성공 !");
        localStorage.setItem("login", "true");
        location.replace("/index.html");
      } else {
        alert("비밀번호를 확인해주세요.");
      }
      flag = true;
    }
  }

  // userid가 없다면
  if (!flag) {
    // 관리자인지 확인
    if (id === "admin" && password === "admin") {
      alert("로그인 성공 !");
      localStorage.setItem("login", "true");
      localStorage.setItem("admin", "true");
      location.replace("/index.html");
    } else {
      alert("아이디를 확인해주세요.");
    }
  }
}

function findid() {
  // 문서에서 id로 input data 가져오기
  let name = document.getElementById("findIdName").value;

  // 로컬스토리지에 "users" 키로 저장된 item 가져와서 json 객체로 만들기
  const users = JSON.parse(localStorage.getItem("users"));

  // 로컬스토리지에서 이름으로 찾기
  let flag = false;
  for (let i = 0; i < users.length; i++) {
    if (name === users[i]["name"]) {
      alert(users[i]["id"]);
      flag = true;
    }
  }

  // 이름이 없다면
  if (!flag) {
    alert("이름을 확인해주세요.");
  }
}

function findpwd() {
  // 문서에서 id로 input data 가져오기
  let id = document.getElementById("findPwdId").value;

  // 로컬스토리지에 "users" 키로 저장된 item 가져와서 json 객체로 만들기
  const users = JSON.parse(localStorage.getItem("users"));

  // 로컬스토리지에서 아이디로 찾기
  let flag = false;
  for (let i = 0; i < users.length; i++) {
    if (id === users[i]["id"]) {
      alert(users[i]["password"]);
      flag = true;
    }
  }

  // 아이디가 없다면
  if (!flag) {
    alert("아이디를 확인해주세요.");
  }
}

function logout() {
  window.localStorage.removeItem("login");
  window.localStorage.removeItem("admin");
  location.replace("/index.html");
}
