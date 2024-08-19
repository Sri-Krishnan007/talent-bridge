import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper
        style={{
          padding: "50px",
          outline: "none",
          minWidth: "50%",
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Sort
            </Grid>
            <Grid item container direction="row" xs={9}>
              <Grid
                item
                container
                xs={6}
                justifyContent="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="name"
                    checked={searchOptions.sort["jobApplicant.name"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="name"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="name">
                    <Typography>Name</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.name"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            desc: !searchOptions.sort["jobApplicant.name"].desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort["jobApplicant.name"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justifyContent="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="jobTitle"
                    checked={searchOptions.sort["job.title"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "job.title": {
                            ...searchOptions.sort["job.title"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="jobTitle"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="jobTitle">
                    <Typography>Job Title</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort["job.title"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "job.title": {
                            ...searchOptions.sort["job.title"],
                            desc: !searchOptions.sort["job.title"].desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort["job.title"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justifyContent="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="dateOfJoining"
                    checked={searchOptions.sort.dateOfJoining.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfJoining: {
                            ...searchOptions.sort.dateOfJoining,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="dateOfJoining"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="dateOfJoining">
                    <Typography>Date of Joining</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.dateOfJoining.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfJoining: {
                            ...searchOptions.sort.dateOfJoining,
                            desc: !searchOptions.sort.dateOfJoining.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.dateOfJoining.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justifyContent="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort["jobApplicant.rating"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort["jobApplicant.rating"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="rating">
                    <Typography>Rating</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.rating"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort["jobApplicant.rating"],
                            desc: !searchOptions.sort["jobApplicant.rating"]
                              .desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort["jobApplicant.rating"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, getData } = props;

  const setPopup = useContext(SetPopupContext);

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    rejected: "#D1345B",
    accepted: "#09BC8A",
    deleted: "#6A6A6A",
    finished: "#242424",
  };

  const statusSet = [
    "applied",
    "shortlisted",
    "rejected",
    "accepted",
    "deleted",
    "finished",
  ];

  const changeStatus = (status) => {
    axios
      .put(
        apiList.applications,
        { status: status, id: application._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid item xs={3}>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar
                src={`${server}${application.jobApplicant.profile}`}
                className={classes.avatar}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {application.jobApplicant.name}
              </Typography>
            </Grid>
            <Grid item>
              <Rating
                value={application.jobApplicant.rating || 0}
                readOnly
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">{application.job.title}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Date of Joining:{" "}
                {application.dateOfJoining
                  ? new Date(application.dateOfJoining).toLocaleDateString()
                  : "Pending"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                Salary: &#8377; {application.job.salary} per month
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            {statusSet.map((status) => (
              <Grid item>
                <Button
                  style={{
                    background: colorSet[status],
                    color: "#fff",
                  }}
                  onClick={() => changeStatus(status)}
                >
                  {status}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const MyApplications = () => {
  const classes = useStyles();
  const { jobId } = useParams();

  const setPopup = useContext(SetPopupContext);

  const [applications, setApplications] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      "job.title": {
        status: false,
        desc: false,
      },
      dateOfJoining: {
        status: false,
        desc: false,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getData = () => {
    let searchParams = [];

    if (searchOptions.query !== "") {
      searchParams.push(`q=${searchOptions.query}`);
    }

    Object.keys(searchOptions.sort).forEach((key) => {
      if (searchOptions.sort[key].status) {
        searchParams.push(
          `sortBy=${key}&order=${searchOptions.sort[key].desc ? "desc" : "asc"}`
        );
      }
    });

    const queryString = searchParams.length > 0 ? `?${searchParams.join("&")}` : "";

    axios
      .get(`${apiList.applications}${queryString}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container direction="column" alignItems="center" className={classes.body}>
      <Grid container item alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3">Applications</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleOpenFilter}>
            <FilterListIcon />
            Filters
          </Button>
          <FilterPopup
            open={openFilter}
            handleClose={handleCloseFilter}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
            getData={getData}
          />
        </Grid>
      </Grid>
      <Grid container item xs={10} spacing={3} direction="column">
        {applications.map((application, index) => (
          <Grid item key={index}>
            <ApplicationTile application={application} getData={getData} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MyApplications;
