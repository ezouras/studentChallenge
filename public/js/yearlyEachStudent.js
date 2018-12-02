$(document).ready(function(){
    let url = document.location.href;
    let yearObj=jQuery.deparam(decodeURIComponent(url.split('?')));
    let students=yearObj.students;
    populateTable();

    function populateTable(yearObj){
      for(let i=0;i<students.length;i++){
        let student=students[i];
        let htmlSnippet=`<div class="row">
                          <div class="col-4 text-center">${student.name}</div>
                          <div class="col-4 text-center">${student.gpa}</div>
                        </div>`;
        $( "#pageTable" ).append(htmlSnippet);
      }
    }

});
