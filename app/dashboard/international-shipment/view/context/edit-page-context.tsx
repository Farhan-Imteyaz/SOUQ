"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Order = {
  id: string;
  [key: string]: any;
};

type EditPageContextType = {
  order: Order | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  updateOrderItem: (itemId: string, updatedData: any) => void;
};

const EditPageContext = createContext<EditPageContextType | undefined>(
  undefined,
);

export const EditPageProvider = ({
  children,
  order: initialOrder,
}: {
  children: ReactNode;
  order: Order | null;
}) => {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [isEditing, setIsEditing] = useState(false);

  const updateOrderItem = (itemId: string, updatedData: any) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return null;

      return {
        ...prevOrder,
        items: prevOrder.items?.map((item: any) =>
          item.id === itemId ? { ...item, ...updatedData } : item,
        ),
      };
    });
  };

  return (
    <EditPageContext.Provider
      value={{ order, isEditing, setIsEditing, updateOrderItem }}
    >
      {children}
    </EditPageContext.Provider>
  );
};

export const useEditPage = () => {
  const context = useContext(EditPageContext);
  if (context === undefined) {
    throw new Error("useEditPage must be used within EditPageProvider");
  }
  return context;
};
