import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { useNavigate } from "react-router-dom"

type StoreItemProps = {
  _id: number
  name: string
  amount: number
  imgUrl: string
}

export function StoreItem({ _id, name, amount, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(_id)

  const navigate = useNavigate();
  const goToPayment = () =>
    navigate({
      pathname: '/payment',
      search: `?paymentId=${_id}`,
    });

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(amount)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <div className="d-flex align-items-center gap-3">
              <Button className="w-50" variant="secondary" onClick={() => increaseCartQuantity(_id)}>
                + Add To Cart
              </Button>
              <Button className="w-50" onClick={goToPayment}>
                Buy Now
              </Button>
            </div>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(_id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(_id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(_id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
