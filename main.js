
function start(data) {
    let arquivo = data.split('|');
    // Nome da campanha
    const Nome_da_Campanha = document.querySelector("input[placeholder='Nome da Campanha']")
    Nome_da_Campanha.value = arquivo[0];
    Nome_da_Campanha.addEventListener('focus', (e) => {
        Nome_da_Campanha.select()
        document.execCommand("copy");
    })

    // Descrição da Campanha
    const Descrição_da_Campanha = document.querySelector("textarea[placeholder='Descrição da Campanha']")
    Descrição_da_Campanha.value = arquivo[1];
    Descrição_da_Campanha.addEventListener('focus', (e) => {
        Descrição_da_Campanha.select()
        document.execCommand("copy");
    })

    // Início da Campanha
    const Início_da_Campanha = document.querySelector("input[placeholder='Início da Campanha']")
    Início_da_Campanha.value = "29/03/2021";
    Início_da_Campanha.addEventListener('focus', (e) => {
        Início_da_Campanha.select()
        document.execCommand("copy");
    })

    // Término da campanha
    const Término_da_campanha = document.querySelector("input[placeholder='Término da campanha']")
    Término_da_campanha.value = "04/04/2021";
    Término_da_campanha.addEventListener('focus', (e) => {
        Término_da_campanha.select()
        document.execCommand("copy");
    })


    // Público da campanha (todos)
    document.querySelector("mat-radio-group[formcontrolname='TipoPublico'] mat-radio-button input[type='radio']").click();

    // Validade do Cashback após o recebimento do crédito
    const num_dias_credito = document.querySelector("input[formcontrolname='num_dias_credito']")
    num_dias_credito.value = 90
    num_dias_credito.addEventListener('focus', (e) => {
        num_dias_credito.select()
        document.execCommand("copy");
    })

    // Valor máximo de investimento
    const vlr_maximo_campanha = document.querySelector("input[formcontrolname='vlr_maximo_campanha']")
    vlr_maximo_campanha.value = arquivo[2];
    vlr_maximo_campanha.addEventListener('focus', (e) => {
        vlr_maximo_campanha.select()
        document.execCommand("copy");
    })

    // Valor máximo por CPF nesta campanha
    const vlr_maximo_cpf = document.querySelector("input[formcontrolname='vlr_maximo_cpf']")
    vlr_maximo_cpf.value = arquivo[3];
    vlr_maximo_cpf.addEventListener('focus', (e) => {
        vlr_maximo_cpf.select()
        document.execCommand("copy");
    })

    // Quantidade de dias que o crédito ficará bloqueado
    const num_dias_provisao = document.querySelector("input[formcontrolname='num_dias_provisao']")
    num_dias_provisao.value = 7;
    num_dias_provisao.addEventListener('focus', (e) => {
        num_dias_provisao.select()
        document.execCommand("copy");
    })

    // Código de referência
    const des_codigo_referencia = document.querySelector("input[formcontrolname='des_codigo_referencia']")
    des_codigo_referencia.value = arquivo[4];
    des_codigo_referencia.addEventListener('focus', (e) => {
        des_codigo_referencia.select()
        document.execCommand("copy");
    })

    // LOJAS PARTICIPANTES

    function selecionarLojas() {
        let listaLojas = `MERCADINHO CARONE LTDA - S CRISTOVAO LJ 004|POSTERUS SUPERMERCADOS LTDA - SAO BERNARDO|POSTERUS SUPERMERCADOS LTDA - DIVINEIA|POSTERUS SUPERMERCADOS LTDA - S J RIBAMAR|MERCADINHO CARONE LTDA - ITAPIRACO LJ 001|MERCADINHO CARONE LTDA - MARANH NOVO LJ 002|MERCADINHO CARONE LTDA - REC VINHAIS LJ 003|MERCADINHO CARONE LTDA - S CRISTOVAO LJ 00|MERCADINHO CARONE LTDA - MAIOBAO LJ 006|MERCADINHO CARONE LTDA - A DA GUARDA LJ 005|MATEUS SUPERMERCADOS S.A. - COHAB|MATEUS SUPERMERCADOS S.A. - MIX JOAO PAULO|MATEUS SUPERMERCADOS S.A. - TURU-SM08|MATEUS SUPERMERCADOS S.A. - MIX MAIOBAO|MATEUS SUPERMERCADOS S.A. - COHAMA|MATEUS SUPERMERCADOS S.A. - CID. OPERARIA|MATEUS SUPERMERCADOS S.A. - CALHAU|MATEUS SUPERMERCADOS S.A. - MIX TIRICAL|MATEUS SUPERMERCADOS S.A. - RIO ANIL|MATEUS SUPERMERCADOS S.A. - COHATRAC|MATEUS SUPERMERCADOS S.A. - S. DA ILHA|MATEUS SUPERMERCADOS S.A. - MIX VINHAIS|MATEUS SUPERMERCADOS S.A. - CAJAZEIRAS|MATEUS SUPERMERCADOS S.A. - MIX JARDIM TROPICAL|MATEUS SUPERMERCADOS S.A. - TURU-SM27|MATEUS SUPERMERCADOS S.A. - BACANGA|MATEUS SUPERMERCADOS S.A. - PATIO NORTE|MATEUS SUPERMERCADOS S.A. - JARDIM RENASCENCA|MATEUS SUPERMERCADOS SA SJR|MATEUS SUPERMERCADOS 7 DE SETEMBRO|MATEUS SUPERMERCADOS S.A. - SUPER COHATRAC|MATEUS SUPERMERCADOS S.A. SUPER ANIL|MATEUS SUPERMERCADOS S.A - MIX DANIEL DE LA TOUCHE|MATEUS SUPERMERCADOS S A MIX ARACAGY|MATEUS SUPERMERCADOS S A SUPER MAIOBAO|MATEUS SUPERMERCADOS S A MIX GUAJAJARAS FORQUILHA|MATEUS SUPERMERCADOS S A SUPER CURVA DO 90|MATEUS SUPERMERCADOS S A MIX BRAGANCA`.split('|');

        document.querySelector("mat-select[placeholder='Selecione as lojas Participantes']").click();
        const elements = document.querySelectorAll('div.mat-select-content mat-option');

        setTimeout(() => {
            elements.forEach(async mat => {
                const text = await mat.querySelector('span.mat-option-text').innerText;

                listaLojas.map(loja => {
                    loja == text ? mat.click() : null;
                });
            });
        }, 1000)
    }

    setTimeout(() => {
        selecionarLojas()
    }, 1000)
    //document.querySelector("button.iz-button-in.mat-flat-button.mat-accent[mat-flat-button]").click();
}