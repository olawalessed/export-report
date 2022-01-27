import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import loadingGif from "../assets/loading.gif";

function ModalContent(props) {
  const [exportData, setExportData] = useState({
    report_name: "",
    format: "",
    recipient: "",
    schedule: "",
  });

  const [option, setOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSwitchOption = (data) => {
    setOption(data);
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExportData({ ...exportData, [name]: value });
    console.log(name, value);
  };

  // submit form

  const handleSubmitForm = async () => {
    const { report_name, format, recipient, schedule } = exportData;

    // const formData = new FormData()

    // formData.append("report", report_name)
    // formData.append("format", format)
    // formData.append("recipient", recipient)
    // formData.append("schedule", schedule)

    try {
      setError(false);
      setLoading(true);

      const response = await axios.post("https://postman-echo.com/post", {
        report_name: report_name,
        format: format,
        recipient: recipient,
        schedule: schedule,
      });

      if (response.status === 200) {
        console.log(response.data);
        setLoading(false);
        props.closeModal();
        props.setOpenSnackBar(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
    setError(false);
  };

  useEffect(() => {
    return () => {
      console.log("clean up");
    };
  }, []);

  return (
    <div className="form-body">
      {/* Form start here */}
      <div>
        <form>
          <div className="radio-group">
            <label>Report Name</label>
            <input
              type="text"
              name="report_name"
              className="form-input"
              value={exportData.report_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="radio-one">
            <label>Format</label>
            <RadioGroup
              row
              className="radio-list"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="excel"
              name="format"
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="excel"
                control={<Radio size="small" />}
                label="Excel"
              />
              <FormControlLabel
                value="csv"
                control={<Radio size="small" />}
                label="CSV"
              />
            </RadioGroup>
          </div>

          <div className="radio-group">
            <label>E-mail to</label>
            <input
              type="text"
              name="recipient"
              className="form-input"
              value={exportData.recipient}
              onChange={handleInputChange}
            />
          </div>

          {/* Radio button groups */}
          <div className="radio-group">
            <label>Schedule</label>
            <RadioGroup
              row
              className="radio-list"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="no-repeat"
              name="schedule"
              onClick={(e) => handleSwitchOption(e.target.value)}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="no-repeat"
                control={<Radio size="small" />}
                label="No Repeat"
              />
              <FormControlLabel
                value="specific-date"
                control={<Radio size="small" />}
                label="Specific Date"
              />
              <FormControlLabel
                value="daily"
                control={<Radio size="small" />}
                label="Daily"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio size="small" />}
                label="Weekly"
              />
            </RadioGroup>
          </div>
          {/* Switchable Options */}

          <div>
            {option === "specific-date" && <SpecificDate />}
            {option === "daily" && <Daily />}
            {option === "weekly" && <Weekly />}
          </div>

          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              // width: "100%",
              justifyContent: "space-between",
              paddingInline: "20px",
              gap: "20px",
            }}
          >
            <div>
              <img
                src={loading ? loadingGif : undefined}
                style={{ width: "70%" }}
              />
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Button
                sx={{ backgroundColor: "black", color: "white" }}
                variant="contained"
                onClick={props.closeModal}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                }}
                variant="outlined"
                onClick={handleSubmitForm}
              >
                {loading ? <span>Processing...</span> : <span>Ok</span>}
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default ModalContent;

// Extra components.
// @TOdo: Move to the seperate component

const SpecificDate = () => {
  return (
    <div className="radio-group">
      <label>Date</label>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <input type="date" className="input-time" />
        <p>at</p>
        <input type="time" className="input-time" />
      </Box>
    </div>
  );
};

const Daily = () => {
  return (
    <div className="radio-group">
      <label>Every</label>
      <Box sx={{ display: "flex" }}>
        <input type="time" className="input-time" />
      </Box>
    </div>
  );
};

const Weekly = () => {
  return (
    <div className="radio-group">
      <label>Every</label>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <input type="week" className="input-time" />
        <p>at</p>
        <input type="time" className="input-time" />
      </Box>
    </div>
  );
};
