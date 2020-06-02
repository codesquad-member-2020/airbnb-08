import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changePriceRange } from "@/actions/priceRangeAction";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/slider";

const Wrapper = styled.div``;

const AveragePriceMessage = styled.p`
  font-size: ${({ theme }) => theme.large};
`;

const PriceRangeWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
`;

const GraphWrapper = styled.div`
  display: flex;
  width: 400px;
  height: 150px;
  top: 20px;
  position: relative;
  align-items: flex-end;
`;

const GraphRangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
`;

const GraphLeft = styled.div`
  height: inherit;
  background: rgba(255, 255, 255, 0.8);
`;

const GraphRight = styled.div`
  height: inherit;
  background: rgba(255, 255, 255, 0.8);
`;

const Graph = styled.div`
  width: calc(400px / 50);
  height: calc(150px / 200 * ${(props) => props.count});
  margin-right: 2px;
  background-color: ${({ theme }) => theme.subColor};
`;

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

const AirbnbSlider = withStyles({
  root: {
    color: "#a4a4a4",
    height: 3,
    padding: "13px 0",
    position: "absolute",
    top: "157px",
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

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const PriceRangeChart = ({ priceData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    priceRangeReducer: { priceRange },
  } = useSelector((state) => state);

  const handleChange = (event, newValue) => {
    dispatch(changePriceRange(newValue));
  };

  const setWidth = (width, type, value) => {
    if (type === "L") return (width / 1000000) * value[0];
    else if (type === "R") return (width / 1000000) * (1000000 - value[1]);
  };

  const { counts, lowestPrice, highestPrice, averagePrice, pirces } = priceData;
  useEffect(() => {
    dispatch(changePriceRange([lowestPrice, highestPrice]));
  }, []);

  return (
    <Wrapper>
      <AveragePriceMessage>평균 1박 요금은 ₩{averagePrice}입니다.</AveragePriceMessage>
      <PriceRangeWrapper>
        <GraphWrapper>
          <GraphRangeWrapper>
            <GraphLeft style={{ width: `${setWidth(400, "L", priceRange)}px` }} />
            <GraphRight style={{ width: `${setWidth(400, "R", priceRange)}px` }} />
          </GraphRangeWrapper>
          {counts.map((count, index) => (
            <Graph count={count >= 200 ? 200 : count} key={index}></Graph>
          ))}
        </GraphWrapper>
        <div className={classes.root}>
          <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            value={priceRange}
            onChange={handleChange}
            getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
            defaultValue={[0, 1000000]}
            max={1000000}
            min={0}
            step={500}
          />
        </div>
      </PriceRangeWrapper>
    </Wrapper>
  );
};

export default PriceRangeChart;
