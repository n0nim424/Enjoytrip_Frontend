function resetForm() {
  document.getElementById("register").reset();
}

function regist() {
  // 문서에서 id 로 input data 가져오기
  let name = document.getElementById("name").value;
  let id = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let passwordcheck = document.getElementById("passwordcheck").value;
  let emailid = document.getElementById("emailid").value;
  let domain = document.getElementById("domain").value;

  // 입력값 검증
  if (
    name === "" ||
    id === "" ||
    password === "" ||
    passwordcheck === "" ||
    emailid === "" ||
    domain === ""
  ) {
    alert("빈칸이 없도록 입력해주세요.");
    return;
    // 비밀번호 확인
  } else if (password !== passwordcheck) {
    alert("비밀번호를 확인해주세요.");
    return;
  } else {
    // input data로 user 만들기
    const users = {
      name,
      id,
      password,
      email: emailid + "@" + domain,
    };

    // 로컬스토리지에 있는 users 를 가져온다.
    let localUsers = localStorage.getItem("users");

    if (localUsers === null) {
      localUsers = [users];
    } else {
      // users가 있다면 Json 으로 변경
      localUsers = JSON.parse(localUsers);
      localUsers.push(users);
    }

    // 로컬스토리지에 저장하기 위해서는 문자열의 형태로만 저장할 수 있다.
    const usersJson = JSON.stringify(localUsers);
    localStorage.setItem("users", usersJson);
    alert("회원가입 성공!");
    // 메인 화면으로 돌아가기
    location.replace("index.html");
  }
}

function regist2() {
  // 문서에서 id 로 input data 가져오기
  let name = document.getElementById("name").value;
  let id = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let passwordcheck = document.getElementById("passwordcheck").value;
  let emailid = document.getElementById("emailid").value;
  let domain = document.getElementById("domain").value;

  // 입력값 검증
  if (
    name === "" ||
    id === "" ||
    password === "" ||
    passwordcheck === "" ||
    emailid === "" ||
    domain === ""
  ) {
    alert("빈칸이 없도록 입력해주세요.");
    return;
    // 비밀번호 확인
  } else if (password !== passwordcheck) {
    alert("비밀번호를 확인해주세요.");
    return;
  } else {
    // input data로 user 만들기
    const users = {
      name,
      id,
      password,
      email: emailid + "@" + domain,
    };

    // 로컬스토리지에 있는 users 를 가져온다.
    let localUsers = localStorage.getItem("users");

    if (localUsers === null) {
      localUsers = [users];
    } else {
      // users가 있다면 Json 으로 변경
      localUsers = JSON.parse(localUsers);
      localUsers.push(users);
    }

    // 로컬스토리지에 저장하기 위해서는 문자열의 형태로만 저장할 수 있다.
    const usersJson = JSON.stringify(localUsers);
    localStorage.setItem("users", usersJson);
    alert("회원등록 성공!");
    // 메인 화면으로 돌아가기
    location.replace("member.html");
  }
}
