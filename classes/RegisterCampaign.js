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
                            const listaLojas = 'MATEUS SUPERMERCADOS S.A. - SANTA INES|MATEUS SUPERMERCADOS S.A. - MIX STA INES|MATEUS SUPERMERCADOS S.A. - CEARA|MATEUS SUPERMERCADOS S.A. - GOIAS|MATEUS SUPERMERCADOS S.A. - MIX ITZ|MATEUS SUPERMERCADOS S.A. - MIX BACURI|MATEUS SUPERMERCADOS S.A. - JK|MATEUS SUPERMERCADOS S.A. - MIX BABACULANDIA|CAMINO CARCARA'.split('|');
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