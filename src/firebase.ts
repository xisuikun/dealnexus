
// Nhập các hàm cần thiết từ các SDK cần thiết
import { initializeApp } from "firebase/app" ;   

// Đây là hàm khởi tạo ứng dụng Firebase.

// Bạn truyền vào firebaseConfig (lấy từ .env) để kết nối dự án của bạn với Firebase trên cloud.

// Sau khi gọi initializeApp(firebaseConfig), bạn có một “ứng dụng Firebase” đã sẵn sàng.


// Việc cần làm: Thêm SDK cho các sản phẩm Firebase mà bạn muốn sử dụng
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Đây là module Authentication.

// Cho phép bạn đăng ký, đăng nhập, đăng xuất, quản lý người dùng.

// Ví dụ: getAuth(app) sẽ trả về đối tượng auth để bạn dùng các hàm như 
    // createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut.


   import { getFirestore } from "firebase/firestore";
//     Đây là module Cloud Firestore (cơ sở dữ liệu NoSQL của Firebase).

// Cho phép bạn lưu trữ và truy vấn dữ liệu dạng collection/document.

// Ví dụ: getFirestore(app) sẽ trả về đối tượng db để bạn dùng các hàm như addDoc, getDocs, updateDoc.

import { getStorage } from "firebase/storage";
// Đây là module Cloud Storage.

// Dùng để upload/download file (ảnh, video, tài liệu).

// Ví dụ: getStorage(app) sẽ trả về đối tượng storage để bạn dùng các hàm như uploadBytes, getDownloadURL.

// Lấy config từ .env
const firebaseConfig = {
  apiKey: "AIzaSyDL4UuyrQmDTqVl21ECczqiuYITMv-snTI", 
  authDomain: "dealnexus-e5272.firebaseapp.com",
  projectId: "dealnexus-e5272",
  storageBucket: "dealnexus-e5272.firebasestorage.app",
  messagingSenderId: "203486239529",
  appId: "1:203486239529:web:4c4380132a8e97f1aa7538"
};

// Khởi tạo Firebase
const app = initializeApp ( firebaseConfig );