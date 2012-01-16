/*
  PICTURE EXAM SYSTEM
*/

   var debugSwitch = 0 ;
    /*
    # init  words
    */

    /*
    # prepareWords() function
    #
    # load words from server
    #
    # levelNumber       - 0-60, levels need to load
    # reArray           - array to return
    #
    # example
    #  var myArray = prepareWords();
    # Returns: array with words
    */

    function prepareWords(levelNumber){
        var reArray = new Array();
        var orgArray = wordGroups[levelNumber].words;
        for(var i=0;i<orgArray.length;i++) 
            reArray[i] = orgArray[i];
        return reArray;
    }
    
    /*
    # debug Function
    #
    # show messages on debug div
    #
    # msg       - messages need to show
    #
    # example:
    # debug('foxy');
    # Returns: <div id=debug>foxy<p></div>
    */
    function debug(msg){
      if ( debugSwitch ) {
        $('#debug').append(msg);
        $('#debug').append('<p>');
      }
    }

    /*
    # generate3moreOptions function
    #
    # generate 3 more options, and filter the answer
    #
    # items             - array to pick up
    # notThisItem       - item to filte
    #
    # example
    #  var myArray = generate3moreOptions(items,notThisItem)
    # Returns: the array content 3 other options
    */
    function generate3moreOptions(items,notThisItem){
        var options = new Array();
        var count   = 0 ;
        while ( count < 3 ){
            var pickedItem = randomPickFrom(items); 
            if ( pickedItem != notThisItem){
                options.push(pickedItem);
                count++;
            } 
        }
        return options;
    }



    /*
    # showPictures() function
    #
    # divname           - the box/div which img will in
    # wordname          - picture name of word
    # 
    # example
    # showPictures('paper','pig');
    # Returns: add <img src="xxx\wordname.gif">
    */
    function showPictures(divname,wordname){
        $('#'+divname).append('<div class=picture ><img width=150 id="' + divname +'" src="img/words/' + wordname +'.gif" /></div>');
    }

      /*
    # addDiv() function
    #
    # divname           - the divname which will add
    # subdivname        - the sub div name which will add
    #
    # example
    #  addDiv('title','subtitle');
    # Returns: add <div id=title></div>
    */
    function addDiv(divname,subdivname){
        $('#'+divname).append('<div class=question id='+ subdivname + '></div>');
    }

    /*
    # makeNewPage() function
    # 
    # make a new page below for print 
    #
    # example
    #  makeNewPage();
    # Returns: <div class=page>
    */
    function makeNewPage(){
        $('#paper').append('<div class=page>');
    }

    /*
    # addNewDiv() function
    # 
    # divParent         - the box/div which div will in
    # divDetail         - text of div inside 
    # divId             - id of div 
    #
    # example
    #  showTitle(divParent,divId,divDetail);
    # Returns: add <div id=divId>divDetail</div> in divParent
    */
    function addNewDiv(divParent,divId,divDetail){
        $('#'+divParent).append('<div id=' + divId + '>' + divDetail+ '</div>');
    }

    /*
    # showTitle() function
    # 
    # divname           - the box/div which img will in
    # titleDetail       - text of title 
    #
    # example
    #  showTitle(divname,titleDetail);
    # Returns: add <div id=titile>titleDetail</div> in divname
    */
    function showTitle(divname,titleDetail){
        $('#'+divname).append('<div id=title>' + titleDetail+ '</div>');
    }

    /*
    # divAddBr() function
    # 
    # divname           - the box/div which img will in
    #
    # example
    #  divAddBr(divname);
    # Returns: add <br> in divname
    */
    function divAddBr(divname,titleDetail){
        $('#'+divname).append('<br>');
    }

    /*
    # shuffle function 
    #+ Jonas Raoni Soares Silva
    #@ http://jsfromhell.com/array/shuffle [v1.0]
    #
    # shuffle array's items
    #
    # items         - array need to shuffle 
    #
    # example
    #  shuffle(items);
    # Returns: shuffled items
    */
    shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;   
    };

    /*
    # randomPickFrom function 
    #
    # generate random option from array
    #
    # items             - array 
    #
    # example
    #  var item = randomPickFrom(items);
    # Returns: random item.
    */
    function randomPickFrom(items){
        var item = items[Math.floor(Math.random()*items.length)];
        return item;
    }

    /*
    # showChoices() function
    #
    # add choices' div
    #
    # divname           - div will add in
    # subdivename       - choices name will add 
    # 
    # example
    #  showChoices(divname,subdivname);
    # Returns: add <div id=choices></div> in divname
    */
    function showChoices(divname,subdivname){
        $('#'+divname).append('<div class=choice id=' + subdivname + '></div>');
    }

