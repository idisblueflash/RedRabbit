PPTs.controller = (function ($, dataContext){
  var pptsListSelector = "#ppts-list-content";
  var noPPTsCachedMsg = "<pre><div>No ppts cached</div></pre>";
  var pptsListPageId = "ppts-list-page";
  var currentPPT = null;

  var init = function() {
    dataContext.init();
    var d = $(document);
    d.bind ("pagechange", onPageChange);
  };

  function onPageChange(event, data){
    var toPageId = data.toPage.attr("id");
    switch (toPageId){
      case pptsListPageId:
        renderPPTsList();
        break;
    }
  }

  function renderPPTsList(){
    var pptsList = dataContext.getPPTsList();
    var view = $(pptsListSelector);
    view.empty();

    if (pptsList.length === 0){
      $(noPPTsCachedMsg).appendTo(view);
    } else {
      var pptsCount = pptsList.length;
      var ppt;
      var ul = $("<ul id=\"ppts-list\" data-role=\"listview\"></ul>").appendTo(view);

      for (var i = 0; i < pptsCount; i++){
        ppt = pptsList[i];
        $("<li>"
        + "<a data-url=\"index.html#ppt-editor-page?pptId=" + ppt.id 
        + "\" href=\"index.html#ppt-editor-page?pptId=" + ppt.id + "\">"
        + "<div>" + ppt.title + "</div>"
        + "<div class=\"list-item-narrative\">" + ppt.narrative + "</div>"
        + "</a>"
        + "</li>").appendTo(ul);
      }
      ul.listview();
    }
  };

  return {
    init: init
  }
})(jQuery, PPTs.dataContext);
