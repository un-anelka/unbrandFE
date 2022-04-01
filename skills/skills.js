const submit=document.querySelector("#subSend");
const subText=document.querySelector("#subText");



submit.addEventListener("click", (e)=>{
    e.preventDefault();
    fetch("https://my-brandun.herokuapp.com/createsubscription", {
    method: "POST",
    headers: {
        "Accept":"application/json, text/plain, */*",
        "Content-type":"application/json"
    },
    body: JSON.stringify({email: subText.value})
})
    .then(res => res.json())
    .then(subscriptiondata => {
        // res.json(subscriptiondata)
        console.log(subscriptiondata);
        location.reload();
    })

})