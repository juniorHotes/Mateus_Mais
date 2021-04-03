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
        nome_campanha: 'LANÇAMENTO-NIVEA-02',
        desc_campanha: 'Oferta válida para compras realizadas por pessoas físicas, com limite de R$ 100,00 por CPF, nas lojas Mateus Supermercados, Mix Atacarejo e Camiño em São Luís-Ma. Vigente de 05/04/2021 a 11/04/2021 ou enquanto durarem os estoques.',
        inicio_campanha: '05/04/2021',
        fim_campanha: '11/04/2021',
        num_dias_credito: '90',
        vlr_maximo_campanha: '30,000,00',
        vlr_maximo_cpf: '100,00',
        num_dias_provisao: '7',
        des_codigo_referencia: 'NIVEA-TRADE-LANÇAMENTO',
    }

    // await page.waitForNavigation()
    // await page.goto('https://lojista.izpay.com.br/campanhas/produtos?cod_gestao_campanha=8307')

    await RegisterCampaign.Register(page, dataCampanha);

    const produtos =
`4005900219626|Sabonete Líquido Íntimo Nivea Fresh Comfort 250ml|2|20
7890704810516|Sabonete Líquido Íntimo Suave Nivea Frasco 250ml|2|20
7890704808131|Sabonete Líquido Íntimo Natural Nivea Frasco 250ml|2|20
4005900473806|Mousse de Banho Nivea Creme Care Frasco 200ml|2|20
4005808513550|Sabonete Líquido Suave Nivea Creme Soft 250ml|2|20
7890704810738|Sabonete Líquido Erva-Doce Nivea Frasco 250ml|2|20
4005900160195|Sabonete Líquido Nivea Creme Soft Milk 250ml|2|20
4005900095268|Sabonete Líquido Nivea Creme Care Frasco 250ml|2|20
4005808808243|Esfoliante para Banho Corporal Nivea Bisnaga 200ml|1|20
4005808808281|Sabonete Líquido Nivea Óleo de Banho Frasco 200ml|1|20
4005808896134|Sabonete Líquido Frangipani & Oil Nivea 250ml|2|20
4005808313167|Sabonete Líquido Waterlily & Oil Nivea 250ml|2|20
4005900734068|Sabonete Líquido Nivea Creme Soft 200ml Refil|2|20
4005900734082|Sabonete Líquido Nivea Creme Care 200ml Refil|2|20
4005900734075|Sabonete Líquido Erva-Doce Nivea Sachê 200ml Refil|2|20
4005900079664|Creme Antirrugas Dia FPS 15 Nivea Q10 Plus C 51g|1|20
4005808812875|Creme Antissinais Pele Normal a Seca FPS 30 52g|1|20
4005808174478|Creme Antissinais Pele Mista a Oleosa FPS 30 52g|1|20
4005808812899|Creme Antissinais Noite Nivea Q10 Plus Caixa 50g|1|20
4005900418777|Creme Antissinais Contorno dos Olhos Nivea 15g|1|20
78906617|Creme Hidratante Nivea Lata 56g|1|20
7891177801308|Creme Hidratante Nivea Pote 97g|1|20
4005900359261|Água Micelar Solução de Limpeza Nivea Micellair|1|20
4005900539724|Água Micelar Expert sem Perfume Micellair 200ml|1|20
4005900707550|Antitranspirante Aerossol Citrus 150ml|1|20
4005900707536|Antitranspirante Aerossol Carvão Ativado 150ml|1|20
4005900707543|Antitranspirante Aerossol Amadeirado 150ml|1|20
4005900715821|Antitranspirante Aerossol Fresh Deomilk 150ml|1|20
4005900715814|Antitranspirante Aerossol Sensitive Nivea Deomilk|1|20
4005900715838|Antitranspirante Aerossol Toque Seco Nivea Deomilk|1|20
4005900453259|Protetor Labial Nivea Amora Shine 4,8g|1|20
4005808369621|Protetor Med Repair Labial FPS 15 Blister 4,8g|1|20
4005808934980|Protetor Labial Melancia Shine Nivea Blister 4,8g|1|20
4005900663993|Protetor Labial Cereja Shine Nivea Blister 4,8g|1|20
4005900664006|Protetor Labial Pérola Shine Nivea Blister 4,8g|1|20
4005808850839|Protetor Labial Morango Shine Nivea Blister 4,8g|1|20`.split('\n')

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

                await fileChooser.accept([`C:/Users/GP Mateus/Desktop/Mateus Mais/Imagens/${produto[0]}.png`])
                    .then()
                    .catch(async () => {
                        noImage.push(produto[0])
                        console.log(' @@@@@@@@@@@@@@@@@@@@ IMAGEM NÃO ENCONTRADA @@@@@@@@@@@@@@@@@@@@ ')
                        await page.click('mat-dialog-container app-edit-product mat-dialog-content div button')
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
                // await page.waitForTimeout(500)
                // await page.click("div div.mat-select-arrow-wrapper")
                // await page.waitForTimeout(500)
                // await page.click("div.mat-select-content.ng-trigger.ng-trigger-fadeInContent mat-option:nth-child(2)")
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