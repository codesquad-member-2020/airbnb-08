import React from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/slider";

const counts = Array.from({ length: 50 }).map(() => Math.floor(Math.random() * 500));

const Wrapper = styled.div``;

const AveragePriceMessage = styled.p`
  font-size: ${({ theme }) => theme.large};
`;

const PriceRangeWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
`;

const GraphWrapper = styled.div`
  display: flex;
  width: 400px;
  height: 200px;
  top: 20px;
  position: relative;
  align-items: flex-end;
`;

const Graph = styled.div`
  width: calc(400px / 50);
  height: calc(200px / 1000 * ${(props) => props.count});
  margin-right: 2px;
  background-color: ${({ theme }) => theme.subColor};
`;

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

const PriceRangeChart = () => {
  const classes = useStyles();

  const AirbnbSlider = withStyles({
    root: {
      color: "#A4A4A4",
      height: 3,
      padding: "13px 0",
      position: "absolute",
      top: "208px",
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: "#fff",
      border: "1px solid currentColor",
      marginTop: -12,
      marginLeft: -13,
      boxShadow: "#ebebeb 0 2px 2px",
      "&:focus, &:hover, &$active": {
        boxShadow: "#ccc 0 2px 3px 1px",
      },
      "& .bar": {
        height: 9,
        width: 1,
        backgroundColor: "currentColor",
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: "#d8d8d8",
      opacity: 1,
      height: 3,
    },
  })(Slider);

  const AirbnbThumbComponent = (props) => {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  };

  return (
    <Wrapper>
      <AveragePriceMessage>평균 1박 요금은 ₩175,000입니다.</AveragePriceMessage>
      <PriceRangeWrapper>
        <GraphWrapper>
          {counts.map((count, index) => (
            <Graph count={count} key={index}></Graph>
          ))}
        </GraphWrapper>
        <div className={classes.root}>
          <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
            defaultValue={[0, 100]}
          />
        </div>
      </PriceRangeWrapper>
    </Wrapper>
  );
};

export default PriceRangeChart;
