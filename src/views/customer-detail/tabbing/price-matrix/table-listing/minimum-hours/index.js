import React from "react";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import DailyHoursRigid from "./minimum-hours-rigid";
import DailyHoursRigid1 from "./minimum-hours-rigid.Uld";
import DailyHoursSemi from "./minimum-hours-semi";
import DailyHoursSemi1 from "./minimum-hours-semi-ULD";
import { TableStyle } from "./style";

function WeeklyMinimumHours(props) {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <div className={classes.dailyHours}>
      <Loader
        loading={
          state.customer?.loadingMinimumHours ||
          state.customer?.updatingMinimumHours ||
          state.customer?.updatingMinimumHourConsignment ||
          state.customer?.loadingMinimuHourConsignment

        }
      />
      <DailyHoursRigid getDailyMinimumHours={props.getDailyMinimumHours} />
      <DailyHoursSemi getDailyMinimumHours={props.getDailyMinimumHours} />
      <DailyHoursRigid1 getDailyMinimumHoursConsignment={props.getDailyMinimumHoursConsignment} />
      <DailyHoursSemi1 getDailyMinimumHoursConsignment={props.getDailyMinimumHoursConsignment} />
    </div>
  );
}
export default WeeklyMinimumHours;
