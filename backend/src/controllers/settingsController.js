const { Setting } = require("../models");

const getSettings = async (req, res) => {
  try {
    const setting = await Setting.findOne({
      where: {
        organizationId: req.user.organizationId,
      },
    });

    return res.status(200).json(setting);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { defaultLowStockThreshold } = req.body;

    const setting = await Setting.findOne({
      where: {
        organizationId: req.user.organizationId,
      },
    });

    if (!setting) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    await setting.update({
      defaultLowStockThreshold,
    });

    return res.status(200).json({
      message: "Settings updated successfully",
      setting,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};