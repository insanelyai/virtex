import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Event from "@/models/Event";

connect();

export async function POST(request) {
  const formData = await request.formData();
  const organizer = formData.get("organizer");
  const title = formData.get("title");
  const description = formData.get("description");
  const meetlink = formData.get("meetlink");
  const category = formData.get("category");
  const date = new Date(formData.get("date"));
  const time = formData.get("time");
  const image = formData.get("image");

  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.log("Error while trying to create directory: ", error);
      return new NextResponse("Something went wrong", {
        status: 500,
      });
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    const newEvent = new Event({
      organizer: organizer,
      title: title,
      description: description,
      meetlink: meetlink,
      category: category,
      date: date.toLocaleString("en-IN", {
        hourCycle: "h23",
      }),
      time: time,
      image: fileUrl,
    });
console.log(newEvent);
    await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to create event", {
      status: 500,
    });
  }
}
