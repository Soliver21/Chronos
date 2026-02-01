
   - `baseUrl` = `http://localhost:3001/api`
   - `authToken` = (will be set automatically after login)

---

## 🔐 Authentication Tests

### 1. Register New User

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/register`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "name": "Test User",
  "password": "Password123!"
}
```

**Expected Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "trustLevel": "NEWCOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login User

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "Password123!"
}
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "trustLevel": "NEWCOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Login with Wrong Password

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "WrongPassword123!"
}
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "Invalid email or password",
  "statusCode": 401
}
```

---

### 4. Register with Duplicate Email

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/register`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "name": "Another User",
  "password": "Password123!"
}
```

**Expected Response (409 Conflict):**
```json
{
  "message": "Email already in use",
  "statusCode": 409
}
```

---

### 5. Register with Weak Password

**Method:** `POST`  
**URL:** `{{baseUrl}}/auth/register`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "weak"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "message": [
    "Password must be at least 8 characters long",
    "Password must contain at least one uppercase letter and one special character"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 👤 User Profile Tests

### 6. Get My Profile (Authenticated)

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "bio": null,
  "avatar": null
}
```

---

### 7. Get My Profile Without Token

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
(No Authorization header)
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

### 8. Get User Profile by ID (Public)

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/{{userId}}`  
**Headers:**
```
(No headers needed - public endpoint)
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "bio": null,
  "avatar": null
}
```

---

### 9. Get Non-Existent User

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/99999`  
**Headers:**
```
(No headers needed)
```

**Expected Response (404 Not Found):**
```json
{
  "message": "User not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### 10. Update My Profile (Full Update)

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Updated Name",
  "bio": "This is my bio. I love trading items!",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "test@example.com",
  "bio": "This is my bio. I love trading items!",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

### 11. Update My Profile (Partial Update - Name Only)

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Just Name Change"
}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "Just Name Change",
  "email": "test@example.com",
  "bio": "This is my bio. I love trading items!",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

### 12. Update Profile Without Auth

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Content-Type: application/json
(No Authorization header)
```

**Body (JSON):**
```json
{
  "name": "Hacker"
}
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

### 13. Update with Invalid Email

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "not-a-valid-email"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "message": [
    "Please provide a valid email address"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 14. Get User Statistics

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/{{userId}}/stats`  
**Headers:**
```
(No headers needed - public endpoint)
```

**Expected Response (200 OK):**
```json
{
  "totalTransactions": 0,
  "totalReviews": 0,
  "totalAmount": 0,
  "averageRating": null,
  "transactions": [],
  "reviews": []
}
```

---

## 🧪 Additional Test Cases

### 15. Register Multiple Users

**User 2:**
```json
{
  "email": "user2@example.com",
  "name": "User Two",
  "password": "SecurePass2!"
}
```

**User 3:**
```json
{
  "email": "user3@example.com",
  "name": "User Three",
  "password": "AnotherPass3#"
}
```

---

### 16. Update Avatar Only

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "avatar": "https://i.pravatar.cc/300"
}
```

---

### 17. Clear Bio

**Method:** `PATCH`  
**URL:** `{{baseUrl}}/users/me`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "bio": ""
}
```

---

### 18. Get User Stats After Seed Data

**Method:** `GET`  
**URL:** `{{baseUrl}}/users/1/stats`  

After running the seed, this should return actual data:

**Expected Response:**
```json
{
  "totalTransactions": 5,
  "totalReviews": 3,
  "totalAmount": 0,
  "averageRating": 4.67,
  "transactions": [...],
  "reviews": [...]
}
```
---

## ✅ Expected Test Results Summary

| Test | Status | Description |
|------|--------|-------------|
| Register | 201 | Creates new user |
| Login | **200** | Returns token (not 201!) |
| Get My Profile | 200 | Requires auth |
| Update Profile | 200 | Partial update works |
| Get User by ID | 200 | Public endpoint |
| Get Stats | 200 | Public endpoint |
| Wrong Password | 401 | Unauthorized |
| Duplicate Email | 409 | Conflict |
| Invalid Email | 400 | Validation error |
| No Auth Token | 401 | Protected route |

---