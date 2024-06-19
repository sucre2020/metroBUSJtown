const efitaRoute = (req, res) => {
    res.send("Hello! I am Efita Effiom. \nWelcome to my project's homepage");
  };

  const lafuljiRoute = (req, res) => {
    res.send("Lafulji Effiom");
  };

  const muliiRoute = (req, res) => {
    res.send("Muli Effiom");
  };

  const amaRoute = (req, res) => {
    res.send("Ama Effiom");
  };

  const newRoute = (req, res) => {
    res.send("We are on new route");
  };


  module.exports = {
        efitaRoute,
        lafuljiRoute,
        muliiRoute,
        amaRoute,
        newRoute
    };