// WARNING: MADE IN CHINA

// maximum localStorage usage: ~100 KB

console.log("\x1b[31mWARNING: MADE IN CHINA\x1b[0m");

if (!localStorage.getItem('notFirstTime')) {
    localDefaults();
    localStorage.setItem('notFirstTime', 'true');
}

const STYLES = window.getComputedStyle(document.documentElement);
const LIGHT_COLOR = STYLES.getPropertyValue("--light-color").trim();
const DARK_COLOR = STYLES.getPropertyValue("--dark-color").trim();


const buttBuy = document.getElementById("butt-buy");
const buttSell = document.getElementById("butt-sell");
const buttConfirmTrade = document.getElementById("butt-confirm-trade");
const inputQuantity = document.getElementById("input-quantity");
const tradeTotal = document.getElementById("trade-total");
const selectedTitle = document.getElementById("selected-title");
const selectedPrice = document.getElementById("selected-price");
const selectedChange = document.getElementById("selected-change");
const selectedImage = document.getElementById("selected-img");
const selectedDesc = document.getElementById("selected-desc");
const selectedStockCounter = document.getElementById("selected-stock-counter");
const selectedIndustry = document.getElementById("selected-industry");
const selectedDividend = document.getElementById("selected-dividend");
const selectedDividay = document.getElementById("selected-dividay");
const currentDay = document.getElementById("current-day");
const balance = document.getElementById("balance");
const stockFilter = document.getElementById("stock-filter");
const buttFollow = document.getElementById("butt-follow");
const graphTime = document.getElementById("graph-time");
const centralStock = document.getElementById("central-stock");
const centralNews = document.getElementById("central-news");
const newsList = document.getElementById("news-list");
const inboxNewsButtsContainer = document.getElementById("inbox-news-butts-container");
const portfolioCost = document.getElementById("portfolio-cost");
const mktCap = document.getElementById("mkt-cap");
const totalShares = document.getElementById("total-shares");
const w52High = document.getElementById("52w-high");
const w52Low = document.getElementById("52w-low");
const popupOverlay = document.getElementById("popup-overlay");
const checkboxAnimations = document.getElementById("checkbox-animations");
checkboxAnimations.checked = ANIMATIONS;
const inputPlayerName = document.getElementById("input-player-name");

const graph = createGraph(document.getElementById('graph').getContext('2d'));
const numberFormatterCommas = new Intl.NumberFormat('en-US');
const numberFormatterLetter = new Intl.NumberFormat('en-US', {notation: "compact"});


let userVars = JSON.parse(localStorage.getItem("userVars"));

inputPlayerName.value = userVars.name;

const stockman = new StockManager();
const newsman = new NewsManager();
const inboxman = new InboxManager();
console.log("aaaaaaaaaaaaaaaaaa");

function syncUserVars() {
    localStorage.setItem("userVars", JSON.stringify(userVars));
}

function randomKey(dict) {
    return Object.keys(dict)[Math.trunc(random(0, Object.keys(dict).length))];
}

function updateChangeElement(stockChanges, elementId, name) {
    const element = document.getElementById(elementId);
    element.textContent = stockChanges[name].toFixed(2) + "%";
    if (stockChanges[name] > 0) {
        element.style.color = "var(--green-color)";
        element.textContent = "+" + element.textContent;
    }
    else if (stockChanges[name] < 0) {
        element.style.color = "var(--red-color)";
    }
    else {  
        element.style.color = "var(--gray-color)";
    }
}

