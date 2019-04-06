// function getRepositories(){
//   const req = new XMLHttpRequest();
//   req.open("GET", "https://api.github.com/users/octocat/repos");
//   req.send();
// }

function showRepositories(event, data){
  // console.log(this.responseText);
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  // let repoList = "<ul>";
  // for (var i = 0; this.responseText.length; i++){
  //   repoList += "<li>" + this.responseText[i] + "</li>";
  // }
  // repoList += "</ul>";
  const repoList = `<ul>${repos.map(r => "<li>" + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join("")}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function getCommits(el){
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

function showCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => "<li><strong>" + commit.commit.author.name + "</strong> - " + commit.commit.message + "</li>").join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
