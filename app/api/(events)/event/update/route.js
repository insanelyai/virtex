import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Event from "@/models/Event";

connect();

export async function PUT(request) {
  const formData = await request.formData();
  const eventId = formData.get("eventId");
  const title = formData.get("title");
  const description = formData.get("description");
  const meetlink = formData.get("meetlink");
  const category = formData.get("category");
  const date = formData.get("date");
  const time = formData.get("time");
  const image = formData.get("image");

  let updatedFields = {};

  // Only update fields if they are provided in the form data
  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;
  if (meetlink) updatedFields.meetlink = meetlink;
  if (category) updatedFields.category = category;
  if (date) {
    updatedFields.date = new Date(date).toLocaleString('en-IN', {
      hourCycle: "h23"
    });
  }
  if(time) updatedFields.time = time;

  // Check if a new image file is provided
  if (image && image.size > 0) {
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

      updatedFields.image = fileUrl; // Only set image if a new file is uploaded
    } catch (error) {
      console.log(error);
      return new NextResponse("Failed to upload image", {
        status: 500,
      });
    }
  }

  try {
    // Update the event in the database using MongoDB's $set operator to update only specified fields
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updatedFields },
      { new: true } // Return the updated event
    );

    if (!updatedEvent) {
      return new NextResponse("Event not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated successfully", updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to update event", {
      status: 500,
    });
  }
}
