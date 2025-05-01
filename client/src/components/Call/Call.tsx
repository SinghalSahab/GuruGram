import { useEffect, useState } from "react";
import axios from "axios";
import "./call.css";
import { ZoomMtg } from "@zoom/meetingsdk";

interface CallProps {
  meetingNumber: string;
  passWord: string;
}

function Call({ meetingNumber, passWord}: CallProps) {
  const [userName, setUserName] = useState("");

  const menteeId = localStorage.getItem("_id");
  const rolee = localStorage.getItem("role");

  useEffect(() => {
    if (menteeId) {
      const endpoint = rolee === "mentor" ? `${import.meta.env.VITE_BACKEND_URL}/api/mentor/${menteeId}` : `${import.meta.env.VITE_BACKEND_URL}/api/mentee/${menteeId}`;
      
      axios
        .get(`${endpoint}`)
        .then((response) => {
          setUserName(response.data.name);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();
  const authEndpoint = `${import.meta.env.VITE_BACKEND_URL}/generateSignature`;
  const sdkKey = "79Qt0lnLTCSLN8z8Q8vHWw";
  const role = 0;
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "gurugramm.vercel.app";

  const getSignature = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json();
      const signature = res.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.log(e);
    }
  };

  function startMeeting(signature: string) {
    console.log(signature);
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
          },
          error: (error: unknown) => {
            console.log(error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="pt-20 container flex flex-col items-center justify-center dark:bg-gray-900 w-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Zoom Meeting</h1>
        <button
          onClick={getSignature}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-900"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
}

export default Call;
