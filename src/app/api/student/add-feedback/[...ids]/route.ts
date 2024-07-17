import db from "../../../../config/db";
import { NextResponse } from "next/server";
export async function POST(req: any, { params }: any) {
  try {
    const collegeId = params.ids[0];
    const topicId = params.ids[1];
    const confidence = params.ids[2];
    const implementation = params.ids[3];
    const understand = params.ids[4];
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `studenttopic`(`collegeId`, `topicId`, `confidence`,`implementation`,`understand`) VALUES (?,?,?,?,?)",
        [collegeId,topicId,confidence,implementation,understand],
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
