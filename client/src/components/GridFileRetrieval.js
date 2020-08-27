import React, { useEffect } from "react";
import React from "react";

function GridFileRetrieval() {
  useEffect(() => {
    fetch("/api/files/gridSingleFileRetrieval/1001")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <div></div>;
}

export default GridFileRetrieval;
