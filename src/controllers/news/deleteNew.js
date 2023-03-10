const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery");
const deleteNewQuery = require("../../db/queries/news/deleteNewQuery");

const { generateError, deleteImg } = require("../../helpers");

const deleteNew = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    const ownNew = await selectNewByIdQuery(idNew);

    if (ownNew[0].idUser !== req.user.id) {
      generateError("No tienes suficientes permisos", 401);
    }

    console.log(ownNew);

    if (ownNew[0].image) {
      await deleteImg(ownNew[0].image);
    }

    await deleteNewQuery(idNew);

    res.send({
      status: "ok",
      message: "Noticia eliminada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteNew;