function updateSelected(company) {
    selectedTitle.textContent = selectedCard;
    selectedPrice.textContent = `$${company.price}`;
    selectedImage.src = "assets/logo1.png";
    selectedDesc.textContent = company.desc;
    selectedStockCounter.textContent = `Your shares: ${userVars.portfolio[selectedCard]}`;
    selectedIndustry.textContent = company.industry;
    selectedDividend.textContent = `Dividend: ${(company.dividend * 100).toFixed(2)}%`;
    selectedDividay.textContent = `Next dividend payment: Day ${company.dividendDate}`;
    if (userVars.following.includes(selectedCard)) {
        buttFollow.style.color = DARK_COLOR;
        buttFollow.style.backgroundColor = LIGHT_COLOR;
        buttFollow.textContent = "Unfollow " + selectedCard;
    } else {
        buttFollow.style.color = LIGHT_COLOR;
        buttFollow.style.backgroundColor = DARK_COLOR;
        buttFollow.textContent = "Follow " + selectedCard;
    }
    updateChangeElement(stockman.stockChanges, "selected-change", selectedCard);
    updateGraph(company.priceHistory);
    totalShares.textContent = `Total shares: ${numberFormatterLetter.format(company.totalShares)}`;
    mktCap.textContent = `Market Capitalization: $${numberFormatterLetter.format(company.totalShares * company.price)}`;
    inputQuantity.value = 1;
    if (company.priceHistory.length > 0) {
        w52High.textContent = `52W High: $${Math.max(...company.priceHistory)}`;
        w52Low.textContent = `52W Low: $${Math.min(...company.priceHistory)}`;
    }
    else {
        w52High.textContent = "52W High: N/A";
        w52Low.textContent = "52W Low: N/A";
    }

}

function updateTradeScreen(stockData) {
    if (tradeMode == "buy") {
        buttBuy.style.backgroundColor = LIGHT_COLOR;
        buttBuy.style.color = DARK_COLOR;
        buttSell.style.backgroundColor = DARK_COLOR;
        buttSell.style.color = LIGHT_COLOR;
        buttConfirmTrade.textContent = tradeMode.charAt(0).toUpperCase() + tradeMode.slice(1) + " " + selectedCard;
    }
    else {
        buttBuy.style.backgroundColor = DARK_COLOR;
        buttBuy.style.color = LIGHT_COLOR;
        buttSell.style.backgroundColor = LIGHT_COLOR;
        buttSell.style.color = DARK_COLOR;
        buttConfirmTrade.textContent = tradeMode.charAt(0).toUpperCase() + tradeMode.slice(1) + " " + selectedCard;
    }
    const toShow = inputQuantity.value * stockData[selectedCard].price;
    if (isNaN(toShow) || toShow < 0) {
        tradeTotal.textContent = "Total: $0.00";
    }
    else {
        tradeTotal.textContent = `Total: $${numberFormatterCommas.format(toShow.toFixed(2))}`;
    }
    balance.textContent = `Balance: $${numberFormatterCommas.format(userVars.balance.toFixed(2))}`;
    let sum = 0;
    Object.keys(userVars.portfolio).forEach((name) => {
        sum += stockData[name].price * userVars.portfolio[name];
    });
    portfolioCost.textContent = `Portfolio cost: $${sum.toFixed(2)}`;
    
    if (!validateQuantityInput(stockman.stockData)) {
        inputQuantity.style.border = "2px solid var(--red-color)";
        inputQuantity.style.color = "var(--red-color)";
    }
    else {
        inputQuantity.style.border = "2px solid var(--light-color)";
        inputQuantity.style.color = "var(--light-color)";
    }
}

function validateQuantityInput(stockData) {
    if (inputQuantity.value.length == 0 || inputQuantity.value.includes(".") || isNaN(inputQuantity.value) || isNaN(parseInt(inputQuantity.value))) {
        return false;
    }
    else if (tradeMode == "buy" && parseInt(inputQuantity.value) * stockData[selectedCard].price > userVars.balance) {
        return false;
    }
    else if (tradeMode == "sell" && parseInt(inputQuantity.value) > userVars.portfolio[selectedCard]) {
        return false;
    }
    else if (parseInt(inputQuantity.value) <= 0) {
        return false;
    }
    return true;
}

function confirmTrade(stockData) {
    if (!validateQuantityInput(stockman.stockData)) {
        return;
    }
    const total = parseInt(inputQuantity.value) * stockData[selectedCard].price; 
    if (tradeMode == "buy") {
        userVars.balance -= total;
        userVars.portfolio[selectedCard] += parseInt(inputQuantity.value);
    }
    else {
        userVars.balance += total;
        userVars.portfolio[selectedCard] -= parseInt(inputQuantity.value);
    }
    console.log(`${tradeMode == "buy" ? "Bought" : "Sold"} ${inputQuantity.value} ${selectedCard} ($${total} total, $${stockData[selectedCard].price} each)`);
    inputQuantity.value = 1;
    updateTradeScreen(stockman.stockData);
    updateSelected(stockman.stockData[selectedCard]);
    updateStockCards(stockman.stockData);
    syncUserVars();
}

