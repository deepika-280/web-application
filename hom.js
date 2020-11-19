var firebaseConfig = {
  apiKey: "AIzaSyDPWlvysHbsrJ80R7c3CvXME6AIFuypesg",
  authDomain: "good-cause-eec87.firebaseapp.com",
  databaseURL: "https://good-cause-eec87.firebaseio.com",
  projectId: "good-cause-eec87",
  storageBucket: "good-cause-eec87.appspot.com",
  messagingSenderId: "21879390152",
  appId: "1:21879390152:web:0ec677802b6f0e356dcafd",
  measurementId: "G-DP5VSFJSS7"
};

firebase.initializeApp(firebaseConfig);

function data()
{

var myDb=firebase.database().ref().child('report');
var user=document.getElementById("name").value;
var pass=document.getElementById("phno").value;
var pob=document.getElementById("iss").value;
if(user=="" || pob==""){
  $("#done").text("name and issue are mandatory");
  setTimeout(function(){
    $("#done").text(" ");
  },3000);

}
else{
  myDb.child(user).set({
    uname:user,
    phno:pass,
    issue:pob
  });
  $("input[type=text], textarea").val("");
  $("input[type=number], textarea").val("");
  $("#done").text("submitted your issue");
  setTimeout(function(){
    $("#done").text(" ");
  },3000);
}  
}

function login() {

var users=document.getElementById('usr').value;
var pass=document.getElementById('pwd').value;
localStorage.setItem("username",users);
var ref = firebase.database().ref("registered/"+users);
ref.once('value').then(function(snapshot) {
var t = snapshot.child("ouser").exists();
if(t==true){
 b = snapshot.val().ouser;
var a = snapshot.val().opass;
if(b==users){
  if(a==pass){
    window.location.replace('user.html');
  }
  else{
    $("input[type=text], textarea").val("");
    $("input[type=password], textarea").val("");
    $("#passw").text("Invalid password ! try again");
    setTimeout(function(){
      $("#passw").text(" ");
    },3000);
  }
}
else{
  $("input[type=text], textarea").val("");
  $("input[type=password], textarea").val("");
  $("#usrname").text("Invalid Username ! try again");
  setTimeout(function(){
    $("#usrname").text(" ");
  },3000);
}
}
else{
$("input[type=text], textarea").val("");
$("input[type=password], textarea").val("");
$("#usrname").text("Invalid Username! try again");
setTimeout(function(){
  $("#usrname").text(" ");
},3000);

}
});

}

