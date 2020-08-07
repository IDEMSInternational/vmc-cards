function onCardNumberInputChange(event) {
    document.getElementById("card-number-input").max = cards.length;
    renderCards();
};

function filterCards(cards) {
    if (document.getElementById("card-number-input").value) {
        var cardNum = document.getElementById("card-number-input").valueAsNumber;
        if (cardNum <= cards.length && cardNum > 0) {
            return [cards[cardNum - 1]];
        }
    }
    return cards;
}

function renderCards() {
    var template = document.getElementById('card-template').innerHTML;
    document.getElementById('card-template').style.display = "none";
    var cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = "";
    displayedCards = filterCards(cards);
    displayedCards.forEach((card) => {
        var cardElement = document.createElement("div");
        cardElement.innerHTML = Mustache.render(template, { card: card });
        cardsContainer.appendChild(cardElement);
    });
}