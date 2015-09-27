//scraper.js

var request = require('request'); // library for downloading web pages by URL
var cheerio = require('cheerio'); // jQuery implementation for the server
var fs = require("fs");


/* 1. Using the default request() function, get today's Wikipedia page (e.g., http://en.wikipedia.org/wiki/April_8) and log it to the console.
2. Once you have the page HTML as text, load it into Cheerio and log that result to the console (or use Node Inspector to look at it).
3. Using that Cheerio object, locate the "births" and "deaths" sections of the page (hint: these headlines have IDs, and the next UL tag contains all the links in that section).
4. Loop through those links, and log out the following information: number of births, number of deaths, and names for each.*/


var pageAddress = ("http://en.wikipedia.org/wiki/April_8");
    
request(pageAddress, function (error, response, body) {
    if (error) {
        console.error(error);
    }

    //load the page into a cheerio obj
    var $ = cheerio.load(body);
    
    var births = $('#Births').parent().next();
    var deaths = $('#Deaths').parent().next();
    
    //get the number of newborn
    var bornList = 'Born today ' + births.find('li').length + ':\n';
    //get the list of just the names
    births.find('li').each(function (i, li) {
        if ( isNaN($(this).find('a').first().text()) ) {
            bornList += '\t' + $(this).find('a').first().text() + '\n';
        } else {
            bornList += '\t' + $(this).find('a').eq(1).text() + '\n';
        }  
    });
    console.log(bornList);

    var deadsList = 'Dead today ' + deaths.find('li').length + ':\n';
    deaths.find('li').each(function (i, li) {
        if ( isNaN($(this).find('a').first().text()) ) {
            deadsList += '\t' + $(this).find('a').first().text() + '\n';
        } else {
            deadsList += '\t' + $(this).find('a').eq(1).text() + '\n';
        }
    });
    console.log(deadsList);

});
