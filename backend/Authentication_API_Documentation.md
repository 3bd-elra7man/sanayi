
# Authentication API Documentation

## Overview
This API allows users to manage authentication-related tasks such as signup, login, email verification, password management, and authentication checking.

### Base URL
```
https://sanayi-production.up.railway.app/
```

## Endpoints

### 1. Signup
- **URL:** `/signup`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "governorate": "Cairo",
  "region": "Maadi",
  "role": "user",
  "phoneNumber": "0123456789"
}
```
- **Responses:**
  - **201 Created**
    - **Description:** User successfully registered.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "User registered successfully."
    }
    ```

  - **400 Bad Request**
    - **Description:** Validation error or user already exists.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "User already exists."
    }
    ```

### 2. Login
- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Responses:**
  - **200 OK**
    - **Description:** User successfully logged in.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "Login successful."
    }
    ```

  - **401 Unauthorized**
    - **Description:** Incorrect email or password.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "Invalid email or password."
    }
    ```

### 3. Verify Email
- **URL:** `/verify-email`
- **Method:** `POST`
- **Request Body:**
```json
{
  "code": "123456"
}
```
- **Responses:**
  - **200 OK**
    - **Description:** Email verification successful.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "Email verified successfully."
    }
    ```

  - **400 Bad Request**
    - **Description:** Verification code is invalid.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "Invalid verification code."
    }
    ```

### 4. Forgot Password
- **URL:** `/forgot-password`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "user@example.com"
}
```
- **Responses:**
  - **200 OK**
    - **Description:** Password reset email sent.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "Password reset email sent."
    }
    ```

  - **404 Not Found**
    - **Description:** User not found.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "User not found."
    }
    ```

### 5. Reset Password
- **URL:** `/reset-password/:token`
- **Method:** `POST`
- **Request Body:**
```json
{
  "password": "newpassword123"
}
```
- **URL Parameters:**
  - `token`: The reset token received in the email.
  
- **Responses:**
  - **200 OK**
    - **Description:** Password reset successful.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "Password reset successfully."
    }
    ```

  - **400 Bad Request**
    - **Description:** Invalid token or weak password.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "Invalid token or weak password."
    }
    ```

### 6. Check Auth
- **URL:** `/check-auth`
- **Method:** `GET`
- **Description:** Check if the user is authenticated.
- **Response:**
  - **200 OK**
    - **Description:** User is authenticated.
    - **Body:**
    ```json
    {
      "success": true,
      "user": {
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "governorate": "Cairo",
        "region": "Maadi",
        "role": "user",
        "phoneNumber": "0123456789"
      }
    }
    ```

  - **400 Bad Request**
    - **Description:** User not found or not authenticated.
    - **Body:**
    ```json
    {
      "success": false,
      "message": "User not found."
    }
    ```

### 7. Logout
- **URL:** `/logout`
- **Method:** `POST`
- **Description:** Logs the user out by clearing the authentication cookie.
- **Response:**
  - **200 OK**
    - **Description:** User logged out successfully.
    - **Body:**
    ```json
    {
      "success": true,
      "message": "Logout successful."
    }
    ```

## Security Measures
- **CSRF Protection:** Ensure CSRF tokens are validated for state-changing requests.
- **Rate Limiting:** Implement rate limiting for sensitive endpoints like `/login`, `/signup`, and `/forgot-password` to prevent brute-force attacks.
- **JWT Expiry:** All JWTs should have a reasonable expiration time set and be stored in HttpOnly cookies.
  
## Conclusion
This API provides a robust mechanism for handling user authentication, ensuring security and efficiency. If you encounter any issues or need further clarification, feel free to reach out!
