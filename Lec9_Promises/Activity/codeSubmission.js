// All fun of puppeteer are promisified

// Automation script
const puppeteer = require("puppeteer");
const id = "jegocej751@astarmax.com";
const pass = "tempmail123";
let tab;
let idx;
let gCode;

// opens a new browser 
let browserPromise = puppeteer.launch({
    headless: false, 
    defaultViewport: null, 
    args:["--start-maximized"]
});
// gives a pending promise until a browser instance is opened

browserPromise.then(function(browser)
{
    console.log("Browser openend!");
    let allPagePromise = browser.pages();
    return allPagePromise;
})
.then(function(pages)
{
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
})
.then(function(){
    console.log("Reached Hackerrank.com");
})
.then(function()
{   
    let idTypePromise = tab.type("#input-1", id);
    return idTypePromise;
})
.then(function()
{
    let passTypePromise = tab.type("#input-2", pass);
    return passTypePromise;
})
.then(function(){
    console.log("Logged in successfully");
})
.then(function()
{
    let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.then(function(){
    console.log("Clicked on interview preparation kit");
})
.then(function() 
{
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise; //Promise<Pending>
})
.then(function()
{
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
})
.then(function(){
    console.log("Reached Warmup Challenges page");
})
.then(function() 
{
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item",{ visible: true });
    return waitPromise;
})
.then(function() 
{
    let allQuesATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuesATagsPromise;
  })
.then(function(allQuesATags)
{
    allLinksPromise = [];       // will contain promise of all links [Promise<Pending>, Promise<Pending>, Promise<Pending>, Promise<Pending>] after executing evaluate();
    for(let i = 0; i < allQuesATags.length; i++)
    {
        let ATag = allQuesATags[i];
        let linkPromise = tab.evaluate(function(element){return element.getAttribute("href");}, ATag);
        allLinksPromise.push(linkPromise);
    }

    let sabkaPromise = Promise.all(allLinksPromise); // Combine allLinksPromises into one and returns a Promise<Pending>
    return sabkaPromise;
})
.then(function(allLinks)
{
    // array of [incompleteLinkString, string, string, string] which becomes array of [link, link, link, link]
    let completeLinks = allLinks.map(function(link)
    {
        return "https://www.hackerrank.com" + link;
    });

    // chaining all questions
    // Logic Like nFiles promises serially, to loop over all the questions 
    let oneQuesSolvedPromise = solveQuestion(completeLinks[0]);
    
    for(let i = 1; i < completeLinks.length; i++)
    {
        oneQuesSolvedPromise = oneQuesSolvedPromise.then(function(){
            let nextQuesSolvedPromise = solveQuestion(completeLinks[i]);
            return nextQuesSolvedPromise;
        })
    }
    return oneQuesSolvedPromise;
})
.then(function()
{
    console.log("All Questions solved successfully!!");
})
.catch(function(error){
    console.log(error);
});

// custom promisified function for click and then wait event
function waitAndClick(selector)
{
    return new Promise(function(resolve , reject)
    {
        let waitPromise = tab.waitForSelector(selector , {visible:true});
        waitPromise.then(function(){
            let clickPromise = tab.click(selector);
            return clickPromise;
        }) 
        .then(function(){
            // wait and click succesfully done
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}

function getCode()
{
    return new Promise(function (resolve, reject) 
    {
        // came to editorial page and then waiting to load all the elements
        let waitPromise = tab.waitForSelector(".hackdown-content h3");
        waitPromise
       .then(function()
       {
           let allLangNameElementsPromise = tab.$$(".hackdown-content h3");
           return allLangNameElementsPromise;
       })
       .then(function(allLangNameElements)
       {   // this will take 
           // [<h3>C++</h3>, <h3>Python</h3>, <h3>Java</h3>]

           let allLangNamesPromises = [];   // contains pending promises of all the langauge names or their text content of heading tags
           for(let i = 0; i < allLangNameElements.length; i++)
           {
               let langNamePromise = tab.evaluate(function(element){return element.textContent;}, allLangNameElements[i]);
               allLangNamesPromises.push(langNamePromise);
           }

           let sabkaPromise = Promise.all(allLangNamesPromises);
           return sabkaPromise;     // returns ["C++", "Python", "Java"] in the order they are resolved
       })
       .then(function(langNames)
       {
           for(let i = 0; i < langNames.length; i++)
           {
               if(langNames[i] == "C++")
               {
                   idx = i;
                   break;
               }
           }

           // get all the div which contains code of each language and return it
           let allLangCodeDivPromise = tab.$$(".hackdown-content .highlight");
           return allLangCodeDivPromise;
       })
       // then process [<div></div>, <div></div>, <div></div>]
       .then(function(allLangCodeDiv)
       {
            let requiredCodeDiv = allLangCodeDiv[idx];
            let codePromise = tab.evaluate(function(element){return element.textContent;}, requiredCodeDiv);
            return codePromise;
       })
       .then(function(code){
           gCode = code;
       })
       .then(function(){
           resolve();
       })
       .catch(function(error)
       {
           reject(error);
       })
    });
}

function pasteCode()
{
    return new Promise(function(resolve, reject){

        let problemTabClickPromise = tab.click('div[data-attr2="Problem"]');
        problemTabClickPromise.then(function(){
            let waitAndClickPromise = waitAndClick('.custom-input-checkbox');            
            return waitAndClickPromise;
        })
        .then(function(){
            console.log("Clicked on custom check-box");
        })
        .then(function(){
            let waitForTextBoxPromise = tab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypePromise = tab.type(".custominput", gCode);
            return codeTypePromise;
        })
        .then(function(){
            console.log("Code typed into the custom input");
        })
        .then(function(){
            let controlKeyDownPromise = tab.keyboard.down('Control');
            return controlKeyDownPromise;
        })
        .then(function(){
            let aKeyPressPromise = tab.keyboard.press('A');
            return aKeyPressPromise;
        })
        .then(function(){
            let xKeyPressPromise = tab.keyboard.press('X');
            return xKeyPressPromise;
        })
        .then(function(){
            let clickOnEditorPromise = tab.click('.monaco-editor.no-user-select.vs');
            return clickOnEditorPromise;
        })
        .then(function(){
            let aKeyPressPromise = tab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let vKeyPressPromise = tab.keyboard.press("V");
            return vKeyPressPromise;
        })
        .then(function(){
            let controlKeyUpPromise = tab.keyboard.up('Control');
            return controlKeyUpPromise;
        })
        .then(function()
        {
            resolve();
        })
        .catch(function(){
            reject();
        })
    });
}

// Handle Editorial Lock Problem
function handleLockBtn(selector)
{
    return new Promise(function(resolve, reject){
        let waitKaPromise = tab.waitForSelector(selector, {visible: true, timeout: 5000});
        waitKaPromise.then(function(){
            let getLockButtonPromise = tab.$(selector); // retrieve the button element 
            return getLockButtonPromise;
        })
        .then(function(lockBtn){
            let lockBtnClickedPromise = lockBtn.click();
            return lockBtnClickedPromise;
        })
        .then(function(){
            console.log("Lock button found on Editorial !!!");
            resolve();
        })
        .catch(function(){
            console.log("Lock Button on editorial not found!!!");
            resolve();
        })
    })
}

// Function to solve a questions 
function solveQuestion(quesLink)
{
    return new Promise(function(resolve, reject)
    {
        let gotoPromise = tab.goto(quesLink);

        gotoPromise.then(function()
        {
            let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
            return waitAndClickPromise;
        })
        .then(function(){
            console.log("Arrived at editorial page");  
        })
        .then(function(){
            let lockClickPromise = handleLockBtn('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            return lockClickPromise;
        })
        .then(function(){
            // get code of C++ by calling getCode() and set it in gCode variable
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            console.log("Got code !!");
        })
        .then(function(){
            // this fun will paste code in the editor from gCode vairable
            let pastePromise = pasteCode();
            return pastePromise;
        })
        .then(function()
        {
            console.log("Code Pasted !!!");
        })
        .then(function(){
            let tabClickPromise = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return tabClickPromise;
        })
        .then(function()
        {
            console.log("Code submitted");
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}
