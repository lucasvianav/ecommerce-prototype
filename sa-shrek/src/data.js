let data = {
    products: [
        {
            name: 'Moletom Canguru Shrek',
            visibility: true,
            category: 'Moletons',
            description: {ul: ['Moletom branco modelo canguru com logo da SA-Shrek estampado na frente.', 'Tecido 100% algodão de alta qualidade.', 'Garantia de 6 meses contra erros de fabricação.'], ol: [], txt: ``},
            templates: ['Feminino', 'Masculino'],
            sizes: ['PP', 'P', 'M', 'G', 'GG', 'EXG'],
            colors: [],
            price: {full: 130.00, sale: 130.00},
            img: [
                {small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: `Frente de um moletom branco com uma pequena estampa na frente com o logo da 'SA-Shrek' fundo preto com pontinhos brancos (semelhante a um céu estrelado)`},
                {small: '/img/products/moletom_canguru_back.png', large: '/img/products/moletom_canguru_back.png', alt: `Costas de um moletom branco fundo preto com pontinhos brancos (semelhante a um céu estrelado)`}
            ],
            sizeTable: {img: '/img/products/size.png', alt: `Na imagem: Mokup de moletom e Tabela de Medidas. Na tabela há São 6 colunas. Na ordem: Tipo de medidas, P, M, G, GG, Tolerancia. E 3 linhas. Na ordem: Toráx, Comprimento, Comp. Manga. Na coluna P: 53, 69, 70. Na coluna M: 56, 71, 71. Na coluna GG: 62, 75, 73. Na coluna tolerancia: +-1.5, +-1.5, +-1.0. Observação em baixo da tabela: 'medidas em centímetros'.`},
            stock: { // stock: { colors: {templates: {sizes: int} } }
                noColor: {
                    Feminino: {PP: 5, P: 5, M: 5, G: 5, GG: 5, EXG: 0},
                    Masculino: {PP: 5, P: 5, M: 5, G: 5, GG: 5, EXG: 5}
                }
            },
            sku: 'p1'
        },
        {
            name: 'Moletom Crewneck Shrek',
            visibility: true,
            category: 'Moletons',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 80.00, sale: 80.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p2'
        },
        {
            name: 'Corta-Vento Shrek',
            visibility: true,
            category: 'Moletons',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 99.00, sale: 99.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p3'
        },
        {
            name: 'Samba-Canção TUSCA',
            visibility: true,
            category: 'Kit TUSCA',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 30.00, sale: 30.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p4'
        },
        {
            name: 'Caneca TUSCA',
            visibility: true,
            category: 'Kit TUSCA',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 15.00, sale: 15.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p5'
        },
        {
            name: 'Camiseta TUSCA',
            visibility: true,
            category: 'Kit TUSCA',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 30.00, sale: 30.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p6'
        },
        {
            name: 'Camiseta de Bixo 2049',
            visibility: true,
            category: 'Kit Bixo',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 30.00, sale: 30.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p7'
        },
        {
            name: 'Caneca de Bixo 2049',
            visibility: true,
            category: 'Kit Bixo',
            description: {ul: [], ol: [], txt: ``},
            templates: [],
            sizes: [],
            colors: [],
            price: {full: 15.00, sale: 15.00},
            img: [{small: '/img/moletom_canguru_front.png', large: '/img/moletom_canguru_front.png', alt: ''}],
            sizeTable: {img: '', alt: ''},
            stock: 0,
            sku: 'p8'
        }

    ],

    events: [
        {
            name: 'Cervejada: "Sinta o pântano!"',
            visibility: true,
            category: 'Cervejada',
            description: {ul: [], ol: [], txt: `A nossa tradicional cervejada do início do ano já chegou! Ela ocorerrá dia 20/03 a partir das 15h! Com muita música boa, com espaço de sobra pra você dançar e é claro muita lama! Você não vai ficar de fora dessa né? Não pastela!!! Corre pra garantir seu ingresso!`},
            info: {location: 'Lorem Ipsum', date: 'dd/mm/yyyy', time: '00h00', link: {text: 'Link para o facebook', url: 'https://facebook.com/'}},
            price: {full: 50.00, sale: 40.00},
            img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
            stock: 10,
            sku: 'e1'
        },
        {
            name: 'Minicurso',
            visibility: true,
            category: 'Minicursos',
            description: {ul: [], ol: [], txt: ``},
            info: {location: '', date: '', time: '', link: {text: '', url: ''}},
            price: {full: 20.00, sale: 20.00},
            img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
            stock: 0,
            sku: 'e2'
        },
        {
            name: 'Viagem técnica',
            visibility: true,
            category: 'Viagem técnica',
            description: {ul: [], ol: [], txt: ``},
            info: {location: '', date: '', time: '', link: {text: '', url: ''}},
            price: {full: 35.00, sale: 35.00},
            img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
            stock: 0,
            sku: 'e3'
        },
        {
            name: 'Roda de conversa',
            visibility: true,
            category: 'Roda de conversa',
            description: {ul: [], ol: [], txt: ``},
            info: {location: '', date: '', time: '', link: {text: '', url: ''}},
            price: {full: 15.00, sale: 15.00},
            img: [{small: '/img/cervejada.png', large: '/img/cervejada.png', alt: ''}],
            stock: 0,
            sku: 'e4'
        }
    ]
}

export default data