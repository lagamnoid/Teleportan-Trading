_newsTemplates = {    
    "trendIncrease": [
        (companyName, investorName) => `${companyName} reports record-breaking quarterly earnings, beating analyst estimates.`,
        (companyName, investorName) => `${companyName} announces a strategic partnership with a major tech giant, boosting investor confidence.`,
        (companyName, investorName) => `${companyName} secures a government contract for its innovative solutions.`,
        (companyName, investorName) => `Insider ${investorName} uncovers the budget of ${companyName}`,
        (companyName, investorName) => `${companyName} exceeds subscriber growth targets for the third consecutive quarter.`,
        (companyName, investorName) => `Activist investor ${investorName} takes a significant stake in ${companyName}.`,
        (companyName, investorName) => `${companyName} announces a massive share buyback program, signaling strong financial health.`,
        (companyName, investorName) => `${companyName} reports a surge in overseas demand, expanding its global market share.`,
        (companyName, investorName) => `${companyName} launches a revolutionary new product line that disrupts the industry.`,
        (companyName, investorName) => `${companyName} raises its full-year guidance after a strong holiday sales season.`
    ],

    "trendDecrease": [
        (companyName, investorName) => `${companyName} misses earnings expectations, posting its first quarterly loss in five years.`,
        (companyName, investorName) => `${companyName} faces a major class-action lawsuit over alleged misleading business practices.`,
        (companyName, investorName) => `${companyName} loses its largest client to a competitor, jeopardizing future revenue.`,
        (companyName, investorName) => `${companyName} announces unexpected CEO resignation amid internal turmoil.`,
        (companyName, investorName) => `${companyName} reports consumer preferences shifting away.`,
        (companyName, investorName) => `${companyName} is hit with a fine from regulators for compliance violations.`,
        (companyName, investorName) => `${companyName} lowers future profit forecasts.`,
        (companyName, investorName) => `${companyName} suffers a severe supply chain disruption, halting production lines.`,
        (companyName, investorName) => `Short-seller ${investorName} releases a damaging report accusing ${companyName} of fraud.`,
        (companyName, investorName) => `${companyName} delays the launch of its highly anticipated product due to technical issues.`
    ],

    "volatilityIncrease": [
        (companyName, investorName) => `Rumors of a potential takeover bid for ${companyName} surface, causing frantic trading.`,
        (companyName, investorName) => `${companyName} schedules an emergency board meeting amid conflicting insider leaks.`,
        (companyName, investorName) => `Leaked information suggests ${companyName} is exploring a radical restructuring plan.`,
        (companyName, investorName) => `Insider ${investorName} uncovers the future plans of ${companyName}`,
        (companyName, investorName) => `Hedge fund manager ${investorName} takes a massive options position in ${companyName}, sparking speculation.`,
        (companyName, investorName) => `${companyName} is caught in crossfire of a trade war, with tariffs fluctuating daily.`,
        (companyName, investorName) => `Rival companies are in a bidding war to acquire a key patent held by ${companyName}.`,
        (companyName, investorName) => `${companyName} reports mixed preliminary numbers, leaving analysts deeply divided.`,
        (companyName, investorName) => `A major shareholder of ${companyName} demands an immediate leadership change.`,
        (companyName, investorName) => `Conflicting analyst ratings cause extreme price swings for ${companyName}.`
    ],

    "volatilityDecrease": [
        (companyName, investorName) => `The central bank announces stable interest rates, reducing uncertainty for ${companyName}.`,
        (companyName, investorName) => `${companyName} resolves its long-standing legal dispute with a quiet settlement.`,
        (companyName, investorName) => `Analysts reach a rare consensus on the fair valuation of ${companyName} after months of debate.`,
        (companyName, investorName) => `${companyName} provides clear, transparent guidance for the next three quarters.`,
        (companyName, investorName) => `The annual shareholder meeting of ${companyName} was uneventful, with no major surprises.`,
        (companyName, investorName) => `Institutional investor ${investorName} gradually increases stake on ${companyName}, signaling steady confidence.`,
        (companyName, investorName) => `${companyName} is added to a major index, attracting stable, passive fund inflows.`,
        (companyName, investorName) => `Regulatory hurdles for ${companyName} are officially cleared with routine approval.`,
        (companyName, investorName) => `${companyName} delivers exactly in line with its pre-announced metrics.`,
        (companyName, investorName) => `Trading volume in ${companyName} returns to normal levels as the market absorbs all recent news.`
    ]
}

