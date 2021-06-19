
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

        await page.waitForSelector("body app-root mat-sidenav-container mat-sidenav div app-sidebar mat-list mat-list-item:nth-child(10) div a")
            .then(async (item) => {
                await item.click()
                await page.waitForTimeout(1500)
                await page.click("body app-root mat-sidenav-container mat-sidenav div app-sidebar mat-list mat-list-item:nth-child(10) div ul mat-list-item:nth-child(3) div a")
                await page.waitForTimeout(1500)
                await page.waitForSelector("body app-root mat-sidenav-container mat-sidenav-content div app-campaing-page mat-card div button.mat-focus-indicator.button-dark.btn-new-entity.mat-button.mat-button-base.ng-star-inserted")
                    .then(async (item) => {
                        await item.click()
                        await page.waitForTimeout(1500)
                        await page.click("#opcao-cashback div")
                        await page.waitForTimeout(1500)
                        await page.click("#nova-campanha")
                        await page.waitForTimeout(1500)
                        await page.click("#opcao-produto div")
                        await page.waitForTimeout(1500)
                        await page.click("#nova-campanha")
                        await page.waitForTimeout(1500)

                    })
            }).catch(err => console.error(err))


        await page.waitForSelector("input[formcontrolname='nom_campanha']")
            .then(async () => {
                // Nome da campanha
                await page.type("input[formcontrolname='nom_campanha']", nome_campanha)
                // Início da Campanha
                await page.type("input[formcontrolname='dat_inicio_campanha']", inicio_campanha)
                // Término da campanha
                await page.type("input[formcontrolname='dat_final_campanha']", fim_campanha)
                // Descrição da Campanha
                await page.type("textarea[formcontrolname='des_campanha']", desc_campanha)
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

                // Público da campanha (todos)
                await page.click("[formcontrolname='cod_publico']")
                await page.waitForTimeout(1500)
                await page.click("div[role='listbox'] mat-option mat-pseudo-checkbox")
                await page.waitForTimeout(1000)
                await page.click(".cdk-overlay-backdrop.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing")

                await page.waitForTimeout(1500)
                // LOJAS PARTICIPANTES
                await page.click("[formcontrolname='cod_lojas']")
                async function selecionarLojas() {

                    await page.$$eval('.mat-select-panel-wrap div[role="listbox"] mat-option', async matOption => {
                        console.log(matOption);
                        const LojasParticipantes = "SUPERMERCADO MATEUS CASTANHAL|SUPERMERCADO MATEUS JARDELANDIA|MIX ATACAREJO BELEM|SUPERMERCADO MATEUS MARAMBAIA|SUPERMERCADO MATEUS MAGUARI|MIX ATACAREJO CASTANHAL|MIX ATACAREJO ABAETETUBA|MIX ATACAREJO MARITUBA|SUPERMERCADO MATEUS BARCARENA|MIX ATACAREJO PEDREIRA|MIX ATACAREJO CAPANEMA|MIX ATACAREJO COQUEIRO|MIX ATACAREJO CIDADE NOVA".split('|')
                        console.log(LojasParticipantes);

                        matOption.forEach(elem => {
                            console.log(elem);
                            const text = elem.innerText;
                            LojasParticipantes.map(loja => {
                                return loja === text ? elem.click() : null;

                            });
                        });
                    })
                }

                await page.waitForTimeout(2000)
                await selecionarLojas()
                await page.waitForTimeout(2000)
                await page.click(".cdk-overlay-backdrop.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing")

                // SALVAR COMO RASCUNHO 
                await page.click('mat-sidenav-container mat-sidenav-content div app-product-edit-page mat-card mat-card-subtitle div.ng-star-inserted div button.mat-focus-indicator.iz-button-in.btn-rascunho.mat-stroked-button.mat-button-base')

                return

            })
    }
}

module.exports = RegisterCampaign