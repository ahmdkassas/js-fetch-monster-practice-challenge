const BASE_URL = "http://localhost:3000/";
let curPage = 1;

getMonsters(curPage).then(showMonsters);
createMonsterForm();
addNavListeners();


function getMonsters(page) {
    return fetch(BASE_URL + `monsters/?_limit=50&_page=${page}`)
    .then(result => result.json());
}

function createMonsterDiv(monster) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    h2.textContent = monster.name;
    h3.textContent = monster.age;
    p.textContent = monster.description;
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    return div;
}


function showMonsters(monstersArray) {
    clearMonstersContainer();
    const monsterContainer = document.getElementById('monster-container');
    monstersArray.forEach(monster => {
        const monsterDiv = createMonsterDiv(monster);
        monsterContainer.append(monsterDiv);
    });
}

function clearMonstersContainer() {
    document.querySelector('#monster-container').innerHTML = "";
}


function createMonsterForm() {
    const form = document.createElement('form'),
    nameInput = document.createElement('input'),
    ageInput = document.createElement('input'),
    descInput = document.createElement('input'),
    submitBtn = document.createElement('button');
    
    form.id = 'monster-form';
    nameInput.id = 'name';
    ageInput.id = 'age';
    descInput.id = 'description';
    nameInput.placeholder = 'name';
    ageInput.placeholder = 'age';
    descInput.placeholder = 'description';
    submitBtn.textContent = 'Create';

    form.append(nameInput, ageInput, descInput, submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const monster = getFormData();
        postMonster(monster);
        clearForm();
    });
    const div = document.getElementById('create-monster');
    div.appendChild(form);
}


function getFormData() {
    let a = document.querySelector('#name'),
    b = document.querySelector('#age'),
    c = document.querySelector('#description');

    return {
        name: a.value,
        age: parseFloat(b.value),
        description: c.value
    };
}


function postMonster(monster) {
    let URL = `${BASE_URL}monsters`,
    config = {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(monster)
    };
    fetch(URL, config);
}


function clearForm() {
    document.querySelector('#monster-form').reset();
}

function addNavListeners() {
    let backBtn = document.querySelector('#back'),
    forwardBtn = document.querySelector('#forward');

    backBtn.addEventListener('click', () => {
        prevPage();
    });
    forwardBtn.addEventListener('click', () => {
        nextPage();
    });
}

function nextPage() {
    curPage++;
    getMonsters(curPage++).then(showMonsters);
}

function prevPage() {
    if (curPage < 1) {
        alert(`You're already on the first page`);
    } else {
        curPage--;
        getMonsters(curPage).then(showMonsters);
    }
}