function updateStockCards(stockData) {
    Object.keys(stockman.stockData).forEach((name) => {
        const styleman = document.getElementById(name).style;
        if (stockFilter.value == "all") {
            styleman.display = "flex";
        }
        else if (stockFilter.value == "my-shares") {
            if (userVars.portfolio[name] == 0) {
                styleman.display = "none";
            }
            else {
                styleman.display = "flex";
            }
        }
        else if (stockFilter.value == "following") {
            if (!userVars.following.includes(name)) {
                styleman.display = "none";
            }
            else {
                styleman.display = "flex";
            }
        }
        // if (userVars.following.includes(name)) {
        //     document.getElementById(name).style.borderColor = "#D98853";
        // } else {
        //     document.getElementById(name).style.borderColor = "unset";
        // }
        document.getElementById(name + "-price").textContent = "$" + stockData[name].price;
        updateChangeElement(stockman.stockChanges, name + "-change", name);
        if (userVars.portfolio[name] == 0) {
            document.getElementById(name + "-portfolio").style.display = "none";
        } else {
            document.getElementById(name + "-portfolio").style.display = "flex";
            document.getElementById(name + "-stock-counter").textContent = userVars.portfolio[name];
        }
    });
}

function updateGraph(priceHistory) {
    currentDay.textContent = "Day " + userVars.day;
    dayList = [];
    for (let i = parseInt(graphTime.value); i >= 0; i--) {
        dayList.push("Day " + (userVars.day - i));
    }
    graph.data.labels = dayList;
    let data = Array.from(priceHistory);
    if (data.length < parseInt(graphTime.value) + 1) {
        let firstPrice = data[0];
        let lohmanoid = data.length;
        for (let i = 0; i < parseInt(graphTime.value) - lohmanoid + 1; i++) {
            data.unshift(firstPrice);
        }
    }
    else if (data.length > parseInt(graphTime.value)) {
        data = data.slice(data.length - parseInt(graphTime.value) - 1);
    }
    graph.data.datasets[0].data = data;
    graph.update("lohman");
}

function calcPriceChange(company) {
    let trend = company.trend;
    let volatility = company.volatility;
    let randman = random(-1, 1);
    // return 1 + trend + volatility * randman - 0.5 * volatility ** 2;
    // return 1 + Math.log(1 + expected) - 0.5 * Math.log(1 + volatility ** 2 / (1 + expected) ** 2);
    // console.log("Carb Tobretif: ", Math.exp((trend - 0.5 * volatility ** 2) + (volatility * randman)));
    let res = Math.exp((trend - 0.5 * volatility ** 2) + (volatility * randman));
    let daysLeft = company.dividendDate - userVars.day;
    if (daysLeft == 3) {
        res += company.dividend * 0.2;
    }
    else if (daysLeft == 2) {
        res += company.dividend * 0.3;
    }
    else if (daysLeft == 1) {
        res += company.dividend * 0.5;
    }
    else if (daysLeft == 0) {
        res -= res * company.dividend / (1 + company.dividend);
        // console.log(`${name} decreased by ${(1 + company.dividend)}`);
    }
    return res;
    // return 1 + trend + volatility * randman;
}

function capValues(company) {
    if (company.volatility < 0) {
        company.volatility = 0;
    }
    if (company.volatility < 0.003) {
        company.volatility = 0.003;
    }
    if (company.volatility > 0.025) {
        company.volatility = 0.025;
    }
    if (company.trend < -0.002) {
        company.trend = -0.002;
    }
    if (company.trend > 0.002) {
        company.trend = 0.002;
    }
}

// localDefaults();

stockman.loadStockCards();

newsman.loadNewsFor(newsList);

