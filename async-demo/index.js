// console.log('Before');
// getUser(1, getRepos);
// console.log('After');

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('Reading from database....');
//         callback({id: id, username: 'abc'});
//     }, 2000);
// }

// function getRepo(username, callback) {
//     setTimeout(() => {
//         console.log('Calling github...');
//         if (username === 'abc') {
//             callback(['repo1', 'repo2', 'repo3']);
//         } else {
//             callback(null);
//         };
//     }, 2000);
// }

// function displayRepo(repo) {
//     console.log(repo);
// };

// function getRepos(user) {
//     console.log(user);
//     const username = user.username;
//     getRepo(username, displayRepo);
// };

/*
console.log('Before');
getUser(1)
    .then(user => getRepo(user.username))
    .then(repo => console.log('repo', repo))
    .catch(err => console.log('Error', err.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from database....');
            resolve({id: id, username: 'abc'});
        }, 2000);
    });
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github...');
            if (username === 'abc') {
                resolve(['repo1', 'repo2', 'repo3']);
            } else {
                resolve(null);
            };
        }, 2000);
    });
}
*/


console.log('Before');

async function displayRepo(){
    try {
        const user = await getUser(1);
        const repo = await getRepo(user.username);
        console.log(repo);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from database....');
            resolve({id: id, username: 'abc'});
        }, 2000);
    });
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github...');
            if (username === 'ab') {
                resolve(['repo1', 'repo2', 'repo3']);
            } else {
                reject(new Error('No repo found...'));
            };
        }, 2000);
    });
}

displayRepo();

