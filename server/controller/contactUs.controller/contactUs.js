import ContactUs from "../../models/contactUs.models/contactUs.js";

// Add new message
const Contact_create = (req, res) => {
  let crud = new ContactUs(req.body);
  crud
    .save()
    .then((crud) => {
      res.send(crud);
    })
    .catch(function(err) {
      res.status(422).send("Failed");
      console.log(err);
    });
};

//Display All messages
const Contact_index = (req, res) => {
  ContactUs.find(function(err, cruds) {
    res.json(cruds);
  });
};

// Show a particular message by Id
const Contact_details = (req, res) => {
  ContactUs.findById(req.params.id, function(err, crud) {
    if (!crud) {
      res.status(404).send("No result founds");
    } else {
      res.json(crud);
    }
  });
};

// Delete CRUD Detail by Id
const Contact_delete = (req, res) => {
  ContactUs.findById(req.params.id, function(err, crud) {
    if (!crud) {
      res.status(404).send("Crud not found");
    } else {
      ContactUs.findByIdAndRemove(req.params.id)
        .then(function() {
          res.status(200).json("Crud deleted");
        })
        .catch(function(err) {
          res.status(400).send("Crud delete failed.");
        });
    }
  });
};

export { Contact_index, Contact_create, Contact_details, Contact_delete };