_globalNews = {
    "Information Technology": [
        "AI chip demand surges after major cloud provider announces record data center expansion.",
        "Cybersecurity firm beats earnings on strong enterprise subscription growth amid rising threats.",
        "Semiconductor maker cuts guidance as smartphone and PC inventory glut worsens.",
        "Regulatory scrutiny tightens on big tech, sparking fears of antitrust breakups and revenue hits.",
    ],

    "Energy": [
        "Oil prices jump after OPEC+ announces surprise production cut amid geopolitical tensions.",
        "Renewable energy stocks rally as new federal tax credits and offshore wind leases are approved.",
        "Crude prices plunge on demand fears as global manufacturing activity contracts sharply.",
        "Natural gas inventories build above 5-year average, sending futures lower on oversupply concerns.",
    ],

    "Consumer Discretionary": [
        "Retail giant beats holiday sales estimates as consumer spending remains resilient despite inflation.",
        "Luxury brand raises full-year outlook on strong Chinese demand and tourism recovery.",
        "Auto manufacturer slashes EV production targets as consumer interest wanes and competition heats up.",
        "Fast-casual chain warns of margin compression as input costs and labor wages rise unexpectedly.",
    ],

    "Communication Services": [
        "Streaming platform adds record subscribers after exclusive content deal and price hike.",
        "Telecom giant secures multi-billion dollar government contract for 5G rural broadband buildout.",
        "Advertising revenue plummets at social media firm as brands pull spend amid content moderation backlash.",
        "Cable provider loses more broadband subscribers than expected as cord-cutting accelerates.",
    ],

    "Industrials": [
        "Defense contractor wins major NATO supply deal, backlog reaches all-time high.",
        "Freight and logistics stocks rally as shipping rates rebound on peak season demand.",
        "Aerospace supplier cuts delivery forecast due to ongoing engine parts shortage and labor strikes.",
        "Construction equipment orders fall sharply as commercial real estate starts hit a decade low.",
    ],

    "Materials": [
        "Gold prices soar to new highs as safe-haven buying intensifies amid currency devaluation fears.",
        "Lithium miner announces new high-grade discovery, boosting production outlook for EV batteries.",
        "Steel producers slash prices as Chinese export surplus floods global market.",
        "Agricultural chemical giant lowers profit view after drought reduces fertilizer demand in key regions.",
    ],

    "Real Estate": [
        "REITs climb as bond yields drop, making dividend payouts more attractive to income investors.",
        "Industrial warehousing demand surges on supply chain reshoring and e-commerce expansion.",
        "Office vacancy rates hit 30-year high as hybrid work continues to cut space requirements.",
        "Mortgage rates spike above 8%, cooling housing starts and slowing residential REIT earnings.",
    ]
}

_newsPeople = ["TokakTarrot",
    "Bin Pattah",
    "Abu Raqa",
    "Web Dan Namlleh",
    "Gebrag Thayer Morph",
    "Carb TobretLif",
    "Han Moon",
    // 'A familiar person who advertises words that end with ""',
    "Tuan Fu",
    "Guilian",
]

class NewsManager {
    constructor() {
        this.newsHistory = {};
        this.loadFromLocalStorage();
        this.newsFilter = document.getElementById("news-filter");
        this.newsFilter.addEventListener("change", () => {this.updateNews(userVars.following); standardAnimation(newsList, 30, 200);});
    }

    loadFromLocalStorage() {
        this.newsHistory = JSON.parse(localStorage.getItem("newsHistory"));
    }

    syncNewsHistory() {
        localStorage.setItem("newsHistory", JSON.stringify(this.newsHistory));
    }

    createNewsCard(title, text, date) {
        const card = document.createElement("div");
        card.className = "card news-card-addition";
        card.style.pointerEvents = "none";
    
        const upperElement = document.createElement("div");
        upperElement.style.display = "flex";
        upperElement.style.flexDirection = "row";
    
        const cardTitle = document.createElement("p");
        cardTitle.className = "card-title news-title-addition";
        cardTitle.textContent = title;
    
        const cardDate = document.createElement("p");
        cardDate.textContent = date;
        cardDate.className = "card-title";
        cardDate.style.marginLeft = "auto";
        cardDate.style.fontSize = "20px";
    
        upperElement.appendChild(cardTitle);
        upperElement.appendChild(cardDate);
    
        const cardText = document.createElement("p");
        cardText.className = "card-title news-text-addition";
        cardText.textContent = text;
    
        card.appendChild(upperElement);
        card.appendChild(cardText);
    
        const wrappedCard = document.createElement("li");
        wrappedCard.style.marginTop = "10px";
        wrappedCard.appendChild(card);
        return wrappedCard;
    }