/*
# scrambleWord() Function
#
# word      - word need to scramble
# 
# example:
#  var scrambledWord = scrambleWord(word) ;
# Returns: word = 'apple';
#          scrambleWord = 'p a p e l';
*/
function scrambleWord(word){
  var splitedArray = word.split("");
  var shuffledArray = shuffle(splitedArray);
  var joinedWord = shuffledArray.join(" , "); 
  return joinedWord;
}

/*
# makeExam function
#
# make exam by levels, book and theme
#
# 
*/
function makeExam(){
   
    var checkedWords = []; 
    $('#contrl :checkbox:checked').each(function(){
          checkedWords.push( $(this).val());
              });
    debug(checkedWords.join());

    var examArray = [];
    // get all word list by checkedWords 
    if ( checkedWords.length == 1) {
      examArray = prepareWords(checkedWords[0]); 
    }else{
      for (var i=0; i<checkedWords.length; i++){
        var tempArray = prepareWords(checkedWords[i]) ;
        examArray = examArray.concat(tempArray);
        debug(examArray.join());
      }
    }

    var answerArray = new Array();

    

    var mode = "choice"; // can be choice, scrambled and blank
        mode = "blank";
        mode = "scrambled";

    mode = $("#contrl :radio:checked").val();
    debug(mode);

    // clean paper.div
    $('#paper').text('');

    for(var i=0; i<examArray.length; i++){
       /*
       # prepare vars need
       */
       var currentDiv = 'question' + i; 
       var currentChoices = 'choices' + i;
       var questionNumber = i + 1;
       var title = 'No. '+ questionNumber ;
       answerArray.push(title + ' ' + examArray[i] );
       var choices = generate3moreOptions(examArray,examArray[i]);
       choices.push(examArray[i]);
       shuffle(choices);


       if ( mode == 'choice'){
       /*
       # show choice items
       */
       addDiv('paper',currentDiv);
          showTitle(currentDiv,title);
          showPictures(currentDiv,examArray[i]);
          showChoices(currentDiv,currentChoices);
          showAnswerKey(currentChoices,choices[0],examArray[i]);
          showAnswerKey(currentChoices,choices[1],examArray[i]);
          showAnswerKey(currentChoices,choices[2],examArray[i]);
          showAnswerKey(currentChoices,choices[3],examArray[i]);
       }
       else if (mode == 'scrambled'){
       /*
       # show scrambled items
       */
       addDiv('paper',currentDiv);
          showTitle(currentDiv,title);
          showPictures(currentDiv,examArray[i]);
          var answerkey = examArray[i];
          var scrambledAnswer = scrambleWord(answerkey);
          // add new div for Scrambled word
          addNewDiv(currentDiv,'scrambled',scrambledAnswer);

          // add new div for Underline/Blank
          // addNewDiv(currentDiv,'blank','__________________________');
       }
       else if ( mode == 'blank' ){
       /*
       # show blank items
       */
       addDiv('paper',currentDiv);
          showTitle(currentDiv,title);
          showPictures(currentDiv,examArray[i]);
          // add new div for Underline/Blank
          addNewDiv(currentDiv,'blank','__________________________');
       }
       
       }
}


    /*
    # shuffle function 
    #+ Jonas Raoni Soares Silva
    #@ http://jsfromhell.com/array/shuffle [v1.0]
    #
    # shuffle array's items
    #
    # items         - array need to shuffle 
    #
    # example
    #  shuffle(items);
    # Returns: shuffled items
    */
    shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;   
    };


