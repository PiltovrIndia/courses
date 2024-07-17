import db from "../../../../config/db";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  try {
    const courseId = params.ids[0];
    const status = "false";
    const result = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE `course` SET `isActive` = ? WHERE `courseId` = ?",
        [status,courseId],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("description updated", result);

    return NextResponse.json(
      { message: "description updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
