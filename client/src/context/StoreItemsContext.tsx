import { ReactNode, useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';
import { useContext, createContext } from "react";
import { useNotifyContext } from './Notify';
import { BASE_URL } from "../constants";

type StoreItemType = {
  name: string,
  imgUrl: string,
  price: number,
  _id: number
}

type StoreItemValueType = StoreItemType[];

const ItemsContext = createContext<StoreItemValueType | null>(null);
export function useStoreItems() {
  return useContext(ItemsContext) as StoreItemValueType;
}

export function StoreItemsContext({children} : { children: ReactNode }) {
  let [isFetchingStoreItems, setIsFetchingStoreItems] = useState<Boolean>(false);
  let [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
  let notify = useNotifyContext();

  useEffect(() => {
    async function getStoreItems() {
      try {
        setIsFetchingStoreItems(true);
        let res = await fetch(`${BASE_URL}/item`);
        let data = await res.json();
        setStoreItems(data)
        setIsFetchingStoreItems(false);
      } catch(err: any) {
        notify({ type: 'danger', msg: err.msg })
      }
    }
    getStoreItems();
  }, [])
  return (
    isFetchingStoreItems ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) : (
      <ItemsContext.Provider value={storeItems}>
        {children}
      </ItemsContext.Provider>
    )
  )
}