function generateNewsArticle(stockData) {
    if (Math.random() < GLOBAL_NEWS_PROBABILITY) {
        newsman.generateGlobalArticle(stockData);
    } else {
        const name = randomKey(stockData);
        newsman.generateMinorArticle(name, stockData[name]);
        capValues(name);
    }
    newsman.capNews();
    newsman.syncNewsHistory();
}

inboxman.loadInbox();

selectedCard = Object.keys(stockman.stockData)[0];
tradeMode = "buy";
updateTradeScreen(stockman.stockData);
updateSelected(stockman.stockData[selectedCard]);
updateStockCards(stockman.stockData);
updateGraph(stockman.stockData[selectedCard].priceHistory);


function select(name) {
    selectedCard = name;
    updateSelected(stockman.stockData[selectedCard]);
    updateTradeScreen(stockman.stockData);
    // animateSelected();
}

function checkDividends(stockData) {
    Object.keys(stockData).forEach((name) => {
        if (stockData[name].dividendDate == userVars.day) {
            const payout = stockData[name].price * userVars.portfolio[name] * stockData[name].dividend;
            userVars.balance += payout;
            stockData[name].dividendDate += 90;
            if (payout > 0) {
                const text = `Greetings, ${userVars.name}. We appreciate your investment in ${stockData[name].desc}. For possessing ${userVars.portfolio[name]} ${name} shares as of Day ${userVars.day}, you've been rewarded with $${payout.toFixed(2)}. Our next dividend payment is scheduled on Day ${stockData[name].dividendDate}.`;
                inboxman.send("Dividend payment", text, userVars.day, name);
            }
        }
    })
}

function turn(stockData) {
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

    checkDividends(stockman.stockData);

    stockman.calculateChanges();
    updateStockCards(stockman.stockData);
    updateSelected(stockman.stockData[selectedCard]);
    updateTradeScreen(stockman.stockData);
    newsman.updateNews(userVars.following);
    syncUserVars();
    stockman.syncStockData();
}

function standardAnimation(element, distance, duration) {
    if (!ANIMATIONS) {
        return;
    }
    element.animate([
        { 
        opacity: 0, 
        transform: `translateY(${distance}px)` 
        }, 
        { 
        opacity: 1, 
        transform: "translateY(0)"
        }
    ], {
        duration: duration,
        easing: "ease-out",
        fill: "forwards"
    });
}

function animateSelected() {
    document.body.style.overflow = "hidden";
    standardAnimation(selectedTitle.parentElement.parentElement, 30, 200);
    standardAnimation(document.getElementById("graph").parentElement, 30, 200);
    standardAnimation(selectedDividend.parentElement, 30, 200);
}

function backToMarket() {
    centralNews.style.display = "none";
    centralStock.style.display = "block";
    inboxNewsButtsContainer.style.display = "flex";
    animateSelected();
    if (inboxman.inboxList.parentElement.style.display == "block") {
        inboxman.unread = 0;
    }
    inboxman.inboxList.parentElement.style.display = "none";
    inboxman.updateButtonView();
    inboxman.syncInbox();
}


function openNews() {
    centralNews.style.display = "flex";
    centralStock.style.display = "none";
    inboxNewsButtsContainer.style.display = "none";
    newsList.parentElement.style.display = "block";
    newsman.newsFilter.style.display = "block";
    newsman.updateNews(userVars.following);
    newsList.focus();
    standardAnimation(newsList, 30, 200);
}

function openInbox() {
    centralNews.style.display = "flex";
    centralStock.style.display = "none";
    newsList.parentElement.style.display = "none";
    inboxman.inboxList.parentElement.style.display = "block";
    inboxNewsButtsContainer.style.display = "none";
    newsman.newsFilter.style.display = "none";
    standardAnimation(inboxman.inboxList, 30, 200);
}


function refreshAll() {
    stockman.calculateChanges();
    updateTradeScreen(stockman.stockData);
    updateSelected(stockman.stockData[selectedCard]);
    updateStockCards(stockman.stockData);
    updateGraph(stockman.stockData[selectedCard].priceHistory);
    newsman.updateNews(userVars.following);
    inboxman.updateButtonView();
}

