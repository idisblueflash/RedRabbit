PPTs.controller = (function ($, dataContext){
  var pptsListSelector = "#ppts-list-content";
  var noPPTsCachedMsg = "<pre><div>No ppts cached</div></pre>";
  var pptsListPageId = "ppts-list-page";
  var currentPPT = null;
  var pptEditorPageId = "ppt-editor-page";
  var pptTitleEditorSel = "[name=ppt-title-editor]";
  var pptNarrativeEditorSel = "[name=ppt-narrative-editor]";
  var savePPTButtonSel = "#save-ppt-button";
  var invalidPPTDlgSel = "#invalid-ppt-dialog";
  var defaultDlgTrsn = { transition: "slideup"};
  var confirmDeletePPTDlgSel = "#confirm-delete-ppt-dialog";
  var deletePPTButtonSel = "#delete-ppt-button";
  var deletePPTContentPlaceholderSel = "#delete-ppt-content-placeholder";
  var okToDeletePPTButtonSel = "#ok-to-delete-ppt-button";

  var init = function(storageKey) {
    dataContext.init(storageKey);
    var d = $(document);
    d.bind ("pagebeforechange", onPageBeforeChange);
    d.bind ("pagechange", onPageChange);
    d.delegate(savePPTButtonSel, "tap", onSavePPTButtonTapped);
    d.delegate(deletePPTButtonSel, "tap", onDeletePPTButtonTapped);
    d.delegate(okToDeletePPTButtonSel, "tap", onOKToDeletePPTButtonTapped);
  };

  function onOKToDeletePPTButtonTapped(){
    dataContext.deletePPT(currentPPT);
    returnToPPTsListPage();
  }
  function returnToPPTsListPage () {
    $.mobile.changePage("#" + pptsListPageId,
    { transition: "slide", reverse: true });
  }

  function onDeletePPTButtonTapped(){
    if (currentPPT) {
        // Render selected ppt in confirmation dlg.
        // Deletion will be handled elsewhere, after user confirms it's ok to delete.

        var pptContentPlaceholder = $(deletePPTContentPlaceholderSel);

        pptContentPlaceholder.empty();
        $("<h3>" + currentPPT.title + "</h3><div>" 
        + currentPPT.narrative + "</div>").appendTo(pptContentPlaceholder);

        $.mobile.changePage(confirmDeletePPTDlgSel, defaultDlgTrsn);
    }    
  }

  function onSavePPTButtonTapped(){

    // Validate note.
    var titleEditor = $(pptTitleEditorSel);
    var narrativeEditor = $(pptNarrativeEditorSel);
    var tempPPT = dataContext.createBlankPPT();

    tempPPT.title = titleEditor.val();
    tempPPT.narrative = narrativeEditor.val();

    if (tempPPT.isValid()) {

      if (null !== currentPPT) {
        currentPPT.title = tempPPT.title;
        currentPPT.narrative = tempPPT.narrative;
      } else {
        currentPPT = tempPPT;
      }

        dataContext.savePPT(currentPPT);
        returnToPPTsListPage();

      } else {
        $.mobile.changePage(invalidPPTDlgSel, defaultDlgTrsn);
      }    
  }

  function onPageBeforeChange(event, data){
    if (typeof data.toPage === "string"){
      var url = $.mobile.path.parseUrl(data.toPage);
      if ($.mobile.path.isEmbeddedPage(url)){
        data.options.queryString = $.mobile.path.parseUrl(url.hash.replace(/^#/,"")).search.replace("?", "");
      }
    }
  }

  function onPageChange(event, data){
    var toPageId = data.toPage.attr("id");
    var fromPageId = null;

    if (data.options.fromPage){
      fromPageId = data.options.fromPage.attr("id");
    }

    switch (toPageId){
      case pptsListPageId:
        resetCurrentPPT();
        renderPPTsList();
        break;
      case pptEditorPageId:
        if (fromPageId === pptsListPageId){
          renderSelectedPPT(data);
        }
        break;
    }
  }

  function resetCurrentPPT(){
    currentPPT = null;
  }

  function renderSelectedPPT(data){
    var u = $.mobile.path.parseUrl(data.options.fromPage.context.URL) ;
    var re = "^#" + pptEditorPageId;

    if (u.hash.search(re) !== -1){
      var queryStringObj = queryStringToObject(data.options.queryString);
      var titleEditor = $(pptTitleEditorSel);
      var narrativeEditor = $(pptNarrativeEditorSel);
      var pptId = queryStringObj["pptId"];

      if (typeof pptId !== "undefined"){
        // We were passed a note id => We're editing an exsiting ppt.
        var pptsList = dataContext.getPPTsList();
        var pptsCount = pptsList.length;
        var ppt;

        for (var i = 0; i < pptsCount; i++){
          ppt =pptsList[i];
          if (pptId === ppt.id){
            titleEditor.val(ppt.title);
            narrativeEditor.val(ppt.narrative);
            currentPPT = ppt;
          }
        }
      } else {
        // We're creating a new PPT. Reset the fields.
        titleEditor.val("");
        narrativeEditor.val("");
      }
      titleEditor.focus();
    }
  };

  function queryStringToObject(queryString){
    var queryStringObj = {};
    var e;
    var a = /\+/g;  // Replace + symbol with a space
    var r = /([^&;=]+)=?([^&;]*)/g;
    var d = function (s) { return decodeURIComponent(s.replace(a, " ")); };

    e = r.exec(queryString);
    while (e) {
        queryStringObj[d(e[1])] = d(e[2]);
        e = r.exec(queryString);
    }

    return queryStringObj;
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

$(document).bind("mobileinit", function(){
  PPTs.controller.init("PPTs.PPTsListTest");
});
