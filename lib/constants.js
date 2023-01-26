const specifications = [
    {
        label: "Pages",
        value: "pages",
        variations: [{
            label: "140",
            value: "140"
        },
        {
            label: "172",
            value: "172"
        }
        ]
    },
    {
        label: "Size",
        value: "size",
        variations: [{
            label: "Long Notebook (29.7 x 21 cm)",
            value: "longBook"
        },
        {
            label: "Short Notebook (24 x 18 cm)",
            value: "shortBook"
        }
        ]
    },
    {
        label: "Binding",
        value: "binding",
        variations: [{
            label: "Spiral",
            value: "spiral"
        },
        {
            label: "Center Stapled",
            value: "centerStapled"
        }
        ]
    },
    {
        label: "Ruling",
        value: "ruling",
        variations: [{
            label: "Ruled",
            value: "ruled"
        },
        {
            label: "Unruled",
            value: "unruled"
        }
        ]
    },
    {
        label: "Quantity",
        value: "quantity",
        variations: [
            {
                label: "6",
                value: "6"
            },
            {
                label: "12",
                value: "12"
            },
            {
                label: "18",
                value: "18"
            },
            {
                label: "24",
                value: "24"
            },
            {
                label: "32",
                value: "32"
            }
        ]
    }
]



const designTemplates = [
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjI0OQ==",
        name: "Travel - 11",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/249/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjI0OA==",
        name: "Travel - 10",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/248/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjI0Nw==",
        name: "Travel - 09",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/247/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjcz",
        name: "Travel - 08",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/73/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjcy",
        name: "Travel - 07",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/72/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjcx",
        name: "Travel - 06",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/71/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjcw",
        name: "Travel - 05",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/70/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjY5",
        name: "Travel - 04",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/69/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjY4",
        name: "Travel - 03",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/68/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },
    {
        id: "RGVzaWduVGVtcGxhdGVOb2RlOjY3",
        name: "Travel - 02",
        price: null,
        discountedPrice: null,
        isAr: false,
        templateType: "LICENSED_DESIGN",
        url:
            "https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/media/design_templates/67/thumbnail.png",
        category: {
            id: "RGVzaWduQ2F0ZWdvcnlOb2RlOjQ=",
            name: "Travel",
            price: "10.00",
            discountedPrice: "0.00",
        },
    },

];
export { specifications, designTemplates }
