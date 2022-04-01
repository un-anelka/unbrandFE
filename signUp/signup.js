const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const loginform = document.querySelector(".login-form");
const submit = document.getElementById("submit");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const error = document.getElementById("error");
const username = document.getElementById("username");


//Event listeners
submit.addEventListener("click", submitFunc);

//Functions
function submitFunc(e) {

    e.preventDefault();
    console.log("Hello UN")
    if (firstname.value == 0 || lastname.value == 0 || username.value == 0 || password1.value == 0 || password2.value == 0) {
        error.innerHTML = "Please fill empty fields"
    }

    else if (password1.value != password2.value) {
        error.innerHTML = "Password mismatch"
    }

    else {
        console.log("UN")
        let url = "https://my-brandun.herokuapp.com/";
        fetch(url,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-type": "application/json"
                }

                ,
                body: JSON.stringify({
                    firstname: firstname.value,
                    lastname: lastname.value,
                    email: username.value,
                    password: password1.value
                })

            })
            .then(res => res.json())
            .then(posts => {
                console.log(posts);
                // alert("User has been successfully created");
                location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

}


// submit.addEventListener("click", (e)=>{

// e.preventDefault();
// console.log("UN")
//   let url="http://localhost:4400";
//   fetch(url,
//     {
//       method: "POST",
//       headers: {
//           "Accept":"application/json, text/plain, */*",
//           "Content-type":"application/json"
//       }

//       ,
//       body: JSON.stringify({
//         firstname: firstname.value,
//         lastname: lastname.value,
//         email: username.value,
//         password: password1.value
//     })

//   })
//   .then(res=>res.json())
//   .then(posts=>{
//       console.log(posts);
//       // alert("User has been successfully created");
//       // location.reload();
//   })


// });

const submit12 = document.querySelector("#subSend");
const subText = document.querySelector("#subText");



submit12.addEventListener("click", (e) => {
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