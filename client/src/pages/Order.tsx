import { useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useStoreItems } from "../context/StoreItemsContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { BASE_URL, STATUS_BG } from "../constants"
import Badge from 'react-bootstrap/Badge';

export function Order() {
  const { cartItems } = useShoppingCart()
  const { getStoreItem } = useStoreItems();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/order`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [])

  return (
    orders
      .map((order) => (
        <Stack gap={2} className="rounded bg-white mb-3 border">
          <header className="bg-primary rounded-top w-100 text-white d-flex justify-content-between p-2">
            <div className="d-flex flex-column text-center">
              <span>Total Amount</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
            <div className="d-flex flex-column text-center">
              <span>Date</span>
              <span>{order.date}</span>
            </div>
            <div className="d-flex flex-column text-center">
              <span>Status</span>
              <Badge bg={STATUS_BG[order.status]}>{order.formatted_status}</Badge>
            </div>
          </header>
          {order.items.map((item) => (
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center rounded bg-white p-3">
              <img
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit: "contain" }}
                className="col-md-1"
              />
              <div className="col-md-5">
                <div>
                  {item.name}{" "}
                  <span className="text-muted" style={{ fontSize: ".65rem" }}>
                    x{item.quantity}
                  </span>
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                  {formatCurrency(item.amount)}
                </div>
              </div>
              <div className="col-md-5 text-end"> {formatCurrency(item.amount)}</div>
            </Stack>
          ))}
        </Stack>
      ))
  )
}
