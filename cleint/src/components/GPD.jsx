// import React from 'react'
// import html2canvas from 'html2canvas'
// import { jsPDF } from 'jspdf'

// const GPD = ({ rootElementId, downloadFileName }) => {
//   const downloadPdfDocument = () => {
//     const input = document.getElementById(rootElementId)
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF()
//       pdf.addImage(imgData, 'JPEG', 0, 0)
//       pdf.save(`${downloadFileName}.pdf`)
//     })
//   }

//   return (
//     <div className="container-fluid d-flex justify-content-center">
//       <div className="row">
//         <div id="ms-container">
//           <label htmlFor="ms-download">
//             <div className="ms-content">
//               <div className="ms-content-inside">
//                 <input type="checkbox" id="ms-download" />
//                 <div className="ms-line-down-container">
//                   <div className="ms-line-down" />
//                 </div>
//                 <div className="ms-line-point" onClick={downloadPdfDocument} />
//               </div>
//             </div>
//           </label>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GPD

import React from 'react';
import ReactToPrint from 'react-to-print';

import PDF from './PDF';

class GPD extends React.Component {
    
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => <PDF />}
            trigger={() => 
            <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                   <div id="ms-container">
                     <label htmlFor="ms-download">
                       <div className="ms-content">
                         <div className="ms-content-inside">
                           <input type="checkbox" id="ms-download" />
                           <div className="ms-line-down-container">
                             <div className="ms-line-down" />
                           </div>
                           <div className="ms-line-point" />
                         </div>
                       </div>
                     </label>
                   </div>
                 </div>
               </div>
            }
          />
          
        </div>
      );
    }

}

export default GPD;
