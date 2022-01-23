const controller = {
  getRegister: (req, res) => {
    res.render('../views/user/register')
  },
  getLogin: (req, res) => {
    res.render('../views/user/login')
  },
  newUser: (req, res) => {
    
  }
};

module.exports = controller;