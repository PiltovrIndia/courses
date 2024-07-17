import db from "../../../../config/db";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
export async function POST(req: any, { params }: any) {
  try {
    const courseId = params.ids[0];
    const name = params.ids[1];
    const description = params.ids[2];
    // const file = params.ids[3];
    const start = params.ids[3];
    const end = params.ids[4];
    const isActive = params.ids[5];
    const instructor = params.ids[6];
    // const imageBuffer = fs.readFileSync(file.path);
    // const media = imageBuffer.toString('base64');
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `course`(`courseId`, `name`, `description`,`start`,`end`,`isActive`,`instructor`) VALUES (?,?,?,?,?,?,?)",
        [courseId, name, description, start, end, isActive, instructor],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("New course added:", result);

    return NextResponse.json(
      { message: "User inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
