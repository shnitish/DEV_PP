let challenges = require("./challenges");

// Login to hackerrank using async await 
const puppeteer = require("puppeteer");
const id = "jegocej751@astarmax.com";
const pass = "tempmail123";

(async function(){
    let browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null, 
        args:["--start-maximized"]
    });

    let allPages = await browser.pages();
    let tab = await allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");

    // drop down menu div
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {visible: true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');

    // administration div
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]', {visible: true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');

    // Both Mangage contests and manage challenges tags
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a', {visible: true});
    let bothTags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeTab = bothTags[1];
    await manageChallengeTab.click();

    // create challenge button
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeBtn = await tab.$(".btn.btn-green.backbone.pull-right");

    // create complete challenge button link
    let createChallengeLink = await tab.evaluate(function(element){return element.getAttribute("href");}, createChallengeBtn);
    createChallengeLink = "https://www.hackerrank.com" + createChallengeLink;

    // create challenges from challenges.js files
    for(let i = 0; i < challenges.length; i++)
    {
        await addChallenge(challenges[i], browser, createChallengeLink);
        await tab.waitForTimeout(3000);
    }

})();

async function addChallenge(challenge, browser, createChallengeLink){

    let challengeName = challenge["Challenge Name"];
    let challengeDesc = challenge["Description"];
    let probStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    let newTab = await browser.newPage();
    await newTab.goto(createChallengeLink);
    await newTab.waitForSelector("#name", {visible: true});
    await newTab.type("#name", challengeName);
    await newTab.type("#preview", challengeDesc);
    await newTab.type("#problem_statement-container .CodeMirror textarea", probStatement);
    await newTab.type("#input_format-container .CodeMirror textarea", inputFormat);
    await newTab.type("#constraints-container .CodeMirror textarea ", constraints);
    await newTab.type("#output_format-container .CodeMirror textarea", outputFormat);
    await newTab.type("#tags_tag", tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(2000);
    newTab.close();
};