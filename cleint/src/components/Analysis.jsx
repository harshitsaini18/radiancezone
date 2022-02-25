import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav'
import PDF from './PDF'
import GPD from './GPD'
import ReactToPdf from 'react-to-pdf'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import { PDFExport } from '@progress/kendo-react-pdf'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

// import NewNav from "./NewNav";

const Analysis = () => {
  const [Data, setData] = useState({})
  const [selectedSubject, setSubject] = useState('physics')
  const [zoom, setZoom] = useState('xy')
  const [loading, setLoading] = useState(true)
  const pdfExportComponent = React.useRef(null)
  const history = useNavigate()

  async function getdata(params) {
    try {
      let res = await axios.get(`/analysis`, {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      console.log(res.data.user)
      setData(res.data.data)
      setLoading(true)
    } catch (error) {
      console.log(error)
      history('/login', { replace: true })
    }
  }

  useEffect(() => {
    getdata()
  }, [])
  // console.log(typeof Data)

  function selectSubject(e) {
    setSubject(e.target.value)
  }
  function handleChange(e) {
    setZoom(e.target.value)
  }

  let subjectName = Data.subjectArr
  // console.log(subjectName)
  let chartColors = {
    darkBlue: '#2196f3',
    darkGreen: '#4CAF50',
    red: 'rgba(255, 99, 132, 0.5)',
    darkRed: 'rgba(255, 99, 132)',
    orange: 'rgba(255, 159, 64, 0.5)',
    darkOrange: 'rgba(255, 159, 64)',
    yellow: 'rgba(255, 205, 86, 0.5)',
    green: 'rgba(75, 192, 192, 0.5)',
    blue: 'rgba(54, 162, 235, 0.5)',
    purple: 'rgba(153, 102, 255, 0.5)',
    grey: 'rgba(231, 233, 237, 0.5)',
  }
  let finalData = {
    physics: {
      marks: [],
      complete: [],
      accuracy: [],
      date: [],
    },
    chemistry: {
      marks: [],
      complete: [],
      accuracy: [],
      date: [],
    },
    maths: {
      marks: [],
      complete: [],
      accuracy: [],
      date: [],
    },
  }
  // let newMaks = [];
  for (const i in subjectName) {
    const subject = subjectName[i]
    finalData[subject].marks.push(Data.scoreArr[i])
    finalData[subject].complete.push(Data.completeArr[i])
    finalData[subject].date.push(Data.dateArr[i])
    finalData[subject].accuracy
      .push(
        Math.round(((Data.scoreArr[i] * 100) / Data.completeArr[i]) * 100) /
          100,
      )
      .toFixed(2)
    // console.log(finalData);
  }
  let total = finalData.physics.marks.map(
    (a, i) => a + finalData.chemistry.marks[i] + finalData.maths.marks[i],
  )

  const options = {
    chart: {
      backgroundColor: '#ebebeb',
      zoomType: zoom,
      type: 'column',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Dpp Progress',
      align: 'left',
    },
    plotOptions: {
      // series: {
      //   grouping: false,
      //   borderWidth: 0
      // },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px">{point.point.name}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} %</b><br/>',
    },
    xAxis: {
      categories: finalData[selectedSubject].date,
    },
    yAxis: {
      title: {
        text: selectedSubject + '-' + 'Marks in Percentage',
      },
      max: 100,
    },
    series: [
      {
        color: chartColors.blue,
        name: 'Dpp Completed',
        data: finalData[selectedSubject].complete,
      },
      {
        color: chartColors.darkRed,
        name: 'Dpp Accuracy',
        data: finalData[selectedSubject].accuracy,
      },
      {
        type: 'line',
        color: chartColors.darkGreen,
        name: 'Dpp Marks%',
        data: finalData[selectedSubject].marks,
      },
    ],
  }
  // ~~~~~~~~~~~~~~Pie Chart~~~~~~~~~~~~~~~~//

  // let pcolor;
  // let ccolor;
  // let mcolor;

  // var x = finalData.physics.marks.length;
  // var y = finalData.chemistry.marks.length;
  // var z = finalData.maths.marks.length;
  // if (x > y && x > z) {
  //   if (y > z) {
  //     pcolor = "#38FF74";
  //     ccolor = "#309EFF";
  //     mcolor = chartColors.darkRed;
  //   } else {
  //     pcolor = "#38FF74";
  //     ccolor = chartColors.darkRed;
  //     mcolor = "#309EFF";
  //   }
  // } else if (y > x && y > z) {
  //   if (x > z) {
  //     pcolor = "#309EFF";
  //     ccolor = "#38FF74";
  //     mcolor = chartColors.darkRed;
  //   } else {
  //     pcolor = chartColors.darkRed;
  //     ccolor = "#38FF74";
  //     mcolor = "#309EFF";
  //   }
  // } else if (z > x && z > y) {
  //   if (x > y) {
  //     pcolor = "#309EFF";
  //     ccolor = chartColors.darkRed;
  //     mcolor = "#38FF74";
  //   } else {
  //     pcolor = chartColors.darkRed;
  //     ccolor = "#309EFF";
  //     mcolor = "#38FF74";
  //   }
  // }

  let pieOptions = {
    chart: {
      type: 'pie',
      backgroundColor: '#ebebeb',
    },

    title: {
      text: 'Prctice Done',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      },
    },

    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: [
          {
            name: 'Physics',
            y: finalData.physics.marks.length,
            color: chartColors.darkOrange,
          },
          {
            name: 'Chemistry',
            y: finalData.chemistry.marks.length,
            color: chartColors.darkGreen,
          },
          {
            name: 'Maths',
            y: finalData.maths.marks.length,
            color: chartColors.darkBlue,
          },
        ],
      },
    ],
  }

  //~~~~~~~~~~~~ Test Data Arrangement ~~~~~~~~~~~~~~~~//

  let testData = {
    physics: {
      marks: [],
      complete: [],
      accuracy: [],
    },
    chemistry: {
      marks: [],
      complete: [],
      accuracy: [],
    },
    maths: {
      marks: [],
      complete: [],
      accuracy: [],
    },
    date: [],
    totalMarks: [],
    totalComplete: [],
  }

  let tempData = Data.TestData
  for (let i in tempData) {
    testData.physics.marks.push(tempData[i].physics.score)
    testData.physics.complete.push(tempData[i].physics.complete)
    testData.physics.accuracy.push(
      (tempData[i].physics.score * 100) / tempData[i].physics.complete,
    )

    testData.chemistry.marks.push(tempData[i].chemistry.score)
    testData.chemistry.complete.push(tempData[i].chemistry.complete)
    testData.chemistry.accuracy.push(
      (tempData[i].chemistry.score * 100) / tempData[i].chemistry.complete,
    )

    testData.maths.marks.push(tempData[i].maths.score)
    testData.maths.complete.push(tempData[i].maths.complete)
    testData.maths.accuracy.push(
      (tempData[i].maths.score * 100) / tempData[i].maths.complete,
    )

    testData.date.push(tempData[i].mydate)
    testData.totalMarks.push(
      (tempData[i].physics.score +
        tempData[i].physics.score +
        tempData[i].physics.score) /
        3,
    )
    testData.totalComplete.push(
      (tempData[i].physics.complete +
        tempData[i].physics.complete +
        tempData[i].physics.complete) /
        3,
    )
  }
  // console.log()
  // ~~~~~~~~~~~~~~~~~~ test graph ~~~~~~~~~~~~~~~~//

  let option1 = {
    chart: {
      type: 'line',
      backgroundColor: '#ebebeb',
      zoomType: zoom,
      width: window.screen.width - (window.screen.width >= 900 ? 200 : 0),
      // padding:10
    },
    title: {
      text: 'Test Progress',
      align: 'left',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        grouping: true,
        borderWidth: 0,
      },
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px">{point.point.name}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} %</b><br/>',
    },
    xAxis: {
      categories: testData.date,
    },
    yAxis: {
      title: {
        text: 'Marks in Percentage',
      },
    },
    series: [
      {
        type: 'line',
        color: chartColors.darkRed,
        name: 'Physics  Marks%',
        data: testData.physics.marks,
      },
      {
        type: 'column',
        color: chartColors.darkRed,
        name: 'Physics  Completed',
        data: testData.physics.complete,
      },
      {
        type: 'line',
        color: chartColors.darkGreen,
        name: 'Chemistry  Marks%',
        data: testData.chemistry.marks,
      },
      {
        type: 'column',
        color: chartColors.darkGreen,
        name: 'Chemistry  Completed',
        data: testData.chemistry.complete,
      },
      {
        type: 'line',
        color: chartColors.darkOrange,
        name: 'Maths Marks%',
        data: testData.maths.marks,
      },
      {
        type: 'column',
        color: chartColors.orange,
        name: 'Maths Completed',
        data: testData.maths.complete,
      },
      {
        type: 'line',
        color: '#21aaff',
        name: 'Tolal',
        data: testData.totalMarks,
      },
      {
        type: 'column',
        color: '#21aaff',
        name: 'Total',
        data: testData.totalComplete,
      },
    ],
  }

  console.log(option1)
  const ref = React.createRef();



  return loading ? (
    <>
      <Nav />
      <div style={{ backgroundColor: '#ebebeb', height: '316vh' }}>
        <div className="movbox">
          <main>
            <input
              className="track-item"
              id="a"
              onInput={selectSubject}
              value="physics"
              type="radio"
              name="dummy"
              // defaultValue="a"
              defaultChecked
            />
            <label className="track-label" htmlFor="a">
              Physics
            </label>
            <input
              className="track-item"
              id="b"
              onInput={selectSubject}
              value="chemistry"
              type="radio"
              name="dummy"
              // defaultValue="b"
            />
            <label className="track-label" htmlFor="b">
              Chemistry{' '}
            </label>
            <input
              className="track-item"
              id="c"
              onInput={selectSubject}
              value="maths"
              type="radio"
              name="dummy"
              // defaultValue="c"
            />
            <label className="track-label" htmlFor="c">
              Maths
            </label>
            <div className="track">
              <div className="track__inner">
                <div className="track__ball-hole">
                  <div className="track__ball" />
                </div>
                <span className="track__separator" />
                <div className="track__ball-hole">
                  <div className="track__ball" />
                </div>
                <span className="track__separator" />
                <div className="track__ball-hole">
                  <div className="track__ball" />
                </div>
                <div className="track__ball" />
              </div>
            </div>
          </main>
        </div>

        <div className="dppData">
          <div id="container2">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
        <div className="btncontainer">
          <span>zoom</span>
          <div className="radio_container">
            <input
              type="radio"
              name="radio"
              onChange={handleChange}
              value="xy"
              id="xy"
              // defaultValue="xy"
              defaultChecked
            />
            <label htmlFor="xy">XY</label>
            <input
              type="radio"
              name="radio"
              onChange={handleChange}
              value="y"
              id="y"
              // defaultValue="y"
            />
            <label htmlFor="y">Y</label>
            <input
              type="radio"
              name="radio"
              onChange={handleChange}
              value="x"
              id="x"
              // defaultValue="x"
            />
            <label htmlFor="x">X</label>
          </div>
        </div>
        <div className="chartcanvas1 ">
          <HighchartsReact highcharts={Highcharts} options={option1} />
          <div id="testchart"></div>
        </div>
        <div className="chartcanvas3 ">
          <div id="container" style={{ width: '100%', height: 400 }}>
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
          </div>
        </div>
        <div className="tablediv">
          {/* <div style={{ display: 'none' }}>
            <PDF data={testData} />
          </div> */}
          {/* <GPD downloadFileName={"testData "+Date.now().toLocaleString() } 
          rootElementId="pdf" /> */}
          {/* /////////////// */}


          <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                   <div id="ms-container">
                     <label htmlFor="ms-download">
                       <div className="ms-content">
                         <div className="ms-content-inside">
                           <input type="checkbox" id="ms-download" />
                           <div className="ms-line-down-container">
                             <div className="ms-line-down"  />
                           </div>
                           <div className="ms-line-point" onClick={()=>window.open("/data")}></div>

                         </div>
                       </div>
                     </label>
                   </div>
                 </div>
               </div>

          {/* <div
          style={{ display: 'none' }}
            ref={ref}
          >
            <PDF data={testData} />
          </div> */}
          

{/* 
          <div>
    <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({toPdf}) => (
            <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                   <div id="ms-container">
                     <label htmlFor="ms-download">
                       <div className="ms-content">
                         <div className="ms-content-inside">
                           <input type="checkbox" id="ms-download" />
                           <div className="ms-line-down-container">
                             <div className="ms-line-down"  />
                           </div>
                           <div className="ms-line-point" onClick={toPdf}/>
                         </div>
                       </div>
                     </label>
                   </div>
                 </div>
               </div>
        )}
    </ReactToPdf>
    <div ref={ref}>
    <PDF data={testData} />
    </div>
</div> */}

          <br />
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  )
}
export default Analysis
