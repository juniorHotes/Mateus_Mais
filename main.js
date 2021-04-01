
const produtos =
    `7791293035222|Desodorante Aerosol Lavanda e Erva Doce 150ml |1|15
7891150066816|Antitranspirante Aerossol Hidratação 150ml|1|15
7791293038636|Desodorante Aerossol Xêro Danado de Bom 150ml|1|15
7791293035000|Desodorante Aerosol Men Sport Fresh 150ml|1|15
7791293034973|Desodorante Aerosol Feminino Invisible 150ml|1|15
7791293035215|Desodorante Aerosol Feminino Jasmim e Coco 150ml|1|15`.split('\n')

const cadastrados =
`7791293038636
7791293035215
7791293035000`.split('\n')

const eans = produtos.map(item => item.split('|')[0])

produtos.map((item, index) => {
    const ean = item.split('|')
    cadastrados.map((it, idx)=> {
        if(it != ean[0]) console.log(it)
    })
})