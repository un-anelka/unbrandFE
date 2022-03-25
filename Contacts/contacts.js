const submitx = document.querySelector("#subSend");
const subTexts = document.querySelector("#subText");



submitx.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:4400/createsubscription", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: subTexts.value })
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


const queryemail = document.querySelector("#email");
const queryname = document.querySelector("#name");
const querymessage = document.querySelector("#message");
const querysubmit = document.querySelector("#contactform");
console.log(querysubmit)

querysubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let url = "http://localhost:4400/createcontact";
    fetch(`${url}`, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: queryname.value,
            email: queryemail.value,
            message: querymessage.value
        })
    })
        .then(res => res.json())
        .then(queriesdata => {
            console.log(queriesdata);
            querymessage.value = '';
            queryemail.value = '';
            queryname.value = '';
            alert("Your message was submitted successfully!")
        })

        .catch(err => console.log(err))

})
