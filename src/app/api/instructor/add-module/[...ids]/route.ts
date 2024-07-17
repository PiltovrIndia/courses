import db from "../../../../config/db";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  try {
    const moduleId = params.ids[0];
    const moduleName = params.ids[1];
    const description = params.ids[2];
    const courseId = params.ids[3];
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `module`(`moduleId`, `name`, `description`,`courseId`) VALUES (?,?,?,?)",
        [moduleId, moduleName, description,courseId],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("New module added:", result);

    return NextResponse.json(
      { message: "User inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
