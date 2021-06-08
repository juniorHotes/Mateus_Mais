const fs = require('fs');
const { promisify } = require('util');

class RegisterCampaign {
    
    static async Register(page, data) {
        const file = promisify(fs.readFile)

        async function readFile() {
            const dataFile = await file('LojasParticipantes.csv', 'UTF-8')
            const row = dataFile.split('\r\n')
            return row
        }

        const LojasParticipantes = await readFile()
    
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
        .then(async () => {
            await page.click("body app-root mat-sidenav-container mat-sidenav div app-sidebar mat-list mat-list-item:nth-child(10) div a")
            await page.waitForTimeout(1000)
            await page.click("body app-root mat-sidenav-container mat-sidenav div app-sidebar mat-list mat-list-item:nth-child(10) div ul mat-list-item:nth-child(3) div a")
            await page.waitForTimeout(1000)
            await page.click("body app-root mat-sidenav-container mat-sidenav-content div app-campaing-page mat-card div button.mat-focus-indicator.button-dark.btn-new-entity.mat-button.mat-button-base.ng-star-inserted")
            await page.waitForTimeout(1000)
            await page.click("#opcao-cashback div")
            await page.waitForTimeout(1000)
            await page.click("#nova-campanha")
            await page.waitForTimeout(1000)
            await page.click("#opcao-produto div")
            await page.waitForTimeout(1000)
            await page.click("#nova-campanha")
            await page.waitForTimeout(1000)
        })


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
    

                // LOJAS PARTICIPANTES
                await page.click("[formcontrolname='cod_lojas']")
                async function selecionarLojas() {

                    await page.waitForSelector('.cdk-overlay-pane mat-option', { timeout: 15000 }).then(async () => {
                        await page.$$eval('.cdk-overlay-pane mat-option', el => {
                            const listaLojas = LojasParticipantes
                            el.forEach(async mat => {
                                const text = await mat.innerText;
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