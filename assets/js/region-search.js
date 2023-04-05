let areaUrl =
  "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=xohx8FNZ2AOMvKIlBj6xwvHxTNQNf9bSGX6vLU6syrufnLtC34mdrC4mgHKUDfektfP0IjEzRNjSoKEJPI6B2Q%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";
fetch(areaUrl)
  .then((response) => response.json())
  .then((data) => makeArea(data));

function makeArea(data) {
  let sel = document.getElementById("search-area");
  let areas = data.response.body.items.item;
  areas.forEach(function (area, i) {
    let opt = document.createElement("option");
    opt.setAttribute("value", area.code);
    opt.appendChild(document.createTextNode(area.name));
    sel.appendChild(opt);
  });
}

document.getElementById("search-area").onchange = function () {
  let sel = document.getElementById("search-area");
  let areaCode = sel.value;
  let sigunguUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=xohx8FNZ2AOMvKIlBj6xwvHxTNQNf9bSGX6vLU6syrufnLtC34mdrC4mgHKUDfektfP0IjEzRNjSoKEJPI6B2Q%3D%3D&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=${areaCode}&_type=json`;

  fetch(sigunguUrl)
    .then((response) => response.json())
    .then((data) => {
      let selSigungu = document.getElementById("search-sigungu");
      data.response.body.items.item.forEach((sigungu) => {
        let opt = document.createElement("option");
        opt.setAttribute("value", sigungu.code);
        opt.appendChild(document.createTextNode(sigungu.name));
        selSigungu.appendChild(opt);
      });
    });
};

function makeMap(data) {
  console.log(data);
  let startX = data[0].mapx;
  let startY = data[0].mapy;

  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(Number(startY), Number(startX)), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  map = new kakao.maps.Map(mapContainer, mapOption);

  for (var i = 0; i < data.length; i++) {
    let mapX = data[i].mapx;
    let mapY = data[i].mapy;
    let latlng = new kakao.maps.LatLng(Number(mapY), Number(mapX));
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: latlng, // 마커를 표시할 위치
      title: data[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: `<div style="width:350px; height: 170px">
            <div style="height:20%;" class="row mt-1 ms-2 fw-bold">
                ${data[i].title}
            </div>
            <div style="height:80%;" class="row m-1 d-flex">
                <div style="width:40%;">
                    <img style="width:100%; height:100px;" src='${data[i].firstimage}'/>
                </div>
                <div style="width:60%;">
                    <p style="font-size: 10pt; margin: 1px" class="fw-bold">${"주소"}</p>
                    <p style="font-size: 10pt; margin: 1px">${
                      data[i].addr1 + "\n" + data[i].addr2
                    }</p>
                </div>
                
            </div>
        </div>`, // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
  }
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

// 지역, 관광지 유형, 검색어 입력 후 검색 버튼 클릭.
document.getElementById("btn-search").addEventListener("click", function (event) {
  event.preventDefault();

  let areaCode = document.getElementById("search-area").value;
  let sigunguCode = document.getElementById("search-sigungu").value;
  let contentTypeId = document.getElementById("search-content-id").value;

  let searchUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=xohx8FNZ2AOMvKIlBj6xwvHxTNQNf9bSGX6vLU6syrufnLtC34mdrC4mgHKUDfektfP0IjEzRNjSoKEJPI6B2Q%3D%3D&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      try {
        makeMap(data.response.body.items.item);
      } catch (e) {
        alert("검색 결과가 없습니다.");
      }
    });

  return false;
});
