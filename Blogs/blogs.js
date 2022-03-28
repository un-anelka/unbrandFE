const submit = document.querySelector("#subSend");
const subText = document.querySelector("#subText");
// let paramsd = (window.location.href)
// let id1 = new URL(paramsd);
// let id = id1.searchParams.get('id')


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

//varibales initialization


let blogone = document.querySelector(".blogone");

// GET ALL BLOGS
fetch("http://localhost:4400/getAllblogs")
    .then(res => res.json())
    .then(blogdata => {

        // console.log(data)
        console.log(blogdata.data)
        const retrivedArray = blogdata.data;


        let output = "";


        retrivedArray.forEach(element => {



            //console.log(text_truncate(element.content))
            let str = text_truncate(element.content)

            output += `
            <div id=${element._id} class="blog-format">
            <div class="blog-one">
                    <div class="blog-image">

                        <img src=${element.image} alt="blog image blog" data-id=${element.title}>
                    </div>    
                <div class="content">
                        <h2 id="title">${element.title}</h2>
                        <p id="blogcontent"> ${str}</p>
                </div>
                

            </div>
            <div class="blog-two">
                                <a id=${element._id} class="myBtn" href=../Singlepage/single.html?id=${element._id}>ReadMore</a>
                                <p><span class="comments">${element.comments.length}</span>Comments</p>
            </div>
        </div>
            `;
        });

        blogone.innerHTML = output
    }
    )

{/* <button type="submit"><i class="fa fa-comment" style="color: rgb(32, 21, 16);"></i></button> */ }


text_truncate = function (str, length, ending) {
    if (length == null) {
        length = 700;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};