function restart() {
    localDefaults();
    // stockData = JSON.parse(localStorage.getItem("stockData"));
    userVars = JSON.parse(localStorage.getItem("userVars"));
    stockman.loadFromLocalStorage();
    newsman.loadFromLocalStorage();
    inboxman.loadFromLocalStorage();
    refreshAll();
    console.log("Restart");
}

function maxQuantity() {
    if (tradeMode == "buy") {
        inputQuantity.value = Math.floor(userVars.balance / stockman.stockData[selectedCard].price);
    }
    else if (tradeMode == "sell") {
        inputQuantity.value = userVars.portfolio[selectedCard];
    }
}

function followClick() {
    if (userVars.following.includes(selectedCard)) {
        let idx = userVars.following.indexOf(selectedCard);
        if (idx > -1) {
            userVars.following.splice(idx, 1);
        }
    }
    else {
        userVars.following.push(selectedCard);
    }
    updateSelected(stockman.stockData[selectedCard]);
    updateStockCards(stockman.stockData);
    syncUserVars();
}

function closeSettings() {
    popupOverlay.style.display = "none";
    document.body.style.overflow = "";
}

function openSettings() {
    popupOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

inputQuantity.addEventListener("input", () => {updateTradeScreen(stockman.stockData);});
document.getElementById("butt-turn").addEventListener("click", () => {turn(stockman.stockData);});
document.getElementById("butt-back-to-market").addEventListener("click", backToMarket);
document.getElementById("max-quantity").addEventListener("click", maxQuantity);
buttBuy.addEventListener("click", () => {tradeMode = "buy"; updateTradeScreen(stockman.stockData);});
buttSell.addEventListener("click", () => {tradeMode = "sell"; updateTradeScreen(stockman.stockData);});
buttConfirmTrade.addEventListener("click", () => {confirmTrade(stockman.stockData);});
stockFilter.addEventListener("change", () => {updateStockCards(stockman.stockData); standardAnimation(stockman.stockList, 30, 200);});
graphTime.addEventListener("change", () => {updateGraph(stockman.stockData[selectedCard].priceHistory);});
document.getElementById("butt-open-news").addEventListener("click", openNews);
inboxman.buttOpenInbox.addEventListener("click", openInbox);
buttFollow.addEventListener("click", followClick);
// document.getElementById("dev-update").addEventListener("click", refreshAll);
document.getElementById("dev-restart").addEventListener("click", restart);
document.getElementById("butt-open-settings").addEventListener("click", openSettings);
document.getElementById("butt-close-settings").addEventListener("click", closeSettings);
checkboxAnimations.addEventListener("change", (event) => {
    ANIMATIONS = event.target.checked;
})
inputPlayerName.addEventListener("input", () => {userVars.name = inputPlayerName.value; syncUserVars();});

popupOverlay.addEventListener("click", function(event) {
    if (event.target === this) closeSettings();
});

document.addEventListener('keydown', (event) => {
    if (event.key == "Escape") {
        if (popupOverlay.style.display != "none") {
            closeSettings();
        }
        else if (centralStock.style.display == "none") {
            backToMarket();
        }
    }
    else if (event.key == "o") {
        if (popupOverlay.style.display == "none") {
            openSettings();
        }
    }
    else if (event.key == "n") {
        if (centralStock.style.display != "none") {
            openNews();
        }
    }
    else if (event.key == "i") {
        if (centralStock.style.display != "none") {
            openInbox();
        }
    }
    else if (event.key == "j") {
        let newIdx = Object.keys(stockman.stockData).findIndex(loh => loh == selectedCard) + 1;
        newIdx = newIdx % (Object.keys(stockman.stockData).length);
        select(Object.keys(stockman.stockData)[newIdx]);
    }
    else if (event.key == "k") {
        let newIdx = Object.keys(stockman.stockData).findIndex(loh => loh == selectedCard) - 1;
        if (newIdx < 0) {
            newIdx = Object.keys(stockman.stockData).length + newIdx;            
        }
        select(Object.keys(stockman.stockData)[newIdx]);
    }
});
