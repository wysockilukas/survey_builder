function fnAddPara(text, x, y) {

  var p = $("<p contenteditable='true'></p>");
  //p.html('fsdfsf');

  p.html(text);
  p.draggable().resizable();


  p.css({
    "position": "absolute",
    "left": x,
    "top": y
  });
  $("body").append(p);
  //console.log(p);
  //console.log(event);
}





$('#addParagraph').click(function () {
  fnAddPara("AAAA", 100, 100);
});
$('#btnSaveSurvey').click(fnSaveSurvey);
$('#btnRetriveSurvey').click(fnLoadDataFromLoacalStorage);











$("#shMenu").menu({
  position: {
    // Popup menu comes on the right by default
    my: "center top",
    //at: "center bottom"
  },

});





$("#accordion").accordion({
  // Slide animation or not or length
  animate: 150,
  // Starting tab
  active: 0,
  // Collapsible if same tab is clicked
  collapsible: true,
  // Event that triggers
  event: "click",
  // Height based on content (content) or largest (auto)
  heightStyle: "content"
});

$("#shTabs").tabs({
  // The event that switches the panel
  event: "click",
  // Effects: fadeIn, fadeOut, slideDown, slideUp, animate
  show: "fadeIn",
  hide: "fadeOut",
  // Starting panel
  active: 0,
  // Collapse by clicking the current tab
  collapsible: true,
  // Height based on content (content) or largest (auto)
  heightStyle: "auto"
});


// Create a draggable / resizable dialog box
$('#customDialog').dialog({
  draggable: true, // Set true by default
  resizable: false, // Set true by default
  // You can use minWidth, minHeight, maxWidth, maxHeight
  height: 300, // Defined in pixels
  width: 300,
  // If set true the user can't do anything until the
  // dialog is closed
  modal: true,
  // Position the dialog with my and define the browser
  // position with at
  // 1st: left, right, center
  // 2nd: top, center, bottom
  position: {
    my: 'center top',
    at: 'center bottom',
    // You can also target to place based on an element
    // on the screen (center under the link)
    of: "#openDialog"
  },
  // Define a delay for showing or hiding it
  show: 1000,
  hide: '1000',
  autoOpen: false, // Open true by default
  // create buttons for the dialog
  buttons: {
    "OK": function () {
      $("#openDialog").html("You clicked ok");
      $(this).dialog("close");
    },
    "CANCEL": function () {
      $("#openDialog").html("You clicked cancel");
      $(this).dialog("close");
    }
  }
});

// Displays the dialog box on click
$("#openDialog").click(function () {
  $('#customDialog').dialog("open");
});

// Use custom tooltip if the element has a title
$("[title]").tooltip();


// JQUERY UI FORMS

$("#present").selectmenu({
  width: 200
});

$("#birthday").datepicker({
  // Show month dropdown
  changeMonth: true,
  // Show year dropdown
  changeYear: true,
  dateFormat: "MM dd, yy",
  // Number of months to display
  numberOfMonths: 1,
  // Define maxDate
  maxDate: 365,
  // Define minDate
  minDate: -3650
});

// Style radio buttons
$("#radioPresents").buttonset();


$("#btnRetriveSurvey").button();


// Dragging and dropping elements
$("#toy1").draggable({
  helper: 'clone'
});
$("#toy2").draggable();
$("#toy3").draggable();





$("#cartDiv").droppable({
  // Adds the class highlight to the droppable
  activeClass: "highlight",

  // Adds class for when element is hovered
  hoverClass: "hoverDroppable",

  // Function to call when element is dropped
  drop: function (event, ui) {

    // Apply an effect when an element is dropped
    // clip, explode, fade, puff,
    // pulsate, scale, shake, slide,
    ui.helper.hide("fade");

    // Get the alt for the itm dropped
    var itemAlt = $(ui.draggable).attr("alt");

    // Display the item dropped
    alert("Item added : " + itemAlt);
  },

  // Define class of elements that can be dropped
  accept: ".toy",

  // Can elements currently be dropped on it
  disabled: false,

  // Add an element when droppable items starts to drag
  activate: function (event, ui) {

    $("#cartMsg").remove();
    $(this).append("<span id='cartMsg'>Drop Toy Here</span>");
  },

  // Called when an item isn't dropped in the dropzone
  deactivate: function (event, ui) {

    $("#cartMsg").remove();
    $(this).append("<span id='cartMsg'>You know you want it</span>");
  },

  // Called when draggable is over droppable
  over: function (event, ui) {

    $("#cartMsg").remove();
    $(this).append("<span id='cartMsg'>Drop It!!!</span>");
  },

  // Called when item leaves dropzone
  out: function (event, ui) {

    $("#cartMsg").remove();
    $(this).append("<span id='cartMsg'>NOOOOOO!!!</span>");
  }
});

















var vIdCounter = 1;  //counter to give unique elements name
var aElementsOrder = [];  //array with list of all elements listed with order acording to y position on screen

fnLoadDataFromLoacalStorage(); //function that start when page is loaded, it reneder form from browser storage


