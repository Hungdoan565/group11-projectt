# Dự án Quản lý Người dùng

Đây là ứng dụng web quản lý người dùng được phát triển bởi nhóm 11, sử dụng các công nghệ hiện đại như Node.js, React và MongoDB. Ứng dụng cho phép thực hiện đầy đủ các chức năng CRUD (Create, Read, Update, Delete) để quản lý thông tin người dùng một cách dễ dàng và hiệu quả.

## Mô tả dự án

Hệ thống quản lý người dùng cung cấp giao diện trực quan để thêm, sửa, xóa và hiển thị danh sách người dùng. Dữ liệu được lưu trữ trên MongoDB Atlas và được xử lý thông qua RESTful API. Giao diện người dùng được xây dựng bằng React với thiết kế hiện đại, responsive và có validation form đầy đủ.

## Công nghệ sử dụng

### Backend

- Node.js phiên bản LTS
- Express.js để xây dựng RESTful API
- Mongoose để kết nối và thao tác với MongoDB
- dotenv để quản lý biến môi trường
- CORS để xử lý cross-origin requests
- JSON Web Token (JWT) cho authentication
- bcryptjs cho hash password
- express-validator cho validation
- multer cho upload files
- cloudinary cho cloud storage

### Frontend

- React để xây dựng giao diện người dùng
- Axios để gọi API
- CSS3 cho việc tạo giao diện

### Database

- MongoDB Atlas để lưu trữ dữ liệu trên cloud
- Schema User gồm các trường: name, email, timestamps

## Cấu trúc thư mục

```
group11-project/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── upload.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── auth.js
│   └── lib/
│       └── cloudinary.js
├── frontend/
│   ├── public/
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── AddUser.jsx
│       ├── UserList.jsx
│       ├── components/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── profile/
│       │   └── ui/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Profile.jsx
│       │   └── UsersPage.jsx
│       ├── services/
│       │   ├── authService.js
│       │   └── userService.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── config/
│       │   └── api.js
│       └── utils/
│           └── toast.js
└── README.md
```

## Hướng dẫn cài đặt và chạy

### Yêu cầu hệ thống

- Node.js phiên bản 14 trở lên
- npm hoặc yarn
- Git
- Tài khoản MongoDB Atlas

### Cài đặt Backend

1. Di chuyển vào thư mục backend:

```
cd backend
```

2. Khởi tạo package.json (nếu chưa có):

```
npm init -y
```

3. Cài đặt các thư viện cần thiết:

```
npm install express mongoose dotenv cors jsonwebtoken bcryptjs express-validator multer cloudinary
```

Thêm scripts vào package.json:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

4. Tạo file .env trong thư mục backend và cấu hình:

```
PORT=3000
MONGODB_URI=<đường_dẫn_mongodb_atlas_của_bạn>
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Cloudinary Configuration (for avatar upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Khởi động server backend:

```
npm start
```

Hoặc:

```
node server.js
```

Server sẽ chạy tại http://localhost:3000

### Cài đặt Frontend

1. Di chuyển vào thư mục frontend:

```
cd frontend
```

2. Cài đặt các thư viện cần thiết:

```
npm install
```

Hoặc cài đặt thủ công:

```
npm install react react-dom react-scripts axios @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals
```

3. Khởi động ứng dụng React:

```
npm start
```

Ứng dụng sẽ mở tại http://localhost:3001

## Chức năng chính

### Authentication

- Đăng ký tài khoản người dùng mới
- Đăng nhập/Đăng xuất
- Quên mật khẩu và reset password
- JWT token authentication

### Quản lý người dùng

- Hiển thị danh sách người dùng từ database
- Thêm người dùng mới với validation form
- Chỉnh sửa thông tin người dùng
- Xóa người dùng với xác nhận
- Phân quyền admin/user

### Profile Management

- Cập nhật thông tin cá nhân
- Upload và quản lý avatar
- Upload cover photo

### UI/UX

- Giao diện hiện đại, responsive
- Dark/Light theme support
- Toast notifications
- Loading states và skeleton screens
- Form validation với error handling

## Phân công công việc

### Nguyễn Trọng Nghĩa - Backend Developer

- Thiết lập cấu trúc backend với Node.js và Express
- Xây dựng các API endpoints cho CRUD operations
- Tạo controller xử lý logic nghiệp vụ
- Cấu hình routing và middleware
- Kiểm thử API bằng Postman

### Đoàn Vĩnh Hưng - Frontend Developer

- Thiết kế và phát triển giao diện người dùng với React
- Xây dựng các component UserList và AddUser
- Tích hợp API với frontend thông qua Axios
- Xử lý state management và lifecycle
- Thiết kế responsive và tạo form validation

### Trần Thanh Huy - Database Administrator

- Thiết lập MongoDB Atlas cluster
- Tạo database và collection users
- Thiết kế schema User với Mongoose
- Kết nối database với backend
- Quản lý và theo dõi dữ liệu trên MongoDB Atlas

## Lưu ý

### Yêu cầu trước khi chạy:

- Đảm bảo đã cài đặt Node.js phiên bản 14+
- Tạo tài khoản MongoDB Atlas và lấy connection string
- Tạo tài khoản Cloudinary để upload hình ảnh
- Cấu hình đúng tất cả biến môi trường trong file .env

### Thứ tự khởi động:

1. Khởi động backend trước (port 3000)
2. Sau đó khởi động frontend (port 3001)

Nhóm 11

- Đoàn Vĩnh Hưng - 223277
- Nguyễn Trọng Nghĩa - 220361
- Trần Thanh Huy - 226780
