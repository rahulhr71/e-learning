const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin"); // path sahi hona chahiye


mongoose.connect("")
.then(async () => {
  console.log("✅ MongoDB Connected...");

  // 2. Password hash karo
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // 3. Agar same email ka admin hai to delete karo (optional)
  await Admin.deleteOne({ email: "admin@gmail.com" });

  // 4. Naya admin create
  const admin = new Admin({
    name: "rahul",
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  // 5. Save to DB
  const result = await admin.save();
  console.log("✅ Admin Saved:", result);

  mongoose.connection.close();
})
.catch((err) => {
  console.error("❌ Error:", err);
  mongoose.connection.close();
});
