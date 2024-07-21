import db from "../../../../config/db";
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: any, { params }: any) {
  const topicId = params.ids[0];
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id, topicid, question, option1, option2, option3, option4, correctOption FROM questions WHERE topicid = ?",
        [topicId],
        (err: any, data1: []) => {
          if (err) {
            reject(err);
          } else {
            resolve(data1);
            // console.log(data1);
          }
        }
      );
    });
    // console.log(results);
    return NextResponse.json({
      status: 200,
      message: "Data found",
      data: results,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
