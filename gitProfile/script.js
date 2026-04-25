const API = "https://api.github.com/users/";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const container = document.getElementById("profileContainer");

// Fetch User
async function getUser(username) {
    try {
        const res = await fetch(API + username);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        displayUser(data);
        getRepos(username);

    } catch (error) {
        showError("No profile found!");
    }
}

// Fetch Repos
async function getRepos(username) {
    try {
        const res = await fetch(API + username + "/repos?sort=created");
        const repos = await res.json();
        displayRepos(repos);

    } catch (error) {
        showError("Error fetching repositories");
    }
}

// Display User (CLICKABLE CARD)
function displayUser(user) {
    container.innerHTML = `
        <div class="card bg-secondary text-light mx-auto p-3"
             style="max-width: 700px; cursor: pointer;"
             onclick="openProfile('${user.html_url}')">

            <div class="row g-0">
                
                <div class="col-md-4 text-center p-3">
                    <img src="${user.avatar_url}" 
                         class="img-fluid rounded-circle" 
                         width="150">
                </div>

                <div class="col-md-8 p-3">
                    <h3>${user.name || user.login}</h3>
                    <p>${user.bio || ""}</p>

                    <div class="d-flex gap-3 mb-3">
                        <span><strong>${user.followers}</strong> Followers</span>
                        <span><strong>${user.following}</strong> Following</span>
                        <span><strong>${user.public_repos}</strong> Repos</span>
                    </div>

                    <div id="repos"></div>
                </div>

            </div>
        </div>
    `;
}

// Open GitHub Profile
function openProfile(url) {
    window.open(url, "_blank");
}

// Display Repos
function displayRepos(repos) {
    const repoContainer = document.getElementById("repos");
    repoContainer.innerHTML = "";

    repos.slice(0, 5).forEach(repo => {
        const repoEl = document.createElement("a");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.className = "btn btn-outline-light btn-sm me-2 mb-2";
        repoEl.innerText = repo.name;

        repoContainer.appendChild(repoEl);
    });
}

// Error
function showError(message) {
    container.innerHTML = `
        <div class="alert alert-danger text-center w-50 mx-auto">
            ${message}
        </div>
    `;
}

// Form Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = input.value.trim();

    if (username) {
        getUser(username);
        input.value = "";
    }
});