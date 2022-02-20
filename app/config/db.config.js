const user='admin';
const database='db_photogallery';
const password='admin';
module.exports = {
    url: `mongodb+srv://${user}:${password}@gallery.2nscy.mongodb.net/${database}?retryWrites=true&w=majority`
  };