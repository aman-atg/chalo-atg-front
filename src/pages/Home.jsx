/* eslint-disable jsx-a11y/no-autofocus */
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Map from "../components/Map";
import { useGeneralActions } from "../hooks/useActions";
import { selectRoutes } from "../redux/selectors";
import { loadGMaps } from "../shared/utils";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const routes = useSelector(selectRoutes, shallowEqual);
  const { getRoutes, deleteRoute } = useGeneralActions();

  const history = useHistory();
  const [shownRoutes, setShownRoutes] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    loadGMaps(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    getRoutes();
  }, []);

  console.log("routes", routes);
  const changeShownRoute = (id) => {
    setShownRoutes(routes.data.filter((route) => route._id === id));
  };
  const toggleDeleteDialog = () => {
    setDeleteDialog((prev) => !prev);
  };

  const handleRouteDelete = () => {
    console.log("delete route", shownRoutes[0]);
    deleteRoute(shownRoutes[0]._id);
    setShownRoutes([]);
    toggleDeleteDialog();
  };

  const handleRouteEdit = () => {
    console.log("edit", shownRoutes[0]);
    history.push({
      pathname: "/editRoute",
      state: {
        route: shownRoutes[0],
      },
    });
    console.log(shownRoutes);
  };

  return (
    <>
      <div className="Home">
        {loaded ? (
          <Map
            routes={shownRoutes}
            mapId="main-map"
            style={{ width: "100%", height: 500 }}
          />
        ) : (
          <div>Loading...</div>
        )}
        <div className="Home_footer">
          <List
            className="Home_footer_list"
            sx={{
              bgcolor: "background.paper",
              borderRadius: 5,
            }}
          >
            {!routes.data.isLoading &&
              routes.data.map((route) => (
                <ListItem key={route._id} disablePadding>
                  <ListItemButton onClick={() => changeShownRoute(route._id)}>
                    <ListItemText
                      primary={`Route Name : ${route.name}`}
                      title={`Route Name : ${route.name}`}
                      secondary={`Status : ${route.status}`}
                    />
                    <ListItemText
                      secondary={`Stops : ${route.stops && route.stops.length}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          <div className="Home_footer_options">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={shownRoutes.length > 1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setShownRoutes(routes.data);
                      } else {
                        setShownRoutes([]);
                      }
                    }}
                  />
                }
                label="Show All Routes"
              />
            </FormGroup>

            <div
              className={`Home_footer_options_route ${
                shownRoutes.length === 1 ? "" : "disabled"
              }`}
            >
              <h2>Options for currently selected route</h2>

              <div className="buttons">
                <Button variant="contained" onClick={toggleDeleteDialog}>
                  Delete
                </Button>
                <Button variant="outlined" onClick={handleRouteEdit}>
                  Edit Route
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteDialog && (
        <Dialog
          open={deleteDialog}
          onClose={toggleDeleteDialog}
          aria-labelledby="dlt-dialog"
        >
          <DialogTitle id="dlt-dialog">
            Delete Route - {shownRoutes[0].name}?
          </DialogTitle>

          <DialogActions>
            <Button onClick={toggleDeleteDialog}>Cancel</Button>
            <Button onClick={handleRouteDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Home;
