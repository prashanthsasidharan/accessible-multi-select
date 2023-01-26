import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Order } from "./pages/Order"
import { Navbar } from "./components/Navbar"
import Payment from "./pages/Payment"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import Notify from "./context/Notify"
import { StoreItemsContext } from "./context/StoreItemsContext"


function App() {
  return (
    <Notify>
      <StoreItemsContext>
        <ShoppingCartProvider>
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="/orders" element={<Order />} />
              </Route>
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </StoreItemsContext>
    </Notify>
    )
}

export default App
