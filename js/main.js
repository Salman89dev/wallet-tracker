var auth=firebase.auth();
var firestore=firebase.firestore();
var signinForm=document.querySelector(".signinForm");
var signupForm=document.querySelector(".signupForm");
var googleBtn=document.querySelector(".googleBtn");

//google sign up
var googleSignin = async()=>{
    try {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        var {additionalUserInfo:{isNewUser},user:{uid,displayName,email}}=await firebase.auth().signInWithPopup(googleProvider);
         
        //if new user then store info in firestore
        if(isNewUser)
        {
            //store info in firestore

            var userInfo={
                fullName:displayName,
                email,
                createdAt:new Date(),
            }
            await firestore.collection("users").doc(uid).set(userInfo);
            console.log("done");
            //redirect to dashboard
            //dashboard.html#{uid}
            location.assign(`./dashboard.html#${uid}`)
    
        }
        else
        {
            
            console.log("welcome");
            //redirect to dashboard
           //dashboard.html#{uid}
           location.assign(`./dashboard.html#${uid}`)
        }

    } catch (error) {
        console.log(error.messsage);
    }
}



//Sign in with email and password

var signinFormSubmission=async (e) => {
    e.preventDefault();
    try {
        var signinEmail=document.querySelector(".signinEmail").value;
        var signinPassword=document.querySelector(".signinPassword").value;
        //login 
        var {user:{uid}}=await auth.signInWithEmailAndPassword(signinEmail,signinPassword)
        //fatech data from firestore

        var userInfo=await firestore.collection("users").doc(uid).get();
        console.log(userInfo.data());
        //redirect to dashboard
        //dashboard.html#{uid}
        location.assign(`./dashboard.html#${uid}`)
    } catch (error) {
        console.log(error.messsage);
        
    }

}
//Sign up with email and password
var signupFormSubmission=async (e)=>{
    e.preventDefault();
    try {
        var fullName=document.querySelector(".signupFullName").value;
        var email=document.querySelector(".signupEmail").value;
        var password=document.querySelector(".signupPassword").value;
        if(fullName && email && password)
        {
            //create user in auth section
          var {user:{uid}}=await auth.createUserWithEmailAndPassword(email,password);
          //store user data in firestore
          var userInfo={
              fullName,
              email,
              createdAt:new Date()
          }
          await firestore.collection("users").doc(uid).set(userInfo);
          console.log("done");
        //redirect to dashboard
        //dashboard.html#{uid}
        location.assign(`./dashboard.html#${uid}`)
        }
    } catch (error) {
        console.log(error);
    }

}
signinForm.addEventListener("submit",(e)=>signinFormSubmission(e));
signupForm.addEventListener("submit",(e)=>signupFormSubmission(e));
googleBtn.addEventListener("click",googleSignin);



// ARRAY DESTRUCTRUING

// var [n1,n2,n3,n4]=[1,2,3,4];
// console.log(n1,n2,n4);

// OBJECT DESTRUCTRUING

// var person={
//     name:'salu',
//     age:23,
//     subject:{
//         major:"english",
//         minor:"maths",
//     }
// }
// var {name,age,subject:{major,minor}}=person;
// console.log(person.age,person.name,person.subject.major)

// console.log(name,age,major,minor);
