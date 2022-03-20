import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css"; //

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Modal from "./components/Modal";
import routes from "./routes";
import Route from "./routes/Route";

const App = () => {
  return (
    <>
      <div className="app-alert">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnFocusLoss={false}
          // pauseOnHover
        />
      </div>
      <div className="App">
        <Router>
          <Switch>
            {routes.map(({ path, type, component, exact }, id) => (
              <Route
                path={path}
                type={type}
                component={component}
                exact={exact}
                key={id}
              />
            ))}
          </Switch>
        </Router>
      </div>

      {/* modals */}

      {/* showForm */}
      <Modal isOpen={false} modalClass="upload-modal">
        <>
          <div className="header">
            <h1>Upload videos</h1>
          </div>
        </>
      </Modal>
    </>
  );
};

export default App;
