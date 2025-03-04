const fs = require("fs");

const history = [
    {
        id: "822e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 10234.23,
        date: "2025-01-14",
        comment: "Сметана, молоко, сыр косичка",
        account: "SBER Bank VISA",
    },
    {
        id: "8211e",
        tag: "finance",
        category: "БытХим",
        categoryId: "0125",
        accountId: "0006",
        icon: "house",
        type: "spend",
        amount: 12184,
        date: "2024-12-16",
        comment: "Чистящие средства",
        account: "Alfa bank debit",
    },
    {
        id: "8931e",
        tag: "crypto",
        asset: "Ripple",
        assetId: "ripple",
        assetAmount: 153.0221,
        type: "buy",
        check: "tether",
        amount: 2000.0,
        price: 13.0652,
        date: "2025-02-04",
    },
    {
        id: "8932e",
        tag: "crypto",
        asset: "BNB",
        assetId: "binance-coin",
        assetAmount: 2.1231,
        type: "buy",
        check: "tether",
        amount: 127179.59,
        price: 59902.77,
        date: "2025-01-24",
    },
    {
        id: "8933e",
        tag: "crypto",
        asset: "Ethereum",
        assetId: "ethereum",
        assetAmount: 0.4213,
        type: "sell",
        check: "tether",
        amount: 106853.95,
        price: 253641,
        date: "2024-12-19",
    },
    {
        id: "813e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 1324.19,
        date: "2024-12-11",
        comment: "Куплено в магазине",
        account: "SBER Bank VISA",
    },
    {
        id: "812e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 5405.23,
        date: "2025-01-16",
        comment: "Фрукты и овощи",
        account: "SBER Bank VISA",
    },
    {
        id: "82211e",
        tag: "finance",
        category: "БытХим",
        categoryId: "0125",
        accountId: "0006",
        icon: "house",
        type: "spend",
        amount: 4234.23,
        date: "2025-01-15",
        comment: "Чистящие средства",
        account: "Alfa bank debit",
    },
    {
        id: "823e",
        tag: "finance",
        category: "Зарплата",
        categoryId: "0128",
        accountId: "0005",
        icon: "cash",
        type: "add",
        amount: 55234.45,
        date: "2025-02-11",
        comment: "Зарплата за январь",
        account: "Tinkoff black MasterCard debit card",
    },
    {
        id: "825e",
        tag: "finance",
        category: "Инвестиции",
        categoryId: "0134",
        accountId: "0008",
        icon: "investments",
        type: "add",
        amount: 40234.12,
        date: "2025-02-12",
        comment: "Инвестиции в акции",
        account: "Alfa Bank credit",
    },
    {
        id: "4823e",
        tag: "finance",
        category: "Зарплата",
        categoryId: "0128",
        accountId: "0005",
        icon: "cash",
        type: "add",
        amount: 25234.45,
        date: "2025-02-11",
        comment: "Зарплата за январь",
        account: "Tinkoff black MasterCard debit card",
    },
    {
        id: "926e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0009",
        icon: "products",
        type: "spend",
        amount: 20234.23,
        date: "2025-02-08",
        comment: "Покупка продуктов",
        account: "SBER Bank MIR",
    },
    {
        id: "3843e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0010",
        icon: "products",
        type: "spend",
        amount: 15000.0,
        date: "2025-02-05",
        comment: "Покупка в супермаркете",
        account: "Gift Card",
    },
    {
        id: "893e",
        tag: "finance",
        category: "Доходы",
        categoryId: "0124",
        accountId: "0001",
        icon: "gift",
        type: "add",
        amount: 25000.0,
        date: "2025-02-03",
        comment: "Поступление от продажи",
        account: "SBER Bank VISA",
    },
    {
        id: "8114e",
        tag: "finance",
        category: "Доходы",
        categoryId: "0124",
        accountId: "0001",
        icon: "debit",
        type: "add",
        amount: 10000.0,
        date: "2025-01-02",
        comment: "Кешбек",
        account: "SBER Bank VISA",
    },
    {
        id: "896e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 15000.0,
        date: "2025-01-27",
        comment: "Покупка молока",
        account: "SBER Bank VISA",
    },
    {
        id: "886e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 16000.0,
        date: "2025-01-29",
        comment: "Покупка хлеба",
        account: "SBER Bank VISA",
    },
    {
        id: "876e",
        tag: "finance",
        category: "Доход",
        categoryId: "0124",
        accountId: "0001",
        icon: "debit",
        type: "add",
        amount: 17000.0,
        date: "2025-01-19",
        comment: "Поступление от продажи",
        account: "SBER Bank VISA",
    },
    {
        id: "866e",
        tag: "finance",
        category: "Доход",
        categoryId: "0124",
        accountId: "0001",
        icon: "debit",
        type: "add",
        amount: 18000.0,
        date: "2025-01-23",
        comment: "Поступление от продажи",
        account: "SBER Bank VISA",
    },
    {
        id: "1846e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 20000.0,
        date: "2025-01-14",
        comment: "Покупка молока",
        account: "SBER Bank VISA",
    },
    {
        id: "8436e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 21000.0,
        date: "2025-01-11",
        comment: "Покупка хлеба",
        account: "SBER Bank VISA",
    },
    {
        id: "826e",
        tag: "finance",
        category: "Продукты",
        categoryId: "0124",
        accountId: "0001",
        icon: "products",
        type: "spend",
        amount: 22000.0,
        date: "2025-01-22",
        comment: "Покупка молока",
        account: "SBER Bank VISA",
    },
    {
        id: "816e",
        tag: "finance",
        category: "БытХим",
        categoryId: "0125",
        accountId: "0006",
        icon: "house",
        type: "spend",
        amount: 3500.0,
        date: "2025-01-25",
        comment: "Гель для душа",
        account: "Alfa bank debit",
    },
    {
        id: "817e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 4500.0,
        date: "2025-01-30",
        comment: "Оплата за свет",
        account: "Tinkoff platinum credit",
    },
    {
        id: "818e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 5500.0,
        date: "2025-02-01",
        comment: "Оплата за воду",
        account: "Tinkoff platinum credit",
    },
    {
        id: "819e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-01-10",
        comment: "Кино",
        account: "Alfa bank debit",
    },
    {
        id: "820e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-01-15",
        comment: "Театр",
        account: "Alfa bank debit",
    },
    {
        id: "821e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 8000.0,
        date: "2025-01-20",
        comment: "Семейный ужин",
        account: "Alfa bank debit",
    },
    {
        id: "1822e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 9000.0,
        date: "2025-01-25",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "8923e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 10000.0,
        date: "2025-01-30",
        comment: "Отпуск",
        account: "Alfa bank debit",
    },
    {
        id: "824e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 11000.0,
        date: "2025-02-01",
        comment: "Поездка на море",
        account: "Alfa bank debit",
    },
    {
        id: "82126e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 13000.0,
        date: "2025-02-10",
        comment: "Поездка на природу",
        account: "Alfa bank debit",
    },
    {
        id: "827e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 14000.0,
        date: "2025-02-15",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "828e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 15000.0,
        date: "2025-02-20",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "829e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 16000.0,
        date: "2025-02-25",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "830e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 17000.0,
        date: "2025-02-28",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "831e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 5000.0,
        date: "2025-01-05",
        comment: "Куплено в магазине",
        account: "Alfa bank debit",
    },
    {
        id: "832e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 3000.0,
        date: "2025-01-15",
        comment: "Куплено в аптеке",
        account: "Alfa bank debit",
    },
    {
        id: "833e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 4000.0,
        date: "2025-01-25",
        account: "Alfa bank debit",
    },
    {
        id: "834e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 2000.0,
        date: "2025-02-01",
        comment: "Куплено в магазине",
        account: "Alfa bank debit",
    },
    {
        id: "835e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-02-10",
        account: "Alfa bank debit",
    },
    {
        id: "836e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-02-15",
        comment: "Куплено в аптеке",
        account: "Alfa bank debit",
    },
    {
        id: "837e",
        tag: "finance",
        category: "Вредные привычки",
        categoryId: "0130",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 8000.0,
        date: "2025-03-20",
        account: "Alfa bank debit",
    },
    {
        id: "838e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 5000.0,
        date: "2025-01-10",
        comment: "Кофе с друзьями",
        account: "Alfa bank debit",
    },
    {
        id: "839e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 3000.0,
        date: "2025-01-20",
        comment: "Ужин в ресторане",
        account: "Alfa bank debit",
    },
    {
        id: "840e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 4000.0,
        date: "2025-01-30",
        account: "Alfa bank debit",
    },
    {
        id: "841e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 2000.0,
        date: "2025-03-05",
        comment: "Кофе с коллегами",
        account: "Alfa bank debit",
    },
    {
        id: "842e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-03-15",
        account: "Alfa bank debit",
    },
    {
        id: "843e",
        tag: "finance",
        category: "Кафе",
        categoryId: "0131",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-03-20",
        comment: "Ужин с друзьями",
        account: "Alfa bank debit",
    },
    {
        id: "844e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 5000.0,
        date: "2025-01-05",
        comment: "Поход в кино",
        account: "Alfa bank debit",
    },
    {
        id: "845e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 3000.0,
        date: "2025-01-15",
        comment: "Посещение выставки",
        account: "Alfa bank debit",
    },
    {
        id: "4846e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 4000.0,
        date: "2025-01-25",
        account: "Alfa bank debit",
    },
    {
        id: "847e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 2000.0,
        date: "2025-03-01",
        comment: "Поход в театр",
        account: "Alfa bank debit",
    },
    {
        id: "848e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-03-10",
        account: "Alfa bank debit",
    },
    {
        id: "849e",
        tag: "finance",
        category: "Досуг",
        categoryId: "0132",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-03-15",
        comment: "Посещение концерта",
        account: "Alfa bank debit",
    },
    {
        id: "850e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 3000.0,
        date: "2025-01-05",
        comment: "Подарок на юбилей",
        account: "Alfa bank debit",
    },
    {
        id: "851e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 4000.0,
        date: "2025-01-15",
        comment: "Подарок на свадьбу",
        account: "Alfa bank debit",
    },
    {
        id: "852e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 5000.0,
        date: "2025-01-25",
        comment: "Подарок на день рождения",
        account: "Alfa bank debit",
    },
    {
        id: "853e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-03-01",
        comment: "Подарок на выпускной",
        account: "Alfa bank debit",
    },
    {
        id: "854e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-02-10",
        account: "Alfa bank debit",
    },
    {
        id: "855e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 8000.0,
        date: "2025-03-15",
        account: "Alfa bank debit",
    },
    {
        id: "856e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 9000.0,
        date: "2025-03-20",
        account: "Alfa bank debit",
    },
    {
        id: "857e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 10000.0,
        date: "2025-03-25",
        account: "Alfa bank debit",
    },
    {
        id: "858e",
        tag: "finance",
        category: "Подарки",
        categoryId: "0133",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 11000.0,
        date: "2025-03-28",
        account: "Alfa bank debit",
    },
    {
        id: "859e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 6000.0,
        date: "2025-01-01",
        comment: "Оплата за газ",
        account: "Tinkoff platinum credit",
    },
    {
        id: "860e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 7000.0,
        date: "2025-01-15",
        comment: "Оплата за интернет",
        account: "Tinkoff platinum credit",
    },
    {
        id: "861e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 8000.0,
        date: "2025-01-30",
        comment: "Оплата за телефон",
        account: "Tinkoff platinum credit",
    },
    {
        id: "862e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 9000.0,
        date: "2025-03-15",
        comment: "Оплата за отопление",
        account: "Tinkoff platinum credit",
    },
    {
        id: "863e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 10000.0,
        date: "2025-03-20",
        account: "Tinkoff platinum credit",
    },
    {
        id: "864e",
        tag: "finance",
        category: "ЖКХ",
        categoryId: "0126",
        accountId: "0007",
        icon: "house",
        type: "spend",
        amount: 11000.0,
        date: "2025-03-25",
        account: "Tinkoff platinum credit",
    },
    {
        id: "865e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 6000.0,
        date: "2025-01-10",
        comment: "Кино",
        account: "Alfa bank debit",
    },
    {
        id: "32866e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 7000.0,
        date: "2025-01-15",
        comment: "Театр",
        account: "Alfa bank debit",
    },
    {
        id: "867e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 8000.0,
        date: "2025-01-20",
        comment: "Концерт",
        account: "Alfa bank debit",
    },
    {
        id: "868e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 9000.0,
        date: "2025-03-01",
        comment: "Выставка",
        account: "Alfa bank debit",
    },
    {
        id: "869e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 10000.0,
        date: "2025-03-10",
        account: "Alfa bank debit",
    },
    {
        id: "870e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 11000.0,
        date: "2025-03-15",
        account: "Alfa bank debit",
    },
    {
        id: "871e",
        tag: "finance",
        category: "Развлечения",
        categoryId: "0127",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 12000.0,
        date: "2025-03-20",
        account: "Alfa bank debit",
    },
    {
        id: "872e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 8000.0,
        date: "2025-01-20",
        comment: "Семейный ужин",
        account: "Alfa bank debit",
    },
    {
        id: "873e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 9000.0,
        date: "2025-01-25",
        comment: "Поездка в зоопарк",
        account: "Alfa bank debit",
    },
    {
        id: "874e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 10000.0,
        date: "2025-03-01",
        comment: "Семейный праздник",
        account: "Alfa bank debit",
    },
    {
        id: "875e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 11000.0,
        date: "2025-03-10",
        account: "Alfa bank debit",
    },
    {
        id: "8376e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 12000.0,
        date: "2025-03-15",
        account: "Alfa bank debit",
    },
    {
        id: "877e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 13000.0,
        date: "2025-03-20",
        account: "Alfa bank debit",
    },
    {
        id: "878e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 14000.0,
        date: "2025-03-25",
        account: "Alfa bank debit",
    },
    {
        id: "879e",
        tag: "finance",
        category: "Семья",
        categoryId: "0128",
        accountId: "0006",
        icon: "debit",
        type: "spend",
        amount: 15000.0,
        date: "2025-03-28",
        account: "Alfa bank debit",
    },
    {
        id: "880e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 9000.0,
        date: "2025-01-25",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        id: "881e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 10000.0,
        date: "2025-01-30",
        comment: "Отпуск",
        account: "Alfa bank debit",
    },
    {
        id: "882e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 11000.0,
        date: "2025-03-01",
        comment: "Поездка на море",
        account: "Alfa bank debit",
    },
    {
        id: "883e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 13000.0,
        date: "2025-03-10",
        comment: "Поездка на природу",
        account: "Alfa bank debit",
    },
    {
        id: "884e",
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 14000.0,
        date: "2025-03-15",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 15000.0,
        date: "2025-03-20",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 16000.0,
        date: "2025-03-25",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
    {
        tag: "finance",
        category: "Путешествия",
        categoryId: "0134",
        accountId: "0006",
        icon: "gift",
        type: "spend",
        amount: 17000.0,
        date: "2025-03-28",
        comment: "Поездка на выходные",
        account: "Alfa bank debit",
    },
];
const categories = [
    {
        _id: {
            $oid: "67c31c14064a54f8b144a7fc",
        },
        name: "Продукты",
        budget: 50000,
        balance: 22134.12,
        icon: "credit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a7fd",
        },
        name: "БытХим",
        budget: 10000,
        balance: 12134.12,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a7fe",
        },
        name: "ЖКХ",
        budget: 5000,
        balance: 5300,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a7ff",
        },
        name: "Развлечения",
        budget: 50000,
        balance: 22134.12,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a800",
        },
        name: "Семья",
        budget: 50000,
        balance: 22134.12,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a801",
        },
        name: "Вредные привычки",
        budget: 50000,
        balance: 22134.12,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a802",
        },
        name: "Кафе",
        budget: 50000,
        balance: 22134.12,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a803",
        },
        name: "Досуг",
        budget: 10000,
        balance: 11000,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a804",
        },
        name: "Подарки",
        budget: 0,
        balance: 17004.81,
        icon: "debit",
    },
    {
        _id: {
            $oid: "67c31c14064a54f8b144a805",
        },
        name: "Путешествия",
        budget: 23500,
        balance: 1004.81,
        icon: "gift",
    },
];
const accounts = [
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f1",
        },
        name: "SBER Bank VISA",
        balance: 36000.12,
        icon: "credit",
        type: "debit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f2",
        },
        name: "Tinkoff VISA credit card",
        balance: 50000,
        icon: "credit",
        type: "credit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f3",
        },
        name: "Наличные",
        balance: 552000,
        icon: "cash",
        type: "cash",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f4",
        },
        name: "Alfa Bank debit",
        balance: 50000,
        icon: "debit",
        type: "debit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f5",
        },
        name: "Tinkoff black",
        balance: 50000,
        icon: "debit",
        type: "debit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f6",
        },
        name: "Alfa bank debit",
        balance: 50000,
        icon: "debit",
        type: "debit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f7",
        },
        name: "Tinkoff platinum credit",
        balance: 1513000.72,
        icon: "credit",
        type: "credit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f8",
        },
        name: "Alfa Bank credit",
        balance: 50000,
        icon: "credit",
        type: "credit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7f9",
        },
        name: "SBER Bank MIR",
        balance: 3214000,
        icon: "debit",
        type: "debit",
    },
    {
        _id: {
            $oid: "67c31baa064a54f8b144a7fa",
        },
        name: "Gift Card",
        balance: 50000,
        icon: "gift",
        type: "debit",
    },
];

const mappedHistory = history.map(({ id, ...rest }) => rest);
const filteredHistory = mappedHistory.filter((item) => item.tag === "finance");
const newIdInHistory = filteredHistory.map((item) => {
    const category = categories.find((categorie) => item.category === categorie.name);
    const account = accounts.find((account) => item.account.toLowerCase() === account.name.toLowerCase());

    return {
        ...item,
        categoryId: category ? category._id.$oid : item.categoryId,
        accountId: account ? account._id.$oid : item.accountId,
    };
});
const historyJson = JSON.stringify(newIdInHistory, null, 2);
const categoriesJson = JSON.stringify(categories, null, 2);
const accountsJson = JSON.stringify(accounts, null, 2);

fs.writeFileSync("history4.json", historyJson);
fs.writeFileSync("accounts.json", accountsJson);
fs.writeFileSync("categories.json", categoriesJson);
console.log("Файлы JSON успешно созданы!");
