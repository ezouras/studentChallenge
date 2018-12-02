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
    setStudentDataByYear(data);
    displayData();
    addListeners();
  })
  .fail(function(){
    console.log("Could not get data. Please check server");
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
        let averageGPAForYear=(objForYear.gpa+value.GPARecord[counter])/2;
        console.log(`the average gpa for the year is ${averageGPAForYear}`)
        objForYear.gpa=averageGPAForYear;
        }
        counter++;
      }
    });
  }
  //Math.round(num * 100) / 100

function displayData(){
  for(var key in studentDataByYear)
  {
    studentGPARounded=round(2,studentDataByYear[key].gpa);
    let htmlSnippet=`<div class="row data">
                      <div class="col-sm clickYear">${key}</div>
                      <div class="col-sm">${studentGPARounded}</div>`;

    $( "#pageTable" ).append(htmlSnippet);

  }
}

function addListeners(){
  $(".clickYear").each(function(){
    this.addEventListener("click", function(e) {
        let targetYear=e.target.outerText;
        url = 'studentsByYear.html?' +targetYear+ $.param( studentDataByYear[targetYear]);
        document.location.href = url;
      });
    })
}

function calculateAverage(number,divider){

}

/* return rounded number */
function round(decimalPlaces,numberToRound){
    let number=1;
    let gpaString;
    for(let i=0;i<decimalPlaces;i++){
      number=number*10;
    }

    gpaRound=Math.round(numberToRound * 100) / 100;
    gpaString=parseFloat(gpaRound).toString();
    if(gpaString=="0")
      gpaString="No data for this year"
    else if(gpaString.length<4)
      gpaString=gpaString+"0";

  return gpaString;
}


});
