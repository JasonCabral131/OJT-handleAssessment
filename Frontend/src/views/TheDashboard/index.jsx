import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ImUserTie } from "react-icons/im";
import { BiUserPin } from "react-icons/bi";
import { AiOutlineReconciliation } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import "./style.scss";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
const TheDashboard = () => {
  const { students } = useSelector((state) => state.student);
  const { programs } = useSelector((state) => state.program);
  const { colleges } = useSelector((state) => state.college);
  const { admins } = useSelector((state) => state.auth);
  return (
    <div className="w-100">
      <div className="row ">
        <div className="col-md-3 p-2">
          <Paper className="card-dash">
            <ImUserTie size={50} />
            <Typography variant="h6" component="div" className="text-center">
              Students
            </Typography>
            <CountUp
              end={Array.isArray(students) ? students.length : 0}
              duration={1}
            />
          </Paper>
        </div>
        <div className="col-md-3  p-2">
          <Paper className="card-dash">
            <BiBuildingHouse size={50} />
            <Typography variant="h6" component="div" className="text-center">
              Colleges
            </Typography>
            <CountUp
              end={Array.isArray(colleges) ? colleges.length : 0}
              duration={1}
            />
          </Paper>
        </div>
        <div className="col-md-3 p-2">
          <Paper className="card-dash">
            <AiOutlineReconciliation size={50} />
            <Typography variant="h6" component="div" className="text-center">
              Program
            </Typography>
            <CountUp
              end={Array.isArray(programs) ? programs.length : 0}
              duration={1}
            />
          </Paper>
        </div>
        <div className="col-md-3 p-2">
          <Paper className="card-dash">
            <BiUserPin size={50} />
            <Typography variant="h6" component="div" className="text-center">
              Admin
            </Typography>
            <CountUp
              end={Array.isArray(admins) ? admins.length + 1 : 0}
              duration={1}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default TheDashboard;
