# Admin Setup Guide

## Super Admin Account Setup

Since you now have a clean admin login system, here's how to set up your super admin account:

### Option 1: Using Firebase Console (Recommended)

1. **Go to Firebase Console**

   - Navigate to your Firebase project
   - Go to Firestore Database

2. **Create Admin Users Collection**
   - Create a new collection called `admin-users`
   - Add a new document with the following fields:

```json
{
  "username": "superadmin",
  "email": "admin@crownclothing.com",
  "passwordHash": "YWRtaW4xMjM=",
  "role": "super-admin",
  "isActive": true,
  "createdAt": "2025-08-14T00:00:00Z",
  "lastLogin": null
}
```

**Note**: The `passwordHash` "YWRtaW4xMjM=" is the base64 encoded version of "admin123". You can change this password by encoding your preferred password using btoa() in browser console.

### Option 2: Using the CMS (One-time setup)

If you need to create the first admin account, you can temporarily add the initialization code back:

1. In the admin login component, click "Create Default Admin" (if available)
2. This will create:
   - Username: admin
   - Email: admin@crownclothing.com
   - Password: admin123
   - Role: super-admin

### Login Credentials

After setup, you can login with:

- **Email**: admin@crownclothing.com
- **Password**: admin123

### Access URLs

- **Basic Admin**: http://localhost:3003/admin
- **Full CMS Dashboard**: http://localhost:3003/admin-full

### Security Recommendations

1. **Change Default Password**: After first login, change the default password
2. **Use Strong Passwords**: Use complex passwords for production
3. **Regular Backups**: Export your data regularly using the Tools tab
4. **Monitor Access**: Check last login times in the admin user management

### Password Encoding

If you need to manually create password hashes:

```javascript
// In browser console:
btoa("your-password-here");
```

### Next Steps

1. Login with your super admin account
2. Go to the "Admin Users" tab
3. Create additional admin accounts as needed
4. Set appropriate roles (super-admin, admin, editor)
5. Test all CMS functionality

### Troubleshooting

- **Login fails**: Check that the email and password hash match exactly
- **No access to Admin Users tab**: Make sure your role is "super-admin"
- **Database errors**: Verify Firebase rules allow admin operations

---

Your admin system is now clean and production-ready! 🎉
