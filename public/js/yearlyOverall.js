$(document).ready(function(){
  let firstYear=2000;
  let lastYear=(new Date()).getFullYear();
  let studentDataByYear=[];
  var students;


//[{year:2005, students:[{name:Ross,gpa:},{name:Uday,gpa: 3.7},{name:Harry,gpa:},{name:Inara,gpa:}]]
//set up object
for(let i=firstYear;i<=lastYear;i++){
    studentDataByYear.push({year:i,students:[],gpa:0});
  }

//get data
  $.getJSON("http://apitest.sertifi.net/api/Students",function(){
  })
  .done(function(data){
    setStudents(data);
    setGPA();
    displayData();
    addListeners();
  })
  .fail(function(){
    console.log("Could not get data. Please check server");
  });




  ///***  Functions *** ///

  function setStudents(students){
    students.forEach((value,index)=>{
      let counter=0;
      for(let i=value.StartYear;i<=value.EndYear;i++){
        let yearString=i.toString();//2001
        let arrNumb;
        if(yearString.slice(2,3)==0)
        {
          arrNumb=parseInt(yearString.slice(3,4));
        }
        else{
          arrNumb=parseInt(yearString.slice(2,4));
        }
        let objForYear=studentDataByYear[arrNumb];
        let studentObj={};
        studentObj["name"]=value.Name;
        studentObj["gpa"]=value.GPARecord[counter];
        objForYear.students.push(studentObj);
        counter++;
      }
    });
    //console.log(studentDataByYear);
  }

    function setGPA(){
      studentDataByYear.forEach((value,index)=>{
        let length=value.students.length;
        let total=value.students.reduce((acc,nV)=>{
          acc=acc+nV.gpa;
          return acc+value.gpa;
        },0);
        let averageGPA=total/length;
        value.gpa= round(2,averageGPA);
      })
    }

  function displayData(){
    studentDataByYear.forEach((value,index)=>{
      let htmlSnippet=`<div class="row data">
                        <div class="col-sm clickYear">${value.year}</div>
                        <div class="col-sm  text-center">${value.students.length}</div>
                        <div class="col-sm  text-center">${value.gpa}</div>`;

      $( "#pageTable" ).append(htmlSnippet);
    })
  }

  function addListeners(){
    $(".clickYear").each(function(){
      this.addEventListener("click", function(e) {
          let targetYear=e.target.outerText;
          let obj = studentDataByYear.find(obj => obj.year == targetYear);
          url = 'studentsByYear.html?' + $.param(obj);
          document.location.href = url;
        });
      })
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
      if(isNaN(gpaString))
        gpaString="No data for this year"
      else if(gpaString.length<4)
        gpaString=gpaString+"0";

    return gpaString;
  }

});
