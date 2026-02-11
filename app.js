const questions = [
  {
    q: "When life gets hard, what do we promise?",
    o: ["Walk away", "Fight together 💍", "Ignore each other"],
    c: 1
  },
  {
    q: "Our forever rule is?",
    o: ["No giving up ❤️", "No talking", "No effort"],
    c: 0
  },
  {
    q: "Biggest promise today?",
    o: ["Love only when easy", "Choose each other daily 💖", "Stay only in happy times"],
    c: 1
  }
];

let index = 0;
let score = 0;

function startQuiz() {
  document.getElementById("welcome").classList.remove("active");
  document.getElementById("quiz").classList.add("active");
  document.getElementById("bgMusic").play().catch(()=>{});
  loadQuestion();
  createPetals();
}

function loadQuestion() {
  const q = questions[index];
  document.getElementById("progress").innerText = `Promise ${index+1}/${questions.length}`;
  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.o.forEach((opt,i)=>{
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = ()=>{
      if(i===q.c){
        score++;
        showKiss();
      }
      index++;
      if(index<questions.length){
        loadQuestion();
      } else {
        showResult();
      }
    };
    optionsDiv.appendChild(div);
  });
}

function showKiss(){
  const kiss = document.createElement("div");
  kiss.innerText="💋";
  kiss.style.position="fixed";
  kiss.style.fontSize="100px";
  kiss.style.left="50%";
  kiss.style.top="50%";
  kiss.style.transform="translate(-50%,-50%)";
  document.body.appendChild(kiss);
  setTimeout(()=>kiss.remove(),1000);
}

function showResult(){
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("result").classList.add("active");

  const r = document.getElementById("resultContent");

  if(score===questions.length){
    r.innerHTML=`<h2>Forever Sealed 💍</h2>
    <p>I promise to choose you every day, every mood, every lifetime.</p>`;
  } else {
    r.innerHTML=`<h2>Still Mine 😌</h2>
    <p>Promise me you won’t escape forever?</p>`;
  }
}

function createPetals(){
  const petals = document.getElementById("petals");
  setInterval(()=>{
    const span = document.createElement("span");
    span.innerText="🌸";
    span.style.left=Math.random()*100+"vw";
    span.style.animationDuration=(3+Math.random()*3)+"s";
    petals.appendChild(span);
    setTimeout(()=>span.remove(),6000);
  },500);
}

document.getElementById("musicToggle").onclick=function(){
  const m=document.getElementById("bgMusic");
  if(m.paused){m.play();} else {m.pause();}
};
