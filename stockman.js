function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

_names = ["CHROM", "ASOUP", "TELEP", "OBSDY", "PRTMK", "BFG", "ALCFR", "AIFNY", "XLNG", "SHKBB", "DING", "DRLK", "QLCM", "DZN", "SHKRD", "BJAU", "HAXIS", "SKMT", "CJHL",
          "GUOWU"
];
_descs = ["Chromosome Corporation", "AudioSoup Developments", "Teleportan", "Obsidyrn Systems", "ProtonMilk Technologies", "BrainFog Innovations", "Alicifitra News",
          "Aifinity Productions", "Xiliang Industries", "Shikigai Bento Beans", "Ding Station Services", "Derolok Inc.", "Qualcomm", "Dazen Suburban", "Shikidou Rice Dumplings",
          "Bao Jie Auto", "Haobao Xinlou Science", "SekiMoto", "Chun Ji Heng Land", "Guo Wu Energetics"
];
_industries = ["Information Technology", "Information Technology", "Energy", "Information Technology", "Consumer Discretionary", "Information Technology", "Communication Services",
        "Information Technology", "Industrials", "Consumer Discretionary", "Industrials", "Materials", "Communication Services", "Real Estate", "Consumer Discretionary",
        "Industrials", "Energy", "Industrials", "Real Estate", "Energy"
];

_prices = [];
for (let i = 0; i < _names.length; i++) {
    _prices.push(parseFloat(random(50, 150).toFixed(2)));
}
_trends = [];
for (let i = 0; i < _names.length; i++) {
    _trends.push(random(-0.001, 0.001));
}
_volatilities = [];
for (let i = 0; i < _names.length; i++) {
    _volatilities.push(random(0.005, 0.02));
}
_totalshares = [];
for (let i = 0; i < _names.length; i++) {
    _totalshares.push(Math.round(random(1000000000, 5000000000)));
}
if (!((_names.length == _descs.length) && (_descs.length == _prices.length))) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA NOT EQUAL AAAAAAAAAAAAAAAAAAAAAAA");
    console.log(_names.length, _descs.length, _prices.length, _trends.length, _volatilities.length);
}

_dividendRanges = { // in %
    "Information Technology": {min: 0.20, max: 0.70},
    "Energy": {min: 4.00, max: 5.00},
    "Consumer Discretionary": {min: 0.70, max: 2.00},
    "Communication Services": {min: 1.00, max: 3.00},
    "Industrials": {min: 1.60, max: 1.80},
    "Materials": {min: 1.80, max: 2.20},
    "Real Estate": {min: 3.50, max: 5.00},
}


function localDefaults() {
    let stockData = {};
    for (let i = 0; i < _names.length; i++) {
        stockData[_names[i]] = {price: _prices[i],
                                       desc: _descs[i],
                                       priceHistory: [],
                                       trend: _trends[i],
                                    //    trend: 0,
                                       volatility: _volatilities[i],
                                    //    volatility: 0,
                                       totalShares: _totalshares[i],
                                       industry: _industries[i],
                                       dividend: random(_dividendRanges[_industries[i]].min / 100, _dividendRanges[_industries[i]].max / 100),
                                       dividendDate: Math.trunc(random(10, 80))
                                      };
    }
    // console.log(stockData);
    const vars = {
        balance: 10000,
        day: 1,
        portfolio: {},
        // following: ["ASOUP", "XLNG", "OBSDY"]
        following: [],
        name: "Carb TobretLif"
    }
    _names.forEach((name) => {
        vars.portfolio[name] = 0;
    });
    // const newsHistory = {"Day 31": [{title: "ALCFR", text: "Alicifitra News is added to a major index, attracting stable, passive fund inflows."},
    //                                 {title: "TELEP", text: "Insider TokakTarrot uncovers the budget of Teleportan"},
    //                                 {title: "TELEP", text: "Teleportan launches a revolutionary new product line that disrupts the industry."}]};
    const newsHistory = {};
    // const inbox = {messages: [{title: "Dividend payout",
    //                 text: "Greetings, Carb TobretLif. We appreciate your investment in Chromosome Corporation. For possessing 15 CHROM shares as of Day 67, you've been rewarded with $184.32.",
    //                 day: 1,
    //                 from: "CHROM",
    //                 idx: 0}],
    //                unread: 0};
    const inbox = {messages: [], unread: 0};
    localStorage.setItem("inbox", JSON.stringify(inbox));
    localStorage.setItem("newsHistory", JSON.stringify(newsHistory));
    localStorage.setItem("userVars", JSON.stringify(vars));
    localStorage.setItem("stockData", JSON.stringify(stockData));
    
}