    capNews() {
        if (Object.keys(this.newsHistory).length > MAX_NEWS_HISTORY_LENGTH) {
            delete this.newsHistory[Object.keys(this.newsHistory)[0]];
            this.newsHistory[Object.keys(this.newsHistory)[0]].forEach((article) => {
                const day = Object.keys(this.newsHistory)[0].slice(4) - 1;
                const idx = this.newsHistory[Object.keys(this.newsHistory)[0]].indexOf(article);
                const elman = document.getElementById(`news-${day}-${idx}`);
                if (elman === null) {
                    console.log(`Element 'news-${day}-${idx}' does not exist`);
                } else {
                    elman.remove();
                    // console.log(`news-${day}-${idx}` + " removed");
                }
            });
        }
    }

    loadNewsFor(newsList) {
        Object.keys(this.newsHistory).forEach((date) => {
            this.newsHistory[date].forEach((article) => {
                const card = this.createNewsCard(article.title, article.text, date);
                card.id = `news-${date.slice(4)}-${this.newsHistory[date].length - 1}`;
                newsList.prepend(card);
            })
        });
    }

    generateMinorArticle(name, company) {
        const randomManLiterally = _newsPeople[Math.trunc(random(0, _newsPeople.length))];
        const templateGroup = randomKey(_newsTemplates);
        const text = _newsTemplates[templateGroup][Math.trunc(random(0, _newsTemplates[templateGroup].length))](company.desc, randomManLiterally);
        const card = this.createNewsCard(name, text, `Day ${userVars.day}`);
        if (Object.hasOwn(this.newsHistory, `Day ${userVars.day}`)) {
            this.newsHistory[`Day ${userVars.day}`].push({title: name, text: text});
            card.id = `news-${userVars.day}-${this.newsHistory[`Day ${userVars.day}`].length}`;
        }
        else {
            this.newsHistory[`Day ${userVars.day}`] = [{title: name, text: text}];
            card.id = `news-${userVars.day}-${0}`;
        }
        newsList.prepend(card);
    
        if (templateGroup == "trendIncrease") {
            company.trend += random(0.0002, 0.0004);
        }
        else if (templateGroup == "trendDecrease") {
            company.trend -= random(0.0002, 0.0004);
        }
        else if (templateGroup == "volatilityIncrease") {
            company.volatility += random(0.005, 0.001);
        }
        else if (templateGroup == "volatilityDecrease") {
            company.volatility -= random(0.005, 0.001);
        }
        // console.log(`${templateGroup} of ${name}`); 
    }

    generateGlobalArticle(stockData) {
        const industry = randomKey(_globalNews);
        const idx = Math.trunc(random(0, _globalNews[industry].length));
        const text = _globalNews[industry][idx];
        const card = this.createNewsCard(industry, text, `Day ${userVars.day}`);
        if (Object.hasOwn(this.newsHistory, `Day ${userVars.day}`)) {
            this.newsHistory[`Day ${userVars.day}`].push({title: industry, text: text});
            card.id = `news-${userVars.day}-${this.newsHistory[`Day ${userVars.day}`].length}`;
        }
        else {
            this.newsHistory[`Day ${userVars.day}`] = [{title: industry, text: text}];
            card.id = `news-${userVars.day}-${0}`;
        }
        newsList.prepend(card);
    
        const invert = idx < 2 ? 1 : -1;
        Object.keys(stockData).forEach((name) => {
            if (stockData[name].industry == industry) {
                stockData[name].trend += random(0.0002, 0.0004) * invert;
            }
        });
        // console.log(`Global: Industry ${industry} ${invert == 1 ? "Increase": "Decrease"}`);
    
    }

    updateNews(followingList) {
        Object.keys(this.newsHistory).forEach((date) => {
            this.newsHistory[date].forEach((article) => {
                const elman = document.getElementById(`news-${date.slice(4)}-${this.newsHistory[date].indexOf(article)}`);
                if (elman === null) {
                    console.log(`Element 'news-${date.slice(4)}-${this.newsHistory[date].indexOf(article)}' does not exist`);
                    return;
                }
                const styleman = elman.style;
                // console.log(date, this.newsHistory[date], this.newsHistory[date].indexOf(article), `news-${date.slice(4)}-${this.newsHistory[date].indexOf(article)}`);
                if (this.newsFilter.value == "following") {
                    if (!followingList.includes(article.title)) {
                        styleman.display = "none";
                    } else {
                        styleman.display = "flex";
                    }
                }
                else if (this.newsFilter.value == "all") {
                    styleman.display = "flex";
                }
    
            });
        });
    }
}



