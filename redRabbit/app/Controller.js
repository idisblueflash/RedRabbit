PPTs.controller = (function ($, dataContext){
  var pptsListSelector = "#ppts-list-content";
  var noPPTsCachedMsg = "<pre><div>No ppts cached</div></pre>";
  var pptsListPageId = "ppts-list-page";
  var currentPPT = null;
  var pptEditorPageId = "ppt-editor-page";

  // Editor Block Selector
  var pptTitleEditorSel = "[name=ppt-title-editor]";
  var pptNarrativeEditorSel = "[name=ppt-narrative-editor]";
  var invalidPPTDlgSel = "#invalid-ppt-dialog";
  var defaultDlgTrsn = { transition: "slideup"};
  var confirmDeletePPTDlgSel = "#confirm-delete-ppt-dialog";
  var deletePPTContentPlaceholderSel = "#delete-ppt-content-placeholder";

  // Button Selector 
  var savePPTButtonSel = "#save-ppt-button";
  var deletePPTButtonSel = "#delete-ppt-button";
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

    // Validate ppt.
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
        // We were passed a ppt id => We're editing an exsiting ppt.
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

Slides.controller = (function ($, dataContext){
  var slidesListSelector = "#slides-list-content";
  var noSlidesCachedMsg = "<div>No Slides cached.</div>";
  var slidesListPageId = "slides-list-page";
  var slideEditorPageId = "slide-editor-page";
  var slideTitleEditorSel = "[name=slide-title-editor]";
  var slideTypeEditorSel = "[name=slide-type-editor]";
  var currentSlide = null;
  var saveSlideButtonSel = "#save-slide-button";
  var invalidSlideDlgSel = "#invalid-slide-dialog";
  var defaultDlgTrsn = { transition: "slideup"} ;
  var confirmDeleteSlideDlgSel = "#confirm-delete-slide-dialog";
  var deleteSlideButtonSel = "#delete-slide-button";
  var deleteSlideContentPlaceholderSel = "#delete-slide-content-placeholder";
  var okToDeleteSlideButtonSel = "#ok-to-delete-slide-button";


  var init = function(storageKey){
    dataContext.init(storageKey);
    // Slides.testHelper.createDummySlides(storageKey);
    var d = $(document);
    d.bind("pagebeforechange", onPageBeforeChange);
    d.bind("pagechange", onPageChange);
    d.delegate(saveSlideButtonSel, "tap", onSaveSlideButtonTapped);
    d.delegate(deleteSlideButtonSel, "tap", onDeleteSlideButtonTapped);
    d.delegate(okToDeleteSlideButtonSel, "tap", onOKToDeleteSlideButtonTapped);
  };

  // Private functions

  function onOKToDeletePPTButtonTapped(){
    dataContext.deleteSlide(currentSlide);
    returnToSlidesListPage();
  }
  
  function onDeleteSlideButtonTapped(){
    if (currentSlide){
      // Render seleted slide in confirmation dlg.
      // Deletion will be handled elsewise, after user confirms it's ok to delete.
      var slideContentPlaceholder = $(deleteSlideContentPlaceholderSel);
      slideContentPlaceholder.empty();
      $("<h3>" + currentSlide.title + "</h3>"
      + "<div>" + currentSlide.type + "</div>"
      ).appendTo(slideContentPlaceholder)
      $.mobile.changePage(confirmDeleteSlideDlgSel, defaultDlgTrsn);
    }
  }

  function onSaveSlideButtonTapped (){
    // Validate slide.
    var titleEditor = $(slideTitleEditorSel);
    var typeEditor = $(slideTypeEditorSel);
    var tempSlide = dataContext.createBlankSlide();

    tempSlide.title = titleEditor.val();
    tempSlide.type  = typeEditor.val();

    if(tempSlide.isValid()){
      if (null !== currentSlide){
      currentSlide.title = tempSlide.title;
      currentSlide.type  = tempSlide.type;
      } else {
      currentSlide = tempSlide;
      }

      dataContext.saveSlide(currentSlide);
      returnToSlideListPage();
      } else {
        $.mobile.changePage(invalidSlideDlgSel, defaultDlgTrsn);
      }
  }

  function returnToSlideListPage(){
    $.mobile.changePage("#" + slidesListPageId, { transition: "slide", reverse: true});
  }

  function onPageBeforeChange (event, data){
    if (typeof  data.toPage === "string"){
      var url = $.mobile.path.parseUrl(data.toPage);
      if($.mobile.path.isEmbeddedPage(url)){
        data.options.queryString = $.mobile.path.parseUrl(url.hash.replace(/^#/, "")).search.replace("?", "");
      }
    }
  }

  function renderSelectedSlide(data){
    var u = $.mobile.path.parseUrl(data.options.fromPage.context.URL);
    var re = "^#" + slideEditorPageId;
    if (u.hash.search(re) !== -1){
      var queryStringObj = queryStringToObject(data.options.queryString);
      var titleEditor = $(slideTitleEditorSel);
      var typeEditor = $(slideTypeEditorSel);
      var slideId = queryStringObj["slideId"];

      if(typeof slideId !== "undefined"){
        // We were passed a slide id => We're editing an existing slide.
        var slidesList = dataContext.getSlidesList();
        var slidesCount = slidesList.length;
        var slide;

        for(var i = 0; i < slidesCount; i++){
          slide = slidesList[i];
          if(slideId === slide.id){
            currentSlide = slide;
            titleEditor.val(currentSlide.title);
            typeEditor.val(currentSlide.type);
          }
        }
      } else {
        // We're creating a slide. Reset the fields.
        titleEditor.val("");
        typeEditor.val("");
      }
      titleEditor.focus();
    }
  }

  function queryStringToObject (queryString){
    var queryStringObj = {};
    var e;
    var a = /\+/g; // Replace + symbol with a space
    var r = /([^&;=]+)=?([^&;]*)/g;
    var d = function (s) { return decodeURIComponent(s.replace(a, " "));};
    e = r.exec(queryString);
    while(e){
      queryStringObj[d(e[1])] = d(e[2]);
      e = r.exec(queryString);
    }

    return queryStringObj;
  }

  function resetCurrentSlide(){
    currentSlide = null;
  }

  function onPageChange(event, data){
    var toPageId = data.toPage.attr("id");
    var fromPageId = null;

    if (data.options.fromPage){
      fromPageId = data.options.fromPage.attr("id");
    }
    switch(toPageId){
      case slidesListPageId:
        resetCurrentSlide(); // Reset refernece to the slide being edited.
        renderSlidesList();
        break;
      case slideEditorPageId:
        if (fromPageId === slidesListPageId){
          renderSelectedSlide(data);
        }
        break;
    }
  }

  function renderSlidesList(){
    var slidesList = dataContext.getSlidesList();
    var view = $(slidesListSelector);
    view.empty();

    if(slidesList.length === 0){
      // No data in LS
      $(noSlidesCachedMsg).appendTo(view);
    } else {
      // Has some datas in LS
      var slidesCount = slidesList.length;
      var slide;
      var ul = $("<ul id=\"slides-list\" data-role=\"listview\"></ul>").appendTo(view);

      for (var i = 0; i < slidesCount; i++){
        slide = slidesList[i];
        $("<li>"
        + "<a data-url=\"index.html#slide-editor-page?slideId=" + slide.id
        + "\" href=\"index.html#slide-editor-page?slideId=" + slide.id + "\">"
        + "<div class=\"list-item-title\">" + slide.title+ "</div>"
        + "<div class=\"list-item-type\">" + slide.type + "</div>"
        + "</a>"
        + "</li>").appendTo(ul);
      }
      ul.listview();
    }
  }
  
  return {
    init: init
  }
})(jQuery, Slides.dataContext);
$(document).bind("mobileinit", function(){
  PPTs.controller.init("PPTs.PPTsList");
  Slides.controller.init("Slides.SlidesList");
});
