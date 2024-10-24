// commonValidation.ts

// Kiểm tra email có hợp lệ hay không
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Kiểm tra số điện thoại có hợp lệ hay không
  export const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/; 
    return phoneRegex.test(phone);
  };
  
  export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
  };
  