import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDocsStruct, getDoc } from "lib/minio";

export default function Main() {
  const router = useRouter();

  const [struct, setStruct] = useState<any>([]);
  function getStruct() {
    let url =
      "http://localhost:3000/minio/api/v1/buckets";
    try {
       fetch(url, {})
       .then(res => res.json())
       .then(
         (result) => {
            console.log(result['buckets'])
            setStruct(result['buckets'])

         },
         // Note: it's important to handle errors here
         // instead of a catch() block so that we don't swallow
         // exceptions from actual bugs in components.
         (error) => {

         }
       )
        .catch((error: any) => {
          console.log(error);
        });
        return
    } catch (error: any) {
      if (error.response !== undefined) {
        // setWarningMessage(
        //   "API request failed. Status code and message: " +
        //     error.response.status +
        //     " " +
        //     error.response.data.message
        // );
    
      } else {
        // setWarningMessage("Request failed.");
        // setError(true);
      }
    }
  }
  useEffect(() => {
    getStruct()
  });



  return(     
    for (let key=1; key<struct.length; key++){
        <div>
        <h2 className="text-5xl max-w-xl mx-auto mt-8 text-left lg:text-center font-spooky">hihi</h2>
      </div>
    }

)}
