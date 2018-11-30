$(document).ready(function(){
  let firstYear=2000;
  let lastYear=(new Date()).getFullYear();
  let studentDataByYear={};
  var students;


//set up object
  for(let i=firstYear;i<=lastYear;i++){
    studentDataByYear[i]={students:[],gpa:0}
  }

//get data
  $.getJSON("http://apitest.sertifi.net/api/Students",function(){
  })
  .done(function(data){
    console.log("success json data !",data);
    setStudentDataByYear(data);
    displayData();
    addListeners();
  })
  .fail(function(){
    console.log("Could not get data");
  });



  ///***  Functions *** ///

  function setStudentDataByYear(students){
    students.forEach((value,index)=>{
      let counter=0;
      for(let i=value.StartYear;i<=value.EndYear;i++){
        let objForYear=studentDataByYear[i];
        let studentObj={};
        studentObj["name"]=value.Name;
        studentObj["gpa"]=value.GPARecord[counter];
        objForYear.students.push(studentObj);
        if(objForYear.students.length===1)
        {
          objForYear.gpa=value.GPARecord[counter];
        }
        else{
        let gpaForYear=(objForYear.gpa+value.GPARecord[counter])/2;
        //let averageGPAForYear=gpaForYear/objForYear.students.length;
        //console.log(`the average gpa for the year is ${gpaForYear}`)
        objForYear.gpa=gpaForYear;
        }
        counter++;
      }
    });
  }
  //Math.round(num * 100) / 100

function displayData(){
  for(var key in studentDataByYear)
  {

    studentGPA=studentDataByYear[key].gpa;
    gpaRound=Math.round((studentDataByYear[key].gpa) * 100) / 100;
    let gpaString=parseFloat(gpaRound).toString();
    if(gpaString=="0")
      gpaString="No data for this year"
    else if(gpaString.length<4)
      gpaString=gpaString+"0";
    //let twoInts=gpaString.splice(3);
    //console.log(twoInts);
    let htmlSnippet=`<div class="row data">
                      <div class="col-sm clickYear">${key}</div>
                      <div class="col-sm">${gpaString}</div>`;

    $( "#pageTable" ).append(htmlSnippet);

  }
}

function addListeners(){
  $(".clickYear").each(function(){
    this.addEventListener("click", function(e) {
        let targetYear=e.target.outerText;
        url = 'studentsByYear.html?' + $.param( studentDataByYear[targetYear]);
        document.location.href = url;
      });
    })
}




});
