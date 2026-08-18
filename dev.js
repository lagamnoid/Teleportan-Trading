function getUsedSpace() {
    return (JSON.stringify(localStorage).length * 2);
}

function printUsedSpace() {
    console.log(`Used space: ${Math.round(getUsedSpace() / 1024)} KB`);
}

function freshCrab() {
    Object.keys(stockData).forEach((name) => {
        console.log(name, stockData[name].priceHistory.length);
    })
}

function _noUpdateTurn(stockData) {
    userVars.day++;
    Object.keys(stockData).forEach((name) => {
        company = stockData[name];
        // company.price += random(-5, 5);
        company.price *= calcPriceChange(company);
        company.price = parseFloat(company.price.toFixed(2));
        // company.priceHistory.splice(0, 1);
        company.priceHistory.push(company.price);
        if (company.priceHistory.length > MAX_PRICE_HISTORY_LENGTH) {
            company.priceHistory.shift();
        }
    });
    
    for (let i = 0; i < NEWS_PER_DAY; i++) {
        generateNewsArticle(stockData);
    }

    checkDividends(stockData);

    stockman.calculateChanges();

    // updateStockCards(stockData);
    // updateSelected(stockData[selectedCard]);
    // updateTradeScreen(stockData);
    // newsman.updateNews(userVars.following);
    // syncUserVars();
    // stockman.syncStockData();
}


// 330 ms
// 80 ms

function skipDays(number) {
    let a = 0;
    for (let i = 0; i < number - 1; i++) {
        _noUpdateTurn(stockman.stockData);
        a++;
        if (a == 1000) {
            turn(stockman.stockData);
            a = 0;
        }
    }
    refreshAll();
    // turn(stockman.StockData);
}



function test() {
    console.time("timerman");
    skipDays(10000);
    console.timeEnd("timerman")
}