import { useCallback, useEffect, useRef, useState } from 'react';
import { BlockBlobClient } from '@azure/storage-blob';
import { Button } from 'react-bootstrap';
import Slider from './Components/Slider';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const portNumber = 5001; /* put your visual studio port number here */;
  const mainUrl = "https://localhost:" + portNumber + "/api/images"; 

  const [error, setError] = useState();
  const [size, setSize] = useState(200);
  const [version, setVersion] = useState("/?api-version=1.0");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const inputFileRef = useRef();

  useEffect(() => {
    if (portNumber <= 0) {
      setError("You need to set your port number in App.js.");
    }
  }, [portNumber]);

    

  const onClickUpload = useCallback(() => {
    let createdImageId;

    setError("");

    if (!name || name.length < 3) {
        setError("Enter at least three characters for the title.");
        return;
    }

    if (version === "/?api-version=1.1") {
      if (!description || description.length < 5) {
         setError("Enter at least three characters for the description.");
         return;
      }
    }

    var bodyInput;
    if (version === "/?api-version=1.0") {
      bodyInput = JSON.stringify({
          Name: name,
      });
    } else {
      bodyInput = JSON.stringify({
          Name: name,
          Description: description,
      });
    }

    var file = inputFileRef.current.files[0];
    if (!file) {
        setError("Choose a file.");
        return;
    }

    fetch(mainUrl + version, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyInput,
    })
    .then(response => response.json())
    .then(createdImageDetails => {
      const file = inputFileRef.current.files[0];
      const blockBlobClient = new BlockBlobClient(createdImageDetails.uploadUrl);
      createdImageId = createdImageDetails.id;
      return blockBlobClient.uploadData(file);
    }).then(() => {
      // Send a request to your server that the image upload is complete.
      // Hint: You will need the id of the new image that was created in order to send an upload complete request.
      // That id comes from the POST response that created your new image.
        return fetch(mainUrl + "/" + createdImageId + "/uploadComplete" + version, {
            method: "PUT",
        })

    }).then(uploadCompleteResult => {
      return uploadCompleteResult.json();
    }).then(uploadCompleteJson => {
      // Use the uploadCompleteJson response to add the new image to the list of images that are displayed on the page.
        setImages(im => 
            [...im, uploadCompleteJson]
        );
    });
  }, [mainUrl, name, version, description]);

  useEffect(() => {
    if (!mainUrl || portNumber <= 0) {
      return;
    }

    fetch(mainUrl + version)
      .then(response => {
        if (!response.ok) {
          throw new Error("Not OK status code: " + response.status);
        }
        return response.json()
      })
      .then(responseJson => {
        setImages(responseJson);
      }).catch((error) => {
        setError("Failed to load images on start: " + error);
      });
  }, [mainUrl, version]);

  const onClickPurge = useCallback(() => {
    fetch(mainUrl + version, {
      method: "DELETE"
    }).then((result) => {
      if (result.ok) {
        setImages([]);
      }
    });
  }, [mainUrl, version]);

  const onNewSize = useCallback((newSize) => {
      setSize(newSize);
  }, []);

  const changeVerion = useCallback((newVersion) => {
      setVersion(newVersion);
  }, []);

  return (
      <div className="App">
        <div className="upload">

          <div className="title">----Survior----</div>
          <div className="controlsContainer">

            <div>Name: <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" /></div>

            {version === "/?api-version=1.1" &&
               <div>Description: <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" /></div>
                
            }
            
            <input ref={inputFileRef} type="file" accept="image/*" id="image" />

          </div>

          <div className="controlsContainer">
            <Button className="button" onClick={onClickUpload}>Upload</Button>
            <Button className="button" onClick={onClickPurge}>Purge Images</Button>
          </div>

          <br/>

          Change the Version with the Buttons Below

          <br />
          <br />

              <Button className="buttons" onClick={() => changeVerion("/?api-version=1.0")} disabled={version === "/?api-version=1.0"} style={{ backgroundColor: (version === "/?api-version=1.1") ? 'lightgray' : 'blue', }}>Verion 1.0</Button>
              <Button className="buttons" onClick={() => changeVerion("/?api-version=1.1")} disabled={version === "/?api-version=1.1"} style={{ backgroundColor: (version === "/?api-version=1.0") ? 'lightgray' : 'blue', }}>Verion 1.1</Button>

          <br />
          <br />

          Change Slider Value to Change the Size of All the Images

          <br />
          <br />

          <Slider size={size ?? 20} onNewSize={onNewSize} />

          <br/>

        </div>

          

          

      {error &&
        <div className="error">{error}</div>
      }
      <div className="imagesContainer">
        {/* use the map function to create one img tag per image in the response from the server.
         * Hint: the "img" element causes the browser to make a GET request to whatever URL is in the src tag.
        */}
        
        {images.map((i) => (
          <figure>
            <img src={mainUrl + "/" + i.id + version} alt={i.name} key={i.id} className="image" style={{
                width: size + "px",
            }} />

            {version === "/?api-version=1.1" &&
                <figcaption> {i.description} </figcaption>
             }
          </figure>
         ))}
      
      </div>
    </div>
  );
}

export default App;
