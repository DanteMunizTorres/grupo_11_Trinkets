const controller = {
  register: (req, res) => {
    res.render('../views/user/register.ejs')
  },
  login: (req, res) => {
    res.render('../views/user/login.ejs')
  },
};

module.exports = controller;