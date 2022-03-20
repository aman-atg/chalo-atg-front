/* eslint-disable jsx-a11y/no-autofocus */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Map from "../components/Map";
import { useGeneralActions } from "../hooks/useActions";
import CONST from "../shared/CONST";
import loadGMaps from "../shared/utils";

const intialValues = {
  routeName: "",
  stop0: {
    name: "",
    lat: "",
    lng: "",
  },
  stop1: {
    name: "",
    lat: "",
    lng: "",
  },
};

const AddRoute = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [stops, setStops] = useState(2);
  const [stopModal, setStopModal] = useState({
    isOpen: false,
    data: {},
  });
  const { handleSubmit, setValue, control, unregister } = useForm({
    mode: "onChange",
    defaultValues: intialValues,
  });
  const { createOrUpdateRoute } = useGeneralActions();

  const handleMapClick = (e) => {
    console.log("map clicked", e);
    setStopModal({
      isOpen: true,
      data: {
        lat: e.latLng.lat().toFixed(13),
        lng: e.latLng.lng().toFixed(13),
      },
    });
  };

  const incrementStops = () => setStops((prev) => prev + 1);

  const removeLastStop = () => {
    unregister(`stop${stops}`);
    setStops((prev) => prev - 1);
  };

  const handleStopModalCancel = () => {
    setStopModal({
      isOpen: false,
      data: {},
    });
  };

  const handleStopModalDone = () => {
    const { data } = stopModal;
    const { index, ...stopData } = data;

    console.log("stop data", stopModal, index);

    if (stopData.name && !isNaN(index)) {
      if (index >= stops) {
        incrementStops();
      }
      setValue(`stop${index}`, stopData);
      setStopModal({
        isOpen: false,
        data: {},
      });
    }
  };

  const onSubmit = async (data) => {
    console.log("submit", data);
    const isUpdate = history.location.pathname === "/editRoute";

    if (isUpdate) {
      data["_id"] = history.location.state.route._id;
    }

    createOrUpdateRoute({
      data,
      isUpdate,
    });
  };

  useEffect(() => {
    // check history state
    const { state } = history.location;
    if (!state || !state.route) {
      return;
    }
    const { route } = state;

    // direction , name , status , stops
    console.log("state", route);

    setValue("routeName", route.name);
    setValue("status", route.status);
    setValue("direction", route.direction);

    // stops
    const { stops } = route;
    if (stops && stops.length > 0) {
      stops.forEach((stop, index) => {
        setValue(`stop${index}`, {
          name: stop.name,
          lat: stop.latitude,
          lng: stop.longitude,
        });
      });
    }
    setStops(stops.length);
  }, []);

  useEffect(() => {
    loadGMaps(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="AddRoute">
        <div className="AddRoute_map-container">
          {loaded && (
            <Map
              mapId="add-route-map"
              style={{
                width: "100%",
                margin: "0 auto",
                height: "calc(100vh - 88px)",
              }}
              onMapClick={handleMapClick}
              mapClickIcon={CONST.BEACH_FLAG_URL}
            />
          )}
        </div>

        <div className="AddRoute_form">
          <h1 className="heading">Add Route</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              rules={{ required: "This field is required!" }}
              name="routeName"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={error && error.message}
                  fullWidth
                  autoFocus
                  label="Route Name"
                  placeholder="107"
                  inputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  variant="standard"
                  {...field}
                />
              )}
            />

            {/* box */}
            {Array.from(Array(stops)).map((_, i) => (
              <Paper key={i} variant="outlined" className="stop-group">
                <h2 className="stop-group_heading">Stop: {i + 1}</h2>
                <Controller
                  rules={{ required: "This field is required!" }}
                  control={control}
                  name={`stop${i}.name`}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <TextField
                        error={error && error.message}
                        fullWidth
                        label="Stop Name"
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        variant="standard"
                        {...field}
                      />
                    </>
                  )}
                />

                <div className="stop-group_coord">
                  <Controller
                    rules={{ required: "This field is required!" }}
                    control={control}
                    name={`stop${i}.lat`}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        error={error && error.message}
                        fullWidth
                        label="Latitude"
                        placeholder="28.6139"
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        variant="standard"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    rules={{ required: "This field is required!" }}
                    control={control}
                    name={`stop${i}.lng`}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        error={error && error.message}
                        fullWidth
                        label="Longitude"
                        placeholder="77.2090"
                        inputProps={{ style: { fontSize: 14 } }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Paper>
            ))}
            {/* va */}

            <div className="footer">
              <Button
                variant="contained"
                style={{ fontSize: "18px" }}
                type="submit"
                color="success"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                style={{ fontSize: "18px" }}
                color="info"
                onClick={incrementStops}
              >
                Add Stop
              </Button>

              <Button
                variant="outlined"
                color="error"
                style={{ fontSize: "18px" }}
                onClick={removeLastStop}
                disabled={stops < 3}
              >
                Remove Stop
              </Button>
            </div>
          </form>
        </div>

        {/* <div className="AddRoute_footer">
          <h1>comments</h1>
        </div> */}
      </div>

      <Dialog open={stopModal.isOpen} onClose={handleStopModalCancel}>
        <DialogTitle>Add a stop</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If this is the correct location then please enter the stop&apos;s
            name and index
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            label="Stop Name"
            fullWidth
            variant="standard"
            value={stopModal.data.name}
            onChange={(e) =>
              setStopModal({
                ...stopModal,
                data: {
                  ...stopModal.data,
                  name: e.target.value,
                },
              })
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel
              style={{
                marginLeft: "-15px",
              }}
              id="selectStop"
            >
              Stop Index
            </InputLabel>
            <Select
              labelId="selectStop"
              label="Stop Index"
              placeholder="Select Stop"
              value={
                stopModal.data.index === undefined ? "" : stopModal.data.index
              }
              onChange={(e) =>
                setStopModal({
                  ...stopModal,
                  data: {
                    ...stopModal.data,
                    index: e.target.value,
                  },
                })
              }
              variant="standard"
            >
              {Array.from(Array(stops + 1)).map((_, i) => (
                <MenuItem key={i} value={i}>
                  Stop {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStopModalCancel}>Cancel</Button>
          <Button onClick={handleStopModalDone}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRoute;
