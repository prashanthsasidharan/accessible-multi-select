import { Button, Card, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import { useStoreItems } from "../context/StoreItemsContext"
import { Navigate, useNavigate } from "react-router-dom"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const { getStoreItem } = useStoreItems();
  const navigate = useNavigate();

  const goToPayment = () => {
    navigate({
      pathname: '/payment',
      search: '?isFromCart=true',
    });

    closeCart();
  }
  

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item._id} {...item} />
          ))}
    
          <div className="row justify-content-between align-items-center">
            <div className="col-8">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = getStoreItem(cartItem._id);
                  return total + (item?.amount || 0) * cartItem.quantity
                }, 0)
              )}
            </div>

            {!!cartItems.length && (
                <Button className="col-4" onClick={goToPayment}>
                  + Buy Now
                </Button>
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
