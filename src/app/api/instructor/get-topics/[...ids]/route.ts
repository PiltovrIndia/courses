import db from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const moduleId = params.ids[0];
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM topic WHERE moduleId = ?",
        [moduleId],
        (err: any, data: []) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
    return NextResponse.json({
      status: 200,
      message: "Data Found",
      data: results,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
