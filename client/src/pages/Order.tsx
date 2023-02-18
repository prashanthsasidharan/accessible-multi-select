import { useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { BASE_URL, STATUS_BG } from "../constants"
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

export function Order() {
  let [isFetchingOrders, setIsFetchingOrders] = useState<Boolean>(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setIsFetchingOrders(true);
    fetch(`${BASE_URL}order`)
      .then((res) => res.json())
      .then((data) => {
        setIsFetchingOrders(false);
        setOrders(data)
      });
  }, [])

  return (
    isFetchingOrders ? (
      <Spinner animation="border" role="status" style={{marginLeft: '50%'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) : (
    orders
      .map((order) => (
        <Stack gap={2} className="rounded bg-white mb-3 border">
          <header className="bg-primary rounded-top w-100 text-white d-flex justify-content-between p-4 px-5">
            <div className="d-flex flex-column text-center">
              <span>Status</span>
              <Badge bg={STATUS_BG[order.status]}>{order.formatted_status}</Badge>
            </div>
            <div className="d-flex flex-column text-center">
              <span>Date</span>
              <span>{order.date}</span>
            </div>
            <div className="d-flex flex-column text-center">
              <span>Total Amount</span>
              <span>{formatCurrency(order.total)}</span>
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
              <div className="col-md-5 text-end"> {formatCurrency(item.amount * item.quantity)}</div>
            </Stack>
          ))}
        </Stack>
      ))
  ))
}
