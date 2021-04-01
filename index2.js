const puppeteer = require('puppeteer');

const RegisterCampaign = require('./classes/RegisterCampaign')

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
        nome_campanha: 'LANÇAMENTO-UNILEVER-04',
        desc_campanha: 'Oferta válida para compras realizadas por pessoas físicas, com limite de R$ 24,00 por CPF, nas lojas Mateus Supermercados, Mix Atacarejo e Camiño em São Luís-Ma. Vigente de 05/04/2021 a 11/04/2021 ou enquanto durarem os estoques. Código da Campanha: 0009',
        inicio_campanha: '05/04/2021',
        fim_campanha: '11/04/2021',
        num_dias_credito: '90',
        vlr_maximo_campanha: '10,000,00',
        vlr_maximo_cpf: '24,00',
        num_dias_provisao: '7',
        des_codigo_referencia: 'UNILEVER-TRADE-LANÇAMENTO',
    }

    await page.waitForNavigation()
    await page.goto('https://lojista.izpay.com.br/campanhas/produtos?cod_gestao_campanha=8307')

    // await RegisterCampaign.Register(page, dataCampanha);

    const produtos = 
`7891150054493|Creme para Pentear Boom Definição Frasco 295ml|1|15
7891150027541|Creme de Pentear Crespo Force Gabi Oliveira 300ml|1|15
7891150074002|Creme de Pentear Ondas Antifrizz Gigi Grigio 300ml|1|15
7891150030756|Creme para Pentear Super Óleos Hidratação 300ml|1|15
7891150067516|Condicionador Recarga Natural Bomba Coco 325ml |1|15
7891150037465|Condicionador Cachos Definidos Frasco 325ml |1|15
7891150037274|Condicionador Crescimento Saudável Frasco 325ml |1|15
7891150037489|Condicionador Natural Hidratação Antinós 325ml |1|15
7891150078338|Condicionador Azeite Mamona & Café 325ml|1|15
7891150037328|Condicionador Seda Cocriações Liso Perfeito 325ml |1|15
7891150060685|Shampoo Seda Babosa e Óleos by Rayza Frasco 325ml |1|15
7891150056572|Shampoo Seda Cocriações Bomba Argan Frasco 325ml |1|15
7891150049628|Shampoo Seda Recarga Natural Bomba Nutrição 325ml|1|15
7891150037397|Shampoo Seda Cocriações Ceramidas Frasco 325ml |1|15
7891150037601|Shampoo Seda Recarga Hidratação Antinós 325ml|1|15
7891150078352|Shampoo Seda Babosa & Óleo de Coco 325ml|1|15
7891150037588|Shampoo Seda Recarga Natural Antiquebra Mel 325ml|1|15
7891150073999|Shampoo Seda Ondas Antifrizz by Gigi Grigio 325ml|1|15
7891150037564|Shampoo Seda Recarga Natural Pureza Detox 325ml|1|15
7896496917501|Biscoito Cracker Original Tribos Mãe Terra 130g|1|15
7891150020672|Lava-Roupas Brancas e Coloridas Limpeza Total 3l|1|15
7891150020689|Lava-Roupas Líquido Omo Lavagem Perfeita 3l|1|15
7891150072657|Lava-Roupas sem Perfume Omo Proteção Micelar 3l|1|15
7891150038547|Limpa-Vidro Cif Sachê Refil Econômico 450ml|1|15
7891150071605|Lava-Louças Líquido Concentrado Erva-Doce 420ml|1|15
7891150071599|Limpador Uso Geral Purificante Perfumes 900ml|1|15
7891150071537|Limpador Uso Geral Energizante Perfumes 900ml|1|15
7891150076471|Lava-Louças Concentrado sem Perfume Pro 500ml|1|15
7891150079052|Granulado Sanitário para Gatos Cafuné Pacote 1,3kg|1|15
7891150075597|Shampoo Veterinário Pelos Claros Camomila 300ml|1|15
7891150075788|Limpador para Pisos Rosas e Lichia Cafuné 900ml|1|15
7891150075573|Condicionador Veterinário Aveia Cafuné 300ml|1|15
7891150075191|Desinfetante Multiuso Erva-Doce Cafuné 500ml|1|15
7891150075535|Shampoo Uso Veterinário Profissional Fragrância 5l|1|15
7891150075511|Condicionador Uso Veterinário Aloe Vera Cafuné 5l|1|15
7891150068278|Mingau Chocolate Maizena Cremogema Caixa 180g|1|15`.split('\n')


    // //#region CADASTRAR NOVO PRODUTO
    let index = 0
    let resvisar = 1
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
                        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ IMAGEM NÃO ENCONTRADA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                        console.log("PRODUTO NÃO CADASTRADO")

                        index++
                        if (index <= produtos.length - 1) {
                            await start()
                        } else {
                            console.log('######### PRODUTOS CADASTRADOS ##############')
                        }
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

                            await page.$$eval('div.mat-expansion-panel-content.ng-trigger.ng-trigger-bodyExpansion div.mat-expansion-panel-body div div div.body-col-ean span',
                                ean => console.log(ean.innerHTML.split(' ')[1]))

                            if (resvisar == 2) {
                                console.log('################################## PRODUTOS CADASTRADOS ##################################')
                                return 
                            }
                            else {
                                index = 0
                                resvisar++
                                console.log('################################## REVISANDO PRODUTOS ##################################')
                                await start()
                            }
                        }
                    } else {
                        await restart()
                    }
                }

                await restart()

            })
    }
    await start()
    //#endregion CADASTRAR NOVO PRODUTO

};

main()