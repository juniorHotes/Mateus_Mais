const puppeteer = require('puppeteer');

/* CADASTRO POR CAMPANHA (Cada produto é uma campanha)*/
async function main() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://lojista.izpay.com.br/login')
    page.setDefaultNavigationTimeout(60000)

    //#region LOGIN
    await page.type('[formcontrolname="des_username"]', 'joão_machado1')
    await page.click('[type="submit"]')
    await page.waitForTimeout(2000)
    await page.type('[formcontrolname="des_senha"]', 'WUVI0H')
    await page.waitForTimeout(2000)
    await page.click('[matsteppernext]')
    //#endregion LOGIN

    const campanha =
``.split('\n')

    async function restart() {

        await page.waitForTimeout(1500)
        // Verificar se o produto já foi salvo
        const isModal = await page.$('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane.iz-modal.modal-sm')

        if (isModal == null) {
            index++
            if (index <= campanha.length - 1) {
                console.log("CAMPANHA CADASTRADA")
                await start()
            } else {
                console.log(`
                ##################################
                ##################################
                ###### CAMPANHAS CADASTRADAS #####
                ##################################
                ##################################`)
                return

            }
        } else {
            await restart()
        }
    }

    // //#region CADASTRAR NOVO PRODUTO
    let index = 0
    await page.waitForNavigation()

    async function start() {
        await page.goto('https://lojista.izpay.com.br/campanhas/campanha')

        await page.waitForTimeout(2000)
        // Nome da campanha
        await page.type("input[placeholder='Nome da Campanha']", campanha[0])
        // Descrição da Campanha
        await page.type("textarea[placeholder='Descrição da Campanha']", campanha[1])
        // Início da Campanha
        await page.type("input[placeholder='Início da Campanha']", '05/04/2021')
        // Término da campanha
        await page.type("input[placeholder='Término da campanha']", '11/04/2021')
        // Público da campanha (todos)
        await page.click("[formcontrolname='TipoPublico']")
        // Validade do Cashback após o recebimento do crédito
        await page.type("input[formcontrolname='num_dias_credito']", '90')
        // Valor máximo de investimento
        await page.type("input[formcontrolname='vlr_maximo_campanha']",  campanha[2])
        // Valor máximo por CPF nesta campanha
        await page.type("input[formcontrolname='vlr_maximo_cpf']",  campanha[3])
        // Quantidade de dias que o crédito ficará bloqueado
        await page.type("input[formcontrolname='num_dias_provisao']", '7')
        // Código de referência
        await page.type("input[formcontrolname='des_codigo_referencia']",  campanha[4])

        // LOJAS PARTICIPANTES
        await page.click("[placeholder='Selecione as lojas Participantes']")
        async function selecionarLojas() {

            await page.waitForSelector('div.mat-select-content mat-option', { timeout: 15000 }).then(async () => {
                await page.$$eval('div.mat-select-content mat-option', el => {
                    const listaLojas = 'MERCADINHO CARONE LTDA - S CRISTOVAO LJ 004|POSTERUS SUPERMERCADOS LTDA - SAO BERNARDO|POSTERUS SUPERMERCADOS LTDA - DIVINEIA|POSTERUS SUPERMERCADOS LTDA - S J RIBAMAR|MERCADINHO CARONE LTDA - ITAPIRACO LJ 001|MERCADINHO CARONE LTDA - MARANH NOVO LJ 002|MERCADINHO CARONE LTDA - REC VINHAIS LJ 003|MERCADINHO CARONE LTDA - S CRISTOVAO LJ 00|MERCADINHO CARONE LTDA - MAIOBAO LJ 006|MERCADINHO CARONE LTDA - A DA GUARDA LJ 005|MATEUS SUPERMERCADOS S.A. - COHAB|MATEUS SUPERMERCADOS S.A. - MIX JOAO PAULO|MATEUS SUPERMERCADOS S.A. - TURU-SM08|MATEUS SUPERMERCADOS S.A. - MIX MAIOBAO|MATEUS SUPERMERCADOS S.A. - COHAMA|MATEUS SUPERMERCADOS S.A. - CID. OPERARIA|MATEUS SUPERMERCADOS S.A. - CALHAU|MATEUS SUPERMERCADOS S.A. - MIX TIRICAL|MATEUS SUPERMERCADOS S.A. - RIO ANIL|MATEUS SUPERMERCADOS S.A. - COHATRAC|MATEUS SUPERMERCADOS S.A. - S. DA ILHA|MATEUS SUPERMERCADOS S.A. - MIX VINHAIS|MATEUS SUPERMERCADOS S.A. - CAJAZEIRAS|MATEUS SUPERMERCADOS S.A. - MIX JARDIM TROPICAL|MATEUS SUPERMERCADOS S.A. - TURU-SM27|MATEUS SUPERMERCADOS S.A. - BACANGA|MATEUS SUPERMERCADOS S.A. - PATIO NORTE|MATEUS SUPERMERCADOS S.A. - JARDIM RENASCENCA|MATEUS SUPERMERCADOS SA SJR|MATEUS SUPERMERCADOS 7 DE SETEMBRO|MATEUS SUPERMERCADOS S.A. - SUPER COHATRAC|MATEUS SUPERMERCADOS S.A. SUPER ANIL|MATEUS SUPERMERCADOS S.A - MIX DANIEL DE LA TOUCHE|MATEUS SUPERMERCADOS S A MIX ARACAGY|MATEUS SUPERMERCADOS S A SUPER MAIOBAO|MATEUS SUPERMERCADOS S A MIX GUAJAJARAS FORQUILHA|MATEUS SUPERMERCADOS S A SUPER CURVA DO 90|MATEUS SUPERMERCADOS S A MIX BRAGANCA'.split('|');
                    el.forEach(async mat => {
                        const text = await mat.querySelector('span.mat-option-text').innerText;
                        listaLojas.map(loja => {
                            return loja == text ? mat.click() : null;
                        });
                    });
                });
            })
        }
        await page.waitForTimeout(2000)
        await selecionarLojas()
        await page.waitForTimeout(2000)

        await page.click("[mat-flat-button]")
        await page.waitForTimeout(500)
        await page.click("[mat-flat-button]")

        const produto = campanha[index].split('|')

        console.log("--------------------------------------------------")
        console.log("CADASTRANDO PRODUTO...")
        console.table({ index: index, EAN: produto[5] });

        await page.waitForSelector("campaign-management-product-list div.tab-title.ng-star-inserted div button")
            .then(async () => await page.click("campaign-management-product-list div.tab-title.ng-star-inserted div button"))

        await page.waitForSelector('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane.iz-modal.modal-sm')
            .then(async () => {
                await page.waitForTimeout(1500)
                const [fileChooser] = await Promise.all([
                    page.waitForFileChooser(),
                    page.click('dropzone'),
                ])

                await fileChooser.accept([`C:/Users/GP Mateus/Desktop/Mateus Mais/Imagens/${produto[5]}.png`])
                    .then()
                    .catch(async () => {
                        noImage.push(produto[0])
                        console.log(' @@@@@@@@@@@@@@@@@@@@ IMAGEM NÃO ENCONTRADA @@@@@@@@@@@@@@@@@@@@ ')
                        await page.click('mat-dialog-container app-edit-product mat-dialog-content div button')
                        await restart()

                    });

                await page.waitForTimeout(1500)
                // Nome do produto
                await page.type("[formcontrolname='des_ean_plu']", produto[6])
                await page.waitForTimeout(1000)
                // Descrição da oferta
                await page.type("[formcontrolname='des_oferta']", produto[6])
                // Quantidade
                await page.type("[formcontrolname='qtd_receber_cashback']", produto[7])

                /*################################## SE FOR NO DINHEIRO ############################################*/
                // await page.waitForTimeout(500)
                // await page.click("div div.mat-select-arrow-wrapper")
                // await page.waitForTimeout(500)
                // await page.click("div.mat-select-content.ng-trigger.ng-trigger-fadeInContent mat-option:nth-child(2)")
                //####################################################################################################

                // Cashback
                await page.type("[formcontrolname='vlr_receber_cashback']", produto[8])
                await page.waitForTimeout(1000)
                await page.click(".modal-footer button[type='button']")
                await page.waitForTimeout(1000)
                // EAN
                await page.type("[formcontrolname='cod_ean']", produto[5])
                await page.click("app-register-item-wrapper div.modal-footer button.iz-button.md.margin-right-16.mat-stroked-button.mat-accent")

                await restart()

            })
    }
    await start()
    //#endregion CADASTRAR NOVO PRODUTO

};

main()