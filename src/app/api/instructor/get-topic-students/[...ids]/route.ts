import db from "../../../../config/db";
import { NextResponse } from "next/server";
import { OkPacket, RowDataPacket } from 'mysql2';

type QueryResult = RowDataPacket[] & { count: number }[];

export async function GET(req: any, { params }: any) {
  const topicId = params.ids[0];
  try {
    const results: QueryResult = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(collegeId) AS count FROM users WHERE `courseId` = (SELECT DISTINCT `courseId` FROM `topic` WHERE topicId = ?)",
        [topicId],
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data as QueryResult);
          }
        }
      );
    });

    const count = results[0]?.count;
    console.log("Query Results:", results);
    return NextResponse.json({
      status: 200,
      message: "Data found",
      data: count,
    });
  } catch (error) {
    console.error("Query Error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
