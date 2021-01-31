import React, { useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryPie,
  VictoryGroup,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
} from "victory";
import axios from "axios";
import NavBar from "../components/NavBar";
import { getReasons } from "../api/reasons";
import "./LoaderAnimate.css";
import { URL_SERVER } from "../config";

const Analitics = () => {
  const [pieData, setPieData] = useState([
    { x: 1, y: 10, label: 10 },
    { x: 1, y: 10, label: 10 },
    { x: 1, y: 10, label: 10 },
    { x: 1, y: 10, label: 10 },
    { x: 1, y: 10, label: 10 },
    { x: 1, y: 10, label: 10 },
  ]);
  const [selectWorker, setStlectWorker] = useState([]);
  const [dataSucsses, setDataSucsses] = useState([]);
  const [dataDanger, setDataDanger] = useState([]);
  const [workerName, setWorkerName] = useState("");
  const [workerSomeRating, setWorkerSomeRating] = useState(0);
  const [graphiqNegativeReason, setGraphiqNegativeReason] = useState([]);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_SERVER}/feetback`, { withCredentials: true })
      .then((res) => {
        // получаем причины негатива
        let data = res.data
          .filter((el) => el.rating === -1)
          .map((el) => el.title);
        const dataX = [...new Set(data)];
        const dataArr = dataX.map((el, index) => {
          let count = data.filter((elData) => elData === el);
          const valueLabel = `${((count.length / data.length) * 100)
            .toFixed()
            .toString()}%`;

          return {
            x: index + 1,
            y: count.length,
            label: String(valueLabel),
            title: `${el} - ${Math.round(
              (count.length / data.length) * 100
            )}% (${count.length} из ${data.length})`,
          };
        });
        setPieData(dataArr);
        getReasons().then((res) => setReasons(res.data));
      });

    getGraphiqNegativeReason(13);

    axios
      .get(`${URL_SERVER}/workers`, { withCredentials: true })
      .then((res) => {
        // получаем список сотрудников
        setStlectWorker(res.data);
      });

    axios
      .get(`${URL_SERVER}/feetback_rating`, { withCredentials: true })
      .then((res) => {
        const arrDate = res.data.map((el) => {
          let date = new Date(el.ts).toISOString().split("T")[0];
          return date;
        });
        const dataSucsses = [...new Set(arrDate)].map((el) => {
          const y = res.data.filter((elData) => {
            let date = new Date(elData.ts).toISOString().split("T")[0];
            return elData.rating === 1 && date === el;
          });
          return { x: el.split("-")[2].toString(), y: y.length };
        });

        const dataDanger = [...new Set(arrDate)].map((el) => {
          const y = res.data.filter((elData) => {
            let date = new Date(elData.ts).toISOString().split("T")[0];
            return elData.rating === -1 && date === el;
          });
          return { x: el.split("-")[2].toString(), y: y.length };
        });
        setDataDanger(dataDanger);
        setDataSucsses(dataSucsses);
      });
  }, []);

  function getGraphiqNegativeReason(id) {
    axios
      .get(`${URL_SERVER}/feetback_by_rating/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        let allDate = res.data.map((el) => {
          let date = new Date(el.ts);
          return date.getDate();
        });

        allDate = [...new Set(allDate)];

        const reasonsData = allDate.map((date) => {
          const arrY = res.data.filter((el) => {
            let elDate = new Date(el.ts);
            return date === elDate.getDate();
          });
          return { x: date, y: arrY.length };
        });
        setGraphiqNegativeReason(reasonsData);
      });
  }

  const selectChageWorker = (e) => {
    if (e.target.value > 0) {
      axios
        .get(`${URL_SERVER}/reasons_by_worker/${e.target.value}`, {
          withCredentials: true,
        })
        .then((res) => {
          let data = res.data
            .filter((el) => el.rating === -1)
            .map((el) => el.title);
          const dataX = [...new Set(data)];
          const dataArr = dataX.map((el, index) => {
            let count = data.filter((elData) => elData === el);
            const valueLabel = `${((count.length / data.length) * 100)
              .toFixed()
              .toString()}%`;

            return {
              x: index + 1,
              y: count.length,
              label: String(valueLabel),
              title: `${el} - ${Math.round(
                (count.length / data.length) * 100
              )}% (${count.length} из ${data.length}) `,
            };
          });

          setWorkerSomeRating(res.data.length);
          setWorkerName(res.data[0].name);
          setPieData(dataArr);
        });
    } else return;
  };

  const colorScale = ["tomato", "orange", "gold", "cyan", "navy"];

  return (
    <>
      <NavBar />

      <div className="container">
        <h2>Графики</h2>
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <VictoryChart
              theme={VictoryTheme.grayscale}
              animate={{ duration: 500 }}
            >
              <VictoryGroup
                animate={{
                  duration: 100,
                  onLoad: { duration: 10 },
                }}
                offset={15}
                colorScale={["red", "green"]}
              >
                <VictoryBar
                  data={dataDanger}
                  // labels={({ datum }) => datum.y}
                  style={{ data: { color: "red" } }}
                  animate={{
                    duration: 1000,
                    onExit: {
                      duration: 1000,
                      before: () => ({
                        _y: 0,
                        fill: "orange",
                        label: "BYE",
                      }),
                    },
                  }}
                />
                <VictoryBar
                  data={dataSucsses}
                  style={{ X: { fill: "red" } }}
                  // labels={({ datum }) => datum.y}
                  animate={{
                    duration: 2000,
                  }}
                />
              </VictoryGroup>
            </VictoryChart>
          </div>

          <div style={{ width: "50%" }}>
            <select onChange={selectChageWorker} className="form-select">
              <option>Выберите сотрудника</option>
              {!!selectWorker.length &&
                selectWorker.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
            </select>

            {workerName && (
              <h6>{`${workerName} имеет ${workerSomeRating} отзывов`}</h6>
            )}

            {!pieData.length ? (
              <div
                class="lds-hourglass"
                style={{ display: "flex", justifyContent: "center" }}
              ></div>
            ) : (
              <div className="d-flex" style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "0" }}>
                  <VictoryLegend
                    x={15}
                    y={10}
                    orientation="vertical"
                    gutter={20}
                    style={{
                      border: { stroke: "black" },
                      data: { fontSize: "40px" },
                    }}
                    colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    data={pieData.map((el) => {
                      return { name: el.title };
                    })}
                  />
                </div>
                <div style={{ position: "absolute", right: "0" }}>
                  <VictoryPie
                    animate={{
                      easing: "exp",
                      onExit: {
                        duration: 500,
                        before: () => ({
                          _y: 0,
                          fill: "orange",
                          label: "BYE",
                        }),
                      },
                    }}
                    colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    data={pieData}
                    padding={65}
                    labelRadius="80"
                    labelPosition="centroid"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ width: "50%" }}>
          <h3>График по причинам негатива</h3>

          <select
            onChange={(e) => getGraphiqNegativeReason(e.target.value)}
            className="form-select"
          >
            <option>Выберите причину</option>
            {!!reasons.length &&
              reasons.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.title}
                </option>
              ))}
          </select>

          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              interpolation="bundle"
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              style={{
                width: "100%",
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={graphiqNegativeReason}
            />
          </VictoryChart>
        </div>
      </div>
    </>
  );
};

export default Analitics;
