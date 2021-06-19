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
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('https://mateus.izio.com.br/login')
    page.setDefaultNavigationTimeout(60000)
    //#endregion Abrir Navegador

    //#region LOGIN
    page.waitForSelector('[formcontrolname="des_username"]')
        .then(async () => {
            await page.type('[formcontrolname="des_username"]', 'joao.rodrigues')
            await page.waitForTimeout(2000)
            await page.type('[formcontrolname="des_senha"]', 'senhasenha')
            await page.waitForTimeout(2000)
            await page.click('button[type="submit"]')
        }).catch(err => console.error('Elemento não encontrado: ' + '[formcontrolname="des_username"]'))
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
        // Verificar se o produto já foi salvo
        const isModal = await page.$('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane.iz-modal.modal-sm')

        if (isModal === null) {
            index++
            console.log(index + ' Valor do index');
            console.log(`${index} de ${produtos.length} produtos cadastrados`);

            if (index <= produtos.length - 1) {
                console.log("PRODUTO CADASTRADO")
                await page.waitForTimeout(1000)
                await page.click("campaign-management-product-list div div button#button-produto")
                await start()
            } else {
                if (produtos.length === index) {
                    console.log(`
                    ##################################
                    ##################################
                    ###### PRODUTOS CADASTRADOS ######
                    ##################################
                    ##################################`)
                    return
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

        await page.waitForSelector("campaign-management-product-list div div button#button-produto")
            .then(async (item) => await item.click())

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