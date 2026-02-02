
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

### 8. Get User Profile by ID (Public)      NEM JOOOOOOOOOOOOOOOOOOOOOOO

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

### 9. Get Non-Existent User        NEM JOOOOOOOOOOOOOOOOOOOOOOOOOOO

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
### Categories
**Method:** `GET`   `/api/categories→ [{ id: 1, name: "Home & Maintenance", slug: "home-maintenance" }, ...]`
Create listing with category:
**Method:** `POST`   `/api/listingsBody: { title, description, categoryId: 1, type: "OFFER", pricePerHour: 10, ... }`
Filter listings by category:
**Method:** `GET`   `/api/listings?categoryId=1→ returns only listings in that category`
**Listing response includes category:**
```json
{  
  "id": 1,
  "title": "...",
  "category": { "id": 1, "name": "Home & Maintenance", "slug": "home-maintenance" },  ...
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

## 🏷️ Category Tests

### 19. Get Categories List (Public)

**Method:** `GET`  
**URL:** `{{baseUrl}}/categories`  
**Headers:**
```
(No headers required - public)
```

**Expected Response (200 OK):**
```json
[
  { "id": 1, "name": "Home & Maintenance", "slug": "home-maintenance" },
  { "id": 2, "name": "Gardening", "slug": "gardening" }
]
```

---

### 20. Get Category Included in Listing (Integration)

Create a listing using a valid `categoryId` and verify the returned listing includes `category` information.

**Method:** `POST`  
**URL:** `{{baseUrl}}/listings`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Lawn mowing",
  "description": "Mow my lawn",
  "categoryId": 1,
  "type": "OFFER",
  "pricePerHour": 15
}
```

**Expected Response (201 Created):**
```json
{
  "id": 42,
  "title": "Lawn mowing",
  "category": { "id": 1, "name": "Home & Maintenance", "slug": "home-maintenance" },
  "pricePerHour": 15,
  "type": "OFFER",
  ...
}
```

---

## 💱 Transaction Tests

> These use the `transactions` endpoints and assume one user acts as provider (created listing) and another as client.

### 21. Create Transaction (Client)

**Method:** `POST`  
**URL:** `{{baseUrl}}/transactions`  
**Headers:**
```
Authorization: Bearer {{authToken}}  (client)
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "listingId": "42",
  "agreedHours": 2
}
```

**Expected Response (201 Created):**
```json
{
  "id": 100,
  "listing": { "id": 42, "title": "Lawn mowing", ... },
  "client": { "id": 2, "name": "Client" },
  "provider": { "id": 1, "name": "Provider" },
  "agreedHours": 2,
  "totalPrice": 30,
  "status": "PENDING"
}
```

---

### 22. Get Transaction By ID (Authenticated)

**Method:** `GET`  
**URL:** `{{baseUrl}}/transactions/100`  
**Headers:**
```
Authorization: Bearer {{authToken}}  (either client or provider)
```

**Expected Response (200 OK):**
```json
{ "id": 100, "status": "PENDING", "totalPrice": 30, "listing": {...}, "client": {...}, "provider": {...} }
```

---

### 23. Complete Transaction (Client completes)

**Method:** `POST`  
**URL:** `{{baseUrl}}/transactions/100/complete`  
**Headers:**
```
Authorization: Bearer {{authToken}}  (client)
```

**Expected Response (200 OK):**
```json
{ "id": 100, "status": "COMPLETED", "completedAt": "2026-02-02T12:00:00.000Z", ... }
```

**Negative cases:**
- Completing as a non-client => 403 Forbidden
- Completing a non-pending tx => 400 Bad Request

---

### 24. Cancel Transaction

**Method:** `POST`  
**URL:** `{{baseUrl}}/transactions/101/cancel`  
**Headers:**
```
Authorization: Bearer {{authToken}}  (client or provider)
```

**Expected Response (200 OK):**
```json
{ "id": 101, "status": "CANCELLED", "cancelledAt": "2026-02-02T12:05:00.000Z", ... }
```

**Negative cases:**
- Unauthorized user cancels => 403 Forbidden
- Cancelling non-pending tx => 400 Bad Request

---

## 📤 Upload Tests

> Use `multipart/form-data` with field name `file`. Test both the general upload and avatar upload which updates the user.

### 25. Upload File (Authenticated)

**Method:** `POST`  
**URL:** `{{baseUrl}}/upload`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: multipart/form-data
```

**Form data:** `file` = (image file, e.g., `image.png`)

**Expected Response (200 OK):**
```json
{
  "url": "/uploads/167xxxxxxx-image.png",
  "absoluteUrl": "http://localhost:3001/uploads/167xxxxxxx-image.png"
}
```

**Negative cases:**
- Missing `file` => 400 Bad Request with { "message": "No file provided" }
- Non-image file (e.g., `text/plain`) => 400 Bad Request with { "message": "Only image files are allowed" }

---

### 26. Upload Avatar (Authenticated)

**Method:** `POST`  
**URL:** `{{baseUrl}}/upload/avatar`  
**Headers:**
```
Authorization: Bearer {{authToken}}
Content-Type: multipart/form-data
```

**Form data:** `file` = (image file)

**Expected Response (200 OK):**
```json
{
  "url": "/uploads/167xxxxxxx-avatar.png",
  "absoluteUrl": "http://localhost:3001/uploads/167xxxxxxx-avatar.png",
  "user": { "id": 2, "avatar": "/uploads/167xxxxxxx-avatar.png", ... }
}
```

---

## 🧾 Tips for running upload tests (curl / Postman)

- curl example (upload):
```
curl -X POST "{{baseUrl}}/upload" -H "Authorization: Bearer $TOKEN" -F "file=@/path/to/image.png"
```
- Postman: set body to `form-data`, add key `file` (type File) and attach the file.

---

## ✅ Extended Test Results Summary (additions)

| Test | Status | Description |
|------|--------|-------------|
| Get Categories | 200 | Returns category list |
| Create Transaction | 201 | Creates pending transaction when client has sufficient balance |
| Complete Transaction | 200 | Marks tx completed, transfers funds to provider |
| Cancel Transaction | 200 | Cancels pending tx and refunds client |
| Upload File | 200 | Saves file and returns URL |
| Upload Avatar | 200 | Saves file, updates user's avatar |

---