import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import Product from "../../../../models/Product";
import connectDb from "../../../../middleware/Connect";

export async function POST(request) {

    const formData = await request.formData();
    // console.log(formData);

    const slug = formData.get('slug');
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const path = './public/img/' + file.name;

    await writeFile(path, buffer);

    connectDb();
    await Product.findOneAndUpdate({ slug: slug }, { img: '/img/'+ file.name });

    return NextResponse.json({ success: true });

}