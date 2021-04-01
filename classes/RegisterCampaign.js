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
        await page.type("input[formcontrolname='des_codigo_referencia']",des_codigo_referencia)

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

        return
    }
}

module.exports = RegisterCampaign