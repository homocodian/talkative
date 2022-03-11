import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { db } from "../../config/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    if (body.uid && body.displayName && body.meetingTitle) {
      const details = {
        meetingPasscode: uuid4(),
        meetingTitle: body.meetingTitle,
      };
      try {
        const { id } = await addDoc(collection(db, "meetings"), {
          ...details,
          startedBy: body.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          persons: [body.displayName],
        });
        res.status(200).json({
          ...details,
          meetingId: id,
          id: id,
          isMeetingStarted: true,
          displayName: body.displayName,
        });
      } catch (error) {
        res.status(500).send({
          error: true,
          message: "Failed to start meeting.",
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
