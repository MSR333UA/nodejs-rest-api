const path = require("path");
const fs = require("fs/promises");
const User = require("../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const avatars = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const newFileName = `${_id}.${extension}`;
    const uploadDir = path.join(avatarsDir, newFileName);

    const image = await Jimp.read(`./tmp/${originalname}`);
    await image.resize(250, 250);
    await image.writeAsync(`./tmp/${originalname}`);

    await fs.rename(tempDir, uploadDir);

    const avatarURL = path.join("public", "avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    // const newAvatar = {
    //   name: req.body.name,
    //   id: uuidv4(),
    //   image,
    // };
    // avatarsDir.push(newAvatar);
    // res.status(200).json(avatarURL);

    res.status(200).json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = { avatars };
