'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 99],
            msg: 'Name must be 1 to 99 characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Invalid Email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 99],
            msg: 'Password must be between 8 and 99 character'
          }
        }
      }
    },
    {
      sequelize,
      modelName: "user",
    }
  );
    user.addHook('beforeCreate', function(pendingUser) {
    let hash = bcrypt.hashSync(pendingUser.password, 12)
    pendingUser.password = hash;
  })

  user.prototype.validPassword = function(passwordTyped) {
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    return correctPassword
  };

  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  };

  return user;
};
