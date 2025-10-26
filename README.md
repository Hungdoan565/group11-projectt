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
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   └── routers/
│       └── users.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── AddUser.jsx
│       ├── UserList.jsx
│       └── App.css
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

2. Cài đặt các thư viện cần thiết:

```
npm install express mongoose dotenv cors
```

3. Tạo file .env trong thư mục backend và cấu hình:

```
MONGODB_URI=<đường_dẫn_mongodb_atlas_của_bạn>
PORT=3000
```

4. Khởi động server backend:

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
npm install axios
```

3. Khởi động ứng dụng React:

```
npm start
```

Ứng dụng sẽ mở tại http://localhost:3001

## Chức năng chính

- Hiển thị danh sách người dùng từ database
- Thêm người dùng mới với validation form
- Chỉnh sửa thông tin người dùng
- Xóa người dùng với xác nhận
- Tự động cập nhật giao diện khi có thay đổi
- Kiểm tra tính hợp lệ của email và tên

## API Endpoints

- GET /api/users - Lấy danh sách tất cả người dùng
- POST /api/users - Tạo người dùng mới
- PUT /api/users/:id - Cập nhật thông tin người dùng
- DELETE /api/users/:id - Xóa người dùng

## Phân công công việc

### Đoàn Vĩnh Hưng - Backend Developer

- Thiết lập cấu trúc backend với Node.js và Express
- Xây dựng các API endpoints cho CRUD operations
- Tạo controller xử lý logic nghiệp vụ
- Cấu hình routing và middleware
- Kiểm thử API bằng Postman

### Trần Thanh Huy - Frontend Developer

- Thiết kế và phát triển giao diện người dùng với React
- Xây dựng các component UserList và AddUser
- Tích hợp API với frontend thông qua Axios
- Xử lý state management và lifecycle
- Thiết kế responsive và tạo form validation

### Nguyễn Trọng Nghĩa - Database Administrator

- Thiết lập MongoDB Atlas cluster
- Tạo database và collection users
- Thiết kế schema User với Mongoose
- Kết nối database với backend
- Quản lý và theo dõi dữ liệu trên MongoDB Atlas

## Lưu ý

- Đảm bảo đã cấu hình đúng MONGODB_URI trong file .env
- Backend phải chạy trước khi khởi động frontend
- Kiểm tra console nếu gặp lỗi kết nối
- Port mặc định backend là 3000, frontend là 3001

## Tác giả

Nhóm 11

- Đoàn Vĩnh Hưng - 223277
- Nguyễn Trọng Nghĩa - 220361
- Trần Thanh Huy - 226780
