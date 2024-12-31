import Content from '../Components/Content';
import Header from '../Components/Header';
import { FaRegUserCircle } from "react-icons/fa";

function Users() {

  const students = [
    {
      logo: <FaRegUserCircle />,
      name: "Mahesh Hari Shinde",
      branch: "CSE",
      studentID: "STU12345",
      yearSem: "4/8",
      cgpa: "8.00",
      phone: "+91 9123456780",
    },
    // Duplicate data for illustration
    ...Array(13).fill({
      logo: <FaRegUserCircle />,
      name: "Mahesh Hari Shinde",
      branch: "CSE",
      studentID: "STU12345",
      yearSem: "4/8",
      cgpa: "8.00",
      phone: "+91 9123456780",
    }),
  ];

  return (
    <div className="relative flex flex-col flex-1 bg-[#A3B5C0] min-h-screen rounded-l-[35px]">
      <Header />
      <Content />
      <div className="flex justify-center p-10">
        <table className="w-full border-collapse bg-[#cdd9e156] backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#cdd9e1a7]">
            <tr>
              <th className="text-left p-3 text-sm font-bold">Name of the student</th>
              <th className="text-left p-3 text-sm font-bold">Branch</th>
              <th className="text-left p-3 text-sm font-bold">StudentID</th>
              <th className="text-left p-3 text-sm font-bold">Year/Sem</th>
              <th className="text-left p-3 text-sm font-bold">Current CGPA</th>
              <th className="text-left p-3 text-sm font-bold">Phone no.</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-[#cdd9e165]' : ''} hover:bg-[#ffffff82] hover:backdrop-blur-sm hover:shadow-lg cursor-pointer`}
              >
                <td className="flex items-center gap-2 p-3 border border-[#cdd9e1bc]">
                  {student.logo}
                  {student.name}
                </td>
                <td className="p-3 border border-[#cdd9e1bc]">{student.branch}</td>
                <td className="p-3 border border-[#cdd9e1bc]">{student.studentID}</td>
                <td className="p-3 border border-[#cdd9e1bc]">{student.yearSem}</td>
                <td className="p-3 border border-[#cdd9e1bc]">{student.cgpa}</td>
                <td className="p-3 border border-[#cdd9e1bc]">{student.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
