import { useState, useEffect } from "react";
import { useItems } from "../context";

type countType = {
  quantity: number;
  assets: number;
};
export const useCount = () => {
  const [count, setCount] = useState<countType>({ quantity: 0, assets: 0.0 });
  const { items } = useItems();

  useEffect(() => {
    items && getCount();
  }, [items]);

  function getCount() {
    const reducedItems = items?.reduce(handleReduce, {
      quantity: 0,
      assets: 0.0,
    });
    reducedItems.assets = reducedItems.assets.toFixed(2);
    setCount(reducedItems);
    return new Promise((resolve, reject) => {
      resolve(count);
    });
  }

  function handleReduce(prev: any, current: any) {
    prev.quantity = current.itemCount + prev.quantity;
    prev.assets = current.itemCount * current.price + prev.assets;
    return prev;
  }
  return { count };
};
