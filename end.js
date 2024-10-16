const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  console.log(usernameInput.value);
  saveScoreBtn.disabled = !usernameInput.value;
});

saveHighScore = (e) => {
  console.log("clicked the save button");
  e.preventDefault();
};