//function that saves all form elements as a JSON and retuen this json
function fnGetSurveyJson() {
  var vFormElements = [];

  //header property
  var oHeader = {
    ModyficationDate: new Date().toLocaleString(),
    User: '135555',
    SurveyName: 'Ankieta testowa',
    Introduction: $('.js-survey-header').text(),
    StarDate: '',
    EndDate: '',
    Status: '1',
  };

  //loop through all elements - all =survey questions
  for (i in aElementsOrder) {
    var oOneQuestion = {};
    oOneQuestion.Lp = i;
    oOneQuestion.Type = aElementsOrder[i].type; //elemet type like radio texarea checkbox
    oOneQuestion.Question = $('#' + aElementsOrder[i].id + ' textarea').val();  //survey question, taken form text area

    
    if (aElementsOrder[i].type == 'radio' || aElementsOrder[i].type == 'checkbox') {
      var vOptions = [];
      var vAnswersSelector = '#' + aElementsOrder[i].id + ' .js-div-' + aElementsOrder[i].type + 'es-all .js-div-' + aElementsOrder[i].type + ' .survey-answer';
      for (j = 0; j < $(vAnswersSelector).length; j++) {
        vOptions.push($(vAnswersSelector)[j].value);
      }
      oOneQuestion.Options = vOptions;
    }


    vFormElements.push(oOneQuestion);
  }

  var OSurvey = {
    Header: oHeader,
    FormElements: vFormElements,
  }
  return OSurvey;
}

var TMP_oPage = {};
function fnSaveSurvey() {
  var oPage = fnGetSurveyJson();
  TMP_oPage = oPage;
  var strJSON = JSON.stringify(oPage);
  localStorage.setItem("TestSurvey", strJSON);
}

function fnLoadDataFromLoacalStorage() {
  var strPage = localStorage.getItem("TestSurvey");
  if (strPage == null) return;

  var oPage = JSON.parse(strPage);
  for (var i = 0; i < oPage.FormElements.length; i++) {
    var inParams = {
      isNew: false,
      Type: oPage.FormElements[i].Type,
      Header: oPage.Header.Introduction,
      FormElements: oPage.FormElements[i],
    }
    addElement(inParams);
  }
  $('.js-survey-header').text(oPage.Header.Introduction);
}









function fnReorderQuestionOrderNumber() {
  aElementsOrder.forEach(function (v, i) {
    v.pos_y = $('#' + v.id).position().top
  }); //update pos_y in array
  aElementsOrder.sort(function (a, b) {
    return parseFloat(a.pos_y) - parseFloat(b.pos_y);
  }) //sort by pos_y
  aElementsOrder.forEach(function (v, i) {
    $('#' + v.id).children()[1].innerHTML = i + 1
  }); // update label - question number
}



$(".scLeftButtons").click(function (event, handler) {
  addElement({
    isNew: true,
    Type: this.id.split('-')[3],
  });
});


//elements on working panels are sortable
$('#sAddedElements').sortable({
  axis: "y",
  cursor: "move",
  cursorAt: {
    left: 5
  },
  opacity: 0.5,
  connectWith: ['._row'],
  stop: fnReorderQuestionOrderNumber,
});


//add elemets on workin panel either for new elelemts or retrived from db or local storage
//inParams 
function addElement(inParams) {

  var vType = inParams.Type;
  if (inParams.isNew == false) {
    vIdCounter = inParams.FormElements.Lp;
  }

  var vClonedId = '#js-li-' + vType + 'es' //get id of ellement to be cloned, element is hiddent on then bootom of the page
  var vElementId = "el" + vType + vIdCounter; //define unique name for element to be cloned
  var vOptionDiv = "#" + vElementId + " .js-div-" + vType + "es-all";

  var toClone = $(vClonedId); //toClone is an DOM object which is a copy of elemnt
  var vElement = toClone.clone(true).prop('id', vElementId); //change id of cloned element to new id name stored in vElementId variable, so each new added elemet would have unique name

  if (inParams.isNew == false) {
    vElement[0].children[2].value = inParams.FormElements.Question //question; 0 child is handler, 1- label and 2 is question
    if (vType == 'radio' || vType == 'checkbox') {
      var vElementDivWithOptions = vElement[0].children[3]; // 3 element is div with radio and check options
      var vElemetOneOption = vElement[0].children[3].children[0];
      vElemetOneOption.children[1].value = inParams.FormElements.Options[0];
      for (var i = 1; i < inParams.FormElements.Options.length; i++) {
        var zz = $(vElemetOneOption).clone(true);
        zz[0].children[1].value = inParams.FormElements.Options[i];
        $(vElementDivWithOptions).append(zz);
      }
    }

  }

  $('#sAddedElements').append(vElement);
  $(vOptionDiv).sortable();

  aElementsOrder.push({
    id: vElementId,
    pos_y: $("#" + vElementId).position().top,
    type: vType,
  }) //add new element to list

  fnReorderQuestionOrderNumber();


  //adds tab 
  //I had to add to addelement procedure to change div height after adding new elements
  $("#shTabs").tabs({
    heightStyle: "auto",
    activate: function (event, ui) { //trigger where "podglad" - prevew tab is selected 
      if (ui.newTab[0].children[0].text == "Podgląd") {
        fnSaveSurvey(); //save form composition as JSON
      }
    },
  });
  vIdCounter++;
}






$(".js-btn-qst-remove").click(function () {
  var vElementID = $(this).parent().parent()[0].id
  aElementsOrder.forEach(function (v, i) {
    if (v.id == vElementID) aElementsOrder.splice(i, 1);
  }); //remove element from aElementsOrder - element list
  aElementsOrder.forEach(function (v, i) {
    $('#' + v.id).children()[1].innerHTML = i + 1
  });
  $(this).parent().parent()[0].remove();

  $("#shTabs").tabs({
    heightStyle: "auto"
  });

})


$(".js-option-remove").click(function () {
  $(this).parent().remove();
  $("#shTabs").tabs({
    heightStyle: "auto"
  });
})

$(".js-option-add").click(function () {
  var vParrent = $(this).parent();
  var vClone = vParrent.clone(true);
  vParrent.after(vClone);
  $("#shTabs").tabs({
    heightStyle: "auto"
  });
})