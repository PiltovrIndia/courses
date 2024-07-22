import db from "../../../../config/db";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  try {
    const topicId = params.ids[0];
    const topicName = params.ids[1];
    const courseId = params.ids[2];
    const moduleId = params.ids[3];
    const token = params.ids[4];
    const links = "";
    const completed = "no";
    const description = "";
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `topic`(`topicId`, `name`, `description`,`courseId`,`moduleId`,`links`,`completed`,`token`) VALUES (?,?,?,?,?,?,?,?)",
        [topicId,topicName,description,courseId,moduleId,links,completed,token],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log("New topic added:", result);

    return NextResponse.json(
      { message: "User inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
