const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getSender,
  getTeam,
  responseInvitaion,
  sendInvitation,
  getInvitations,
  deleteTeamMember,
  updateName,
  getNotifications,
  deleteNotification,
  changePassword,
  getUsers,
  deleteUser,
  postInquiries,
  getInquiries,
  addUserByadmin
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.post("/signup",registerUser)
router.post("/login", authUser);
router.get("/sender",getSender);
router.get("/:userId/team",getTeam);
router.post("/send-invitation",sendInvitation);
router.get("/users",getUsers);
router.post("/response-invitaion",responseInvitaion);
router.get("/:userId/invitations",getInvitations);
router.get("/:userId/notifications",getNotifications);
router.delete("/team/:email",deleteTeamMember);
router.put("/update-name/:id",updateName);
router.delete("/users/:userId",deleteUser);
router.delete("/notifications/:notificationId",deleteNotification);
router.patch("/:userId/change-password",changePassword);
router.get("/inquiries",getInquiries);
router.post("/inquiries",postInquiries);
router.post("/add-user",addUserByadmin);
module.exports = router;
