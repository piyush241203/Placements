import React from "react";
const AcademicRecords = ({ academicRecords }) => {
  if (!academicRecords) return null;
    return (
      <div className="w-full">
        <h2 className="text-[22px] mb-2  font-semibold  text-gray-700">Academic Records</h2>
        <div className="flex gap-5 mt-2 items-center h-[350px]">
          <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-[20px] h-full w-[580px]">
            <h2 className="text-[20px] font-semibold mb-1 text-gray-700">Qualification's:</h2>
            <ul className="list-none m-0 pl-2">
              <li className="text-[16px] mb-2 flex items-center">
                <strong>Diploma College Name:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.diploma.collegeName || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center"> 
                <strong>Diploma Score's:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.diploma.percentage || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">  
                <strong>JEE Score's:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.jeeScore || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">
                <strong>MHT-CET Score's:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.mhtCetScore || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">
                <strong>12<sup>th</sup> High School Name:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.twelfth.schoolName || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">
                <strong>12<sup>th</sup> Score's:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.twelfth.percentage || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">
                <strong>10<sup>th</sup> School Name:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.tenth.schoolName || "NA"}</h6>
              </li>
              <li className="text-[16px] mb-2 flex items-center">
                <strong>10<sup>th</sup> Score's:</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.tenth.percentage || "NA"}</h6>
              </li>


            </ul>
          </div>
          {/* <div className="h-[300px] w-px bg-[rgba(33,86,105,0.758)] rounded-full mx-1"></div>
          <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-[20px] h-full min-w-[350px]">
            <ul className="list-none m-0 pl-2">
             
              <h2 className="text-[20px] font-semibold mb-1 text-gray-700">CGPA :</h2>
              <li className="text-[16px] ml-2 flex items-center">
                <strong>{academicRecords.cgpa.semesters.semester || "NA"} Sem :-</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.cgpa.semesters.cgpa || "NA"}</h6>
              </li>

              <h2 className="text-[20px] mt-4 font-semibold mb-1 text-gray-700">Previous backlog's :</h2>
              <li className="text-[16px] ml-2 flex items-center">
                <strong>{academicRecords.backlogs.semester || "NA"} Sem :-</strong>
                <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">{academicRecords.backlogs.count || "NA"} </h6>
              </li> */}

          <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-[20px] h-full min-w-[350px]">
            <ul className="list-none m-0 pl-2">
              <h2 className="text-[20px] font-semibold mb-1 text-gray-700">CGPA:</h2>
              {academicRecords.cgpa[0]?.semesters.map((sem, index) => (
                <li key={index} className="text-[16px] mb-2 flex items-center">
                  <strong>{sem.semester} Sem:</strong>
                  <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">
                    {sem.cgpa || "NA"}
                  </h6>
                </li>
              ))}

              <h2 className="text-[20px] mt-4 font-semibold mb-1 text-gray-700">Previous Backlogs:</h2>
              {academicRecords.backlogs.length > 0 ? (
                academicRecords.backlogs.map((backlog, index) => (
                  <li key={index} className="text-[16px] mb-2 flex items-center">
                    <strong>{backlog.semester} Sem:</strong>
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">
                      {backlog.count || 0}
                    </h6>
                  </li>
                ))
              ) : (
                <li className="text-[16px] mb-2">No Backlogs</li>
              )}
            </ul>
          </div>

              {/* </li> */}
              {/* <li className="text-[16px] mb-2">
                <strong >2<sup>nd</sup> Year :</strong>
                <ul className="list-none pl-5">
                  <li className="text-[16px] flex items-center">
                    3<sup>rd</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                  <li className="text-[16px] flex items-center">
                    4<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                </ul>
              </li>
              <li className="text-[16px] mb-2">
                <strong >3<sup>rd</sup> Year :</strong>
                <ul className="list-none pl-5">
                  <li className="text-[16px] flex items-center">
                    5<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                  <li className="text-[16px] flex items-center">
                    6<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                </ul>
              </li>
              <li className="text-[16px] mb-2">
                <strong >4<sup>th</sup> Year :</strong>
                <ul className="list-none pl-5">
                  <li className="text-[16px] flex items-center">
                    7<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                  <li className="text-[16px] flex items-center">
                    8<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">6.40</h6>
                  </li>
                </ul>
              </li> */}

            {/* </ul>
          </div> */}
          
          {/* <div className="h-[350px] w-px bg-[rgba(33,86,105,0.758)] rounded-full mx-1"></div> */}
          {/* <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-[20px] h-full min-w-[250px]">
            <h2 className="text-[20px] font-semibold mb-1 text-gray-700">Backlog's :</h2>
            <div className="flex justify-between">
              <div>
                <h3 className="text-[17px] pl-1 font-bold mb-1 text-gray-800">Previous backlog's :</h3>
                <ul className="list-none m-0 pl-3">
                  <li className="text-[16px] mb-2 flex items-center">
                    1<sup>st</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    2<sup>nd</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    3<sup>rd</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    4<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    5<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    6<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    7<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">0</h6>
                  </li>
                  <li className="text-[16px] mb-2 flex items-center">
                    8<sup>th</sup> Sem :-
                    <h6 className="text-[16px] ml-2 px-3 border-b border-[rgba(33,86,105,0.758)] bg-gradient-to-b from-transparent via-transparent to-gray-300/25 rounded text-gray-800">NA</h6>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default AcademicRecords;
  