function add(){
var user=document.getElementById("na").innerHTML;
var datab=firebase.database().ref().child('registered/'+user+'/children');
var childname=document.getElementById("chname").value;
var dob=document.getElementById("bdate").value;
var id=document.getElementById("chid").value;
var age=document.getElementById("chage").value;
var gender=document.getElementById("gender").value;
var joineddate=document.getElementById("jdate").value;
var joinedby=document.getElementById("chjby").value;
var medical=document.getElementById("chmed").value;
var deceased="null";
var decerea="null";
var visits="null";
var deprea ="null";
var depdate="null";
var status=document.getElementById("chstat").value;
var gname=document.getElementById("chgaurn").value;
var gphno=document.getElementById("chgaurp").value;
var gaddress=document.getElementById("chgaura").value;


  
if(childname== ""|| id=="" || age=="" || gender=="" || joineddate=="" || joinedby =="" || medical=="" || status=="" || gname=="" || gphno=="" || gaddress=="" ){
alert("all fields are mandatory");
}
else{  
if(age>0 && age<=18){
  var regex = /^[A-Z]*$/;                
  if(regex.test(childname)){
    const ref = firebase.storage().ref();
    const file = $('#img').get(0).files[0];
    const name =childname;
    const metadata = { contentType: file.type };
    const task = ref.child(user).child(name).put(file,metadata);
    datab.child(childname).set({
      chname:childname,
      chid:id,
      chage:age,
      dob:dob,
      chgender:gender,
      joined:joineddate,
      joinedby:joinedby,
      medical:medical,
      deceased:deceased,
      deceasedrea:decerea,
      status:status,
      gname:gname,
      gphno:gphno,
      gadd:gaddress,
      departuredate:depdate,
      departurerea:deprea,
      visit:visits
    });
  
    $("input[type=text], textarea").val("");
    $("input[type=date], textarea").val("");
    $("input[type=number], textarea").val("");
    $("input[type=gmail], textarea").val("");
    $("input[type=radio], textarea").val("");
    $("input[type=file], textarea").val("");
    alert("ADDED");
  }
  else{
    alert("use only capital letters to enter child name");
  }  
}
else{
  alert("Invalid age");
}
}    
} 
function child(){

var user=document.getElementById("na").innerHTML;
var c= document.getElementById("childname").value;
var cdd=document.getElementById("childidnumber").value;
if(c=="" || cdd==""){
$("#oneup").text("ALL FIELDS ARE MANDATORY");
    setTimeout(function(){
      $("#oneup").text(" ");
    },3000);
}
else{
var query = firebase.database().ref('registered/'+user+'/children/'+c).orderByKey();
query.once("value").then(function(snapshot) {
  var childData = snapshot.val();  
  var n = snapshot.val().chname;
  var a = snapshot.val().chage;
  var i = snapshot.val().chid;
  var g = snapshot.val().chgender;
  var jb = snapshot.val().joinedby;
  var jd = snapshot.val().joined;
  var med = snapshot.val().medical;
  var st = snapshot.val().status;
  var dec = snapshot.val().deceased;
  var gn = snapshot.val().gname;
  var gp = snapshot.val().gphno;
  var ga= snapshot.val().gadd;
  var dob=snapshot.val().dob;
  var depa=snapshot.val().departuredate;
  var depre=snapshot.val().departurerea;
  var derea=snapshot.val().deceasedrea;
  if(c==n && cdd==i){
    document.getElementById("table").style.display='block';
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(user);
    spaceRef.child(n).getDownloadURL().then(function(url) {
      var test = url;
      document.getElementById("cimg").src=test;
    });
    $("#details").append(' <br> NAME : '+n+' <br> ID NO : '+i+'<br> AGE : '+a+'yrs  <br> GENDER : '+g+'<br> STATUS : '+st);
    $("#details2").append('DATE OF BIRTH : '+dob+' <br><br>JOINED BY : '+jb+' <br><br> JOINED DATE : '+jd+'<br><br>MEDICAL ISSUES: '+med);
    $("#details3").append(' GUARDIAN NAME : '+gn+'<br><br> GUARDIAN PH-NO : '+gp+'<br><br>GUARDIAN ADDRESS : '+ga);
    $("#details4").append( ' DEPARTURE DATE : '+depa+'<br><br> DEPATURE REASON : '+depre+'<br> <br> DECEASED DATE : '+dec+'<br><br> DECEASED REASON : '+derea);
  }
  else{
    $("#oneup").text("INVALID NAME OR ID");
    setTimeout(function(){
      $("#oneup").text(" ");
    },3000);
  }  
}); 


}  

}

function done(){
$("#cimg").empty();
$("#details").empty();
$("#details2").empty();
$("#details3").empty();
$("#details4").empty();
document.getElementById("table").style.display='none';
}
function don(){
$('#cn').text("");
$('#a1').text("");
$('#b1').text("");
$('#c1').text("");
$('#d1').text("");
$('#e1').text("");
$('#f1').text("");
$('#g1').text("");
$('#h1').text("");
}


function view(){

$("#caimg").empty();
$('#a0').text("");
$('#a').text("");
$('#b').text("");
$('#cc').text("");
$('#d').text("");
$('#e').text("");
$('#f').text("");
$('#g').text("");
$('#h').text("");
$('#i').text("");
$('#j').text("");
$('#k').text("");
$('#l').text("");
$('#m').text("");
$('#n').text("");
$('#o').text("");


var user=document.getElementById("na").innerHTML;


document.getElementById('table2').style.display='block';
var query = firebase.database().ref('registered/'+user+'/children');

query.once("value")
.then(function(snapshot) {
snapshot.forEach(function(childSnapshot) {
// key will be "ada" the first time and "alan" the second time
var childData = childSnapshot.val();
var n = childSnapshot.val().chname;
var a = childSnapshot.val().chage;
var i = childSnapshot.val().chid;
var g = childSnapshot.val().chgender;
var dobb = childSnapshot.val().dob;
var jb = childSnapshot.val().joinedby;
var jd = childSnapshot.val().joined;
var med = childSnapshot.val().medical;
var st = childSnapshot.val().status;
var dec = childSnapshot.val().deceased;
var decrea = childSnapshot.val().deceasedrea;
var gn = childSnapshot.val().gname;
var gp = childSnapshot.val().gphno;
var ga= childSnapshot.val().gadd;
var dd = childSnapshot.val().departuredate;
var dr= childSnapshot.val().departurerea;

var storageRef = firebase.storage().ref();
var spaceRef = storageRef.child(user);
spaceRef.child(n).getDownloadURL().then(function(url) {
    var test = url;
    $("#caimg").append('<br> <img src= '+ test +' width="40px" height="40px" /><br><br>');
    test="";
    $('#a0').append("<br>"+i+"<br><br><br>");
    $('#a').append("<br>"+n+"<br><br><br>");
    $('#b').append("<br>"+a+"<br><br><br>");
    $('#d').append("<br>"+g+"<br><br><br>");
    $('#e').append("<br>"+gn+"<br><br><br>");
    $('#f').append("<br>"+gp+"<br><br><br>");
    $('#g').append("<br>"+ga+"<br><br><br>");
    $('#h').append("<br>"+jb+"<br><br><br>");
    $('#i').append("<br>"+jd+"<br><br><br>");
    $('#j').append("<br>"+med+"<br><br><br>");
    $('#k').append("<br>"+st+"<br><br><br>");
    $('#l').append("<br>"+dec+"<br><br><br>");
    $('#n').append("<br>"+dd+"<br><br><br>");
    $('#o').append("<br>"+dr+"<br><br><br>");
    $('#cc').append("<br>"+dobb+"<br><br><br>");
    $('#m').append("<br>"+decrea+"<br><br><br>");

});

});
});

}

