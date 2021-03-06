describe("PPTs.DataContext Test", function(){

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

  it("Removes a ppt from local storage", function(){
          // Create a ppt.
        var dateCreated = new Date();
        var id = new String(dateCreated.getTime()).toString();
        var pptModel = new PPTs.PPTModel({
            id: id,
            dateCreated: dateCreated,
            title: "",
            narrative: ""
        });

        // Start with an empty ppts list.
        var pptsList = [];
        // Add ppt to local storage.
        pptsList.push(pptModel);
        $.jStorage.set(pptsListStorageKey, pptsList);
        pptsList = $.jStorage.get(pptsListStorageKey);
        expect(pptsList.length).toEqual(1);

        // Proceed to delete.
        PPTs.dataContext.init(pptsListStorageKey);
        PPTs.dataContext.deletePPT(pptModel);

        // Should retrieve empty array
        pptsList = $.jStorage.get(pptsListStorageKey);
        expect(pptsList.length).toEqual(0);

        // Clean up
        $.jStorage.deleteKey(pptsListStorageKey);
  });

});

describe("Slides.dataContext Test", function(){

  var slidesListStorageKey = "Slides.SlidesListTest";
  it("Slides exists in the app", function(){
    expect(Slides.dataContext).toBeDefined();
  });

  it("Returns slides Array", function(){
    var slidesList = Slides.dataContext.getSlidesList();
    expect(slidesList instanceof Array).toBeTruthy();
  });

  it("Returns a blank slide", function(){
    var blankSlide = Slides.dataContext.createBlankSlide();
    expect(blankSlide.title.length === 0 ).toBeTruthy();
    expect(blankSlide.type.length === 0 ).toBeTruthy();
  });

  it("Has init function", function(){
    expect(Slides.dataContext.init).toBeDefined();
  });

  it("Returns dummy slides saved in local storage", function(){
    Slides.testHelper.createDummySlides();
    Slides.dataContext.init(slidesListStorageKey);

    var slidesList = Slides.dataContext.getSlidesList();
    expect(slidesList.length > 0).toBeTruthy();
  });

  it("Save a slide to local storage", function(){
    // Make sure LS is empty before the test.
    $.jStorage.deleteKey(slidesListStorageKey);
    var slidesList = $.jStorage.get(slidesListStorageKey);
    expect(slidesList).toBeNull();

    // Create a slide.
    var dateCreated = new Date();
    var id = dateCreated.getTime().toString();
    var slideModel = new Slides.SlideModel({
      id: id,
      dateCreated: dateCreated,
      title: ""
    });

    Slides.dataContext.init(slidesListStorageKey);
    Slides.dataContext.saveSlide(slideModel);

    // Should retrieve the saved slide.
    slidesList = $.jStorage.get(slidesListStorageKey);
    var expectedSlide = slidesList[0];

    expect(expectedSlide.title === "" ).toBeTruthy();

    // Clean up
    $.jStorage.deleteKey(slidesListStorageKey);

  });

  it("Removes a slide from local storage", function(){
    // Create a slide
    var dateCreated = new Date();
    var id = new String(dateCreated.getTime()).toString();
    var slideModel = new Slides.SlideModel({
      id: id,
      dateCreated: dateCreated,
      title: "",
      type: ""
    });

    // Start with an empty slides list.
    var slidesList = [];
    // Add slide to local storage
    slidesList.push(slideModel);
    $.jStorage.set(slidesListStorageKey, slidesList);
    slidesList = $.jStorage.get(slidesListStorageKey);
    expect(slidesList.length).toEqual(1);

    // Proceed to delete.
    Slides.dataContext.init(slidesListStorageKey);
    Slides.dataContext.deleteSlide(slideModel);

    // Should retrieve empty array
    slidesList = $.jStorage.get(slidesListStorageKey);
    expect(slidesList.length).toEqual(0);

    // Clean up
    $.jStorage.deleteKey(slidesListStorageKey);
  });

});