class StockManager {
    constructor() {
        this.stockData = {};
        this.loadFromLocalStorage();
        this.stockChanges = {};
        this.calculateChanges();
        this.stockList = document.getElementById("stock-list");
        this.stockList.addEventListener("click", (event) => {
            Object.keys(this.stockData).forEach((name) => {
                if (document.getElementById(name).contains(event.target)) {
                    console.log(`click on ${name}`);
                    select(name);
                }
            });
        });
    }

    loadFromLocalStorage() {
        this.stockData = JSON.parse(localStorage.getItem("stockData"));
    }

    syncStockData() {
        localStorage.setItem("stockData", JSON.stringify(this.stockData));
    }

    createStockCard(title, price, image=null) {
        const card = document.createElement("div");
        card.className = "card";
        card.id = title;
    
        const cardTitle = document.createElement("p");
        cardTitle.id = title + "-title";
        cardTitle.className = "card-title";
        cardTitle.textContent = title;
    
        const cardPrice = document.createElement("p");
        cardPrice.id = title + "-price";
        cardPrice.className = "card-price";
        cardPrice.textContent = `$${price.toFixed(2)}`;
    
        const cardChange = document.createElement("p");
        cardChange.id = title + "-change";
        cardChange.className = "card-price";
        cardChange.style.margin = "10px";
        cardChange.style.marginLeft = "auto";
        cardChange.style.marginRight = "0px"
        cardChange.textContent = "676767%";
    
        const stockCounterContainer = document.createElement("div");
        stockCounterContainer.id = title + "-portfolio";
        stockCounterContainer.style.cssText = "display: flex; flex-direction: row; margin: auto; width: 32px, height: 32px";
        const stockCounter = document.createElement("p");
        stockCounter.id = title + "-stock-counter";
        stockCounter.className = "stock-counter";
        stockCounter.textContent = "999";
        stockCounterContainer.appendChild(stockCounter);
        const stackIcon = document.createElement("img");
        stackIcon.className = "stock-image";
        stackIcon.style.maxWidth = "32px";
        stackIcon.style.maxHeight = "32px";
        stackIcon.src = "assets/stack_icon5.png"
        const stackIconContainer = document.createElement("div");
        stackIconContainer.className = "img-container";
        stackIconContainer.style.height = "32px";
        stackIconContainer.style.width = "32px";
        stackIconContainer.style.marginLeft = "10px";
        stackIconContainer.appendChild(stackIcon);
        stockCounterContainer.appendChild(stackIconContainer);
    
        const rightElement = document.createElement("div");
        rightElement.style.cssText = "display: flex, flex-direction: column; margin-left: auto";
        rightElement.appendChild(cardPrice);
        rightElement.appendChild(cardChange);
    
        const img = document.createElement("img");
        img.className = "stock-image";
        if (image == null) {
            img.src = "assets/logo1.png"
        }
        else {
            img.src = image;
        }
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);
        card.appendChild(cardTitle);
        card.appendChild(stockCounterContainer);
        card.appendChild(rightElement);
        const wrappedCard = document.createElement("li");
        wrappedCard.style.marginTop = "10px";
        wrappedCard.appendChild(card);
        return wrappedCard;
    }

    calculateChanges() {
        this.stockChanges = {};
        Object.keys(this.stockData).forEach((name) => {
            if (this.stockData[name].priceHistory.length == 1) {
                this.stockChanges[name] = 0.00;
            }
            let lastPrice = this.stockData[name].priceHistory.at(-2);
            let currentPrice = this.stockData[name].price;
            if (isNaN(lastPrice)) {
                lastPrice = currentPrice;
            }
            this.stockChanges[name] = (currentPrice - lastPrice) / lastPrice * 100;
        });
    }

    loadStockCards() {
        Object.keys(this.stockData).forEach((name) => {
            const card = this.createStockCard(name, this.stockData[name].price);
            // card.id = name;
            this.stockList.appendChild(card);
        });
    }
}