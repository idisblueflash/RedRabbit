var PPTs = PPTs || {};

PPTs.dataContext = (function(){
  var pptsList = [];
  var pptsListStorageKey = "PPTs.PPTsList";
  
  var init = function (){
    loadPPTsFromLocalStorage();
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

  // Private Functions

  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function loadPPTsFromLocalStorage(){
    var storedPPTs = $.jStorage.get(pptsListStorageKey);
    if(storedPPTs !== null){
      pptsList = storedPPTs;
    }
  }


  return {
    init: init,
    createBlankPPT: createBlankPPT,
    getPPTsList: getPPTsList
  }
})();
