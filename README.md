# Book Manager App

A full-stack CRUD application for managing a list of books.  
The frontend is built with **ReactJS**, **Ant Design**, and **TailwindCSS**, while the backend uses **Spring Boot (Java)** and a **MySQL**.

---

##  Features

- ✅ Add / Edit / Delete books
- ✅ Form validation and inline error display
- ✅ Toast notifications for success or error (React Toastify)
- ✅ Responsive UI with Ant Design components and TailwindCSS
- ✅ Backend API with Spring Boot and Spring Data JPA

---

Before running the app, make sure you have:

- [Node.js](https://nodejs.org/) ≥ 16.x
- [Java JDK](https://adoptium.net/) 17 or higher
- [MySQL](https://dev.mysql.com/)
- [Maven](https://maven.apache.org/) 


## 🧱 Database Schema

Create the `book` table manually, or use the script below.

### 📦 For MySQL

```sql
CREATE TABLE book (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  author VARCHAR(255) NOT NULL
);
