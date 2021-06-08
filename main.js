const puppeteer = require('puppeteer');
const fs = require('fs');
const { promisify } = require('util');
const RegisterCampaign = require('./classes/RegisterCampaign');

/* CADASTRO CAMPANHA E PRODUTOS (Cria uma campanha para vários produtos)*/
async function main() {

    //#region Ler Arquivo
    const file = promisify(fs.readFile)

    async function readFile() {
        const dataFile = await file('Campanha Normal.csv', 'UTF-8')
        const row = dataFile.split('\r\n')
        const col = row.map(item => {
            const column = item.split(';')
            const ref = column.filter(item2 => item2 != '')
            return ref
        })

        col.shift()
        col.splice(1, 1)
        if (col[col.length - 1] == '') col.pop()

        return col
    }

    const dataFile = await readFile()

    const campanha = dataFile[0]

    //#endregion Ler Arquivo

    //#region Abrir Navegador
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://mateus.izio.com.br/login')
    page.setDefaultNavigationTimeout(60000)
    //#endregion Abrir Navegador

    //#region LOGIN
    await page.type('[formcontrolname="des_username"]', 'joao.rodrigues')
    await page.waitForTimeout(2000)
    await page.type('[formcontrolname="des_senha"]', 'senhasenha')
    await page.waitForTimeout(2000)
    await page.click('button[type="submit"]')
    //#endregion LOGIN

    const dataCampanha = {
        nome_campanha: campanha[0],
        desc_campanha: campanha[1],
        inicio_campanha: campanha[2],
        fim_campanha: campanha[3],
        num_dias_credito: campanha[4],
        vlr_maximo_campanha: campanha[5],
        vlr_maximo_cpf: campanha[6],
        num_dias_provisao: campanha[7],
        des_codigo_referencia: campanha[8]
    }

    // await page.waitForNavigation()
    // await page.goto('https://lojista.izpay.com.br/campanhas/produtos?cod_gestao_campanha=10100')

    await RegisterCampaign.Register(page, dataCampanha);

    dataFile.shift()
    const produtos = dataFile

    async function restart() {
        const snakModal = await page.$('mat-dialog-container.mat-dialog-container')

        if (snakModal != null) {
            const msg = await page.$eval('.cdk-visually-hidden[aria-atomic="true"][aria-live="assertive"]', text => text.innerText)

            if (msg == 'Para editar os itens a campanha deve estar como rascunho ou falha na ativação') {
                await page.click('app-new-product mat-dialog-content div button:nth-child(2)')
                console.log(msg)
            }
        }
        await page.waitForTimeout(1500)
        // Verificar se o produto já foi salvo
        const isModal = await page.$('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane.iz-modal.modal-sm')

        if (isModal == null) {
            index++
            if (index <= produtos.length - 1) {
                console.log("PRODUTO CADASTRADO")
                await start()
            } else {
                const cadastrados = await page.$$eval('div.mat-expansion-panel-content.ng-trigger.ng-trigger-bodyExpansion div.mat-expansion-panel-body div div div.body-col-ean span', span =>
                    span.map(ean => ean.innerHTML.split(' ')[1])
                )
                cadastrados.map((item) => {
                    return produtos.filter((cad, idx) => {
                        const ean = cad[0]

                        if (ean == item)
                            return produtos.splice(idx, 1)
                    })


                })

                if (produtos.length == 0) {
                    console.log(`
                    ##################################
                    ##################################
                    ###### PRODUTOS CADASTRADOS ######
                    ##################################
                    ##################################`)

                    console.log(`${cadastrados.length} PRODUTOS CADASTRADOS`)

                    return
                }
                else {
                    index = 0
                    console.log(`
                    ##################################
                    ##################################
                    ####### REVISANDO PRODUTOS #######
                    ##################################
                    ##################################`)
                    await start()
                }
            }
        } else {
            await restart()
        }
    }

    // //#region CADASTRAR NOVO PRODUTO
    let index = 0
    async function start() {

        const produto = produtos[index]

        console.log("--------------------------------------------------")
        console.log("CADASTRANDO NOVO PRODUTO...")
        console.table({ index: index, EAN: produto[0] });

        await page.waitForSelector("campaign-management-product-list div.tab-title.ng-star-inserted div button")
            .then(async () => await page.click("campaign-management-product-list div.tab-title.ng-star-inserted div button"))

        await page.waitForSelector('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane.iz-modal.modal-sm')
            .then(async () => {
                await page.waitForTimeout(1500)
                const [fileChooser] = await Promise.all([
                    page.waitForFileChooser(),
                    page.click('dropzone'),
                ])

                await fileChooser.accept([`./img_mateus.jpeg`])
                    
                await page.waitForTimeout(2000)
                // Nome do produto
                await page.type("[formcontrolname='des_ean_plu']", produto[1])
                await page.waitForTimeout(1000)
                // Descrição da oferta
                await page.type("[formcontrolname='des_oferta']", produto[1])
                // Quantidade
                await page.type("[formcontrolname='qtd_receber_cashback']", produto[2])


                /*################################## SE FOR NO DINHEIRO ############################################*/
                const cashbackType = produto[3].indexOf('R$')
                if (cashbackType != -1) {
                    await page.waitForTimeout(500)
                    await page.click("div div.mat-select-arrow-wrapper")
                    await page.waitForTimeout(500)
                    await page.click("div[role='listbox'] mat-option:nth-child(2)")
                }
                //####################################################################################################

                // Cashback
                await page.type("[formcontrolname='vlr_receber_cashback']", produto[3])
                await page.waitForTimeout(1000)
                await page.click(".modal-footer button[type='button']")
                await page.waitForTimeout(1000)
                // EAN
                await page.type("[formcontrolname='cod_ean']", produto[0])
                await page.click("div.modal-footer button.iz-button.md.margin-right-16.mat-stroked-button.mat-accent")

                await restart()

            })
    }
    await start()
    //#endregion CADASTRAR NOVO PRODUTO

};

main()