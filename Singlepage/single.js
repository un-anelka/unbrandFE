let paramsd = (window.location.href)
let id1 = new URL(paramsd);
let id = id1.searchParams.get('id')
console.log(id)

let singleblog = document.querySelector(".singleblog")
const submit = document.querySelector("#subSend");
const subText = document.querySelector("#subText");



submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:4400/createsubscription", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: subText.value })
    })
        .then(res => res.json())
        .then(subscriptiondata => {
            // res.json(subscriptiondata)
            console.log(subscriptiondata);
            location.reload();
        })

    // console.log("clicked")
    // console.log(subText.value)

})




// GET SINGLE BLOG
let url = "http://localhost:4400/getOneblog";
fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(blogdata => {

        console.log(blogdata.data)

        const retrievedArray = blogdata.data;
        console.log(retrievedArray.comments)
        let output = "";
        let commentoutput = '';

        output += `
                <h1 style="align-self: center;">${retrievedArray.title}</h1>
                <img src=${retrievedArray.image} alt="blog image blog" data-id=${retrievedArray.title}>
                <p class="content">${retrievedArray.content}</p>
                <p class="author">author <span class="created">date and time</span></p>
            `;

        singleblog.innerHTML = output;

        let allThisComments = retrievedArray.comments;
        allThisComments.sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(comment => {
                console.log(comment.data.content)
                console.log(comment.date)
                console.log(comment.username)



                commentoutput += `
                <div class="allcomments">
                    <p class="username"> ${comment.username} <span class="date">${comment.date}</span></p>
                    <p class="comments-content">${comment.data.content}</p>
                </div>
                `
            });
        retrievedcomments.innerHTML = commentoutput
    }
    )

// ADD AND RETRIEVE COMMENTS

let comment = document.querySelector("#comment");
let addbtn = document.querySelector("#addbtn");
let retrievedcomments = document.querySelector(".retrievedcomments");
let allcomments = document.querySelector(".allcomments");
// console.log(retrievedcomments)
// console.log(allcomments)

addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let url = "http://localhost:4400/getOneblog";
    let idcomment = "comments";
    fetch(`${url}/${id}/${idcomment}`, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            content: comment.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            comment.value = "";
            location.reload();
        })
})





