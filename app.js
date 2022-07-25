const canvas = document.querySelector("canvas");

// context is "brush"
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

context.rect(50, 50, 100, 100);
context.rect(150, 150, 100, 100);
context.rect(250, 250, 100, 100);
context.fill();

context.beginPath();
context.rect(350, 350, 100, 100);
context.rect(450, 450, 100, 100);
context.fillStyle = "blue";
context.fill();