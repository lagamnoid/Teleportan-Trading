class InboxManager {
    constructor() {
        this.messages = [];
        this.unread = 0;
        this.loadFromLocalStorage();
        this.inboxList = document.getElementById("inbox-list");
        this.buttOpenInbox = document.getElementById("butt-open-inbox");
        this.updateButtonView();
    }

    loadFromLocalStorage() {
        const inbox = JSON.parse(localStorage.getItem("inbox"));
        this.messages = inbox.messages;
        this.unread = inbox.unread;
    }

    createInboxCard(title, text, date, from) {
        const card = document.createElement("div");
        card.className = "card news-card-addition";
        card.style.pointerEvents = "none";
    
        const upperElement = document.createElement("div");
        upperElement.style.display = "flex";
        upperElement.style.flexDirection = "row";
    
        const cardTitle = document.createElement("p");
        cardTitle.className = "card-title news-title-addition";
        cardTitle.textContent = title;
    
        const cardFrom = document.createElement("p");
        cardFrom.className = "card-title";
        cardFrom.style.marginLeft = "50px";
        cardFrom.style.fontSize = "20px";
        cardFrom.style.color = "var(--gray-color)";
        cardFrom.textContent = `(From: ${from})`;
    
        const cardDate = document.createElement("p");
        cardDate.textContent = `Day ${date}`;
        cardDate.className = "card-title";
        cardDate.style.marginLeft = "auto";
        cardDate.style.fontSize = "20px";
    
        upperElement.appendChild(cardTitle);
        upperElement.appendChild(cardFrom);
        upperElement.appendChild(cardDate);
    
        const cardText = document.createElement("p");
        cardText.className = "card-title news-text-addition";
        cardText.textContent = text;
    
        card.appendChild(upperElement);
        card.appendChild(cardText);
    
        const wrappedCard = document.createElement("li");
        wrappedCard.style.marginTop = "25px";
        wrappedCard.appendChild(card);
        return wrappedCard;
    }
    
    loadInbox() {
        this.messages.forEach((msg) => {
            const card = this.createInboxCard(msg.title, msg.text, msg.day, msg.from);
            card.id = `msg-${this.messages.indexOf(msg)}`;
            this.inboxList.prepend(card);
        })
    }

    syncInbox() {
        const inbox = {messages: this.messages, unread: this.unread};
        localStorage.setItem("inbox", JSON.stringify(inbox));
    }

    updateButtonView() {
        this.buttOpenInbox.textContent = `Inbox ${this.unread == 0 ? "": `(${this.unread})`} ▼`;
        if (this.unread > 0) {
            this.buttOpenInbox.style.color = "var(--banana-color)";
        }
        else {
            this.buttOpenInbox.style.color = "";
        }
    }

    capMessages() {
        console.log("capping");
        if (this.messages.length > MAX_INBOX_MESSAGES_LENGTH) {
            console.log("capping kind of");
            const elman = document.getElementById(`msg-${this.messages[0].idx}`);
            this.messages.shift();
            if (elman === null) {
                console.log(`Element 'msg-${this.messages[0].idx}' does not exist`);
            } else {
                elman.remove();
                console.log(`msg-${this.messages[0].idx}` + " removed");
            }
        }
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

    send(title, text, date, from) {
        const newIdx = this.messages.length == 0 ? 0: this.messages.at(-1).idx + 1;
        this.messages.push({
                       title: title,
                       text: text,
                       day: date,
                       from: from,
                       idx: newIdx});
        const card = this.createInboxCard(title, text, date, from);
        card.id = `msg-${newIdx}`;
        this.inboxList.prepend(card);
        if (this.inboxList.parentElement.style.display == "none") {
            this.unread++;
        }
        this.capMessages();
        this.updateButtonView();
        this.syncInbox();
    }
}   