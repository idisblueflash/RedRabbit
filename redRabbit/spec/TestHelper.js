PPTs.testHelper = (function(){
  var createDummyPPTs = function(){
    var pptsListStorageKey = "PPTs.PPTsList";
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
