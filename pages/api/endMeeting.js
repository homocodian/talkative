import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    if (body.uid && body.id && body.duration) {
      try {
        await updateDoc(doc(db, "meetings", `${body.id}`), {
          duration: body.duration,
          meetingClosed: true,
          updatedAt: serverTimestamp(),
        });
        res.status(200).json({
          success: true,
          message: "Successfully ended meeting.",
        });
      } catch (error) {
        res.status(500).send({
          error: true,
          message: "Failed to end meeting.",
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
