const puppeteer = require('puppeteer');
const RegisterCampaign = require('./classes/RegisterCampaign');

/* CADASTRO CAMPANHA E PRODUTOS (Cria uma campanha para vários produtos)*/
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

    const dataCampanha = {
        nome_campanha: 'LANÇAMENTO-EBD-02',
        desc_campanha: 'Oferta válida para compras realizadas por pessoas físicas, com limite de R$ 6,00 por CPF, nas lojas Mateus Supermercados, Mix Atacarejo e Camiño em São Luís-Ma. Vigente de 05/04/2021 a 11/04/2021 ou enquanto durarem os estoques.',
        inicio_campanha: '05/04/2021',
        fim_campanha: '11/04/2021',
        num_dias_credito: '90',
        vlr_maximo_campanha: '4,500,00',
        vlr_maximo_cpf: '6,00',
        num_dias_provisao: '7',
        des_codigo_referencia: 'EBD-TRADE-LANÇAMENTO',
    }

    // await page.waitForNavigation()
    // await page.goto('https://lojista.izpay.com.br/campanhas/produtos?cod_gestao_campanha=8307')

    await RegisterCampaign.Register(page, dataCampanha);

    const produtos =
`7891079013038|Macarrão Instantâneo Galinha Caipira Nissin 69g|1|R$ 1,75
7891079013052|Macarrão Instantâneo Carne Defumada Nissin 69g |1|R$ 1,75
7891079013083|Macarrão Instantâneo Costela Nissin 68g|1|R$ 1,75
7891079013106|Macarrão Instantâneo Yakissoba Tradicional 70g|1|R$ 1,75
7891079013120|Macarrão Instantâneo Bolonhesa Nissin Copo 72g|1|R$ 1,75
7891079013113|Macarrão Instantâneo Queijo Cheddar Nissin 69g|1|R$ 1,75
7891079013045|Macarrão Instantâneo Frango com Molho Teriyaki 72g|1|R$ 1,75
7891079013076|Macarrão Instantâneo Frutos do Mar Nissin Copo 65g|1|R$ 1,75
7891079013069|Macarrão Instantâneo Galinha Caipira Picante 68g|1|R$ 1,75
7891079013090|Macarrão Instantâneo Legumes com Azeite Nissin 67g|1|R$ 1,75
7891079013427|Macarrão Instantâneo Curry Nisiin Copo 70g|1|R$ 1,75`.split('\n')

    async function restart() {
        const snakModal = await page.$('div.cdk-overlay-container div.cdk-global-overlay-wrapper div.cdk-overlay-pane snack-bar-container')
        if (snakModal != null) {
            const msg = await page.$eval('.cdk-visually-hidden[aria-atomic="true"][aria-live="assertive"]', text => text.innerText)

            if (msg == 'A lista de EANs relacionados não pode conter registros duplicados.') {
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
                        const ean = cad.search(item)

                        if (ean == 0)
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

                    if (noImage.length > 0) {
                        console.log('###### PRODUTOS QUE NÃO FORAM ENCONTRADO IMAGEMS')
                        noImage.map(ean => console.log(ean))
                    }

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

    let noImage = []
    // //#region CADASTRAR NOVO PRODUTO
    let index = 0
    async function start() {

        const produto = produtos[index].split('|')

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

                await fileChooser.accept([`C:/Users/Junior/Documents/MEGAsync Downloads/Mateus Mais/Imagens/${produto[0]}.png`])
                    .then()
                    .catch(async () => {
                        noImage.push(produto[0])
                        console.log(' @@@@@@@@@@@@@@@@@@@@ IMAGEM NÃO ENCONTRADA @@@@@@@@@@@@@@@@@@@@ ')
                        await page.click('app-new-product mat-dialog-content div button:nth-child(2)')
                        await restart()

                    });

                await page.waitForTimeout(1500)
                // Nome do produto
                await page.type("[formcontrolname='des_ean_plu']", produto[1])
                await page.waitForTimeout(1000)
                // Descrição da oferta
                await page.type("[formcontrolname='des_oferta']", produto[1])
                // Quantidade
                await page.type("[formcontrolname='qtd_receber_cashback']", produto[2])

                /*################################## SE FOR NO DINHEIRO ############################################*/
                await page.waitForTimeout(500)
                await page.click("div div.mat-select-arrow-wrapper")
                await page.waitForTimeout(500)
                await page.click("div.mat-select-content.ng-trigger.ng-trigger-fadeInContent mat-option:nth-child(2)")
                //####################################################################################################

                // Cashback
                await page.type("[formcontrolname='vlr_receber_cashback']", produto[3])
                await page.waitForTimeout(1000)
                await page.click(".modal-footer button[type='button']")
                await page.waitForTimeout(1000)
                // EAN
                await page.type("[formcontrolname='cod_ean']", produto[0])
                await page.click("app-register-item-wrapper div.modal-footer button.iz-button.md.margin-right-16.mat-stroked-button.mat-accent")

                await restart()

            })
    }
    await start()
    //#endregion CADASTRAR NOVO PRODUTO

};

main()