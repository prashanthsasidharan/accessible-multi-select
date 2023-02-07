import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { useStoreItems } from "../context/StoreItemsContext"

type CartItemProps = {
  _id: number
  quantity: number
}

export function CartItem({ _id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { getStoreItem } = useStoreItems();
  const item = getStoreItem(_id);
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.amount)}
        </div>
      </div>
      <div style={{ fontSize: ".65rem" }}> {formatCurrency(item.amount * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id)}
      >
        &times;
      </Button>
    </Stack>
  )
}
