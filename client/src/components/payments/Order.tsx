import React from 'react'
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Stack } from "react-bootstrap"
import { formatCurrency } from "../../utilities/formatCurrency";
import { CustomToggle} from './custom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useStoreItems } from '../../context/StoreItemsContext';
import { useSearchParams } from 'react-router-dom';

export default function OrderCollapse() {
  let { cartItems } = useShoppingCart();
  let { getStoreItem, storeItems } = useStoreItems();
  let [searchParams] = useSearchParams();

  let paymentId = searchParams.get('paymentId');
  let isFromCart = searchParams.get('isFromCart');
  let orders = [];
  if (isFromCart) {
    orders = cartItems;
  } else {
    orders.push({_id: paymentId, quantity: 1});
  }

  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        <div>
          Details
        </div>
        <CustomToggle eventKey="2">Continue</CustomToggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <div className='p-2'>
          {storeItems.length && (
            <Stack gap={2} className="bg-white mb-3">
            {orders.map((order) => {
               return {...order, ...getStoreItem(order._id)}
            }).map((item) => (
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
          )}
          <CustomToggle eventKey="3" hideToggle={false} canContinue={() => true}>Continue</CustomToggle>
        </div>
        
      </Accordion.Collapse>
    </Card>
  )
}
