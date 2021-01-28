import React, { useEffect, useState } from 'react'
import { VictoryBar, VictoryPie, VictoryGroup,  VictoryChart, VictoryLine, VictoryTheme, VictoryArea } from 'victory';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { getReasons } from '../api/reasons';



const Analitics = () => { 
  const [pieData, setPieData] = useState([]);
  const [selectWorker, setStlectWorker] = useState([]);
  const [dataSucsses, setDataSucsses] = useState([]);
  const [dataDanger, setDataDanger] = useState([]);
  const [workerName, setWorkerName] = useState('');
  const [workerSomeRating, setWorkerSomeRating] = useState(0)
  const [graphiqNegativeReason, setGraphiqNegativeReason] = useState([])
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/feetback').then(res => {  // получаем причины негатива
      let data = res.data.filter(el => el.rating === -1).map(el => el.title)
      const dataX = [...new Set(data)]
      const dataArr = dataX.map((el, index) => {
        let count = data.filter((elData) => elData === el)        
        return {x: index + 1, y: count.length, label: el}
      })
      setPieData(dataArr) 
      getReasons().then(res => setReasons(res.data))     
    })

    getGraphiqNegativeReason(13)


    axios.get('http://localhost:8080/workers').then(res => { // получаем список сотрудников
      setStlectWorker(res.data)
    })


    axios.get('http://localhost:8080/feetback_rating').then(res => {
      const arrDate = res.data.map(el => {
        let date = new Date(el.ts)
        return date.getDate()
      })
      const dataSucsses = [...new Set(arrDate)].map(el => {
        const y = res.data.filter(elData => {
          let date = new Date(elData.ts)
         return elData.rating === 1 && date.getDate() === el
        })
        return {x: el.toString(), y: y.length}
      })

      const dataDanger = [...new Set(arrDate)].map(el => {
        const y = res.data.filter(elData => {
          let date = new Date(elData.ts)
         return elData.rating === -1 && date.getDate() === el
        })
        return {x: el.toString(), y: y.length}
      })
      setDataDanger(dataDanger)
      setDataSucsses(dataSucsses)
    })

  }, [])

  function getGraphiqNegativeReason(id) {
    axios.get(`http://localhost:8080/feetback_by_rating/${id}`).then(res => {
      const reasons = res.data[0].title
      
      let allDate = res.data.map(el => {
        let date = new Date(el.ts)
        return date.getDate()
      })

      allDate= [...new Set(allDate)]

      const reasonsData = allDate.map(date => {
        const arrY = res.data.filter(el => {
          let elDate = new Date(el.ts)
          return date === elDate.getDate()
        })
        return {x: date, y: arrY.length}
      })
      setGraphiqNegativeReason(reasonsData)
      console.log('=====>' , res.data, reasons, reasonsData);
    })
  }

  const selectChageWorker = (e) => {
    if(e.target.value > 0) {
      axios.get(`http://localhost:8080/reasons_by_worker/${e.target.value}`).then(res => {
        let data = res.data.filter(el => el.rating === -1).map(el => el.title)
        const dataX = [...new Set(data)]
        const dataArr = dataX.map((el, index) => {
          let count = data.filter((elData) => elData === el)        
          return {x: index + 1, y: count.length, label: `${el} - ${count.length}`}
        })
        console.log(dataArr);
        console.log(res.data[0].name);
        setWorkerSomeRating(res.data.length)
        setWorkerName(res.data[0].name)
        setPieData(dataArr)
      })
    } else return
  }


  return (
    <>

    <NavBar />

    <div className='container'>
      <h2>Графики</h2>
      <div className='d-flex' >
        <div style={{width: "50%"}}>

      <VictoryChart>
        <VictoryGroup 
        offset={20}
          colorScale={["red", "green"]}
        >
          <VictoryBar
            data={dataDanger}
            labels={({ datum }) => datum.y}
          />
          <VictoryBar
            data={dataSucsses}
            labels={({ datum }) => datum.y}
          />

        </VictoryGroup>      
      </VictoryChart>
      </div>  
        
        <div style={{width: "50%"}}>
        <select 
          onChange={selectChageWorker} 
          className="form-select"
        >
          <option>Выберите сотрудника</option>
          {
            !!selectWorker.length && selectWorker.map(el => <option 
            key={el.id} 
            value={el.id}           
            >
              {el.name}
            </option>)
          }
        </select>

        {workerName && <h6>{`${workerName} имеет ${workerSomeRating} отзывов`}</h6>}

          
          {!pieData.length ? <h2>Загрузка...</h2> : <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}            
            data={pieData}
            padding={100}
            />
          }

        </div>
      </div >
      
      <div style={{width: "50%"}}>

        <h3>График по причинам негатива</h3>

        <select
          onChange={(e) => getGraphiqNegativeReason(e.target.value)}
          className="form-select"
        >
          <option>Выберите причину</option>
          {
            !!reasons.length && reasons.map(el => <option 
            key={el.id} 
            value={el.id}           
            >
              {el.title}
            </option>)
          }
        </select>

      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={graphiqNegativeReason}
        />
      </VictoryChart>
      </div>
      

    </div>
    </>
  )
}

export default Analitics
