const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://lojista.izpay.com.br/');

    await page.evaluate(async (page) => {
        document.execCommand("copy", true, 'junior')
        inputLogin = await document.querySelector("input[formcontrolname='des_username']")
        await inputLogin.click()
    
    })

    // document.execCommand("copy", true, 'junior')
   
    // other actions...
    //   await browser.close();
}) ();