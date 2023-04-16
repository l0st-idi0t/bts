//hehe you don't get to select any text
document.body.style.userSelect = 'none';

function nextPage() {
    const name = document.getElementById('name-input').value;

    localStorage.setItem('username', name);

    const transitionCover = document.createElement('div');
    transitionCover.className = 'transition-cover';
    document.body.appendChild(transitionCover);

    setTimeout(()=> {
        window.location.href = 'HTML/dashboard.html';
    }, 1000);
}