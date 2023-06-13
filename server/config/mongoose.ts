import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

// access virtuals with lean()
mongoose.plugin(mongooseLeanVirtuals);

// return id insteald of _id
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    if (converted.password) delete converted.password;
  },
});