function dece(){
var user=document.getElementById("na").innerHTML;
var child=document.getElementById("chiname").value;
var cid=document.getElementById("cidno").value;
var de=document.getElementById("dd").value;
var dere=document.getElementById("cdecr").value;

var d=firebase.database().ref('registered/'+user+'/children');
if(child=="" || cid =="" || de=="" || dere==""){
$("#up").text("ALL FIELDS ARE MANDATORY");
setTimeout(function(){
$("#up").text(" ");
},3000);

}
else{
d.child(child).once('value').then(function(snapshot) {
id = snapshot.val().chid;
console.log(id);

if(cid==id){
  d.child(child).update({
  deceased:de, 
  deceasedrea:dere
  });
  $("input[type=text], textarea").val("");
  $("input[type=date], textarea").val("");
  $("#up").text("UPDATED");
  setTimeout(function(){
  $("#up").text(" ");
  },3000);
}
else{
  $("#up").text("ID AND NAME DOEN'T MATCH");
  setTimeout(function(){
  $("#up").text(" ");
  },3000);
} 
}); 
} 
}

function medi(){
var user=document.getElementById("na").innerHTML;
var child=document.getElementById("chilname").value;
var chi=document.getElementById("chhids").value;
var med=document.getElementById("mi").value;
var d=firebase.database().ref('registered/'+user+'/children');
if(child=="" || med=="" ||chi=="" ){
$("#upd").text("ALL FIELDS ARE MANDATORY");
setTimeout(function(){
$("#upd").text(" ");
},3000);
}
else{
d.child(child).once('value').then(function(snapshot) {
var id = snapshot.val().chid;
if(chi==id){
   d.child(child).update({
     medical:med
  });
  $("input[type=text], textarea").val("");

  $("#upd").text("UPDATED");
  setTimeout(function(){
    $("#upd").text(" ");
  },3000);
}
else{
  $("#upd").text("INVALID USER OR ID");
  setTimeout(function(){
    $("#upd").text(" ");
  },3000);

}
}); 

}  

}
function meddet(){
var user=document.getElementById("na").innerHTML;
var c= document.getElementById("chill").value;
var ci= document.getElementById("chillid").value;
var query = firebase.database().ref('registered/'+user+'/children/'+c);
query.once("value").then(function(snapshot) {
var n = snapshot.val().medical;
var id=snapshot.val().chid;
console.log(id);
if(ci==id){
 document.getElementById("md").innerHTML=n;
}
else{
document.getElementById("md").innerHTML="INVALID USERNAME OR ID";
setTimeout(function(){
  $("#md").text(" ");
  },3000);
}
});
}
function visit(){
var user=document.getElementById("na").innerHTML;

var c = document.getElementById("vcname").value;
var cid = document.getElementById("vcid").value;
var datab=firebase.database().ref().child('registered/'+user+'/children/'+c+'/visit');
var visitorname=document.getElementById("vname").value;
var visitorphno=document.getElementById("vph").value;
var visitoradd=document.getElementById("vadd").value;
var visitorrel=document.getElementById("vrel").value;
var visitorrea=document.getElementById("vrea").value;
var visitordate=document.getElementById("vdate").value;
var visitortime=document.getElementById("vtime").value;
if(visitorname==""|| visitorphno==""|| visitoradd==""||visitorrel==""||visitorrea=="" || visitortime=="" || visitordate==""){
alert("ALL FIELDS ARE MANDATORY");
}
else{
var query = firebase.database().ref('registered/'+user+'/children/'+c);
query.once("value").then(function(snapshot) {
  id=snapshot.val().chid;
  console.log(id);
  if(cid==id){
    datab.child(visitorname).set({
      vname:visitorname,
      vphno:visitorphno,
      vadd:visitoradd,
      vrel:visitorrel,
      vdate:visitordate,
      vrea:visitorrea,
      vtime:visitortime
     });
    $("input[type=text], textarea").val("");
    $("input[type=date], textarea").val("");
    $("input[type=gmail], textarea").val("");
    $("input[type=number], textarea").val("");
    $("input[type=time], textarea").val("");
    alert("ADDED");
  }
   else{
  alert("Name and doesn't match");
  } 
});  
}  

}

