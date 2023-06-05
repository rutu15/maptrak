import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const CustomerDashboardStyle = makeStyles({
  PageWrapper: {
   "& .inner-page":{
    "@media (max-width:767px)":{
      padding: '20px 15px 0',
    },
     "& .inner-white-box":{
       marginTop: '0 !important',
     },
     
   }
  },
});

export { CustomerDashboardStyle };