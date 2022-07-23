<html>
    <head>
        <title>Chat Boilerplate</title>
        <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
        <script src="https://npmcdn.com/moralis@1.9.1/dist/moralis.js"></script>
    </head>
    <body>
        <button id="btn-login">Web3 login</button>
        <button id="btn-logout">Logout</button>
        <br>
        <hr>
        <p>Create new groupchat: </p>
        <input type="text" placeholder="Group name" id="group-name-text"/>
        <input type="button" value="Create" id="btn-new-group-chat"/>
        <br>
        <p>Join groupchat</p>
        <div id="chatRooms">
            <ul id="roomList"></ul>
        </div>
        <hr>

        <script>
            // Connect to the Moralis server
            Moralis.initialize("");
            Moralis.serverURL = "";

            async function login() {
                let user = Moralis.User.current();
                if (!user) {
                    user = await Moralis.Web3.authenticate();
                }
                console.log("Logged in user: ", user);
            }

            async function logOut() {
                await Moralis.User.logOut();
                console.log("logged out user");
            }

            // Button -> Create (value)
            async function newGroupChat() {
                let chatTitle = document.getElementById("group-name-text".value);
                const Chats = Moralis.Object.extend("Chats");
                const chat = new Chats(); 
                chat.set("title", chatTile); // Create a new chat in the Moralis db
                chat.save();

                console.log("Created chat with title: " + chatTitle);
            }

            // Retrieving group chats already active/created from Moralis
            async function getGroupChats() {
                const Chats = Moralis.Object.extend("Chats");
                const query = new Moralis.Query(Chats);
                const results = await query.find(); // Array of all the chats from the db

                const roomList = document.getElementById("roomList");

                // Loop through the array of group chats and return the title
                for (let i = 0; i < results.length; i++) {
                    const object = results[i];
                    console.log(object.get('title'));

                    // Add each existing chat to the ul tag ^^
                    var listItem = document.createElement('li'); // create li tag with the chat room name
                    listItem.innerHTML = "<a href='chat.html?id="+object.id+"'>"+object.get('title')+"</a>";
                    roomList.appendChild(listItem);
                }
            }

            getGroupChats();

            // To-Do: Discord integration, RSS feed (signal-k/marketplace#7), API, integrate into moralis-dao UI, integrate into Unity

            // Function mapping -> divs
            document.getElementById("btn-login").onclick = login;
            document.getElementById('btn-logout').onclick = logOut;
            document.getElementById('btn-new-group-chat').onclick = newGroupChat;
        </script>
    </body>
</html>