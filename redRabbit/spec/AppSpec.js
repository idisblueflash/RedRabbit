describe("DataContext Test", function(){

  var pptsListStorageKey = "PPTs.PPTsListTest";

  it("Defines the dataContext", function(){
    expect(PPTs.dataContext).toBeDefined;
  });

  it("Should have public interface to return PPTs list", function(){
    expect(PPTs.dataContext.getPPTsList).toBeDefined();
  });

  it("Should return notes list", function(){
    var pptsList = PPTs.dataContext.getPPTsList();
    expect(pptsList instanceof Array).toBeTruthy();
  });

  it("Returns a blank note", function(){
    var blankPPT = PPTs.dataContext.createBlankPPT();
    expect(blankPPT.title.length === 0 ).toBeTruthy();
    expect(blankPPT.narrative.length === 0 ).toBeTruthy();
  });

  it("Has init function", function (){
    expect(PPTs.dataContext.init).toBeDefined();
  });

  it("Returns dummy ppts saved in local storage", function(){
    PPTs.testHelper.createDummyPPTs(pptsListStorageKey);
    PPTs.dataContext.init(pptsListStorageKey);

    var pptsList = PPTs.dataContext.getPPTsList();
    expect(pptsList.length > 0 ).toBeTruthy();
    $.jStorage.deleteKey(pptsListStorageKey);
  });

  it("Make sure LS is empty before the test", function(){
    $.jStorage.deleteKey(pptsListStorageKey);
    var pptsList = $.jStorage.get(pptsListStorageKey);
    expect(pptsList).toBeNull();
  });

  it("Create a ppt", function(){
    $.jStorage.deleteKey(pptsListStorageKey);
    var pptsList = $.jStorage.get(pptsListStorageKey);
    expect(pptsList).toBeNull();

    var dateCreated = new Date();
    var id = dateCreated.getTime().toString();
    var pptModel = new PPTs.PPTModel({
      id: id,
      dateCreated: dateCreated,
      title: ""
    });
    
    PPTs.dataContext.init(pptsListStorageKey);
    PPTs.dataContext.savePPT(pptModel);
    // Should retrieve the saved ppt.
    pptsList = $.jStorage.get(pptsListStorageKey);
    var expectedPPT = pptsList[0];
    expect(expectedPPT.title === "").toBeTruthy();

    // Clean up
    $.jStorage.deleteKey(pptsListStorageKey);
  });


});
