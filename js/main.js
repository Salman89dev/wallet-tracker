var auth=firebase.auth(); 
var firestore=firebase.firestore();

var signUpFormArea=document.querySelector(".signUpFormArea")
var signInFormArea=document.querySelector(".signInFormArea")
var fullNameSignUp=document.querySelector(".fullNameSignUp")
var emailSignIn=document.querySelector(".emailSignIn")
var passwordSignIn=document.querySelector(".passwordSignIn")
var emailSignUp=document.querySelector(".emailSignUp")
var passwordSignUp=document.querySelector(".passwordSignUp")



var signUpFormSubmisson= async (e)=>
{
    e.preventDefault();
    try {
        var fullName=fullNameSignUp.value;
        var email=emailSignUp.value;
        var password=passwordSignUp.value;
        if(fullName && email && password)
        {
            // create user
            var {user:{uid}}=await auth.createUserWithEmailAndPassword(email,password)
            console.log(uid)

            // store info in firestore
            var signedInInfo={
                fullName:fullName,
                email:email,
                createdAt:new Date(),
            }
            await firestore.collection("users").doc(uid).set(signedInInfo)
            // REDIRECT TO DASHBOARD PAGE
        }
    } catch (error) {
        console.log(error.message)
    }
}


var signInFormSubmisson= async (e)=>
{
    e.preventDefault();
    try {
        var email=emailSignIn.value;
        var password=passwordSignIn.value;
        if(email && password)
        {
            var {user:{uid}} =await auth.signInWithEmailAndPassword(email,password);
            console.log(uid)
            var loggedInUserInfo= await firestore.collection("users").doc(uid).get();
            console.log(loggedInUserInfo.data())
        }
        console.log("done")
    } catch (error) {
        console.log(error.message)
    }
}


signUpFormArea.addEventListener("submit",(e)=>signUpFormSubmisson(e) )


signInFormArea.addEventListener("submit",(e)=> signInFormSubmisson(e) )


// var {name,age,subject:{minor,major},subject}={
//     name:"salman",
//     age:24,
//     subject:
//     {
//         minor:"maths",
//         major:"english",
//     }
// }

// console.log(name ,age ,minor ,major ,subject)