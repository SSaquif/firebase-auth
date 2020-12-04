import React, { useEffect, useState } from "react";

function GridFileRetrieval() {
  const [image, setImage] = useState("");
  console.log(process.env.test);
  useEffect(() => {
    fetch("/api/files/gridSingleFileRetrieval/2000")
      .then((res) => {
        const reader = res.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        console.log("url is", url);
        setImage(url);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <img src={image} />
    </div>
  );
}

export default GridFileRetrieval;
