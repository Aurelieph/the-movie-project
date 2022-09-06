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
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};
const handleFriendRequest = async (req, res) => {};

module.exports = {
  signUp,
  getUser,
  getUserByID,
  createNewWatchlist,
  deleteWatchList,
};