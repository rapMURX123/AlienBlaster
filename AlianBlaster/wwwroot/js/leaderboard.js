fetch("/api/scores")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("leaderboard");
        list.innerHTML = "";
        data.forEach(entry => {
            const li = document.createElement("li");
            li.innerText = `${entry.name ?? "???"} – ${entry.points ?? 0}`;
            list.appendChild(li);
        });
    })
    .catch(err => {
        console.error("Fehler beim Laden der Highscores:", err);
    });
