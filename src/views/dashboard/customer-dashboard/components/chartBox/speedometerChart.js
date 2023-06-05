import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

function SpeedoMeterChart(props) {
  return (
    <ReactSpeedometer
      maxSegmentLabels={0}
      fluidWidth={true}
      maxValue={125}
      minValue={0}
      value={!!props.needleValue || 0}
      needleColor="gray"
      needleHeightRatio={0.59}
      segments={6}
      segmentColors={[
        "#26da8b",
        "#4dcb35",
        "#c9dc38",
        "#fdc825",
        "#fd5c24",
        "#ee1614",
      ]}
      paddingVertical={10}
      ringWidth={23}
      textColor={"#ffffff"}
    />
  );
}

export default SpeedoMeterChart;
