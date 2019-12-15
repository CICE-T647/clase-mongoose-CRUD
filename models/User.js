const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "Email es obligatorio"],
    unique: true
  },
  password: {
    type: Object,
    required: [true, "Password es obligatorio"]
  },
  state: {
    type: Boolean,
    required: [true, "state es obligatorio"],
    default: true
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: {
      values: ["USER_ROLE", "ADMIN_ROLE"],
      message: "{VALUE} no es un valor valido en {PATH}"
    }
  }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("User", userSchema);
//
