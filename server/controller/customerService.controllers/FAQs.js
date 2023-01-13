import FAQs from "../../models/customerService.models/FAQs.js";

// Display All FAQs
const FAQs_index = (req, res) => {
  FAQs.find(function (err, cruds) {
    res.json(cruds);
  });
};

// Add new FAQ
const FAQs_create = (req, res) => {
  let crud = new FAQs(req.body);
  crud
    .save()
    .then((crud) => {
      res.send(crud);
    })
    .catch(function (err) {
      res.status(422).send("FAQs add failed");
      console.log(err);
    });
};

// Show a particular FAQs Detail by Id
const FAQs_details = (req, res) => {
  FAQs.findById(req.params.id, function (err, crud) {
    if (!crud) {
      res.status(404).send("No result founds");
    } else {
      res.json(crud);
    }
  });
};

// Update FAQs Detail by Id
const FAQs_update = (req, res) => {
  FAQs.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json(" detail updated");
    })
    .catch(function (err) {
      res.status(422).send(" detail update failed.");
    });
};

// Delete CRUD Detail by Id
const FAQs_delete = (req, res) => {
  FAQs.findById(req.params.id, function (err, crud) {
    if (!crud) {
      res.status(404).send("Crud not found");
    } else {
      FAQs.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Crud deleted");
        })
        .catch(function (err) {
          res.status(400).send("Crud delete failed.");
        });
    }
  });
};

export { FAQs_index, FAQs_details, FAQs_create, FAQs_update, FAQs_delete };
