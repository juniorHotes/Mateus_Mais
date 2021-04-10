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
        nome_campanha: '03-SEMANA-UNILEVER-01',
        desc_campanha: 'Oferta válida para compras realizadas por pessoas físicas, com limite de R$ 24,00 por CPF, nas lojas Mateus Supermercados, Mix Atacarejo e Camiño em São Luís-Ma. Vigente de 12/04/2021 a 25/04/2021 ou enquanto durarem os estoques.',
        inicio_campanha: '12/04/2021',
        fim_campanha: '25/04/2021',
        num_dias_credito: '90',
        vlr_maximo_campanha: '15.000,00',
        vlr_maximo_cpf: '24,00',
        num_dias_provisao: '7',
        des_codigo_referencia: 'UNILEVER-TRADE',
    }

    await page.waitForNavigation()
    await page.goto('https://lojista.izpay.com.br/campanhas/produtos?cod_gestao_campanha=8622')

    // await RegisterCampaign.Register(page, dataCampanha);

    const produtos =
`7506306241176|Desodorante Aerosol Feminino Invisible Dry  150ml|1|2,2
7791293033242|Aerossol Antibacteriano Cuida & Protege 150ml|1|2,2
7791293033235|Desodorante Aerosol Feminino Beauty Finish 150ml |1|2,2
7791293033266|Desodorante Aerosol Feminino Gran Verbena 150ml|1|2,2
7506306241183|Desodorante Aerosol Feminino Original 150ml |1|2,2
7506306241169|Desodorante Aerosol Feminino Fresh Pepino 150ml |1|2,2
7791293012063|Desodorante Aerosol Men Extra Fresh Dove 150ml |1|2,2
7791293035222|Desodorante Aerosol Feminino Erva Doce 150ml |1|1,1
7891150066816|Antitranspirante Aerossol Hidratação 150ml|1|1,1
7791293038636|Desodorante Aerossol Xêro Danado de Bom 150ml|1|1,1
7791293035000|Desodorante Aerosol Men Sport Fresh  150ml|1|1,1
7791293034973|Desodorante Aerosol Feminino Invisible  150ml|1|1,1
7791293035215|Desodorante Aerosol Feminino Jasmim e Coco 150ml|1|1,1
7791293034980|Desodorante Aerosol Frutas Vermelhas 150ml|1|1,1
7791293035017|Desodorante Aerosol Invisible Suave Men 88ml|1|1,1
7791293034997|Desodorante Aerosol Intense Protection Men 150ml |1|1,1
7891150077065|Desodorante Aerossol Energia Ativa  Men 150ml|1|1,1
79400052926|Antitranspirante Creme Clinical Women 48g|1|3,9
79400052919|Antitranspirante Creme Clean Clinical Men 48g|1|3,9
79400301161|Antitranspirante Creme Extra Dry Clinical 48g|1|3,9
7891150060883|Creme para Pentear Babosa e Óleos by Rayza 300ml |1|1,2
7891150054493|Creme para Pentear Boom Definição Frasco 295ml|1|1,2
7891150054523|Creme para Pentear Boom Transição Frasco 295ml|1|1,2
7891150054509|Creme para Pentear Boom Volumão Frasco 295ml|1|1,2
7891037144705|Creme para Pentear Ceramidas Brilho Frasco 300ml|1|1,2
7891037000322|Creme para Pentear  Cachos Definidos Frasco 300ml |1|1,2
7891150027541|Creme de Pentear Crespo Force Gabi Oliveira 300ml|1|1,2
7891150031746|Creme para Pentear Recarga Natural Antinós 300ml|1|1,2
7891037010048|Creme para Pentear  Liso Perfeito Frasco 300ml|1|1,2
7891150074002|Creme para Pentear Ondas Antifrizz 300ml|1|1,2
7898422745301|Creme para Pentear  Pretos Luminosos Frasco 300ml |1|1,2
7891150030756|Creme para Pentear Super Óleos Hidratação 300ml|1|1,2
7891150060722|Condicionador Babosa e Óleos by Rayza Frasco 325ml|1|1,5
7891150070295|Condicionador Bambu e Biotina 325ml|1|1,5
7891150056589|Condicionador Cocriações Bomba Argan Frasco 325ml |1|1,5
7891150067516|Condicionador Recarga Natural Bomba Coco 325ml |1|1,5
7891150049604|Condicionador Bomba de Nutrição 325ml |1|1,5
7891150037465|Condicionador Cachos Definidos Frasco 325ml |1|1,5
7891150037250|Condicionador Ceramidas Frasco 325ml |1|1,5
7891150037274|Condicionador Crescimento Saudável Frasco 325ml |1|1,5
7891150037618|Condicionador Crespo Force by Gabi Oliveira 325ml |1|1,5
7891150037489|Condicionador Natural Hidratação Antinós 325ml |1|1,5
7891150078307|Condicionador Babosa & Óleo de Coco 325ml|1|1,5
7891150078338|Condicionador Azeite Mamona & Café 325ml|1|1,5
7891150078314|Condicionador Mandacaru & Cajá 325ml|1|1,5
7891150037632|Condicionador Seda Cocriações Liso Extremo 325ml |1|1,5
7891150037328|Condicionador Seda Cocriações Liso Perfeito 325ml |1|1,5
7891150037441|Condicionador Seda Antiquebra Mel 325ml |1|1,5
7891150037366|Condicionador Seda Óleo Hidratação 325ml |1|1,5
7891150074019|Condicionador Seda Ondas Antifrizz 325ml|1|1,5
7891150037342|Condicionador Seda Pretos Luminosos 325ml|1|1,5
7891150037427|Condicionador Seda Restauração Instantânea 325ml|1|1,5
7891150078277|Creme de Tratamento Babosa & Óleo de Coco 920g|1|3
7891150060685|Shampoo Seda Babosa e Óleos by Rayza Frasco 325ml |1|1,3
7891150070301|Shampoo Recarga Natural Bambu e Biotina 325ml |1|1,3
7891150056572|Shampoo Seda Cocriações Bomba Argan Frasco 325ml |1|1,3
7891150067509|Shampoo Seda Recarga Natural Bomba Coco 325ml |1|1,3
7891150049628|Shampoo Seda Bomba de Nutrição 325ml |1|1,3
7891150055629|Shampoo Seda Co-Criado Boom Liberado 325ml|1|1,3
7891150037595|Shampoo Seda Cachos com Efeito Fitagem 325ml |1|1,3
7891150037397|Shampoo Seda Cocriações Ceramidas Frasco 325ml |1|1,3
7891150037434|Shampoo Seda Crescimento Saudável 325ml |1|1,3
7891150037472|Shampoo Seda Crespo Force by Gabi Oliveira 325ml |1|1,3
7891150037601|Shampoo Seda Recarga Natural Antinós 325ml |1|1,3
7891150037458|Shampoo Anticaspa Seda Hidratação Diária 325ml |1|1,3
7891150078352|Shampoo Babosa & Óleo de Coco Seda 325ml|1|1,3
7891150078345|Shampoo Azeite Mamona & Café Seda 325ml|1|1,3
7891150078369|Shampoo Mandacaru & Cajá Seda 325ml|1|1,3
7891150037502|Shampoo Seda Cocriações Liso Extremo 325ml|1|1,3
7891150037519|Shampoo Seda Cocriações Liso Perfeito 325ml |1|1,3
7891150037588|Shampoo Seda Recarga Natural Antiquebra Mel 325ml |1|1,3
7891150037540|Shampoo Seda Cocriações Óleo Hidratação 325ml |1|1,3
7891150073999|Shampoo Seda Ondas Antifrizz by Gigi Grigio 325ml|1|1,3
7891150072886|Shampoo Seda Pós Danos by Rayza Frasco 325ml |1|1,3
7891150037526|Shampoo Seda Cocriações Pretos Luminosos 325ml |1|1,3
7891150037564|Shampoo Seda Recarga Natural Pureza Detox 325ml |1|1,3
7891150037571|Shampoo Seda Restauração Instantânea 325ml |1|1,3
7896496917525|Biscoito Cracker de Gergelim Tribos Mãe Terra 130g|1|0,8
7896496917501|Biscoito Cracker Original Tribos Mãe Terra 130g|1|0,8
7891150071193|Lava-Roupas Brancas e Coloridas Delicadeza 3l |1|3,6
7891150064713|Lava-Roupas Brancas e Coloridas Higiene Total 3l |1|3,6
7891150020672|Lava-Roupas Brancas e Coloridas Limpeza Total 3l |1|3,6
7891150044906|Lava-Roupas Líquido Omo Puro Cuidado Galão 3l |1|4,8
7891150053892| Lava-Roupas Líquido Omo Sports Galão 3l |1|4,8
7891150020689|Lava-Roupas Omo Lavagem Perfeita Galão 3l |1|4,8
7891150062825|Lava-Roupas Lavanda Omo Lavagem Perfeita 3l|1|4,8
7891150072657|Lava-Roupas sem Perfume Omo Proteção Micelar 3l|1|4,8
7891150025356|Limpa-Vidro Líquido Cif Ultra Rápido 500ml |1|1,2
7891150038547|Limpa-Vidro Cif Sachê Refil Econômico 450ml |1|1,2
7891150071773|Limpa-Vidro Líquido Cif Squeeze 500ml|1|1,2
7891150071612|Lava-Louças Concentrado Neutro com Camomila 420ml |1|0,6
7891150071629|Lava-Louças Concentrado Poder dos 100 Limões 420ml|1|0,6
7891150071605|Lava-Louças Líquido Concentrado Erva-Doce 420ml |1|0,6
7891150071582|Limpador Uso Geral Energizante Perfumes 450ml |1|0,6
7891150071568|Limpador Uso Geral Harmonizante Perfumes 450ml |1|0,6
7891150071551|Limpador Uso Geral Harmonizante Perfumes 900ml |1|1,2
7891150071599|Limpador Uso Geral Purificante Perfumes 900ml |1|1,2
7891150071544|Limpador Uso Geral Envolvente Perfumes 450ml |1|0,6
7891150071537| Limpador Uso Geral Energizante Perfumes 900ml |1|1,2
7891150071520|Limpador Uso Geral Relaxante Perfumes 450ml |1|0,6
7891150071513|Limpador Uso Geral Purificante Perfumes 450ml |1|0,6
7891150071506|Limpador Uso Geral Relaxante Perfumes 900ml |1|1,2
7891150071490|Limpador Uso Geral Envolvente Perfumes 900ml |1|1,2
7891150076471|Lava-Louças Concentrado sem Perfume Pro 500ml|1|0,6
7891150071643|Removedor de Gorduras Cozinha Squeeze 500ml |1|0,6
7891150079052|Granulado Sanitário para Gatos Cafuné 1,3kg|1|2,8
7891150075764|Aromatizante de Ambiente Capim-Limão Cafuné 500ml|1|2,1
7891150075580|Shampoo Uso Veterinário Amêndoas Cafuné 300ml|1|2,2
7891150075597|Shampoo Veterinário Pelos Claros Camomila 300ml|1|2,2
7891150075603|Shampoo Veterinário sem Fragrância Cafuné 300ml|1|2,2
7891150075788|Limpador para Pisos Rosas e Lichia Cafuné 900ml|1|1,4
7891150075795|Limpador para Pisos Flores Brancas Cafuné 900ml|1|1,4
7891150075610|Shampoo Veterinário Filhotes Aveia Cafuné 300ml|1|2,2
7891150075573| Condicionador Uso Veterinário Aveia Cafuné 300ml|1|2,2
7891150075566|Condicionador Veterinário Aloe Vera Cafuné 300ml|1|2,2
7891150075191|Desinfetante Multiuso Erva-Doce Cafuné 500ml |1|2,1
7891150075542|Shampoo Veterinário Filhotes Aveia Cafuné 5l|1|2,2
7891150075535|Shampoo Veterinário sem Fragrância Cafuné 5l|1|2,2
7891150075528|Shampoo Veterinário Pelos Claros Cafuné 5l|1|2,2
7891150075511|Condicionador Veterinário Aloe Vera Cafuné 5l|1|2,2
7891150068261|Mingau Cremogema Sabor Tradicional Caixa 180g |1|0,7
7891150068278|Mingau Chocolate Maizena Cremogema Caixa 180g|1|0,7
7891150068308|Mingau Morango Maizena Cremogema Caixa 180g|1|0,7
7891150071032|Mingau Maracujá Maizena Cremogema Caixa 160g|1|0,7
7896496911615|Semente de Chia Integral Orgânica Mãe Terra 100g|1|1
7896496940325|Cacau em Pó Mãe Terra Caixa 100g|1|1
7891150073135|Aveia em Flocos Mãe Terra Caixa 170g|2|0,69
7891150073128|Farelo de Aveia Mãe Terra Caixa 170g|2|0,69
7896496912520|Quinoa em Grãos Integral Orgânica Mãe Terra 250g|2|1
7896496972104|Granola Frutas e Mel Sem Adição de Açúcar 250g|1|1
7891150076884|Granola Crocante 7 Grãos Integrais Mãe Terra 1kg|1|1
7891700033640|Ketchup Tradicional Arisco Squeeze 390g|1|1,0725`.split('\n')

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
    let index = 131
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

                await fileChooser.accept([`C:/Users/GP Mateus/Desktop/Mateus Mais/Semana 3/ALL/${produto[0]}.png`])
                    .then()
                    .catch(async () => {
                        noImage.push(produto[0])
                        console.log(' @@@@@@@@@@@@@@@@@@@@ IMAGEM NÃO ENCONTRADA @@@@@@@@@@@@@@@@@@@@ ')
                        await page.click('mat-dialog-container app-new-product mat-dialog-content div button')
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