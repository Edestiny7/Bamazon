let friends = require("../public/data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        let totalDiff = 0;
        let bestFriend = {
            name: "",
            photo: "",
            diff: 1000
        };

        let newFriend = req.body;
        let friendName = newFriend.name;
        let friendScores = newFriend.scores;

        let b = friendScores.map(function(item) {
            return parseInt(item, 10);
        });
        newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        };

        console.log("Friend's Name: " + friendName);
        console.log("Friend's Scores: " + friendScores);

        let sum = b.reduce((a, b) => a + b, 0);
        console.log("Friend's Sum Total: " + sum);
        console.log("*********************************************************");

        for (i = 0; i < friends.length; i++) {
            console.log("Potential Match Name: " + friends[i].name);
            totalDiff = 0;

            let bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Potential Match Score: " + bestFriendScore);
            totalDiff += Math.abs(sum - bestFriendScore);

            if (totalDiff <= bestFriend.diff) {
                bestFriend.name = friends[i].name;
                bestFriend.photo = friends[i].photo;
                bestFriend.diff = totalDiff;
            }
            console.log("Distance From Match: " + totalDiff);
            console.log("************************************")
        }

        console.log(bestFriend);

        //Adding match to array
        friends.push(newFriend);
        console.log("New friend added");
        console.log(newFriend);

        //Sending match to browser
        res.json(bestFriend);
    });
};