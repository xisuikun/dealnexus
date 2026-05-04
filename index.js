import express from "express";
//   Đây là cách bạn nạp thư viện Express (framework backend cho Node.js).

// Express giúp bạn tạo server, định nghĩa các route (giống như Route::get() trong Laravel), và xử lý request/response.
import admin from "firebase-admin";

//   Đây là cách nạp Firebase Admin SDK.

// Admin SDK cho phép backend của bạn:

// Quản lý người dùng (tạo, xoá, xác thực token).

// Truy cập Firestore/Realtime Database với quyền admin.

// Làm việc với Cloud Storage.

// Gửi thông báo qua Firebase Cloud Messaging.


const app = express();

// Khởi tạo một ứng dụng Express.

// Từ đây bạn có thể viết các route như app.get("/api/...") hoặc app.post("/api/...").

// Nó giống như khi bạn khởi tạo một ứng dụng Laravel ($app = new Application()).


// Khởi tạo Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "dealnexus-e5272.appspot.com"
});
// Đây là bước khởi tạo Firebase Admin.

// Bạn truyền vào cấu hình:

// credential: admin.credential.applicationDefault() → dùng thông tin xác thực mặc định (service account hoặc cấu hình môi trường).

// storageBucket: "dealnexus-e5272.appspot.com" → chỉ định bucket để lưu trữ file.


const db = admin.firestore();
// Lấy đối tượng Firestore Database từ Firebase Admin.

// Từ đây bạn có thể thao tác với dữ liệu (giống như Eloquent trong Laravel).

app.listen(3001, () => {
  console.log("Backend chạy ở http://localhost:3001");
});



// --------------------
// Đăng ký bằng Email
// --------------------
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tạo user trong Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Lưu thêm thông tin vào Firestore (profile)
    await db.collection("users").doc(userRecord.uid).set({
      email,
      createdAt: new Date(),
    });

    res.json({ message: "User registered successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------
// Đăng nhập bằng Email
// --------------------
// Lưu ý: đăng nhập cơ bản sẽ thực hiện ở FE bằng firebase/auth.
// BE sẽ xác thực token để bảo mật API.
app.post("/api/login-check", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.json({ message: "Token valid", user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// --------------------
// Google / LinkedIn SSO
// --------------------
// Google: dùng firebase/auth ở FE với GoogleAuthProvider.
// LinkedIn: cần tích hợp OAuth2, sau đó gửi token về BE để verify.

// --------------------
// OTP Email & 2FA
// --------------------
// OTP email: bạn sẽ cần thêm dịch vụ gửi mail (SendGrid, Nodemailer).
// 2FA: có thể dùng thư viện như speakeasy để tạo mã TOTP.
