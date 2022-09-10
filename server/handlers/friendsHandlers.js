const { MongoClient, ObjectId, ReadConcern } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const sendFriendRequest = async (req, res) => {
  const data = req.body;
  const today = new Date();
  try {
    await client.connect();
    const db = client.db("what2watch");
    let requestAlreadyReceived = false;

    if (data.friend_id === data.myId) {
      return res.status(202).json({
        status: 202,
        message: "cannot request to be friend with yourself",
      });
    }
    const friend = await db
      .collection("users")
      .findOne({ _id: ObjectId(data.friend_id) });
    const currentUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(data.myId) });
    if (friend && currentUser) {
      requestAlreadyReceived = await friend.friendRequestReceived?.some(
        (el) => {
          if (el.id === data.myId) {
            return true;
          }
          return false;
        }
      );
      if (!requestAlreadyReceived) {
        await db.collection("users").updateOne(
          { _id: ObjectId(data.friend_id) },
          {
            $addToSet: {
              friendRequestReceived: { id: data.myId, date: today },
            },
          }
        );
        await db.collection("users").updateOne(
          { _id: ObjectId(data.myId) },
          {
            $addToSet: {
              friendRequestSent: { id: data.friend_id, date: today },
            },
          }
        );
        return res.status(200).json({ status: 200, message: "request sent" });
      } else {
        return res
          .status(202)
          .json({ status: 202, message: "request already sent" });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "the user was not found",
        body: currentUser,
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};
const handleFriendRequest = async (req, res) => {
  const data = req.body;
  const today = new Date();
  let updateCurrentUser = false;
  let updateOtherUser = false;
  try {
    await client.connect();
    const db = client.db("what2watch");
    switch (data.action) {
      case "accept":
        const checkCurrentFriends = await db.collection("users").findOne({
          _id: ObjectId(data.myId),
          friends: { $elemMatch: { id: data.friendId } },
        });
        const checkOtherFriends = await db.collection("users").findOne({
          _id: ObjectId(data.friendId),
          friends: { $elemMatch: { id: data.myId } },
        });
        if (!checkCurrentFriends) {
          updateCurrentUser = await db.collection("users").updateOne(
            { _id: ObjectId(data.myId) },
            {
              $push: {
                friends: { id: data.friendId, date: today },
              },
            }
          );
        }
        if (
          checkCurrentFriends !== null ||
          updateCurrentUser.modifiedCount > 0
        ) {
          await db.collection("users").updateOne(
            { _id: ObjectId(data.friendId) },
            {
              $pull: {
                friendRequestSent: { id: data.myId },
              },
            }
          );
        }
        if (!checkOtherFriends) {
          updateOtherUser = await db.collection("users").updateOne(
            { _id: ObjectId(data.friendId) },
            {
              $push: {
                friends: { id: data.myId, date: today },
              },
            }
          );
        }
        if (checkOtherFriends !== null || updateOtherUser.modifiedCount > 0) {
          await db.collection("users").updateOne(
            { _id: ObjectId(data.myId) },
            {
              $pull: {
                friendRequestReceived: { id: data.friendId },
              },
            }
          );
        }
        return res.status(202).json({
          status: 202,
          message: "Friend accepted",
        });

      case "refuse":
        await db.collection("users").updateOne(
          { _id: ObjectId(data.friendId) },
          {
            $pull: {
              friendRequestSent: { id: data.myId },
            },
          }
        );

        await db.collection("users").updateOne(
          { _id: ObjectId(data.myId) },
          {
            $pull: {
              friendRequestReceived: { id: data.friendId },
            },
          }
        );
        return res.status(200).json({
          status: 200,
          message: "Friend request rejected",
        });
      case "remove":
        await db.collection("users").updateOne(
          { _id: ObjectId(data.friendId) },
          {
            $pull: {
              friendRequestReceived: { id: data.myId },
            },
          }
        );

        await db.collection("users").updateOne(
          { _id: ObjectId(data.myId) },
          {
            $pull: {
              friendRequestSent: { id: data.friendId },
            },
          }
        );
        return res.status(200).json({
          status: 200,
          message: "Friend request cancelled",
        });
      case "delete":
        await db.collection("users").updateOne(
          { _id: ObjectId(data.friendId) },
          {
            $pull: {
              friends: { id: data.myId },
            },
          }
        );

        await db.collection("users").updateOne(
          { _id: ObjectId(data.myId) },
          {
            $pull: {
              friends: { id: data.friendId },
            },
          }
        );
        return res.status(200).json({
          status: 200,
          message: "user succesfully remove from your friends",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  sendFriendRequest,
  handleFriendRequest,
};
