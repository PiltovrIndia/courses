import db from "../../../../config/db";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  try {
    const topicId = params.ids[0];
    const enable = 1;
    const result = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE `topic` SET `enableQuiz` = ? WHERE `topicId` = ?",
        [enable, topicId],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("topic completed", result);

    return NextResponse.json(
      { message: "topic completed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
