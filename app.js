const canvas = document.querySelector("canvas");

// context is "brush"
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// creating rectangle
//context.rect(50, 50, 100, 100);

// filling rectangle with color
// default color is black
//context.fill();

// context.beginPath();
// context.rect(150, 150, 100, 100);
// context.fillStyle = "blue";
// context.fill();

// context.fillRect(200, 200, 50, 200);
// context.fillRect(400, 200, 50, 200);
// context.lineWidth = 2;
// context.strokeRect(300, 300, 50, 100);
// context.fillRect(200, 200, 200, 20);
// // make triangle
// context.moveTo(200, 200);
// context.lineTo(325, 100);
// context.lineTo(450, 200);
// context.fill();

context.fillRect(210, 200, 15, 100);
context.fillRect(350, 200, 15, 100);
context.fillRect(260, 200, 60, 200);

context.arc(290, 135, 40, 0, 2 * Math.PI);
//  0  ->  0.5 * PI  ->  1 * PI  ->  1.5 * PI  ->  2 * PI
// 0.5 * PI = 90 degree, 1 * PI = 180 degree, 1.5 * PI = 270 degree, 2 * PI = 360 degree
// if you want to get fine circle, 2 * PI is correct !
context.fill();

context.beginPath();
context.fillStyle = "lightgreen";
context.arc(270, 125, 3.5, 0, 2 * Math.PI);
context.arc(300, 125, 3.5, 0, 2 * Math.PI);
context.fill();

// 원 만들고 채우기
context.beginPath();
context.fillStyle = "tomato";
context.arc(285, 150, 8, 2 * Math.PI, Math.PI);
context.fill();
