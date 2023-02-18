import { ReactNode, useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';
import { useContext, createContext } from "react";
import { useNotifyContext } from './Notify';
import { BASE_URL } from "../constants";

type StoreItemType = {
  name: string,
  imgUrl: string,
  amount: number,
  _id: number
}

type StoreItemValueType = {
  storeItems: StoreItemType[],
  getStoreItem: (id: number | string | null) => StoreItemType | null;
};

const ItemsContext = createContext<StoreItemValueType | null>(null);
export function useStoreItems() {
  return useContext(ItemsContext) as StoreItemValueType;
}

export function StoreItemsContext({children} : { children: ReactNode }) {
  let [isFetchingStoreItems, setIsFetchingStoreItems] = useState<Boolean>(false);
  let [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
  let notify = useNotifyContext();

  function getStoreItem(id) {
   return storeItems.find(item => item._id === id) || null
  }

  useEffect(() => {
    async function getStoreItems() {
      try {
        setIsFetchingStoreItems(true);
        let res = await fetch(`${BASE_URL}item`);
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
      <Spinner animation="border" role="status" style={{marginLeft: '50%'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) : (
      <ItemsContext.Provider value={{storeItems, getStoreItem}}>
        {children}
      </ItemsContext.Provider>
    )
  )
}