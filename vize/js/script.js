
(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsUrl =
  "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
/*showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);*/
});

var coursesUrl = "data/courses.json";
var educationSnippet = "snippets/education-categories-snippet.html";
var seasonsSnippet = "snippets/seasons-snippet.html";
var courseSnippet = "snippets/course-snippet.html";
var classesSnippet = "snippets/classes-snippet.html";

var educationCategory = "";
var season = "";
var semester = "";

var personelUrl = "data/personel.json";
var personelCategoriesSnippet = "snippets/personel-categories-snippet.html";
var personelSnippet = "snippets/personel-snippet.html";
var type = "";

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

dc.loadEducationCategories = function () {

  $ajaxUtils.sendGetRequest(educationSnippet, function(educationSnippet){
    insertHtml("#main-content", educationSnippet);
  }, false);
};

dc.goToSeasons = function (gg){
  educationCategory = gg;
  $ajaxUtils.sendGetRequest(seasonsSnippet, function(seasonsSnippet){
      insertHtml("#main-content", seasonsSnippet);
  }, false);

};

dc.go = function(seas){
  season = seas;
  $ajaxUtils.sendGetRequest(courseSnippet, function(courseSnippet){
    $ajaxUtils.sendGetRequest(coursesUrl, function(coursesUrl){
      if(educationCategory == "L"){
          $ajaxUtils.sendGetRequest(classesSnippet, function(classesSnippet){
            insertHtml("#main-content", classesSnippet);
          }, false);
      }
      else{
          var semester = 0;
          if(season == "G"){
            semester = 1;
          }
          else{
            semester = 2;
          }
          buildCourses(coursesUrl, courseSnippet, semester);
      }

    });
  }, false);
};


dc.goToCourses = function(classs){
  var sem = 0;
  var art = 0;
  if(season == "G"){
    art = -1;
  }
  sem = classs*2 + art;
  $ajaxUtils.sendGetRequest(courseSnippet, function(courseSnippet){
    $ajaxUtils.sendGetRequest(coursesUrl, function(coursesUrl){
     buildCourses(coursesUrl, courseSnippet, sem);
    });
  }, false);
}
function buildCourses(coursesUrl, courseSnippet, semester){

    var courses = coursesUrl.courses;
    var snippet = courseSnippet;
    var finalHtml = "";
    for(var i=0;i<courses.length;i++){
      var course = courses[i];
      if(educationCategory == course.tip && semester == course.semester){
        var temp = snippet;
        temp = insertProperty(temp, "name",  course.name);
        temp = insertProperty(temp, "credit", course.credit);
        temp = insertProperty(temp, "semester", course.semester);
        finalHtml += temp;
      }
    }
    insertHtml("#main-content", finalHtml);
}

dc.loadPersonelCategories = function () {
  $ajaxUtils.sendGetRequest(personelCategoriesSnippet, function(personelCategoriesSnippet){
    insertHtml("#main-content", personelCategoriesSnippet);
  }, false);
};

dc.goToPersonels = function (tip){
  type = tip;
  $ajaxUtils.sendGetRequest(personelSnippet, function(personelSnippet){
    $ajaxUtils.sendGetRequest(personelUrl, function(personelUrl){
      buildPersonels(personelSnippet, personelUrl, type);
    });
  }, false);
};

function buildPersonels(personelSnippet, personelUrl, tip){
  var personels = personelUrl.personels;
  var snippet = personelSnippet;
  var finalHtml = "";
    for(var i=0;i<personels.length;i++){
      var personel = personels[i];
      if(personel.tip == tip){
        var temp = snippet;
        temp = insertProperty(temp, "name", personel.name);
        temp = insertProperty(temp, "img", personel.image)
        finalHtml += temp;
      }
    }
    insertHtml("#main-content", finalHtml);
}

global.$dc = dc;

})(window);

var interval = 2000;
function onSocial(inte){
  this.interval = inte;
  var targetElem = document.querySelector("#face");
  targetElem.setAttribute("style", "style=visibility:visible");
  targetElem = document.querySelector("#inst");
  targetElem.setAttribute("style", "style=visibility:visible");
  targetElem = document.querySelector("#twit");
  targetElem.setAttribute("style", "style=visibility:visible");
  targetElem = document.querySelector("#you");
  targetElem.setAttribute("style", "style=visibility:visible");
}
function outSocial(){
    setTimeout(function(){
    var targetElem = document.querySelector("#face");
    targetElem.style.visibility="hidden";
    targetElem = document.querySelector("#inst");
    targetElem.style.visibility="hidden";
    targetElem = document.querySelector("#twit");
    targetElem.style.visibility="hidden";
    targetElem = document.querySelector("#you");
    targetElem.style.visibility="hidden";
  }, this.interval);
}
