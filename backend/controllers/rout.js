

const Origami = require('../src/origami');
const fs = require('fs');
  
module.exports= {

createOrigami (req, res, next) {
  
    const origami = new Origami({
      OrigamiName: req.body.OrigamiName,
      OrigamiPic:req.body.OrigamiPic,
      OrigamiDiag: req.body.OrigamiDiag,
      OrigamiCate:req.body.OrigamiCate

    });
        origami.save()
          .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
          .catch(error => res.status(400).json({ error }));
      },

 modifyOrigami (req, res, next) {
    const origamiObject = req.file ?
    {
      ...JSON.parse(req.body.origami),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

        Origami.updateOne({ _id: req.params.id }, { ...origamiObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      },

      deleteOrigami  (req, res, next)  {
        Origami.findOne({ _id: req.params.id })
          .then(origami => {
            const filename = origami.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Origami.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
          })
          .catch(error => res.status(500).json({ error }));
      },

 getOneOrigami(req, res, next) {
    Origami.findOne({ _id: req.params.id })
      .then(origamis => res.status(200).json(origamis))
      .catch(error => res.status(404).json({ error }))
  },
getAllOrigami(req, res, next) {
    Origami.find()
      .then(origamis => res.status(200).json(origamis))
      .catch(error => res.status(400).json({ error }));
  }
}






