const getJSON = async () => {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const response = await fetch(url);
    if (response.ok) {
        const comments = await response.json();
        return comments;
    } else {
        const message = `Smth went wrong. Error code: ${response.status}`;
        throw new Error(message);
    }
};

getJSON().then((data) => {
        hidePreloader();
        let min_comment_id = getRandomInt(1, data.length / 2 - 200);
        let max_comment_id = getRandomInt(min_comment_id, data.length-300);
        data.forEach((comment) => {
            if (comment.id >= min_comment_id && comment.id <= max_comment_id) {
                createComment(comment);
            }
        });
    })
    .then(null, (error) => {
        showError();
        hidePreloader();
        console.log(error)
    });

function getRandomInt(min, max) {
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hidePreloader() {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
}

function showError() {
    let error_elem = document.createElement("span");
    error_elem.className = "inner";
    error_elem.innerText = "⚠ smth went wrong ⚠";
    let main = document.getElementById("main");
    main.appendChild(error_elem);
    main.className = "outer"
}

function createComment(comment) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    let p1 = document.createElement("p");
    p1.className = "comment_info";

    let label_comment = document.createElement("span");
    label_comment.className = "label_comment";
    label_comment.innerText = "Comment #";
    let comment_id = document.createElement("span");
    comment_id.className = "Comment_id";
    comment_id.innerText = comment.id;
    label_comment.appendChild(comment_id);
    p1.appendChild(label_comment);

    let label_user_email = document.createElement("span");
    label_user_email.className = "label_user_email";
    label_user_email.innerText = "From user: ";

    let user_email = document.createElement("span");
    user_email.className = "user_id";
    user_email.innerText = comment.email;
    label_user_email.appendChild(user_email);
    p1.appendChild(label_user_email);

    section.appendChild(p1);

    let p2 = document.createElement("p");
    p2.className = "title";
    p2.innerText = comment.name;
    section.appendChild(p2);

    let p3 = document.createElement("p");
    p3.className = "text_comment";
    p3.innerText = comment.body;
    section.appendChild(p3);

    main.appendChild(section);
}