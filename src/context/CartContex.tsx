// src/context/CartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "../types/cartItem";

// Định nghĩa các kiểu dữ liệu trong Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItemId: number) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  updateWarranty: (
    cartItemId: number,
    warranty: string,
    warrantyPrice: number
  ) => void;
  clearCart: () => void;
  selectAllItems: (selectAll: boolean) => void;
}

// Khởi tạo Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

// CartProvider
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (cartItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...cartItem, quantity: 1 }];
    });
  };

  const removeFromCart = (cartItemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? { ...item, buyQuantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updateWarranty = (
    cartItemId: number,
    warranty: string,
    warrantyPrice: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId ? { ...item, warranty, warrantyPrice } : item
      )
    );
  };

  // Hàm xóa tất cả sản phẩm khỏi giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Hàm chọn hoặc bỏ chọn tất cả sản phẩm trong giỏ hàng
  const selectAllItems = (selectAll: boolean) => {
    // Giả sử giỏ hàng có thuộc tính `selected` để đánh dấu sản phẩm đã được chọn
    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        selected: selectAll,
      }))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateWarranty,
        clearCart,
        selectAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
