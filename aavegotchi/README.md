Boilerplate project for using the Moralis sdk with our project marketplace
This is the phaser component
Cadence is the web frontend (convert to react native later?)

## To-do: 
MOVE MORALIS SETTINGS INTO .env FILE!!

insert this into react project (if it works with cadence/onflow.org client library)
Move into phaser three.js (3d phaser) with the same blockchain code after this (integrating with unity, generating additional scenes for trailer, companion app/trial game)
Aavegotchi -> Importing player data in game, creating custom animations, customising playe design with the chosen aaveotchi or other digital image (e.g. customising the game character, an astronaut, with your aavegotchi)
Add another existing game into the phaser logic...

### Figure out how to fix potential lag
* Extending/exporting the db (something like airtable that we did before)
* Moralis will only contain extremely recent player position in the db
    However, we want players to be at checkpoints with their custom configurations at that time, etc
    Sending it to a different db service that is only called when the player requests it?


Put this in Notion!!!

Custom Moralis skin/ui (duplicating to airtable or some other visual frontend?)

### Multiplayer configuration:
Look at the ways we design the user flow for character vs (multiplayer) competitors and migrate this methodology to Unity

```js
// Player position query (to Moralis db)
            let query = new Moralis.Query("PlayerPosition");
            let subscription = await query.subscribe();
            subscription.on('create', (plocation) => { // When  a new player position is added to the db || creating plocation entry
                if(plocation.get("player") != user.get("ethAddress")){

                    // If first time seeing additional players
                    if(competitors[plocation.get("player")] == undefined) { // Undefined as until now the data structure/variable for this new player was empty/undefined
                        // Create sprite for other characters
                        competitors[plocation.get("player")] = this.add.image(400, 300, 'player').setScale(0.3);
                    }

                    console.log("someone moved");
                    console.log(plocation.get("player"));
                    console.log("new x ", plocation.get("x"))
                    console.log("new y ", plocation.get("y"))
                }
                console.log("object created");
```

Don't forget that this has issues as it's not meant for wide scale distribution/large servers (i.e. in a production environment) -> is this scaffolding therefore completely in the wrong direction for a production-type environment?
Saving progress?

Training ml (another "citizen science" use) agents for predicting movements/actions in-game (preventing lag?)?? (Moralis forum has example on lag compensation with this technique)

### Art
https://www.gameart2d.com/free-graveyard-platformer-tileset.html

## Moralis
https://admin.moralis.io/servers