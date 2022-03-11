import { doc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    if (body.name && body.id && body.passcode) {
      try {
        const data = await getDoc(doc(db, "meetings", `${body.id}`));
        console.log(data.get("persons"));
        if (
          data.exists() &&
          data.data().meetingPasscode === body.passcode &&
          !data.get("meetingClosed")
        ) {
          await setDoc(
            doc(db, "meetings", `${body.id}`),
            {
              persons: [...data.data()?.persons, body.name],
            },
            { merge: true }
          );
          res.status(200).json({
            isMeetingStarted: true,
            displayName: body.name,
            meetingId: body.id,
            meetingPasscode: body.passcode,
            meetingTitle: data.data().meetingTitle,
            id: data.id,
          });
        } else {
          res.status(404).send({
            error: true,
            message: "No meeting found with given data",
          });
        }
      } catch (error) {
        res.status(404).send({
          error: true,
          message: "No meeting found with given data",
        });
      }
    } else {
      res.status(404).send({
        error: true,
        message: "Required params not found.",
      });
    }
  } else {
    res.status(405).send({
      error: true,
      message: "get request is not allowed.",
    });
  }
}
