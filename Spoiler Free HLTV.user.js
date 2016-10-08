// ==UserScript==
// @name         Spoiler Free HLTV
// @namespace    http://hltv.org/*
// @version      0.1
// @description  Removes Scores from HLTV
// @author       You
// @match        http://www.hltv.org/*
// @grant        none
// ==/UserScript==

// jQuery noConflict fix
var $jq = jQuery.noConflict();

var spoilerShown = false;
function toggleSpoilers(){
    if (spoilerShown){
        //hide
        hideSpoilers();

    }else{
        //show
        showSpoilers();
    }
    spoilerShown = !spoilerShown;
}
function hideSpoilers(){
    var onStartPage = window.location.pathname == "/";
    var onResultsPage = window.location.pathname == "/results/";
    var onMatchPage = window.location.pathname.includes("/match/");

    if(onMatchPage){
        $jq(".matchScore").hide();
        $jq("img ").css('opacity', '1');
        $jq($jq(".hotmatchbox.hotmatchbox")[0]).find(".hotmatchbox").hide();
        $jq("#statsContainer").hide();
        $jq(".tab_group2 > .tab_group3 > .tab_content").hide();
    }else if(onStartPage){
        $jq("div.teams > div:nth-child(2n)").hide();
    }else if(onResultsPage){
        $jq(".resultLoser, .resultWinner, .resultDraw").hide();
    }
}
function showSpoilers(){
    var onStartPage = window.location.pathname == "/" ;
    var onResultsPage = window.location.pathname == "/results/";
    var onMatchPage = window.location.pathname.includes("/match/");

    if (onStartPage){
       $jq("div.teams > div:nth-child(2n)").show();
    }else if(onResultsPage){
        $jq(".resultLoser, .resultWinner, .resultDraw").show();
    }else if(onMatchPage){
         $jq(".matchScore").show();
        //cant fix the opacity with this implementation
        $jq(".hotmatchbox").show();
        $jq("#statsContainer").show();
        $jq(".tab_content").show();
    }
}

hideSpoilers();
$jq("<div id='toggle_spoiler' style='display:inline;cursor:pointer;padding-left:25px; color:red'>Toggle Spoilers</div>").insertAfter("#loginButton");
$jq("#toggle_spoiler").click(toggleSpoilers);
