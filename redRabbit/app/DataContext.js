var PPTs = PPTs || {};

PPTs.dataContext = (function($){
  var pptsList = [];
  var pptsListStorageKey; 
  
  var init = function (storageKey){
    pptsListStorageKey = storageKey;
    loadPPTsFromLocalStorage();
  };
  
  var savePPT = function (pptModel){
    var found = false;
    var i;

    for (i = 0; i < pptsList.length; i += 1) {
        if (pptsList[i].id === pptModel.id) {
            pptsList[i] = pptModel;
            found = true;
            i = pptsList.length;
        }
    }

    if (!found) {
        pptsList.splice(0, 0, pptModel);
    }

    savePPTsToLocalStorage();    
  }; 

  var getPPTsList = function(){
    return pptsList;
  };

  var createBlankPPT = function (){
    var dateCreated = new Date();
    var id = new String(dateCreated.getTime()) + new String(getRandomInt(0, 100));
    var pptModel = new PPTs.PPTModel({
      id: id,
      dateCreated: dateCreated,
      title: "",
      narrative: ""
    });

    return pptModel;
  }; 

  var deletePPT = function (pptModel) {

    var i;
    for (i = 0; i < pptsList.length; i += 1) {
        if (pptsList[i].id === pptModel.id) {
            pptsList.splice(i, 1);
            i = pptsList.length;
        }
    }

    savePPTsToLocalStorage();
  };

  // Private Functions

  function savePPTsToLocalStorage(){
    $.jStorage.set(pptsListStorageKey, pptsList);
  }

  function returnToPPTsListPage(){
    $.mobile.changePage("#" + pptsListPageId, { transition: "slide", reverse: true});
  }

  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function loadPPTsFromLocalStorage(){
    var storedPPTs = $.jStorage.get(pptsListStorageKey);
    if(storedPPTs !== null){
      pptsList = storedPPTs;
    } else {
      pptsList = [];
    }

  }
  function onOKToDeletePPTButtonTapped(){
    dataContext.deletePPT(currentPPT);
    returnToPPTListPage();
  }



  return {
    init: init,
    createBlankPPT: createBlankPPT,
    getPPTsList: getPPTsList,
    savePPT: savePPT,
    deletePPT: deletePPT
  }
})(jQuery);
