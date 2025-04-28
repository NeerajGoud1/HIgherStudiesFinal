import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import "../App.css";

export default function FormHeader() {
  return (
    <div>
      {" "}
      <AppBar
        position="static"
        sx={{ mb: 4, backgroundColor: "white" }}
        className="formStuff"
      >
        <Toolbar>
          <img
            src={logo}
            style={{
              width: "200px",
              height: "55px",
              position: "absolute",
              left: 0,
            }}
            alt="VNRVJIET Logo"
          />

          <Link
            className="formbtn"
            to="/student"
            role="button"
            style={{ color: "black" }}
          >
            Back
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
