## **Dynamic Catalog System**

This is a **mock-up** prototype for a dynamic catalog system. The project shows the essential features like product creation, updates, deletion, authentication, and searching for products using attributes. While it's functional, the API and frontend are simplified for quick deployment and demonstration.

---

## **Technologies Used**

### **Backend**

- **Node.js** with **Express.js** for the RESTful API.
- **JSON Web Tokens (JWT)** for authentication and refresh token management.
- **Mock Data** is used to simulate database interactions for products and users.

### **Frontend**

- **React** with **Tailwind CSS** for the UI.
- **React Router** for navigation between pages.
- **Axios** for handling API calls with an interceptor to manage authentication tokens.

### **Environment Variables**

Currently, secret keys for tokens and the base API URL are hardcoded **inside the app** for simplicity because this is a mock-up. In a real production app:

1. We would move these to an `.env` file to store:
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `BASE_API_URL`.
2. Ensure `.env` is never committed to version control.

---

## **Features**

### **1. Authentication**

- Register a user.
- Login to get an `accessToken` and `refreshToken`.
- Token refreshing and logout endpoints.
- Mock authentication for simplicity:
  - Passwords are stored as plain text in the app (not secure, for demo purposes).

### **2. Product Management**

- CRUD operations for products:
  - Create: Add a new product with dynamic custom attributes.
  - Read: Retrieve product details or search based on attributes.
  - Update: Modify existing product information.
  - Delete: Remove products by ID.
- Custom Attributes:
  - Allows products to store flexible metadata like size, color, and material.
  - Attributes can handle both simple and complex data types.

### **3. Search**

- Search across product name, category, or custom attributes.
- Case-insensitive and supports partial matches.

### **4. Frontend**

- Full UI to:
  - View the product catalog.
  - Add and edit products.
  - Perform advanced searches with filters.
- Authentication-aware navigation:
  - Displays Login/Register links when not logged in.
  - Shows Logout when logged in.

---

## **Project Structure**

### **Backend**

```
.
├── index.js               # Main server
```

### **Frontend**

```
.
├── src/
│   ├── components/
│   │   ├── ...
│   ├── pages/
│   │   ├── ...
│   ├── api/
│   │   ├── axiosInstance.js # Axios instance with interceptors
│   ├── App.js
│   ├── index.js
```

---

### **Step 1: Clone the Repository**

```bash
git clone git@github.com:ZeyadZaher03/popcorn-test.git
cd popcorn-test
```

### **Step 2: Install Dependencies**

#### **Backend**

1. Go to the backend directory.
   ```bash
   cd BE
   npm install
   ```

#### **Frontend**

1. Go to the frontend directory.
   ```bash
   cd FE
   npm install
   ```

### **Step 3: Run the Application**

#### **Backend**

1. Run the backend mock API:
   ```bash
   node index.js # will run on port 5000
   ```

#### **Frontend**

1. Start the React frontend:
   ```bash
   npm start # will run on port 3000
   ```

### **Step 4: Use the Application**

- Access the application at `http://localhost:3000`.
- Use **Postman** or the UI for API testing and interacting with the catalog.

---

## **Future Enhancements**

1. **Database Integration:**
   - Replace mock data with a real database like PostgreSQL.
   - Store products in tables with `userId` relationships to associate users with their products.
2. **Secure Password Storage:**
   - Use hashing (e.g., `bcrypt`) for passwords.
3. **Scalable Search:**
   - Improve search capabilities by implementing Elasticsearch or similar technologies.
4. **File Storage:**
   - Handle product images using services like AWS S3.

---

This project is a functional mock-up demonstrating a flexible e-commerce catalog system.
