$(document).ready(function(){

    let url = document.location.href;
    let yearObj=jQuery.deparam(decodeURIComponent(url.split('?')[1]));
    //console.log(yearObj)
    let year=(Object.keys(yearObj)[0]).slice(0,4);
    $('#year').text(year+" ");
    populateTable(yearObj);



    function populateTable(yearObj){
        let students = yearObj["students"];
        for(let i=1;i<students.length;i++){
          let student=students[i];
          let htmlSnippet=`<div class="row">
                            <div class="col-4 text-center">${student.name}</div>
                            <div class="col-4 text-center">${student.gpa}</div>
                          </div>`;
          $( "#pageTable" ).append(htmlSnippet);
        }
      }
});
