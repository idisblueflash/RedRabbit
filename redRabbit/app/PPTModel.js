PPTs.PPTModel = function (obj){
  this.id = obj.id;
  this.dateCreated = obj.dateCreated;
  this.title = obj.title;
  this.narrative = obj.narrative;
}

PPTs.PPTModel.prototype.isValid = function(){
  "use strict";
  if (this.title && this.title.length > 0){
    return true;
  }
  return false;
};
