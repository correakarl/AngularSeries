const Serie = require('../models/serie.model');
const serieCtrl = {};

// Función que devuelve todas las Series
serieCtrl.getSeries = async (req, res) => {
    const series = await Serie.find({}, '_id title thumbnail category emissionYear')
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
};

// Función que devuelve una Serie dada un id
serieCtrl.getSerie = async (req, res) => {
    const serie = await Serie.findById(req.params.id)
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({ status: 'Serie does not exist' })
        })
        .catch(err => console.log(err));
}

// Añadir una nueva Serie a nuestra base de datos
serieCtrl.addSerie = async (req, res) => {
    const mySerie = new Serie(req.body);
    await mySerie.save()
        .then(() =>
            res.json({ status: 'Serie Successfully Inserted ' }))
        .catch(err => res.send(err.message));
}

// Función para actualizar una Serie con el id y la Serie con
// los nuevos datos
serieCtrl.updateSerie = async (req, res) => {
    const mySerie = req.body;
    if (req.params.id !== null) {
        await Serie.findByIdAndUpdate(
            req.params.id,
            { $set: mySerie },
            { new: true })
            .then((data) => {
                if (data != null) res.json({
                    status: 'Serie Successfully Updated', data
                })
                else res.json({ status: 'Serie does not exist' })
            })
            .catch(err => res.send(err.message));
    } else {
        res.json({ status: 'ID can not be null' })
    }
}

// Función para borrar una Serie dada un id
serieCtrl.deleteSerie = async (req, res) => {
    await Serie.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data != null) res.json({
                status: 'Serie Successfully Deleted'
            })
            else res.json({ status: 'Serie does not exist' })
        })
        .catch(err => res.send(err.message));
}

module.exports = serieCtrl;
