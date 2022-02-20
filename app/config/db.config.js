const database='db_photogallery';
const password='admin';
module.exports = {
    url: `mongodb+srv://admin:${password}@gallery.2nscy.mongodb.net/${database}?retryWrites=true&w=majority`
  };