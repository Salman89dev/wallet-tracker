var auth=firebase.auth();
var firestore=firebase.firestore();
var nameDiv=document.querySelector(".name h3");
var signOutBtn=document.querySelector(".signOutBtn");
var transcationForm=document.querySelector(".transcationForm");
var tanscationList=document.querySelector(".tanscationList");



    // var data=userInfo.data();
    // console.log(data.createdAt.toDate().toISOString().split("T")[0]);

    //fatching uid from url
// var uid=location.hash.substring(1,location.hash.lenght);
var uid=null;

var renderTranscations=(transcationArr)=>{
    tanscationList.innerHTML=""
    transcationArr.forEach((transcation,index)=>{
        var {title,cost,transcationAt,transcationId}=transcation;
        tanscationList.insertAdjacentHTML('beforeend',`
        <div class="transcationListItem">
        <div class="index listItem"><h3>${++index}</h3></div>
        <div class="renderTitle listItem">
            <h3>${title}</h3>
        </div>
        <div class="renderCost listItem">
            <h3>${cost}</h3>
        </div>
        <div class="renderAt listItem">
            <h3>${transcationAt.toDate().toISOString().split("T")[0]}</h3>
        </div>

        <div class=" renderAt listItem">
        <a href="./transcation.html#${transcationId}"><button type="button">view</button></a>
    </div>
    </div>`)
    })
}

// Transcation form Area

var transcationFormSubmission=async (e)=>{
    e.preventDefault();
    try {
        var title=document.querySelector(".title").value;
        var cost=document.querySelector(".cost").value;
        var transcationType=document.querySelector(".transcationType").value;
        var transcationAt=document.querySelector(".transcationAt").value;
        if(title && cost && transcationType && transcationAt)
        {
            var transcationObj={
                title,
                cost,
                transcationType,
                transcationAt:new Date(transcationAt),
                transcationBy:uid
            }
            await firestore.collection("transcation").add(transcationObj);
            // render fresh transcation
            var transcatons=await fatchTranscation(uid)
            // transcation render process
            // console.log(transcatons)
             renderTranscations(transcatons)
            console.log("done");
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

var fatchTranscation=async (uid)=>{
    var transcations=[];
    var query=await firestore.collection("transcation").where("transcationBy","==",uid).orderBy("transcationAt","desc").get();
    query.forEach((doc)=>{
        transcations.push({...doc.data(), transcationId: doc.id})
    })
    return transcations;
}

// UserSignOut
var userSignOut=async ()=>{
    await auth.signOut();
}

// TranscationForm event listner

transcationForm.addEventListener("submit",(e)=>transcationFormSubmission(e))
// userSignOut listner

signOutBtn.addEventListener("click",userSignOut);
var fatchUserInfo= async(uid)=>{
try {
    var userInfo=await firestore.collection("users").doc(uid).get();
    return userInfo.data();
} catch (error) {
    console.log(error);
}

}

//auth listner

auth.onAuthStateChanged(async(user)=>{
    if(user)
    {
         uid=user.uid;
        
        // var {uid}=user;
        var userInfo =await fatchUserInfo(uid);

        // setting user info
        nameDiv.textContent=userInfo.fullName;
        // render transcation
        // fatch user transcation
        var transcations=await fatchTranscation(uid)
        // transcation render process
        // console.log(transcations)
         renderTranscations(transcations)
    }
    else{
        location.assign('./index.html')
        console.log("logged out");
    }
})