const controller = {
  register: (req, res) => {
    res.render('../views/user/register')
  },
  login: (req, res) => {
    res.render('../views/user/login')
  },
};

module.exports = controller;