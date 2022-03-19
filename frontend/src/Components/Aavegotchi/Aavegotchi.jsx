<div>
  <title>Aavegotchi & SK Boilerplate</title>
  <button id="btn-login">Moralis Login</button>
  <button id="btn-logout">Logout</button>
  <br /><br />
</div>

<script>
// Connect to Moralis server
        Moralis.initialize("https://api.moralis.com/api/v1/", "YOUR_API_KEY");
        Moralis.serverURL = "";

        // To-Do later: figure out ways to gain some more control, modularity (for use with other nodes/backends as an alternative to Moralis) over these type of web3 functions
        async function login() {
            let user = Moralis.User.current();
            if (!user) {
                user = await Moralis.Web3.authenticate();
                launchGame();
            }
            console.log("Logged in user: ", user);
        }

        async function logOut() {
            await Moralis.User.logOut();
            console.log("Logged out user");
            location.reload();
        }

        // Load the Phaser game IF user is logged in
        (function launchGame() {
            console.log("Loading Game");

            let user = Moralis.User.current();
            if (!user) {
                alert("Please log in with your crypto wallet");
                console.log("Please log in with your crypto wallet");
            }
            else {
                console.log(user.get("ethAddress") + " " + "logged in");
                // Start game with below Phaser configuration
                game = new Phaser.Game(config);
            }
        })()

        document.getElementById("btn-login").onclick = login;
        document.getElementById("btn-logout").onclick = logOut;

        // Phaser configuration
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false,
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            }
        };

        // Start game with above Phaser configuration
        //var game = new Phaser.Game(config);

        // Game objects
        var platforms;

        // Character items
        var player;
        var jumpHeight = -150;
        var competitors = {}; // Other players, as object

        // Input
        var cursor;

        // Loading assets
        function preload() {
            this.load.image('background', 'assets/BG.png');
            this.load.image('ground', 'assets/Tiles/Tile (2).png');

            // Player setup & configuration
            this.load.image('playerCharacter', 'assets/Player/Player.png'); //  How do we get this to depend on what NFT the player has?
        }

        // Setup scene e.g. background, animations (loading)
        async function create() {
            // Setting the game setting
            this.add.image(400, 300, 'background').setScale(0.55); // Middle of image at (400, 300) (center of the screen)

            // Creating game objects
            platforms = this.physics.add.staticGroup(); // Add static physics group -> platforms are not affected by gravity, the player therefore sticks ontop of the platforms

            platforms.create(600, 400, 'ground').setScale(0.35).refreshBody(); // Create ground platform at (600, 400) with scale of 2
            platforms.create(645.5, 400, 'ground').setScale(0.35).refreshBody(); // Place it to the right of the first platform
            platforms.create(554.5, 400, 'ground').setScale(0.35).refreshBody(); // Place this tile to the left of the first platform/tile
            //platforms.create(156, 390, 'ground').setScale(0.35).refreshBody(); // refreshBody -> update the collision hitbox after changing the scale
            //platforms.create(7520, 77, 'ground').setScale(0.35).refreshBody(); // Later we can use other tiles (animations??)

            // Player configuration & creation
            player = this.physics.add.sprite(500, 250, 'playerCharacter').setScale(0.35).refreshBody(); // Create player at (100, 450) with scale of 0.35
            player.setBounce(0.2); // Make the player bounce off the ground
            player.setCollideWorldBounds(true); // Make the player collide with the world bounds
            this.physics.add.collider(player, platforms); // Add collision between player and platforms

            // Input configuration
            cursors = this.input.keyboard.createCursorKeys();

            // Moralis query configuration
            let user = Moralis.User.current();
            let query = new Moralis.query('PlayerPosition');
            let subscription = await query.subscribe();
            subscription.on('create', (plocation) => {
                if (plocation.get("player") != user.get("ethAddress")) {
                    // If this is the first time the other player has been seen 
                    if (competitors[plocation.get("player")] == undefined) {
                        competitors[plocation.get("player")] = this.add.image(plocation.get("x"), plocation.get("y"), 'playerCharacter').setScale(0.35).refreshBody(); // Draw/place the competitor (i.e. other player)
                        // Would we use something like `plocation` to get the player's NFT? # as in using a different variable
                    } else { // If that player has been seen in the game's window before (as in if they have been seen in the player's host browser)
                        competitors[plocation.get("player")].x = plocation.get("x");
                        competitors[plocation.get("player")].y = plocation.get("y");
                    }

                    console.log("Player Location: " + plocation.get("player") + " " + plocation.get("x") + " " + plocation.get("y"));
                }
            });
        }

        // Called -> updated 60 times per seconds (frames -> equivalent to Unity's Time.deltaTime). AKA the Game Loop
        function update() {
            // Input handling
            if (cursors.left.isDown) {
                player.setVelocityX(-160);
                //player.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                player.setVelocityX(160);
                //player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                //player.anims.play('turn');
            }
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(jumpHeight);
            }

            if (player.lastX != player.x || player.lastY != player.y) {
                let user = Moralis.User.current(); // Set this parameter to the Moralis database on a per-user level
                const PlayerPosition = Moralis.Object.extend("PlayerPosition"); // Variable name in Moralis DB
                const playerPosition = new PlayerPosition();
                playerPosition.set("player", user.get("ethAddress"));
                playerPosition.set("x", player.x);
                playerPosition.set("y", player.y);
                player.lastX = player.x;
                player.lastY = player.y;
                await playerPosition.save();
            }
        }

        // Add Unity WebGL integration here & interaction with Chainsafe/Nethereum sdk with Alchemy/Infura/Moralis ;;
        // Console integration, React/node components
        // Can we use this for loading Unity scenes ^^^^

</script>