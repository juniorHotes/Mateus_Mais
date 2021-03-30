const puppeteer = require('puppeteer');

/* CADASTRO POR CAMPANHA (Cada produto é uma campanha)*/
(async () => {
    const arquivo = 
``.split('\n')

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://lojista.izpay.com.br/login')
    page.setDefaultNavigationTimeout(60000)

    //#region LOGIN
    await page.type('[formcontrolname="des_username"]', 'joão_machado1')
    await page.click('[type="submit"]')
    await page.waitForTimeout(1000)
    await page.type('[formcontrolname="des_senha"]', 'WUVI0H')
    await page.waitForTimeout(1000)
    await page.click('[matsteppernext]')
    // //#endregion LOGIN

    await page.waitForNavigation()
    let index = 0
    async function start() {
        console.log("Start")
        let data = arquivo[index].split('|')

        console.log("Index: " + index);
        console.log('CANPANHA: ' + data[0])
        console.log('EAN: ' + data[7])
        
        await page.goto('https://lojista.izpay.com.br/campanhas/produtos')
        await page.waitForTimeout(2000)
        // Nome da campanha
        await page.type("input[placeholder='Nome da Campanha']", data[0])
        // Descrição da Campanha
        await page.type("textarea[placeholder='Descrição da Campanha']", data[1])
        // Início da Campanha
        await page.type("input[placeholder='Início da Campanha']", '29/03/2021')
        // Término da campanha
        await page.type("input[placeholder='Término da campanha']", '04/04/2021')
        // Público da campanha (todos)
        await page.click("[formcontrolname='TipoPublico']")
        // Validade do Cashback após o recebimento do crédito
        await page.type("input[formcontrolname='num_dias_credito']", '90')
        // Valor máximo de investimento
        await page.type("input[formcontrolname='vlr_maximo_campanha']", data[2])
        // Valor máximo por CPF nesta campanha
        await page.type("input[formcontrolname='vlr_maximo_cpf']", data[3])
        // Quantidade de dias que o crédito ficará bloqueado
        await page.type("input[formcontrolname='num_dias_provisao']", '7')
        // Código de referência
        await page.type("input[formcontrolname='des_codigo_referencia']", data[4])

        // LOJAS PARTICIPANTES
        await page.click("[placeholder='Selecione as lojas Participantes']")
        async function selecionarLojas() {

            await page.$$eval('div.mat-select-content mat-option', el => {
                const listaLojas = `MERCADINHO CARONE LTDA - S CRISTOVAO LJ 004|POSTERUS SUPERMERCADOS LTDA - SAO BERNARDO|POSTERUS SUPERMERCADOS LTDA - DIVINEIA|POSTERUS SUPERMERCADOS LTDA - S J RIBAMAR|MERCADINHO CARONE LTDA - ITAPIRACO LJ 001|MERCADINHO CARONE LTDA - MARANH NOVO LJ 002|MERCADINHO CARONE LTDA - REC VINHAIS LJ 003|MERCADINHO CARONE LTDA - S CRISTOVAO LJ 00|MERCADINHO CARONE LTDA - MAIOBAO LJ 006|MERCADINHO CARONE LTDA - A DA GUARDA LJ 005|MATEUS SUPERMERCADOS S.A. - COHAB|MATEUS SUPERMERCADOS S.A. - MIX JOAO PAULO|MATEUS SUPERMERCADOS S.A. - TURU-SM08|MATEUS SUPERMERCADOS S.A. - MIX MAIOBAO|MATEUS SUPERMERCADOS S.A. - COHAMA|MATEUS SUPERMERCADOS S.A. - CID. OPERARIA|MATEUS SUPERMERCADOS S.A. - CALHAU|MATEUS SUPERMERCADOS S.A. - MIX TIRICAL|MATEUS SUPERMERCADOS S.A. - RIO ANIL|MATEUS SUPERMERCADOS S.A. - COHATRAC|MATEUS SUPERMERCADOS S.A. - S. DA ILHA|MATEUS SUPERMERCADOS S.A. - MIX VINHAIS|MATEUS SUPERMERCADOS S.A. - CAJAZEIRAS|MATEUS SUPERMERCADOS S.A. - MIX JARDIM TROPICAL|MATEUS SUPERMERCADOS S.A. - TURU-SM27|MATEUS SUPERMERCADOS S.A. - BACANGA|MATEUS SUPERMERCADOS S.A. - PATIO NORTE|MATEUS SUPERMERCADOS S.A. - JARDIM RENASCENCA|MATEUS SUPERMERCADOS SA SJR|MATEUS SUPERMERCADOS 7 DE SETEMBRO|MATEUS SUPERMERCADOS S.A. - SUPER COHATRAC|MATEUS SUPERMERCADOS S.A. SUPER ANIL|MATEUS SUPERMERCADOS S.A - MIX DANIEL DE LA TOUCHE|MATEUS SUPERMERCADOS S A MIX ARACAGY|MATEUS SUPERMERCADOS S A SUPER MAIOBAO|MATEUS SUPERMERCADOS S A MIX GUAJAJARAS FORQUILHA|MATEUS SUPERMERCADOS S A SUPER CURVA DO 90|MATEUS SUPERMERCADOS S A MIX BRAGANCA`.split('|');
                el.forEach(async mat => {
                    const text = await mat.querySelector('span.mat-option-text').innerText;
                    listaLojas.map(loja => {
                        return loja == text ? mat.click() : null;
                    });
                });
            });
        }
        await page.waitForTimeout(2000)
        await selecionarLojas()
        await page.waitForTimeout(2000)

        await page.click("[mat-flat-button]")
        await page.waitForTimeout(500)
        await page.click("[mat-flat-button]")

        //#region CADASTRAR NOVO PRODUTO
        await page.waitForTimeout(7000)
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('dropzone'), // some button that triggers file selection
        ]);
        await fileChooser.accept([`C:/Users/Junior/Downloads/Compressed/Mateus Mais/Imagens mercearia/${data[7]}.png`]);

        // Nome do produto
        await page.type("[formcontrolname='des_ean_plu']", data[5])
        // Descrição da oferta
        await page.type("[formcontrolname='des_oferta']", data[5])
        // Quantidade
        await page.type("[formcontrolname='qtd_receber_cashback']", '1')
        // Cashback
        await page.type("[formcontrolname='vlr_receber_cashback']", data[6])
        await page.waitForTimeout(1000)
        await page.click(".modal-footer button[type='button']")
        await page.waitForTimeout(1000)
        await page.type("[formcontrolname='cod_ean']", data[7])
        await page.waitForTimeout(10000)
        //#endregion CADASTRAR NOVO PRODUTO
        
        index++
        if (index <= arquivo.length) {
            await start()
        } else {
            console.log('Processo concluído.')
        }
    }
    start()


    // other actions...
    //   await browser.close();
})();