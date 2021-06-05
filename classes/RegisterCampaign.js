class RegisterCampaign {
    static async Register(page, data) {

        const {
            nome_campanha,
            desc_campanha,
            inicio_campanha,
            fim_campanha,
            num_dias_credito,
            vlr_maximo_campanha,
            vlr_maximo_cpf,
            num_dias_provisao,
            des_codigo_referencia
        } = await data

        await page.waitForNavigation()
        await page.goto('https://lojista.izpay.com.br/campanhas/produtos')

        await page.waitForTimeout(2000)

        await page.waitForSelector("input[placeholder='Nome da Campanha']")
            .then(async () => {
                // Nome da campanha
                await page.type("input[placeholder='Nome da Campanha']", nome_campanha)
                // Descrição da Campanha
                await page.type("textarea[placeholder='Descrição da Campanha']", desc_campanha)
                // Início da Campanha
                await page.type("input[placeholder='Início da Campanha']", inicio_campanha)
                // Término da campanha
                await page.type("input[placeholder='Término da campanha']", fim_campanha)
                // Público da campanha (todos)
                await page.click("[formcontrolname='TipoPublico']")
                // Validade do Cashback após o recebimento do crédito
                await page.type("input[formcontrolname='num_dias_credito']", num_dias_credito)
                // Valor máximo de investimento
                await page.type("input[formcontrolname='vlr_maximo_campanha']", vlr_maximo_campanha)
                // Valor máximo por CPF nesta campanha
                await page.type("input[formcontrolname='vlr_maximo_cpf']", vlr_maximo_cpf)
                // Quantidade de dias que o crédito ficará bloqueado
                await page.type("input[formcontrolname='num_dias_provisao']", num_dias_provisao)
                // Código de referência
                await page.type("input[formcontrolname='des_codigo_referencia']", des_codigo_referencia)

                // LOJAS PARTICIPANTES
                await page.click("[placeholder='Selecione as lojas Participantes']")
                async function selecionarLojas() {

                    await page.waitForSelector('div.mat-select-content mat-option', { timeout: 15000 }).then(async () => {
                        await page.$$eval('div.mat-select-content mat-option', el => {
                            const listaLojas = 'MATEUS SUPERMERCADOS S.A. - ACAILANDIA|MATEUS SUPERMERCADOS S. A. MIX ACAILANDIA|POSTERUS SUPERMERCADOS LTDA- ARARI|MATEUS SUPERMERCADOS SA - MIX BACABAL|MATEUS SUPERMERCADOS S.A. - BALSAS|MATEUS SUPERMERCADOS S.A. - MIX BALSAS|CONVENIERE SUPERMERCADO - CATULO LETRA A|CONVENIERE SUPERMERCADOS - FLORA RICA|CONVENIERE SUPERMERCADOS - POTOSI|MATEUS SUPERMERCADOS S.A. - BARRA DO CORDA|MATEUS SUPERMERCADOS SA- MIX BARRA DO CORDA|POSTERUS SUPERMERCADOS LTDA - BARREIRINHAS|MATEUS SUPERMERCADOS S A SUPER BURITICUPU|POSTERUS SUPERMERCADOS CAROLINA|MATEUS SUPERMERCADOS S.A. - MIX CHAPADINHA|MATEUS SUPERMERCADO S A SUPER CODO|POSTERUS SUPERMERCADOS LTDA - COROATA|POSTERUS SUPERMERCADOS LTDA - ESTREITO|POSTERUS SUPERMERCADOS LTDA GRAJAU|MATEUS SUPERMERCADOS S.A. - CEARA|MATEUS SUPERMERCADOS S.A. - GOIAS|MATEUS SUPERMERCADOS S.A. - MIX BABACULANDIA|MATEUS SUPERMERCADOS S.A. - MIX BACURI|MATEUS SUPERMERCADOS S.A. - MIX ITZ|POSTERUS SUPERMERCADOS LTDA ITAPECURU|RUANNA SUPERMERCADOS LTDA|POSTERUS SUPERMERCADOS LAGO DA PEDRA LTDA|SUPERMERCADO 3 L CASA DO ARROZ|MATEUS SUPERMERCADOS S A SUPER MAIOBAO|MATEUS SUPERMERCADOS SA - MIX PEDREIRAS|MATEUS SUPERMERACADOS SA - MIX PINHEIRO|MATEUS SUPERMERCADOS SA - PRES DUTRA|POSTERUS SUPERMERCADOS LTDA - ROSARIO|MATEUS SUPERMERCADOS S.A. - COHATRAC|MATEUS SUPERMERCADOS S.A. - PATIO NORTE|MATEUS SUPERMERCADOS S.A. - MIX MAIOBAO|POSTERUS SUPERMERCADOS LTDA - S J RIBAMAR|MATEUS SUPERMERCADOS S.A. - SANTA INES|MATEUS SUPERMERCADOS S.A. - MIX STA INES|CAMINO CARCARA|POSTERUS SUPERMERCADOS LTDA SANTA LUZIA|POSTERUS SUPERMERCADOS LTDA - SANTA RITA|MATEUS SUPERMERCADOS S.A. - COHAB|MATEUS SUPERMERCADOS S.A. - COHAMA|MATEUS SUPERMERCADOS S.A. - TURU-SM08|MATEUS SUPERMERCADOS S.A. - TURU-SM27|MATEUS SUPERMERCADOS S.A. - CID. OPERARIA|MATEUS SUPERMERCADOS S.A. - RIO ANIL|MATEUS SUPERMERCADOS S.A. - CALHAU|MATEUS SUPERMERCADOS S.A. - MIX TIRICAL|MATEUS SUPERMERCADOS S.A. - S. DA ILHA|MATEUS SUPERMERCADOS S.A. - MIX VINHAIS|MATEUS SUPERMERCADOS S.A. - CAJAZEIRAS|MATEUS SUPERMERCADOS S.A. - MIX JARDIM TROPICAL|MATEUS SUPERMERCADOS S.A. - BACANGA|MATEUS SUPERMERCADOS S.A. - JARDIM RENASCENCA|MATEUS SUPERMERCADOS S.A. - MIX JOAO PAULO|MATEUS SUPERMERCADOS S.A. SUPER ANIL|MATEUS SUPERMERCADOS S.A. - SUPER COHATRAC|MATEUS SUPERMERCADOS S A MIX ARACAGY|MATEUS SUPERMERCADOS S A MIX GUAJAJARAS FORQUILHA|MERCADINHO CARONE LTDA - REC VINHAIS LJ 003|MERCADINHO CARONE LTDA - A DA GUARDA LJ 005|MERCADINHO CARONE LTDA - MAIOBAO LJ 006|MERCADINHO CARONE LTDA - S CRISTOVAO LJ 004|MERCADINHO CARONE LTDA - MARANH NOVO LJ 002|MERCADINHO CARONE LTDA - ITAPIRACO LJ 001|POSTERUS SUPERMERCADOS LTDA - SAO BERNARDO|POSTERUS SUPERMERCADOS LTDA - DIVINEIA|POSTERUS SUPERMERCADOS LTDA TUTOIA|POSTERUS SUPERMERCADOS LTDA VARGEM GRANDE|POSTERUS SUPERMERCADOS VIANA|SUPERMERCADO GADELHA LTDA|POSTERUS SUPERMERCADOS LTDA ZE DOCA'.split('|');
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

                return

            })
    }
}

module.exports = RegisterCampaign