import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useStoreItems } from "../context/StoreItemsContext"

export function Home() {
  const { storeItems } = useStoreItems();

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item._id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
