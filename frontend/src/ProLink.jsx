const inProduction = false;
let ProLink = "";

if (inProduction) {
  ProLink = "https://higherstudies-backend.onrender.com";
} else {
  ProLink = "http://localhost:5000";
}

export { ProLink };
