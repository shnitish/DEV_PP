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

    // delay
    await tab.waitForTimeout(3000);
    
    // Both Mangage contests and manage challenges tags
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a', {visible: true});
    let bothTags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeTab = bothTags[1];
    await manageChallengeTab.click();

    addModerators(browser, tab);
})();

async function addModerators(browser, tab)
{
    await tab.waitForSelector(".backbone.block-center", {visible: true});
    let allATags = await tab.$$(".backbone.block-center");
    let allLinks = [];

    for(let i = 0; i < allATags.length; i++)
    {
        let aTag = allATags[i];
        let link = await tab.evaluate(function(element){return element.getAttribute("href")}, aTag);
        allLinks.push(link);
    }

    let completeLinks = allLinks.map(function(link){return "https://www.hackerrank.com" + link;});
    console.log(completeLinks);

    await addModeratorToQuestion(completeLinks[0], browser);
}

async function addModeratorToQuestion(qLink, browser)
{
    let newTab = await browser.newPage();
    await newTab.goto(qLink);

    await newTab.waitForSelector('li[data-tab="moderators"]', {visible: true});
    await newTab.waitForTimeout(2000);
    await newTab.click('li[data-tab="moderators"]');
    await newTab.waitForSelector('#moderator', {visible: true});
    await newTab.type('#moderator', "Nitish");
    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(4000);
    await newTab.close();
}