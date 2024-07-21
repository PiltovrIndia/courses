import db from "../../../../config/db";
import { NextResponse } from "next/server";
export async function POST(req: any, { params }: any) {
  try {
    const studentid = params.ids[0];
    const studentname = params.ids[1];
    const courseid = params.ids[2];
    const moduleid = params.ids[3];
    const topicid = params.ids[4];
    const score = params.ids[5];
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO performance (studentid, studentname, courseid, moduleid, topicid, score) VALUES (?,?,?,?,?,?)",
        [studentid,studentname,courseid,moduleid,topicid,score],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("Feedback added:", result);

    return NextResponse.json(
      { message: "Feedback successfully added" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