function vis(){
$('#a1').text("");
$('#b1').text("");
$('#c1').text("");
$('#d1').text("");
$('#e1').text("");
$('#f1').text("");
$('#g1').text("");
var id;         
var user=document.getElementById("na").innerHTML;
var c= document.getElementById("childname1").value;
var cdd=document.getElementById("childidnumber1").value;
var query = firebase.database().ref('registered/'+user+'/children/'+c);
var query1 = firebase.database().ref('registered/'+user+'/children/'+c+'/visit');
if(c=="" || cdd==""){
$("#vups").text("ALL FIELDS ARE MANDATORY");
  setTimeout(function(){
    $("#vups").text(" ");
  },3000);
}
else{

query.once("value").then(function(snapshot) {
 id=snapshot.val().chid;
 console.log(id);
 

query1.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
   // key will be "ada" the first time and "alan" the second time
     var childData = childSnapshot.val();
       var n = childSnapshot.val().vname;
     var a = childSnapshot.val().vphno;
     var g = childSnapshot.val().vadd;
     var jb = childSnapshot.val().vrel;
     var jd = childSnapshot.val().vrea;
     var med = childSnapshot.val().vdate;
     var med1  = childSnapshot.val().vtime;

    if(cdd==id){
      document.getElementById('table3').style.display='block';
      $('#a1').append(n+"<br><br>");
      $('#b1').append(jb+"<br><br>");
      $('#c1').append(a+"<br><br>");
      $('#d1').append(g+"<br><br>");
      $('#e1').append(jd+"<br><br>");
      $('#f1').append(med+"<br><br>");
      $('#g1').append(med1+"<br><br>");
  
    }
    else{
      $("#vups").text("INVALID NAME OR ID");
      setTimeout(function(){
        $("#vups").text(" ");
      },3000);
   }  
 }); 
}); 
});  

}  
}
function forgot(){
var users=document.getElementById('u').value;
localStorage.setItem("fuser",users)
var col=document.getElementById('col').value;
var ref = firebase.database().ref("registered/"+users);
ref.once('value').then(function(snapshot) {
var t = snapshot.child("ouser").exists();
var g = snapshot.child("ocolor").exists();
if(t==true){
var b = snapshot.val().ouser;
var a = snapshot.val().ocolor;
if(b==users){
   if(a==col){
    document.getElementById("colr").style.display='none';
    document.getElementById("re").style.display='block';
   }
   else{
    $("#ss").text("This colour doesnt match try again!");
    setTimeout(function(){
       $("#ss").text(" ");
    },3000);

   }
}
else{
  $("#ss").text("Invalid Username! try again");
    setTimeout(function(){
       $("#ss").text(" ");
    },3000);
 
}

}
else{
$("#ss").text("Invalid Username! try again");
setTimeout(function(){
  $("#ss").text(" ");
},3000);
 
} 
});

}




function uppass(){
var users=localStorage.getItem("fuser");
var npass=document.getElementById('fpass').value;
var nrpass=document.getElementById('frpass').value;
if(npass==nrpass){
var d=firebase.database().ref('registered/'+users);
d.update({
opass:npass
});
$("input[type=password],textarea").val("");
$("#ss").text("UPDATED");
setTimeout(function(){
  $("#ss").text(" ");
},3000);
}
else{
$("#ss").text("Passwords doesnt match");
setTimeout(function(){
  $("#ss").text(" ");
},3000);
}
}

function depar(){
var user=document.getElementById("na").innerHTML;
var child=document.getElementById("cnn").value;
var childid=document.getElementById("cni").value;
var date=document.getElementById("cnd").value;
var reason=document.getElementById("cdi").value;
var id;
if(child=="" || childid=="" || date=="" || reason =="" ){
$("input[type=text], textarea").val("");
$("#der").text("ALL FIELDS ARE MANDATORY");
setTimeout(function(){
  $("#der").text(" ");
},3000);

}
else{
var d=firebase.database().ref('registered/'+user+'/children');
d.child(child).once('value').then(function(snapshot) {
id = snapshot.val().chid;

if(childid==id){
  d.child(child).update({
    departuredate:date,
    departurerea:reason
  });
  $("input[type=text], textarea").val("");
  $("#der").text("UPDATED");
  setTimeout(function(){
    $("#der").text(" ");
  },3000);
}
else{
  $("input[type=text], textarea").val("");
  $("#der").text("Name and ID doesnt match");
  setTimeout(function(){
    $("#der").text(" ");
  },3000);
}  
});
} 

}
function goback(){
$('#ciamg').empty();
document.getElementById('table2').style.display='none';
}

