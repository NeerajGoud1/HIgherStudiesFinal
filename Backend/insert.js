import mongoose from "mongoose";
import { Higherstudies } from "./models/higherStudiesSchema.js"; // make sure the path is correct

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://neeraj:neeraj@higherstudiesfp.qfkw1bh.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Sample data
const branches = ["CSE", "ME", "EEE", "CE", "ECE"];
const courses = ["M.Tech", "MBA", "M.Sc", "PhD", "MS"];
const joiningInstitutes = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IISc Bangalore",
  "NIT Trichy",
  "MIT",
  "Standford University",
];
const passedOutYears = [2019, 2020, 2021, 2022, 2023, 2024];
const names = [
  "Neeraj",
  "Akash",
  "Sai",
  "Raj",
  "Anjali",
  "Sneha",
  "Ravi",
  "Kiran",
  "Meena",
  "Arjun",
]; // sample names

// Generate random data
const generateRandomHigherStudiesData = (index) => {
  const branch = branches[Math.floor(Math.random() * branches.length)];
  const course = courses[Math.floor(Math.random() * courses.length)];
  const joiningInstituteName =
    joiningInstitutes[Math.floor(Math.random() * joiningInstitutes.length)];
  const passedOutYear =
    passedOutYears[Math.floor(Math.random() * passedOutYears.length)];
  const yearOfAdmission = passedOutYear + Math.floor(Math.random() * 3); // Year of admission can be 1-3 years after passed out year
  const rollNo = `CS${String(index).padStart(3, "0")}`;
  const name = names[Math.floor(Math.random() * names.length)];
  const mobileNo = `+91${Math.floor(Math.random() * 10000000000)}`;
  const email = `${name.toLowerCase()}@gmail.com`;

  return {
    name,
    rollNo,
    branch,
    mobileNo,
    email,
    passedOutYear,
    joiningInstituteName,
    yearOfAdmission,
    course,
  };
};

// Seed data into DB
const seedHigherStudies = async () => {
  try {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push(generateRandomHigherStudiesData(i));
    }

    await Higherstudies.insertMany(data);
    console.log("✅ Inserted 100 sample higher studies records successfully.");
  } catch (err) {
    console.error("❌ Error inserting sample data:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedHigherStudies();
