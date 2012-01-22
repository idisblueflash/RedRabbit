/*
# vars
*/
var pptList;


/*
# creat_page ()
#
# create new page in JQM
#
# page_id       - id of page
# page_content  - content of this page
#
# example:
#  creat_page(page_id,page_content);
#
*/
function creat_page(page_id,page_content){
   // remove empty input
   if (page_id === ""){
     return ;
   }
   //append the new page onto the end of the body
   var pageStart = "<div data-role=page id=" + page_id + ">" ;
   var pageContentStart = "<div data-role=content>";
   var pageContentEnd = "</div>";
   var pageContent = pageContentStart + page_content + pageBackButton + pageContentEnd ;
   var pageTitle = "<div data-role=header><h1>" + page_id + "</h1></div>";
   var pageBackButton = "<a href=#home data-role=button>Back</a>";
   var pageEnd   = "</div>";
   var finalPage = pageStart + pageTitle + pageContent + pageEnd ;
    $('#page_body').append(finalPage);

    //initialize the new page 
    $.mobile.initializePage();

    // test for nav to new page
    $('#' + page_id).page();
}

/*
# After everything is ok.
*/

  $(document).ready(function(){
    // when submit new ppt name
    $('#newPPT').click(function(){
      var pptName = $('#name')[0].value;
      $('#debug').html(pptName);

      // make xxx ppt div
      creat_page(pptName, "<a href=#newSlide data-role=button>New Slide</a>");
    }); 
  })
