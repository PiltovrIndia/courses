import db from "../../../../config/db";
import { NextResponse } from "next/server";
export async function POST(req: any, { params }: any) {
  try {
    const name = params.ids[0];
    const collegeId = params.ids[1];
    const email = params.ids[2];
    const githubUserName = params.ids[3];
    const courseId = params.ids[4];
    const githubTokens = "";
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `attendees`(`collegeId`, `name`, `email`,`githubName`,`githubToken`,`courseIds`) VALUES (?,?,?,?,?,?)",
        [collegeId, name, email, githubUserName, githubTokens, courseId],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("Attendee added:", result);

    return NextResponse.json(
      { message: "Attendee successfully added" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
