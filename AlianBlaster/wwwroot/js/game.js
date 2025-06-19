const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 180, w: 20, h: 20 };
let bullets = [];
let aliens = [];
let score = 0;
let isGameOver = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.y = Math.max(0, player.y - 10);
    if (e.key === "ArrowDown") player.y = Math.min(canvas.height - player.h, player.y + 10);
    if (e.key === " ") shoot();
});

function shoot() {
    if (isGameOver) return;
    bullets.push({ x: player.x + player.w, y: player.y + player.h / 2 });
}

function spawnAlien() {
    if (isGameOver) return;
    aliens.push({ x: canvas.width, y: Math.random() * (canvas.height - 20) });
}

function update() {
    // Bewegen
    bullets.forEach(b => b.x += 10);
    aliens.forEach(a => a.x -= 3);

    // Kollision Kugel vs Alien
    bullets.forEach((b, bi) => {
        aliens.forEach((a, ai) => {
            if (
                b.x < a.x + 20 &&
                b.x + 5 > a.x &&
                b.y < a.y + 20 &&
                b.y + 5 > a.y
            ) {
                bullets.splice(bi, 1);
                aliens.splice(ai, 1);
                score += 100;
                document.getElementById("score").innerText = score;
            }
        });
    });

    // Kollision Alien vs Spieler → Game Over
    aliens.forEach(a => {
        if (
            player.x < a.x + 20 &&
            player.x + player.w > a.x &&
            player.y < a.y + 20 &&
            player.y + player.h > a.y
        ) {
            isGameOver = true;
        }
    });

    // Müll entfernen
    bullets = bullets.filter(b => b.x < canvas.width);
    aliens = aliens.filter(a => a.x > -20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spieler
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Schüsse
    ctx.fillStyle = "yellow";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, 5, 5));

    // Aliens
    ctx.fillStyle = "red";
    aliens.forEach(a => ctx.fillRect(a.x, a.y, 20, 20));
}

function drawGameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "48px monospace";
    ctx.fillText("💀 GAME OVER 💀", 220, 180);

    ctx.fillStyle = "white";
    ctx.font = "24px monospace";
    ctx.fillText("Score: " + score, 330, 230);

    // Zeige den Retry-Button
    document.getElementById("retryBtn").style.display = "inline-block";
}

function restartGame() {
    // Variablen zurücksetzen
    player = { x: 50, y: 180, w: 20, h: 20 };
    bullets = [];
    aliens = [];
    score = 0;
    isGameOver = false;
    document.getElementById("score").innerText = score;

    // Button wieder verstecken
    document.getElementById("retryBtn").style.display = "none";

    // Spiel neu starten
    loop();
}


function loop() {
    if (!isGameOver) {
        update();
        draw();
        requestAnimationFrame(loop);
    } else {
        drawGameOver();
    }
}

// Score senden (später mit Backend)
function submitScore() {
    const name = prompt("Name fürs Leaderboard?");
    if (!name) return;

    fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, points: score })
    }).then(() => alert("Gespeichert!"));
}

setInterval(spawnAlien, 1000);
loop();