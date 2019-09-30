let friends = require("../data/friends");

app.get("/api/friends", function(req, res) {
    res.json(friends);
});

app.post("/api/friends", function(req, res) {
    let newFriend = req.body;
    console.log(`New Friend: ${JSON.stringify(newFriend)}`);
    friends.push(newFriend);
    res.json(newFriend);
});