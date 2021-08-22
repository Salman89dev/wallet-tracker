var auth=firebase.auth(); 
var firestore=firebase.firestore();
var signUpFormArea=document.querySelector(".signUpFormArea")
var signInFormArea=document.querySelector(".signInFormArea")
var displayName=document.querySelector(".fullNameSignUp")
var emailSignIn=document.querySelector(".emailSignIn")
var passwordSignIn=document.querySelector(".passwordSignIn")
var emailSignUp=document.querySelector(".emailSignUp")
var passwordSignUp=document.querySelector(".passwordSignUp")
var googleBtn=document.querySelector(".googleBtn");



var  googleSignIn=async ()=>
{
    try {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        var  {additionalUserInfo:{isNewUser},user:{displayName,uid,email}}=await firebase.auth().signInWithPopup(googleProvider)
        if(isNewUser)
        {
            var googleUserInfo={
                displayName,
                email,
                createdAt:new Date(),
        }
          await firestore.collection("users").doc(uid).set(googleUserInfo)
          console.log("done")
            // REDIRECT TO DASHBOARD PAGE
            location.assign(`./dashboard.html#${uid}`)
        }
        else{
            console.log("welcome");
            // REDIRECT TO DASHBOARD PAGE
            location.assign(`./dashboard.html#${uid}`)
        }

          
    } catch (error) {
        console.log(error.message)
    }
}

var signUpFormSubmisson= async (e)=>
{
    e.preventDefault();
    try {
        var displayNames=displayName.value;
        var email=emailSignUp.value;
        var password=passwordSignUp.value;
        if(displayNames && email && password)
        {
            // create user
            var {user:{uid}}=await auth.createUserWithEmailAndPassword(email,password)
            console.log(uid)

            // store info in firestore
            var signedInInfo={
                displayName:displayNames,
                email:email,
                createdAt:new Date(),
            }
            await firestore.collection("users").doc(uid).set(signedInInfo)
            // REDIRECT TO DASHBOARD PAGE
            location.assign(`./dashboard.html#${uid}`)
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
            // REDIRECT TO DASHBOARD PAGE
            location.assign(`./dashboard.html#${uid}`)
        }
        console.log("done")
    } catch (error) {
        console.log(error.message)
    }
}


signUpFormArea.addEventListener("submit",(e)=>signUpFormSubmisson(e) );
googleBtn.addEventListener("click",googleSignIn);
signInFormArea.addEventListener("submit",(e)=> signInFormSubmisson(e) );


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