var PPTs = PPTs || {};

PPTs.dataContext = (function(){

  var pptsList = [];
  
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

  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    createBlankPPT: createBlankPPT,
    getPPTsList: getPPTsList
  }
})();
