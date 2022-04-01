console.log("Start tests here")

//SignIn page

//Declaration
const loginform = document.querySelector(".login-form");
const password3 = document.getElementById("password3");
const signInError = document.getElementById("signInError");
const username1 = document.getElementById("username1");
const submit1 = document.getElementById("submit1")



//Event listeners
submit1.addEventListener("click", signInFunc);

//Functions
function signInFunc(e) {
    e.preventDefault();

    if (username1.value == 0 || password3.value == 0) {
        signInError.innerHTML = "Please fill empty fields";
        password3.classList.add("UN-added")
    }
    else {
        let username = document.getElementById("username1");
        let password = document.getElementById("password3");
        fetch("https://my-brandun.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",

            },
            body: JSON.stringify({ email: username.value, password: password.value })

        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                localStorage.setItem('storedtoken', JSON.stringify(res.token));
                localStorage.setItem('author', JSON.stringify(res.username));
            })
        alert("Successfully  loggen In");
        // console.log("lOGGED IN");
        loginform.reset();
        window.location.href = "../Dashboard/test.html";

        // .catch((error) => {
        //   console.log(`Error: ${error}`)
        // });

    }
}


const submit = document.querySelector("#subSend");
const subText = document.querySelector("#subText");



submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("https://my-brandun.herokuapp.com/createsubscription", {
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




