import { Backdrop, CircularProgress } from "@material-ui/core";

function Loader(props) {
  return (
    <Backdrop open={props.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export default Loader;
