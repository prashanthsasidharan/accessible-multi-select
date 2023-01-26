import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useStoreItems } from "../context/StoreItemsContext"
import { formatCurrency } from "../utilities/formatCurrency"

export function Order({ quantity= 1}) {
  const { cartItems } = useShoppingCart()
  const storeItems = useStoreItems();

  return (
    cartItems
      .map(({id}) => {
        return storeItems.find(i => i._id === id)   
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
              x{quantity}
            </span>
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>

        <div className="text-center col-md-3">
          460Rs
        </div>
        <div className="col-md-3"> {formatCurrency(item.price)}</div>
      </Stack>
      ))
  )
}
