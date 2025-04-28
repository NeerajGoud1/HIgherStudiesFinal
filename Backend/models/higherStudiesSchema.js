import mongoose, { Schema } from "mongoose";

const higherstudiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requied: true,
  },
  passedOutYear: {
    //previous institute
    type: Number,
    required: true,
  },
  joiningInstituteName: {
    type: String,
    required: true,
  },
  yearOfAdmission: {
    //new institute joining year
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const Higherstudies = mongoose.model("Higherstudies", higherstudiesSchema);

export { Higherstudies };
