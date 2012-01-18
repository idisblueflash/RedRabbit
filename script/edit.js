/*
  PICTURE EXAM SYSTEM
*/

   var debugSwitch = 0 ;
    /*
    # init  words
    */
    var wordGroups = new Array();
    wordGroups = [
        { "level" : 1,  "type" : "animal",              "words" : 
            ["fish", "frog", "giraffe", "goat", "hippo", "horse", "lizard", "monkey", "mouse", "sheep", "snake", "spider", "mice", "tail", "zoo", "tiger", "bird", "cat", "chicken", "cow", "crocodile", "dog", "duck", "elephant" ]
        },
        { "level" : 2,  "type" : "animal",              "words" : 
            ["bat", "bear","cage","dolphin","fly","jungle","kangaroo","kitten","lion","panda","parrot","pet","puppy","rabbit","shark" ,"whale"]
        },
        { "level" : 3,  "type" : "animal",              "words" : 
            ["butterfly","camel","dinosaur","extinct","fur","insect","octopus","swan","wing"]
        },
        { "level" : 1,  "type" : "The body & face",     "words" : 
            ["arm", "body", "ear", "eye", "face", "foot", "hair", "feet", "hand", "head", "leg", "mouth", "nose", "smile"]
        },
        { "level" : 2,  "type" : "The body & face",     "words" : 
            ["back","moustache" ,"beard","neck" ,"blonde", "tooth", "shoulder","bottom" ,"stomach","curly" ,"straight","fair" ,"thin","fat" ,"blond", "teeth"]
        },
        { "level" : 1,  "type" : "clothes",              "words" : 
            ["bag", "clothes", "dress", "glasses", "handbag", "hat", "jacket", "jeans", "shirt", "shoe", "skirt", "sock", "trousers", "T-shirt", "watch", "wear",                ]
        },
        { "level" : 2,  "type" : "clothes",              "words" : 
            ["coat", "scarf", "sweater"                ]
        },
        { "level" : 3,  "type" : "clothes",              "words" : 
            ["belt", "glove", "pocket", "ring", "shorts", "spot", "spotted", "stripe", "striped", "tights", "umbrella", "uniform"]
        }
        ,
        { "level" : 1,  "type" : "colours",              "words" : 
            ["black","blue","brown","colour","green","grey","orange","pink","purple","red","white","yellow"            ]
        }
        ,
        { "level" : 2,  "type" : "colours",              "words" : 
            ["gold", "silver" ,  "spot" , "spotted" , "stripe" , "striped"                  ]
        }
        ,
        { "level" : 1,  "type" : "family&friends",              "words" : 
            ["baby", "boy", "brother", "child", "children", "cousin", "dad", "daddy", "family", "father", "friend", "girl", "grandfather", "grandma", "grandmother", "grandpa", "live", "man", "men", "mother", "mum", "mummy", "old", "person", "people", "sister", "woman", "women", "young" ]
        }
        ,
        { "level" : 2,  "type" : "family&friends",              "words" : 
          ["aunt", "daughter", "granddaughter", "grandparent", "grandson", "grow-up", "parent", "son", "uncle"]
        }
        ,
        { "level" : 3,  "type" : "family&friends",              "words" : 
          ["husband", "married", "surname", "wife"]
        }
        ,
        { "level" : 1,  "type" : "food&drink",              "words" : 
          [ "apple", "banana", "bean", "bread", "breakfast", "burger", "cake", "carrot", "chicken", "chips", "coconut", "dinner", "drink", "eat", "egg", "fish", "food", "fries", "fruit", "grape", "ice-cream", "juice", "lemon", "lemonade", "lime", "lunch", "mango", "meat", "milk", "onion", "orange", "pea", "pear", "pineapple", "potato", "rice", "sausage", "supper", "tomato", "water", "watermelon" ]
        }
        ,
        { "level" : 2,  "type" : "food&drink",              "words" : 
          ["bottle", "bowl", "cheese", "coffee", "cup", "glass", "hungry", "pasta", "picnic", "salad", "sandwich", "soup", "tea", "thirsty", "vegetable"]
        }
        ,
        { "level" : 3,  "type" : "food&drink",              "words" : 
          ["biscuit", "butter", "candy", "cookie", "sweet", "pizza", "plate", "chocolate", "chopsticks", "flour", "fork", "salt", "smell", "taste", "jam", "knife", "meal", "pepper", "piece", "snack", "spoon", "sugar"]
        }
        ,
        { "level" : 2,  "type" : "health",              "words" : 
          ["cold", "cry", "doctor", "earache", "cough", "fine", "headache", "hospital", "hurt", "matter", "nurse", "stomach-ache", "temperature", "tired", "toothache" ]
        }
        ,
        { "level" : 3,  "type" : "health",              "words" : 
          [ "chemist", "cut", "dentist", "fall", "fall-over", "ill", "medicine" ]
        }
        ,
        { "level" : 1,  "type" : "The home",              "words" : 
          [ "apartment", "flat", "armchair", "bath", "bathroom", "bookcase", "box", "camera", "chair", "clock", "computer", "cupboard", "desk", "diningroom", "doll", "flower", "garden", "hall", "house", "kitchen", "lamp", "livingroom", "mat", "mirror", "painting", "phone", "picture", "radio", "room", "sleep", "sofa", "table", "television", "TV", "toy", "tree", "wall", "watch", "window"]
        }
        ];

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
    # showAnswerKey() function
    #
    # divname           - the box/div which img will in
    # wordname          - choice of word
    # keyname           - answer key of word
    #
    # example
    #  showAnswerKey('paper','pig','pig');
    # Returns: add <input type=checkbox value=1 >pig</input> into div paper
    */
    function showAnswerKey(divname,wordname,keyname){
      var value = 0 ;
      if (wordname == keyname){
          value=1;
        }

      if (wordname.length > 9 ){
        $('#'+divname).append('<input id=smallFont type=radio name=' + keyname + ' value=' + value +' />'+ wordname+'</input><br>');
        
      }else{
        $('#'+divname).append('<input id=bigFont type=radio name=' + keyname + ' value=' + value +' />'+ wordname+'</input><br>');
      }
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
        $('#'+divname).append('<div id=' + subdivname + '></div>');
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
# showFlag() function
#
# show right/wrong flag
#
# currentFlag  - the div name of img
# flag            - flag words to show: 1/0/-1 stands for right/wrong/nothing
#
# example:
#  showFlag(currentFlag,flag);
# Returns: will show right.png/ wrong.png/nothing
*/
function showFlag(currentFlag,flag){
  if (flag == 1 ){
    $(currentFlag).addClass('right');
  } else if ( flag == 0 ){
    $(currentFlag).addClass('wrong');
  }else{
    $(currentFlag).addClass('nothing');
  }
}

/*
# makeExam function
#
# flag  - flag for exam/drill
# make exam by levels, book and theme
#
# 
*/
function makeExam(flag){
    $('#marks').html('得分:');
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

    var numberOfWords = examArray.length ;
    if (flag == 'exam'){
    $('#contrl').hide();
      shuffle(examArray);
      if (mode == 'choice'){
        numberOfWords = 50 ;
      }else if (mode == 'scrambled'){
        numberOfWords = 25 ;
      }else{
        numberOfWords = 10 ;
      }
    }
    for(var i=0; i<numberOfWords; i++){
       /*
       # prepare vars need
       */
       var currentDiv = 'question' + i; 
       var currentChoices = 'choices' + i;
       var currentFlag = 'flag' + i;
       var questionNumber = i + 1;
       var title = 'No. '+ questionNumber ;
       answerArray.push(title + ' ' + examArray[i] );
       var choices = generate3moreOptions(examArray,examArray[i]);
       choices.push(examArray[i]);
       shuffle(choices);

       if (i == 25 || i == 50 || i == 75 || i == 100){
         $('#paper').append('       <div id=pageMarker style="PAGE-BREAK-AFTER: always"><br><br></div>        ');
       }

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
       else if ( mode == 'answer' ){
       /*
       # show answer items
       */
       addDiv('paper', currentDiv);
          showTitle(currentDiv, title);
          showPictures(currentDiv,examArray[i]);
          addNewDiv(currentDiv, 'scrambled',examArray[i]);
       }
       
       }
}


/*
# checkExam function
#
# check student's results
#
#
#
#
#
#
*/
function checkExam(){
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
        mode = "answer";

    mode = $("#contrl :radio:checked").val();
    debug(mode);

    // marks vars
    var rightQuestions = 0 ;
    var totalQuestions = 0 ;

    for(var i=0; i<examArray.length; i++){
       /*
       # prepare vars need
       */
       var currentDiv = 'question' + i; 
       var currentChoices = 'choices' + i;
       var currentFlag = 'flag' + i;
       var questionNumber = i + 1;
       var title = 'No. '+ questionNumber ;
       answerArray.push(title + ' ' + examArray[i] );

       if ( mode == 'choice'){
       /*
       # show choice items
       */
        var userChoice =  $('#'+examArray[i]+':checked').val();
        debug(userChoice);
        if ( userChoice == 1 ){
          $('#'+ currentDiv +' #title').html( title + ' 正确');
          rightQuestions++;
          totalQuestions++;
        }else{
          $('#'+ currentDiv +' #title').html( title + ' 错误, 答案是:'+examArray[i]);
          totalQuestions++;
        }
        var mark = Math.round(rightQuestions*100/totalQuestions);
        $('#marks').html('得分:' + mark);
       }
       else if (mode == 'scrambled'){
       /*
       # show scrambled items
       */
        $('#marks').html('模块制作中');
       }
       else if ( mode == 'blank' ){
       /*
       # show blank items
       */
        $('#marks').html('模块制作中');
       }
       else if ( mode == 'answer' ){
       /*
       # show answer items
       */
        $('#marks').html('');
       }
       
       }
       
}

/*
# demo function 
# 
# demo something when programming
# 
# example:
#   demo();
# Returns: show an alert box with 'hello'
*/
function demo(){
  alert('hello');
}


/*
# increaseFont() function
#
# increase font with special id
#
# id    - id of element
#
# example:
#  increaseFont('big');
# Resets: increase id=big font a bit
*/
function increaseFont(id){
   var currentFontSize = $('#' + id).css('font-size');
   var currentFontSizeNum = parseFloat(currentFontSize, 10);
   var newFontSize = currentFontSizeNum*1.2;
   $('#' + id).css('font-size', newFontSize);
 
}


/*
# addToList function
#
# add edit input parts into List page
#
# msg     - messages inside inputbox
# act     - action case: pic/exp/snd/avi...
#
#
# Example:
#  addToList(act,msg);
# Resets: add <div id=steps>msg</div> INTO <div id=listMe>
#
*/
function addToList(act,msg){
   var icon    = "<img src='img/"+ act +".png' class='funcButtons'>";
   var shell   = "<div id=steps>" + icon+ msg + "</div>";
   $('#listMe').append(shell);
  }

/*
# changeTempIcon function 
#
# change temp icon into picture/explain/sounds... icons
#
# caseMsg  - caseMsg value to choose right icon [picture, explain, sounds, video]
#
# example:
#  changeTempIcon('picture');
# Returns: change img.temp file into new png
#          change img.temp value into new id
*/
function changeTempIcon(caseMsg){
    var filename = "pic";
    var newFile  = "img/" + filename + ".png";

    debugSwitch = 1;
    debug('newFile is:' + newFile);

    $('#temp').attr("src",newFile);
    $('#temp').attr("value","pic");

  }



/*
# binding events for elements
*/

/*
# After everything is ok.
*/
 $(document).ready(function(){
   // add into listMe button 
   $("#add").click(function(){
     var msg     = $('#inputbox')[0].value;
     var act     = $('#temp')[0].value;
     addToList(act,msg);
     }
   );

   
   // change tmp icon when click pic
   $('#picture').click(function(){
     var myId = this.id;
     changeTempIcon('myId');
   });

  // heighlight when mouseover on listMe
  $('div#steps').live( "mouseover", function(){
    $(this).addClass('heighlight');
    });
                       
  $('div#steps').live( "mouseout", function(){
    $(this).removeClass('heighlight');
  });

  $('div#steps').live( "click", function(){
    $(this).addClass('selected');
  });

 })


