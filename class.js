const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        defaultViewport: false,
        userDataDir:"./tmp",
      });
      const page = await browser.newPage();
      const urls = ['https://www.linkedin.com/in/supminn/','https://www.linkedin.com/in/nishtha-sharma-3761571b3/','https://www.linkedin.com/in/vijayabal-dhanapal-13a07662/','https://www.linkedin.com/in/karthikeyan-pandiyaraj-248011128/','https://www.linkedin.com/in/sangeetha-j-b31134138/','https://www.linkedin.com/in/jyoti-bisht/','https://www.linkedin.com/in/anjali-singh-293642230/','https://www.linkedin.com/in/anshu-jaiswal-b92511119/']

      const peoples = []

      for(url of urls){
          await page.goto(url);
      
      const peoplesHandles = await page.$$('.scaffold-layout__main');
        for(const peoplesHandle  of peoplesHandles){
                let name = 'Null';
                let profile_pic = 'Null';
                let linkedin_profile_link = 'Null';
                let email = 'Null';
                let company = 'Null';
                let location = 'Null';
                let about = 'Null';
                let languages = 'Null';
                let education = 'Null';
                let experiences = 'Null';
                let phone = 'Null';
                try{
                    name = await page.evaluate(el => el.querySelector(" div:nth-child(1) > div:nth-child(1) > h1").textContent, peoplesHandle )
                }catch(error){}
                try{
                    profile_pic = await page.evaluate(el => el.querySelector(".pv-top-card-profile-picture__image.pv-top-card-profile-picture__image--show.ember-view").getAttribute("src"), peoplesHandle )
                }catch(error){}
                try{
                    linkedin_profile_link = await page.url(); 
                }catch(error){}
                try{
                    company = await page.evaluate(el => el.querySelector("  div.mt2.relative > ul > li:nth-child(1) > a > h2 > div   ").textContent, peoplesHandle )
                }catch(error){}
                try{
                    location = await page.evaluate(el => el.querySelector(" div.mt2.relative > div.pb2.pv-text-details__left-panel > span.text-body-small.inline.t-black--light.break-words").textContent, peoplesHandle )
                }catch(error){}
                try{
                    about = await page.evaluate(el => el.querySelector("   div.display-flex.ph5.pv3 > div > div > div > span.visually-hidden ").textContent, peoplesHandle )
                }catch(error){}
                try{

                    education = await page.evaluate(el => el.querySelector(" div.ph5.pb5 > div.mt2.relative > ul > li:nth-child(2) > a > h2 > div").textContent, peoplesHandle )
                }catch(error){}
                try{
                        languages = await page.evaluate(el => el.querySelector(" div > span > span.visually-hidden").textContent, peoplesHandle )
                }catch(error){}
                 try{
                    await page.click(".ember-view.link-without-visited-state.cursor-pointer.text-heading-small.inline-block.break-words")
                    email = await page.evaluate(el => el.querySelector(" section.pv-contact-info__contact-type.ci-email > div > a").textContent, peoplesHandle )
                    await Promise.all([
                        page.waitForNavigation()
                    ]);
                }catch(error){}
                if(name !== 'Null'){
                    peoples.push({
                            name,
                            profile_pic,
                            linkedin_profile_link,
                            email,
                            company,
                            location,
                            about,
                            // languages,
                            education,
                            // experiences
                    })
                }
            }
            console.log(peoples)
            await Promise.all([
                page.waitForNavigation()
            ]);
        }
        fs.writeFile("./people.json", JSON.stringify(peoples), err => {
        
            if (err) throw err; 
           
            console.log("Done writing"); 
        });
        await browser.close();
})();
