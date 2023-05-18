import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import NotHeaderLayout from "./components/layout/NotHeaderLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, index) => {
            let Page = route.element
            let Layout = route.layout ? route.layout : <MainLayout />

            return (
              route.auth ? (
                <Route
                  key={index}
                  element={<NotHeaderLayout />}
                > 
                  <Route path={route.path} element={<AuthPage authState={route.state} />} />
                </Route>
              ) : (
                <Route
                  key={index}
                  element={Layout}
                >
                  <Route path={route.path} element={Page} />
                </Route>
              )
            )
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
