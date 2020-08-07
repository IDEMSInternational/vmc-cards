# VMC Cards

This is a proof of concept for letting people edit a deck of cards for use in the virtual maths camp website, without requiring them to download the full website repository.

Hopefully this strikes a compromise between previewing the cards, and being easy to edit for users with low bandwidth.

## How to Add Cards

Edit ```cards.js``` and add a json object for your card. Like so

```javascript
var cards = [
    {
        "rank": "a",
        "suit": "hearts",
        "text": "Testing..."
    },
    {
        "rank": 7,
        "suit": "clubs",
        "text": "A new card for testing"
    }
]
```
Note that the json objects need to be comma separated so if you are copying and pasting from the last card you might need to add a comma.
Do not modify the first or last line of the ```cards.js``` file.
Make sure the properties on the left of each object stay in quotes! e.g ```"rank": "q"``` not ```rank: "q"```

## How to preview the cards
Open ```index.html``` in your web browser. This will show you all the cards.
You can use the number input at the top to find a specific card.

## How to check that the cards are in the right format

Run ```node convert.js``` on the command line and a script will do two things.
- Convert cards.js into a JSON file
- Convert cards.js into a Typescript file in an ./output folder
- Use typescript to check you're using the right structure