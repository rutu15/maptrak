import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Header from "@components/header";
import { routes } from "@utils/constant";
import API from "@services/axios";
import EditBlock from "./edit-block";
import Tabbing from "./tabbing";
import { JobDetailStyle } from "./style";

function DetailPage() {
  const classes = JobDetailStyle();
  const { id } = useParams();
  const history = useHistory();
  // const location = useLocation();
  // const [jobName, setJobName] = useState("");
  const [jobsData, setJobsData] = useState([]);
  // const [loadingJobs, setLoadingJobs] = useState(false);

  // useEffect(() => {
  //   if (location.state?.jobTypes?.name !== jobName)
  //     setJobName(location.state?.jobTypes?.name);
  //   // eslint-disable-next-line
  // }, [location.state?.jobTypes?.name]);

  // API calling to get list of job by ID
  let getJobs = () => {
    setJobsData(null);
    API.get(`jobs/${id}`)
      .then((response) => {
        setJobsData(response.data.data);
        // setLoadingJobs(false);
      })
      .catch((error) => {
        setJobsData(error);
        // setLoadingJobs(false);
        if (error?.response?.status === 404) {
          history.push(routes.pageNotFound);
        }
      });
  };
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <div className={classes.JobDetailWrapper}>
        <div className="wrapper job-detail-page">
          <div className="inner-page">
            <div className={classes.backLinkWrapper}>
              <Link to={routes.jobListing} className={classes.backToPage}>
                <ArrowBackIosIcon /> Back to jobs
              </Link>
            </div>
            <div className="detail-col-layout">
              <div className="left-block">
                <EditBlock
                  // setJobName={setJobName}
                  getJobs={getJobs}
                  jobsData={jobsData}
                  loadingJobs={jobsData === null && true}
                />
              </div>
              <div className="right-block">
                <Tabbing jobsData={jobsData} getJobs={getJobs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetailPage;
