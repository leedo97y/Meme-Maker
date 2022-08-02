const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
); // colorOptions 배열로 바꾸기
// 전체 삭제 모드, 지우개 모드
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
// 파일 등록해서 밈 만들기
const fileInput = document.querySelector("#file");
// text 쓰기
const textInput = document.querySelector("#text");
// save button
const saveBtn = document.querySelector("#save");
const fontList = document.querySelector("#font-list");

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
// 붓 크기를 지정하는 line-width range의 값과 context의 크기를 일치시켜줌
ctx.lineCap = "round"; // 선의 끝 부분을 둥글게 바꿔줌

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
    // isPainting = true, draw line
  }

  ctx.moveTo(event.offsetX, event.offsetY);

  // isPainting = false, just move mouse
}

function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  // Color Picker의 색상을 고르면, 그 색상으로 변하게 해줌
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function forColorOptions(event) {
  const colorValue = event.target.dataset.color;
  // colorValue의 색상 하나하나를 지정해줌
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  // switch mode "filling"
  if (isFilling) {
    // 드로잉 모드로 바꾸기
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    // 채우기 모드로 바꾸기
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  // 채우기 모드일 때
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onDestroyClick() {
  // 전부 지우기 버튼 클릭시
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 800, 800);
  color.value = "#000000";
  ctx.strokeStyle = "#000000";
}

function onEraserClick() {
  // 지우개 모드 버튼 클릭시
  ctx.strokeStyle = "#fff";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  // get choosen file
  const url = URL.createObjectURL(file);
  // make choosen file's url
  const image = new Image();
  image.src = url;
  // make image, and add src by using url
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  const font = fontList.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `58px ${font}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  // a tag has download function
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

// function onFontChange(event) {
//   const fontName = event.target.value;
//   ctx.font = `58px ${fontName}`;
// }

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);
// canvas를 더블클릭시 텍스트 input에 입력한 텍스트가 canvas에 나타나게 해줌

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((element) => {
  element.addEventListener("click", forColorOptions);
});
// forEach는 배열에서만 가능하므로 colorOptions를 배열로 바꿔줘야함

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
