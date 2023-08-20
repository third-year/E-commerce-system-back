const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const productRouter = require("./productRoute");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/login-as-admin", authController.loginAsAdmin);
router.get("/profile", authController.protect, userController.profile);
router.get("/getUser", userController.getUser);
router.get("/getAllUsers", userController.getAllUsers);

router.post(
  "/register-delivery-man",
  authController.protect,
  authController.restrictTo("admin"),
  authController.registerDeliveryMan
);

router.get(
  "/delivery-men",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getDeliveryMen
);

router.post("/forgotPassword", authController.forgotPassword);
router.post(
  "/charge-wallet",
  authController.protect,
  authController.restrictTo("user"),
  userController.chargeWallet
);
router.get(
  "/checkResetToken/:token",
  authController.checkTokenIfValid,
  authController.checkResetToken
);
router.post(
  "/resetPassword/:token",
  authController.checkTokenIfValid,
  authController.resetPassword
);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);
router.patch(
  "/updateProfile",
  authController.protect,
  userController.updateProfile
);
router.delete(
  "/deleteAccount",
  authController.protect,
  userController.deleteAccount
);

router.get(
  "/get-all-users-for-the-admin",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsersForTheAdmin
);

router.post(
  "/send-email",
  authController.protect,
  authController.restrictTo("admin"),
  userController.sendEmail
);

router.delete(
  "/delete-user/:userId",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUserForTheAdmin
);

router.patch(
  "/update-user/:userId",
  authController.protect,
  authController.restrictTo("admin"),
  userController.updateUserForTheAdmin
);

module.exports = router;
