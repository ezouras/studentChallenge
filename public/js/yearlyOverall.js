$(document).ready(function(){
  let firstYear=2000;
  let lastYear=(new Date()).getFullYear();
  let studentDataByYear={};
  var students;


  for(let i=firstYear;i<=lastYear;i++){
    studentDataByYear[i]={students:[],gpa:0}
  }

  $.getJSON("http://apitest.sertifi.net/api/Students",function(data){
    setStudentDataByYear(data);
  });

  function setStudentDataByYear(students){
    students.forEach((value,index)=>{
      let counter=0;
      for(let i=value.StartYear;i<=value.EndYear;i++){
        let objForYear=studentDataByYear[i];
        let studentObj={};
        studentObj["name"]=value.Name;
        studentObj["gpa"]=value.GPARecord[counter];
        objForYear.students.push(studentObj);
        let gpaForYear=objForYear.gpa+value.GPARecord[counter];
        let averageGPAForYear=gpaForYear/objForYear.students.length;
        objForYear.gpa=averageGPAForYear;
        counter++;
      }
    });
  }

  for(let key in studentDataByYear)
  {
    //console.log("key is ",key);
    let htmlSnippet=`<div class="row data"><div class="col-sm clickYear">${key}</div><div class="col-sm">${studentDataByYear[key].gpa}</div>`;
    $( "#pageTable" ).append(htmlSnippet);
  }

  $(".clickYear").each(function(){
    this.addEventListener("click", function(e) {
        let targetYear=e.target.outerText;
        url = 'studentsByYear.html?' + $.param( studentDataByYear[targetYear]);
        document.location.href = url;
  });
})



});
