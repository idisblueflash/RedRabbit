PPTs.testHelper = (function(){
  var createDummyPPTs = function(pptsListStorageKey){
    var pptsCount = 10;
    var ppts = [];

    for (var i = 0; i < pptsCount; i++){
      var ppt = PPTs.dataContext.createBlankPPT();
      ppt.title = "Title " + i;
      ppt.narrative= "Narrative " + i;
      ppts.push(ppt);
    }

    $.jStorage.set(pptsListStorageKey, ppts);
  };

  return {
    createDummyPPTs: createDummyPPTs
  }
})();

Slides.testHelper = (function(){
  var createDummySlides = function(){
    var slidesListStorageKey = "Slides.SlidesListTest";
    var slidesCount = 6;
    var slides = [];

    for (var i = 0; i < slidesCount; i++){
      var slide = Slides.dataContext.createBlankSlide();
      slide.title = "Title " + i;
      slide.type = "Type " + i;
      slides.push(slide);
    }
    $.jStorage.set(slidesListStorageKey,slides);
  };

  return {
    createDummySlides: createDummySlides
  }
})();
