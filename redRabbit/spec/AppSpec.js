describe("DataContext Test", function(){

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
});
